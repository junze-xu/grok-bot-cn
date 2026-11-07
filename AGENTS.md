# AGENTS.md

## Test commands

```bash
npm test
npm run lint
npm run ci
```

There is no separate linter yet — `npm run ci` is validate + test + doctor + render drift check.
`worker/` is Cloudflare-deploy-only and not committed; when it is absent locally, `tests/worker.test.mjs` skips itself.

## Loop conventions

- Report-only week one (L1) before enabling auto-fix (L2) — same as loop-engineering.
- Templates: edit `template.yaml` only, then `npm run render`.
- Never commit secrets. `share_safe: true` is mandatory.
- Do not push generated PROFILE drift; CI fails if markdown is dirty.
- Count seeds: edit `snapshots/imported-counts.json` only, then `npm run counts`.
- `docs/counts.json` is generated (timestamps inside); never hand-edit or drift-check it. `worker/seed.json` is generated as well but only exists on the deployment machine (see `.gitignore`).

## Layout

- `templates/<category>/<id>/template.yaml` — source of truth
- `skills/`, `routines/`, `teams/`, `patterns/` — first-class assets
- `bin/grokbot.mjs` — CLI
- `SPEC.md` — binding schema in prose
- `scripts/build-counts.mjs` — snapshot → `docs/counts.json` + `worker/seed.json`
- `worker/` — Cloudflare Worker, deployment-only (counts + submit + auth; not committed, see `worker/README.md`)
- `docs/index.html` + `docs/api/v1/` — generated Pages installer and machine API
- Hero install path is START.md (no Node). Do not advertise unpublished npm as the primary CLI.
