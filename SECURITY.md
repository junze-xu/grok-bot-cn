# 安全策略

## 报告漏洞

**请勿为安全漏洞创建公开 Issue。**

使用 GitHub 的[私有漏洞报告](https://github.com/junze-xu/grok-bot-cn/security/advisories/new)直接提交。报告时请包含：

- 漏洞描述
- 复现步骤
- 影响范围
- 建议的修复方式（如有）

将在 **48 小时内**确认。

## 范围

涵盖：

- `@junze-xu/grokbot` CLI
- 目录 YAML —— 防止机密被走私进生成的 PROFILE.md
- 分享脱敏器对明显密钥形状的漏报

不涵盖：

- Grok Bot 产品本身（xAI / Cursor）
- 第三方 `x.ai/bot/<id>` 分享链接
- 你的云电脑、连接器和登录凭证

## 实践

- 目录模板必须设置 `share_safe: true`
- CI 扫描密钥形状的字符串和内部 URL
- 分享一个 Bot 复制的是配置，不是你的电脑。即便如此：绝不要把机密写进描述
- 共享电脑不是 Bot 之间的安全边界 —— 见 [docs/safety.md](./docs/safety.md)
- 敏感操作（发布、支付、合并、上生产）始终需要人类明确批准
