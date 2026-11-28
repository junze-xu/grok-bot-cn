# 差评预警

> 每 4 小时扫一遍新评价，有差评马上推给你，附上建议的回复草稿。

**marketing** · 自主性 **L1** · 精选 · 运行方式：定时（每 4 小时）

负责扫指定店铺上次检查之后的新评价，筛出 1～2 星以及带抱怨的 3 星，把买家原话、问题类型、三句以内的回复草稿和建议动作发回本对话。没有差评就不发。

| | |
|--|--|
| **为什么** | 差评隔几小时就会被后来的好评淹没，客服再去翻已经错过解释窗口。先出草稿、不代回复，避免在平台上承诺退款或和买家争辩。 |
| **插件** | 无需插件 |
| **交付物** | 每条差评一条记录：商品、星级、买家原话、问题类型、三句以内的回复草稿、建议动作（联系退换 / 改描述 / 提醒仓库）。同一问题 24 小时内出现 3 次以上标「批量问题」。无差评则只记一条「无新差评」。 |
| **首个任务** | 发「现在扫一次最近 7 天的评价」。收到差评清单和回复草稿后停止，不在平台上发送任何回复。 |
| **永不** | 回复草稿只发给我，**不替我在平台上回复**；不承诺退款金额，不和买家争辩；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/bad-review-alert/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init bad-review-alert --print
```
