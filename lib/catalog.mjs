import fs from "node:fs";
import path from "node:path";
import { GH, PAGES, START_URL, profileUrl, treeUrl, teamUrl } from "./urls.mjs";

export const SCHEMA_REVISION = "2026-08-29";

export function loadShareLinks(root) {
  const shareFile = path.join(root, "catalog", "share-links.json");
  if (!fs.existsSync(shareFile)) return {};
  return JSON.parse(fs.readFileSync(shareFile, "utf8")).links || {};
}

export function shareFor(t, shareLinks = {}) {
  return t.share_url || shareLinks[t.id] || null;
}

export function buildCatalog(loaded, { version, shareLinks = {} } = {}) {
  const templates = loaded.templates.map((t) => {
    const share = shareFor(t, shareLinks);
    return {
      id: t.id,
      name: t.name,
      title: t.title,
      category: t.category,
      autonomy: t.autonomy,
      status: t.status,
      tagline: t.tagline,
      why: t.why,
      plugins: t.plugins,
      featured: !!t.featured,
      official_use_case: !!t.official_use_case,
      path: t._rel,
      profile_url: profileUrl(t),
      tree_url: treeUrl(t),
      share_url: share,
      tags: t.tags || [],
    };
  });

  const teams = loaded.teams.map((t) => ({
    id: t.id,
    name: t.name,
    lead: t.lead,
    bots: t.bots,
    why: t.why,
    autonomy: t.autonomy || "L1",
    yaml_url: teamUrl(t),
  }));

  const counts = {
    templates: loaded.templates.length,
    teams: loaded.teams.length,
    skills: loaded.skills.length,
    routines: loaded.routines.length,
    patterns: loaded.patterns.length,
  };

  const catalog = {
    name: "grok-bot-cn",
    version,
    api_version: "v1",
    schema_revision: SCHEMA_REVISION,
    spec: `${GH}/blob/main/SPEC.md`,
    start_url: START_URL,
    pages_url: `${PAGES}/`,
    counts,
    templates,
    teams,
    skills: loaded.skills.map((s) => ({ id: s.id, name: s.name })),
    routines: loaded.routines.map((r) => ({
      id: r.id,
      name: r.name,
      owner: r.owner,
      cadence: r.cadence,
    })),
    patterns: loaded.patterns.map((p) => ({ id: p.id, name: p.name, summary: p.summary })),
  };

  const api = {
    generated_from: catalog.version,
    api_version: "v1",
    schema_revision: catalog.schema_revision,
    status_url: `${PAGES}/api/v1/status.json`,
    count: templates.length,
    start_url: START_URL,
    items: templates,
    teams,
  };

  const status = {
    name: "grok-bot-cn",
    version,
    api_version: "v1",
    schema_revision: catalog.schema_revision,
    start_url: START_URL,
    catalog_url: `${PAGES}/catalog.json`,
    pages_url: `${PAGES}/`,
    repo_url: GH,
    capabilities: ["list", "teams", "profiles", "start"],
    install: "创建一个名为 Setup 的 Bot。粘贴 START.md。点击一个团队。停留在 L1。",
    notices: [],
    deprecations: [],
  };

  const index = {
    api_version: "v1",
    endpoints: {
      status: `${PAGES}/api/v1/status.json`,
      catalog: `${PAGES}/api/v1/catalog.json`,
      teams: `${PAGES}/api/v1/teams.json`,
      catalog_alias: `${PAGES}/catalog.json`,
      start: START_URL,
      agent: `${PAGES}/agent.html`,
    },
  };

  const llms = `# grok-bot-cn

> Grok Bot 的操作契约。规格、团队、技能、例行程序。

把它粘贴到名为 Setup 的 Bot 中（无需 Node）：
${START_URL}

目录 JSON：${PAGES}/catalog.json
API：${PAGES}/api/v1/index.json
规格：${GH}/blob/main/SPEC.md
网站：${PAGES}/

第一周是 L1 草稿 —— 可审查的产出物，不发送/发布/支付/合并/碰生产环境。
`;

  return { catalog, api, status, index, llms };
}
