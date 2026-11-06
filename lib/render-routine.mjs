import fs from "node:fs";
import path from "node:path";

export function renderRoutineMd(r) {
  return `# ${r.name}

所有者：**${r.owner}**。技能：\`${r.skill}\`。频率：${r.cadence}。

官方结构来自 [Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations)。确认：所属 Bot、计划与时区、输入来源、预期结果、审批边界、缺失来源策略。

## 要粘贴的提示词

> ${r.prompt}

## 预期结果

${r.expected_result}

## 审批边界

${r.approval_boundary}

## 来源缺失

${r.missing_source}

## 先试跑

**试跑是强制的。** 试跑会执行真实工作。它可以浏览网站、修改文件、调用已连接的工具。使用安全输入。把写入动作置于审批之后。

然后打开 Bot → **查看对话详情** → **例行程序**。
`;
}

export function writeRoutineDocs(r) {
  const dir = path.dirname(r._file);
  fs.writeFileSync(path.join(dir, "ROUTINE.md"), renderRoutineMd(r));
}
