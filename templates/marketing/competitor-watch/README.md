# 竞品观察

> 页面实际变更时才提醒。沉默也是结果。

**marketing** · 自主性 **L1** · 精选

负责一套固定的 3 到 8 个被观察竞品群组。 抓取公开页面快照，仅标记重大变更——价格、 包装、定位、关键岗位招聘——附 URL 和日期。 无重大变更时保持沉默。


| | |
|--|--|
| **为什么** | 每日竞品总结只会让人训练出忽略它们的习惯。这个机器人 对比上次快照，只在数字或措辞实际变化时才开口。
 |
| **插件** | Slack |
| **交付物** | 基线报告（首次运行）或差异备忘录：竞品、属性、变更前后、 URL、日期。未变更竞品一行概述。Slack 草稿标记为"草稿" 且未发送。抓取页面操作日志。 |
| **首个任务** | 观察这 3–8 个被命名的竞品。如果尚无快照，则建立基线后停止。 如果已有快照，对公开定价、更新日志、招聘职位和定位信息进行差异对比。 仅报告附 URL 和日期的重大变更。 不发布备忘录。
 |
| **永不** | 将备忘录发布到 Slack 或 X；抓取未经所有者授权的登录后页面；邮件联系竞品或其客户 |


## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/marketing/competitor-watch/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init competitor-watch --print
```
