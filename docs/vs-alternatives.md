# 对比替代方案

Grok Bot 模板在分享链接上线那一周爆发。大多数目录优化的是**发现**。本仓库优化的是**可评分的契约**。

| | grok-bot-cn | awesome-grokbot | grokbot.dev | bots.new |
|--|--|--|--|--|
| 价值单元 | 操作契约 + 评分 | 复制粘贴 PROFILE.md | 公开分享 URL | 命名的角色卡片 |
| 机器 schema | 是（`template.yaml`） | 部分 frontmatter | API 封装 | 未说明 |
| 自主性级别 | L0–L3 | 隐含的「不发送」 | 因作者而异 | 不一 |
| CLI | `npx github:junze-xu/grok-bot-cn` | — | — | — |
| CI | schema、密钥、评分、漂移 | — | — | — |
| 团队即 DAG | `teams/*.yaml` + 启动词 | START.md 团队 | 部分智能体团队标签 | 包 |
| 技能／例行程序 | 一等公民：六字段／`test_first` | 提及 | `includes: schedule` 标记 | — |
| 与官方文档对齐 | 在 SPEC 和模式中引用 | 实用、非正式 | 市场 | 市场 |
| 安装器 | START.md | START.md | Bot 契约 | 添加到 Grok |
| 许可证 | MIT | CC0 | 站点条款 | 站点条款 |

当你想要**第一周 L1**、一份能经受新对话的永不清单，以及「有人发布没有任务的人设就失败」的 PR 时，使用本仓库。

当你想**试用今天别人发布的实时分享链接**时，使用 grokbot.dev。

当你想阅读另一个提示词时，使用 awesome-grokbot。不要把两个目录都粘贴进一个 Bot。

这些都不是 xAI 官方。官方案例在 [docs.x.ai/grok-bot/use-cases](https://docs.x.ai/grok-bot/use-cases)。
