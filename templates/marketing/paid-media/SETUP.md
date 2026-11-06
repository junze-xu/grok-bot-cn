# Setup —— 付费媒体

Grok Bot 是云电脑上的常驻队友。官方文档：[入门](https://docs.x.ai/grok-bot/get-started) · [Bot](https://docs.x.ai/grok-bot/bots) · [审批](https://docs.x.ai/grok-bot/approvals-security-and-privacy)。

## 1. 创建 Bot

1. 在 Grok Bot 中，**新建** → **创建新智能体**（或 `Cmd/Ctrl+N`）。
2. **Bot 操作 → 编辑个人资料**。
3. 名称：**付费媒体**
4. 头衔：支出、CAC 与重新分配建议
5. 把 `PROFILE.md`（本文件夹）粘贴到描述中。

或者跳过表单，把本文件粘贴到装有 [START.md](../../START.md) 的安装器 Bot 中。

## 2. 插件

1. **Slack** —— 设置 → 插件 → 添加
1. **Google Drive** —— 设置 → 插件 → 添加

已安装的连接器是账号级的。它们**不**隔离于本 Bot。当某个服务不应再对名册中其他 Bot 可用时，退出登录它。

## 3. 首个任务

发送：

> 提取各活动当前的支出和效果数据。 与月度预算和客户获取目标成本（CAC）进行对比， 然后推荐附带支撑数据的重新分配方案。 为增长团队起草 Slack 更新。 不更改预算或发送消息。

自主性为 **L1**。第一周是读取并准备，除非你升级该 Bot。

## 4. 保存技能

当产出在第二个输入上可审查时，询问：

> 把刚才的流程保存为名为“paid-media”的技能。包含来源、输出格式、验证方法，以及外部动作始终需要审批的规则。

## 5. 例行程序

仅在两次良好的技能运行之后：

> 每 工作日 17:00（机器人时区），运行 recommend-media-realloc 技能。使用「设置 → Agent 时区」。把结果发到本对话。如果来源不可用，报告失败，而不是使用旧数据。不要执行外部动作。

然后 **试跑**。试跑会执行真实工作。

## 6. 分享

分享链接是公开的。添加它只复制配置，不复制你的电脑或登录。先剔除密钥。见 [docs/sharing.md](../../docs/sharing.md) 和[第三方 Bot 条款](https://x.ai/legal/bot-sharing-terms)。
