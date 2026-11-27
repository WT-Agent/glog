/**
 * 集中维护正文实体外链映射表：
 * 1. ENTITY_OFFICIAL_URLS: 科技大厂、AI 产品、云平台与基础设施固定官网外链
 * 2. GITHUB_PROJECT_SLUGS: 开源/独立项目短名到 GitHub `owner/repo` 的映射
 */

export const ENTITY_OFFICIAL_URLS: Record<string, string> = {
	// 全球科技与云巨头
	'Amazon': 'https://www.aboutamazon.com',
	'AWS': 'https://aws.amazon.com',
	'Microsoft': 'https://www.microsoft.com',
	'微软': 'https://www.microsoft.com',
	'Google': 'https://about.google',
	'谷歌': 'https://about.google',
	'Apple': 'https://www.apple.com',
	'苹果': 'https://www.apple.com',
	'Meta': 'https://about.meta.com',
	'NVIDIA': 'https://www.nvidia.com',
	'英伟达': 'https://www.nvidia.com',
	'IBM': 'https://www.ibm.com',
	'Red Hat': 'https://www.redhat.com',
	'SpaceX': 'https://www.spacex.com',
	'Tesla': 'https://www.tesla.com',

	// 国内科技与终端厂商
	'阿里巴巴': 'https://www.alibabagroup.com',
	'阿里云': 'https://www.alibabacloud.com',
	'阿里': 'https://www.alibabagroup.com',
	'字节跳动': 'https://www.bytedance.com',
	'火山引擎': 'https://www.volcengine.com',
	'华为': 'https://www.huawei.com',
	'荣耀': 'https://www.honor.com',
	'腾讯': 'https://www.tencent.com',
	'百度': 'https://www.baidu.com',
	'小米': 'https://www.mi.com',
	'京东': 'https://www.jd.com',

	// AI 模型与编程产品
	'OpenAI': 'https://openai.com',
	'ChatGPT': 'https://chatgpt.com',
	'Anthropic': 'https://www.anthropic.com',
	'Claude Code': 'https://docs.anthropic.com/en/docs/claude-code/overview',
	'Claude': 'https://claude.ai',
	'DeepSeek': 'https://www.deepseek.com',
	'Cursor': 'https://www.cursor.com',
	'Windsurf': 'https://windsurf.com',
	'Devin': 'https://devin.ai',
	'Trae': 'https://www.trae.ai',
	'Gemini': 'https://gemini.google.com',
	'Grok': 'https://x.ai',
	'xAI': 'https://x.ai',
	'Manus': 'https://manus.im',
	'智谱': 'https://www.zhipuai.cn',
	'Kimi': 'https://kimi.moonshot.cn',
	'MiniMax': 'https://www.minimaxi.com',
	'Qwen': 'https://qwenlm.github.io',
	'豆包': 'https://www.doubao.com',

	// 基础设施、OS 与开发栈
	'GitHub': 'https://github.com',
	'Cloudflare': 'https://www.cloudflare.com',
	'Vercel': 'https://vercel.com',
	'Astro': 'https://astro.build',
	'Gitea': 'https://about.gitea.com',
	'NATS': 'https://nats.io',
	'PostgreSQL': 'https://www.postgresql.org',
	'n8n': 'https://n8n.io',
	'飞书': 'https://www.feishu.cn',
	'Feishu': 'https://www.feishu.cn',
	'Lark': 'https://www.larksuite.com',
	'Supabase': 'https://supabase.com',
	'Tailscale': 'https://tailscale.com',
	'GreenCloudVPS': 'https://greencloudvps.com',
	'openEuler': 'https://www.openeuler.org',
	'HarmonyOS': 'https://www.harmonyos.com',
	'Moltbook': 'https://www.moltbook.com',
};

export const GITHUB_PROJECT_SLUGS: Record<string, string> = {
	'Orca': 'stablyai/orca',
	'Nami': 'mrdainami/nami',
	'OpenMausBot': 'milind-soni/OpenMausBot',
	'waku-agent': 'ShenSeanChen/waku-agent',
	'OpenHands': 'All-Hands-AI/OpenHands',
};
