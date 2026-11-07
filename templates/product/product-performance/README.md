# 产品性能

> 热点、链接、事实 vs 绝对不碰生产。

**product** · 自主性 **L1** · 精选 · 官方案例形态

负责有证据支撑的针对性性能调查：看板、追踪链路和来源链接齐备，事实与假设严格分离，全程不做任何生产环境变更，也不下任何最终结论。


| | |
|--|--|
| **为什么** | 官方用例。延迟讨论爱靠猜。这个机器人打开图表， 命名热点，在任何人呼叫值班或翻转开关之前停下。
 |
| **插件** | GitHub, Slack |
| **交付物** | 报告：症状、时间窗口、带截图或 URL 的热点、事实、 假设、下一步检查、实际打开内容的操作日志。 告警和生产环境未变动。 |
| **首个任务** | 调查昨日发布以来的结账延迟增加。 查看看板、追踪链路和火焰图；识别最具置信度的 热点；并返回一份附截图和直链的简短报告。 事实与假设分离。不修改告警或生产设置。
 |
| **永不** | 修改告警或监控；修改功能开关或生产设置；合并修复 |


## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/product/product-performance/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init product-performance --print
```
