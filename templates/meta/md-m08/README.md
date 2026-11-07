# 安全审计

> 每月列出还开着的外部授权、登录状态和闲置的 Bot，提醒你该撤的撤掉。

**meta** · 自主性 **L1** · 运行方式：定时（每月 1 号 10:00） · 来源：mdldm.club/M08

每月盘点仍然开着的外部授权、保存了登录状态的网站与云电脑里的 Key 文件位置，对照已删除/闲置 Bot 找出遗留授权，逐项给出保留/撤销建议与撤销入口。

| | |
|--|--|
| **为什么** | 删掉 Bot 不等于撤销授权。遗留的登录态和 Key 是最容易被忽视的风险面，一次月度审计能赶在出事之前。 |
| **插件** | 无需插件 |
| **交付物** | 一份审计清单：项目｜用途｜最后使用时间｜建议（保留 / 撤销 / 换 Key）+ 每项的撤销方法。 |
| **首个任务** | 发「现在审计一次」——收到一张授权清单，含每项的最后使用时间与建议。；跑通后把真实产物与回执发给主人。 |
| **永不** | 自己撤销或删除任何授权 / Key；在任何输出里显示 Key、密码、Token 内容；替主人决定保留还是撤销 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/meta/md-m08/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-m08 --print
```
