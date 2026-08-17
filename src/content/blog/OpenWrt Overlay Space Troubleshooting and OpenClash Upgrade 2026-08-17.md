---
title: 'OpenWrt Overlay 空间不足自救指南：以 42MB 闪存下 OpenClash 极限升级为例'
description: '针对 OpenWrt/ImmortalWrt 路由器中因几百 KB 差额导致 opkg 安装失败的场景，复盘 overlayfs 空间定位、BusyBox 运维避坑、依赖精简与无痛升级的实战方案。'
pubDate: '2026-08-17 19:00:00'
series: '嵌入式与边缘网络实战'
tags: ['OpenWrt', 'ImmortalWrt', 'Overlay扩容', 'OpenClash', 'Linux运维', '路由器']
author: "尹霈泽"
---

在嵌入式路由器（如 OpenWrt / ImmortalWrt）的日常维护中，由于多数原厂闪存分区划分较为保守，`/overlay` 可写空间往往被限制在 30MB~60MB 的极限区间。

在升级大型插件（如 `luci-app-openclash`）时，一个经典的报错是：
```text
Collected errors:
 * verify_pkg_installable: Only have 9332kb available on filesystem /overlay, pkg luci-app-openclash needs 10199
 * opkg_install_cmd: Cannot install package luci-app-openclash.
```

明明可用空间（9.1MB）与所需空间（10.2MB）仅差 **约 867 KB（约 1MB）**，但在盲目删除文件时却常常导致系统崩溃或配置丢失。本文复盘如何在极限空间下进行精准排查与安全升级。

---

### 一、 报错根因与 OverlayFS 存储机理解密

#### 1. 为什么只差 1MB 却无法“覆盖升级”？
`opkg` 在执行安装时，并非在内存中直接覆盖替换旧文件，而是必须预先校验 `/overlay` 文件系统是否同时具备容纳**新包解压后的完整体积**与**元数据缓冲区**。当旧版本文件依然驻留在磁盘上时，新旧文件叠加的瞬时空间需求直接触发了 `verify_pkg_installable` 熔断机制。

#### 2. OverlayFS 空间认知避坑
OpenWrt 的根目录 `/` 是一个联合挂载文件系统（OverlayFS）：
- `/rom`（Lower Layer）：只读固件镜像，修改与删除均不释放物理空间；
- `/overlay/upper`（Upper Layer）：实际的可写增量存储层，所有用户配置与安装的包均沉淀于此；
- `/tmp`（tmpfs）：挂载在 RAM（内存）中的临时文件系统，在 `/tmp` 下下载或解压文件**完全不占用 `/overlay` 磁盘空间**。

---

### 二、 BusyBox 环境下的排查避坑命令

路由器内置的精简版 BusyBox 工具链与标准 Linux 发行版存在差异，盲目套用常规脚本极易报错。

```text
+-------------------------------------------------------------------------+
|                      BusyBox 终端常用排查命令对照表                     |
+-------------------+-----------------------------------------------------+
| 错误用法 (不支持) | du -h -d 1 /overlay | sort -h (BusyBox sort 无 -h)  |
+-------------------+-----------------------------------------------------+
| 正确用法 (推荐)   | du -k -d 1 /overlay/upper 2>/dev/null | sort -n     |
+-------------------+-----------------------------------------------------+
```

#### 1. 精准定位 Upper 层目录体积
```sh
# 查看 /overlay/upper 各一级目录占用 (单位 KB)
du -k -d 1 /overlay/upper 2>/dev/null | sort -n

# 重点排查 /etc 与 /usr
du -k -d 2 /overlay/upper/etc 2>/dev/null | sort -n | tail -20
du -k -d 2 /overlay/upper/usr 2>/dev/null | sort -n | tail -20
```

#### 2. 抓取全盘最大文件 Top 20
```sh
find /overlay/upper -type f -exec du -k {} \; 2>/dev/null | sort -n | tail -20
```

---

### 三、 空间大户剖析与安全白名单

在排查中发现，`/overlay/upper` 的核心占用通常呈现以下分布：

```mermaid
graph TD
    A[42.1MB Overlay 空间占用分布] --> B[/etc/openclash 约 35.5MB]
    A --> C[/usr/share/openclash 约 6.8MB]
    A --> D[系统必要基础组件 约 10MB]
    
    B --> B1[core/clash_meta: 10.5MB 核心内核 - 严禁删除]
    B --> B2[GeoIP/GeoSite 规则库: 10~15MB - 可精简备份]
    B --> B3[history/*.db 历史数据库: 几百KB - 可直接清理]
    
    C --> C1[ui/zashboard & metacubexd: 5.5MB LuCI面板]
    
    D --> D1[rpcd, ubus, uci, uhttpd, wpad - 严禁触碰]
```

#### 1. 绝对不能删除的白名单
- **内核文件**：`/etc/openclash/core/clash_meta`（删除会导致代理服务彻底瘫痪）；
- **系统核心基础设施**：`rpcd*`、`ubus`、`ubusd`、`uci`、`uhttpd*`、`wpad-openssl`、`ubi-utils`（删除会导致 Web 界面无法打开或网络脱网）。

#### 2. 依赖项检查（以 Ruby 为例）
若发现 `/overlay/upper/usr/lib/ruby` 占据了 1.8MB 空间，切勿直接 `rm -rf`，应通过包管理器反查依赖：
```sh
opkg whatdepends libruby3.2
opkg status | grep -B2 -A10 -E 'Package: (ruby|libruby3.2)'
```
确认无任何活跃应用依赖后，方可通过 `opkg remove` 卸载。

---

### 四、 黄金升级五步法（无痛且保留配置）

面对仅差 1MB 的空间死锁，**最规范的方案是先备份配置、卸载旧包释放 6~7MB 空间，再安装新包并恢复配置**。

```sh
# 第一步：完整备份现有代理配置与规则
tar -czf /tmp/openclash-backup.tar.gz /etc/openclash

# 第二步：清理 opkg 索引缓存与历史数据 (瞬间释放 1MB+)
rm -rf /tmp/opkg-lists/*
rm -f /overlay/upper/etc/openclash/history/*.db
sync

# 第三步：卸载旧版 LuCI 应用 (释放 UI 与包管理元数据 6~7MB)
opkg remove luci-app-openclash
df -h /overlay

# 第四步：安装下载在 /tmp 下的新版本 IPK
opkg install /tmp/openclash.ipk

# 第五步：验证并按需恢复配置
# 若 /etc/openclash 未被覆盖则无需处理；若被清空则一键解包恢复
tar -xzf /tmp/openclash-backup.tar.gz -C /
sync
```

---

### 结语

在嵌入式与微型 Linux 系统中，**“精准计量、尊重包管理器生命周期、绝不暴力 rm 系统文件”** 是保障网络设备长期稳定运行的核心准则。理解 OverlayFS 的分层机理，能让你在极度受限的硬件资源下依然游刃有余。
