# Convert

Turn an existing agent file into a Grok Bot `template.yaml` that passes validation.

Memory and local files do **not** move. Only the operating contract.

| From | Guide |
|------|--------|
| Generic system prompt | [generic.md](./generic.md) |
| ChatGPT custom GPT | [chatgpt.md](./chatgpt.md) |
| Claude Code / CLAUDE.md | [claude.md](./claude.md) |
| Cursor rules | [cursor.md](./cursor.md) |
| OpenClaw / Hermes SOUL.md | [openclaw.md](./openclaw.md) |

Always finish with:

```bash
npx --yes github:junze-xu/grok-bot-cn new converted-job --category ops
# paste the extracted fields into template.yaml
npx --yes github:junze-xu/grok-bot-cn validate
```

Default autonomy **L1**. If the source agent could send mail or push to main, that capability does **not** come across. You add it later as a named L2 action.
