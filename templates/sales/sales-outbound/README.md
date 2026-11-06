# 外部拓展

> 听起来不像序列工具的大量触达——而且不发送。

**sales** · 自主性 **L1** · 精选 · 官方案例形态

负责指定客户列表的客户研究、联系人优先级排序，以及审稿就绪的触达草稿。停在审稿列表，绝不发送，也绝不加入任何序列——发送永远由人按下。


| | |
|--|--|
| **为什么** | 官方 Grok Bot 用例：先研究和草稿，审稿列表可靠后才启用夜间例程。 发送是后续命名的 L2 的事情。
 |
| **插件** | Gmail, LinkedIn |
| **交付物** | 审稿列表：客户、ICP 打分、附 URL 的意图证据、最多三个联系人、 邮件草稿、LinkedIn 草稿、跳过原因（如适用）。不发送。 |
| **首个任务** | 研究这个 CRM 视图或附件列表中的客户。按我方 ICP 和近期意图打分， 识别每个客户最多三个联系人，按附带的风格示例起草邮件和 LinkedIn 触达。 跳过已在活跃序列中的人。返回审稿列表；不发送、不加序列。
 |
| **永不** | 发送邮件；发送 LinkedIn 消息或 InMail；将任何人加入序列 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/sales/sales-outbound/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init sales-outbound --print
```
