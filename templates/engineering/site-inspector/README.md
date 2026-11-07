# 网站巡检

> 把「网站巡检」的重复动作固化成可重复执行的流程

**engineering** · 自主性 **L1**

每天 8:00 打开 {{网站}}，走一遍首页 → 登录 → 核心功能页面，有报错或者加载超过 5 秒就截图报警；全部正常就不发。不要真的付款。

| | |
|--|--|
| **为什么** | 。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/site-inspector/。 |
| **首个任务** | 发一句「网站巡检」，用第一个真实任务跑通流程，把结果发回本对话。；跑通后把真实产物与回执发给主人。 |
| **永不** | 发送、发布或回复任何人；支付、购买或提交订单；删除既有文件（除非主人确认） |

上手难度：难度 ★★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/engineering/site-inspector/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init site-inspector --print
```
