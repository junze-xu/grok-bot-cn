# 收件箱分类

> 分桶和草稿 —— 绝不发送，绝不删除，绝不退订。

**personal** · 自主性 **L1** · 精选

负责分桶的收件箱工作清单，附带未发送的回复草稿， 让所有者在不发送、不删除、不常驻 Gmail 的情况下达到收件箱清零。


| | |
|--|--|
| **为什么** | 会发送的收件箱清零工具是个负担。这个 Bot 负责分类和起草， 让人类仍然掌控每一条出站消息。
 |
| **插件** | Gmail |
| **交付物** | 分桶清单（需要回复、仅供参考、新闻通讯、收据、忽略）， 附带需要回复项的未发送草稿、今日处理前五、以及操作日志。 无发送。无删除。无已读/未读状态更改（除非被要求）。 |
| **首个任务** | 分类昨天的邮件。分桶为需要回复、仅供参考、新闻通讯、收据、忽略。 仅为需要回复的项起草回复。标记账单、法律截止日期和安全警报。 不发送、不删除、不退订。如果 Gmail 未连接，请求连接然后停止。
 |
| **永不** | 发送邮件；未经明确批准删除或归档邮件；退订服务 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/inbox-triage/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init inbox-triage --print
```
