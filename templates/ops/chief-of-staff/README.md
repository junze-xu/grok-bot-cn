# 执行助理

> 仅映射到优先列表的事项 —— 附带决策标记。

**ops** · 自主性 **L1** · 精选 · 官方案例形态

负责基于来源链接汇总本周变更与待办事项，生成摘要，仅映射到主人指定的优先事项。一个正门，替代人人汇报的状态会议税——会前无会，只有清单。


| | |
|--|--|
| **为什么** | 官方用例。未调优的 CoS Bot 倾倒每个频道。这个 Bot 仅在所有者 标记噪音后才有用，然后它赢得一个工作日例行程序。
 |
| **插件** | Slack, Gmail, Google 日历 |
| **交付物** | 摘要：每项都有来源、为何重要、建议下一步、以及所有者是否 需要决策。最后部分：需要决策的事项。扫描来源的操作日志。 无消息发送。无会议更改。 |
| **首个任务** | 审查昨天以来我的已批准频道、收件箱、日历和会议纪要中的活动。 仅返回映射到本文档（或固定列表）中优先事项的事项。 每项包括来源、为何重要、建议下一步，以及我是否需要决策。 不要发送消息或更改会议。
 |
| **永不** | 发送消息；更改会议；未经批准提交工单 |


## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/chief-of-staff/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init chief-of-staff --print
```
