#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAll } from "../lib/load.mjs";
import { PAGES, GH, START_URL, COUNTS_API, profileUrl, treeUrl, teamUrl } from "../lib/urls.mjs";
import { buildCounts, writeCounts } from "./build-counts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const loaded = loadAll(root);
const countsResult = buildCounts(root);
writeCounts(root, countsResult);
const counts = countsResult.payload;
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

// 预设组卡片的「复制 START.md」按钮把全文注入前端，随页面构建固化。
const START_MD_TEXT = fs.readFileSync(path.join(root, "START.md"), "utf8");

// 头图：优先 assets/hero.jpg（宽幅短图，首屏不遮挡内容），缺省回退 header.jpg（完整场景）。
const HERO_FILE = fs.existsSync(path.join(root, "assets", "hero.jpg"))
  ? "hero.jpg"
  : "header.jpg";

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
  "podcast-desk": "creator",
  "multi-channel-desk": "creator",
  "launch-desk": "marketing",
  "job-hunt-desk": "ops",
};

// 预设组标签：部门 / 专项（一键生成的功能组）/ 管家。
const DESK_IDS = ["podcast-desk", "multi-channel-desk", "launch-desk", "job-hunt-desk"];
function teamKind(id) {
  if (DESK_IDS.includes(id)) return "desk";
  if (id === "meta") return "meta";
  return "dept";
}

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
  const copies = opts.count || 0;
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
    <span class="copies" data-count-for="${esc(t.id)}" data-kind="bot" title="${copies}"><span class="n">${copies}</span></span>
  </div>
  <h3>${esc(t.name)}</h3>
  <p>${esc(t.tagline)}</p>
  <div class="pills">${pluginPills(plugins)}</div>
  <div class="actions">
    <button type="button" class="copy primary" data-profile="${esc(
      t.id
    )}" data-count-id="${esc(t.id)}" data-count-kind="bot" data-copy="${esc(raw)}" data-i18n="card.copy_profile">复制 PROFILE</button>
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
  .map((id) => cardHtml(byId[id], { count: counts.bots[id] || 0 }))
  .join("\n");

const cards = loaded.templates
  .map((t) => cardHtml(t, { id: `bot-${t.id}`, count: counts.bots[t.id] || 0 }))
  .join("\n");

const plugins = [
  ...new Set(
    loaded.templates.flatMap((t) =>
      t.plugins && t.plugins.length ? t.plugins : ["浏览器"]
    )
  ),
].sort((a, b) => a.localeCompare(b));

// 预设组 = 部门 + 专项（一键生成 Bot 组）：卡片含成员勾选，动作为复制组装指令 / 复制 START.md
const packCards = loaded.teams
  .map((t) => {
    const cats = new Set([TEAM_CAT[t.id]].filter(Boolean));
    t.bots.forEach((id) => { if (byId[id]?.category) cats.add(byId[id].category); });
    const kind = teamKind(t.id);
    const botNames = (t.bots || []).map((id) => byId[id]?.name || id).join(" · ");
    return `<article class="tile card pack-card" id="pack-${esc(t.id)}" data-cat="${esc(
      [...cats].join(" ")
    )}" data-name="${escAttr(t.name)}">
  <div class="pack-top">
    <span class="label ${kind}" data-i18n="label.${kind}">${esc(
      i18n.zh["label." + kind] || kind
    )}</span>
    <h3>${esc(t.name)}</h3>
    <span class="count" data-team-counts="${esc(t.id)}">${counts.teams[t.id] || 0} <span data-i18n="card.copies">次复制</span></span>
  </div>
  <p class="why">${esc(flat(t.why))}</p>
  <p class="bots">${esc(botNames)}</p>
  <div class="pills">${pluginPills(t.plugins)}</div>
  <ul class="members">${t.bots
    .map(
      (id) => `<li><label><input type="checkbox" data-member="${esc(
        id
      )}" data-name="${escAttr(byId[id]?.name || id)}" checked /> <span>${esc(
        byId[id]?.name || id
      )}</span><code>${esc(id)}</code></label></li>`
    )
    .join("")}</ul>
  ${
    kind === "meta"
      ? `<p class="hint">${esc(
          "管理 Bot 自身的工具集——不在 START.md 的选项里，通过目录卡片或 yaml 链接单独安装。"
        )}</p>`
      : ""
  }
  <div class="actions">
    <button type="button" class="copy" data-crew="${esc(
      t.id
    )}" data-count-id="${esc(t.id)}" data-team-name="${escAttr(t.name)}" data-i18n="packs.copy_crew">${esc(
      i18n.zh["packs.copy_crew"] || "复制组装指令"
    )}</button>
    <button type="button" class="copy" data-start="${esc(
      t.id
    )}" data-count-id="${esc(t.id)}" data-count-kind="team" data-i18n="team.copy_start">${esc(
      i18n.zh["team.copy_start"] || "复制 START.md"
    )}</button>
    <a href="${esc(teamUrl(t))}">yaml</a>
  </div>
</article>`;
  })
  .join("\n");

// ---------- 分类面板 / 功能组 / 热门榜 ----------

const catTiles = cats
  .map((c) => {
    const inCat = loaded.templates.filter((t) => t.category === c);
    const copies = inCat.reduce((a, t) => a + (counts.bots[t.id] || 0), 0);
    return `<button type="button" class="tile cat-tile" data-cat="${c}" style="--tile:var(--c-${c}, var(--accent))">
      <span class="t-cat">${c}</span>
      <span class="t-count">${inCat.length} <span data-i18n="categories.templates">个模板</span></span>
      <span class="t-copies" data-cat-counts="${c}">${copies} <span data-i18n="categories.copies">次复制</span></span>
    </button>`;
  })
  .join("\n");

// 热门榜：初版静态渲染（无 JS / 种子），运行时由 CLIENT 用远端计数重排
const trendingInitial = Object.entries(counts.bots)
  .filter(([id, n]) => byId[id] && n > 0)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([id, n], i) => {
    const t = byId[id];
    return `<a class="rank-row${i < 3 ? " top" : ""}" href="#bot-${esc(id)}"><span class="rank-no">${
      i + 1
    }</span><span class="rank-name">${esc(t.name)}</span><span class="cat chip">${esc(
      t.category
    )}</span><span class="rank-n">${n}</span></a>`;
  })
  .join("\n");

// 预设组热门榜初版静态渲染（与 Bot 榜一致，运行时由 CLIENT 用远端计数重排）
const trendingTeamsInitial = Object.entries(counts.teams)
  .filter(([, n]) => n > 0)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([id, n], i) => {
    const team = loaded.teams.find((x) => x.id === id);
    const name = team ? team.name : id;
    const kind = teamKind(id);
    return `<a class="rank-row${i < 3 ? " top" : ""}" href="#pack-${esc(id)}"><span class="rank-no">${
      i + 1
    }</span><span class="rank-name">${esc(name)}</span><span class="cat chip">${esc(
      i18n.zh["label." + kind] || kind
    )}</span><span class="rank-n">${n}</span></a>`;
  })
  .join("\n");

const EMBED_COUNTS = JSON.stringify({
  bots: counts.bots,
  teams: counts.teams,
  start: counts.start,
});

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
      --r-pill: 999px;
      --r-card: 16px;
      --r-ctl: 8px;
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
      padding: 8px 12px; border-radius: var(--r-pill);
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
      border: 1px solid var(--line); border-radius: var(--r-pill);
      padding: 4px 10px; font-size: 0.75rem; cursor: pointer;
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
    /* 统一表面：卡片 / 门卡 / 磁贴 / 表单共用同一套底、边框、圆角 */
    .card, .tile, .door, .submit-form {
      background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.01)), var(--card);
    }
    .nav-links a { position: relative; }
    .nav-links a.on { color: var(--ink); font-weight: 650; }
    .nav-links a.on::after {
      content: '';
      position: absolute; left: 0; right: 0; bottom: 1px;
      height: 2px; border-radius: 2px; background: var(--accent);
    }
    /* 视图：默认（无 JS）全部展开，与旧单页一致 */
    html.js-views .view { display: none; }
    html[data-view="start"] .view[data-view="start"],
    html[data-view="catalog"] .view[data-view="catalog"],
    html[data-view="packs"] .view[data-view="packs"],
    html[data-view="trending"] .view[data-view="trending"],
    html[data-view="submit"] .view[data-view="submit"] { display: block; }
    /* 视图切换反馈：淡入 + 轻微上移，避免「没刷新」的错觉 */
    @keyframes viewIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: none; }
    }
    html.js-views[data-view="start"] .view[data-view="start"],
    html.js-views[data-view="catalog"] .view[data-view="catalog"],
    html.js-views[data-view="packs"] .view[data-view="packs"],
    html.js-views[data-view="trending"] .view[data-view="trending"],
    html.js-views[data-view="submit"] .view[data-view="submit"] { animation: viewIn .18s ease-out; }
    .rank-title { margin: 28px 0 4px; font-size: 1rem; color: var(--ink); }
    .quick { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    /* 锚点滚动避开 sticky 导航与筛选条 */
    .card, .pack-card { scroll-margin-top: 128px; }
    #install, #one-bot, #start-here, #packs, #trending, #submit { scroll-margin-top: 76px; }
    h1 { font-size: clamp(1.45rem, 3vw, 1.75rem); font-weight: 750; letter-spacing: -0.03em; margin: 8px 0 8px; overflow-wrap: anywhere; }
    h2 { font-size: 1.25rem; margin: 40px 0 10px; letter-spacing: -0.02em; }
    .lede { color: var(--mute); max-width: 46rem; margin: 0 0 18px; overflow-wrap: anywhere; }
.ver { color: var(--accent); font-weight: 700; margin-left: 6px; }
    .stats {
      display: flex; gap: 10px; flex-wrap: wrap;
      list-style: none; padding: 0; margin: 18px 0 22px;
    }
    .stats li {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: var(--r-pill);
      padding: 6px 12px;
      font-size: 0.875rem;
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
      border: 1px solid var(--line);
      border-radius: var(--r-card);
      padding: 20px 22px 18px;
      position: relative;
      overflow: hidden;
      min-width: 0;
    }
    .door:first-child { --cat: var(--c-engineering); }
    .door:last-child { --cat: var(--c-marketing); }
    .door::before {
      content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
      background: var(--cat, var(--accent));
    }
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
      border-radius: var(--r-ctl); padding: 8px 10px;
      max-width: 100%;
    }
    .copyrow code {
      font-size: 0.75rem; color: var(--accent);
      overflow-wrap: anywhere; word-break: break-all;
      min-width: 0; flex: 1 1 12rem;
    }
    button.copy, .actions a, a.add, .btn {
      background: transparent; color: var(--ink); border: 1px solid var(--line);
      border-radius: var(--r-pill); padding: 6px 12px; cursor: pointer; font-size: 0.875rem;
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
      background: #07080f; border: 1px solid var(--line); border-radius: var(--r-ctl);
      padding: 10px 12px; overflow-x: auto; color: var(--ink);
    }
    .jobs { display: flex; gap: 8px; flex-wrap: wrap; }
    .jobs button {
      background: transparent; color: var(--mute); border: 1px solid var(--line);
      border-radius: var(--r-pill); padding: 5px 11px; cursor: pointer; font-family: inherit;
    }
    .jobs button:hover { border-color: var(--c-sales); color: var(--ink); }
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
      border: 1px solid var(--line); border-radius: var(--r-ctl); padding: 12px 14px; font-size: 1rem;
    }
    input[type=search]:focus { outline: 2px solid var(--accent); border-color: transparent; }
    .count { color: var(--mute); font-size: 0.875rem; white-space: nowrap; }
    .chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
    .chips button {
      background: transparent; color: var(--mute); border: 1px solid var(--line);
      border-radius: var(--r-pill); padding: 5px 11px; cursor: pointer; font-family: inherit;
      --chip: var(--accent);
    }
    .chips button.on, .chips button:hover { color: #07080f; background: var(--chip); border-color: transparent; }
    .chips[data-kind="plugin"] button {
      --chip: var(--c-ops);
      font-size: 0.75rem;
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
      border: 1px solid var(--line); border-radius: var(--r-card); padding: 16px;
      color: inherit; position: relative; overflow: hidden; min-height: 100%;
    }
    .card::before {
      content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
      background: var(--cat);
    }
    .card:hover, .tile:hover {
      border-color: color-mix(in srgb, var(--cat, var(--tile, var(--accent))) 55%, var(--line));
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
    .row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; font-size: 0.75rem; color: var(--mute); flex-wrap: wrap; }
    .cat, .lvl, .feat, .pill, .bots-count {
      border: 1px solid var(--line); border-radius: var(--r-pill); padding: 1px 8px;
    }
    .cat { color: var(--cat); border-color: color-mix(in srgb, var(--cat) 45%, var(--line)); }
    .feat { color: #07080f; background: var(--ok); border-color: transparent; font-weight: 700; }
    .bots-count { margin-left: auto; }
    h3 { margin: 0 0 6px; font-size: 1rem; letter-spacing: -0.02em; }
    .card p { margin: 0; color: var(--mute); font-size: 0.875rem; flex: 1; }
    .pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .pill.plugin { font-size: 0.75rem; color: var(--ink); background: rgba(255,255,255,0.04); }
    .bots { margin-top: 8px !important; font-size: 0.875rem !important; color: var(--ink) !important; }
    .hint { margin-top: 8px !important; font-size: 0.75rem !important; }
    .actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
    .how { margin-top: 12px; color: var(--mute); font-size: 0.875rem; }
    .how summary { cursor: pointer; color: var(--ink); }
    .how ol { padding-left: 1.15rem; }
    .how blockquote { margin: 8px 0; font-size: 0.875rem; }
    .never { margin: 8px 0 0; }
    .hidden { display: none !important; }
    .empty {
      display: none; margin: 12px 0 24px; padding: 18px; border: 1px dashed var(--line);
      border-radius: var(--r-ctl); color: var(--mute);
    }
    .empty.show { display: block; }
    .toast {
      position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%) translateY(80px);
      background: var(--ok); color: #07080f; padding: 10px 16px; border-radius: var(--r-pill);
      font-weight: 700; font-size: 0.9rem; opacity: 0; pointer-events: none;
      transition: transform .2s ease, opacity .2s ease; z-index: 30; max-width: 90vw;
      text-align: center;
    }
    .toast.on { opacity: 1; transform: translateX(-50%) translateY(0); }
    footer { margin-top: 56px; color: var(--mute); font-size: 0.875rem; }
    footer a { color: var(--accent); }
    .api { font-size: 0.875rem; }

    /* 复制计数徽标 */
    .copies {
      margin-left: auto; color: var(--ink); font-weight: 650;
      font-size: 0.75rem; font-variant-numeric: tabular-nums; white-space: nowrap;
    }
    .copies::before { content: "↻ "; color: var(--mute); font-weight: 400; }

    /* 分类面板 */
    .cats { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin: 0 0 18px; }
    .tile {
      display: flex; flex-direction: column; gap: 4px; align-items: flex-start;
      border: 1px solid var(--line); border-radius: var(--r-card); padding: 12px 14px; min-width: 0;
      color: var(--ink); font-family: inherit; text-align: left; cursor: pointer;
      position: relative; overflow: hidden;
    }
    .tile::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--tile, var(--accent)); }
    .t-cat { font-size: 0.75rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--tile, var(--accent)); }
    .t-count, .t-copies { font-size: 0.75rem; color: var(--mute); }
    .cat-tile .t-copies { color: var(--ink); font-weight: 650; }
/* 预设组（一键生成 Bot 组） */
.packs { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; margin: 0 0 12px; }
.pack-card { display: flex; flex-direction: column; cursor: default; padding: 12px 14px; }
.pack-card .pack-top { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.pack-card .pack-top h3 { font-size: 1rem; margin: 0; }
.pack-card .label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em; padding: 2px 8px; border-radius: var(--r-pill); border: 1px solid var(--line); color: var(--mute); }
.pack-card .label.desk { color: var(--accent); border-color: var(--accent); }
.pack-card .count { margin-left: auto; font-size: 0.75rem; color: var(--mute); }
.pack-card .why { font-size: 0.875rem; color: var(--mute); margin: 8px 0 0; }
.pack-card .bots { font-size: 0.875rem; color: var(--ink); margin: 8px 0 0; }
.pack-card .pills { margin-top: 8px; }
.pack-card .members { display: flex; flex-wrap: wrap; gap: 6px 12px; list-style: none; margin: 8px 0 0; padding: 0; font-size: 0.875rem; color: var(--mute); }
.pack-card .members label { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
.pack-card .members input[type="checkbox"] { accent-color: var(--accent); }
.pack-card .members code { color: var(--mute); font-size: 0.75rem; }
.pack-card .members, .pack-card .actions { margin-top: 8px; }
.pack-card .actions { display: flex; gap: 8px; flex-wrap: wrap; }

    /* 提交入口 */
    .submit-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin: 4px 0 8px; }
    .submit-note { color: var(--mute); font-size: 0.875rem; }
    .submit-form { border: 1px solid var(--line); border-radius: var(--r-card); padding: 18px; margin: 6px 0 8px; }
    .sf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
    .sf-full { grid-column: 1 / -1; }
    .submit-form label { display: flex; flex-direction: column; gap: 6px; font-size: 0.875rem; color: var(--mute); }
    .submit-form input, .submit-form select, .submit-form textarea {
      background: #07080f; color: var(--ink); border: 1px solid var(--line);
      border-radius: var(--r-ctl); padding: 10px 12px; font-size: 0.875rem; font-family: inherit;
    }
    .submit-form input:focus, .submit-form select:focus, .submit-form textarea:focus {
      outline: 2px solid var(--accent); border-color: transparent;
    }
    .submit-form textarea { min-height: 68px; resize: vertical; }
    .sf-check { flex-direction: row; align-items: flex-start; gap: 8px; }
    .sf-check input { width: auto; margin-top: 3px; }
    #submit-state a { color: var(--ok); margin-left: 6px; }

    /* 热门榜 */
    .rank-wrap { margin: 0 0 8px; }
    .rank-row {
      display: grid; grid-template-columns: 2rem minmax(0, 1fr) auto 4.5rem; gap: 8px; align-items: center;
      padding: 8px 10px; border: 1px solid var(--line); border-radius: var(--r-ctl); margin: 6px 0;
      color: var(--ink); text-decoration: none; background: rgba(255,255,255,.02);
    }
    .rank-row:hover { border-color: var(--accent); }
    .rank-no { color: var(--mute); font-weight: 750; font-variant-numeric: tabular-nums; }
    .rank-row.top .rank-no { color: var(--accent); }
    .rank-name { overflow-wrap: anywhere; }
    .chip { border: 1px solid var(--line); border-radius: var(--r-pill); padding: 1px 8px; font-size: 0.75rem; color: var(--mute); white-space: nowrap; }
    .rank-n { text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; }
    .rank-empty { color: var(--mute); font-size: 0.875rem; }
    @media (max-width: 800px) {
      .doors { grid-template-columns: 1fr; }
      .nav { gap: 8px; padding: 10px 12px; }
      .nav-links { gap: 10px; }
      .wordmark span { display: none; }
      .nav a { font-size: 0.875rem; }
      .filters { position: static; }
      .copyrow { flex-direction: column; align-items: stretch; }
      .copyrow code { font-size: 0.75rem; flex: 0 1 auto; }
      .copyrow .copy { align-self: flex-start; }
      button.copy, .actions a { width: auto; }
      .card .actions .primary { width: 100%; justify-content: center; }
      header.banner { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .toast { transition: none; }
      .view { animation: none !important; }
    }
`;

const CLIENT = `
const START_MD = ${JSON.stringify(START_MD_TEXT)};
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

    // ---------- 视图路由：#start / #catalog / #packs / #trending / #submit ----------
    var VIEWS = ['start', 'catalog', 'packs', 'trending', 'submit'];
    var VIEW_ALIAS = { 'install': 'start', 'start-here': 'start', 'one-bot': 'start' };
    var currentView = 'start';

    function routeFromHash() {
      var raw = (location.hash || '').replace(/^#/, '');
      if (!raw) return { view: 'start', target: null };
      if (raw.indexOf('bot-') === 0) return { view: 'catalog', target: raw };
      if (raw.indexOf('pack-') === 0) return { view: 'packs', target: raw };
      if (VIEW_ALIAS[raw]) return { view: VIEW_ALIAS[raw], target: document.getElementById(raw) ? raw : null };
      if (VIEWS.indexOf(raw) !== -1) return { view: raw, target: null };
      return { view: currentView, target: null };
    }

    function goView(name) {
      if (VIEWS.indexOf(name) === -1) return;
      if (location.hash === '#' + name) applyView(true);
      else location.hash = name;
    }

    function goCatalog() {
      goView('catalog');
    }

    function applyView(force) {
      var r = routeFromHash();
      var prev = currentView;
      var next = VIEWS.indexOf(r.view) !== -1 ? r.view : 'start';
      var changed = next !== prev;
      currentView = next;
      document.documentElement.setAttribute('data-view', next);
      document.querySelectorAll('.nav-links a[data-view-link]').forEach(function (a) {
        a.classList.toggle('on', a.getAttribute('data-view-link') === next);
      });
      if (!changed && !force) return;
      if (r.target) {
        requestAnimationFrame(function () {
          var el = document.getElementById(r.target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (next === 'trending' && changed) refreshCounts();
    }

    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        goView(a.getAttribute('href').replace(/^#/, ''));
      });
    });
    window.addEventListener('hashchange', function () { applyView(false); });

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
      goCatalog();
    });
    document.addEventListener('click', async function (e) {
      var btn = e.target.closest('button.copy');
      if (!btn) return;
      var prev = btn.textContent;
      if (btn.hasAttribute('data-crew')) {
        var card = btn.closest('.pack-card');
        var teamName = btn.getAttribute('data-team-name') || '';
        var checked = card ? card.querySelectorAll('input[data-member]:checked') : [];
        var members = [];
        checked.forEach(function (c) {
          members.push({ id: c.getAttribute('data-member'), name: c.getAttribute('data-name') || c.getAttribute('data-member') });
        });
        if (!members.length) {
          toast(t('toast.crew_empty'));
          return;
        }
        var crewLines = [t('crew.prefix').replace('{n}', members.length).replace('{team}', teamName)];
        members.forEach(function (m) { crewLines.push('- ' + m.name + '（' + m.id + '）'); });
        crewLines.push('', t('crew.suffix'));
        try {
          await copyText(crewLines.join('\\n'));
          btn.textContent = t('toast.crew_copied');
          toast(t('toast.crew_copied'));
        } catch (err) {
          toast(t('toast.copy_failed'));
        }
        if (btn.getAttribute('data-count-id')) postCount(btn.getAttribute('data-count-id'), 'team');
        setTimeout(function () { btn.textContent = prev; }, 1400);
        return;
      }
      if (btn.hasAttribute('data-start')) {
        try {
          await copyText(START_MD);
          btn.textContent = t('toast.start_copied');
          toast(t('toast.start_copied'));
        } catch (err) {
          toast(t('toast.copy_failed'));
        }
        if (btn.getAttribute('data-count-id')) postCount(btn.getAttribute('data-count-id'), btn.getAttribute('data-count-kind') || 'team');
        setTimeout(function () { btn.textContent = prev; }, 1400);
        return;
      }
      var id = btn.getAttribute('data-profile');
      var countId = btn.getAttribute('data-count-id');
      var countKind = btn.getAttribute('data-count-kind') || 'bot';
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
      if (countId) postCount(countId, countKind);
      setTimeout(function () { btn.textContent = prev; }, 1400);
    });
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        if (currentView !== 'catalog') goView('catalog');
        q.focus();
        q.select();
      }
      if (e.key === 'Escape' && q.value) {
        q.value = '';
        apply();
      }
    });
    apply();

    // ---------- 分类磁贴：点击 -> 目录筛选 ----------
    document.querySelectorAll('.cat-tile').forEach(function (b) {
      b.addEventListener('click', function () {
        cat = b.getAttribute('data-cat') || '';
        markChips(chips, 'data-cat', cat);
        apply();
        goCatalog();
      });
    });

    // ---------- 复制计数 / 热门榜（未配置 COUNTS_API 时静默跳过） ----------
    var COUNTS_API = ${JSON.stringify(COUNTS_API)};
    var GH = ${JSON.stringify(GH)};
    var BOTS = ${JSON.stringify(loaded.templates.map((t) => ({ id: t.id, name: t.name, category: t.category })))};
    var TEAMS = ${JSON.stringify(loaded.teams.map((t) => ({ id: t.id, name: t.name, kind: teamKind(t.id) })))};

    function escH(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }

    function countBadge(id, kind) {
      var list = document.querySelectorAll('[data-count-for="' + id + '"]');
      for (var i = 0; i < list.length; i++) {
        if ((list[i].getAttribute('data-kind') || 'bot') === kind) return list[i];
      }
      return null;
    }

    function setCount(id, kind, n) {
      var el = countBadge(id, kind);
      if (el) {
        var span = el.querySelector('.n');
        if (span) span.textContent = n; else el.textContent = n;
        el.title = n;
      }
      if (kind === 'team') {
        document.querySelectorAll('[data-team-counts="' + id + '"]').forEach(function (x) {
          x.textContent = n + ' ' + t('card.copies');
        });
      }
    }

    function postCount(id, kind) {
      if (!COUNTS_API) return Promise.resolve(null);
      return fetch(COUNTS_API + '/api/v1/count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, kind: kind || 'bot' })
      }).then(function (r) { return r.json(); }).then(function (data) {
        if (data && data.ok && typeof data.count === 'number') setCount(id, kind, data.count);
        return data;
      }).catch(function () { return null; });
    }

    function renderRank(botCounts) {
      var box = document.getElementById('rank');
      if (!box) return;
      var items = [];
      BOTS.forEach(function (b) {
        var n = botCounts[b.id] || 0;
        if (n > 0) items.push({ id: b.id, name: b.name, category: b.category, count: n });
      });
      items.sort(function (a, b) { return b.count - a.count; });
      items = items.slice(0, 12);
      if (!items.length) {
        box.innerHTML = '<p class="rank-empty">' + escH(t('trending.empty')) + '</p>';
        return;
      }
      box.innerHTML = items.map(function (it, i) {
        return '<a class="rank-row' + (i < 3 ? ' top' : '') + '" href="#bot-' + escH(it.id) + '">' +
          '<span class="rank-no">' + (i + 1) + '</span>' +
          '<span class="rank-name">' + escH(it.name) + '</span>' +
          '<span class="cat chip">' + escH(it.category) + '</span>' +
          '<span class="rank-n">' + it.count + '</span></a>';
      }).join('');
    }

    function renderTeamRank(teamCounts) {
      var box = document.getElementById('rank-teams');
      if (!box) return;
      var items = TEAMS.map(function (tm) {
        return { id: tm.id, name: tm.name, kind: tm.kind, count: teamCounts[tm.id] || 0 };
      }).filter(function (x) { return x.count > 0; })
        .sort(function (a, b) { return b.count - a.count || a.id.localeCompare(b.id); })
        .slice(0, 10);
      if (!items.length) {
        box.innerHTML = '<p class="rank-empty">' + escH(t('trending.teams_empty')) + '</p>';
        return;
      }
      box.innerHTML = items.map(function (it, i) {
        return '<a class="rank-row' + (i < 3 ? ' top' : '') + '" href="#pack-' + escH(it.id) + '">' +
          '<span class="rank-no">' + (i + 1) + '</span>' +
          '<span class="rank-name">' + escH(it.name) + '</span>' +
          '<span class="cat chip">' + escH(it.kind) + '</span>' +
          '<span class="rank-n">' + it.count + '</span></a>';
      }).join('');
    }

    function refreshCounts() {
      if (!COUNTS_API) return;
      fetch(COUNTS_API + '/api/v1/counts')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (!data || !data.counts) return;
          var c = data.counts;
          Object.keys(c.bot || {}).forEach(function (id) { setCount(id, 'bot', c.bot[id]); });
          Object.keys(c.team || {}).forEach(function (id) { setCount(id, 'team', c.team[id]); });
          renderRank(c.bot || {});
          renderTeamRank(c.team || {});
        })
        .catch(function () {});
    }

    // ---------- 提交入口（GitHub 登录 / Issue 草稿 / 服务端直投） ----------
    var authBtn = document.getElementById('gh-login');
    var authState = document.getElementById('auth-state');
    var submitState = document.getElementById('submit-state');
    var submitForm = document.getElementById('submit-form');
    var sessionUser = null;

    function renderAuth() {
      if (!authBtn) return;
      if (sessionUser) {
        authBtn.textContent = t('submit.logout');
        if (authState) authState.textContent = t('submit.logged_in_as') + ' @' + sessionUser.login;
      } else {
        authBtn.textContent = t('submit.login');
        if (authState) authState.textContent = t('submit.login_hint');
      }
    }

    async function checkAuth() {
      if (!COUNTS_API || !authBtn) return;
      try {
        var r = await fetch(COUNTS_API + '/api/v1/auth/status', { credentials: 'include' });
        var data = await r.json();
        sessionUser = data && data.login && data.user ? data.user : null;
      } catch (e) {
        sessionUser = null;
      }
      renderAuth();
    }

    function readSubmitForm() {
      var fd = new FormData(submitForm);
      return {
        name: String(fd.get('name') || '').trim(),
        title: String(fd.get('title') || '').trim(),
        category: fd.get('category') || 'ops',
        autonomy: fd.get('autonomy') || 'L1',
        job: String(fd.get('job') || '').trim(),
        tagline: String(fd.get('tagline') || '').trim(),
        why: String(fd.get('why') || '').trim(),
        first_task: String(fd.get('first_task') || '').trim(),
        approval_never: String(fd.get('never') || '').split('\\n'),
        plugins: String(fd.get('plugins') || '').split(','),
        author: String(fd.get('author') || '').trim(),
        share_safe: !!fd.get('share_safe')
      };
    }

    function localDraftUrl(body) {
      var lines = [
        '### 名称 / 标题',
        '',
        '- name: ' + body.name,
        '- title: ' + body.title,
        '- category: ' + body.category,
        '- autonomy: ' + body.autonomy,
        '',
        '### One-sentence job',
        '',
        body.job,
        '',
        '### First task',
        '',
        body.first_task,
        '',
        '### Standing never-list',
        ''
      ];
      body.approval_never.forEach(function (x) {
        var v = String(x || '').trim();
        if (v) lines.push('- ' + v);
      });
      lines.push('', '### 提交人', '', body.author || '（匿名）');
      var p = new URLSearchParams();
      p.set('template', 'new-template.yml');
      p.set('title', 'template: ' + body.name);
      p.set('body', lines.join('\\n'));
      return GH + '/issues/new?' + p.toString();
    }

    async function sendSubmit(body) {
      if (submitState) submitState.textContent = t('submit.sending');
      if (!COUNTS_API) {
        window.open(localDraftUrl(body), '_blank');
        if (submitState) submitState.textContent = t('submit.draft_opened');
        return;
      }
      try {
        var r = await fetch(COUNTS_API + '/api/v1/submit', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        var data = await r.json().catch(function () { return {}; });
        if (r.ok && data && data.ok) {
          toast(t('submit.success'));
          submitState.textContent = t('submit.success');
          if (data.url) {
            var a = document.createElement('a');
            a.href = data.url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = data.url;
            submitState.appendChild(document.createTextNode(' '));
            submitState.appendChild(a);
          }
          submitForm.reset();
          return;
        }
        if (data && data.draft_url) {
          window.open(data.draft_url, '_blank');
          if (submitState) submitState.textContent = t('submit.draft_opened');
          return;
        }
        if (data && data.errors && data.errors.length) {
          submitState.textContent = data.errors.map(function (x) {
            return (x.field || '') + ': ' + (x.msg || '');
          }).join('；');
          toast(t('submit.error'));
          return;
        }
        submitState.textContent = (data && data.error) || t('submit.error');
        toast(t('submit.error'));
      } catch (e) {
        if (submitState) submitState.textContent = t('submit.network_error');
        toast(t('submit.network_error'));
      }
    }

    if (authBtn) {
      authBtn.addEventListener('click', function () {
        if (!COUNTS_API) return;
        var next = encodeURIComponent(location.href);
        location.href = sessionUser
          ? COUNTS_API + '/auth/logout?next=' + next
          : COUNTS_API + '/auth/github?next=' + next;
      });
    }

    if (submitForm) {
      submitForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        await sendSubmit(readSubmitForm());
      });
      var draftBtn = document.getElementById('gh-draft');
      if (draftBtn) {
        draftBtn.addEventListener('click', function () {
          sendSubmit(readSubmitForm());
        });
      }
    }

    applyView(true);
    if (currentView !== 'trending') refreshCounts();
    checkAuth();
`;

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script>
  (function () {
    var raw = (location.hash || "").replace(/^#/, "");
    var v = "start";
    if (raw.indexOf("bot-") === 0) v = "catalog";
    else if (raw.indexOf("pack-") === 0) v = "packs";
    else if (raw === "install" || raw === "start-here" || raw === "one-bot") v = "start";
    else if (["catalog", "packs", "trending", "submit"].indexOf(raw) !== -1) v = raw;
    document.documentElement.setAttribute("data-view", v);
    document.documentElement.classList.add("js-views");
  })();
  </script>
  <title>Grok Bot 模板库</title>
  <meta name="description" content="告别凭感觉粘贴。精心设计 Bot。${loaded.templates.length} 个 Grok Bot 操作契约 — 粘贴 START.md 生成整个 Bot 组，或复制一个 PROFILE。" />
  <link rel="canonical" href="${PAGES}/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Grok Bot 模板库" />
  <meta property="og:description" content="告别凭感觉粘贴。精心设计 Bot。粘贴 START.md 到名为 Setup 的 Bot，或从卡片复制 PROFILE。" />
  <meta property="og:url" content="${PAGES}/" />
  <meta property="og:image" content="${PAGES}/header.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Grok Bot 模板库" />
  <meta name="twitter:description" content="粘贴 START.md 生成 Bot 组，或复制一个 PROFILE。停留在 L1。" />
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
      <a href="#start" data-i18n="nav.home" data-view-link="start">开始</a>
      <a href="#catalog" data-i18n="nav.catalog" data-view-link="catalog">目录</a>
      <a href="#packs" data-i18n="nav.packs" data-view-link="packs">预设组</a>
      <a href="#trending" data-i18n="nav.trending" data-view-link="trending">热门榜</a>
      <a href="#submit" data-i18n="nav.submit" data-view-link="submit">提交</a>
      <a href="${GH}" data-i18n="nav.github">GitHub</a>
      <div class="lang" id="lang">
        ${LANGS.map((l) => `<button type="button" data-lang="${l}">${esc(langName(l))}</button>`).join("")}
      </div>
    </div>
  </nav>
  <header class="banner">
    <img src="${HERO_FILE}" alt="Grok Bot 模板库" />
  </header>
  <div class="wrap">
    <section class="view" data-view="start" id="view-start">
    <h1 data-i18n="hero.title">粘贴一个链接。获得一个可用的 Bot。</h1>
    <p class="lede"><span data-i18n="hero.lede">告别凭感觉粘贴。每张卡片都是一份 L1 操作契约 — 任务、永不做、首个任务。复制 PROFILE 到编辑个人资料，或复制组装指令连同 START.md 发给 Setup。</span><span class="ver">v${esc(pkg.version)}</span></p>
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
          <li><span data-i18n="door1.step3">到下方「一键生成 Bot 组」选一个预设（或勾选成员），复制组装指令，连同 START.md 一起发给 Setup。</span></li>
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

    <section id="start-here">
      <h2 data-i18n="start.title">从这里开始</h2>
      <p class="lede" data-i18n="start.lede">八个第一周真正能运行的起始模板。与完整目录相同的复制按钮。</p>
      <div class="grid" id="featured">${featuredCards}</div>
    </section>
    </section>

    <section class="view" data-view="catalog" id="view-catalog">
    <h2 data-i18n="catalog.title">目录</h2>
    <p class="lede" data-i18n="catalog.lede">每张卡片复制 PROFILE 正文用于编辑个人资料，或原始链接用于 Setup。展开卡片查看首个任务和永不做列表。</p>
      <div class="cats" id="cats">${catTiles}</div>

      <div class="quick">
        <span class="kicker" data-i18n="jobs.title">我想……</span>
        <div class="jobs" id="jobs">
          ${JOBS.map(
            (j) =>
              `<button type="button" data-q="${esc(j.q)}">${esc(j.label)}</button>`
          ).join("\n          ")}
        </div>
      </div>

      <div class="filters" id="filters">
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
    <p class="empty" id="empty" data-i18n="catalog.empty">没有匹配的模板。清空搜索，选择「全部」，或试试 GitHub / Gmail。</p>
    <div class="grid" id="grid">${cards}</div>
    </section>

    <section class="view" data-view="packs" id="view-packs">
    <section id="packs">
      <h2 data-i18n="packs.title">一键生成 Bot 组</h2>
      <p class="lede" data-i18n="packs.lede">选一个预设（默认整套），或勾选成员自选；复制组装指令，连同 START.md 一起发给 Setup。</p>
      <div class="packs" id="packs-grid">${packCards}</div>
      <p class="hint" data-i18n="packs.hint">预设组 = 2–4 个 Bot 一个群组、可见交接。组装指令列出成员名单；Setup 按名单逐个创建，忽略团队选项。</p>
    </section>
    </section>

    <section class="view" data-view="trending" id="view-trending">
    <section id="trending">
      <h2 data-i18n="trending.title">热门榜</h2>
      <p class="lede" data-i18n="trending.lede">按站内复制次数排序（种子 + 实时）。计数只反映本站复制动作，不等于安装量。</p>
      <h3 class="rank-title" data-i18n="trending.bots_title">最常被复制的 Bot</h3>
      <div class="rank-wrap" id="rank">${trendingInitial || `<p class="rank-empty" data-i18n="trending.empty">暂无复制数据</p>`}</div>
      <h3 class="rank-title" data-i18n="trending.teams_title">最常被复制的预设组</h3>
      <div class="rank-wrap" id="rank-teams">${trendingTeamsInitial || `<p class="rank-empty" data-i18n="trending.teams_empty">暂无预设组复制数据</p>`}</div>
    </section>
    </section>

    <section class="view" data-view="submit" id="view-submit">
    <section id="submit">
      <h2 data-i18n="submit.title">提交一个 Bot</h2>
      <p class="lede" data-i18n="submit.lede">按 SPEC 契约填写。提交后由维护者审核，转写为 templates/**/template.yaml 并走 PR。</p>
      <div class="submit-row">
        <button type="button" class="btn primary" id="gh-login" data-i18n="submit.login">用 GitHub 登录</button>
        <span class="submit-note" id="auth-state"></span>
      </div>
      <form id="submit-form" class="submit-form">
        <div class="sf-grid">
          <label><span data-i18n="submit.name">Bot 名称（2–48 字符）</span><input name="name" required minlength="2" maxlength="48" /></label>
          <label><span data-i18n="submit.title_field">标题 / 职位（2–60 字符）</span><input name="title" required minlength="2" maxlength="60" /></label>
          <label><span data-i18n="submit.category">分类</span>
            <select name="category">${cats.map((c) => `<option value="${c}">${c}</option>`).join("")}</select>
          </label>
          <label><span data-i18n="submit.autonomy">第一周自主性</span>
            <select name="autonomy">${["L0", "L1", "L2", "L3"].map((l) => `<option value="${l}"${l === "L1" ? " selected" : ""}>${l}</option>`).join("")}</select>
          </label>
          <label class="sf-full"><span data-i18n="submit.job">一句话任务（job）</span><textarea name="job" required minlength="60" placeholder="可重复产出，不是部门名称。≥60 字符" data-i18n-placeholder="submit.job_ph"></textarea></label>
          <label class="sf-full"><span data-i18n="submit.tagline">简介（tagline）</span><input name="tagline" required minlength="12" /></label>
          <label class="sf-full"><span data-i18n="submit.why">为什么需要它（why）</span><input name="why" required minlength="12" /></label>
          <label class="sf-full"><span data-i18n="submit.first_task">首个任务（first_task）</span><textarea name="first_task" required minlength="12"></textarea></label>
          <label class="sf-full"><span data-i18n="submit.never">永不清单（每行一条，至少 3 条）</span><textarea name="never" required></textarea></label>
          <label><span data-i18n="submit.plugins">插件（逗号分隔，可留空）</span><input name="plugins" /></label>
          <label><span data-i18n="submit.author">署名（可选）</span><input name="author" /></label>
          <label class="sf-full sf-check"><input type="checkbox" name="share_safe" required /> <span data-i18n="submit.share_safe">已脱敏：不含密钥、内网地址或他人隐私。</span></label>
        </div>
        <div class="submit-row">
          <button type="submit" class="btn primary" data-i18n="submit.send">提交到 GitHub Issue</button>
          <button type="button" class="btn" id="gh-draft" data-i18n="submit.draft">生成 Issue 草稿链接</button>
          <span class="submit-note" id="submit-state"></span>
        </div>
      </form>
    </section>
    </section>

<footer>
      <p>MIT · <a href="${GH}" data-i18n="nav.github">GitHub</a> · <a href="agent.html" data-i18n="footer.bot_loader">Bot 加载指令</a> · <a href="${GH}/blob/main/SPEC.md">SPEC</a> · <span data-i18n="footer.disclaimer">与 xAI 无隶属关系。Grok Bot 是 xAI / Cursor 的产品。模板是粘贴到你账户的操作契约。</span></p>
      <p class="api"><span data-i18n="footer.api">机器 API：</span><a href="catalog.json">catalog.json</a> · <a href="api/v1/index.json">api/v1</a> · <a href="llms.txt">llms.txt</a> · <a href="profiles.json">profiles.json</a> · <a href="counts.json">counts.json</a></p>
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
if (HERO_FILE === "hero.jpg") {
  fs.copyFileSync(path.join(root, "assets", "hero.jpg"), path.join(docs, "hero.jpg"));
}

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
  `docs/index.html  docs/agent.html  docs/profiles.json  docs/${HERO_FILE}`
);
