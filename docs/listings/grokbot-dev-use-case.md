---
type: use-case
slug: scored-grok-bot-cn
headline: 粘贴一个 URL，点击 Eng，得到一个可评分的 Grok Bot 团队
summary: "junze-xu/grok-bot-cn 是一个可评分的 Grok Bot 操作契约目录 —— 任务、永不清单、默认 L1、CI。把 START.md 粘贴到名为 Setup 的 Bot，点击一个团队，它会抓取 PROFILE.md 而不是编造提示词。"
categories: [engineering, work]
format: use-case
source_tweets:
  - url: REPLACE_WITH_LAUNCH_TWEET_URL
    author_handle: REPLACE
    excerpt: "Stop pasting vibes into Grok Bot."
    posted_at: "2026-08-29T00:00:00Z"
author:
  handle: junze-xu
  url: https://github.com/junze-xu
  platform: github
prompt_provenance: author
replicability: "创建一个名为 Setup 的 Bot，粘贴 START.md 原始 URL，点击 Eng。无需 Node。停留在 L1。"
added_at: "2026-08-29T00:00:00Z"
updated_at: "2026-08-29T00:00:00Z"
status: proposed
---

## 它是怎么搭起来的

1. 安装 Grok Bot，创建一个名为 **Setup** 的 Bot。
2. 粘贴 `https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md` 并发送。
3. 点击 **Eng**。Setup 从抓取的 PROFILE.md 文件创建 Bug 复现、Issue 起草和 PR 审查 —— 它不编造提示词。
4. 在「设置 → 插件」下连接 GitHub。
5. 第一周停留在 L1：可审查的产出物，不合并，Bot 不发 GitHub 评论。
6. 可选：浏览 https://junze-xu.github.io/grok-bot-cn/ 并为单个 Bot 复制原始 PROFILE URL。

## 提示词

```text
https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md
```

## 为什么它很酷

大多数 Grok Bot 目录优化的是发现。这个目录在「人设没有任务、没有永不清单、没有首个任务就发布」时会让 CI 失败。安装器只需一次粘贴，契约可在 git 中审查，而且第一周有意只做草稿。
