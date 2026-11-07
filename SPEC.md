# Grok Bot 模板契约

本仓库将 Grok Bot 模板视为**操作契约**，而非人设。

Bot 是一个持久化的 AI 队友，拥有名字、任务、对话以及随时间积累的工作上下文。官方定义：[创建和管理 Bot](https://docs.x.ai/grok-bot/bots)。

## 为什么是契约

Grok Bot 可以使用浏览器、连接器、文件和共享云计算机。共享 Bot 是配置的公开副本。一个好的模板应当是：

1. **单一任务** —— 一个可重复的产出，不是一类问题
2. **命名数据源** —— 连接器或具体网站，而非"互联网"
3. **可审查的交付物** —— 带标题、链接和操作日志
4. **常设审批边界** —— 永不做的事写在描述里
5. **首个任务** —— 在空白对话中就能产出结果的事
6. **无数据策略** —— 缺少数据源 ≠ 编造数据源
7. **分享安全** —— 无密钥、无客户数据、无内部 URL

第一周是 **L1 起草**，除非所有者提升 Bot 等级。这与 loop-engineering 的只报告周遵循相同纪律。

## 自主性

| 等级 | 名称 | 允许 | 禁止直到提升 |
|------|------|------|-------------|
| **L0** | 观察 | 读取、报告 | 可发送的草稿 |
| **L1** | 起草 | 可供审查的产出物 | 发送、发布、支付、合并、发布、生产变更 |
| **L2** | 审批后操作 | 聊天中明确批准后的指定写入 | 任何未明确命名的事项 |
| **L3** | 定时执行 | 例行程序运行该技能 | 写入仍遵循 `approval_never`，除非例行程序明确指定例外 |

官方顺序（[用例](https://docs.x.ai/grok-bot/use-cases)）：

1. 将任务、数据源、输出格式和常设边界写入描述
2. 用一个安全范围的真实任务运行一次
3. 纠正直到可供审查
4. 将流程保存为技能
5. 在第二个输入上测试
6. 仅在重试和失败情况已定义时才创建例行程序
7. 将有影响的外部操作置于审批之后

## 文件

每个模板位于 `templates/<category>/<id>/`：

| 文件 | 角色 |
|------|------|
| `template.yaml` | 源文件。由 `schema/template.schema.json` 校验。 |
| `PROFILE.md` | 粘贴到 **Bot 操作 → 编辑个人资料**。由 YAML 生成。 |
| `SETUP.md` | 插件、首个任务、技能、例行程序。由 YAML 生成。 |
| `README.md` | 目录页面。由 YAML 生成。 |
| `examples/first-run.md` | 真实的产出物示例。由 `example_first_run` 生成。 |

不要手动编辑生成的 Markdown。修改 YAML，然后执行 `npm run render`。

## YAML 字段

参见 `schema/template.schema.json`。必需字段：

- `id` —— kebab-case，与文件夹名匹配
- `name` —— Bot 名称（2–48 字符）
- `title` —— 职位/功能标题，而非氛围
- `category` —— 12 个目录分类之一
- `job` —— ≥60 字符，操作性的，而非"通用助手"
- `tagline` / `why`
- `autonomy` —— `L0`–`L3`
- `plugins` —— 设置 → 插件名称，或 `[]`
- `sources` —— 真相所在的位置
- `deliverable` —— 人类审查的内容
- `approval_never` —— ≥3 条常设拒绝项
- `first_task` —— 空白对话的默认任务
- `no_data` —— 缺失/过期策略
- `working_style` —— ≥4 条"如何"而非氛围的要点
- `never` —— 额外的反模式
- `share_safe: true`

可选：`soul`、`skills`、`routine`、`handoffs`、`example_first_run`、`official_use_case`、`featured`、`share_url`（`https://x.ai/bot/<id>` Add-to-Grok 链接，或在 `catalog/share-links.json` 中设置）。

## 技能

技能是可复用的方法。官方六个字段（[技能与例行程序](https://docs.x.ai/grok-bot/skills-routines-and-automations)）：

1. 何时使用
2. 所需输入与权限
3. 工作步骤
4. 如何验证结果
5. 返回什么
6. 什么需要审批

存储为 `skills/<id>/skill.yaml`。模板通过 id 引用技能。

## 例行程序

例行程序告诉**一个** Bot 何时运行工作流。必需字段：所有者、节律、技能、预期结果、审批边界、缺数据策略、`test_first: true`。

官方说明：后台例行程序可以在笔记本关闭时运行。测试运行会执行实际工作。禁止宽泛的监听器（"每条新消息"）。

## 团队

团队是 2–6 个 Bot 加上群组启动。安装器 Bot 默认最多 4 个 —— 一个账户最多可有 50 个 Bot 和群聊的组合，但较小的名册能积累更好的上下文。

主导 Bot 列在 `bots` 中。群组启动使用 `@Name` 提及并命名共享产出。交接在群组中可见；不要将额外的 Bot 作为安全边界。所有 Bot 共享一台计算机。

## 功能组（md-t0x）

`teams/md-t01` … `md-t04` 是转写的「一键生成 Bot 群组」：一个口令让 Setup 生成整组 Bot（口播编辑部、一稿多发组、上新组、求职组）。结构与常规团队相同（`team.yaml`），但作为站点「一键生成」入口的推荐组，并带种子复制计数。

## 复制计数与提交

站点展示「复制次数」与热门榜。计数种子来自 `snapshots/imported-counts.json`（公开快照，仅用于排序，不代表安装量），构建时写入 `docs/counts.json`；Cloudflare Worker 部署专属、代码不入库，其 KV 种子由本地 `npm run counts` 生成后灌入，未部署时站点只显示种子。

新 Bot 的提交走「提交入口」：站点表单 → GitHub Issue（`new-template.yml` 模板预填），维护者按本 SPEC 校验后转写为 `template.yaml` 并开 PR。不允许绕过校验直接入库。

## 校验

每个模板必须通过 JSON Schema 校验（`schema/template.schema.json`）：字段齐全、长度下限、永不清单至少三条、技能引用存在。分享安全检查不得包含密钥形状或内部 URL，且 `share_safe` 必须为 `true`。目录 CI 会在任何模板校验失败时失败。

## 描述 vs 消息

来自官方文档：

- **描述** —— 始终为真的规则（"未经批准绝不发送外部消息。"）
- **消息** —— 这个任务（"为这十二个账户起草跟进。"）

模板编码描述级别规则。首个任务文本是我们规定的唯一消息。

## 共享计算机

一个账户上的每个 Bot 使用相同的云计算机：cookies、文件、CLI 凭据。独立的 Bot **不是**安全边界。`/workspace/<id>/` 是持久化文件的约定。

## 分享

公开分享链接复制身份、描述、技能和例行程序。它不复制计算机、登录信息或历史。分享前需脱敏 API 密钥、内部 URL 和客户数据。接收方接受[第三方 Bot 条款](https://x.ai/legal/bot-sharing-terms)。

该目录在设计上确保每个模板都是分享安全的。

## 这个目录不是什么

- 非 xAI 官方。无隶属关系。
- 非 `x.ai/bot/<id>` 分享链接的倾倒（那些见 grokbot.dev）。
- 非人设包。没有任务的可爱名称会校验失败。
- 非无人值守生产变更的许可。

## 命令

将 [START.md](https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md) 粘贴到一个名为 Setup 的 Bot 中。

```bash
npx --yes github:junze-xu/grok-bot-cn list
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
npx --yes github:junze-xu/grok-bot-cn validate
npx --yes github:junze-xu/grok-bot-cn doctor
npx --yes github:junze-xu/grok-bot-cn init --team eng --out ./eng-bots
```
