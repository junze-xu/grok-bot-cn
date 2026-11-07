# 设计卡片

> 用 Connect Apps 接上 Figma、Canva、Notion，直接在聊天里的实时卡片上改图。

**marketing** · 自主性 **L1** · 运行方式：技能

：用 Connect Apps 接上 Figma、Canva、Notion，直接在聊天里的实时卡片上改图。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 用 Connect Apps 接上 Figma、Canva、Notion，直接在聊天里的实时卡片上改图。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-s06/。 |
| **首个任务** | 发「把我 Canva 里的海报标题改成'周六见'」→ 卡片上的标题变了，原文件没动。 |
| **永不** | 改之前先复制一份副本，在副本上改，不动原文件；不删除任何设计文件；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/md-s06/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-s06 --print
```
