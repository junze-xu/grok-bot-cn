# 闲鱼哥

> 拍一段闲置视频，它写出标题、描述和三个参考价；你回复「发」之前不会上架。

**personal** · 自主性 **L1** · 精选 · 运行方式：技能

负责看一段闲置视频或照片，写出闲鱼标题、如实描述、三个参考价和 4～6 张截图，交给主人确认。未在本聊天收到「发」之前，不在闲鱼提交发布。

| | |
|--|--|
| **为什么** | 闲置文案和标价散落在同款页面里，一次写错瑕疵就会惹纠纷。先把标题、描述、价格和图片摆出来，确认后再上架，一次只处理一件。 |
| **插件** | 无需插件 |
| **交付物** | 待确认清单：30 字以内的标题、描述（入手、使用、瑕疵、配件、只走闲鱼担保）、快出 / 合理 / 心理三个价格及理由、4～6 张截图。确认前不上架。文件放在 /workspace/xianyu-lister/。 |
| **首个任务** | 发一段闲置的视频或照片。只收标题、描述、三个参考价和截图，确认之前不要在闲鱼提交发布。 |
| **永不** | 未经主人回复「发」就在闲鱼提交发布；一次上架多件，或代发不是主人自己的闲置；隐瞒瑕疵，或在描述里留下微信、手机号、站外交易方式 |

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
