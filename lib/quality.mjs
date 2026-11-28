// 导入器为了凑过 schema 留下的垫词。稳定或精选模板不得再带这些句子。

export const FILLERS = [
  {
    id: "placeholder-example",
    re: /原设定的验收话术/,
  },
  {
    id: "padded-why",
    re: /把这一步做成可重复、可审查的产出，代替每次手搓/,
  },
  {
    id: "padded-deliverable",
    re: /一份可交付给主人的成果与一句回执/,
  },
];

function promoted(t) {
  return t.status === "stable" || t.featured === true;
}

export function qualityIssues(t) {
  const blob = [t.job, t.why, t.tagline, t.deliverable, t.example_first_run, t.first_task]
    .filter(Boolean)
    .join("\n");
  const hits = FILLERS.filter((filler) => filler.re.test(blob)).map((filler) => filler.id);
  if (/^[。：，、]/.test(String(t.job || "").trim())) hits.push("job-punctuation");
  if (!hits.length) return [];
  const live = promoted(t);
  return [
    {
      level: live ? "error" : "warning",
      msg: live
        ? `imported filler (${hits.join(", ")}) cannot ship while status is stable or featured`
        : `imported filler (${hits.join(", ")}) — keep this template draft until the contract is rewritten`,
    },
  ];
}
