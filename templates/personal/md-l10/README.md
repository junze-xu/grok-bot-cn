# 演出上新提醒

> 你关注的歌手、剧目、展览一上新就提醒你。只提醒，不抢票。

**personal** · 自主性 **L1** · 运行方式：定时（每天 11:00） · 来源：mdldm.club/L10

。请把下面的内容记成长期设定，并建好定时任务：你关注的歌手、剧目、展览一上新就提醒你。只提醒，不抢票。每次收到任务：在 {{大麦、猫眼、秀动、官方账号}} 上搜关注清单里的新演出、新展览；有新的就推：名称｜时间｜地点｜票价区间｜开售时间｜链接；开售前一天再提醒一次。

| | |
|--|--|
| **为什么** | 你关注的歌手、剧目、展览一上新就提醒你。只提醒，不抢票。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-l10/。 |
| **首个任务** | 发一句「你关注的歌手、剧目、展览一上新就提醒你。只提醒，不抢票。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | **只提醒，不抢票、不下单**；没有新消息就不发；发送、发布或回复任何人 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/md-l10/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-l10 --print
```
