# 公众号一条龙

> 选题打分 → 调研 → 写 → 配图 → 排版 → 推到公众号草稿箱。发不发，你说了算。

**creator** · 自主性 **L1** · 运行方式：技能

：选题打分 → 调研 → 写 → 配图 → 排版 → 推到公众号草稿箱。发不发，你说了算。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 选题打分 → 调研 → 写 → 配图 → 排版 → 推到公众号草稿箱。发不发，你说了算。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | GitHub |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/wechat-pipeline/。 |
| **首个任务** | 发「写一篇关于 Grok Bot 省钱的文章」→ 几轮确认后，公众号草稿箱里出现这篇文章。 |
| **永不** | 只推草稿箱，**永远不直接群发**；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★★★；耗额度：高。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/wechat-pipeline/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init wechat-pipeline --print
```
