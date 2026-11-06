import fs from "node:fs";
import path from "node:path";

export function renderSkillMd(s) {
  return `# ${s.name}

成功运行后，把本文件粘贴到 Grok Bot 中：

> 把刚才的流程保存为名为“${s.name}”的技能。

一个有用的技能要说明来自 [Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations) 的六个字段：

## 1. 何时使用

${s.when_to_use}

## 2. 所需输入与访问权限

${(s.inputs || []).map((x) => `- ${x}`).join("\n")}

## 3. 操作顺序

${(s.sequence || []).map((x, i) => `${i + 1}. ${x}`).join("\n")}

## 4. 如何验证结果

${s.validate}

## 5. 返回什么

${s.returns}

## 6. 什么需要审批

${s.approval}

在输入框中键入 \`/\` 来引用已保存的技能。如果没有出现，打开 **设置 → 插件 → 你的插件** 并为本 Bot 启用它。
`;
}

export function writeSkillDocs(s) {
  const dir = path.dirname(s._file);
  fs.writeFileSync(path.join(dir, "SKILL.md"), renderSkillMd(s));
}
