# 参与贡献

本仓库是 Grok Bot 模板的**工程实践参考**，而不是人设的堆砌集合。

**维护者响应：** 文档和小 PR 会在 **48 小时内**得到首次回复。

## 贡献方式

| 贡献 | 位置 |
|--------------|-------|
| 新 Bot 模板 | `templates/<category>/<id>/template.yaml` |
| 团队 | `teams/<id>/team.yaml` |
| 技能 | `skills/<id>/skill.yaml` |
| 例行程序 | `routines/<id>/routine.yaml` |
| 设计模式 | `patterns/<id>/pattern.yaml` |
| 转换指南 | `convert/` |
| CLI / schema | `bin/`、`lib/`、`schema/` |

## 快速路径

```bash
npx --yes github:junze-xu/grok-bot-cn new my-job --category ops
# 编辑 template.yaml 直到：
npx --yes github:junze-xu/grok-bot-cn validate
npm run ci
```

开一个 PR。不要手工编辑 `PROFILE.md` —— CI 会重新生成它。

## 模板要求

每个新模板必须满足 [SPEC.md](./SPEC.md) 和 `schema/template.schema.json`：

1. 单一任务（可重复的产出）
2. 点名来源
3. 可审查的交付物
4. 常设 `approval_never`（视情况包含发送/支付/合并/发布/生产）
5. 首个任务
6. 无数据策略
7. `share_safe: true`
8. 首个运行的示例产出物
9. 第一周自主性为 **L1**，除非你同时提供了一个带缺失来源策略的例行程序

## 写作规则

- 工程优于炒作
- 失败与永不清单是一等公民
- 原创操作契约 —— 不要粘贴其他目录
- 避免明显的假名（`Acme North`、`PR #184`）
- 不含 API 密钥、客户数据、内部 URL

## 拉取请求清单

- [ ] `npm run ci`
- [ ] 已提交生成的 markdown
- [ ] 已加入 README 或目录的链接
- [ ] 涉及安全敏感的工作引用 [docs/safety.md](./docs/safety.md)

## 行为准则

[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)（Contributor Covenant）。

一句话：工程优于炒作；绝不容忍骚扰。
