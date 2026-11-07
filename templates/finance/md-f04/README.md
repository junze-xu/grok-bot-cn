# 订阅哨兵

> 扫邮箱里的账单，列出你所有的订阅和下次扣费日，提前 3 天问你还续不续。

**finance** · 自主性 **L1** · 运行方式：定时（每周一 9:00） · 来源：mdldm.club/F04

。请把下面的内容记成长期设定，并建好定时任务：扫邮箱里的账单，列出你所有的订阅和下次扣费日，提前 3 天问你还续不续。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 扫邮箱里的账单，列出你所有的订阅和下次扣费日，提前 3 天问你还续不续。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-f04/。 |
| **首个任务** | 发一句「扫邮箱里的账单，列出你所有的订阅和下次扣费日，提前 3 天问你还续不续。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 我说「续」：记下来，不再提醒；我说「不续」：告诉我去哪里取消（网址 + 步骤），我自己去操作；不替我取消任何订阅，也不登录任何账号 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/finance/md-f04/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-f04 --print
```
