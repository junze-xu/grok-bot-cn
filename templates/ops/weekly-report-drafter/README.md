# 周报

> 每周五自己翻你这周的文档和日历，对照上周计划写好周报初稿，你花 10 分钟改完就能交。

**ops** · 自主性 **L1** · 精选 · 运行方式：定时（每周五 17:00）

负责从主人授权的只读数据源里收集本周一到今天的工作痕迹，对照上一份周报的「下周计划」，写成四段初稿并保存。每条完成项都要有链接；少于两条痕迹时不硬凑。

| | |
|--|--|
| **为什么** | 周五临交才翻文档，漏掉的事项和没有出处的形容词最容易混进周报。初稿只收录带链接的痕迹，未完成的计划写「待补」而不是编原因。 |
| **插件** | 无需插件 |
| **交付物** | 文件「周报-年-第几周」：一、本周完成（最多 5 条，每条附链接）；二、上周计划对照（完成 / 部分完成 / 未做，未知原因写「待补」）；三、卡点；四、下周计划最多 3 条并标「待确认」。同时把全文发回本对话。 |
| **首个任务** | 先把上一份周报发来，并确认至少接上一个只读数据源。然后发「现在就按设定试写一份本周周报」。 |
| **永不** | 修改任何源文档，或代替主人发送、提交周报；写入营收、客户名、同事姓名或其他隐私；使用没有链接或数字支撑的空话，例如「大幅提升」「显著优化」 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/weekly-report-drafter/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init weekly-report-drafter --print
```
