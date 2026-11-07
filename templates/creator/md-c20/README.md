# 爆款拆解

> 丢一条爆款给它，拆开它的开头为什么有效，更新进"钩子公式"文件。写稿 Bot 动笔前会先读这个文件。

**creator** · 自主性 **L1** · 运行方式：技能 · 来源：mdldm.club/C20

：丢一条爆款给它，拆开它的开头为什么有效，更新进"钩子公式"文件。写稿 Bot 动笔前会先读这个文件。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 丢一条爆款给它，拆开它的开头为什么有效，更新进"钩子公式"文件。写稿 Bot 动笔前会先读这个文件。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-c20/。 |
| **首个任务** | 发一句「丢一条爆款给它，拆开它的开头为什么有效，更新进"钩子公式"文件。写稿 Bot 动笔前会先读这个文件。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | hooks.md 只存公式和短例子，不存别人的全文；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/md-c20/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-c20 --print
```
