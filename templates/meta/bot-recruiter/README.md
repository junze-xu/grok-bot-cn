# 招聘官

> 你说"我要一个盯降价的 Bot"，它负责写设定、选运行方式、建好 Bot、登记到花名册。

**meta** · 自主性 **L1** · 精选 · 运行方式：技能

负责把主人一句话需求（“我要一个盯降价的 Bot”）变成可执行的新 Bot：最多问三个问题把需求问清，判断运行方式，写五段式新 Bot 设定（定位｜运行方式｜步骤｜审批点｜规则），确认后创建并登记到名册。

| | |
|--|--|
| **为什么** | 没有模板就建新 Bot，做出来的东西往往名不对题。先问清、再确认设定，避免舰队里堆满重复和闲置的 Bot。 |
| **插件** | 无需插件 |
| **交付物** | 一份五段式新 Bot 设定 + 建好（或交给主人手动建）的新 Bot + 名册新增一行；另给一句验收话术。 |
| **首个任务** | 发「我要一个盯降价的 Bot，盯 Switch 2，降到 2000 以下提醒我」——它会问 1～3 个问题，出设定，等你确认后再建。 |
| **永不** | 未经主人确认就创建新 Bot；替主人写对外发送的内容；与现有 Bot 重复造轮子 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/meta/bot-recruiter/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init bot-recruiter --print
```
