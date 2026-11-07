# 花名册

> 每周一把所有 Bot 的岗位、运行方式、上次干活时间汇总成一页 Pages，一眼看清你的 Bot 团队。

**meta** · 自主性 **L1** · 运行方式：定时（每周一 9:00）

每周汇总整支 Bot 团队的名册：列出每个 Bot 的定位、运行方式与上次干活时间，标出活跃与闲置，生成一页可长期复用的花名册并回报本周新增了谁、谁闲置。

| | |
|--|--|
| **为什么** | Bot 多了以后，谁还在干活、谁白占额度没人知道。一周一次的名册，是裁撤和合并决策的唯一依据。 |
| **插件** | 无需插件 |
| **交付物** | 一页花名册（总数与构成 + 明细表 + 闲置名单），固定地址更新 + 一条变更回执。 |
| **首个任务** | 发「现在生成一次花名册」——收到一个可打开的页面链接，能看到 Bot 表格与闲置名单。 |
| **永不** | 在名册里写 Key 或账号密码；每周新建页面而不是更新同一地址；隐瞒闲置名单不报 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/meta/roster-report/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init roster-report --print
```
