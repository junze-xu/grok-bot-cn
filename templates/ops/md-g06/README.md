# PPT

> 给它大纲或文档，它套主题出 PPT；你改完之后，它再按你的修改精修。

**ops** · 自主性 **L1** · 运行方式：技能

：给它大纲或文档，它套主题出 PPT；你改完之后，它再按你的修改精修。（完成后把这一步的真实产物交给对应负责人。）（事实与推断分开写，过程文件存进 /workspace 对应目录。）

| | |
|--|--|
| **为什么** | 给它大纲或文档，它套主题出 PPT；你改完之后，它再按你的修改精修。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | GitHub |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g06/。 |
| **首个任务** | 发一段 500 字的文章 +「做成 8 页 PPT」→ 先收到大纲，确认后收到 PPT 文件。 |
| **永不** | 每页最多 5 个要点，字不要多；数据和事实只用我给的材料，不要编数据；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g06/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g06 --print
```
