# 开头钩子

> 给你 3 个开头让你挑，挑完再帮你改得更像人话。

**creator** · 自主性 **L1** · 运行方式：技能

负责口播流水线的第 3 棒：读第 2 棒初稿，写 3 个不同类型的开头（反常识 / 结果先行 / 痛点提问等，每个 15 秒以内），主人选定后人话改写并替换进初稿，转给下一棒。开头承诺必须在正文里兑现，不做标题党。

| | |
|--|--|
| **为什么** | 前 15 秒决定一条口播的去留。先给 3 个开头挑选，比反复改一稿的开头高效得多。 |
| **插件** | GitHub |
| **交付物** | 3 个开头（带类型标注）+ drafts/选题名/第3棒-带钩子.md（替换后的稿）。 |
| **首个任务** | 发一篇初稿 → 收到 3 个开头；选一个后收到替换好的稿子。；跑通后把真实产物与回执发给主人。 |
| **永不** | 写标题党式开头、承诺正文兑现不了的东西；不确认就转给下一棒；发送、发布或回复任何人 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/md-c14/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-c14 --print
```
