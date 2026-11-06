# 适合新手的 issue

小型、可审查的贡献。先读 [CONTRIBUTING.md](../CONTRIBUTING.md) 和 [SPEC.md](../SPEC.md)。

## 最快路径

| Issue 类型 | 做什么 | 何时算完成 |
|------------|------------|------------|
| 转换一个提示词 | 按 [convert/](../convert/) 处理一个你已在运行的 Claude / ChatGPT / Cursor bot | `grokbot validate` 通过、L1、`share_safe: true` |
| 给公开分享链接打分 | 在 grokbot.dev 上挑一个 bot，写出它的永不清单缺了什么 | 评论或转换 PR，而不是粘贴他们的提示词 |
| 本地化 | 日文或中文 `PROFILE.md` 是生成的 —— 在 `docs/` 里为译者补充 `soul` / `tagline` 注释 | 一个模板、一种语言、不编造任务 |
| Pages 打磨 | 为 `examples/` 提供首个运行产出物的截图 | 只用假名（`Acme North`、`PR #184`） |

## 不适合新手的

- 新的市场 UI
- 抓取私有分享链接
- 会发送、支付或合并的 L3 例行程序
- 没有任务的人设包

带着模板开 issue，或直接从 `grokbot new` 开个 PR。
