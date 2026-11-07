# Setup —— 报错值守

Grok Bot 是云电脑上的常驻队友。官方文档：[入门](https://docs.x.ai/grok-bot/get-started) · [Bot](https://docs.x.ai/grok-bot/bots) · [审批](https://docs.x.ai/grok-bot/approvals-security-and-privacy)。

## 1. 创建 Bot

1. 在 Grok Bot 中，**新建** → **创建新智能体**（或 `Cmd/Ctrl+N`）。
2. **Bot 操作 → 编辑个人资料**。
3. 名称：**报错值守** —— 如果显示的是默认名，改成这个名字。用户想改名时由用户自己改。
4. 头衔：代码附录：报错值守
5. 把 `PROFILE.md`（本文件夹）粘贴到描述中。

或者跳过表单，把本文件粘贴到装有 [START.md](../../START.md) 的安装器 Bot 中。

## 2. 插件

1. **GitHub** —— 设置 → 插件 → 添加

已安装的连接器是账号级的。它们**不**隔离于本 Bot。当某个服务不应再对名册中其他 Bot 可用时，退出登录它。

## 3. 首个任务

发送：

> 发一句「报错值守」，用第一个真实任务跑通流程，把结果发回本对话。；跑通后把真实产物与回执发给主人。

自主性为 **L1**。第一周是读取并准备，除非你升级该 Bot。

## 4. 保存技能

当产出在第二个输入上可审查时，询问：

> 把刚才的流程保存为名为“error-oncall”的技能。包含来源、输出格式、验证方法，以及外部动作始终需要审批的规则。

## 5. 例行程序

第一周不设例行程序。

## 6. 分享

分享链接是公开的。添加它只复制配置，不复制你的电脑或登录。先剔除密钥。见 [docs/sharing.md](../../docs/sharing.md) 和[第三方 Bot 条款](https://x.ai/legal/bot-sharing-terms)。
