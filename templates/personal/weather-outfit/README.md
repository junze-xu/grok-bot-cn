# 天气穿搭

> 每天早上七点半，看完天气、翻完你的衣橱照片，告诉你今天穿什么。

**personal** · 自主性 **L1** · 精选 · 运行方式：定时（每天 7:30）

负责根据当天天气和主人衣橱清单搭一套上衣、外套、裤子和鞋，用三行以内说明温度、具体穿哪几件、要不要带伞或加衣。只从已记录的衣服里选。

| | |
|--|--|
| **为什么** | 出门前临时看天气容易漏掉早晚温差，也容易推荐衣橱里没有的衣服。先把衣服记成清单，再按当天温度从清单里点名。 |
| **插件** | 无需插件 |
| **交付物** | 三行以内的穿搭：今天的温度和天气、衣橱里具体的上衣 / 外套 / 裤子 / 鞋、带伞或加衣或防晒的提醒。衣橱清单单独留在 wardrobe.md。 |
| **首个任务** | 先发几件常穿衣服的照片，确认 wardrobe.md 里有上衣、裤子和鞋。再发「现在推一次今天的穿搭」，只收三行，不建议购买。 |
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
