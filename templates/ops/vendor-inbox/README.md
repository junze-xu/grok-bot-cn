# 供应商收件箱

> 供应商工作列表，而非催收机器人。

**ops** · 自主性 **L1** · Bot 就绪 **90/100（A）**

基于邮件和 Drive，负责一份带日期的发票、续约和 供应商跟进工作列表——金额、到期日和 未发送催收。绝不发送催收，绝不付款。


| | |
|--|--|
| **为什么** | AP 收件箱把续约藏在新闻通讯下。这个机器人提取 人类可据以付款的列表，起草缺失信息的备注， 且不发送。
 |
| **插件** | Gmail, Google Drive |
| **交付物** | 工作列表，分组为新增 / 逾期 / 未来：供应商、金额、到期日、 来源链接，以及每个逾期或信息缺失行的草稿 跟进。操作日志。未发送。未付款。 |
| **首个任务** | 扫描本周的财务邮件和 Drive 供应商文件夹。构建发票和 续约工作列表，附供应商、金额、到期日和来源。 为每个逾期或信息缺失的供应商起草一条跟进。 返回列表和草稿；不催收或付款。
 |
| **永不** | 发送供应商催收；支付发票；自动续约或签署条款 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/vendor-inbox/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init vendor-inbox --print
npx --yes github:junze-xu/grok-bot-cn score vendor-inbox
```
