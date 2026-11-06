<p align="center">
  <img src="assets/header.jpg" alt="Templates for Grok Bot" width="100%" />
</p>

# Grok Bot 템플릿

<p align="center">
  <strong><a href="https://junze-xu.github.io/grok-bot-cn/">카탈로그 보기 →</a></strong>
</p>

<p align="center">
  <a href="./README.md">中文</a> ·
  <a href="./README.en.md">English</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <strong>한국어</strong>
</p>

> **링크를 붙여넣으세요. 실행 가능한 Bot을 얻으세요.**

[Grok Bot](https://x.ai/bot)은 xAI의 지속적 AI 팀원입니다. 이 저장소는 준비된 Bot 설정을 제공합니다 —— 무엇을 하고, 무엇을 하지 않으며, 어디서 시작하고, 준비 점수가 얼마인지 명시합니다.

Grok Bot의 **작업 → 경계 → 스킬 → 루틴 → 팀** 툴킷. [loop-engineering](https://github.com/junze-xu/loop-engineering)(내부 루프)과 [outerloop](https://github.com/junze-xu/outerloop)(증거 → 판정)과 이념상 보완 관계.

> xAI와 제휴 관계 아님. Grok Bot은 xAI / Cursor의 제품. 여기 있는 계약은 **당신의** 계정에 붙여넣는 것입니다.

[![CI](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml/badge.svg)](https://github.com/junze-xu/grok-bot-cn/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![bot ready](https://junze-xu.github.io/grok-bot-cn/badge.svg)](https://junze-xu.github.io/grok-bot-cn/)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://junze-xu.github.io/grok-bot-cn/)

## 빠른 시작

### 팀 구성 (추천, Node 불필요)

1. Grok Bot에서: **새로 만들기 → 새 에이전트 만들기**. **Setup**으로 이름 지정.
2. 이 URL을 붙여넣고 보내기:

```
https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md
```

3. 팀 클릭. **Eng**(버그 재현 + PR 리뷰)부터 시도.
4. 요청한 플러그인 연결. **첫 주는 초안만, 전송 안 함.**

Setup은 각 Bot의 `PROFILE.md`를 가져옵니다. 프롬프트를 만들어내지 않습니다.

### 단일 Bot 사용

[Pages 카탈로그](https://junze-xu.github.io/grok-bot-cn/)에서 카드를 고르고 **PROFILE 복사**를 클릭. Bot의 "프로필 편집"에 붙여넣기.

### CLI

```bash
npx --yes github:junze-xu/grok-bot-cn list
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
npx --yes github:junze-xu/grok-bot-cn init --team eng --out ./eng-bots
npx --yes github:junze-xu/grok-bot-cn score pr-reviewer --badge
```

## 핵심 개념

**Bot 준비 점수**: 각 계약은 100점 만점으로 평가. 작업, 데이터 소스, 하지 않을 것, 산출물, 첫 작업 등. **≥ 80이면 준비 완료**. CI는 그 미만의 템플릿을 차단합니다.

**자율 수준**:

| 수준 | 이름 | 첫 주 규칙 |
|------|------|-----------|
| **L0** | 관찰 | 읽기 전용, 보고 |
| **L1** | 초안 | **기본값.** 검토 가능한 산출물 |
| **L2** | 승인 후 작업 | 채팅에서 명시적 승인 후 지정된 쓰기 |
| **L3** | 예약 실행 | 루틴 + 데이터 없음 정책 + 테스트 실행 |

**도입 순서**: 핸드북 읽기 → 초안 작성 → 실제 작업으로 검증 → 수정 → 스킬 저장 → 두 번째 입력으로 테스트 → 그 다음 루틴. 자세한 내용은 [SPEC.md](./SPEC.md).

## 카탈로그

**33개 템플릿 · 10개 팀 · 13개 스킬 · 8개 루틴**. 모든 안정 템플릿은 Bot 준비 기준(≥80/100) 충족.

| Bot | 용도 |
|-----|------|
| [PR 리뷰](templates/engineering/pr-reviewer/) | 걱정되는 diff 리뷰 |
| [버그 재현](templates/engineering/bug-reproduction/) | 출시 전 재현 팩, 프로덕션 데이터 사용 안 함 |
| [CEO 보좌](templates/ops/chief-of-staff/) | 우선순위 목록과 일치하는 것만 |
| [받은편지함 분류](templates/personal/inbox-triage/) | 분류 및 초안, 전송 안 함 |
| [리서치 데스크](templates/research/research-desk/) | 주장, 증거, 이견, 미발견 |

모든 카드에 **PROFILE 복사** 버튼 있음. → [전체 카탈로그](https://junze-xu.github.io/grok-bot-cn/)

## 머신 API

공개, 인증 불필요. Bot을 [docs/agent.md](./docs/agent.md)로 향하게 하세요.

| URL | 내용 |
|-----|------|
| https://junze-xu.github.io/grok-bot-cn/api/v1/status.json | 버전 및 기능 |
| https://junze-xu.github.io/grok-bot-cn/catalog.json | 전체 카탈로그 |
| https://junze-xu.github.io/grok-bot-cn/api/v1/teams.json | 팀 |
| https://junze-xu.github.io/grok-bot-cn/llms.txt | 머신 판독 요약 |

## 안전

구조적으로 공유 안전하며 CI에서 시크릿 스캔. 취약점은 GitHub Private Vulnerability Reporting으로 제출.

→ [docs/safety.md](./docs/safety.md) · [SECURITY.md](./SECURITY.md)

## 개발

```bash
git clone https://github.com/junze-xu/grok-bot-cn.git
cd grok-bot-cn
npm install
npm run ci
```

→ [CONTRIBUTING.md](./CONTRIBUTING.md) · [ROADMAP.md](./ROADMAP.md) · [CHANGELOG.md](./CHANGELOG.md)

## 라이선스

MIT © 2026 junze-xu
