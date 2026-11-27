/**
 * 集中维护正文实体外链映射表：
 * 1. ENTITY_OFFICIAL_URLS: 大厂 AI 产品、基础设施与固定官网外链
 * 2. GITHUB_PROJECT_SLUGS: 开源/独立项目短名到 GitHub `owner/repo` 的映射
 */

export const ENTITY_OFFICIAL_URLS: Record<string, string> = {
	// 大厂 AI 模型与编程产品
	'OpenAI': 'https://openai.com',
	'ChatGPT': 'https://chatgpt.com',
	'Anthropic': 'https://www.anthropic.com',
	'Claude Code': 'https://docs.anthropic.com/en/docs/claude-code/overview',
	'Claude': 'https://claude.ai',
	'DeepSeek': 'https://www.deepseek.com',
	'Cursor': 'https://www.cursor.com',
	'Gemini': 'https://gemini.google.com',
	'Grok': 'https://x.ai',
	'xAI': 'https://x.ai',
	'Manus': 'https://manus.im',

	// 基础设施与开发栈
	'GitHub': 'https://github.com',
	'Cloudflare': 'https://www.cloudflare.com',
	'Vercel': 'https://vercel.com',
	'Astro': 'https://astro.build',
	'Gitea': 'https://about.gitea.com',
	'NATS': 'https://nats.io',
	'PostgreSQL': 'https://www.postgresql.org',
	'n8n': 'https://n8n.io',
};

export const GITHUB_PROJECT_SLUGS: Record<string, string> = {
	'Orca': 'stablyai/orca',
	'Nami': 'mrdainami/nami',
	'OpenMausBot': 'milind-soni/OpenMausBot',
	'waku-agent': 'ShenSeanChen/waku-agent',
};
