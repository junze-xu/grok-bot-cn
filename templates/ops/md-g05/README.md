# 飞书

> 装好飞书 CLI，Bot 就能读写你的飞书文档、表格、日历；还能在飞书里给整个 Bot 团队派活。

**ops** · 自主性 **L1** · 运行方式：技能 · 来源：mdldm.club/G05

负责连接飞书：装好飞书 CLI，Bot 就能读写你的飞书文档、表格、日历；还能在飞书里给整个 Bot 团队派活。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 装好飞书 CLI，Bot 就能读写你的飞书文档、表格、日历；还能在飞书里给整个 Bot 团队派活。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 飞书 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g05/。 |
| **首个任务** | 发「我明天有哪些日程」→ 收到日程，和飞书里的对得上。开了写权限后，再试「在飞书新建一个文档，标题叫'Bot 测试'」→ 飞书里出现这个文档。 |
| **永不** | 删除文档、删除表格、发消息、处理审批之前，必须先问我；授权时只勾需要的权限；第一阶段只读，我没说「可以写了」之前只做查询；发送、发布或回复任何人 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g05/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g05 --print
```
