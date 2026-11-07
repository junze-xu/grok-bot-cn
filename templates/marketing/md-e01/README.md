# 店铺数据日报

> 每天拉昨天的销量、转化、退款，和上周同期对比，推一条。

**marketing** · 自主性 **L1** · 运行方式：定时（每天 9:00） · 来源：mdldm.club/E01

。请把下面的内容记成长期设定，并建好定时任务：每天拉昨天的销量、转化、退款，和上周同期对比，推一条。每次收到任务：登录店铺后台，读取昨天的数据：访客、下单、支付金额、转化率、退款金额、退款率；和上周同一天对比，算出涨跌百分比；发一条，最多 6 行：。

| | |
|--|--|
| **为什么** | 每天拉昨天的销量、转化、退款，和上周同期对比，推一条。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-e01/。 |
| **首个任务** | 发一句「每天拉昨天的销量、转化、退款，和上周同期对比，推一条。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 只读数据，不改任何设置、价格和商品；登录过期了就提醒我接管，不要反复尝试登录；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/md-e01/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-e01 --print
```
