#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { stringify as stringifyYaml } from "yaml";
import { resolveRoot, packageRoot } from "../lib/paths.mjs";
import { loadAll, findTemplate } from "../lib/load.mjs";
import { validateLoaded } from "../lib/validate.mjs";
import { scoreTemplate, scoreAll } from "../lib/score.mjs";
import { badgeSvg, badgeMarkdown, catalogScore } from "../lib/badge.mjs";
import { START_URL, GH, PAGES, NPX, profileUrl } from "../lib/urls.mjs";
import { renderProfile, writeTemplateDocs } from "../lib/render.mjs";
import { writeSkillDocs } from "../lib/render-skill.mjs";
import { writeRoutineDocs } from "../lib/render-routine.mjs";

const VERSION = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")
).version;

function args(argv) {
  const out = { _: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") {
      out._.push(...argv.slice(i + 1));
      break;
    }
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      if (v !== undefined) out.flags[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith("-")) out.flags[k] = argv[++i];
      else out.flags[k] = true;
    } else if (a.startsWith("-") && a.length === 2) {
      out.flags[a.slice(1)] = true;
    } else out._.push(a);
  }
  return out;
}

function help() {
  return `grokbot ${VERSION} — Grok Bot 模板工程化工具包

安装团队（无需 Node）：
  1. 创建一个名为 Setup 的 Bot
  2. 粘贴 ${START_URL}
  3. 点击 Eng。停留在 L1。

用法：
  grokbot list [--category C] [--autonomy L] [--featured] [--json]
  grokbot show <id>
  grokbot init <id> [--out DIR] [--print]
  grokbot init --team <id> [--out DIR]
  grokbot teams [--json]
  grokbot search <query>
  grokbot score [id|--all] [--badge] [--md] [--out FILE]
  grokbot validate [path]
  grokbot doctor
  grokbot start
  grokbot new <slug> --category <cat> [--out DIR]
  grokbot catalog
  grokbot version

CLI：
  ${NPX} start
  ${NPX} init pr-reviewer --print

文档：${GH}
网站：${PAGES}/
Grok Bot：https://x.ai/bot  ·  https://docs.x.ai/grok-bot/get-started
`;
}

function load(cwd) {
  return loadAll(resolveRoot(cwd));
}

function printTable(rows, headers) {
  const cols = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => String(r[i] ?? "").length))
  );
  const line = (r) => r.map((c, i) => String(c ?? "").padEnd(cols[i])).join("  ");
  console.log(line(headers));
  console.log(cols.map((n) => "-".repeat(n)).join("  "));
  for (const r of rows) console.log(line(r));
}

function cmdList(a, loaded) {
  let items = loaded.templates;
  const cat = a.flags.category;
  const aut = a.flags.autonomy;
  if (cat) items = items.filter((t) => t.category === cat);
  if (aut) items = items.filter((t) => t.autonomy === aut);
  if (a.flags.featured) items = items.filter((t) => t.featured);
  if (a.flags.json) {
    console.log(
      JSON.stringify(
        items.map((t) => ({
          id: t.id,
          name: t.name,
          category: t.category,
          autonomy: t.autonomy,
          tagline: t.tagline,
          plugins: t.plugins,
          featured: !!t.featured,
        })),
        null,
        2
      )
    );
    return 0;
  }
  printTable(
    items.map((t) => [
      t.id,
      t.category,
      t.autonomy,
      t.featured ? "★" : "",
      t.tagline,
    ]),
    ["ID", "分类", "等级", "精选", "简介"]
  );
  console.log(`\n${items.length} 个模板。grokbot show <id> · grokbot init <id>`);
  return 0;
}

function cmdShow(a, loaded) {
  const id = a._[1];
  if (!id) {
    console.error("用法：grokbot show <id>");
    return 1;
  }
  const t = findTemplate(loaded, id);
  if (!t) {
    console.error(`未找到：${id}`);
    return 1;
  }
  if (a.flags.json) {
    const copy = { ...t };
    delete copy._raw;
    console.log(JSON.stringify(copy, null, 2));
    return 0;
  }
  const s = scoreTemplate(t);
  console.log(`# ${t.name}  (${t.category}/${t.id})`);
  console.log(`${t.tagline}\n`);
  console.log(`自主性：${t.autonomy}   Bot 就绪：${s.earned}/${s.max} ${s.grade}`);
  console.log(`插件：${(t.plugins || []).join(", ") || "无"}`);
  console.log(`PROFILE：${profileUrl(t)}`);
  if (t.share_url) console.log(`分享：${t.share_url}`);
  console.log(`任务：${t.job}\n`);
  console.log("永不：");
  for (const n of t.approval_never) console.log(`  - ${n}`);
  console.log(`\n首个任务：\n  ${t.first_task}`);
  console.log(`\n文件：${t._rel}/PROFILE.md`);
  return 0;
}

function copyTemplate(t, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of ["template.yaml", "PROFILE.md", "SETUP.md", "README.md"]) {
    const src = path.join(t._dir, name);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dest, name));
  }
  const ex = path.join(t._dir, "examples");
  if (fs.existsSync(ex)) {
    fs.mkdirSync(path.join(dest, "examples"), { recursive: true });
    for (const f of fs.readdirSync(ex)) {
      fs.copyFileSync(path.join(ex, f), path.join(dest, "examples", f));
    }
  }
}

function cmdInit(a, loaded) {
  const teamId = a.flags.team;
  const out = a.flags.out;
  if (teamId) {
    const team = loaded.teams.find((t) => t.id === teamId);
    if (!team) {
      console.error(`未知团队：${teamId}`);
      return 1;
    }
    const dest = path.resolve(out || path.join(process.cwd(), "grok-bots", team.id));
    fs.mkdirSync(dest, { recursive: true });
    fs.writeFileSync(path.join(dest, "TEAM.md"), renderTeam(team, loaded));
    for (const id of team.bots) {
      const t = findTemplate(loaded, id);
      if (!t) continue;
      copyTemplate(t, path.join(dest, t.id));
    }
    console.log(`已写入团队 ${team.name} → ${dest}`);
    console.log("打开 TEAM.md，创建各个 Bot，粘贴每个 PROFILE.md，将它们放在一个群组中。");
    console.log("\n群组启动：\n");
    console.log(team.group_kickoff);
    return 0;
  }
  const id = a._[1];
  if (!id) {
    console.error("用法：grokbot init <id> | grokbot init --team <id>");
    return 1;
  }
  const t = findTemplate(loaded, id);
  if (!t) {
    console.error(`未找到：${id}`);
    return 1;
  }
  if (a.flags.print || !out) {
    process.stdout.write(renderProfile(t));
    if (!out) {
      console.error(
        `\n# 未复制任何内容。使用 --out DIR 重新运行以写入文件，或将其通过管道输出到文件。`
      );
    }
  }
  if (out) {
    const dest = path.resolve(out);
    copyTemplate(t, dest);
    console.error(`已写入 ${t.id} → ${dest}`);
  }
  return 0;
}

function renderTeam(team, loaded) {
  const rows = team.bots
    .map((id) => {
      const t = findTemplate(loaded, id);
      return `- **${t ? t.name : id}** (${id}) — ${t ? t.tagline : ""}`;
    })
    .join("\n");
  return `# ${team.name}

${team.why}

主导：**${team.lead}**。最多 Bot 数：${team.max_bots}。自主性：${team.autonomy || "L1"}。

## 名册

${rows}

## 插件

${(team.plugins || []).map((p) => `- ${p}`).join("\n") || "- 无"}

## 群组启动

从此文件夹创建 2–${team.max_bots} 个 Bot，放入一个群组，然后发送：

${team.group_kickoff}

首次运行时不要发送、发布、支付、合并或联系任何人。
`;
}

function cmdTeams(a, loaded) {
  if (a.flags.json) {
    console.log(JSON.stringify(loaded.teams.map((t) => ({ id: t.id, name: t.name, bots: t.bots })), null, 2));
    return 0;
  }
  printTable(
    loaded.teams.map((t) => [t.id, t.bots.length, t.lead, t.name]),
    ["ID", "数量", "主导", "名称"]
  );
  return 0;
}

function cmdSearch(a, loaded) {
  const q = a._.slice(1).join(" ").toLowerCase();
  if (!q) {
    console.error("用法：grokbot search <查询词>");
    return 1;
  }
  const hits = loaded.templates.filter((t) =>
    [t.id, t.name, t.tagline, t.job, t.why, ...(t.tags || []), t.category]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
  if (!hits.length) {
    console.log("无匹配结果");
    return 1;
  }
  printTable(
    hits.map((t) => [t.id, t.category, t.tagline]),
    ["ID", "分类", "简介"]
  );
  return 0;
}

function emitBadge(payload, a) {
  if (a.flags.md || a.flags.markdown) {
    console.log(badgeMarkdown(payload));
    return payload.ready ? 0 : 1;
  }
  const svg = badgeSvg(payload);
  if (a.flags.out) {
    const dest = path.resolve(a.flags.out);
    fs.writeFileSync(dest, svg);
    console.error(`已写入 ${dest}`);
    return payload.ready ? 0 : 1;
  }
  process.stdout.write(svg);
  return payload.ready ? 0 : 1;
}

function cmdScore(a, loaded) {
  const wantAll = a.flags.all || a._[1] === "--all" || (a.flags.badge && !a._[1]);
  if (wantAll) {
    const rows = scoreAll(loaded.templates);
    if (a.flags.badge) return emitBadge(catalogScore(rows), a);
    if (a.flags.json) {
      console.log(JSON.stringify(rows, null, 2));
      return 0;
    }
    printTable(
      rows.map((s) => [s.id, s.autonomy, `${s.earned}/${s.max}`, s.grade, s.ready ? "就绪" : ""]),
      ["ID", "等级", "评分", "级别", ""]
    );
    const avg = Math.round(rows.reduce((n, s) => n + s.earned, 0) / (rows.length || 1));
    console.log(`\n${rows.length} 个模板。平均 ${avg}/100`);
    return rows.every((s) => s.ready) ? 0 : 1;
  }
  const id = a._[1];
  if (!id) {
    console.error("用法：grokbot score <id> | grokbot score --all | grokbot score --badge");
    return 1;
  }
  const t = findTemplate(loaded, id);
  if (!t) {
    console.error(`未找到：${id}`);
    return 1;
  }
  const s = scoreTemplate(t);
  if (a.flags.badge) return emitBadge(s, a);
  if (a.flags.json) {
    console.log(JSON.stringify(s, null, 2));
    return 0;
  }
  console.log(`${t.name}  ${s.earned}/${s.max}  ${s.grade}  ${s.ready ? "就绪" : "不就绪"}`);
  for (const c of s.checks) {
    console.log(`  ${c.ok ? "✓" : "✗"} ${String(c.earned).padStart(2)}/${c.points}  ${c.id} — ${c.detail}`);
  }
  return s.ready ? 0 : 1;
}

function cmdValidate(a, loaded) {
  const result = validateLoaded(loaded);
  if (a.flags.json) {
    console.log(JSON.stringify(result, null, 2));
    return result.errors.length ? 1 : 0;
  }
  for (const w of result.warnings) console.error(`警告  ${w.file}: ${w.msg}`);
  for (const e of result.errors) console.error(`错误 ${e.file}: ${e.msg}`);
  const c = result.counts;
  console.log(
    `${c.templates} 个模板，${c.teams} 个团队，${c.skills} 个技能，${c.routines} 个例行程序，${c.patterns} 个模式`
  );
  console.log(
    result.errors.length
      ? `失败 ${result.errors.length} 个错误，${result.warnings.length} 个警告`
      : `通过 ${result.warnings.length} 个警告`
  );
  return result.errors.length ? 1 : 0;
}

function cmdDoctor(a, loaded) {
  const result = validateLoaded(loaded);
  const scores = scoreAll(loaded.templates);
  const weak = scores.filter((s) => !s.ready);
  const start = path.join(loaded.dirs.root, "START.md");
  const startOk = fs.existsSync(start);
  const header = path.join(loaded.dirs.root, "assets", "header.jpg");
  console.log("grokbot doctor");
  console.log(`  目录       ${result.errors.length ? "失败" : "通过"}  (${result.counts.templates} 个模板)`);
  console.log(`  start.md   ${startOk ? "通过" : "缺失"}`);
  console.log(`  头图       ${fs.existsSync(header) ? "通过" : "缺失"}`);
  console.log(`  bot就绪    ${weak.length ? `${weak.length} 个低于 80 分` : "通过"}`);
  console.log(`  分享安全   ${loaded.templates.every((t) => t.share_safe) ? "通过" : "失败"}`);
  if (weak.length) {
    console.log("\n低于 80 分：");
    for (const s of weak) console.log(`  ${s.id} ${s.earned}/${s.max}`);
  }
  if (result.errors.length) {
    console.log("\n错误：");
    for (const e of result.errors.slice(0, 20)) console.log(`  ${e.msg}  (${e.file})`);
  }
  const fail = result.errors.length > 0 || !startOk || weak.length > 0;
  console.log(fail ? "\n失败" : "\n通过 —— 目录已 Bot 就绪");
  return fail ? 1 : 0;
}

function cmdStart(loaded) {
  const file = path.join(loaded.dirs.root, "START.md");
  if (!fs.existsSync(file)) {
    console.error("START.md 缺失");
    return 1;
  }
  console.log(fs.readFileSync(file, "utf8"));
  console.log(`\n# 将原始 URL 粘贴到名为 Setup 的新 Grok Bot 中：\n# ${START_URL}`);
  return 0;
}

function cmdNew(a) {
  const slug = a._[1];
  const category = a.flags.category;
  if (!slug || !category) {
    console.error("用法：grokbot new <slug> --category <category>");
    return 1;
  }
  if (!/^[a-z][a-z0-9-]{1,62}$/.test(slug)) {
    console.error("slug：仅小写字母、数字、连字符");
    return 1;
  }
  const dest = path.resolve(
    a.flags.out || path.join(resolveRoot(), "templates", category, slug)
  );
  fs.mkdirSync(dest, { recursive: true });
  const stub = {
    id: slug,
    name: slug
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" "),
    title: "替换为职位/功能标题，而非氛围描述",
    category,
    version: "1.0.0",
    status: "draft",
    featured: false,
    official_use_case: false,
    job: "用一句话描述一个可重复的产出，让陌生人也能评分。在提交 PR 前替换此存根 —— 必须至少六十个字符的操作性语言。",
    tagline: "替换为不少于十二个字符的简介。",
    why: "说明这个 Bot 旨在预防的失败场景。",
    soul: "可选的身份段落。写 Bot 如何思考，而非人格装扮。",
    autonomy: "L1",
    plugins: [],
    sources: ["命名真相的来源"],
    deliverable:
      "带标题、来源链接和操作日志的审查性产出物。事实与推断分开。",
    approval_never: [
      "发送消息",
      "发布或张贴",
      "更改生产系统",
    ],
    approval_ask: ["任何外部写入"],
    first_task:
      "描述一个能一次性产出可审查结果的首个任务。",
    no_data:
      "如果来源缺失，说明并停止。不要编造数字或复用陈旧数据。",
    working_style: [
      "结果先行",
      "引用来源",
      "区分事实与推断",
      "在审批边界停止",
    ],
    never: [
      "不要编造引用或数字",
      "不要联系任何人",
      "不要削弱常设边界",
    ],
    skills: [],
    routine: null,
    handoffs: [],
    team_role: "specialist",
    tags: [category],
    example_first_run:
      "## 示例\n\n替换为一个真实的首个运行产出物，让审查者能看到良好结果的样子。",
    share_safe: true,
    docs: ["https://docs.x.ai/grok-bot/use-cases"],
  };
  fs.writeFileSync(path.join(dest, "template.yaml"), stringifyYaml(stub));
  console.log(`已写入存根：${dest}/template.yaml`);
  console.log("填写所有字段，然后：grokbot validate && grokbot score " + slug);
  return 0;
}

function cmdCatalog(loaded) {
  const payload = {
    version: VERSION,
    api_version: "v1",
    start_url: START_URL,
    count: loaded.templates.length,
    items: loaded.templates.map((t) => ({
      id: t.id,
      name: t.name,
      category: t.category,
      autonomy: t.autonomy,
      tagline: t.tagline,
      plugins: t.plugins,
      featured: !!t.featured,
      path: t._rel,
      profile_url: profileUrl(t),
      share_url: t.share_url || null,
      score: scoreTemplate(t).earned,
    })),
    teams: loaded.teams.map((t) => ({ id: t.id, name: t.name, bots: t.bots })),
  };
  console.log(JSON.stringify(payload, null, 2));
  return 0;
}

function main(argv) {
  const a = args(argv);
  const cmd = a._[0] || "help";
  if (cmd === "help" || a.flags.help || a.flags.h) {
    console.log(help());
    return 0;
  }
  if (cmd === "version" || a.flags.version) {
    console.log(VERSION);
    return 0;
  }
  const loaded = load(process.cwd());
  switch (cmd) {
    case "list":
      return cmdList(a, loaded);
    case "show":
      return cmdShow(a, loaded);
    case "init":
      return cmdInit(a, loaded);
    case "teams":
      return cmdTeams(a, loaded);
    case "search":
      return cmdSearch(a, loaded);
    case "score":
      return cmdScore(a, loaded);
    case "validate":
      return cmdValidate(a, loaded);
    case "doctor":
      return cmdDoctor(a, loaded);
    case "start":
      return cmdStart(loaded);
    case "new":
      return cmdNew(a);
    case "catalog":
      return cmdCatalog(loaded);
    case "render": {
      const scores = new Map(scoreAll(loaded.templates).map((s) => [s.id, s]));
      for (const t of loaded.templates) writeTemplateDocs(t, scores.get(t.id));
      for (const s of loaded.skills) writeSkillDocs(s);
      for (const r of loaded.routines) writeRoutineDocs(r);
      console.log(
        `已渲染 ${loaded.templates.length} 个模板，${loaded.skills.length} 个技能，${loaded.routines.length} 个例行程序`
      );
      return 0;
    }
    default:
      console.error(`未知命令：${cmd}\n`);
      console.log(help());
      return 1;
  }
}

process.exitCode = main(process.argv.slice(2));
void packageRoot;
