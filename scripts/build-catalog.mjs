#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAll } from "../lib/load.mjs";
import { validateLoaded } from "../lib/validate.mjs";
import { PAGES, GH, START_URL, profileUrl, treeUrl, teamUrl } from "../lib/urls.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const loaded = loadAll(root);
const result = validateLoaded(loaded);
if (result.errors.length) {
  for (const e of result.errors) console.error(e.file, e.msg);
  process.exit(1);
}
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const shareFile = path.join(root, "catalog", "share-links.json");
const shareLinks = fs.existsSync(shareFile)
  ? JSON.parse(fs.readFileSync(shareFile, "utf8")).links || {}
  : {};

function shareFor(t) {
  return t.share_url || shareLinks[t.id] || null;
}

const templates = loaded.templates.map((t) => {
  const share = shareFor(t);
  return {
    id: t.id,
    name: t.name,
    title: t.title,
    category: t.category,
    autonomy: t.autonomy,
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

const catalog = {
  name: "grok-bot-cn",
  version: pkg.version,
  api_version: "v1",
  schema_revision: "2026-08-29",
  spec: `${GH}/blob/main/SPEC.md`,
  start_url: START_URL,
  pages_url: `${PAGES}/`,
  counts: result.counts,
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
  version: pkg.version,
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

const dir = path.join(root, "catalog");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n");

const docs = path.join(root, "docs");
fs.mkdirSync(path.join(docs, "api", "v1"), { recursive: true });
fs.writeFileSync(path.join(docs, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n");
fs.writeFileSync(path.join(docs, "api", "v1", "catalog.json"), JSON.stringify(api, null, 2) + "\n");
fs.writeFileSync(
  path.join(docs, "api", "v1", "teams.json"),
  JSON.stringify({ api_version: "v1", count: teams.length, items: teams }, null, 2) + "\n"
);
fs.writeFileSync(path.join(docs, "api", "v1", "status.json"), JSON.stringify(status, null, 2) + "\n");
fs.writeFileSync(path.join(docs, "api", "v1", "index.json"), JSON.stringify(index, null, 2) + "\n");
fs.writeFileSync(path.join(docs, "llms.txt"), llms);

console.log(`catalog.json  ${catalog.templates.length} templates`);
