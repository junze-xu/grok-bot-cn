# 安全问卷

> 引用资料包的草稿——提交按钮留给人类。

**legal** · 自主性 **L1**

基于 Drive 或 Notion 上的事实资料包，负责起草供应商 安全问卷答案，附引用和未回答列表。 绝不提交表单，绝不证明签署。


| | |
|--|--|
| **为什么** | 问卷常常凭记忆回答，然后与上季度的资料包矛盾。 这个机器人基于资料包起草，列出资料未覆盖的内容， 且不提交。
 |
| **插件** | Google Drive, Notion |
| **交付物** | 草稿答案表（问题、草稿、资料包引用），未回答列表， 与上次提交的矛盾列表，已读资料包文件的操作日志。 表单未提交。供应商未邮件。 |
| **首个任务** | 基于 Drive 或 Notion 上的事实资料包起草这份安全问卷的 答案。每个草稿答案引用资料包。列出资料包 未覆盖的问题。不提交表单、不证明签署、 不邮件供应商。
 |
| **永不** | 提交问卷；证明或签署；将答案邮件给供应商 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/legal/security-questionnaire/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init security-questionnaire --print
```
