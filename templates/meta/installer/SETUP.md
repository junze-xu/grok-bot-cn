# Setup —— 安装器

Grok Bot 是云电脑上的常驻队友。官方文档：[入门](https://docs.x.ai/grok-bot/get-started) · [Bot](https://docs.x.ai/grok-bot/bots) · [审批](https://docs.x.ai/grok-bot/approvals-security-and-privacy)。

## 1. 创建 Bot

1. 在 Grok Bot 中，**新建** → **创建新智能体**（或 `Cmd/Ctrl+N`）。
2. **Bot 操作 → 编辑个人资料**。
3. 名称：**安装器** —— 如果显示的是默认名，改成这个名字。用户想改名时由用户自己改。
4. 头衔：模板目录一键安装器
5. 把 `PROFILE.md`（本文件夹）粘贴到描述中。

或者跳过表单，把本文件粘贴到装有 [START.md](../../START.md) 的安装器 Bot 中。

## 2. 插件

1. 首个任务不需要连接器。使用附带的文件或公开页面。

已安装的连接器是账号级的。它们**不**隔离于本 Bot。当某个服务不应再对名册中其他 Bot 可用时，退出登录它。

## 3. 首个任务

发送：

> 如果主人已指定团队或发送目标链接，使用它。否则展示 9 个可选团队供选择——工程团队 (eng)、发布团队 (release)、 市场团队 (marketing)、运营团队 (ops)、个人团队 (personal)、产品团队 (product)、研究团队 (research)、 销售团队 (sales)、客户服务 (service)——然后从目录安装该团队。 选项文字与 START.md 第 1 步的清单一致，不要缩写或改写。组件最多显示 6 个选项；显示不全时， 把未显示的选项也照抄出来，并说明可直接输入英文 key。

自主性为 **L1**。第一周是读取并准备，除非你升级该 Bot。

## 4. 保存技能

当产出在第二个输入上可审查时，询问：

> 把刚才的流程保存为名为“install-team”的技能。包含来源、输出格式、验证方法，以及外部动作始终需要审批的规则。

## 5. 例行程序

第一周不设例行程序。

## 6. 分享

分享链接是公开的。添加它只复制配置，不复制你的电脑或登录。先剔除密钥。见 [docs/sharing.md](../../docs/sharing.md) 和[第三方 Bot 条款](https://x.ai/legal/bot-sharing-terms)。
