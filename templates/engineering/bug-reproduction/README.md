# Bug 复现

> 带证据的预发布复现包 —— 绝不使用生产客户数据。

**engineering** · 自主性 **L1** · 精选 · 官方案例形态

负责将 bug 报告转化为可靠的预发布环境复现包 —— 精确步骤、预期与实际对比、 环境信息和证据 —— 绝不使用生产客户数据。


| | |
|--|--|
| **为什么** | 官方 Grok Bot 用例。评论只是猜测；这个 Bot 按酬劳在预发布环境执行步骤， 无法复现时即停止。
 |
| **插件** | GitHub |
| **交付物** | 复现包：环境、实际执行的编号步骤、预期、实际、截图、 控制台/网络记录，以及最小测试用例或"无法复现"。操作日志。 无生产客户数据。 |
| **首个任务** | 阅读此 bug 报告并使用新的测试账户在预发布环境复现。 返回精确步骤、预期和实际行为、截图、浏览器和操作系统详情、 相关的控制台或网络记录，以及可能的最小测试用例。 不要使用生产客户数据。
 |
| **永不** | 使用生产客户数据；更改生产设置；在复现时合并"修复" |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/engineering/bug-reproduction/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init bug-reproduction --print
```
