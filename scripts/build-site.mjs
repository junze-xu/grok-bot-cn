#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAll } from "../lib/load.mjs";
import { PAGES, GH, START_URL, profileUrl, treeUrl, teamUrl } from "../lib/urls.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const loaded = loadAll(root);
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const shareFile = path.join(root, "catalog", "share-links.json");
const shareLinks = fs.existsSync(shareFile)
  ? JSON.parse(fs.readFileSync(shareFile, "utf8")).links || {}
  : {};

// i18n
const i18n = JSON.parse(
  fs.readFileSync(path.join(root, "i18n", "site.json"), "utf8")
);
const LANGS = ["zh", "en", "ja", "ko"];
const langName = (l) => i18n[l]?.["lang.name"] || l;

const cats = [
  "meta",
  "engineering",
  "product",
  "sales",
  "marketing",
  "ops",
  "support",
  "research",
  "personal",
  "legal",
  "finance",
  "creator",
];

const START_HERE = [
  "pr-reviewer",
  "inbox-triage",
  "chief-of-staff",
  "research-desk",
  "sales-outbound",
  "bug-reproduction",
  "competitor-watch",
  "installer",
];

const JOBS = [
  { label: "审查 PR", q: "pr reviewer github" },
  { label: "邮件分类", q: "inbox gmail" },
  { label: "每周摘要", q: "chief of staff" },
  { label: "带引用的研究", q: "research desk" },
  { label: "销售外联", q: "outbound" },
  { label: "复现 Bug", q: "bug reproduction" },
  { label: "监控竞品", q: "competitor" },
  { label: "组建团队", q: "setup installer" },
];

const TEAM_CAT = {
  "ceo-office": "meta",
  eng: "engineering",
  release: "engineering",
  marketing: "marketing",
  creator: "creator",
  meta: "meta",
  ops: "ops",
  personal: "personal",
  product: "product",
  research: "research",
  sales: "sales",
  service: "support",
};

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function flat(s) {
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim();
}

function escAttr(s) {
  return esc(flat(s));
}

function shareFor(t) {
  return t.share_url || shareLinks[t.id] || "";
}

function pluginPills(plugins) {
  if (!plugins || !plugins.length) {
    return '<span class="pill plugin" data-i18n="card.browser">浏览器</span>';
  }
  return plugins.map((p) => `<span class="pill plugin">${esc(p)}</span>`).join("");
}

function searchBlob(t) {
  return [
    t.id,
    t.name,
    t.title,
    t.tagline,
    t.job,
    t.why,
    ...(t.plugins || []).length ? t.plugins : ["浏览器"],
    ...(t.tags || []),
    t.first_task,
    t.featured ? "精选" : "",
  ]
    .join(" ")
    .toLowerCase();
}

function cardHtml(t, opts = {}) {
  const raw = profileUrl(t);
  const share = shareFor(t);
  const add = share ? `<a class="add" href="${esc(share)}">添加到 Grok</a>` : "";
  const plugins = t.plugins || [];
  const pluginAttr = plugins.join(", ") || "浏览器";
  const never = (t.approval_never || []).slice(0, 3).join(" · ");
  const featured = t.featured
    ? '<span class="feat" data-i18n="card.featured">精选</span>'
    : "";
  const idAttr = opts.id ? ` id="${esc(opts.id)}"` : "";
  return `<article class="card"${idAttr} data-cat="${esc(t.category)}" data-id="${esc(
    t.id
  )}" data-name="${escAttr(t.name)}" data-plugins="${escAttr(
    pluginAttr
  )}" data-task="${escAttr(t.first_task)}" data-featured="${
    t.featured ? "1" : "0"
  }" data-q="${esc(searchBlob(t))}">
  <div class="row">
    <span class="cat">${esc(t.category)}</span>
    <span class="lvl">${esc(t.autonomy)}</span>
    ${featured}
  </div>
  <h3>${esc(t.name)}</h3>
  <p>${esc(t.tagline)}</p>
  <div class="pills">${pluginPills(plugins)}</div>
  <div class="actions">
    <button type="button" class="copy primary" data-profile="${esc(
      t.id
    )}" data-copy="${esc(raw)}" data-i18n="card.copy_profile">复制 PROFILE</button>
    <button type="button" class="copy" data-copy="${esc(raw)}" data-i18n="card.copy_link">复制链接</button>
    <a href="${esc(raw)}" data-i18n="card.raw">原始文件</a>
    <a href="${esc(treeUrl(t))}" data-i18n="card.source">源文件</a>
    ${add}
  </div>
  <details class="how">
    <summary data-i18n="card.how">如何安装此 Bot</summary>
    <ol>
      <li><span data-i18n="card.install_step1">在 Grok Bot 中：新建 → 创建新智能体。命名为</span> <strong>${esc(
        t.name
      )}</strong>。</li>
      <li data-i18n="card.install_step2">Bot 操作 → 编辑个人资料。粘贴 PROFILE（上方按钮可复制）。</li>
      <li><span data-i18n="card.install_step3">连接插件</span>：<strong>${esc(
        plugins.join(", ") || "无需额外插件 — 浏览器即可"
      )}</strong>。</li>
      <li><span data-i18n="card.install_step4">停留在 L1。发送首个任务</span>：
        <blockquote data-copy-text="${escAttr(t.first_task)}">${esc(flat(t.first_task))}</blockquote>
        <button type="button" class="copy" data-copy="${escAttr(
          t.first_task
        )}" data-i18n="card.copy_first_task">复制首个任务</button>
      </li>
    </ol>
    <p class="never"><strong data-i18n="card.never">永不</strong> ${esc(never)}</p>
  </details>
</article>`;
}

const byId = Object.fromEntries(loaded.templates.map((t) => [t.id, t]));

const featuredCards = START_HERE.filter((id) => byId[id])
  .map((id) => cardHtml(byId[id]))
  .join("\n");

const cards = loaded.templates
  .map((t) => cardHtml(t, { id: `bot-${t.id}` }))
  .join("\n");

const plugins = [
  ...new Set(
    loaded.templates.flatMap((t) =>
      t.plugins && t.plugins.length ? t.plugins : ["浏览器"]
    )
  ),
].sort((a, b) => a.localeCompare(b));

const teamCards = loaded.teams
  .map((t) => {
    const cat = TEAM_CAT[t.id] || "meta";
    const botNames = (t.bots || [])
      .map((id) => byId[id]?.name || id)
      .join(" · ");
    const q = [t.id, t.name, t.why, botNames, ...(t.plugins || []), ...(t.bots || [])]
      .join(" ")
      .toLowerCase();
    return `<article class="card team" id="team-${esc(t.id)}" data-cat="${esc(
      cat
    )}" data-q="${esc(q)}">
  <div class="row"><span class="cat">${esc(cat)}</span><span class="lvl">${esc(
      t.autonomy || "L1"
    )}</span><span class="bots-count">${(t.bots || []).length} <span data-i18n="card.bots_count">个 Bot</span></span></div>
  <h3>${esc(t.name)}</h3>
  <p>${esc(flat(t.why))}</p>
  <p class="bots">${esc(botNames)}</p>
  <div class="pills">${pluginPills(t.plugins)}</div>
  <p class="hint">${esc(
  t.id === "meta"
    ? "管理 Bot 自身的工具集——不在 START.md 的选项里，通过目录卡片单独安装。"
    : `将 START.md 粘贴到 Setup，然后点击 ${t.name}。`
)}</p>
  <div class="actions">
    <button type="button" class="copy primary" data-copy="${esc(
      t.name
    )}" data-i18n="team.copy_name">复制团队名称</button>
    <button type="button" class="copy" data-copy="${esc(
      START_URL
    )}" data-i18n="team.copy_start">复制 START.md</button>
    <a href="${esc(teamUrl(t))}">yaml</a>
  </div>
</article>`;
  })
  .join("\n");

const CSS = `
    :root {
      --bg: #07080f;
      --bg2: #0d1020;
      --card: #12162a;
      --ink: #f6f7fb;
      --mute: #9aa3b8;
      --line: #2a3150;
      --accent: #5ce1e6;
      --ok: #b6ff3d;
      --c-meta: #c084fc;
      --c-engineering: #22d3ee;
      --c-product: #60a5fa;
      --c-sales: #fbbf24;
      --c-marketing: #f472b6;
      --c-ops: #2dd4bf;
      --c-support: #fb923c;
      --c-research: #a3e635;
      --c-personal: #38bdf8;
      --c-legal: #818cf8;
      --c-finance: #facc15;
      --c-creator: #fb7185;
      --radius: 16px;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    img { max-width: 100%; height: auto; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(34, 211, 238, 0.18), transparent 55%),
        radial-gradient(900px 500px at 90% 0%, rgba(244, 114, 182, 0.16), transparent 50%),
        radial-gradient(800px 500px at 50% 110%, rgba(163, 230, 53, 0.10), transparent 55%),
        var(--bg);
      color: var(--ink);
      line-height: 1.5;
      min-height: 100%;
      max-width: 100%;
    }
    a { color: var(--accent); }
    .skip {
      position: absolute; left: -999px; top: 0;
    }
    .skip:focus {
      left: 12px; top: 12px; z-index: 20;
      background: var(--accent); color: #07080f;
      padding: 8px 12px; border-radius: 999px;
    }
    html, body { overflow-x: hidden; }
    .nav {
      position: sticky; top: 0; z-index: 10;
      display: flex; gap: 14px; align-items: center; flex-wrap: nowrap;
      padding: 10px 20px;
      background: color-mix(in srgb, var(--bg) 82%, transparent);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--line);
    }
    .nav-links {
      display: flex; gap: 14px; align-items: center;
      overflow-x: auto; -webkit-overflow-scrolling: touch;
    }
    .nav-links a { white-space: nowrap; }
    .wordmark {
      font-weight: 750; letter-spacing: -0.03em; text-decoration: none;
      color: var(--ink); margin-right: auto; flex-shrink: 0;
    }
    .wordmark span { color: var(--accent); }
    .nav-links { flex: 1; min-width: 0; justify-content: flex-end; }
    .nav a { color: var(--mute); text-decoration: none; font-size: 0.92rem; }
    .nav a:hover { color: var(--ink); }
    .lang {
      display: flex; gap: 4px; align-items: center; flex-shrink: 0;
      margin-left: 6px;
    }
    .lang button {
      background: transparent; color: var(--mute);
      border: 1px solid var(--line); border-radius: 999px;
      padding: 4px 10px; font-size: 0.8rem; cursor: pointer;
      font-family: inherit; line-height: 1.2;
    }
    .lang button.on {
      background: var(--accent); color: #07080f;
      border-color: var(--accent); font-weight: 700;
    }
    .lang button:hover { color: var(--ink); }
    .lang button.on:hover { color: #07080f; }
    header.banner {
      position: relative;
      display: grid;
      justify-items: center;
      background: #05060d;
      padding: 0 16px;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }
    header.banner img {
      display: block;
      width: 100%;
      max-width: 1160px;
      min-width: 0;
      height: auto;
      margin: 0;
    }
    header.banner::after {
      content: "";
      position: absolute; left: 0; right: 0; bottom: 0;
      height: 72px;
      background: linear-gradient(transparent, var(--bg));
      pointer-events: none;
    }
    .wrap { max-width: 1160px; margin: 0 auto; padding: 8px 20px 96px; min-width: 0; }
    h1 { font-size: clamp(1.45rem, 3vw, 2.2rem); font-weight: 750; letter-spacing: -0.03em; margin: 8px 0 8px; overflow-wrap: anywhere; }
    h2 { font-size: 1.28rem; margin: 40px 0 10px; letter-spacing: -0.02em; }
    .lede { color: var(--mute); max-width: 46rem; margin: 0 0 18px; overflow-wrap: anywhere; }
.ver { color: var(--accent); font-weight: 700; margin-left: 6px; }
    .stats {
      display: flex; gap: 10px; flex-wrap: wrap;
      list-style: none; padding: 0; margin: 18px 0 22px;
    }
    .stats li {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 0.88rem;
      color: var(--mute);
    }
    .stats strong { color: var(--ink); font-weight: 700; }
    .stats li:nth-child(1) strong { color: var(--c-engineering); }
    .stats li:nth-child(2) strong { color: var(--c-marketing); }
    .stats li:nth-child(3) strong { color: var(--c-research); }
    .stats li:nth-child(4) strong { color: var(--c-sales); }
    .stats li:nth-child(5) strong { color: var(--ok); }
    .doors {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 8px 0 28px;
    }
    .door {
      background: linear-gradient(180deg, rgba(255,255,255,0.04), transparent 40%), var(--card);
      border: 1px solid var(--line);
      border-radius: 20px;
      padding: 20px 22px 18px;
      position: relative;
      overflow: hidden;
      min-width: 0;
    }
    .door:first-child { box-shadow: inset 3px 0 0 var(--c-engineering); }
    .door:last-child { box-shadow: inset 3px 0 0 var(--c-marketing); }
    .kicker {
      margin: 0 0 6px;
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--mute);
    }
    .door h2 { margin: 0 0 10px; }
    .door ol { margin: 0; padding-left: 1.2rem; }
    .door li { margin: 8px 0; }
    .copyrow {
      display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
      margin-top: 6px; background: #07080f; border: 1px solid var(--line);
      border-radius: 10px; padding: 8px 10px;
      max-width: 100%;
    }
    .copyrow code {
      font-size: 12.5px; color: var(--accent);
      overflow-wrap: anywhere; word-break: break-all;
      min-width: 0; flex: 1 1 12rem;
    }
    button.copy, .actions a, a.add, .btn {
      background: transparent; color: var(--ink); border: 1px solid var(--line);
      border-radius: 999px; padding: 6px 12px; cursor: pointer; font-size: 13px;
      text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
      min-height: 36px; font-family: inherit;
    }
    button.copy:hover, .actions a:hover, .btn:hover { border-color: var(--accent); color: var(--ink); }
    button.copy.primary, .btn.primary {
      background: var(--accent); color: #07080f; border-color: transparent; font-weight: 700;
    }
    button.copy.primary:hover, .btn.primary:hover { filter: brightness(1.08); }
    .card button.copy.primary {
      background: var(--cat, var(--accent));
    }
    a.add { border-color: var(--ok); color: var(--ok); }
    details.cli { margin: 12px 0 0; color: var(--mute); }
    details.cli pre, details.how blockquote {
      background: #07080f; border: 1px solid var(--line); border-radius: 8px;
      padding: 10px 12px; overflow-x: auto; color: var(--ink);
    }
    .jobs { display: flex; gap: 8px; flex-wrap: wrap; margin: 0 0 28px; }
    .jobs button {
      background: color-mix(in srgb, var(--c-sales) 12%, transparent);
      color: var(--ink); border: 1px solid color-mix(in srgb, var(--c-sales) 40%, var(--line));
      border-radius: 999px; padding: 6px 12px; cursor: pointer; font-size: 13px;
      font-family: inherit;
    }
    .jobs button:hover { border-color: var(--c-sales); }
    .filters {
      position: sticky; top: 48px; z-index: 8;
      background: color-mix(in srgb, var(--bg) 88%, transparent);
      backdrop-filter: blur(12px);
      padding: 10px 0 8px;
      margin: 0 0 8px;
    }
    .bar { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin: 0 0 10px; }
    input[type=search] {
      flex: 1; min-width: 200px; background: var(--card); color: var(--ink);
      border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; font-size: 15px;
    }
    input[type=search]:focus { outline: 2px solid var(--accent); border-color: transparent; }
    .count { color: var(--mute); font-size: 0.9rem; white-space: nowrap; }
    .chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
    .chips button {
      background: transparent; color: var(--mute); border: 1px solid var(--line);
      border-radius: 999px; padding: 5px 11px; cursor: pointer; font-family: inherit;
      --chip: var(--accent);
    }
    .chips button.on, .chips button:hover { color: #07080f; background: var(--chip); border-color: transparent; }
    .chips[data-kind="plugin"] button {
      --chip: var(--c-ops);
      font-size: 12px;
    }
    .chips button[data-cat="meta"] { --chip: var(--c-meta); }
    .chips button[data-cat="engineering"] { --chip: var(--c-engineering); }
    .chips button[data-cat="product"] { --chip: var(--c-product); }
    .chips button[data-cat="sales"] { --chip: var(--c-sales); }
    .chips button[data-cat="marketing"] { --chip: var(--c-marketing); }
    .chips button[data-cat="ops"] { --chip: var(--c-ops); }
    .chips button[data-cat="support"] { --chip: var(--c-support); }
    .chips button[data-cat="research"] { --chip: var(--c-research); }
    .chips button[data-cat="personal"] { --chip: var(--c-personal); }
    .chips button[data-cat="legal"] { --chip: var(--c-legal); }
    .chips button[data-cat="finance"] { --chip: var(--c-finance); }
    .chips button[data-cat="creator"] { --chip: var(--c-creator); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .card {
      --cat: var(--accent);
      display: flex; flex-direction: column;
      background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.01)), var(--card);
      border: 1px solid var(--line); border-radius: var(--radius); padding: 16px;
      color: inherit; position: relative; overflow: hidden; min-height: 100%;
    }
    .card::before {
      content: ""; position: absolute; left: 0; top: 0; right: 0; height: 3px;
      background: var(--cat);
    }
    .card:hover {
      border-color: color-mix(in srgb, var(--cat) 55%, var(--line));
      box-shadow: 0 12px 40px rgba(0,0,0,.35);
    }
    .card:target { outline: 2px solid var(--cat); }
    .card[data-cat="meta"] { --cat: var(--c-meta); }
    .card[data-cat="engineering"] { --cat: var(--c-engineering); }
    .card[data-cat="product"] { --cat: var(--c-product); }
    .card[data-cat="sales"] { --cat: var(--c-sales); }
    .card[data-cat="marketing"] { --cat: var(--c-marketing); }
    .card[data-cat="ops"] { --cat: var(--c-ops); }
    .card[data-cat="support"] { --cat: var(--c-support); }
    .card[data-cat="research"] { --cat: var(--c-research); }
    .card[data-cat="personal"] { --cat: var(--c-personal); }
    .card[data-cat="legal"] { --cat: var(--c-legal); }
    .card[data-cat="finance"] { --cat: var(--c-finance); }
    .card[data-cat="creator"] { --cat: var(--c-creator); }
    .row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; font-size: 12px; color: var(--mute); flex-wrap: wrap; }
    .cat, .lvl, .feat, .pill, .bots-count {
      border: 1px solid var(--line); border-radius: 999px; padding: 1px 8px;
    }
    .cat { color: var(--cat); border-color: color-mix(in srgb, var(--cat) 45%, var(--line)); }
    .feat { color: #07080f; background: var(--ok); border-color: transparent; font-weight: 700; }
    .bots-count { margin-left: auto; }
    h3 { margin: 0 0 6px; font-size: 1.08rem; letter-spacing: -0.02em; }
    .card p { margin: 0; color: var(--mute); font-size: 0.92rem; flex: 1; }
    .pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .pill.plugin { font-size: 11px; color: var(--ink); background: rgba(255,255,255,0.04); }
    .bots { margin-top: 8px !important; font-size: 0.8rem !important; color: var(--ink) !important; }
    .hint { margin-top: 8px !important; font-size: 0.8rem !important; }
    .actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
    .how { margin-top: 12px; color: var(--mute); font-size: 0.86rem; }
    .how summary { cursor: pointer; color: var(--ink); }
    .how ol { padding-left: 1.15rem; }
    .how blockquote { margin: 8px 0; font-size: 0.84rem; }
    .never { margin: 8px 0 0; }
    .hidden { display: none !important; }
    .empty {
      display: none; margin: 12px 0 24px; padding: 18px; border: 1px dashed var(--line);
      border-radius: 12px; color: var(--mute);
    }
    .empty.show { display: block; }
    .toast {
      position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%) translateY(80px);
      background: var(--ok); color: #07080f; padding: 10px 16px; border-radius: 999px;
      font-weight: 700; font-size: 0.9rem; opacity: 0; pointer-events: none;
      transition: transform .2s ease, opacity .2s ease; z-index: 30; max-width: 90vw;
      text-align: center;
    }
    .toast.on { opacity: 1; transform: translateX(-50%) translateY(0); }
    footer { margin-top: 56px; color: var(--mute); font-size: 0.9rem; }
    footer a { color: var(--accent); }
    .api { font-size: 0.85rem; }
    @media (max-width: 800px) {
      .doors { grid-template-columns: 1fr; }
      .nav { gap: 8px; padding: 10px 12px; }
      .nav-links { gap: 10px; }
      .wordmark span { display: none; }
      .nav a { font-size: 0.82rem; }
      .filters { position: static; }
      .copyrow { flex-direction: column; align-items: stretch; }
      .copyrow code { font-size: 11.5px; flex: 0 1 auto; }
      .copyrow .copy { align-self: flex-start; }
      button.copy, .actions a { width: auto; }
      .card .actions .primary { width: 100%; justify-content: center; }
      header.banner { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .toast { transition: none; }
    }
`;

const CLIENT = `
    const I18N = ${JSON.stringify(i18n)};
    const LANGS = ${JSON.stringify(LANGS)};
    let lang = localStorage.getItem("gbt-lang") || "zh";

    function t(key) {
      var v = (I18N[lang] && I18N[lang][key]) || (I18N.zh && I18N.zh[key]) || key;
      return v;
    }

    function setLang(l) {
      lang = l;
      localStorage.setItem("gbt-lang", l);
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var k = el.getAttribute("data-i18n");
        el.textContent = t(k);
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        var k = el.getAttribute("data-i18n-placeholder");
        el.setAttribute("placeholder", t(k));
      });
      document.querySelectorAll("#lang button").forEach(function (b) {
        b.classList.toggle("on", b.getAttribute("data-lang") === l);
      });
      document.documentElement.lang = l === "zh" ? "zh-CN" : l;
      if (I18N[l] && I18N[l]["title"]) document.title = I18N[l]["title"];
    }

    var langBox = document.getElementById("lang");
    if (langBox) {
      langBox.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (b) setLang(b.getAttribute("data-lang"));
      });
      setLang(lang);
    }

    const q = document.getElementById('q');
    const chips = document.getElementById('chips');
    const plugChips = document.getElementById('plugins');
    const countEl = document.getElementById('count');
    const emptyEl = document.getElementById('empty');
    const toastEl = document.getElementById('toast');
    const featuredSec = document.getElementById('start-here');
    const jobs = document.getElementById('jobs');
    const usp = new URLSearchParams(location.search);
    let cat = usp.get('cat') || '';
    let plugin = usp.get('plugin') || '';
    let profiles = null;
    if (usp.get('q')) q.value = usp.get('q');

    function markChips(root, attr, value) {
      root.querySelectorAll('button').forEach(function (x) {
        var on = (x.getAttribute(attr) || '') === value;
        x.classList.toggle('on', on);
      });
    }
    markChips(chips, 'data-cat', cat);
    markChips(plugChips, 'data-plugin', plugin);

    function syncUrl() {
      var p = new URLSearchParams();
      if (cat) p.set('cat', cat);
      if (plugin) p.set('plugin', plugin);
      if (q.value) p.set('q', q.value);
      var qs = p.toString();
      history.replaceState(null, '', (qs ? '?' + qs : location.pathname) + location.hash);
    }

    function apply() {
      var needle = (q.value || '').toLowerCase().trim();
      var n = 0, shown = 0;
      document.querySelectorAll('#grid .card').forEach(function (el) {
        n += 1;
        var okCat = !cat || el.dataset.cat === cat;
        var plugs = (el.dataset.plugins || '').toLowerCase();
        var okPlug = !plugin || plugs.split(',').map(function (s) { return s.trim(); }).indexOf(plugin.toLowerCase()) !== -1;
        var okQ = !needle || (el.dataset.q || '').indexOf(needle) !== -1;
        var vis = okCat && okPlug && okQ;
        el.classList.toggle('hidden', !vis);
        if (vis) shown += 1;
      });
      document.querySelectorAll('#featured .card').forEach(function (el) {
        var okCat = !cat || el.dataset.cat === cat;
        var plugs = (el.dataset.plugins || '').toLowerCase();
        var okPlug = !plugin || plugs.split(',').map(function (s) { return s.trim(); }).indexOf(plugin.toLowerCase()) !== -1;
        var okQ = !needle || (el.dataset.q || '').indexOf(needle) !== -1;
        el.classList.toggle('hidden', !(okCat && okPlug && okQ));
      });
      var featVisible = featuredSec.querySelectorAll('#featured .card:not(.hidden)').length;
      featuredSec.classList.toggle('hidden', featVisible === 0);
      document.querySelectorAll('#teams .card').forEach(function (el) {
        var okCat = !cat || el.dataset.cat === cat;
        var okQ = !needle || (el.dataset.q || '').indexOf(needle) !== -1;
        var plugs = (el.dataset.q || '');
        var okPlug = !plugin || plugs.indexOf(plugin.toLowerCase()) !== -1;
        el.classList.toggle('hidden', !(okCat && okQ && okPlug));
      });
      countEl.textContent = t('catalog.showing') + ' ' + shown + ' / ' + n;
      emptyEl.classList.toggle('show', shown === 0);
      syncUrl();
    }

    function toast(msg) {
      toastEl.textContent = msg;
      toastEl.classList.add('on');
      clearTimeout(toast.t);
      toast.t = setTimeout(function () { toastEl.classList.remove('on'); }, 1800);
    }

    async function loadProfiles() {
      if (profiles) return profiles;
      var r = await fetch('profiles.json');
      if (!r.ok) throw new Error('profiles');
      profiles = await r.json();
      return profiles;
    }

    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        window.prompt('复制', text);
        return true;
      }
    }

    q.addEventListener('input', apply);
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      cat = b.getAttribute('data-cat') || '';
      markChips(chips, 'data-cat', cat);
      apply();
    });
    plugChips.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      plugin = b.getAttribute('data-plugin') || '';
      markChips(plugChips, 'data-plugin', plugin);
      apply();
    });
    jobs.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      q.value = b.getAttribute('data-q') || '';
      cat = '';
      plugin = '';
      markChips(chips, 'data-cat', '');
      markChips(plugChips, 'data-plugin', '');
      apply();
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.addEventListener('click', async function (e) {
      var btn = e.target.closest('button.copy');
      if (!btn) return;
      var prev = btn.textContent;
      var id = btn.getAttribute('data-profile');
      try {
        if (id) {
          var map = await loadProfiles();
          var body = map[id];
          if (!body) throw new Error('missing');
          await copyText(body);
          btn.textContent = t('toast.profile_copied');
          toast(t('toast.profile_copied'));
        } else {
          var text = btn.getAttribute('data-copy') || '';
          await copyText(text);
          btn.textContent = t('toast.copied');
          toast(t('toast.copied_to_clipboard'));
        }
      } catch (err) {
        var fallback = btn.getAttribute('data-copy') || '';
        if (fallback) {
          await copyText(fallback);
          toast(t('toast.copied_link'));
        } else {
          toast(t('toast.copy_failed'));
        }
      }
      setTimeout(function () { btn.textContent = prev; }, 1400);
    });
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        q.focus();
        q.select();
      }
      if (e.key === 'Escape' && q.value) {
        q.value = '';
        apply();
      }
    });
    apply();
`;

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Grok Bot 模板库</title>
  <meta name="description" content="告别凭感觉粘贴。精心设计 Bot。${loaded.templates.length} 个 Grok Bot 操作契约 — 粘贴 START.md，点击一个团队，或复制一个 PROFILE。" />
  <link rel="canonical" href="${PAGES}/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Grok Bot 模板库" />
  <meta property="og:description" content="告别凭感觉粘贴。精心设计 Bot。粘贴 START.md 到名为 Setup 的 Bot，或从卡片复制 PROFILE。" />
  <meta property="og:url" content="${PAGES}/" />
  <meta property="og:image" content="${PAGES}/header.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Grok Bot 模板库" />
  <meta name="twitter:description" content="粘贴 START.md。点击一个团队。或复制一个 PROFILE。停留在 L1。" />
  <meta name="twitter:image" content="${PAGES}/header.jpg" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%2307080f'/%3E%3Ctext x='50' y='70' font-size='58' text-anchor='middle' fill='%235ce1e6'%3EG%3C/text%3E%3C/svg%3E" />
  <style>${CSS}
  </style>
</head>
<body>
  <a class="skip" href="#catalog" data-i18n="skip">跳转到目录</a>
  <nav class="nav">
    <a class="wordmark" href="./">Templates <span>for Grok Bot</span></a>
    <div class="nav-links">
      <a href="#install" data-i18n="nav.install">获取团队</a>
      <a href="#start-here" data-i18n="nav.start">从这里开始</a>
      <a href="#catalog" data-i18n="nav.catalog">目录</a>
      <a href="#teams" data-i18n="nav.teams">团队</a>
      <a href="${GH}" data-i18n="nav.github">GitHub</a>
      <div class="lang" id="lang">
        ${LANGS.map((l) => `<button type="button" data-lang="${l}">${esc(langName(l))}</button>`).join("")}
      </div>
    </div>
  </nav>
  <header class="banner">
    <img src="header.jpg" alt="Grok Bot 模板库" />
  </header>
  <div class="wrap">
    <h1 data-i18n="hero.title">粘贴一个链接。获得一个可用的 Bot。</h1>
    <p class="lede"><span data-i18n="hero.lede">告别凭感觉粘贴。每张卡片都是一份 L1 操作契约 — 任务、永不做、首个任务。复制 PROFILE 到编辑个人资料，或粘贴一个 URL 到 Setup 并点击团队。</span><span class="ver">v${esc(pkg.version)}</span></p>
    <ul class="stats">
      <li><strong>${loaded.templates.length}</strong> <span data-i18n="stats.templates">个模板</span></li>
      <li><strong>${loaded.teams.length}</strong> <span data-i18n="stats.teams">个团队</span></li>
      <li><strong>${loaded.skills.length}</strong> <span data-i18n="stats.skills">个技能</span></li>
      <li><strong>${loaded.routines.length}</strong> <span data-i18n="stats.routines">个例行程序</span></li>
    </ul>

    <div class="doors">
      <section class="door" id="install">
        <p class="kicker" data-i18n="door1.kicker">路径 1 · 整个团队 · 无需 Node</p>
        <h2 data-i18n="door1.title">60 秒获取团队</h2>
        <ol>
          <li data-i18n="door1.step1">在 Grok Bot 中：新建 → 创建新智能体。命名为 Setup。</li>
          <li><span data-i18n="door1.step2">粘贴这个 URL 并发送</span>
            <div class="copyrow">
              <code id="start-url">${esc(START_URL)}</code>
              <button type="button" class="copy primary" data-copy="${esc(
                START_URL
              )}" data-i18n="start.copy">复制 START.md</button>
            </div>
          </li>
          <li data-i18n="door1.step3">点击一个团队。试试 Eng（Bug 复现 + PR 审查）。</li>
          <li data-i18n="door1.step4">连接所需的插件。第一周停留在 L1 — 只起草，不发送。</li>
        </ol>
        <p class="hint" data-i18n="door1.hint">Setup 会获取每个 Bot 的 PROFILE.md。它不会凭空编造提示词。</p>
        <details class="cli">
          <summary data-i18n="door1.cli_summary">更习惯用 CLI？</summary>
          <pre>npx --yes github:junze-xu/grok-bot-cn list
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
npx --yes github:junze-xu/grok-bot-cn init --team eng --out ./eng-bots</pre>
          <p data-i18n="door1.npm_note">限定包 <code>@junze-xu/grokbot</code> 将在下次 npm 发布。GitHub npx 今天就可使用。</p>
        </details>
      </section>
      <section class="door" id="one-bot">
        <p class="kicker" data-i18n="door2.kicker">路径 2 · 单个 Bot</p>
        <h2 data-i18n="door2.title">复制一个 PROFILE</h2>
        <ol>
          <li data-i18n="door2.step1">选一张卡片。彩色条是类别；药丸标签是你必须连接的插件。</li>
          <li data-i18n="door2.step2">点击「复制 PROFILE」。在 Grok Bot 中：新建 → 创建新智能体，用卡片名称命名。</li>
          <li data-i18n="door2.step3">Bot 操作 → 编辑个人资料。粘贴。连接卡片上的插件。</li>
          <li data-i18n="door2.step4">展开「如何安装此 Bot」并发送首个任务。停留在 L1。</li>
        </ol>
        <p class="hint" data-i18n="door2.hint">「复制链接」是原始 PROFILE.md 链接 — 如果你已有 Setup，可粘贴到那里。</p>
      </section>
    </div>

    <h2 data-i18n="jobs.title">我想……</h2>
    <p class="lede" data-i18n="jobs.lede">跳转到目录中的任务。然后复制 PROFILE。</p>
    <div class="jobs" id="jobs">
      ${JOBS.map(
        (j) =>
          `<button type="button" data-q="${esc(j.q)}">${esc(j.label)}</button>`
      ).join("\n      ")}
    </div>

    <section id="start-here">
      <h2 data-i18n="start.title">从这里开始</h2>
      <p class="lede" data-i18n="start.lede">八个第一周真正能运行的起始模板。与完整目录相同的复制按钮。</p>
      <div class="grid" id="featured">${featuredCards}</div>
    </section>

    <div class="filters" id="catalog">
      <div class="bar">
        <input id="q" type="search" placeholder="搜索任务、插件、简介……（按 / 聚焦）" data-i18n-placeholder="catalog.search_placeholder" />
        <span class="count" id="count"></span>
      </div>
      <div class="chips" id="chips">
        <button type="button" data-cat="" class="on" data-i18n="catalog.all">全部</button>
        ${cats
          .map((c) => `<button type="button" data-cat="${c}">${c}</button>`)
          .join("\n        ")}
      </div>
      <div class="chips" data-kind="plugin" id="plugins">
        <button type="button" data-plugin="" class="on" data-i18n="catalog.any_plugin">任意插件</button>
        ${plugins
          .map(
            (p) =>
              `<button type="button" data-plugin="${esc(p)}">${esc(p)}</button>`
          )
          .join("\n        ")}
      </div>
    </div>
    <h2 data-i18n="catalog.title">目录</h2>
    <p class="lede" data-i18n="catalog.lede">每张卡片复制 PROFILE 正文用于编辑个人资料，或原始链接用于 Setup。展开卡片查看首个任务和永不做列表。</p>
    <p class="empty" id="empty" data-i18n="catalog.empty">没有匹配的模板。清空搜索，选择「全部」，或试试 GitHub / Gmail。</p>
    <div class="grid" id="grid">${cards}</div>
    <h2 id="teams" data-i18n="teams.title">团队</h2>
    <p class="lede" data-i18n="teams.lede">2–4 个 Bot，一个群组，可见交接。复制团队名称，将 START.md 粘贴到 Setup，点击名称。</p>
    <div class="grid" id="teams">${teamCards}</div>
    <footer>
      <p>MIT · <a href="${GH}" data-i18n="nav.github">GitHub</a> · <a href="agent.html" data-i18n="footer.bot_loader">Bot 加载指令</a> · <a href="${GH}/blob/main/SPEC.md">SPEC</a> · <span data-i18n="footer.disclaimer">与 xAI 无隶属关系。Grok Bot 是 xAI / Cursor 的产品。模板是粘贴到你账户的操作契约。</span></p>
      <p class="api"><span data-i18n="footer.api">机器 API：</span><a href="catalog.json">catalog.json</a> · <a href="api/v1/index.json">api/v1</a> · <a href="llms.txt">llms.txt</a> · <a href="profiles.json">profiles.json</a></p>
    </footer>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <script>${CLIENT}
  </script>
</body>
</html>
`;

const docs = path.join(root, "docs");
fs.mkdirSync(docs, { recursive: true });
fs.writeFileSync(path.join(docs, "index.html"), html);
fs.copyFileSync(path.join(root, "assets", "header.jpg"), path.join(docs, "header.jpg"));

const profiles = {};
for (const t of loaded.templates) {
  const file = path.join(t._dir, "PROFILE.md");
  if (fs.existsSync(file)) profiles[t.id] = fs.readFileSync(file, "utf8");
}
fs.writeFileSync(path.join(docs, "profiles.json"), JSON.stringify(profiles));

const agentHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Bot 加载指令 · grok-bot-cn</title>
  <meta name="description" content="将此粘贴到一个 Grok Bot 中，使其能够列出、获取和安装此目录中的模板。" />
  <link rel="canonical" href="${PAGES}/agent.html" />
  <style>
    :root { --bg:#07080f; --ink:#f6f7fb; --mute:#9aa3b8; --line:#2a3150; --card:#12162a; --accent:#5ce1e6; }
    body {
      margin:0; font-family:ui-sans-serif,system-ui,sans-serif,"PingFang SC","Microsoft YaHei"; background:
        radial-gradient(900px 400px at 0% 0%, rgba(34,211,238,.16), transparent 50%), var(--bg);
      color:var(--ink); line-height:1.5;
    }
    .wrap { max-width:760px; margin:0 auto; padding:40px 20px 80px; }
    a { color:var(--accent); }
    pre { background:#05060d; border:1px solid var(--line); border-radius:12px; padding:14px 16px; overflow-x:auto; white-space:pre-wrap; }
    .copyrow { display:flex; gap:8px; align-items:center; margin:12px 0; flex-wrap:wrap; }
    button { background:var(--accent); color:#07080f; border:0; border-radius:999px; padding:8px 14px; cursor:pointer; font-weight:700; }
    .mute { color:var(--mute); }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="mute"><a href="./">← 返回目录</a></p>
    <h1>让你的 Grok Bot 使用这个目录</h1>
    <p>将下面的指令粘贴到一个 Bot 中。它将列出模板，获取 PROFILE.md，不会凭空编造提示词。</p>
    <div class="copyrow">
      <button type="button" id="copy">复制指令</button>
      <a href="${START_URL}">START.md（安装器）</a>
    </div>
      <pre id="contract">${esc(`# grok-bot-cn — Bot 加载指令 v1

你是一个 Grok Bot。grok-bot-cn 是一个契约目录
用于 Grok Bot（任务、永不做、L1 默认、CI）。公开，无需认证。

首先阅读：${PAGES}/api/v1/status.json
浏览：      ${PAGES}/api/v1/catalog.json
团队：      ${PAGES}/api/v1/teams.json
安装器：    ${START_URL}

规则：
1. 从 profile_url 获取 PROFILE.md。不要编造提示词。
2. 第一周自主性是 L1：仅起草。不发送、不发布、不支付、不合并、不改动生产。
3. 绝不代表所有者安装第三方 x.ai/bot 分享 URL。显示链接即可。
4. 最多报告 5 个模板：名称、简介、profile_url、share_url（如有）。
5. 按精选排序。当所有者指定类别时，留在他请求的类别中。
6. 共享计算机不是安全边界。如果他要求"隔离" Bot，要说明这一点。

要组建团队：遵循 START.md。从获取的 PROFILE.md 文件创建 2–4 个 Bot。
`)}</pre>
    <p class="mute">原始 Markdown：<a href="${GH}/blob/main/docs/agent.md">docs/agent.md</a> · JSON：<a href="api/v1/index.json">api/v1</a></p>
  </div>
  <script>
    document.getElementById('copy').addEventListener('click', async (e) => {
      const t = document.getElementById('contract').innerText;
      const btn = e.currentTarget;
      const prev = btn.textContent;
      try { await navigator.clipboard.writeText(t); btn.textContent = '已复制'; }
      catch { window.prompt('复制', t); }
      setTimeout(() => { btn.textContent = prev; }, 1200);
    });
  </script>
</body>
</html>
`;
fs.writeFileSync(path.join(docs, "agent.html"), agentHtml);
console.log(
  "docs/index.html  docs/agent.html  docs/profiles.json  docs/header.jpg"
);
