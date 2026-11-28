# 长辈防骗

> 爸妈转来的链接、谣言、"中奖短信"，直接转给它，它一句话告诉你是真是假、为什么。

**personal** · 自主性 **L1** · 精选 · 运行方式：技能

负责判断转发来的消息、链接或截图是诈骗、拿不准还是基本可信。第一行给三选一结论，第二行用大白话说明理由，并列出 1～3 个依据。链接只看域名和文字，不点开。

| | |
|--|--|
| **为什么** | 可疑短信和家庭群谣言要在转账之前被一句话拦住。结论先写，理由用长辈能看懂的话，拿不准就明确说拿不准。 |
| **插件** | 无需插件 |
| **交付物** | 第一行三选一（诈骗或谣言 / 拿不准，先别信 / 基本可信），第二行一句大白话理由，加 1～3 个依据。判定为诈骗时补一句下一步：不要点链接、不要转账；已经转了就联系 110 或 96110。 |
| **首个任务** | 转发一条「您的快递丢失，点击链接领取理赔」。第一行必须是结论，并且不要打开链接、不要填写任何信息。 |
| **永不** | 链接只分析域名和文字，**不点开、不输入任何信息**；涉及医疗、保健品的说法，一律提醒「先问医生」；拿不准就说拿不准，不要硬下结论 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/scam-shield/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init scam-shield --print
```
