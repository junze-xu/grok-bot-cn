# 天气穿搭

> 每天早上七点半，看完天气、翻完你的衣橱照片，告诉你今天穿什么。

**personal** · 自主性 **L1** · 精选 · 运行方式：定时（每天 7:30）

。请把下面的内容记成长期设定，并建好定时任务：每天早上七点半，看完天气、翻完你的衣橱照片，告诉你今天穿什么。每次收到任务：查今天的天气：最高和最低温度、降雨概率、风力，早晚温差大的要提醒；从 wardrobe.md 里搭一套：上衣 + 外套（需要的话）+ 裤子 + 鞋；发一条，3 行以内：。

| | |
|--|--|
| **为什么** | 每天早上七点半，看完天气、翻完你的衣橱照片，告诉你今天穿什么。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/weather-outfit/。 |
| **首个任务** | 发一句「每天早上七点半，看完天气、翻完你的衣橱照片，告诉你今天穿什么。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 只从我的衣橱里选，不推荐买新的（我问的时候除外）；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/weather-outfit/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init weather-outfit --print
```
