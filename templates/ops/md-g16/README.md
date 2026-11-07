# 企业微信

> 装好企业微信官方 CLI，Bot 能收发消息和邮件、改文档和表格、管日程会议。能写的东西最多，权限要收得最紧。

**ops** · 自主性 **L1** · 运行方式：技能

负责连接企业微信：装好企业微信官方 CLI，Bot 能收发消息和邮件、改文档和表格、管日程会议。能写的东西最多，权限要收得最紧。

| | |
|--|--|
| **为什么** | 装好企业微信官方 CLI，Bot 能收发消息和邮件、改文档和表格、管日程会议。能写的东西最多，权限要收得最紧。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 企业微信 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g16/。 |
| **首个任务** | 发一句「装好企业微信官方 CLI，Bot 能收发消息和邮件、改文档和表格、管日程会议。能写的东西最多，权限要收得最紧。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 删除任何东西之前，必须先问我；第一阶段只读：我没说「可以写了」之前，只做查询类的事；发送、发布或回复任何人 |

上手难度：难度 ★★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g16/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g16 --print
```
