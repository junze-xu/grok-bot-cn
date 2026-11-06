# 变更日志

## 未发布

- 「运营团队」更名为「行政采购团队」，职责口径写清（行政、费用、供应商），不再被误认为自媒体运营
- 新增「自媒体团队」（creator）：选题雷达、内容成稿、发布审稿——公开热点 → 多平台初稿 → 发布前审稿，全程 L1
- START.md 与安装器的可选团队同步为 10 个
- 移除 Bot 就绪评分：校验（schema + 安全）已完全兜底，评分卡与徽章下线
- START.md 先确认语言，团队选项双语显示
- Pages 目录：彩色类别条和插件标签、「从这里开始」横条、任务快捷入口、复制 PROFILE（正文）加复制 URL、每张卡片上的首个任务安装步骤
- 彩色头图艺术；`docs/profiles.json` 支持一键复制 PROFILE

## 1.1.0 —— 2026-08-29

- 安装器优先分发：START.md 成为主路径（无需 Node）
- Pages 目录复制原始 PROFILE URL；团队卡片复制 Setup 点击名
- 机器 API：`docs/catalog.json`、`docs/api/v1/*`、`docs/llms.txt`、`docs/agent.md`
- `grokbot score --badge` / `--md`（SVG + shields.io）
- 模板上可选的 `share_url` + `catalog/share-links.json`
- 记录 GitHub npx 为今天可用的 CLI；npm 发布随 `v*` 标签进行
- 发布笔记、Hub 上架简介、分享链接与 npm 发布手册

## 1.0.0 —— 2026-08-29

- 初始公开目录：经机器校验的 Grok Bot 操作契约
- CLI `@junze-xu/grokbot` —— list、show、init、teams、score、validate、doctor、start、new
- Bot 就绪评分（100 分制）与 L0–L3 自主性
- 团队、技能（官方六字段形态）、例行程序（`test_first: true`）、设计模式
- 面向 Grok Bot 的 START.md 安装器
- 转换指南（ChatGPT、Claude、Cursor、OpenClaw）
- GitHub Pages 目录
- CI：schema、密钥扫描、渲染漂移、测试
