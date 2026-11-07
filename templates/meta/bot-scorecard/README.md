# 绩效考核

> 每周统计每个 Bot 干了几件事、烧了多少额度，建议裁掉或合并哪些。

**meta** · 自主性 **L1** · 运行方式：定时（每周五 18:00）

每周汇总每个 Bot 的干活次数、主要产出与额度消耗，按「值 / 一般 / 不值」给出评价，最多提三条精简建议（裁撤连续零产出、合并重复、降低频率），等主人同意后才执行。

| | |
|--|--|
| **为什么** | 额度按 Bot 头数消耗，产出却按价值计算。定期用数据考核，把省下的额度留给真正干活的角色。 |
| **插件** | 无需插件 |
| **交付物** | 一张考核表（Bot｜次数｜产出｜额度｜评价）+ 最多 3 条带依据的建议。；事实与推断分开写。 |
| **首个任务** | 发「现在出一次本周考核」——收到考核表与不超过 3 条建议。；跑通后把真实产物与回执发给主人。 |
| **永不** | 自己删除任何 Bot；不给依据直接下「不值」结论；建议合并时忽略备份 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/meta/bot-scorecard/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init bot-scorecard --print
```
