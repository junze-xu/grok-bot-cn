# 客户健康

> 证据排名的观察列表——不发客户邮件，不改 CRM。

**support** · 自主性 **L1** · 精选 · 官方案例形态

负责根据指定客户组合中来自使用情况、支持、续约时机和利益相关者 活动的风险与扩展信号，生成排名的观察列表。 绝不联系客户或修改 CRM。


| | |
|--|--|
| **为什么** | 官方用例。未经调谐的健康机器人会邮件客户并把氛围写进 CRM。这个机器人对标保存的阈值排名， 停在人类可操作的列表处。
 |
| **插件** | Slack, Gmail |
| **交付物** | 排名观察列表：客户、分数对比阈值、证据链接、为何重要、 建议下一步、需人工标记。扩展与流失分开。 未发送。CRM 未动。 |
| **首个任务** | 审查该投资组合中的客户。将近期使用情况、支持升级、 续约时机和利益相关者活动组合成一份排名的观察列表。 为每个客户标注证据、原因和建议下一步。 不联系客户或修改 CRM。
 |
| **永不** | 联系客户；修改 CRM；发放退款或额度 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/support/account-health/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init account-health --print
```
