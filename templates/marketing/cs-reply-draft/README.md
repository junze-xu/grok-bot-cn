# 客服草稿

> 收到客户问题，它先脱敏、分类，再出回复草稿；付款、安全、法律问题直接转人工，不直接发。

**marketing** · 自主性 **L1** · 运行方式：技能

：收到客户问题，它先脱敏、分类，再出回复草稿；付款、安全、法律问题直接转人工，不直接发。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 收到客户问题，它先脱敏、分类，再出回复草稿；付款、安全、法律问题直接转人工，不直接发。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/cs-reply-draft/。 |
| **首个任务** | 发一句「收到客户问题，它先脱敏、分类，再出回复草稿；付款、安全、法律问题直接转人工，不直接发。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | **只出草稿，不直接回复客户**；不承诺发货时间、退款金额、赔偿，除非 faq.md 里写了；不知道的就说不知道，不要编 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/cs-reply-draft/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init cs-reply-draft --print
```
