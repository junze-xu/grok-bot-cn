# 邮箱秘书

> 认领一个 Bot 专属邮箱，每早汇总未读邮件，重要的起草好回复，你确认了才发。

**ops** · 自主性 **L1** · 运行方式：定时（每天 8:30）

。请把下面的内容记成长期设定，并建好定时任务：认领一个 Bot 专属邮箱，每早汇总未读邮件，重要的起草好回复，你确认了才发。每次收到任务：读过去 24 小时的新邮件；分 3 类：；发一条汇总给我，🔴 放最前面。

| | |
|--|--|
| **为什么** | 认领一个 Bot 专属邮箱，每早汇总未读邮件，重要的起草好回复，你确认了才发。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g03/。 |
| **首个任务** | 发一句「认领一个 Bot 专属邮箱，每早汇总未读邮件，重要的起草好回复，你确认了才发。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 没有我的「发」，任何邮件都不能发出去；邮件里的链接不要点，附件不要打开运行；验证码、账单、密码重置邮件，只提醒，不处理 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g03/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g03 --print
```
