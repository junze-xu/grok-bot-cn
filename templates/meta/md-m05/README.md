# 额度管家

> 每晚统计各家额度用了多少。快见底时，先暂停不重要的定时任务，等你确认再恢复。

**meta** · 自主性 **L1** · 运行方式：定时（每晚 23:00）

每天检查 Grok Bot 本周期额度与各接入算力的用量，估算按当前速度还能撑几天；快见底时列出最费额度的三个 Bot/定时任务并建议暂停，等主人确认后再执行暂停或恢复。

| | |
|--|--|
| **为什么** | 额度是整支团队共同的钱包，单人无感、月底吓人。提前预警并分清优先级，能避免关键时刻被低价值任务拖垮。 |
| **插件** | 无需插件 |
| **交付物** | 一条额度状态行（正常时）或一份预警（用量 + 预计天数 + 最费的三个 + 建议暂停项）。 |
| **首个任务** | 发「现在查一次额度」——收到一行额度状态（已用、剩余、预估天数）。；跑通后把真实产物与回执发给主人。 |
| **永不** | 自己暂停或删除任何 Bot / 定时任务；一晚上多次刷新查额度；在消息里暴露 Key 或账号凭据 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/meta/md-m05/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-m05 --print
```
