# 路线图

## 当前（v1.1.0）

- 规格、CLI、目录、团队、技能、例行程序、模式
- 37 个模板 / 12 个团队 / 14 个技能 / 8 个例行程序 / 12 个模式（已精简重构）
- 全中文化，面向国内用户；名称直白化（差旅审核、来源核查、执行助理等）
- 「运营团队」更名「行政采购团队」；新增自媒体团队（选题雷达 / 内容成稿 / 发布审稿）
- 新增「总裁办」（AI 总管 + 安装器 + Bot 管理）：规则名册与任务路由中枢，防上下文腐化
- 构造上即分享安全
- 安装器优先的 README + Pages 复制按钮
- 机器 API + Bot 加载指令（`docs/agent.md`）

## 下一步

- 发布 `@junze-xu/grokbot` 到 npm（`docs/publish-npm.md`；GitHub npx 今天已可用）
- 从干净账户生成 Setup + Eng 的 `x.ai/bot/<id>` 实时分享 URL（`docs/publish-share-links.md`）
- 国内社区推广：V2EX、少数派、掘金、知乎、微信公众号
- Hub 上架：RongleCat、ZeroPointRepo（`docs/listings/`）
- 首个现场案例：Eng 团队在真实 PR 上跑一周（`docs/field-cases/`）
- 转换器 CLI：`grokbot convert --from claude CLAUDE.md`
- 随 xAI 增加示例，覆盖更多官方案例
- 采用者名单（自愿加入）

## 以后

- 向 Grok Build 暴露目录的 MCP 服务器
- 例行程序成本估算器（tokens/周）
- 国内协同工具适配：飞书、企业微信、钉钉
- 更多中文场景模板（技术支持、运营自动化、内容审核）
- PROFILE.md 本地化（任务部分仍以英文优先）

不做计划：抓取私有分享链接；无人值守的生产改动者；没有任务的人设包。
