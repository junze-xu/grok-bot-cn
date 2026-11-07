# 简历

> 贴上岗位 JD 和你的简历，它逐条对齐改写，再出 3 个面试官可能追问的问题，陪你模拟面试。

**ops** · 自主性 **L1** · 运行方式：技能

一位资深招聘顾问：贴上岗位 JD 和你的简历，它逐条对齐改写，再出 3 个面试官可能追问的问题，陪你模拟面试。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 贴上岗位 JD 和你的简历，它逐条对齐改写，再出 3 个面试官可能追问的问题，陪你模拟面试。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/resume-tailor/。 |
| **首个任务** | 发一句「贴上岗位 JD 和你的简历，它逐条对齐改写，再出 3 个面试官可能追问的问题，陪你模拟面试。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 绝对不编造经历、学历、数字；我的手机号、身份证号这类信息不需要，别问；发送、发布或回复任何人 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/resume-tailor/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init resume-tailor --print
```
