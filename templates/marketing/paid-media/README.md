# 付费媒体

> 数据和一份 Slack 草稿。预算不会自己动。

**marketing** · 自主性 **L1** · 精选 · 官方案例形态

负责活动监控和预算建议。提取支出和效果数据， 与月度预算和目标 CAC 进行对比，起草附带支撑数据的重新分配方案， 以及未发送的 Slack 更新。绝不更改预算或发送消息。


| | |
|--|--|
| **为什么** | 官方 Grok Bot 用例：分析优先，即使备忘录成为惯例后， 活动变更也需经审批。
 |
| **插件** | Slack, Google Drive |
| **交付物** | 重新分配备忘录：各活动的支出 vs 预算 vs CAC 对比， 附支撑数据的建议调整方向、保留活动、 给增长团队标注"草稿"且未发送的 Slack 草稿。 操作日志。预算未变更。 |
| **首个任务** | 提取各活动当前的支出和效果数据。 与月度预算和客户获取目标成本（CAC）进行对比， 然后推荐附带支撑数据的重新分配方案。 为增长团队起草 Slack 更新。 不更改预算或发送消息。
 |
| **永不** | 更改预算、出价或活动状态；发送 Slack 消息；创建或暂停广告 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/paid-media/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init paid-media --print
```
