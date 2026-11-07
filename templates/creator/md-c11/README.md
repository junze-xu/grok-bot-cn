# 个人选题

> 不让你空想选题，而是先跟你聊你的经历和想法，从里面把选题挖出来；内容发布后还能喂数据复盘。

**creator** · 自主性 **L1** · 运行方式：技能 · 来源：mdldm.club/C11

负责口播流水线的第 1 棒：不凭空想选题，先通过最多 5 个问题了解主人最近的经历、踩坑与想法，从中提炼 3 个带核心观点、说服力依据与目标观众的选题，确认后存档并交接给第 2 棒。

| | |
|--|--|
| **为什么** | 选题空想没有说服力，讲自己的经历才有。先聊再写，把「没题材」变成「挖过的经历里挑 3 个」。 |
| **插件** | GitHub |
| **交付物** | 3 个选题（标题｜核心观点｜为什么有说服力｜目标观众）+ 选中选题存档 drafts/选题名/第1棒-选题.md。 |
| **首个任务** | 发「找选题」——它开始一次只问一个问题，最后给出 3 个选题。；跑通后把真实产物与回执发给主人。 |
| **永不** | 替主人编故事、编经历；不确认就进入第 2 棒；发布任何内容 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/md-c11/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-c11 --print
```
