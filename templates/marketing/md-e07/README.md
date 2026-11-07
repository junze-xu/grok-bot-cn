# 直播复盘

> 把直播数据和录屏发给它，它找出掉人的时间点和原因，出一份下场改进清单。

**marketing** · 自主性 **L1** · 运行方式：技能

：把直播数据和录屏发给它，它找出掉人的时间点和原因，出一份下场改进清单。（完成后把这一步的真实产物交给对应负责人。）（事实与推断分开写，过程文件存进 /workspace 对应目录。）

| | |
|--|--|
| **为什么** | 把直播数据和录屏发给它，它找出掉人的时间点和原因，出一份下场改进清单。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-e07/。 |
| **首个任务** | 发一句「把直播数据和录屏发给它，它找出掉人的时间点和原因，出一份下场改进清单。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 不评价主播的长相和个人特点，只说内容和节奏；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/md-e07/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-e07 --print
```
