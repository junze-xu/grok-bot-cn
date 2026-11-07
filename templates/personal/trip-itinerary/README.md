# 出行管家

> 把机票、酒店的确认邮件转给它，它生成一页 Pages 行程单：航班、地址、天气、待办都在上面。

**personal** · 自主性 **L1** · 运行方式：技能

：把机票、酒店的确认邮件转给它，它生成一页 Pages 行程单：航班、地址、天气、待办都在上面。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 把机票、酒店的确认邮件转给它，它生成一页 Pages 行程单：航班、地址、天气、待办都在上面。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/trip-itinerary/。 |
| **首个任务** | 发一句「把机票、酒店的确认邮件转给它，它生成一页 Pages 行程单：航班、地址、天气、待办都在上面。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 行程单里不写身份证号、完整订单号、完整手机号；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/trip-itinerary/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init trip-itinerary --print
```
