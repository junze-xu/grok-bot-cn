# 模板剖析

```
templates/engineering/pr-reviewer/
  template.yaml          唯一事实来源（CI）
  PROFILE.md             粘贴到编辑个人资料（生成）
  SETUP.md               插件、首个任务、技能、例行程序（生成）
  README.md              目录页（生成）
  examples/first-run.md  「好」长什么样（生成）
```

```
任务  →  边界  →  技能   →  例行程序  →  团队
（谁）    （永不）   （怎么做）   （何时）    （交接）
```

PROFILE 就是 Bot **描述**。它必须在空对话中依然成立。首个任务是唯一规定的**消息**。

见 [SPEC.md](../SPEC.md)。
