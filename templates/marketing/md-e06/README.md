# 选品比价

> 给它一个商品，它去查同款在各平台的价格、评分、评论里的高频词，告诉你值不值得做。

**marketing** · 自主性 **L1** · 运行方式：技能

：给它一个商品，它去查同款在各平台的价格、评分、评论里的高频词，告诉你值不值得做。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 给它一个商品，它去查同款在各平台的价格、评分、评论里的高频词，告诉你值不值得做。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-e06/。 |
| **首个任务** | 发一句「给它一个商品，它去查同款在各平台的价格、评分、评论里的高频词，告诉你值不值得做。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 只看公开信息，不下单、不登录卖家后台；拿不准是不是同款的，标「近似款」；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/md-e06/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-e06 --print
```
