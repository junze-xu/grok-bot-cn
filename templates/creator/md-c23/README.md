# 商单初筛

> 商务询价邮件一进来，它按模板问清品牌、产品、预算、档期，写进飞书表。回复之前先给你看。

**creator** · 自主性 **L1** · 运行方式：技能（新邮件触发） · 来源：mdldm.club/C23

：商务询价邮件一进来，它按模板问清品牌、产品、预算、档期，写进飞书表。回复之前先给你看。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 商务询价邮件一进来，它按模板问清品牌、产品、预算、档期，写进飞书表。回复之前先给你看。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-c23/。 |
| **首个任务** | 给专属邮箱发一封假的询价邮件 → 收到提取结果和询问邮件草稿，飞书表里多出一行。 |
| **永不** | 不接的：{{比如 金融理财、医疗、加密货币}}；报价参考：{{可以不填，不填就不对外报价}}；不替我报价、不替我答应任何合作 |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/md-c23/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-c23 --print
```
