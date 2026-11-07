# 差评预警

> 每 4 小时扫一遍新评价，有差评马上推给你，附上建议的回复草稿。

**marketing** · 自主性 **L1** · 精选 · 运行方式：定时（每 4 小时） · 来源：mdldm.club/E03

。请把下面的内容记成长期设定，并建好定时任务：每 4 小时扫一遍新评价，有差评马上推给你，附上建议的回复草稿。每次收到任务：打开评价管理，找出上次检查之后的新评价；筛出差评：1～2 星，或者 3 星但内容有抱怨（质量、发货慢、和描述不符、客服态度）；每条差评推一条：。

| | |
|--|--|
| **为什么** | 每 4 小时扫一遍新评价，有差评马上推给你，附上建议的回复草稿。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-e03/。 |
| **首个任务** | 发一句「每 4 小时扫一遍新评价，有差评马上推给你，附上建议的回复草稿。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 回复草稿只发给我，**不替我在平台上回复**；不承诺退款金额，不和买家争辩；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/md-e03/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-e03 --print
```
