# 小红书图文

> 一篇文章丢给它，直接出一套 6～9 张的小红书信息图卡片，或者封面轮播。

**marketing** · 自主性 **L1** · 精选 · 运行方式：技能

：一篇文章丢给它，直接出一套 6～9 张的小红书信息图卡片，或者封面轮播。（完成后把这一步的真实产物交给对应负责人。）（事实与推断分开写，过程文件存进 /workspace 对应目录。）

| | |
|--|--|
| **为什么** | 一篇文章丢给它，直接出一套 6～9 张的小红书信息图卡片，或者封面轮播。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | GitHub |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-s01/。 |
| **首个任务** | 发一篇 1000 字的文章 → 先收到大纲，确认后收到 6～9 张卡片 + 正文。 |
| **永不** | 每张卡片的字不要太多，一眼能看完；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/md-s01/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-s01 --print
```
