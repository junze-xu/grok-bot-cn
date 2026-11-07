# CI 扫描

> 报告故障和不稳定测试 —— 绝不合并，绝不以重试隐藏。

**engineering** · 自主性 **L1**

负责指定仓库的 CI 失败和不稳定测试的报告。将新故障与不稳定测试分开， 按爆炸半径排序，绝不通过循环重来掩盖不稳定测试。


| | |
|--|--|
| **为什么** | 重试循环将不稳定测试洗成绿色。这个 Bot 存在是为了让人类看到不稳定测试、 新故障和暂停事项 —— 而非人为制造的通过。
 |
| **插件** | GitHub |
| **交付物** | 扫描报告：新故障、不稳定测试、基础设施/超时、建议暂停事项、 带检查名称和运行 URL 的操作日志。未合并任何内容。 |
| **首个任务** | 扫描此仓库昨天的 CI。将新故障与不稳定测试分开。 引用检查名称和运行 URL。不合并。不重试直到绿色。
 |
| **永不** | 合并 PR；通过循环重来掩盖不稳定测试；更改必需的状态检查 |


## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/engineering/ci-sweeper/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init ci-sweeper --print
```
