# 腾讯文档

> 接上腾讯文档官方 MCP，Bot 能建文档、读内容、改表格。

**ops** · 自主性 **L1** · 运行方式：技能

负责连接腾讯文档：接上腾讯文档官方 MCP，Bot 能建文档、读内容、改表格。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 接上腾讯文档官方 MCP，Bot 能建文档、读内容、改表格。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 腾讯文档 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g17/。 |
| **首个任务** | 发一句「接上腾讯文档官方 MCP，Bot 能建文档、读内容、改表格。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 改别人共享给我的文档和表格之前，先问我；删除内容之前，必须先问我；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g17/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g17 --print
```
