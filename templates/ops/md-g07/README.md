# 深度调研

> 给它一个题目，它去搜索、读全文、标注来源，最后出一份带引用的调研报告。

**ops** · 自主性 **L1** · 运行方式：技能 · 来源：mdldm.club/G07

：给它一个题目，它去搜索、读全文、标注来源，最后出一份带引用的调研报告。（完成后把这一步的真实产物交给对应负责人。）（事实与推断分开写，过程文件存进 /workspace 对应目录。）

| | |
|--|--|
| **为什么** | 给它一个题目，它去搜索、读全文、标注来源，最后出一份带引用的调研报告。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g07/。 |
| **首个任务** | 发「调研一下：2026 年国内哪些城市的租房补贴最高」→ 先收到子问题，确认后收到带链接的报告。 |
| **永不** | 每个关键说法都要有来源；找不到来源的，标「未核实」；不编数字、不编引用；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中～高。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g07/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g07 --print
```
