import type { CollectionEntry } from 'astro:content';

export interface ProjectItem {
	title: string;
	zhTitle?: string;
	enTitle?: string;
	category: string;
	zhCategory?: string;
	zhDescription?: string;
	enDescription?: string;
	description?: string;
	link?: string;
	tags: string[];
	matchKeywords?: string[];
	status: 'Active' | 'Live' | 'Divested' | 'Legacy';
	gradient: string;
}

export const PROJECTS: ProjectItem[] = [
	{
		title: "优尼沃OS (univerOS)",
		zhTitle: "优尼沃OS (univerOS)",
		enTitle: "univerOS",
		category: "Core Infrastructure",
		zhCategory: "核心基建",
		zhDescription: "面向下一代自主工程交付的智能体操作系统内核与自动化交付平台。",
		enDescription: "The next-generation Agentic OS kernel and autonomous engineering platform with distributed state machines.",
		link: "https://univeros.cn",
		tags: ["Agentic OS", "Infrastructure", "AI Engineering"],
		matchKeywords: ["Agentic OS", "Antigravity", "Agent Governance", "Coding Agent", "Harness", "AI Agent"],
		status: "Active",
		gradient: "from-blue-600/20 to-indigo-500/20"
	},
	{
		title: "优尼沃董秘 (univerDM)",
		zhTitle: "优尼沃董秘 (univerDM)",
		enTitle: "univerDM",
		category: "Executive AI",
		zhCategory: "决策参谋",
		zhDescription: "董事长智能决策参谋系统，AI 实时扫描企业经营数据，自动发现偏差，预警风险与行业对标。",
		enDescription: "AI-driven executive decision copilot and board secretary, continuously scanning business metrics, detecting operational variances, and mitigating strategic risks.",
		link: "https://wangteng.tech",
		tags: ["Executive AI", "Decision Copilot", "Enterprise"],
		matchKeywords: ["企业治理", "组织管理", "制度经济学"],
		status: "Active",
		gradient: "from-blue-600/20 to-teal-500/20"
	},
	{
		title: "优尼沃衍界 (univerVision)",
		zhTitle: "优尼沃衍界 (univerVision)",
		enTitle: "univerVision",
		category: "AIGC Vision",
		zhCategory: "视觉生成",
		zhDescription: "企业级 AI 视频生成全链路 Pipeline 平台，首创三层场景记忆与专业短剧/电商一致性视觉生成。",
		enDescription: "Enterprise AIGC video generation pipeline platform featuring multi-stage orchestration, scene consistency, and commercial video synthesis.",
		link: "https://wangteng.tech",
		tags: ["AIGC Vision", "Video Pipeline", "Generative AI"],
		matchKeywords: ["UE5", "实时渲染", "虚拟直播"],
		status: "Active",
		gradient: "from-purple-600/20 to-pink-500/20"
	},
	{
		title: "无限IOT (Wuxian IoT)",
		zhTitle: "无限IOT (Wuxian IoT)",
		enTitle: "Wuxian IoT",
		category: "Core Venture",
		zhCategory: "核心业务",
		zhDescription: "全平台物联网多级分销系统与智能设备云管平台，融合广告平台流量变现、多级分销结算与软硬件一体化设备管理体系，赋能私域商业与企业级物联生态。",
		enDescription: "Full-platform IoT multi-level distribution system and device cloud management, empowering hardware-software private domain distribution.",
		link: "https://wuxian.xyz",
		tags: ["IoT Platform", "Cloud Management", "Distribution", "AdTech"],
		matchKeywords: ["嵌入式与边缘网络实战", "流量套利"],
		status: "Live",
		gradient: "from-emerald-600/20 to-teal-500/20"
	},
	{
		title: "agentFriendly.network",
		category: "Agent Fabric",
		zhCategory: "智能体网络",
		zhDescription: "面向自主智能体的开放交互与协议互通网络（AFN），打破 Agent 间的信息孤岛与调用壁垒。",
		enDescription: "An open interaction and interoperability protocol network designed specifically for autonomous agents.",
		link: "https://agentfriendly.network",
		tags: ["AFN", "Agent Interop", "Protocol"],
		matchKeywords: ["AFN", "Multi-Agent", "Remote Control", "Lazy Consensus"],
		status: "Active",
		gradient: "from-teal-600/20 to-emerald-500/20"
	},
	{
		title: "agentUniver.com",
		category: "Agent Marketplace",
		zhCategory: "智能体市场",
		zhDescription: "全球首个去中心化自主智能体分发与交易市场（Global Agent Marketplace），提供跨平台 Agent 纳管、垂直技能包上架分发与智能体经济调度。",
		enDescription: "The global decentralized autonomous AI Agent marketplace, enabling multi-agent discovery, distribution, specialized skill packaging, and agentic economic coordination.",
		link: "https://agentuniver.com",
		tags: ["Agent Marketplace", "AI Economy", "Distribution", "Ecosystem"],
		matchKeywords: ["MaaS", "Agent Workbench", "Agent Teams", "算力经济学"],
		status: "Active",
		gradient: "from-blue-600/20 to-cyan-500/20"
	},
	{
		title: "bibleOS.ai",
		category: "Civilizational OS",
		zhCategory: "文明协议",
		zhDescription: "分布式文明进化协议与高阶智能体生存底座。超越单一数字备份或中心化超脑，BibleOS 作为文明基因库，定义最低行动量知识传承。",
		enDescription: "A distributed civilizational evolution protocol and persistent intelligence substrate.",
		link: "https://bibleos.ai",
		tags: ["Civilizational OS", "Evolution Protocol", "AI Kernel"],
		matchKeywords: ["Whitepaper", "数字主权", "Antigravity"],
		status: "Active",
		gradient: "from-purple-600/20 to-indigo-500/20"
	},
	{
		title: "npcMatrix.com",
		category: "Game AI",
		zhCategory: "游戏智能",
		zhDescription: "面向新一代沉浸式游戏与虚拟世界的具身 NPC 智能矩阵，赋能具备持久记忆、自适应决策的动态智能体生态。",
		enDescription: "Embodied NPC intelligence matrix for next-gen virtual worlds and simulation games.",
		link: "https://npcmatrix.com",
		tags: ["Embodied AI", "Game AI", "NPC Matrix"],
		matchKeywords: ["AI游戏", "移动游戏", "独立游戏"],
		status: "Active",
		gradient: "from-amber-600/20 to-orange-500/20"
	},
	{
		title: "LLMmatrix.com",
		category: "Inference Mesh",
		zhCategory: "推理网格",
		zhDescription: "高并发大模型推理网格与异构路由调度中枢。项目现已从核心矩阵完成独立剥离，计划捐赠至开源基金会或公益生态长期运作。",
		enDescription: "High-concurrency LLM inference mesh and router. Successfully divested from core operations and scheduled for public donation to open-source governance.",
		link: "https://llmmatrix.com",
		tags: ["Inference Mesh", "LLM Gateway", "Model Router", "Donation Pending"],
		matchKeywords: ["Benchmark", "DeepSeek", "Claude 4.5", "Gemini 3 Pro", "Gemini"],
		status: "Divested",
		gradient: "from-rose-600/20 to-pink-500/20"
	},
	{
		title: "Qiulot.com",
		category: "Web3 & GameFi",
		zhCategory: "Web3 与游戏",
		zhDescription: "全球体育赛事竞技预测平台与商业品牌门户，深度耕耘赔率引擎、赛事激励模型与数字资产。",
		enDescription: "Global sports prediction market platform and commercial brand portal, cultivating odds engines, event incentives, and digital entertainment.",
		link: "https://qiulot.com",
		tags: ["Prediction Market", "Sports Tech", "Brand Portal", "Commercial"],
		status: "Active",
		gradient: "from-blue-600/20 to-cyan-500/20"
	},
	{
		title: "Qiulot.org",
		category: "DAO & Governance",
		zhCategory: "DAO 与治理",
		zhDescription: "Qiulot 预测协议非盈利生态与 DAO 治理社区门户，承载社区仲裁规则、协议公约与去中心化提案演进。",
		enDescription: "Non-profit foundation and DAO governance portal for the Qiulot protocol, managing community arbitration, protocol rules, and decentralized proposals.",
		link: "https://qiulot.org",
		tags: ["DAO", "Governance", "Non-profit", "Decentralized"],
		status: "Active",
		gradient: "from-indigo-600/20 to-purple-500/20"
	},
	{
		title: "Qiulot.io",
		category: "NFT Marketplace",
		zhCategory: "NFT 市场",
		zhDescription: "去中心化体育赛事与游戏资产 NFT 交易市场，提供赛事数字藏品铸造、盲盒发售、二级流动性交易与资产跨链质押。",
		enDescription: "The decentralized sports and gaming NFT marketplace, enabling digital collectible minting, secondary trading, and cross-chain asset liquidity.",
		link: "https://qiulot.io",
		tags: ["NFT Marketplace", "Web3", "Sports Collectibles", "Digital Assets"],
		status: "Active",
		gradient: "from-cyan-600/20 to-blue-500/20"
	},
	{
		title: "Icehoo Engine",
		category: "Core Venture",
		zhCategory: "核心业务",
		zhDescription: "基于 B.E.D. 技术栈 (Bun + Elysia + Drizzle) 构建的模块化“游戏即服务”(GaaS) 平台，提供统一身份凭证 (Icehoo ID)、Web3 资产托管与高并发实时数据处理能力。",
		enDescription: "A highly modular 'Game-as-a-Service' (GaaS) platform built with the B.E.D. Stack (Bun + Elysia + Drizzle), providing unified identity, Web3 asset management, and high-performance concurrent processing.",
		link: "https://icehoo.com",
		tags: ["GaaS", "B.E.D. Stack", "Backend"],
		status: "Active",
		gradient: "from-blue-700/20 to-sky-600/20"
	},
	{
		title: "Yin's Smart Mobility",
		zhTitle: "智能挪车系统 (FlashMove)",
		enTitle: "Yin's Smart Mobility",
		category: "Core Venture",
		zhCategory: "核心业务",
		zhDescription: "极速私家车挪车隐私守护系统。基于“无介质车辆感知识别”与非标车物理 ID 绑定技术，重构社区文明出行秩序与敏捷物联感知 (Project FlashMove)。",
		enDescription: "An ultra-fast private car-moving protection system driven by medialess vehicle identification and physical ID binding, establishing neighborhood travel order (Project FlashMove).",
		tags: ["Smart Mobility", "Privacy", "IoT"],
		status: "Active",
		gradient: "from-emerald-500/20 to-teal-500/20"
	},
	{
		title: "ISMN (Invasive Species Management Network)",
		zhTitle: "外来入侵物种综合治理网络 (ISMN)",
		enTitle: "ISMN",
		category: "EcoTech & IoT",
		zhCategory: "生态科技",
		zhDescription: "外来入侵物种综合治理与智能监测网络平台，融合物联网边缘感知、地理信息系统（GIS）与生态物种识别算法，构建全生命周期监测与防控体系。",
		enDescription: "An intelligent monitoring and management network for invasive species, integrating IoT edge sensing, GIS tracking, and automated ecological identification.",
		tags: ["EcoTech", "GIS", "Invasive Species", "IoT"],
		matchKeywords: ["生物安全", "公共卫生"],
		status: "Active",
		gradient: "from-emerald-600/20 to-teal-500/20"
	},
	{
		title: "GSirInvestment",
		zhTitle: "个人资产智能 (GSirInvestment)",
		enTitle: "GSirInvestment",
		category: "Personal Project",
		zhCategory: "个人项目",
		zhDescription: "个人资产智能与交易决策复盘系统。立足“底账摸底先行、资产状态穿透、情绪博弈辅助、交易纪律约束”，坚持本地优先（Local-First）与私有化存储。",
		enDescription: "Personal AI Asset Agent and trading decision flight recorder, emphasizing balance-sheet first, discipline enforcement, and local-first privacy.",
		tags: ["Personal Project", "Asset Intelligence", "Decision Recorder", "Local-First"],
		matchKeywords: ["Unit Economics", "AI融资", "Circular Financing", "离岸信托"],
		status: "Active",
		gradient: "from-emerald-500/20 to-cyan-500/20"
	},
	{
		title: "AI-Livestreaming",
		zhTitle: "AI 无人直播系统 (AI-Livestreaming)",
		enTitle: "AI-Livestreaming",
		category: "Personal Project",
		zhCategory: "个人项目",
		zhDescription: "7x24 小时全自动无人值守循环直播基础设施与虚拟导播台。采用伴侣原生合规物理注入与双音轨解耦架构，结合动态画面熵增防风控体系。",
		enDescription: "AI 24/7 automated companion-native virtual livestreaming infrastructure and web studio, featuring dual-audio track decoupling and dynamic frame entropy.",
		tags: ["Personal Project", "AIGC", "Livestreaming", "Virtual Studio", "Automation"],
		matchKeywords: ["虚拟直播", "绿幕抠像", "UE5"],
		status: "Active",
		gradient: "from-red-500/20 to-pink-500/20"
	},
	{
		title: "AliGenie",
		zhTitle: "天猫精灵大模型中继 (AliGenie)",
		enTitle: "AliGenie",
		category: "Personal Project",
		zhCategory: "个人项目",
		zhDescription: "天猫精灵硬件大模型语音中继桥接系统。通过自定义语音技能与 Webhook 调度，将传统智能音箱打造成具备长上下文理解能力的私有 AI 语音助理。",
		enDescription: "Custom voice skill and LLM webhook bridge for AliGenie / Tmall Genie hardware, turning smart speakers into intelligent private AI assistants.",
		tags: ["Personal Project", "Smart Home", "AliGenie", "Voice AI", "LLM Bridge"],
		matchKeywords: ["AliGenie", "Voice AI"],
		status: "Active",
		gradient: "from-amber-500/20 to-orange-500/20"
	},
	{
		title: "Sublime Markdown Preview",
		category: "Personal Project",
		zhCategory: "个人项目",
		zhDescription: "专为 Sublime Text 打造的轻量高效 Markdown 实时预览与排版渲染工作流，支持 GitHub 风格渲染、数学公式与本地即时同步。",
		enDescription: "A lightweight and extensible Markdown previewing workflow for Sublime Text, supporting GitHub-flavored Markdown, LaTeX syntax, and seamless local browser rendering.",
		tags: ["Personal Project", "Sublime Text", "Markdown", "Developer Tool", "Workflow"],
		matchKeywords: ["VS Code", "Continue.dev", "开发效能"],
		status: "Active",
		gradient: "from-orange-600/20 to-amber-500/20"
	},
	{
		title: "Home Office Camera",
		category: "Personal Project",
		zhCategory: "个人项目",
		zhDescription: "SOHO 极简网络视频监控与自动化归档系统，基于 Windows Server 驱动与 NAS 本地存储，实现低功耗 7x24 小时连续录像与事件抓拍。",
		enDescription: "SOHO monitoring and recording setup, connecting web cameras to local server for automated 7x24 recording and secure NAS backups.",
		tags: ["Personal Project", "SOHO", "Surveillance", "NAS Backup"],
		status: "Active",
		gradient: "from-blue-500/20 to-indigo-500/20"
	},
	{
		title: "钧曦智能 (Junxi Intelligent)",
		zhTitle: "钧曦智能 (Junxi Intelligent)",
		enTitle: "Junxi Intelligent",
		category: "Legacy Venture",
		zhCategory: "归档业务",
		zhDescription: "前沿人工智能技术原型探索、实验性数字化资产与高频创新实验室（已归档）。",
		enDescription: "Frontier AI exploration, experimental digital assets, and high-frequency innovation lab under the corporate matrix (Archived Legacy).",
		link: "https://junxi.xyz",
		tags: ["Legacy", "Innovation Lab", "Frontier Tech"],
		status: "Legacy",
		gradient: "from-purple-600/20 to-pink-500/20"
	},
	{
		title: "OhBona",
		category: "Legacy Venture",
		zhCategory: "归档业务",
		zhDescription: "致力于打破传统问答式对话交互。通过“感知 -> 路径规划 -> 极简确认”闭环，将 AI 从“聊天机器人”演进为高粘性的任务型数字个人助理（已归档）。",
		enDescription: "Dedicated to breaking traditional dialog interactions. Through the closed loop of 'Perception -> Path Planning -> Minimalist Confirmation', it evolved AI from a chatbot into a sticky digital assistant (Archived).",
		tags: ["Legacy", "AI Agent", "Task Execution", "UX Design"],
		status: "Legacy",
		gradient: "from-purple-500/20 to-blue-500/20"
	},
	{
		title: "YouTube Transcript Automation Factory",
		zhTitle: "YouTube 字幕自动化工厂",
		enTitle: "YouTube Transcript Automation Factory",
		category: "Legacy Project",
		zhCategory: "归档项目",
		zhDescription: "YouTube 视频字幕与音频自动化处理流水线，集成 Google Sheets 同步与本地 Faster-Whisper 音频高精度转录与归档（已归档）。",
		enDescription: "An automated pipeline for fetching YouTube transcripts, syncing with Google Sheets, and processing audio with Faster-Whisper for high-accuracy local transcription and archival (Archived).",
		link: "https://github.com/wt-wx/youtube-transcript-tool",
		tags: ["Legacy", "Python", "Automation", "Whisper AI"],
		matchKeywords: ["youtube", "n8n", "自动化", "工作流"],
		status: "Legacy",
		gradient: "from-red-600/20 to-orange-500/20"
	},
	{
		title: "NGFS",
		zhTitle: "下一代分布式文件系统 (NGFS)",
		enTitle: "NGFS",
		category: "Professional Legacy",
		zhCategory: "过往项目",
		zhDescription: "下一代分布式文件系统架构，探索超低时延与高吞吐底层存储系统的工程边界。",
		enDescription: "Next Generation File System - A core storage architecture project from a previous company, exploring the boundaries of high-performance file systems.",
		tags: ["Storage", "Systems Programming"],
		matchKeywords: ["分布式架构"],
		status: "Legacy",
		gradient: "from-cyan-500/20 to-sky-500/20"
	},
	{
		title: "Zui.News",
		category: "Professional Legacy",
		zhCategory: "过往项目",
		zhDescription: "去中心化语境下的 Web3 新闻资讯与内容分发协议平台（待重启）。",
		enDescription: "A Web3 news information platform exploring content distribution mechanisms in a decentralized context (Pending Reboot).",
		tags: ["Web3", "Content Platform", "Decentralized"],
		status: "Legacy",
		gradient: "from-violet-500/20 to-fuchsia-500/20"
	}
];

function scoreProjectMatch(project: ProjectItem, post: CollectionEntry<'blog'>): number {
	const keywords = project.matchKeywords;
	if (!keywords || keywords.length === 0) return 0;

	const postTags = (post.data.tags || []).map((t) => t.toLowerCase());
	const postSeries = (post.data.series || '').toLowerCase();
	const postTitle = post.data.title.toLowerCase();
	const postId = post.id.toLowerCase();

	let score = 0;
	for (const kw of keywords) {
		const lower = kw.toLowerCase();
		if (postTags.includes(lower)) score += 3;
		else if (postSeries.includes(lower)) score += 2;
		else if (postTitle.includes(lower) || postId.includes(lower)) score += 2;
	}
	return score;
}

export function getRelatedPostsForProject(
	project: ProjectItem,
	posts: CollectionEntry<'blog'>[],
	limit = 2
): CollectionEntry<'blog'>[] {
	return posts
		.map((post) => ({ post, score: scoreProjectMatch(project, post) }))
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
		.slice(0, limit)
		.map((item) => item.post);
}

export function getRelatedProjectsForPost(
	post: CollectionEntry<'blog'>,
	limit = 3
): ProjectItem[] {
	return PROJECTS.map((project) => ({ project, score: scoreProjectMatch(project, post) }))
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((item) => item.project);
}
