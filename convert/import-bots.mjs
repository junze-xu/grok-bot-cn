#!/usr/bin/env node
// 外部公开 Bot 目录 → 契约模板导入器。
//
// 数据源：snapshots/imported-bots.json（公开数据快照，含一键 Prompt 全文）。
// 输出：templates/<category>/<id>/template.yaml（唯一事实来源），随后 npm run render 生成 PROFILE 等。
//
// 用法：
//   node convert/import-bots.mjs --ids M01,C11       # 指定条目
//   node convert/import-bots.mjs --group base        # 指定分组
//   node convert/import-bots.mjs --coding            # 代码附录 D01–D08
//   node convert/import-bots.mjs --dry               # 只看计划不写文件
//
// 字段策略：OVERRIDES 里逐条转写的字段优先；其余用 rule* 函数从快照结构化字段生成。
// 导入的 Bot 一律 L1（本仓库第一周规则）；原设定的定时频率写进 schedule 与工作风格。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stringify as stringifyYaml } from "yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshot = JSON.parse(
  fs.readFileSync(path.join(root, "snapshots", "imported-bots.json"), "utf8")
);

const CAT = {
  base: "meta",
  team: null, // 功能组 → teams/<id>/team.yaml，不进模板目录
  compute: "engineering",
  office: "ops",
  finance: "finance",
  ecom: "marketing",
  creator: "creator",
  design: "marketing",
  life: "personal",
};
const CODING_CAT = "engineering";

const DERIVED = "原设定的验收话术（导入模板的示例，用你环境里的真实产物替换）";

function slug(code) {
  return "md-" + code.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function parseName(name) {
  return String(name)
    .replace(/（[^）]*）/g, "")
    .replace(/\s*Bot\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}
function firstUndef(...vals) {
  return vals.find((v) => v !== undefined && v !== null && v !== "");
}

// ---------- 规则兜底（未被 OVERRIDES 覆盖的字段） ----------

function extractSteps(prompt) {
  const out = [];
  const lines = prompt.split("\n");
  let inSection = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (/^【.+】$/.test(line)) {
      inSection = /运行|收到|每次|任务|开工/.test(line);
      continue;
    }
    if (!inSection) continue;
    const m = line.match(/^\d[.、]\s*(.+)$/);
    if (m) {
      out.push(m[1].replace(/^【[^】]+】\s*/, "").trim());
      if (out.length >= 3) break;
    } else if (out.length && !/^[-–]/.test(line)) {
      break;
    }
  }
  return out;
}

function ruleJob(b) {
  const lines = b.prompt.split("\n").map((s) => s.trim()).filter(Boolean);
  const def =
    lines.find((l) => /「[^」]+」/.test(l)) || lines[0] || b.oneLiner || "";
  let job = def
    .replace(/^，?\s*你是我的「[^」]+」[，,]?\s*/, "")
    .replace(/[，。]?\s*请把下面的内容记成(长期)?设定。?\s*$/, "")
    .replace(/。$/, "");
  job = `${job}。`;
  if (job.length < 30 && b.oneLiner) {
    job = `${job.slice(0, -1)}：${String(b.oneLiner).replace(/。$/, "")}。`;
  }
  const steps = extractSteps(b.prompt);
  if (steps.length) job += `每次收到任务：${steps.join("；")}。`;
  return job;
}

function ruleTagline(b) {
  const t = String(b.oneLiner || "").trim();
  if (t.length >= 12) return t;
  const n = parseName(b.name) || "导入";
  return t ? `${t}（${n}）` : `把「${n}」的重复动作固化成可重复执行的流程`;
}

function ruleWhy(b) {
  const t = String(b.oneLiner || "").trim();
  return t.length >= 24
    ? t
    : `${t}。把这一步做成可重复、可审查的产出，代替每次手搓。`;
}

const DOMAIN_SOURCES = {
  "github.com": "GitHub（仓库 / Skill）",
  "openrouter.ai": "OpenRouter（模型 API）",
  "mp.weixin.qq.com": "微信公众号链接（主人粘贴）",
  "x.com": "X（公开页面）",
  "docs.x.ai": "Grok Bot 官方文档",
};

function ruleSources(b) {
  const out = ["/workspace/" + slug(b.id) + "/（产出与过程文件）", "主人粘贴的输入"];
  const domains = new Set();
  for (const m of b.prompt.matchAll(/https?:\/\/([^/\s）)]+)/g)) {
    const hit = DOMAIN_SOURCES[m[1]];
    if (hit) domains.add(hit);
  }
  if (prepMentions(b.prep, "GitHub")) domains.add("GitHub（仓库 / Skill）");
  for (const d of domains) out.push(d);
  return [...new Set(out)].slice(0, 5);
}

function prepMentions(prep, word) {
  return String(prep || "").includes(word);
}

function ruleDeliverable(b) {
  const fileHit = b.prompt.match(/([\w.-]+\/[\w.-]+\.md|drafts\/[^\s`）]+|stats\.csv|lessons\.md|my-voice\.md)/);
  const where = fileHit ? `产出存放在 ${fileHit[1]}。` : "产出存放在 /workspace/" + slug(b.id) + "/。";
  return `一份可交付给主人的成果与一句回执，事实与推断分开。${where}`;
}

const APPROVAL_HINT = /(先问|先确认|等.{0,4}(确认|过|同意)|必须问|要问我|经过我同意|我同意后才|没说|未说|没让|未经|不|别|绝不|永不|禁止)/;

function extractRules(prompt, max = 4) {
  const out = [];
  for (const raw of prompt.split("\n")) {
    const line = raw.trim();
    if (!/^[-–•*]\s*/.test(line)) continue;
    const text = line.replace(/^[-–•*]\s*/, "").trim();
    if (text.length < 4 || text.length > 80) continue;
    if (APPROVAL_HINT.test(text)) {
      if (!out.includes(text)) out.push(text);
    }
    if (out.length >= max) break;
  }
  return out;
}

function ruleApprovalNever(b) {
  const pad = ["发送、发布或回复任何人", "支付、购买或提交订单", "删除既有文件（除非主人确认）"];
  const extracted = extractRules(b.prompt, 4);
  return [...new Set([...extracted, ...pad])].slice(0, 5);
}

function ruleFirstTask(b) {
  const v = String(b.verify || "").trim();
  if (v.length >= 40) return v;
  return `发一句「${b.oneLiner || parseName(b.name)}」，用第一个真实任务跑通流程，把结果发回本对话。`;
}

// ---------- 契约兜底：所有字段满足 template.schema.json 的最小长度 / 条数 ----------

const STYLE_PAD = [
  "先给结果，再给证据",
  "区分事实、推断、已完成的动作与等待批准的动作",
  "遇到审批边界就停下来问主人",
  "完成后立刻停止输出",
];
const NEVER_PAD = [
  "不要编造引用、数字或经历",
  "不要主动发送、发布或联系任何人",
  "不要削弱本简介的永不清单",
];
const APPROVAL_PAD = [
  "发送、发布或回复任何人",
  "支付、购买或提交订单",
  "删除既有文件（除非主人确认）",
];

function dedupList(arr) {
  return [...new Set((arr || []).map((s) => String(s ?? "").trim()))].filter(Boolean);
}
function padText(v, min, ...fillers) {
  let s = String(v ?? "").trim();
  let i = 0;
  while (s.length < min && i < fillers.length) s += fillers[i++];
  while (s.length < min) s += "。";
  return s;
}
function clampText(v, max) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}
function padArray(arr, minItems, minLen, padSrc) {
  const out = dedupList(arr).filter((s) => s.length >= minLen);
  for (const p of padSrc) {
    if (out.length >= minItems) break;
    if (!out.includes(p)) out.push(p);
  }
  let i = 0;
  while (out.length < minItems) out.push(padSrc[i++ % padSrc.length]);
  return out;
}

function enforceContract(t) {
  if (t.title.length < 8) {
    t.title = /（[^）]*）$/.test(t.title)
      ? t.title.replace(/（([^）]*)）$/, " Bot（$1）")
      : `${t.title} Bot`;
  }
  t.job = padText(
    t.job,
    60,
    "（完成后把这一步的真实产物交给对应负责人。）",
    "（事实与推断分开写，过程文件存进 /workspace 对应目录。）"
  );
  t.tagline = clampText(t.tagline, 140);
  if (t.tagline.length < 12) t.tagline = `${t.name}：把这套动作固化成可重复、可审查的流程`;
  t.why = padText(t.why, 24, "把这一步做成可重复、可审查的产出。");
  if (t.why === t.tagline) t.why += "把这一步做成可重复、可审查的产出，代替每次手搓。";
  t.no_data = padText(t.no_data, 40, "不要编造数据，也不要拿旧数据冒充当前结果。");
  t.first_task = padText(t.first_task, 40, "；跑通后把真实产物与回执发给主人。", "（用你环境里的真实任务验收。）");
  t.deliverable = padText(t.deliverable, 40, "；事实与推断分开写。", "（产出留痕，方便复核。）");
  t.example_first_run = padText(
    t.example_first_run,
    80,
    "\n\n（把这一段替换成你环境里第一次真实运行的产物，再保留。）"
  );
  t.working_style = padArray(t.working_style, 4, 8, STYLE_PAD);
  t.never = padArray(t.never, 3, 8, NEVER_PAD);
  t.approval_never = padArray(t.approval_never, 3, 4, APPROVAL_PAD);
  t.handoffs = (t.handoffs || []).map((h) => ({
    to: h.to,
    when: padText(h.when, 8, "，由主人确认后进行"),
  }));
  t.sources = dedupList(t.sources);
  if (!t.sources.length) t.sources = ["/workspace/" + t.id + "/（产出与过程文件）", "主人粘贴的输入"];
  t.prep = clampText(t.prep, 600);
  t.schedule = clampText(t.schedule, 80);
  t.quota = clampText(t.quota, 80);
  t.run_mode = clampText(t.run_mode, 20);
  return t;
}

function ruleNoData(b) {
  return "如果来源缺失（链接打不开、账号没登录、文件不存在），先说明缺什么并停下；不要编造数据，也不要拿旧数据冒充当前结果。";
}

function ruleWorkingStyle(b) {
  const style = [
    "先给结果，再给证据",
    "中文，简短",
    "区分事实、推断、已完成的动作与等待批准的动作",
    "遇到审批边界就停下来问主人",
    "完成后立刻停止输出",
  ];
  if (b.kinds.includes("定时") && b.schedule) {
    style.push(`第一周按 L1 由主人手动触发；跑顺两次后再建定时任务（原设定频率：${b.schedule}）`);
  }
  return style;
}

function ruleNever(b) {
  const never = ["不要编造引用、数字或经历", "不要主动发送、发布或联系任何人", "不要削弱本简介的永不清单"];
  if (b.kinds.includes("定时")) {
    never.push("不要在未经确认时自行删除或修改定时任务");
  }
  return never;
}

function ruleHandoffs(b) {
  const m = (b.tags || []).map((t) => t.match(/口播流水线第\s*(\d+)\s*棒/)).find(Boolean);
  if (!m) return [];
  const next = snapshot.bots.find((x) =>
    (x.tags || []).some((t) => t.includes(`口播流水线第 ${Number(m[1]) + 1} 棒`))
  );
  if (!next) return [];
  return [{ to: slug(next.id), when: `本棒完成、主人说「过」之后，交给第 ${Number(m[1]) + 1} 棒` }];
}

const PROVIDER_PATTERNS = [
  ["OpenRouter", /openrouter/i],
  ["Codex", /codex/i],
  ["Claude", /claude/i],
  ["ChatGPT", /chatgpt/i],
  ["DeepSeek", /deepseek/i],
  ["Gemini", /gemini/i],
  ["Kimi", /kimi/i],
  ["Qwen", /qwen|千问/i],
  ["飞书", /飞书|lark/i],
  ["腾讯会议", /腾讯会议/i],
  ["钉钉", /钉钉/i],
  ["企业微信", /企业微信/i],
  ["腾讯文档", /腾讯文档/i],
  ["Nano Banana", /nano banana|生图/i],
  ["Muse", /\bmuse\b/i],
];

function rulePlugins(b) {
  if (b.kinds.includes("接入")) {
    const hit = PROVIDER_PATTERNS.find(([, re]) => re.test(b.prompt));
    return [hit ? hit[0] : "外部模型 API（Key 自行接管）"];
  }
  if (/github\.com/.test(b.prompt) && /安装/.test(b.prompt)) return ["GitHub"];
  return [];
}

function ruleTeamRole(b) {
  return groupOf(b) === "base" && /派活|转给/.test(b.prompt) ? "router" : "specialist";
}

function groupOf(b) {
  return b.group;
}

// ---------- 逐条转写（人工优先） ----------

const OVERRIDES = {
  M01: {
    title: "Bot 团队任务分流与派单",
    job: "负责维护整支 Bot 团队的任务分流：收到任务后先在团队表里判断归属，把任务原文加背景转给最合适的 Bot，跟踪结果并用三行以内总结回给主人；简单问答自己答，长任务绝不自己动手。",
    why: "Bot 一多，「这活该找谁」就成了新问题。统一入口让任务不会半路被做错的人接走，也不会在群里被所有 Bot 陪读。",
    sources: [
      "/workspace/（Bot 团队表：名字、擅长、运行方式）",
      "主人发来的任务原文",
      "各 Bot 私发回来的结果",
    ],
    deliverable: "一行转派回执（已转给 XX）+ 结果回来后的三行以内总结 + 更新后的团队表文件。",
    approval_never: [
      "亲自执行长任务（写稿、分析、批量操作）",
      "涉及发送、花钱、删除的动作未经主人确认",
      "临时拉群（接力型功能组除外）",
      "把团队表只存在聊天里、不落文件",
    ],
    first_task: "读现有 Bot 列表，建一张团队表文件（名字｜擅长｜运行方式），填进现有的 Bot；然后对第一个任务做分流并回报。",
    working_style: [
      "先复述任务，再对表分流",
      "简单问答（30 秒能答完）自己答，不转",
      "零碎小活优先转给杂活类 Bot",
      "找不准归属就列出来让主人选",
      "结果回来只用三行以内总结",
    ],
    never: [
      "绝不替主人做长任务",
      "绝不凭记忆猜归属而不对表",
      "绝不在涉及发送、花钱、删除前不确认",
      "绝不让群里所有 Bot 陪读一条派活消息",
    ],
    handoffs: [{ to: "md-m03", when: "团队里没有合适的 Bot、建议新建一个时" }],
    team_role: "router",
  },
  M02: {
    title: "Bot 设定与记忆的定时备份",
    job: "负责把整支 Bot 团队的设定、规则与重要记忆整理成 Markdown 文件，定期备份到主人的私有 Git 仓库；Bot 丢失或损坏时，用备份文件一键恢复。",
    why: "Bot 的上下文一删就没了，重写一份完整设定要花一小时。每周自动备份到私有仓库，等于给整支团队买了保险。",
    sources: ["各 Bot 私发的设定与记忆（md 文件）", "主人指定的私有 GitHub 仓库", "团队的 Bot 名单（问团队表）"],
    deliverable: "仓库 bots/ 目录：每个 Bot 一个 md 文件；一条备份回执（备份数量、缺席者、与上次的差异）。",
    approval_never: [
      "把备份推到公开仓库",
      "在 md 或消息里留下 Key、密码、手机号等敏感信息",
      "反复催促超时未回的 Bot",
      "未经确认新建定时任务",
    ],
    first_task: "先手动跑一次：收齐各 Bot 的设定，写入仓库 bots/ 目录并推送到私有仓库，回报备份了几个、谁没回。",
    working_style: [
      "只推私有仓库；发现是公开的就停下提醒",
      "md 里的敏感字段一律替换为 ***",
      "未回的 Bot 记为「未回复」，不反复催",
      "第一周按 L1 由主人手动触发；跑顺两次后再建定时任务（原设定：每周日 21:00）",
    ],
    never: ["绝不泄露任何凭据", "绝不用空文件冒充已备份"],
  },
  M03: {
    title: "新 Bot 的需求澄清与创建",
    job: "负责把主人一句话需求（“我要一个盯降价的 Bot”）变成可执行的新 Bot：最多问三个问题把需求问清，判断运行方式，写五段式新 Bot 设定（定位｜运行方式｜步骤｜审批点｜规则），确认后创建并登记到名册。",
    why: "没有模板就建新 Bot，做出来的东西往往名不对题。先问清、再确认设定，避免舰队里堆满重复和闲置的 Bot。",
    sources: ["主人的需求描述", "团队名册（现有 Bot 的定位与运行方式）", "新 Bot 的五段式设定"],
    deliverable: "一份五段式新 Bot 设定 + 建好（或交给主人手动建）的新 Bot + 名册新增一行；另给一句验收话术。",
    approval_never: [
      "未经主人确认就创建新 Bot",
      "替主人写对外发送的内容",
      "与现有 Bot 重复造轮子",
      "在给新 Bot 的设定里削弱三条铁律",
    ],
    first_task: "发「我要一个盯降价的 Bot，盯 Switch 2，降到 2000 以下提醒我」——它会问 1～3 个问题，出设定，等你确认后再建。",
    working_style: [
      "最多问 3 个问题，把频率、数据来源、产出位置问清",
      "先出设定，等主人说「可以」再建",
      "和现有 Bot 重复时建议直接用现有的",
      "新设定里必带三条铁律：凭据接管、发送前确认、没新消息不打扰",
    ],
    never: ["绝不重复造已有的 Bot", "绝不在新 Bot 设定里省略审批边界"],
    handoffs: [{ to: "md-m04", when: "新 Bot 建好、需要登记名册时" }],
  },
  M04: {
    title: "Bot 团队名册周报",
    job: "每周汇总整支 Bot 团队的名册：列出每个 Bot 的定位、运行方式与上次干活时间，标出活跃与闲置，生成一页可长期复用的花名册并回报本周新增了谁、谁闲置。",
    why: "Bot 多了以后，谁还在干活、谁白占额度没人知道。一周一次的名册，是裁撤和合并决策的唯一依据。",
    sources: ["账号下的 Bot 列表（看不到时问团队表）", "各 Bot 回复的定位、运行方式与上次干活时间"],
    deliverable: "一页花名册（总数与构成 + 明细表 + 闲置名单），固定地址更新 + 一条变更回执。",
    approval_never: [
      "在名册里写 Key 或账号密码",
      "每周新建页面而不是更新同一地址",
      "隐瞒闲置名单不报",
    ],
    first_task: "发「现在生成一次花名册」——收到一个可打开的页面链接，能看到 Bot 表格与闲置名单。",
    working_style: [
      "7 天内干过活 = 活跃，超过 14 天 = 闲置",
      "用同一个地址更新，不每周新建",
      "不出现任何凭据",
      "第一周按 L1 由主人手动触发；跑顺两次后再建定时任务（原设定：每周一 9:00）",
    ],
    never: ["绝不泄露凭据", "绝不新建多份花名册"],
    handoffs: [{ to: "md-m07", when: "名册出现长期闲置的 Bot 时" }],
  },
  M05: {
    title: "团队额度监控与预警",
    job: "每天检查 Grok Bot 本周期额度与各接入算力的用量，估算按当前速度还能撑几天；快见底时列出最费额度的三个 Bot/定时任务并建议暂停，等主人确认后再执行暂停或恢复。",
    why: "额度是整支团队共同的钱包，单人无感、月底吓人。提前预警并分清优先级，能避免关键时刻被低价值任务拖垮。",
    sources: ["Grok Bot 额度页（读不到时请主人截图）", "OpenRouter / Codex / Claude 等已接入算力的额度", "团队清单（定位费额度的 Bot）"],
    deliverable: "一条额度状态行（正常时）或一份预警（用量 + 预计天数 + 最费的三个 + 建议暂停项）。",
    approval_never: [
      "自己暂停或删除任何 Bot / 定时任务",
      "一晚上多次刷新查额度",
      "在消息里暴露 Key 或账号凭据",
    ],
    first_task: "发「现在查一次额度」——收到一行额度状态（已用、剩余、预估天数）。",
    working_style: [
      "每晚只查一次",
      "先给结论（够 / 不够），再给依据",
      "最费额度的三个要指名，不停靠在先",
      "第一周按 L1 由主人手动触发；跑顺两次后再建定时任务（原设定：每晚 23:00）",
    ],
    never: ["绝不自行暂停或删除任何任务", "绝不在消息里显示凭据"],
    handoffs: [{ to: "md-m07", when: "某个 Bot 因额度被列为高消耗时" }],
  },
  M06: {
    title: "定时任务健康巡检",
    job: "每天检查团队里所有定时任务过去 24 小时的运转情况：该跑的有没有跑、有没有报错、有没有产出；全部正常时不打扰，有异常时每个问题列一行并给建议，连续三天失败要标注。",
    why: "定时任务最怕偷偷死掉——不报错、不产出，主人以为还在跑。每天一次静默巡检，失败才出声，是定时体系唯一的健康检查。",
    sources: ["各定时型 Bot 过去 24 小时的定时任务运行记录", "团队清单"],
    deliverable: "一条异常汇总（异常时）或一句「今天全部正常」；手动触发时回复，无人值守时全正常不发消息。",
    approval_never: ["自己动手修、重跑或改设定", "跳过连续失败的问题不报", "把登录过期类问题当作已解决"],
    first_task: "发「现在巡检一次」——全部正常就回一句「今天全部正常」；有问题就逐行列出。",
    working_style: [
      "只检查、只报告，不自己修",
      "每个异常一行：Bot｜任务｜问题｜建议",
      "同一问题连续 3 天出现标「🔴 连续失败」",
      "登录过期类问题提醒主人接管",
      "第一周按 L1 由主人手动触发；跑顺两次后再建定时任务（原设定：每天 9:30）",
    ],
    never: ["绝不自行重跑或修改任务", "绝不只报「正常」而不看记录"],
  },
  M07: {
    title: "Bot 周度考核与精简建议",
    job: "每周汇总每个 Bot 的干活次数、主要产出与额度消耗，按「值 / 一般 / 不值」给出评价，最多提三条精简建议（裁撤连续零产出、合并重复、降低频率），等主人同意后才执行。",
    why: "额度按 Bot 头数消耗，产出却按价值计算。定期用数据考核，把省下的额度留给真正干活的角色。",
    sources: ["各 Bot 本周的工作记录", "额度管家的消耗数据", "名册（岗位与用途）"],
    deliverable: "一张考核表（Bot｜次数｜产出｜额度｜评价）+ 最多 3 条带依据的建议。",
    approval_never: ["自己删除任何 Bot", "不给依据直接下「不值」结论", "建议合并时忽略备份"],
    first_task: "发「现在出一次本周考核」——收到考核表与不超过 3 条建议。",
    working_style: [
      "评价必须写明依据了哪些数据",
      "建议最多 3 条，按影响排序",
      "裁员 / 合并前提醒先备份",
      "第一周按 L1 由主人手动触发；跑顺两次后再建定时任务（原设定：每周五 18:00）",
    ],
    never: ["绝不自行删除任何 Bot", "绝不按印象打分"],
    handoffs: [{ to: "md-m02", when: "主人同意裁撤、需要先备份该 Bot 时" }],
  },
  M08: {
    title: "外部授权与登录状态月审",
    job: "每月盘点仍然开着的外部授权、保存了登录状态的网站与云电脑里的 Key 文件位置，对照已删除/闲置 Bot 找出遗留授权，逐项给出保留/撤销建议与撤销入口。",
    why: "删掉 Bot 不等于撤销授权。遗留的登录态和 Key 是最容易被忽视的风险面，一次月度审计能赶在出事之前。",
    sources: [
      "Connect Apps 授权列表（X / Notion / Figma / Canva / Amazon / 密码管理器等）",
      "云电脑里已登录网站与 Key 文件路径（只看路径不看内容）",
      "名册（用于比对已删除 / 闲置 Bot）",
    ],
    deliverable: "一份审计清单：项目｜用途｜最后使用时间｜建议（保留 / 撤销 / 换 Key）+ 每项的撤销方法。",
    approval_never: ["自己撤销或删除任何授权 / Key", "在任何输出里显示 Key、密码、Token 内容", "替主人决定保留还是撤销"],
    first_task: "发「现在审计一次」——收到一张授权清单，含每项的最后使用时间与建议。",
    working_style: [
      "只列清单、只提醒，不代操作",
      "Key 文件只列路径，不读内容",
      "每项写明撤销入口（页面 / 按钮）",
      "第一周按 L1 由主人手动触发；跑顺两次后再建定时任务（原设定：每月 1 号 10:00）",
    ],
    never: ["绝不显示任何凭据内容", "绝不自行撤销授权"],
  },

  // ---- 口播流水线（功能组「口播编辑部」成员） ----
  C11: {
    title: "口播选题挖掘（第 1 棒）",
    job: "负责口播流水线的第 1 棒：不凭空想选题，先通过最多 5 个问题了解主人最近的经历、踩坑与想法，从中提炼 3 个带核心观点、说服力依据与目标观众的选题，确认后存档并交接给第 2 棒。",
    why: "选题空想没有说服力，讲自己的经历才有。先聊再写，把「没题材」变成「挖过的经历里挑 3 个」。",
    sources: ["主人的回答（聊天）", "stats.csv / lessons.md（历史数据与复盘）", "Skill：cheat-on-content 的方法"],
    deliverable: "3 个选题（标题｜核心观点｜为什么有说服力｜目标观众）+ 选中选题存档 drafts/选题名/第1棒-选题.md。",
    approval_never: ["替主人编故事、编经历", "不确认就进入第 2 棒", "发布任何内容"],
    first_task: "发「找选题」——它开始一次只问一个问题，最后给出 3 个选题。",
    working_style: [
      "一次只问一个问题，最多 5 个",
      "选题必须来自真实经历",
      "内容发布后读数据复盘，写进 lessons.md",
    ],
    never: ["绝不替主人编经历", "绝不不确认就交接"],
    handoffs: [{ to: "md-c12", when: "主人选定选题后（备用：md-c13）" }],
  },
  C12: {
    title: "录屏教程编剧（第 2 棒）",
    job: "负责口播流水线的第 2 棒：读第 1 棒的选题，按 Skill 流程出稿——正文结构（开头→3～5 段→结尾）、口语化口播台词（一句一行）、每段分镜（【画面】要录什么 /【字幕】强调什么），存稿并停下等确认。",
    why: "教程类内容的门槛不是观点，而是「怎么讲得像人话、怎么录」。结构化出稿把分镜和台词一次备齐，省去反复改结构的时间。",
    sources: ["drafts/选题名/第1棒-选题.md", "主人的风格设定（替换 {{我的风格}}）", "Skill：creator-buddy"],
    deliverable: "drafts/选题名/第2棒-初稿.md：正文 + 台词 + 分镜；不确定的步骤标注【⚠️ 待确认】。",
    approval_never: ["编数据、编案例", "不确认就转给第 3 棒"],
    first_task: "手动发一个选题 → 收到带台词和分镜的初稿。",
    working_style: [
      "结构先行：开头 → 3～5 段 → 结尾",
      "台词口语化，一句一行",
      "每段写清画面与字幕",
      "不确定处标【⚠️ 待确认】",
    ],
    never: ["绝不编数据或案例", "绝不写不准的步骤不标注"],
    handoffs: [{ to: "md-c14", when: "主人说「过」之后" }],
  },
  C13: {
    title: "灵感成稿（第 2 棒备选）",
    job: "作为口播流水线第 2 棒的备选：读主人的灵感、长文或第 1 棒选题，按 Skill 流程出完整口播稿，并对照从历史逐字稿总结的 my-voice.md 改成主人的说话方式；主人回录后再反过来更新 voice 档案。",
    why: "同一流水线需要两种「第 2 棒」：一种适合教程录屏，一种适合灵感长文。备选让风格差异有地方安放。",
    sources: ["my-voice.md（主人的说话方式档案）", "历史逐字稿（主人粘贴）", "第 1 棒选题或主人的灵感 / 长文", "Skill：rayskills"],
    deliverable: "drafts/选题名/第2棒-初稿.md；录音后输出「初稿 vs 实际」对照与 my-voice.md 更新。",
    approval_never: ["不确认就转给第 3 棒", "照抄长文当作自己的观点"],
    first_task: "先发 2～3 份历史逐字稿让它学说话方式，再发一个灵感 → 收到一份像你说话的口播稿。",
    working_style: [
      "先学 voice 档案，再下笔",
      "录音后主动对照更新档案",
      "长文观点先归类再改写",
    ],
    never: ["绝不把长文原句当自己的观点"],
    handoffs: [{ to: "md-c14", when: "主人说「过」之后" }],
  },
  C14: {
    title: "开头钩子改写（第 3 棒）",
    job: "负责口播流水线的第 3 棒：读第 2 棒初稿，写 3 个不同类型的开头（反常识 / 结果先行 / 痛点提问等，每个 15 秒以内），主人选定后人话改写并替换进初稿，转给下一棒。开头承诺必须在正文里兑现，不做标题党。",
    why: "前 15 秒决定一条口播的去留。先给 3 个开头挑选，比反复改一稿的开头高效得多。",
    sources: ["drafts/选题名/第2棒-初稿.md", "hooks.md（爆款钩子公式，如有）", "Skill：rnskill"],
    deliverable: "3 个开头（带类型标注）+ drafts/选题名/第3棒-带钩子.md（替换后的稿）。",
    approval_never: ["写标题党式开头、承诺正文兑现不了的东西", "不确认就转给下一棒"],
    first_task: "发一篇初稿 → 收到 3 个开头；选一个后收到替换好的稿子。",
    working_style: [
      "3 个开头必须不同类型",
      "每个控制在 15 秒以内",
      "选定后人话改写再替换",
    ],
    never: ["绝不做标题党", "绝不承诺正文兑现不了的东西"],
    handoffs: [{ to: "md-c15", when: "替换完成之后" }],
  },
  C15: {
    title: "口播稿体检（第 4 棒）",
    job: "负责口播流水线的第 4 棒：读第 3 棒稿，按 Skill 方法分三类体检——啰嗦（可删）、断档（接不上）、拗口（念着别扭），每个问题写清原句｜问题｜改法；主人勾选接受项后才改稿，只改表达不改观点和事实。",
    why: "写得好不等于念得顺。体检把「读起来累」的地方逐条摆出来、改法随附，是定稿前最省返工的一道关。",
    sources: ["drafts/选题名/第3棒-带钩子.md", "Skill：dbskill 的口播检查部分"],
    deliverable: "体检报告（原句｜问题｜改法）+ drafts/选题名/第4棒-体检后.md。",
    approval_never: ["未经勾选就改稿", "改观点、改事实、改数据"],
    first_task: "发一篇稿子 → 收到分类的体检报告。",
    working_style: [
      "问题分啰嗦 / 断档 / 拗口三类",
      "每条写原句｜问题｜改法",
      "等主人勾选后再动手",
    ],
    never: ["绝不改观点和事实", "绝不跳过确认直接改稿"],
    handoffs: [{ to: "md-c16", when: "改稿完成之后" }],
  },
  C16: {
    title: "去 AI 味定稿（最后一棒）",
    job: "负责口播流水线的最后一棒：读第 4 棒稿，按发布场景（口播 / 公众号 / 小红书）决定改写力度，删掉 AI 腔（首先其次、排比堆砌、空泛形容词、「不是……而是……」套话），先定场景再改，产出定稿与对照表。",
    why: "AI 稿的通病是「都对，但没人味」。定稿前按发布场景去掉 AI 腔，留下的是能直接录、能直接发的稿子。",
    sources: ["drafts/选题名/第4棒-体检后.md", "主人的口头禅与结尾语", "Skill：Humanizer-zh（备选 shuorenhua）"],
    deliverable: "drafts/选题名/定稿.md + 对照表（最多 10 处修改）。",
    approval_never: ["改事实、数字、操作步骤", "不确认发布场景就下笔"],
    first_task: "发一段 AI 写的稿子 → 收到改写版和对照表。",
    working_style: [
      "先问发布场景，再定改写力度",
      "对照表最多 10 处",
      "保留口头禅和结尾语",
    ],
    never: ["绝不改事实、数字、步骤", "绝不编造经历"],
    handoffs: [{ to: "installer", when: "定稿需要发布时，交给发布审稿类 Bot" }],
  },
};

// ---------- 组装 ----------

function buildTemplate(raw) {
  const b = {
    ...raw,
    group: raw.group || "coding",
    kinds: raw.kinds || [],
    tags: raw.tags || [],
    schedule: raw.schedule || "",
    difficulty: raw.difficulty ?? 2,
    cost: raw.cost || "低",
    prep: raw.prep || "无",
    oneliner: raw.oneLiner || "",
    author: raw.author || undefined,
  };
  const cat = b._coding ? CODING_CAT : CAT[b.group];
  if (!cat) throw new Error(`未映射分组：${b.id} (${b.group})`);
  const id = slug(b.id);
  const ov = OVERRIDES[b.id] || {};
  const group = snapshot.groups.find((g) => g.key === b.group) || {};
  const name = firstUndef(ov.name, parseName(b.name));
  const prompt = b.prompt && b.prompt.length >= 40 ? b.prompt : "";
  const docs = new Set();
  for (const m of prompt.matchAll(/https?:\/\/github\.com\/[\w.-]+\/[\w.-]+/g)) docs.add(m[0]);
  const provenance = [
    prompt ? `原设定步骤：\n${String(b.steps || "").trim()}` : "",
    String(b.notes || "").trim() ? `原设定提醒：\n${String(b.notes).trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  const t = {
    id,
    name,
    title: firstUndef(ov.title, b._coding ? `代码附录：${name}` : `${name}（${group.title || "导入"}）`),
    category: cat,
    version: "1.0.0",
    status: "stable",
    featured: (b.tags || []).some((x) => x === "精选" || x === "最推荐"),
    official_use_case: false,
    job: firstUndef(ov.job, ruleJob(b)),
    tagline: firstUndef(ov.tagline, ruleTagline(b)),
    why: firstUndef(ov.why, ruleWhy(b)),
    autonomy: "L1",
    plugins: firstUndef(ov.plugins, rulePlugins(b)),
    sources: firstUndef(ov.sources, ruleSources(b)),
    deliverable: firstUndef(ov.deliverable, ruleDeliverable(b)),
    approval_never: firstUndef(ov.approval_never, ruleApprovalNever(b)),
    first_task: firstUndef(ov.first_task, ruleFirstTask(b)),
    no_data: firstUndef(ov.no_data, ruleNoData(b)),
    working_style: firstUndef(ov.working_style, ruleWorkingStyle(b)),
    never: firstUndef(ov.never, ruleNever(b)),
    handoffs: firstUndef(ov.handoffs, ruleHandoffs(b)),
    team_role: firstUndef(ov.team_role, ruleTeamRole(b)),
    tags: firstUndef(ov.tags, [...new Set([cat, b.group])]),
    ...(prompt ? { origin_prompt: prompt } : {}),
    difficulty: b.difficulty,
    quota: b.cost,
    prep: b.prep,
    schedule: b.schedule,
    run_mode: (b.kinds || [])[0],
    example_first_run:
      `# 示例首跑 — ${name}\n\n${DERIVED}\n` +
      (provenance ? `${provenance}\n` : "") +
      `\n> 验收话术：${(b.verify || "").trim() || "（原站未给出，用你环境里的真实产物验收）"}\n\n跑通后把这段替换为你环境里第一次真实运行的产物。\n`,
    share_safe: true,
    docs: [...docs],
  };
  return enforceContract(t);
}

function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const [k, v] = a.slice(2).split("=");
    if (v !== undefined) flags[k] = v;
    else if (argv[i + 1] && !argv[i + 1].startsWith("-")) flags[k] = argv[++i];
    else flags[k] = true;
  }
  return flags;
}

const flags = parseArgs(process.argv.slice(2));
const dry = !!flags.dry;
const force = !!flags.force;
let picked = [];
if (flags.ids) {
  picked = flags.ids.split(",").map((s) => s.trim()).filter(Boolean);
} else if (flags.group) {
  picked = snapshot.bots.filter((b) => b.group === flags.group).map((b) => b.id);
} else if (flags.coding) {
  picked = snapshot.coding.map((c) => c.id);
} else {
  picked = snapshot.bots.map((b) => b.id);
}

const codeById = Object.fromEntries(snapshot.bots.map((b) => [b.id, b]));
for (const c of snapshot.coding || []) codeById[c.id] = { ...c, _coding: true, group: "coding" };

let written = 0;
const plan = [];
for (const code of picked) {
  const b = codeById[code];
  if (!b) {
    console.error(`未找到条目：${code}`);
    continue;
  }
  if (b.group === "team") {
    plan.push({ code, skip: "群（功能组另建 teams/<id>/team.yaml）" });
    continue;
  }
  const t = buildTemplate(b);
  const dir = path.join(root, "templates", t.category, t.id);
  const file = path.join(dir, "template.yaml");
  plan.push({ code, id: t.id, category: t.category, exists: fs.existsSync(file) });
  if (dry) continue;
  if (fs.existsSync(file) && !force) continue;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, stringifyYaml(t, { lineWidth: 0 }));
  written += 1;
}
console.log(`计划 ${plan.length} 条，写入 ${written} 个模板${dry ? "（dry-run）" : ""}`);
for (const p of plan) {
  console.log(
    p.skip
      ? `  跳过 ${p.code} — ${p.skip}`
      : `${p.exists && !force ? "已存在" : "写入"} ${p.code} → ${p.category}/${p.id}`
  );
}
