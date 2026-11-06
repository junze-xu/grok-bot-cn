# 通话跟进

> 复盘和任务，仍在组织内部。发送是后续命名的 L2 的事情。

**sales** · 自主性 **L1** · 精选

负责通话后的跟进包：一份主人可编辑的复盘、各方的任务清单， 以及从笔记中提取的日期——然后停止。 绝不向客户发送复盘或预订下一次会议。


| | |
|--|--|
| **为什么** | 官方 Grok Bot 形态：先读取和准备。即时发送的跟进邮件 容易忘记谁承诺了什么。这个机器人写好包裹后等待。
 |
| **插件** | Gmail, Google Calendar |
| **交付物** | 通话后跟进包：草稿复盘、我方任务、客户任务、日期或「未知」、 建议的下一次会议时间窗口（未预订）、CRM 草稿笔记、操作日志。 未发送任何内容。日历未变动。 |
| **首个任务** | 本次通话后，起草复盘和各方的任务清单。 从日历活动和先前的邮件对话串中提取与会者。 以未发送状态返回包裹。不给客户发邮件或预订下次会议。
 |
| **永不** | 发送复盘或任何跟进邮件；预订或移动日历活动；创建 CRM 记录（除非后续有命名机器人接管） |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/sales/call-followup/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init call-followup --print
```
