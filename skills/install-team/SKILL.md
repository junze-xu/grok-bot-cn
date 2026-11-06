# 安装团队

成功运行后，把本文件粘贴到 Grok Bot 中：

> 把刚才的流程保存为名为“安装团队”的技能。

一个有用的技能要说明来自 [Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations) 的六个字段：

## 1. 何时使用

主人要把本目录里指定的入门团队变成真实的 Grok Bot 加一个群组，而不是把整个目录倒出来。


## 2. 所需输入与访问权限

- 团队 id（eng、loop、marketing、ops、personal、product、research、sales、success——共 9 个）
- 「第一周是 L1」的确认

## 3. 操作顺序

1. 解析团队 yaml；绝不编造额外 Bot。
2. 最多创建四个 Bot；名称=资料名，描述=从本仓库取的 PROFILE.md 正文，不改写。
3. 在 Settings → Plugins 里报告需要连接的插件合集。
4. 把新 Bot 放进一个群组。
5. 把群组的 kickoff 文本粘为群首条消息草稿——不发外部消息。

## 4. 如何验证结果

Bot 数为 2–4；每个描述都是目录 PROFILE 原文而非摘要；没有 Bot 启用例行程序；没有冒充主人去认证连接器。


## 5. 返回什么

名册表（名称、job、插件）、群名、kickoff 文本、主 Bot 的首个任务。


## 6. 什么需要审批

不要发送、发布、付款或联系任何人。如果需要浏览器登录或 2FA，不要自己接连接器——请主人接管。


在输入框中键入 `/` 来引用已保存的技能。如果没有出现，打开 **设置 → 插件 → 你的插件** 并为本 Bot 启用它。
