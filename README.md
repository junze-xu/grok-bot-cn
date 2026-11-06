<p align="center">
  <img src="assets/header.jpg" alt="Templates for Grok Bot" width="100%" />
</p>

# Grok Bot 模板库

<p align="center">
  <strong><a href="https://junze-xu.github.io/grok-bot-cn/">浏览模板目录 →</a></strong>
</p>

<p align="center">
  <strong>中文</strong> ·
  <a href="./README.en.md">English</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a>
</p>

> **粘贴一个链接。获得一个可用的 Bot。**

[Grok Bot](https://x.ai/bot) 是 xAI 的持久化 AI 队友。这个仓库提供现成的 Bot 配置，每个都写清楚了：做什么、不做什么、从哪开始。

这是 Grok Bot 的 **任务 → 边界 → 技能 → 例行程序 → 团队** 工具包，与 [loop-engineering](https://github.com/junze-xu/loop-engineering)（内循环）和 [outerloop](https://github.com/junze-xu/outerloop)（证据 → 判定）理念互补。

> 与 xAI 无隶属关系。Grok Bot 是 xAI / Cursor 的产品。这里的契约是你粘贴到**你的**账户的内容。

[![CI](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml/badge.svg)](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://junze-xu.github.io/grok-bot-cn/)

## 快速开始

### 组建团队（推荐，无需 Node）

1. 在 Grok Bot 中：**新建 → 创建新智能体**，命名为 **Setup**。
2. 粘贴这个 URL 并发送：

```
https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md
```

3. 点击一个团队。试试 **Eng**（Bug 复现 + PR 审查）。
4. 连接所需的插件。**第一周只起草，不发送。**

Setup 会获取每个 Bot 的 `PROFILE.md`，不会凭空编造提示词。

### 使用单个 Bot

在 [Pages 目录](https://junze-xu.github.io/grok-bot-cn/) 选一张卡片，点击 **复制 PROFILE**，粘贴到 Bot 的「编辑个人资料」。

### 命令行

```bash
npx --yes github:junze-xu/grok-bot-cn list
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
npx --yes github:junze-xu/grok-bot-cn init --team eng --out ./eng-bots
```

## 核心概念

**校验**：每个契约通过 JSON Schema 校验与分享安全检查（无密钥、无内部 URL），CI 会拦截任何不通过的模板。

**自主性等级**：

| 等级 | 名称 | 第一周规则 |
|------|------|-----------|
| **L0** | 观察 | 只读、报告 |
| **L1** | 起草 | **默认等级。** 产生可审查的产出物 |
| **L2** | 审批后操作 | 聊天中明确批准后的指定写入 |
| **L3** | 定时执行 | 例行程序 + 缺数据策略 + 测试运行 |

**使用顺序**：先读手册 → 做草稿 → 用真实任务验证 → 修正 → 保存技能 → 用第二个输入测试 → 然后才是例行程序。详见 [SPEC.md](./SPEC.md)。

## 目录

**36 个模板 · 11 个团队 · 13 个技能 · 8 个例行程序**。所有模板均通过 schema 与安全校验。

| Bot | 用途 |
|-----|------|
| [PR 审查](templates/engineering/pr-reviewer/) | 审查令人担忧的 diff |
| [Bug 复现](templates/engineering/bug-reproduction/) | 预发布复现包，绝不用生产数据 |
| [执行助理](templates/ops/chief-of-staff/) | 仅包含与优先列表匹配的事项 |
| [选题雷达](templates/creator/trend-scout/) | 公开热点 → 带链接的选题清单 |
| [收件箱分类](templates/personal/inbox-triage/) | 分类与起草，绝不发送 |
| [研究助手](templates/research/research-desk/) | 主张、证据、分歧、未找到 |

所有卡片都带 **复制 PROFILE** 按钮，可直接粘贴到 Grok Bot。→ [完整目录](https://junze-xu.github.io/grok-bot-cn/)

## 机器 API

公开，无需认证。让 Bot 指向 [docs/agent.md](./docs/agent.md)。

| URL | 内容 |
|-----|------|
| https://junze-xu.github.io/grok-bot-cn/api/v1/status.json | 版本与能力 |
| https://junze-xu.github.io/grok-bot-cn/catalog.json | 完整目录 |
| https://junze-xu.github.io/grok-bot-cn/api/v1/teams.json | 团队 |
| https://junze-xu.github.io/grok-bot-cn/llms.txt | 机器可读摘要 |

## 安全

该目录在构造上是分享安全的，并在 CI 中进行密钥扫描。建议通过 GitHub 私有漏洞报告提交安全问题。

→ [docs/safety.md](./docs/safety.md) · [SECURITY.md](./SECURITY.md)

## 开发

```bash
git clone https://github.com/junze-xu/grok-bot-cn.git
cd grok-bot-cn
npm install
npm run ci
```

→ [ARCHITECTURE.md](./ARCHITECTURE.md) · [CONTRIBUTING.md](./CONTRIBUTING.md) · [ROADMAP.md](./ROADMAP.md) · [CHANGELOG.md](./CHANGELOG.md)

## 许可证

MIT © 2026 junze-xu
