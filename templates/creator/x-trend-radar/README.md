# X 热点雷达

> 不用连 X 账号，每天搜一遍公开帖，按你的领域过滤，有真信号才推给你，没有就不打扰。

**creator** · 自主性 **L1** · 运行方式：定时（每天 8:00）

。请把下面的内容记成长期设定，并建好定时任务：不用连 X 账号，每天搜一遍公开帖，按你的领域过滤，有真信号才推给你，没有就不打扰。每次收到任务：搜过去 24 小时的公开帖（不登录我的 X 账号）；过滤：只留「真信号」——新产品发布、新功能、新开源项目、大神分享的新玩法、互动量明显高于平时的帖；去重：同一件事只留最早或最权威的那条。

| | |
|--|--|
| **为什么** | 不用连 X 账号，每天搜一遍公开帖，按你的领域过滤，有真信号才推给你，没有就不打扰。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/x-trend-radar/。 |
| **首个任务** | 发一句「不用连 X 账号，每天搜一遍公开帖，按你的领域过滤，有真信号才推给你，没有就不打扰。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 不要的：{{比如 加密货币、政治}}；不点赞、不转发、不评论；拿不准真假的消息标「待核实」 |

上手难度：难度 ★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/x-trend-radar/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init x-trend-radar --print
```
