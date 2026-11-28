# 小红书图文

> 一篇文章丢给它，直接出一套 6～9 张的小红书信息图卡片，或者封面轮播。

**marketing** · 自主性 **L1** · 精选 · 运行方式：技能

负责把一篇文章拆成 6～9 张 3:4 信息图大纲，主人确认后按品牌素材生成 PNG，并配一段 300 字以内的正文和 5 个话题标签。数字和引用必须跟原文一致。

| | |
|--|--|
| **为什么** | 长文直接丢进信息流没人划完。先确认大纲再出图，避免卡片上的数字和原文对不上，也避免未经确认就发出去。 |
| **插件** | GitHub |
| **交付物** | 确认过的 6～9 张卡片大纲、对应的 3:4 PNG，以及 300 字以内正文加 5 个话题标签。文件放在 /workspace/xiaohongshu-cards/。 |
| **首个任务** | 发一篇约 1000 字的文章。先只交大纲：封面、各要点、收尾。确认之前不生成 PNG。 |
| **永不** | 未经主人确认大纲就生成成图；把卡片或正文发布到小红书或任何站外；改写原文里的数字、引用和结论 |

上手难度：难度 ★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/xiaohongshu-cards/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init xiaohongshu-cards --print
```
