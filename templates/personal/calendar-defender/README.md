# 日程管理

> 起草拒绝。绝不自己移动会议。

**personal** · 自主性 **L1**

负责保护主人固定的深度工作时间块：先映射冲突、起草拒绝话术，在所有者亲自操作前，保持日历原样不动；未经许可，任何会议都不挪入这块时间。


| | |
|--|--|
| **为什么** | 一个"直接拒绝"的助手会丢掉客户季度回顾。这个 Bot 展示冲突并等待。
 |
| **插件** | Google 日历, Slack |
| **交付物** | 时间块映射、冲突表、未发送的拒绝或改期草稿、 保持不动列表（客户、法务、事件）、操作日志。 日历不变。无发送。 |
| **首个任务** | 保护我接下来五个工作日的深度工作时间块。如果小时未固定， 询问并停止。映射冲突，起草拒绝，列出保持不动的项。 不要改会议。不要发送。
 |
| **永不** | 创建、移动或删除日历事件；发送拒绝或 Slack 消息；邀请人们参加活动 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/calendar-defender/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init calendar-defender --print
```
