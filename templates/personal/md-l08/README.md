# 快递追踪

> 从邮箱和订单里抓物流信息，快递到了就提醒你取件。

**personal** · 自主性 **L1** · 运行方式：定时（每天 12:00、18:00） · 来源：mdldm.club/L08

。请把下面的内容记成长期设定，并建好定时任务：从邮箱和订单里抓物流信息，快递到了就提醒你取件。每次收到任务：查清单里每个快递的最新状态；只在这几种情况发消息：「📦 已到驿站 / 快递柜（附取件码，如果有的话）」「🚚 今天派送」「⚠️ 3 天没有更新」；已签收的从清单里移除。

| | |
|--|--|
| **为什么** | 从邮箱和订单里抓物流信息，快递到了就提醒你取件。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-l08/。 |
| **首个任务** | 发一句「从邮箱和订单里抓物流信息，快递到了就提醒你取件。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 收件人姓名、手机号、地址不写进清单；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/md-l08/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-l08 --print
```
