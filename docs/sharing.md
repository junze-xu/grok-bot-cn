# 分享一个 Bot

官方流程（[Bot](https://docs.x.ai/grok-bot/bots#share-a-bot)）：

1. 打开 Bot，复制它的分享链接（`https://x.ai/bot/<id>`）
2. 接收者在 x.ai 上打开预览，选择 **添加到 Grok Bot**
3. 他们需要 Grok Bot 应用来完成添加

该链接是公开的。添加它会在对方账户上创建一个**副本**。它不会把你的电脑、登录或历史交给他们。

## 复制链接之前

运行 [Share Sanitizer](../templates/meta/sanitizer/)，或手动做同样的审查：

- API 密钥和令牌
- 客户姓名和邮箱
- 内部主机名和暂存 URL
- 测试密码
- 任何你不愿放进公开文档的内容

保留任务、永不清单、首个任务和无数据策略。它们才是重点。

## 本目录 vs 分享链接

| | 本仓库 | `x.ai/bot/<id>` |
|--|--|--|
| 你得到 | PROFILE.md + YAML | 实时配置副本 |
| 可在 git 中审查 | 是 | 否 |
| 技能／例行程序 | 有文档；你来保存 | 若作者包含则被复制 |
| 信任 | 你读了契约 | 你仍必须读预览 —— 适用第三方条款 |

绝不要求安装器 Bot 以主人的名义添加随机分享 URL。显示它。让他们点击。

## 公开分享链接目录

[grokbot.dev](https://grokbot.dev) 索引人们在 X 上发布的分享 URL。有助于发现。不是规格。此处不做校验。

## 本目录的分享 URL

`template.yaml` 上可选的 `share_url`，或 `catalog/share-links.json` 中的映射。当 URL 存在时，Pages 会显示 **添加到 Grok**。

从干净账户发布：[publish-share-links.md](./publish-share-links.md)。
