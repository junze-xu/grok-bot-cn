import fs from "node:fs";
import path from "node:path";

export function renderPatternMd(p) {
  const applies = (p.applies_to || []).map((x) => `- ${x}`).join("\n");
  return `# ${p.name}

${String(p.summary || "").trim()}

## 规则

${String(p.rule || "").trim()}

## 反模式

${String(p.anti_pattern || "").trim()}

## 适用于

${applies || "- 写作与评审"}

来源：${p.source}
`;
}

export function writePatternDocs(p) {
  const dir = path.dirname(p._file);
  fs.writeFileSync(path.join(dir, "PATTERN.md"), renderPatternMd(p));
}
