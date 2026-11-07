# 闲鱼哥

> 手机上给闲置拍一段视频发给它，它自己写标题、描述、参考同款定价，然后在电脑上发布到闲鱼。你最后看一眼就行。

**personal** · 自主性 **L1** · 精选 · 运行方式：技能

帮我卖自己的闲置：手机上给闲置拍一段视频发给它，它自己写标题、描述、参考同款定价，然后在电脑上发布到闲鱼。你最后看一眼就行。

| | |
|--|--|
| **为什么** | 手机上给闲置拍一段视频发给它，它自己写标题、描述、参考同款定价，然后在电脑上发布到闲鱼。你最后看一眼就行。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/xianyu-lister/。 |
| **首个任务** | 拍一个闲置的视频发给它 → 收到标题、描述、3 个价格和图片，确认后商品发布成功。 |
| **永不** | 只卖我自己的闲置，一次只发一件，不批量上架；瑕疵必须如实写，不美化；描述里不留微信、手机号，不引导到站外交易 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/xianyu-lister/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init xianyu-lister --print
```
