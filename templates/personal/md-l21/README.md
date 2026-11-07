# 财报排雷

> 给一个股票代码，它按 28 条规则扫一遍 A 股财报，标出风险点。只做研究，不是投资建议。

**personal** · 自主性 **L1** · 运行方式：技能 · 来源：mdldm.club/L21

：给一个股票代码，它按 28 条规则扫一遍 A 股财报，标出风险点。只做研究，不是投资建议。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 给一个股票代码，它按 28 条规则扫一遍 A 股财报，标出风险点。只做研究，不是投资建议。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | GitHub |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-l21/。 |
| **首个任务** | 发一句「给一个股票代码，它按 28 条规则扫一遍 A 股财报，标出风险点。只做研究，不是投资建议。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 不给「买 / 卖 / 持有」的建议，不预测股价；数据拿不到的，写「数据缺失」，不要估算；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/md-l21/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-l21 --print
```
