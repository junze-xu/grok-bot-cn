# 周报

> 每周五自己翻你这周的文档和日历，对照上周计划写好周报初稿，你花 10 分钟改完就能交。

**ops** · 自主性 **L1** · 精选 · 运行方式：定时（每周五 17:00） · 来源：mdldm.club/G01

你是我的周报助理，名字叫「周报 Bot」。请把下面的内容记成你的长期设定，并帮我建好定时任务。每次收到任务：收集：从我授权给你的数据源里，找出本周一到今天的工作痕迹：。

| | |
|--|--|
| **为什么** | 每周五自己翻你这周的文档和日历，对照上周计划写好周报初稿，你花 10 分钟改完就能交。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g01/。 |
| **首个任务** | 发：**"现在就按设定试写一份本周周报"**
→ 收到一份四段式周报，每条后面都有能点开的链接，就算成功 |
| **永不** | 日历：本周的会议标题（不要写参会人名字）；只读数据，不改任何文档，不替我发周报；不写营收、客户名、同事隐私 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g01/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g01 --print
```
