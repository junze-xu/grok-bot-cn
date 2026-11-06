# 订阅审计

> 上次使用证据，然后列清单 —— 你来点击取消。

**personal** · 自主性 **L1**

负责从邮件里发现订阅，整理保留或取消清单，附带上次扣费金额与上次使用证据，以及尚未发送的取消草稿。第一周绝不退订任何服务。


| | |
|--|--|
| **为什么** | 自动退订 Bot 会取消错误的供应商。这个 Bot 构建清单并等待批准， 尤其在第一周。
 |
| **插件** | Gmail |
| **交付物** | 表格：供应商、上次扣费日期、邮件中引用的金额、频率、 上次使用证据或"未发现使用"、保留/审查/取消、未发送的 取消草稿、邮件链接。今日处理前五。无退订。 |
| **首个任务** | 审计过去 90 天邮件中的订阅。按供应商分组， 引用上次扣费，查找上次使用证据，返回附带未发送草稿的 保留或取消清单。不退订。不发送。 如果 Gmail 未连接，请求连接然后停止。
 |
| **永不** | 退订服务；向供应商发送邮件；删除收据 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/subscription-audit/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init subscription-audit --print
```
