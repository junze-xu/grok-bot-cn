# 设计 Bot 模板

成功运行后，把本文件粘贴到 Grok Bot 中：

> 把刚才的流程保存为名为“设计 Bot 模板”的技能。

一个有用的技能要说明来自 [Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations) 的六个字段：

## 1. 何时使用

主人描述一份工作、一个痛点或一个关键词，需要一份能通过本仓库 schema 和 Bot Ready 评分的 可安全分享契约——不是可爱人设。


## 2. 所需输入与访问权限

- Bot 必须负责的结果（一句话）
- 主人实际拥有的来源和插件
- 自主级别目标（默认 L1）
- 审批边界（什么绝不能发生）

## 3. 操作顺序

1. 解析结果；拒绝「通用助手」这类万金油工作。
2. 诊断缺失来源、交付物形态缺失、幻觉风险和自主级别漂移。
3. 按 SPEC.md 填写 template.yaml 的每个必填字段。
4. 按 PROFILE 格式写描述文本：job、sources、how、deliverable、never 清单、first task、no-data 策略。
5. 对照 Bot Ready 自评；低于 80 分就在出示前重写。

## 4. 如何验证结果

每个 SPEC 必填字段都在；approval_never 至少三项，且其中一项来自 发送/支付/合并/发布/生产； 无密钥、无内部 URL；首个任务在空聊天里也能跑。


## 5. 返回什么

一份可直接粘贴的完整 template.yaml（或 PROFILE.md），外加逐项通过/不通过的 Bot Ready 清单。


## 6. 什么需要审批

主人发话前不要在他账户创建 Bot；不要启用例行程序；不要附加 logo。


在输入框中键入 `/` 来引用已保存的技能。如果没有出现，打开 **设置 → 插件 → 你的插件** 并为本 Bot 启用它。
