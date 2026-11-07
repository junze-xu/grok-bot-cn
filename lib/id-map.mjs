// 源快照代码 → 仓库语义化 ID。
//
// 源数据：snapshots/imported-bots.json / snapshots/imported-counts.json（公开数据快照）。
// 仓库内的模板/团队目录与 YAML 一律使用语义化 ID（见下表右列）。
//
// 用法：
//   import { CODE_TO_ID, toId } from "./id-map.mjs";
//   const id = toId("C11"); // → "topic-miner"
//
// 新增导入条目时：先在此登记代码映射，再跑 convert/import-bots.mjs。
// 未登记的代码 toId() 返回 null，调用方必须显式处理（不要把原始代码当 ID 写入目录）。

export const CODE_TO_ID = {
  // ---- 管家（meta / base）----
  M01: "task-dispatcher", // 总管 Bot：任务分流与派单
  M02: "settings-memory-backup", // 记忆管家：Bot 设定与记忆备份
  M03: "bot-recruiter", // 招聘官：新 Bot 需求澄清与创建
  M04: "roster-report", // 花名册：Bot 团队名册周报
  M05: "quota-warden", // 额度管家：团队额度监控与预警
  M06: "cron-inspector", // 每日巡检：定时任务健康巡检
  M07: "bot-scorecard", // 绩效考核：Bot 周度考核与精简建议
  M08: "external-access-audit", // 安全审计：外部授权与登录状态月审

  // ---- 功能组（teams / team）----
  T01: "podcast-desk", // 口播编辑部（自媒体）
  T02: "multi-channel-desk", // 一稿多发组（自媒体 + 设计）
  T03: "launch-desk", // 上新组（电商）
  T04: "job-hunt-desk", // 求职组（通用办公）

  // ---- 算力接入（compute）----
  K01: "openrouter-offload", // 杂活哥（OpenRouter）
  K02: "deepseek-worker",
  K03: "claude-code-worker",
  K04: "codex-worker",
  K05: "gemini-worker",
  K06: "kimi-worker",
  K07: "qwen-worker", // 千问
  K08: "muse-worker",
  K09: "nano-banana-image", // Nano Banana 生图

  // ---- 代码附录（coding）----
  D01: "github-cli",
  D02: "code-hygiene", // 代码洁癖
  D03: "superpowers-advisor", // superpowers 军师
  D04: "dev-role-quad", // 研发四角色组
  D05: "deploy-runbook",
  D06: "error-oncall", // 报错值守
  D07: "site-inspector", // 网站巡检
  D08: "browser-automation", // 真浏览器

  // ---- 财务（finance）----
  F01: "invoice-exchange", // 报销发票
  F02: "invoice-collector", // 发票收集
  F03: "expense-report-builder", // 报销单
  F04: "subscription-tracker", // 订阅哨兵
  F05: "ledger-reconciler", // 对账

  // ---- 电商（ecom）----
  E01: "shop-daily-report", // 店铺数据日报
  E02: "ecom-competitor-watch", // 竞品监控
  E03: "bad-review-alert", // 差评预警
  E04: "cs-reply-draft", // 客服草稿
  E05: "launch-copy", // 上新文案
  E06: "product-compare", // 选品比价
  E07: "livestream-review", // 直播复盘

  // ---- 设计（design）----
  S01: "xiaohongshu-cards", // 小红书图文
  S02: "cover-designer", // 封面
  S03: "brand-asset-keeper", // 品牌素材管家
  S04: "web-prototype", // 网页原型
  S05: "landing-page-builder", // 落地页
  S06: "realtime-design-cards", // 设计卡片（Connect Apps）
  S07: "avatar-logo-maker", // 头像 / Logo

  // ---- 创作者（creator）----
  C01: "x-trend-radar", // X 热点雷达
  C02: "peer-weekly-digest", // 同行周报
  C03: "social-stats-daily", // 自媒体数据日报
  C04: "comment-faq", // 评论 FAQ
  C05: "group-chat-daily", // 群聊日报
  C06: "publish-scheduler", // 发布排期
  C07: "wechat-article-capture", // 公众号捕手
  C08: "xiaohongshu-bookmark", // 小红书收藏夹
  C09: "web-clipper", // 网页剪藏
  C10: "knowledge-drip", // 知识库投喂
  C11: "topic-miner", // 个人选题（口播第 1 棒）
  C12: "tutorial-scriptwriter", // 录屏教程编剧（第 2 棒）
  C13: "spark-to-script", // 灵感成稿（第 2 棒备选）
  C14: "hook-rewriter", // 开头钩子（第 3 棒）
  C15: "script-doctor", // 口播体检（第 4 棒）
  C16: "de-ai-polish", // 去 AI 味定稿（最后一棒）
  C17: "longform-writer", // 长文写手
  C18: "wechat-pipeline", // 公众号一条龙
  C19: "wechat-typesetter", // 公众号排版
  C20: "viral-breakdown", // 爆款拆解
  C21: "video-clipper", // 切片
  C22: "video-commentary", // 视频解说
  C23: "brand-deal-scout", // 商单初筛
  C24: "course-qa", // 课程答疑
  U001: "x-growth-cmo", // X 运营首席营销官
  U002: "wechat-media-harvester", // 微信全能捕手

  // ---- 通用办公（office）----
  G01: "weekly-report-drafter", // 周报
  G02: "skill-apprentice", // 学徒
  G03: "email-secretary", // 邮箱秘书
  G04: "meeting-action-dispatch", // 会议纪要派活
  G05: "feishu-cli", // 飞书
  G06: "ppt-builder", // PPT
  G07: "deep-research", // 深度调研
  G08: "resume-tailor", // 简历
  G09: "job-radar", // 岗位雷达
  G10: "contract-review", // 合同审阅
  G11: "expiry-reminder", // 到期提醒
  G12: "event-signup", // 活动报名
  G13: "credential-auditor", // 密码管家
  G14: "tencent-meeting", // 腾讯会议
  G15: "dingtalk-connector", // 钉钉
  G16: "wecom-connector", // 企业微信
  G17: "tencent-docs", // 腾讯文档

  // ---- 生活（life / personal）----
  L01: "xianyu-lister", // 闲鱼哥
  L02: "fridge-recipe", // 冰箱菜谱
  L03: "scam-shield", // 长辈防骗
  L04: "weather-outfit", // 天气穿搭
  L05: "morning-briefing", // 晨报管家
  L06: "evening-journal", // 睡前复盘
  L07: "price-watchdog", // 降价盯梢
  L08: "parcel-tracker", // 快递追踪
  L09: "rental-radar", // 租房雷达
  L10: "show-alert", // 演出上新提醒
  L11: "anniversary-reminder", // 纪念日提醒
  L12: "family-ledger", // 家庭账本
  L13: "trip-itinerary", // 出行管家
  L14: "english-speaking-coach", // 英语对练
  L15: "fortune-teller", // 算命
  L16: "fitness-coach", // 健身教练
  L17: "homework-tutor", // 作业辅导
  L18: "self-study-course", // 自学课程
  L19: "reading-notes", // 读书
  L20: "checkup-translator", // 体检报告翻译官
  L21: "earnings-red-flags", // 财报排雷
  L22: "side-hustle-checkup", // 副业诊断
  L23: "workout-report", // 运动报告
  L24: "tone-echo-replier", // 分身回信
  L25: "werewolf-judge", // 狼人杀法官
  L26: "manual-keeper", // 说明书管家
  L27: "outfit-advisor", // 穿搭顾问
};

/** 快照代码 → 仓库 ID；未登记返回 null。 */
export function toId(code) {
  const key = String(code || "").trim().toUpperCase();
  return CODE_TO_ID[key] || null;
}
