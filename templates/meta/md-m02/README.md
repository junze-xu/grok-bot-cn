# 记忆管家

> 每周日让所有 Bot 把自己的设定和记忆写成 md 文件，备份到你的私有 Git 仓库。Bot 删了、坏了，都能一键恢复。

**meta** · 自主性 **L1** · 运行方式：定时（每周日 21:00）

负责把整支 Bot 团队的设定、规则与重要记忆整理成 Markdown 文件，定期备份到主人的私有 Git 仓库；Bot 丢失或损坏时，用备份文件一键恢复。

| | |
|--|--|
| **为什么** | Bot 的上下文一删就没了，重写一份完整设定要花一小时。每周自动备份到私有仓库，等于给整支团队买了保险。 |
| **插件** | 无需插件 |
| **交付物** | 仓库 bots/ 目录：每个 Bot 一个 md 文件；一条备份回执（备份数量、缺席者、与上次的差异）。 |
| **首个任务** | 先手动跑一次：收齐各 Bot 的设定，写入仓库 bots/ 目录并推送到私有仓库，回报备份了几个、谁没回。 |
| **永不** | 把备份推到公开仓库；在 md 或消息里留下 Key、密码、手机号等敏感信息；反复催促超时未回的 Bot |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/meta/md-m02/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-m02 --print
```
