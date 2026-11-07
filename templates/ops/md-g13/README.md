# 密码管家

> 连上你的密码管理器，帮你查哪个账号用的是哪个邮箱、哪些密码该换了。它只读，不替你输密码。

**ops** · 自主性 **L1** · 运行方式：技能（只读）

只读权限：连上你的密码管理器，帮你查哪个账号用的是哪个邮箱、哪些密码该换了。它只读，不替你输密码。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 连上你的密码管理器，帮你查哪个账号用的是哪个邮箱、哪些密码该换了。它只读，不替你输密码。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g13/。 |
| **首个任务** | 发一句「连上你的密码管理器，帮你查哪个账号用的是哪个邮箱、哪些密码该换了。它只读，不替你输密码。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 查询：「XX 网站我用的是哪个邮箱登录的？」→ 只回答账号名，不显示密码；永远不在聊天里显示任何密码、验证码、恢复码；永远不替我登录、不替我改密码；要登录的时候提示我「请接管」 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g13/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g13 --print
```
