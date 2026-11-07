# 竞品监控

> 每天盯着竞品的价格、上新、页面变化，只报真正有意义的变化，不给你刷屏。

**marketing** · 自主性 **L1** · 运行方式：定时（每天 10:00）

。请把下面的内容记成长期设定，并建好定时任务：每天盯着竞品的价格、上新、页面变化，只报真正有意义的变化，不给你刷屏。每次收到任务：逐个打开链接，记录：价格、优惠活动、标题、主图、销量（如果能看到）、新上架的商品；和昨天的记录对比，**只报实质变化**：；有变化就发：竞品｜变了什么｜之前 → 现在｜对我可能有什么影响（一句话）。

| | |
|--|--|
| **为什么** | 每天盯着竞品的价格、上新、页面变化，只报真正有意义的变化，不给你刷屏。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/ecom-competitor-watch/。 |
| **首个任务** | 发一句「每天盯着竞品的价格、上新、页面变化，只报真正有意义的变化，不给你刷屏。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 不算：页面时间戳、浏览数、推荐位顺序、"X 人正在看"；只看公开页面，不登录竞品账号，不下单；打不开的链接记一笔，连续 3 天打不开再告诉我 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/ecom-competitor-watch/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init ecom-competitor-watch --print
```
