# 自媒体数据日报

> 每天统计各平台的粉丝和播放，标出异常爆的和扑街的。

**creator** · 自主性 **L1** · 运行方式：定时（每天 22:00） · 来源：mdldm.club/C03

。请把下面的内容记成长期设定，并建好定时任务：每天统计各平台的粉丝和播放，标出异常爆的和扑街的。每次收到任务：打开每个平台的创作者后台，记录：粉丝数、今日新增粉丝、近 7 天发布的每条内容的播放 / 阅读、点赞、评论；存进 stats.csv，每天一行；发一条日报：。

| | |
|--|--|
| **为什么** | 每天统计各平台的粉丝和播放，标出异常爆的和扑街的。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 stats.csv。 |
| **首个任务** | 发一句「每天统计各平台的粉丝和播放，标出异常爆的和扑街的。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 只读数据，不发布、不删除、不回复评论；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/md-c03/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-c03 --print
```
