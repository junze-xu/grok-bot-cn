<p align="center">
  <img src="assets/header.jpg" alt="Templates for Grok Bot" width="100%" />
</p>

# Grok Bot Templates

<p align="center">
  <strong><a href="https://junze-xu.github.io/grok-bot-cn/">Browse the catalog →</a></strong>
</p>

<p align="center">
  <a href="./README.md">中文</a> ·
  <strong>English</strong> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a>
</p>

> **Paste a link. Get a working Bot.**

[Grok Bot](https://x.ai/bot) is xAI's persistent AI teammate. This repo provides ready-made Bot configs, each spelling out what it does, what it never does, where to start, and its Bot-Ready score.

This is the Grok Bot **task → boundary → skill → routine → team** toolkit, conceptually complementary to [loop-engineering](https://github.com/junze-xu/loop-engineering) (inner loop) and [outerloop](https://github.com/junze-xu/outerloop) (evidence → verdict).

> Not affiliated with xAI. Grok Bot is a product of xAI / Cursor. These contracts are what you paste into **your** account.

[![CI](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml/badge.svg)](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![bot ready](https://junze-xu.github.io/grok-bot-cn/badge.svg)](https://junze-xu.github.io/grok-bot-cn/)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://junze-xu.github.io/grok-bot-cn/)

## Quick Start

### Build a team (recommended, no Node)

1. In Grok Bot: **New → Create new agent**, name it **Setup**.
2. Paste this URL and send it:

```
https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md
```

3. Pick a team. Try **Eng** (Bug Reproduction + PR Review).
4. Connect the plugins it asks for. **Week one: draft only, never send.**

Setup fetches each Bot's `PROFILE.md` — it never invents prompts.

### Use a single Bot

Pick a card in the [Pages catalog](https://junze-xu.github.io/grok-bot-cn/), click **Copy PROFILE**, and paste it into the Bot's Edit Profile.

### CLI

```bash
npx --yes github:junze-xu/grok-bot-cn list
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
npx --yes github:junze-xu/grok-bot-cn init --team eng --out ./eng-bots
npx --yes github:junze-xu/grok-bot-cn score pr-reviewer --badge
```

## Core Concepts

**Bot-Ready score**: every contract is scored out of 100 across job, data sources, never-do list, deliverable, first task, and more. **≥ 80 means ready.** CI blocks templates below that threshold.

**Autonomy levels**:

| Level | Name | Week-one rule |
|-------|------|---------------|
| **L0** | Observe | Read-only, report |
| **L1** | Draft | **Default.** Produce reviewable output |
| **L2** | Act after approval | Named writes after explicit approval in chat |
| **L3** | Scheduled | Routines + no-data policy + test run |

**Adoption order**: read the handbook → draft → validate with a real task → fix → save a skill → test with a second input → then routines. See [SPEC.md](./SPEC.md).

## Catalog

**33 templates · 10 teams · 13 skills · 8 routines.** All stable templates meet the Bot-Ready standard (≥80/100).

| Bot | Purpose |
|-----|---------|
| [PR Review](templates/engineering/pr-reviewer/) | Reviews the worrying diff |
| [Bug Reproduction](templates/engineering/bug-reproduction/) | Pre-release repro packs, never production data |
| [Chief of Staff](templates/ops/chief-of-staff/) | Only what matches the priority list |
| [Inbox Triage](templates/personal/inbox-triage/) | Triage and draft, never send |
| [Research Desk](templates/research/research-desk/) | Claim, evidence, disagreement, not found |

Every card has a **Copy PROFILE** button — paste it straight into Grok Bot. → [Full catalog](https://junze-xu.github.io/grok-bot-cn/)

## Machine API

Public, no auth. Point your bot at [docs/agent.md](./docs/agent.md).

| URL | Content |
|-----|---------|
| https://junze-xu.github.io/grok-bot-cn/api/v1/status.json | Version and capabilities |
| https://junze-xu.github.io/grok-bot-cn/catalog.json | Full catalog |
| https://junze-xu.github.io/grok-bot-cn/api/v1/teams.json | Teams |
| https://junze-xu.github.io/grok-bot-cn/llms.txt | Machine-readable summary |

## Safety

Share-safe by construction, with secret scanning in CI. Report vulnerabilities via GitHub Private Vulnerability Reporting.

→ [docs/safety.md](./docs/safety.md) · [SECURITY.md](./SECURITY.md)

## Development

```bash
git clone https://github.com/junze-xu/grok-bot-cn.git
cd grok-bot-cn
npm install
npm run ci
```

→ [CONTRIBUTING.md](./CONTRIBUTING.md) · [ROADMAP.md](./ROADMAP.md) · [CHANGELOG.md](./CHANGELOG.md)

## License

MIT © 2026 junze-xu
