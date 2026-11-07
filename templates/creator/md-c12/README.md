# 录屏教程编剧

> 选题定了，它出正文、口播台词，连分镜都给你排好。最适合工具介绍和录屏教程。

**creator** · 自主性 **L1** · 运行方式：技能

负责口播流水线的第 2 棒：读第 1 棒的选题，按 Skill 流程出稿——正文结构（开头→3～5 段→结尾）、口语化口播台词（一句一行）、每段分镜（【画面】要录什么 /【字幕】强调什么），存稿并停下等确认。

| | |
|--|--|
| **为什么** | 教程类内容的门槛不是观点，而是「怎么讲得像人话、怎么录」。结构化出稿把分镜和台词一次备齐，省去反复改结构的时间。 |
| **插件** | GitHub |
| **交付物** | drafts/选题名/第2棒-初稿.md：正文 + 台词 + 分镜；不确定的步骤标注【⚠️ 待确认】。 |
| **首个任务** | 手动发一个选题 → 收到带台词和分镜的初稿。；跑通后把真实产物与回执发给主人。（用你环境里的真实任务验收。） |
| **永不** | 编数据、编案例；不确认就转给第 3 棒；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/md-c12/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-c12 --print
```
