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

const cats = JSON.parse(
  fs.readFileSync(path.join(root, "schema", "template.schema.json"), "utf8")
).properties.category.enum;

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

// 预设组标签：id 以 -desk 结尾的是专项，meta 是管家，其余是部门。
// 卡片分类取主导 Bot 的分类，再并上成员自己的分类。
function teamKind(id) {
  if (String(id).endsWith("-desk")) return "desk";
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
    const packCats = new Set();
    if (byId[t.lead]?.category) packCats.add(byId[t.lead].category);
    t.bots.forEach((id) => { if (byId[id]?.category) packCats.add(byId[id].category); });
    const kind = teamKind(t.id);
    const botNames = (t.bots || []).map((id) => byId[id]?.name || id).join(" · ");
    return `<article class="tile card pack-card" id="pack-${esc(t.id)}" data-cat="${esc(
      [...packCats].join(" ")
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
      ? `<p class="hint" data-i18n="packs.meta_hint">${esc(
          i18n.zh["packs.meta_hint"]
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

const CSS = fs.readFileSync(new URL("./site.css", import.meta.url), "utf8");
const CLIENT = fs
  .readFileSync(new URL("./site-client.js", import.meta.url), "utf8")
  .replaceAll("__START_MD__", JSON.stringify(START_MD_TEXT))
  .replaceAll("__I18N__", JSON.stringify(i18n))
  .replaceAll("__LANGS__", JSON.stringify(LANGS))
  .replaceAll("__COUNTS_API__", JSON.stringify(COUNTS_API))
  .replaceAll("__GH__", JSON.stringify(GH))
  .replaceAll("__BOTS__", JSON.stringify(loaded.templates.map((t) => ({ id: t.id, name: t.name, category: t.category }))))
  .replaceAll("__TEAMS__", JSON.stringify(loaded.teams.map((t) => ({ id: t.id, name: t.name, kind: teamKind(t.id) }))));

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
  <meta name="keywords" content="Grok Bot, 模板库, PROFILE, START.md, 智能体, Agent, Grok, AI 助手" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Grok Bot 模板库" />
  <meta property="og:description" content="告别凭感觉粘贴。精心设计 Bot。粘贴 START.md 到名为 Setup 的 Bot，或从卡片复制 PROFILE。" />
  <meta property="og:url" content="${PAGES}/" />
  <meta property="og:image" content="${PAGES}/header.jpg" />
 <meta property="og:image:alt" content="Grok Bot 模板库" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Grok Bot 模板库" />
  <meta name="twitter:description" content="粘贴 START.md 生成 Bot 组，或复制一个 PROFILE。停留在 L1。" />
  <meta name="twitter:image" content="${PAGES}/header.jpg" />
 <meta name="twitter:image:alt" content="Grok Bot 模板库" />
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
      <div class="qr-row">
        <div class="qr-item"><img src="qrcode-official-account.jpg" alt="公众号 JunzeXuInfra 二维码" width="120" height="120"><span>公众号 <b>JunzeXuInfra</b> · 关注获取更新</span></div>
        <div class="qr-item"><img src="wechat-junze.jpg" alt="个人微信 JunzeXu 二维码" width="120" height="120"><span>个人微信 <b>JunzeXu</b> · 交流合作</span></div>
      </div>
      <p>MIT · <a href="${GH}" data-i18n="nav.github">GitHub</a> · <a href="https://junze-xu.github.io/">作者博客</a> · <a href="agent.html" data-i18n="footer.bot_loader">Bot 加载指令</a> · <a href="${GH}/blob/main/SPEC.md">SPEC</a> · <span data-i18n="footer.disclaimer">与 xAI 无隶属关系。Grok Bot 是 xAI / Cursor 的产品。模板是粘贴到你账户的操作契约。</span></p>
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
fs.copyFileSync(path.join(root, "assets", "qrcode-official-account.jpg"), path.join(docs, "qrcode-official-account.jpg"));
fs.copyFileSync(path.join(root, "assets", "wechat-junze.jpg"), path.join(docs, "wechat-junze.jpg"));

fs.writeFileSync(path.join(docs, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${PAGES}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${PAGES}/agent.html</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n</urlset>\n`);
fs.writeFileSync(path.join(docs, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${PAGES}/sitemap.xml\n`);

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
  `docs/index.html  docs/agent.html  docs/profiles.json  docs/${HERO_FILE}  docs/qrcode-official-account.jpg  docs/wechat-junze.jpg  docs/sitemap.xml  docs/robots.txt`
);
