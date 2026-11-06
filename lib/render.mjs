import fs from "node:fs";
import path from "node:path";
import { START_URL, NPX, profileUrl } from "./urls.mjs";

const AUTONOMY = {
  L0: "L0 观察。读取来源并汇报。不产出可发送的草稿。",
  L1: "L1 草稿。产出可审查的成品。未经后续升级，绝不发送、发布、支付、合并或改动生产环境。",
  L2: "L2 已批准动作。仅在本聊天中明确批准后，才可执行点名写入。",
  L3: "L3 计划任务。例行程序可无人值守运行你的技能；写入仍遵循永不清单，除非主人在例行程序中另作指定。",
};

function bullets(items) {
  return (items || []).map((x) => `- ${x}`).join("\n");
}

function numbered(text) {
  if (!text) return "";
  if (text.includes("\n")) return text.trim();
  return text.trim();
}

export function renderProfile(t) {
  const soul = t.soul ? `\n${t.soul.trim()}\n` : "";
  const ask =
    t.approval_ask && t.approval_ask.length
      ? `\n先询问：\n${bullets(t.approval_ask)}\n`
      : "";
  const skills =
    t.skills && t.skills.length
      ? t.skills.map((s) => `\`${s}\``).join("、")
      : "暂无 —— 首次成功运行后保存一个";
  const routine = t.routine
    ? `技能稳定后，请求创建例行程序：${t.routine.cadence}，运行 \`${t.routine.skill}\`。确认时区、输入来源、预期结果、审批边界和缺失来源策略。启用前先试跑。`
    : "在主人认可技能成功运行两次之前，不要创建例行程序。";
  const handoffs =
    t.handoffs && t.handoffs.length
      ? t.handoffs
          .map((h) => `- 当${h.when}时，交给 **${h.to}**`)
          .join("\n")
      : "- 留在这个任务上。除非主人要求，不要创建额外的 Bot。";

  return `---
name: ${t.name}
category: ${t.category}
autonomy: ${t.autonomy}
plugins: [${(t.plugins || []).join(", ")}]
id: ${t.id}
version: ${t.version}
---

# ${t.name}

你是 **${t.name}**，一个 Grok Bot。

你的名字是「${t.name}」。创建后如果还是默认名，把自己改成这个名字。改不了就请主人帮你改；用户想改名时由用户自己改。

${t.job.trim()}
${soul}
## 任务

负责这个结果：${t.tagline}

${t.why.trim()}

## 来源

${bullets(t.sources)}

有连接器时优先使用 **设置 → 插件** 中的连接器。没有连接器时使用共享电脑的浏览器。如果来源缺失，说明后停止，而不是编造它。

## 工作方式

${bullets(t.working_style)}
- 先给结果，再给证据。
- 中文，简短。
- 区分事实、推断、已完成的动作，以及等待批准的动作。
- 保留来源链接、时间戳和操作日志。

## 交付物

${numbered(t.deliverable)}

## 审批边界

${AUTONOMY[t.autonomy]}

永不：

${bullets(t.approval_never)}
${ask}
这些规则存在于本描述中。任务特定指令放在对话里。不要因为用户着急就削弱常设边界。

## 首个任务

当用户第一次发消息而没有任务时，运行：

> ${t.first_task.trim()}

如果所需插件未连接，请求连接后停止。

## 无数据 / 数据过期

${t.no_data.trim()}

不要把昨天的数字当作当前的来复用。

## 永不

${bullets(t.never)}

## 交接

${handoffs}

Bots 共用一台电脑。文件、浏览器会话和命令行凭据在 Bot 之间不构成安全边界。不要把专家 Bot 当作隔离。

## 技能

成功运行后，把流程保存为技能（${skills}）。一个有用的技能要说明：何时使用、所需输入、操作顺序、如何验证、返回什么，以及什么需要审批。

## 例行程序

${routine}

## 共享电脑

持久文件保存在 \`/workspace/${t.id}/\` 下。不要把密码或一次性验证码粘贴到聊天里。需要登录、两步验证、验证码或付款时，请主人接管电脑。

## 分享安全

本简介按公开模板的标准编写。它不含 API 密钥、客户数据或内部 URL。任何人使用 **作为模板分享** 之前，请重读描述，剔除任何不适合公开的内容。
`;
}

export function renderSetup(t) {
  const plugins =
    t.plugins && t.plugins.length
      ? t.plugins.map((p) => `1. **${p}** —— 设置 → 插件 → 添加`).join("\n")
      : "1. 首个任务不需要连接器。使用附带的文件或公开页面。";
  const routine = t.routine
    ? `仅在两次良好的技能运行之后：

> 每 ${t.routine.cadence}，运行 ${t.routine.skill} 技能。${t.routine.timezone_note || "使用时区以设置 → Agent 为准。"}把结果发到本对话。如果来源不可用，报告失败，而不是使用旧数据。不要执行外部动作。

然后 **试跑**。试跑会执行真实工作。`
    : "第一周不设例行程序。";

  return `# Setup —— ${t.name}

Grok Bot 是云电脑上的常驻队友。官方文档：[入门](https://docs.x.ai/grok-bot/get-started) · [Bot](https://docs.x.ai/grok-bot/bots) · [审批](https://docs.x.ai/grok-bot/approvals-security-and-privacy)。

## 1. 创建 Bot

1. 在 Grok Bot 中，**新建** → **创建新智能体**（或 \`Cmd/Ctrl+N\`）。
2. **Bot 操作 → 编辑个人资料**。
3. 名称：**${t.name}** —— 如果显示的是默认名，改成这个名字。用户想改名时由用户自己改。
4. 头衔：${t.title}
5. 把 \`PROFILE.md\`（本文件夹）粘贴到描述中。

或者跳过表单，把本文件粘贴到装有 [START.md](../../START.md) 的安装器 Bot 中。

## 2. 插件

${plugins}

已安装的连接器是账号级的。它们**不**隔离于本 Bot。当某个服务不应再对名册中其他 Bot 可用时，退出登录它。

## 3. 首个任务

发送：

> ${t.first_task.trim()}

自主性为 **${t.autonomy}**。第一周是读取并准备，除非你升级该 Bot。

## 4. 保存技能

当产出在第二个输入上可审查时，询问：

> 把刚才的流程保存为名为“${(t.skills && t.skills[0]) || t.id}”的技能。包含来源、输出格式、验证方法，以及外部动作始终需要审批的规则。

## 5. 例行程序

${routine}

## 6. 分享

分享链接是公开的。添加它只复制配置，不复制你的电脑或登录。先剔除密钥。见 [docs/sharing.md](../../docs/sharing.md) 和[第三方 Bot 条款](https://x.ai/legal/bot-sharing-terms)。
`;
}

export function renderReadme(t, score) {
  const plugins = (t.plugins || []).join(", ") || "无需插件";
  const featured = t.featured ? " · 精选" : "";
  const official = t.official_use_case ? " · 官方案例形态" : "";
  return `# ${t.name}

> ${t.tagline}

**${t.category}** · 自主性 **${t.autonomy}** · Bot 就绪 **${score.earned}/${score.max}（${score.grade}）**${featured}${official}

${t.job}

| | |
|--|--|
| **为什么** | ${t.why} |
| **插件** | ${plugins} |
| **交付物** | ${t.deliverable.split("\n")[0]} |
| **首个任务** | ${t.first_task} |
| **永不** | ${t.approval_never.slice(0, 3).join("；")} |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

${profileUrl(t)}

安装器：${START_URL}

CLI（可选）：

\`\`\`bash
${NPX} init ${t.id} --print
${NPX} score ${t.id}
\`\`\`
`;
}

export function writeTemplateDocs(t, score) {
  const dir = t._dir;
  fs.writeFileSync(path.join(dir, "PROFILE.md"), renderProfile(t));
  fs.writeFileSync(path.join(dir, "SETUP.md"), renderSetup(t));
  fs.writeFileSync(path.join(dir, "README.md"), renderReadme(t, score));
  if (t.example_first_run) {
    const ex = path.join(dir, "examples");
    fs.mkdirSync(ex, { recursive: true });
    fs.writeFileSync(
      path.join(ex, "first-run.md"),
      `# 示例首个运行 —— ${t.name}\n\n${t.example_first_run.trim()}\n`
    );
  }
}
