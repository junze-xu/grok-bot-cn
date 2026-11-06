<p align="center">
  <img src="assets/header.jpg" alt="Templates for Grok Bot" width="100%" />
</p>

# Grok Bot 模板库

<p align="center">
  <strong><a href="https://junze-xu.github.io/grok-bot-cn/">浏览模板目录 →</a></strong><br/>
  选一张卡片。复制 PROFILE。粘贴到编辑个人资料。无需克隆，无需 Node。
</p>

[![CI](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml/badge.svg)](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![bot ready](https://junze-xu.github.io/grok-bot-cn/badge.svg)](https://junze-xu.github.io/grok-bot-cn/)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://junze-xu.github.io/grok-bot-cn/)

**告别凭感觉粘贴。精心设计 Bot。获取评分。**

[Grok Bot](https://x.ai/bot) 的操作契约 —— xAI 持久化的 AI 队友。规格说明、Bot 就绪评分、团队、技能、例行程序。粘贴一个 URL。点击一个团队。

[loop-engineering](https://github.com/junze-xu/loop-engineering)（内循环）和 [outerloop](https://github.com/junze-xu/outerloop)（证据 → 判定）在理念上互为补充。该目录是 Grok Bot 的 **任务 → 边界 → 技能 → 例行程序 → 团队** 工具包。

> 与 xAI 无隶属关系。Grok Bot 是 xAI / Cursor 的产品。这里的契约是你粘贴到**你的**账户的内容。

## 快速上手

### 方案 A —— 安装器 Bot（无需 Node）

1. 在 Grok Bot 中：**新建 → 创建新智能体**。命名为 **Setup**。
2. 粘贴这个 URL 并发送：

```
https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md
```

3. 点击一个团队。试试 **Eng**（Bug 复现 + PR 审查）。
4. 连接所需的插件。第一周停留在 **L1** —— 只起草，不发送。

Setup 会获取每个 Bot 的 `PROFILE.md`。它不会凭空编造提示词。

→ [Pages 目录](https://junze-xu.github.io/grok-bot-cn/)（按卡片复制 PROFILE） · [你想做什么？](./docs/jobs.md)

### 方案 B —— 单个 Bot，复制 PROFILE

浏览 [Pages 目录](https://junze-xu.github.io/grok-bot-cn/) 并点击 **复制 PROFILE**，或者：

```bash
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
```

1. 在 Grok Bot 中：**新建 → 创建新智能体**
2. **Bot 操作 → 编辑个人资料**
3. 命名为 `PR 审查`。把打印出的简介粘贴到描述中
4. 如果有的话，在「设置 → 插件」下连接 **GitHub**
5. 发送简介底部的首个任务
6. 在两次运行看起来正常之前，不要启用例行程序

| Bot | 推荐理由 | 原始 PROFILE |
|-----|----------|--------------|
| [PR 审查](templates/engineering/pr-reviewer/) | 审查从令人担忧的 diff 开始 | [PROFILE.md](https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/engineering/pr-reviewer/PROFILE.md) |
| [Bug 复现](templates/engineering/bug-reproduction/) | 预发布复现包 —— 绝不用生产数据 | [PROFILE.md](https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/engineering/bug-reproduction/PROFILE.md) |
| [执行助理](templates/ops/chief-of-staff/) | 仅包含与优先列表匹配的事项 | [PROFILE.md](https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/chief-of-staff/PROFILE.md) |
| [收件箱分类](templates/personal/inbox-triage/) | 分类与起草 —— 绝不发送 | [PROFILE.md](https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/inbox-triage/PROFILE.md) |
| [研究助手](templates/research/research-desk/) | 主张、证据、分歧、未找到 | [PROFILE.md](https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/research/research-desk/PROFILE.md) |

完整目录：**33 个模板 · 10 个团队 · 13 个技能 · 8 个例行程序**。所有稳定模板均达到 Bot 就绪标准（≥80/100）。

### 方案 C —— 用 CLI 组建团队

```bash
npx --yes github:junze-xu/grok-bot-cn list
npx --yes github:junze-xu/grok-bot-cn init --team eng --out ./eng-bots
```

从 `./eng-bots/*/PROFILE.md` 创建 Bot，把它们放进一个群组，粘贴 `TEAM.md` 启动词。

`npx @junze-xu/grokbot` 是限定名称，下次 npm 发布后即可使用。GitHub npx 今天就可使用。

### 方案 D —— 给你写的契约打分

```bash
npx --yes github:junze-xu/grok-bot-cn new onboard-ledger --category ops
# 编辑 templates/ops/onboard-ledger/template.yaml
npx --yes github:junze-xu/grok-bot-cn score onboard-ledger
npx --yes github:junze-xu/grok-bot-cn validate
```

「就绪」意味着 **≥ 80** 且声明了自主性级别。

### 「第一周」指什么

读取并准备。做草稿，不发送。官方顺序：描述里的任务 → 一个真实任务 → 修正它 → 保存一个技能 → 用第二个输入测试 → 然后也许才是例行程序。

详情：[SPEC.md](./SPEC.md) · [docs/autonomy.md](./docs/autonomy.md) · [docs/safety.md](./docs/safety.md)

## 选择你的入口

| 用户画像 | 开始方式 |
|----------|----------|
| **我已打开 Grok Bot** | 粘贴 [START.md](https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md) |
| **我想要一个团队** | 点击 Eng / Ops / Sales · [teams/](./teams/) |
| **我想编写一个 Bot** | `npx --yes github:junze-xu/grok-bot-cn new my-job --category ops` · [编写指南](./docs/authoring.md) |
| **我想转换一个** | [convert/](./convert/) |
| **我想分享一个** | [sanitizer](./templates/meta/sanitizer/) · [分享指南](./docs/sharing.md) |
| **我的 Bot 应能读取此目录** | [docs/agent.md](./docs/agent.md) |

## 自主性等级

| 等级 | 名称 | 第一周规则 |
|------|------|-----------|
| **L0** | 观察 | 只读、报告 |
| **L1** | 起草 | **默认等级。** 可供审查的产出物 |
| **L2** | 审批后操作 | 聊天中明确批准后的指定写入 |
| **L3** | 定时执行 | 例行程序 + 缺数据策略 + 测试运行 |

→ [docs/autonomy.md](./docs/autonomy.md)

## Bot 就绪评分

`grokbot score <id>` 满分为 100 分：任务、数据源、永不做列表、交付物、首个任务、技能、无数据策略、自主性、示例、例行程序纪律、分享安全、工作风格。

**就绪**指 ≥ 80。CI 会让低于该分数的稳定模板失败。

```bash
npx --yes github:junze-xu/grok-bot-cn score --badge --md
# ![bot ready 100/100](https://img.shields.io/badge/bot%20ready-100%2F100-2e7d32)
```

## 60 秒循环

```
任务 → 边界 → 技能 → 例行程序 → 团队
谁   永不     如何    何时     交接
```

Bot 是一个持久化的队友，拥有名字、任务、对话和随时间积累的工作上下文。官方文档：[入门](https://docs.x.ai/grok-bot/get-started) · [Bot](https://docs.x.ai/grok-bot/bots) · [用例](https://docs.x.ai/grok-bot/use-cases)。

第一周是 **L1 起草** —— 可供审查的产出物，不发送/发布/支付/合并/上生产。与 loop-engineering 的只报告周遵循相同纪律。

→ [SPEC.md](./SPEC.md)（绑定规范） · [对比替代方案](./docs/vs-alternatives.md)

## CLI 速查

| 命令 | 用途 |
|------|------|
| `start` | 输出 START.md |
| `list` | 显示目录 |
| `show <id>` | 展示一个契约 |
| `init <id> --print` | 可粘贴的 PROFILE |
| `init --team <id>` | 名册 + 启动 |
| `score [--badge]` | Bot 就绪评分，可选 SVG / shields.md |
| `validate` / `doctor` | 架构校验、密钥检查、漂移检查 |
| `catalog` | 供其他 Bot 使用的 JSON |
| `new` | 创建存根 |

## 渐进式采用

| 等级 | 你能获得 | 文档 |
|------|----------|------|
| **1 — 单个 Bot** | PROFILE + 首个任务 | [anatomy](./docs/anatomy.md) |
| **2 — 技能** | 六个官方字段 | [SPEC](./SPEC.md) |
| **3 — 团队** | 2–4 个 Bot，可见交接 | [聊天文档](https://docs.x.ai/grok-bot/chat-and-collaboration) |
| **4 — 例行程序** | 两次良好运行 + 测试运行后 | [技能与例行程序](https://docs.x.ai/grok-bot/skills-routines-and-automations) |

## 安全

共享计算机。共享插件。分享链接是公开的。该目录在构造上是分享安全的，并在 CI 中进行扫描。

→ [docs/safety.md](./docs/safety.md) · [SECURITY.md](./SECURITY.md)

## 机器 API

公开，无需认证。让 Bot 指向 [docs/agent.md](./docs/agent.md)。

| URL | 内容 |
|-----|------|
| https://junze-xu.github.io/grok-bot-cn/api/v1/status.json | 版本、能力 |
| https://junze-xu.github.io/grok-bot-cn/catalog.json | 完整目录 |
| https://junze-xu.github.io/grok-bot-cn/api/v1/teams.json | 团队 |
| https://junze-xu.github.io/grok-bot-cn/llms.txt | 简短机器摘要 |

## 状态

**v1.1.0** —— 安装器优先的发布方式：START.md 作为主要路径，Pages 复制按钮，目录 API，Bot 就绪徽章。

→ [CHANGELOG.md](./CHANGELOG.md) · [ROADMAP.md](./ROADMAP.md) · [Discussions](https://github.com/junze-xu/grok-bot-cn/discussions)

## 开发

```bash
git clone https://github.com/junze-xu/grok-bot-cn.git
cd grok-bot-cn
npm install
npm run ci
```

→ [CONTRIBUTING.md](./CONTRIBUTING.md) · [Good first issues](./docs/good-first-issues.md) · [Code of Conduct](./CODE_OF_CONDUCT.md)

## 来源

- [Grok Bot 文档](https://docs.x.ai/grok-bot/get-started)
- [官方用例](https://docs.x.ai/grok-bot/use-cases)
- [研究笔记](./docs/research.md)
- [loop-engineering](https://github.com/junze-xu/loop-engineering)（质量标准）

## 许可证

MIT © 2026 junze-xu
