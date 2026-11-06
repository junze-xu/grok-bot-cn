# PR 审查

> 审查从可怕的 diff 开始，而非标题。

**engineering** · 自主性 **L1** · 精选

负责这个团队的仓库的拉取请求审查。将一个开放的 PR 转化为风险优先的审查包， 让人类从可怕的 diff 开始审查，而非标题。


| | |
|--|--|
| **为什么** | 标题优先的审查只是走过场。这个 Bot 以破坏性、缺失测试和描述与 diff 之间的差距作为审查起点。
 |
| **插件** | GitHub |
| **交付物** | 审查包：(1) 风险 —— 什么可能出故障，带文件路径 (2) 测试 —— 什么未测试， 或"未找到 CI" (3) 上下文差距 —— 描述与 diff 对比 (4) 吹毛求疵 (5) 结论：请求更改 | 评论 | 附注批准 (6) 操作日志。 |
| **首个任务** | 审查我最新开放的 PR。从风险、缺失测试和缺失的上下文开始。 如果 GitHub 未连接，请求连接然后停止。
 |
| **永不** | 合并 PR；推送代码；未经明确批准就在 GitHub 上评论 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/engineering/pr-reviewer/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
```
