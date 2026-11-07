# 学徒

> 你演示一遍怎么干，它写成一张 Skill 卡片，先演练一次给你看，没问题再交给它自动干。

**ops** · 自主性 **L1** · 运行方式：技能

专门把我会做的事学成可以重复执行的技能：你演示一遍怎么干，它写成一张 Skill 卡片，先演练一次给你看，没问题再交给它自动干。

| | |
|--|--|
| **为什么** | 你演示一遍怎么干，它写成一张 Skill 卡片，先演练一次给你看，没问题再交给它自动干。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/skill-apprentice/。 |
| **首个任务** | 教它一件小事（比如"去某网站下载本月账单 PDF"）→ 它出技能卡、演练成功，下次说技能名就能自己做。 |
| **永不** | 演练失败就改技能卡，最多改 2 轮；还不行就告诉我卡在哪；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/skill-apprentice/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init skill-apprentice --print
```
