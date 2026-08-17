---
title: '故障排查记录：Google Drive Service Account Storage Quota (403 Error)'
description: '排查并修复通过 Service Account 上传至 Google Drive 时触发的 403 存储配额超出问题。'
pubDate: '2026-02-21 21:25:00'
tags: ['Google Drive', 'Troubleshooting', 'OAuth', 'API']
---

# 故障排查记录与技术备忘：Google Drive Service Account Storage Quota (403 Error)

## 故障现象 (Issue)

在 LA 节点尝试将下载完成的音频 (`.mp3` 或 `.m4a` 格式) 自动上传至指定的 Google Drive 文件夹时，触发如下核心报错：
```json
HttpError 403 when requesting None returned "Service Accounts do not have storage quota. Leverage shared drives... or use OAuth delegation instead.". Details: "[{'message': 'Service Accounts do not have storage quota...', 'domain': 'usageLimits', 'reason': 'storageQuotaExceeded'}]"
```
即使已将目标文件夹开放编辑权限给 Service Account（服务账号），上传动作依然在开始瞬间被阻断。

## 故障根因 (Root Cause)

1. **Google Workspace 所有权配额机制**：即使服务账号 (Service Account) 将文件上传到他人拥有 (Owner) 的普通云端硬盘文件夹中，**该文件依然占用该服务账号自身的存储容量**。
2. **服务账号的先天限制**：在部分版本的 Google Workspace 组织架构下，服务账号默认情况下的存储空间 (Storage Quota) 为 **0 字节**。一旦执行上传创建动作，将立刻触发“超出存储限额” (storageQuotaExceeded) 的 403 错误。

由于目标账户不是包含 15GB 免配置初始配额的普通 `@gmail.com`，也未能开启“共享云端硬盘 (Shared Drives)”功能（注：Shared Drive 可使所有子项目和账号共享组织主体配额，打破个人配额限制），传统的 Service Account 模式在这套特定的 Google 架构内走到了死胡同。

## 解决方案论证与选型 (Solution)

面临配额封锁的 3 条破局思路：
1. **[被采纳] 基于独立 OAuth2 用户弹窗授权的伪装**：直接放弃服务账号上传机制，转由提供该 2TB 容量的个人 Google 账号执行标准 OAuth 2.0 Web Auth 流程生成持久授权票据 (`token.json`)。通过该脚本每次执行的云盘动作均被视为本人点击页面手动上传，直接消耗 2TB 容量（一劳永逸）。
2. **利用 Rclone 代替 Python 上传逻辑**：LA 下载完毕后交接给本地绑定的 Rclone CLI 命令同步，但这会增添额外的环境依赖维护。
3. **Google Domain-Wide Delegation (域委派冒用)**：强制要求在 Admin Portal 做委派管理，需要最高管理权限且操作繁杂。

最终采用 **方案 1 (OAuth2 个人授权票据分发)** 作为核心技术路线。

## 修复实施标准作业程序 (Fix SOP)

1. **架构与脚本改动**：
   - 新增 `auth_setup.py` 辅助脚本：启动本地 Web 服务器代理进行 Google 账号登录同意，自动化获取包含离线刷新机制 (Refresh Token) 的持久化 `token.json` 身份证书。
   - 重构 `src/core/google_api.py` 引擎层：增加兼容能力，优先读取外部持久化 `token.json` 作为 OAuth 凭据，并在其不存在时优雅降级回落至兼容原本的 `credentials.json` 机制。

2. **生产环境部署流转**：
   - 个人 `token.json` 为高权限隐私密钥，将其放入 `conf/` 安全存储区。同时已确认项目级 `.gitignore` 会主动过滤所有未显式包含的 `*.json` (如 `! .env.example`) 文件。
   - 更新分布式的中枢控制系统：于 HP-G3 服务器上的 `ops/fabfile.py` 内增加了针对个人 OAuth Token 分发的专门逻辑阶段。该阶段不仅会自动搜刮项目根目录或 `conf` 下存在的 `token.json`，且优先通过 Fabric 通过 SSH 加密通道向处于外网边缘的 `LA节点` 散布部署并重启。

## 结果验证 (Outcome)

通过修改配置部署重启后，通过 Python 调用诊断以及真实观察 Google Workspace 云端后台均验证：
1. 本地生成 Dummy Audio 推流成功。
2. YouTube 自动抓取队列流转恢复正常：任务 `ZEWszE8Hw1E` 录音文件成功存储于 `youtube_factory/` 并正常扣除主账号的无源 2TB 配额，Google Sheets 正确地通过 LA 节点更新状态至 `音频已就绪`。
3. HK 节点随后即可利用自身的 `rclone` 读取驱动开始 `Faster-Whisper` 推理转录。故障解除并成功确立了永久性高并发安全方案。
