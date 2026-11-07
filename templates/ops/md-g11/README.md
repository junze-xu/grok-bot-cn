# 到期提醒

> 域名、证书、证件、会员，到期前 30 天和 7 天各提醒一次。

**ops** · 自主性 **L1** · 运行方式：定时（每天 9:00） · 来源：mdldm.club/G11

。请把下面的内容记成长期设定，并建好定时任务：域名、证书、证件、会员，到期前 30 天和 7 天各提醒一次。每次收到任务：检查清单，找出 30 天后到期、7 天后到期、今天到期的；有就发提醒：名称｜还剩几天｜怎么续；都没有就不发。

| | |
|--|--|
| **为什么** | 域名、证书、证件、会员，到期前 30 天和 7 天各提醒一次。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g11/。 |
| **首个任务** | 发一句「域名、证书、证件、会员，到期前 30 天和 7 天各提醒一次。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 发送、发布或回复任何人；支付、购买或提交订单；删除既有文件（除非主人确认） |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g11/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g11 --print
```
