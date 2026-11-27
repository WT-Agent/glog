import { ENTITY_OFFICIAL_URLS, GITHUB_PROJECT_SLUGS } from '../data/entity-links.ts';

const SKIP_CONTAINER_TYPES = new Set([
	'link',
	'linkReference',
	'definition',
	'heading',
	'code',
	'html',
	'yaml',
	'toml',
]);

const IGNORED_PATH_PREFIXES = new Set([
	'src',
	'app',
	'lib',
	'dist',
	'public',
	'assets',
	'content',
	'blog',
	'pages',
	'api',
	'docs',
	'scripts',
	'skills',
	'scratch',
	'node_modules',
	'usr',
	'etc',
	'var',
	'tmp',
	'home',
	'users',
]);

const IGNORED_FILE_EXTENSIONS = /\.(md|mdx|ts|tsx|js|jsx|mjs|cjs|astro|json|jpg|jpeg|png|webp|svg|db|sqlite|yml|yaml|sh|py|css|scss|html|pdf|txt|log)$/i;

/**
 * 构建按长度降序排列的实体匹配正则，确保长词（如 "Claude Code"）优先于短词（"Claude"）。
 */
function buildEntityMap() {
	/** @type {Map<string, string>} */
	const map = new Map();
	for (const [name, url] of Object.entries(ENTITY_OFFICIAL_URLS)) {
		map.set(name, url);
	}
	for (const [name, slug] of Object.entries(GITHUB_PROJECT_SLUGS)) {
		if (!map.has(name)) {
			map.set(name, `https://github.com/${slug}`);
		}
	}
	return map;
}

const ENTITY_MAP = buildEntityMap();
const SORTED_ENTITIES = [...ENTITY_MAP.keys()].sort((a, b) => b.length - a.length);

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const ENTITY_ALT = SORTED_ENTITIES.map(escapeRegex).join('|');
// 匹配已知实体名，或标准 GitHub `owner/repo` 形式
const COMBINED_PATTERN = new RegExp(
	`(?<![A-Za-z0-9_./~@-])(?:(${ENTITY_ALT})|([A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?\\/[A-Za-z0-9._-]{2,64}))(?![A-Za-z0-9_./-])`,
	'g'
);

/**
 * 判断 `owner/repo` 候选串是否为真实 GitHub 仓库而非本地路径。
 * @param {string} candidate
 */
function isValidGithubSlug(candidate) {
	const parts = candidate.split('/');
	if (parts.length !== 2) return false;
	const [owner, repo] = parts;
	if (!owner || !repo) return false;
	if (IGNORED_PATH_PREFIXES.has(owner.toLowerCase())) return false;
	if (IGNORED_FILE_EXTENSIONS.test(repo)) return false;
	if (repo.startsWith('.')) return false;
	return true;
}

/**
 * 解析匹配到的词条对应的外链 URL。
 * @param {string} matched
 * @param {string | undefined} entityGroup
 * @param {string | undefined} repoGroup
 */
function resolveUrl(matched, entityGroup, repoGroup) {
	if (entityGroup && ENTITY_MAP.has(matched)) {
		return { key: matched, url: ENTITY_MAP.get(matched) };
	}
	if (repoGroup && isValidGithubSlug(matched)) {
		return { key: matched, url: `https://github.com/${matched}` };
	}
	return null;
}

/**
 * 创建带安全外链属性的 mdast link 节点。
 * @param {string} url
 * @param {any[]} children
 */
function createExternalLinkNode(url, children) {
	return {
		type: 'link',
		url,
		title: null,
		children,
		data: {
			hProperties: {
				target: '_blank',
				rel: 'noopener noreferrer',
			},
		},
	};
}

/**
 * 拆分纯文本节点，仅对本篇首次出现的实体注入外链。
 * @param {string} text
 * @param {Set<string>} seen
 */
function splitTextWithLinks(text, seen) {
	COMBINED_PATTERN.lastIndex = 0;
	const nodes = [];
	let lastIndex = 0;
	let match;

	while ((match = COMBINED_PATTERN.exec(text)) !== null) {
		const matched = match[0];
		const resolved = resolveUrl(matched, match[1], match[2]);
		if (!resolved || seen.has(resolved.key)) {
			continue;
		}

		seen.add(resolved.key);
		if (match.index > lastIndex) {
			nodes.push({ type: 'text', value: text.slice(lastIndex, match.index) });
		}
		nodes.push(
			createExternalLinkNode(resolved.url, [{ type: 'text', value: matched }])
		);
		lastIndex = match.index + matched.length;
	}

	if (nodes.length === 0) return null;
	if (lastIndex < text.length) {
		nodes.push({ type: 'text', value: text.slice(lastIndex) });
	}
	return nodes;
}

/**
 * 递归遍历并原地替换子节点数组。
 * @param {any} node
 * @param {Set<string>} seen
 */
function walkAndLink(node, seen) {
	if (!node || !Array.isArray(node.children)) return;

	const nextChildren = [];
	for (const child of node.children) {
		if (SKIP_CONTAINER_TYPES.has(child.type)) {
			nextChildren.push(child);
			continue;
		}

		if (child.type === 'text' && typeof child.value === 'string') {
			const replaced = splitTextWithLinks(child.value, seen);
			if (replaced) {
				nextChildren.push(...replaced);
			} else {
				nextChildren.push(child);
			}
			continue;
		}

		if (child.type === 'inlineCode' && typeof child.value === 'string') {
			const val = child.value.trim();
			let url = ENTITY_MAP.get(val);
			if (!url && isValidGithubSlug(val)) {
				url = `https://github.com/${val}`;
			}
			if (url && !seen.has(val)) {
				seen.add(val);
				nextChildren.push(createExternalLinkNode(url, [child]));
				continue;
			}
			nextChildren.push(child);
			continue;
		}

		walkAndLink(child, seen);
		nextChildren.push(child);
	}
	node.children = nextChildren;
}

/**
 * Remark 插件：自动为固定大厂 AI 名、开源项目及 GitHub `owner/repo` 注入外链（每篇首次出现生效）。
 */
export default function remarkEntityLinks() {
	return (tree) => {
		const seen = new Set();
		walkAndLink(tree, seen);
	};
}
