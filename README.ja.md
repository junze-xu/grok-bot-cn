<p align="center">
  <img src="assets/header.jpg" alt="Templates for Grok Bot" width="100%" />
</p>

# Grok Bot テンプレート集

<p align="center">
  <strong><a href="https://junze-xu.github.io/grok-bot-cn/">カタログを見る →</a></strong>
</p>

<p align="center">
  <a href="./README.md">中文</a> ·
  <a href="./README.en.md">English</a> ·
  <strong>日本語</strong> ·
  <a href="./README.ko.md">한국어</a>
</p>

> **リンクを貼り付け。使える Bot を手に入れよう。**

[Grok Bot](https://x.ai/bot) は xAI の永続的 AI チームメイトです。このリポジトリは既製の Bot 設定を提供します —— 何をやり、何をせず、どこから始めるかを明記しています。

Grok Bot の **タスク → 境界 → スキル → ルーチン → チーム** ツールキット。[loop-engineering](https://github.com/junze-xu/loop-engineering)（内側ループ）と [outerloop](https://github.com/junze-xu/outerloop)（証拠 → 判定）と理念を補完。

> xAI とは無関係です。Grok Bot は xAI / Cursor の製品。ここにある契約は**あなたの**アカウントに貼るものです。

[![CI](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml/badge.svg)](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://junze-xu.github.io/grok-bot-cn/)

## クイックスタート

### チームを構築（推奨、Node 不要）

1. Grok Bot で：**新規 → エージェントを作成**。**Setup** と名付けます。
2. この URL を貼り付けて送信：

```
https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md
```

3. チームをクリック。**Eng**（バグ再現 + PR レビュー）から試す。
4. 求められるプラグインを接続。**最初の 1 週間は下書きのみ、送信しない。**

Setup は各 Bot の `PROFILE.md` を取得。プロンプトを捏造することはありません。

### 単一 Bot を使う

[Pages カタログ](https://junze-xu.github.io/grok-bot-cn/) でカードを選び、**PROFILE をコピー** をクリック。Bot の「プロフィール編集」に貼り付け。

### CLI

```bash
npx --yes github:junze-xu/grok-bot-cn list
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
npx --yes github:junze-xu/grok-bot-cn init --team eng --out ./eng-bots
```

## 中核概念

**検証**：各契約は JSON Schema 検証と共有安全チェック（secret なし、内部 URL なし）に合格。CI は不合格のテンプレートをブロック。

**自律レベル**：

| レベル | 名前 | 最初の 1 週間のルール |
|--------|------|----------------------|
| **L0** | 観察 | 読み取り専用、報告 |
| **L1** | 下書き | **デフォルト。** レビュー可能な成果物 |
| **L2** | 承認後操作 | チャットで明示的に承認後の指定された書き込み |
| **L3** | 定時実行 | ルーチン + データなし方針 + テスト実行 |

**導入順序**：ハンドブックを読む → 下書き → 実タスクで検証 → 修正 → スキル保存 → 2 つ目の入力でテスト → その後ルーチン。詳細は [SPEC.md](./SPEC.md)。

## カタログ

**37 テンプレート · 12 チーム · 14 スキル · 8 ルーチン**。すべてのテンプレートはスキーマと安全チェックに合格。

| Bot | 用途 |
|-----|------|
| [PR レビュー](templates/engineering/pr-reviewer/) | 気になる差分をレビュー |
| [バグ再現](templates/engineering/bug-reproduction/) | リリース前再現パック、本番データは使わない |
| [CEO 補佐](templates/ops/chief-of-staff/) | 優先リストと一致するものだけ |
| [トレンドスカウト](templates/creator/trend-scout/) | 公開トレンド → リンク付きの選題リスト |
| [AI チーフ](templates/meta/chief-of-ai/) | ルール台帳とタスク振り分け、伝言のみ |
| [受信トレイ仕分け](templates/personal/inbox-triage/) | 仕分けと下書き、送信しない |
| [リサーチデスク](templates/research/research-desk/) | 主張、証拠、相違点、未発見 |

すべてのカードに **PROFILE をコピー** ボタンあり。→ [完全なカタログ](https://junze-xu.github.io/grok-bot-cn/)

## マシン API

公開、認証不要。Bot を [docs/agent.md](./docs/agent.md) に向けさせてください。

| URL | 内容 |
|-----|------|
| https://junze-xu.github.io/grok-bot-cn/api/v1/status.json | バージョンと機能 |
| https://junze-xu.github.io/grok-bot-cn/catalog.json | 完全なカタログ |
| https://junze-xu.github.io/grok-bot-cn/api/v1/teams.json | チーム |
| https://junze-xu.github.io/grok-bot-cn/llms.txt | マシン可読要約 |

## 安全性

構造的に共有安全で、CI でシークレットスキャン。脆弱性は GitHub プライベート脆弱性報告で提出。

→ [docs/safety.md](./docs/safety.md) · [SECURITY.md](./SECURITY.md)

## 開発

```bash
git clone https://github.com/junze-xu/grok-bot-cn.git
cd grok-bot-cn
npm install
npm run ci
```

→ [CONTRIBUTING.md](./CONTRIBUTING.md) · [ROADMAP.md](./ROADMAP.md) · [CHANGELOG.md](./CHANGELOG.md)

## ライセンス

MIT © 2026 junze-xu
