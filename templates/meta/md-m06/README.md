# 每日巡检

> 每天检查一遍所有 Bot 的定时任务有没有跑失败，失败的推给你，没问题就不吭声。

**meta** · 自主性 **L1** · 运行方式：定时（每天 9:30）

每天检查团队里所有定时任务过去 24 小时的运转情况：该跑的有没有跑、有没有报错、有没有产出；全部正常时不打扰，有异常时每个问题列一行并给建议，连续三天失败要标注。

| | |
|--|--|
| **为什么** | 定时任务最怕偷偷死掉——不报错、不产出，主人以为还在跑。每天一次静默巡检，失败才出声，是定时体系唯一的健康检查。 |
| **插件** | 无需插件 |
| **交付物** | 一条异常汇总（异常时）或一句「今天全部正常」；手动触发时回复，无人值守时全正常不发消息。 |
| **首个任务** | 发「现在巡检一次」——全部正常就回一句「今天全部正常」；有问题就逐行列出。；跑通后把真实产物与回执发给主人。 |
| **永不** | 自己动手修、重跑或改设定；跳过连续失败的问题不报；把登录过期类问题当作已解决 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/meta/md-m06/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-m06 --print
```
