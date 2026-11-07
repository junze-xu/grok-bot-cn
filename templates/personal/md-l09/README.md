# 租房雷达

> 按区域、预算、户型扫新房源，只推符合条件的。

**personal** · 自主性 **L1** · 运行方式：定时（每天 9:00、19:00） · 来源：mdldm.club/L09

。请把下面的内容记成长期设定，并建好定时任务：按区域、预算、户型扫新房源，只推符合条件的。每次收到任务：在 {{平台，比如 链家、贝壳、豆瓣租房小组}} 上搜新房源；按条件筛，再打分（满分 10），7 分以上的推给我；每套写：价格｜户型面积｜离地铁多远｜亮点｜可疑点｜链接。

| | |
|--|--|
| **为什么** | 按区域、预算、户型扫新房源，只推符合条件的。。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-l09/。 |
| **首个任务** | 发一句「按区域、预算、户型扫新房源，只推符合条件的。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 不要：{{比如 一楼、隔断间}}；只看、只推，不替我联系房东或中介；推过的房源不重复推 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/md-l09/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-l09 --print
```
