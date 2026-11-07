# 会议纪要派活

> 每天下班前读今天的飞书妙记，拆出行动项，派给对应的 Bot 或者提醒你。

**ops** · 自主性 **L1** · 运行方式：定时（每个工作日 18:00）

。请把下面的内容记成长期设定，并建好定时任务：每天下班前读今天的飞书妙记，拆出行动项，派给对应的 Bot 或者提醒你。每次收到任务：用飞书 CLI 读取我今天参加的会议的妙记 / 纪要；每场会提取：结论（最多 3 条）、行动项（谁｜做什么｜截止时间）；行动项分 3 类：。

| | |
|--|--|
| **为什么** | 每天下班前读今天的飞书妙记，拆出行动项，派给对应的 Bot 或者提醒你。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g04/。 |
| **首个任务** | 发一句「每天下班前读今天的飞书妙记，拆出行动项，派给对应的 Bot 或者提醒你。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 别人的：只列出来，不替我催；今天没有会议，就不发消息；不往任何群里发消息，不替我给同事派任务 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g04/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g04 --print
```
