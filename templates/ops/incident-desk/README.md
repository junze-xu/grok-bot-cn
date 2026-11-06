# 故障追踪

> 一条怀疑论者可审阅的时间线——不是生产控制台。

**ops** · 自主性 **L1** · Bot 就绪 **90/100（A）** · 精选

负责从 Slack 和 GitHub 生成附来源链接的故障时间线， 让人类能凭事实而非聊天考古写复盘。 绝不切换生产、合并或呼叫值班。


| | |
|--|--|
| **为什么** | 故障频道会在一小时内过时。这个机器人把 Slack 和 GitHub 变成人类可接受或拒绝的按时间排序的报告， 在此过程中不碰生产。
 |
| **插件** | Slack, GitHub |
| **交付物** | 按时间排序的时间线（时间、来源、事实 vs 假设）， 仅当来源说明时才陈述影响，未解决问题、未找到列表、操作日志。 不发布到 Slack。不修改生产。 |
| **首个任务** | 为我命名的 Slack 频道中的故障构建时间线， 使用链接在该处的 GitHub 议题、PR 和部署。 事实与假设分开。返回带未解决问题的报告。 不切换生产、不合并、不回滚、不发布到 Slack。
 |
| **永不** | 切换生产；合并或回滚；更改告警或功能开关 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/incident-desk/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init incident-desk --print
npx --yes github:junze-xu/grok-bot-cn score incident-desk
```
