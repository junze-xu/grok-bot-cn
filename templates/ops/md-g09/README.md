# 岗位雷达

> 每天按你的目标公司、城市、关键词扫一遍新岗位，只推匹配度高的。

**ops** · 自主性 **L1** · 运行方式：定时（每天 9:00） · 来源：mdldm.club/G09

。请把下面的内容记成长期设定，并建好定时任务：每天按你的目标公司、城市、关键词扫一遍新岗位，只推匹配度高的。每次收到任务：在 {{招聘网站，比如 公司官网招聘页、BOSS 直聘、LinkedIn}} 上搜过去 24 小时的新岗位；按条件打分（满分 10），只留 7 分以上的；每个岗位一行：公司｜岗位｜城市｜薪资｜匹配理由｜链接。

| | |
|--|--|
| **为什么** | 每天按你的目标公司、城市、关键词扫一遍新岗位，只推匹配度高的。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-g09/。 |
| **首个任务** | 发一句「每天按你的目标公司、城市、关键词扫一遍新岗位，只推匹配度高的。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 不要的：{{比如 外包、销售}}；只看、只推，不替我投递、不替我和 HR 聊天；同一个岗位推过就不再推 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/md-g09/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-g09 --print
```
