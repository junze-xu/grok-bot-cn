# 网页剪藏

> 配合浏览器的 Clipper 插件，网页选区或截图一键发给 Bot 入库。

**creator** · 自主性 **L1** · 运行方式：技能

：配合浏览器的 Clipper 插件，网页选区或截图一键发给 Bot 入库。每次收到任务：识别内容：是什么、来自哪个网页；存到 clips/日期-标题.md：来源链接｜剪藏时间｜原文（截图的话写识别出来的文字）｜一句话总结｜自动打 3 个标签；回复：「已存：标题」。

| | |
|--|--|
| **为什么** | 配合浏览器的 Clipper 插件，网页选区或截图一键发给 Bot 入库。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/web-clipper/。 |
| **首个任务** | 发一句「配合浏览器的 Clipper 插件，网页选区或截图一键发给 Bot 入库。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 发送、发布或回复任何人；支付、购买或提交订单；删除既有文件（除非主人确认） |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/web-clipper/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init web-clipper --print
```
