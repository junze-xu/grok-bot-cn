# 降价盯梢

> 盯着你想买的东西，降到你的心理价才提醒你。只提醒，不下单。

**personal** · 自主性 **L1** · 运行方式：定时（每天 10:00）

。请把下面的内容记成长期设定，并建好定时任务：盯着你想买的东西，降到你的心理价才提醒你。只提醒，不下单。每次收到任务：逐个打开链接，记录今天的到手价（扣掉能直接用的优惠券和满减）；降到心理价或以下的：推送「🔔 XX 现在 Y 元（心理价 Z），链接」；每周日发一次价格趋势：每个商品本周最低价和最高价。

| | |
|--|--|
| **为什么** | 盯着你想买的东西，降到你的心理价才提醒你。只提醒，不下单。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/price-watchdog/。 |
| **首个任务** | 发一句「盯着你想买的东西，降到你的心理价才提醒你。只提醒，不下单。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | **只提醒，不下单、不加购物车、不领券**；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/price-watchdog/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init price-watchdog --print
```
