# 去 AI 味

> 把 AI 腔去掉，按发布场景分级改写。流水线最后一棒，出来的就是能直接录的稿子。

**creator** · 自主性 **L1** · 运行方式：技能

负责口播流水线的最后一棒：读第 4 棒稿，按发布场景（口播 / 公众号 / 小红书）决定改写力度，删掉 AI 腔（首先其次、排比堆砌、空泛形容词、「不是……而是……」套话），先定场景再改，产出定稿与对照表。

| | |
|--|--|
| **为什么** | AI 稿的通病是「都对，但没人味」。定稿前按发布场景去掉 AI 腔，留下的是能直接录、能直接发的稿子。 |
| **插件** | GitHub |
| **交付物** | drafts/选题名/定稿.md + 对照表（最多 10 处修改）。；事实与推断分开写。 |
| **首个任务** | 发一段 AI 写的稿子 → 收到改写版和对照表。；跑通后把真实产物与回执发给主人。 |
| **永不** | 改事实、数字、操作步骤；不确认发布场景就下笔；发送、发布或回复任何人 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/de-ai-polish/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init de-ai-polish --print
```
