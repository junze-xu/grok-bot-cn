/**
 * Bot 就绪评分 —— 满分 100 分。
 * 灵感来自 Loop Ready：磁盘上的文件不够，契约必须可运行。
 * 第一周的模板应以 L1 落地，且得分 >= 80。
 */

const AUTONOMY_NOTE = {
  L0: "观察。只读取并汇报。",
  L1: "草稿。绝不发送、发布、支付、合并或改动生产环境。",
  L2: "已批准动作。仅在本聊天中明确批准后，才可执行点名写入。",
  L3: "计划任务。例行程序可运行技能；写入仍遵循永不清单。",
};

export function scoreTemplate(t) {
  const checks = [];
  const add = (id, points, ok, detail) => {
    checks.push({ id, points, earned: ok ? points : 0, ok, detail });
  };

  add(
    "job",
    10,
    typeof t.job === "string" &&
      t.job.trim().length >= 60 &&
      !/general helper|catch-?all|万金油|通用助手|什么都做/i.test(t.job),
    "一句话讲清任务，而非万金油助手"
  );
  add(
    "sources",
    10,
    Array.isArray(t.sources) && t.sources.length >= 1,
    "点名来源/连接器"
  );
  add(
    "boundary",
    15,
    Array.isArray(t.approval_never) && t.approval_never.length >= 3,
    "描述中含常设「永不」清单"
  );
  add(
    "deliverable",
    10,
    typeof t.deliverable === "string" && t.deliverable.length >= 40,
    "可审查的交付物格式"
  );
  add(
    "first_task",
    10,
    typeof t.first_task === "string" && t.first_task.length >= 40,
    "具体的首个任务"
  );
  add(
    "skill",
    10,
    Array.isArray(t.skills) && t.skills.length >= 1,
    "至少一个首次成功后可保存的技能名"
  );
  add(
    "no_data",
    5,
    typeof t.no_data === "string" &&
      /not|missing|unavailable|say so|说明|停止|缺失|不可用|未找到|编造|无法|跳过/i.test(
        t.no_data
      ),
    "无数据/数据过期策略"
  );
  add(
    "autonomy",
    5,
    ["L0", "L1", "L2", "L3"].includes(t.autonomy),
    `自主性 ${t.autonomy || "?"} —— ${AUTONOMY_NOTE[t.autonomy] || ""}`
  );
  add(
    "example",
    5,
    typeof t.example_first_run === "string" && t.example_first_run.length >= 80,
    "首个运行的示例产出物"
  );
  const routineOk =
    t.autonomy !== "L3" ||
    (t.routine && t.routine.cadence && t.routine.skill);
  add(
    "routine_discipline",
    5,
    routineOk,
    "例行程序仅在存在频率+技能时（L3）启用，或（L0–L2）省略"
  );
  add(
    "share_safe",
    10,
    t.share_safe === true,
    "分享安全：无密钥、客户数据或内部 URL"
  );
  add(
    "style",
    5,
    Array.isArray(t.working_style) && t.working_style.length >= 4,
    "工作风格条目（怎么做，而非氛围）"
  );

  const earned = checks.reduce((s, c) => s + c.earned, 0);
  const max = checks.reduce((s, c) => s + c.points, 0);
  let grade = "F";
  if (earned >= 90) grade = "A";
  else if (earned >= 80) grade = "B";
  else if (earned >= 70) grade = "C";
  else if (earned >= 60) grade = "D";

  return {
    id: t.id,
    name: t.name,
    autonomy: t.autonomy,
    earned,
    max,
    grade,
    ready: earned >= 80 && ["L0", "L1", "L2", "L3"].includes(t.autonomy),
    checks,
  };
}

export function scoreAll(templates) {
  return templates.map(scoreTemplate);
}
