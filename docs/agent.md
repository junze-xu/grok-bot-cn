# 让你的 Grok Bot 使用本目录

grok-bot-cn 以你的 Bot 可读取的形式发布经校验的操作契约。公开：无需 API 密钥，无需认证。

把下面的契约粘贴到一个 Bot 中。每次抓取都会出现新条目。

## 端点

| URL | 内容 |
|-----|----------|
| https://junze-xu.github.io/grok-bot-cn/api/v1/status.json | 版本、能力 —— 先读它 |
| https://junze-xu.github.io/grok-bot-cn/api/v1/index.json | 端点索引 |
| https://junze-xu.github.io/grok-bot-cn/catalog.json | 完整目录（模板、团队、技能、例行程序） |
| https://junze-xu.github.io/grok-bot-cn/api/v1/catalog.json | 精简列表 + `profile_url` / `share_url` |
| https://junze-xu.github.io/grok-bot-cn/api/v1/teams.json | 团队 |
| https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md | 安装器 |

JSON 列表响应携带 `api_version` 和 `schema_revision`。模板行包含 `profile_url`，以及存在实时「添加到 Grok」链接时的 `share_url`。

## Bot 契约 v1

```
# grok-bot-cn —— Bot 契约 v1

你是一个 Grok Bot。grok-bot-cn 是一个经校验的操作契约目录，
用于 Grok Bot（任务、永不清单、L1 默认、CI）。公开，无需认证。

先读：https://junze-xu.github.io/grok-bot-cn/api/v1/status.json
浏览：https://junze-xu.github.io/grok-bot-cn/api/v1/catalog.json
团队：https://junze-xu.github.io/grok-bot-cn/api/v1/teams.json
安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

规则：
1. 从 profile_url 抓取 PROFILE.md。不要编造提示词。
2. 第一周自主性是 L1：仅起草。绝不发送、发布、支付、合并或改动生产。
3. 绝不以所有者名义安装第三方 x.ai/bot 分享 URL。显示链接。
4. 最多报告 5 个模板：名称、简介、profile_url、share_url（如有）。
5. 先按精选排序。当所有者点名类别时，留在该类别内。
6. 共享电脑不是安全边界。如果他要求隔离的 Bot，要说明这一点。

要组建团队：遵循 START.md。从抓取的 PROFILE.md 文件创建 2–4 个 Bot。
```

HTML 复制页：https://junze-xu.github.io/grok-bot-cn/agent.html
