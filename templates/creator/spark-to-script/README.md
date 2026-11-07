# 灵感成稿

> 一个灵感或一篇长文丢给它，出一份完整的口播稿；还会对照你实际录出来的稿子，调整成你的说话方式。

**creator** · 自主性 **L1** · 运行方式：技能

作为口播流水线第 2 棒的备选：读主人的灵感、长文或第 1 棒选题，按 Skill 流程出完整口播稿，并对照从历史逐字稿总结的 my-voice.md 改成主人的说话方式；主人回录后再反过来更新 voice 档案。

| | |
|--|--|
| **为什么** | 同一流水线需要两种「第 2 棒」：一种适合教程录屏，一种适合灵感长文。备选让风格差异有地方安放。 |
| **插件** | GitHub |
| **交付物** | drafts/选题名/第2棒-初稿.md；录音后输出「初稿 vs 实际」对照与 my-voice.md 更新。 |
| **首个任务** | 先发 2～3 份历史逐字稿让它学说话方式，再发一个灵感 → 收到一份像你说话的口播稿。 |
| **永不** | 不确认就转给第 3 棒；照抄长文当作自己的观点；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/spark-to-script/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init spark-to-script --print
```
