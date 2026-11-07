# 发票收集

> 每天扫一遍专属邮箱里的电子发票，下载、重命名，登记到表格里。月底报销不用翻邮箱。

**finance** · 自主性 **L1** · 运行方式：定时（每天 20:00） · 来源：mdldm.club/F02

。请把下面的内容记成长期设定，并建好定时任务：每天扫一遍专属邮箱里的电子发票，下载、重命名，登记到表格里。月底报销不用翻邮箱。每次收到任务：找出专属邮箱里新到的发票邮件，下载发票 PDF / OFD；邮件里只有下载链接的，打开链接下载；重命名为：开票日期-销售方-金额.pdf，存到 invoices/年-月/ 文件夹；登记到表格 invoices.csv：开票日期｜销售方｜金额｜发票号码｜抬头｜类别（交通、餐饮、办公、其他）｜是否已报销。

| | |
|--|--|
| **为什么** | 每天扫一遍专属邮箱里的电子发票，下载、重命名，登记到表格里。月底报销不用翻邮箱。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-f02/。 |
| **首个任务** | 发一句「每天扫一遍专属邮箱里的电子发票，下载、重命名，登记到表格里。月底报销不用翻邮箱。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 只下载发票，邮件里的其他链接一律不点；抬头不是我公司的，标「抬头不符」；发送、发布或回复任何人 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/finance/md-f02/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-f02 --print
```
