# 编写一个模板

1. `npx --yes github:junze-xu/grok-bot-cn new my-job --category ops`
2. 替换 `template.yaml` 中的每一个占位字符串。
3. `npm run render && npx grokbot score my-job && npx grokbot validate`
4. 开一个 PR。CI 会重新渲染，若漂移或分数 < 80 则失败。

## 写作规则

- 拥有**结果**，而非部门。「排名式的账户健康观察清单」胜过「客户成功助手」。
- 默认 **L1**。L3 需要带缺失来源策略的例行程序。
- 每个永不清单至少包含以下之一：发送、支付、合并、发布、生产。
- `example_first_run` 要像一份人类可以接受或拒绝的真实产出物。
- 不含密钥、不含 localhost、不含看起来真实的客户名。使用明显的假名（`Acme North`、`PR #184`）。
- 不要从其他 GitHub 目录复制简介。按官方任务形态编写操作契约。

## 保持打开的官方来源

- [入门](https://docs.x.ai/grok-bot/get-started)
- [Bot](https://docs.x.ai/grok-bot/bots)
- [用例](https://docs.x.ai/grok-bot/use-cases)
- [技能与例行程序](https://docs.x.ai/grok-bot/skills-routines-and-automations)
- [电脑与应用](https://docs.x.ai/grok-bot/computer-and-apps)
- [审批](https://docs.x.ai/grok-bot/approvals-security-and-privacy)
- [聊天与协作](https://docs.x.ai/grok-bot/chat-and-collaboration)
- [文件与结果](https://docs.x.ai/grok-bot/files-and-results)
