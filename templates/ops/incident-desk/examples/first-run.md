# 示例首个运行 —— 故障追踪

## 时间线 — checkout 5xx（Acme North 流量）

时间窗口：8月11日 14:02–15:40 America/Johannesburg。频道：#inc-checkout（已批准）。

| 时间 | 来源 | 类型 | 备注 |
|---|---|---|---|
| 14:02 | Slack #inc-checkout | 事实 | Priya 呼叫「checkout 5xx 攀升」 |
| 14:11 | GitHub 部署 9c2a | 事实 | `checkout-api` 部署 PR #184 于 13:58 落地 |
| 14:18 | Slack | 假设 | Sam：「400 重试循环？」—未验证 |
| 14:41 | GitHub PR #184 | 事实 | retry.ts 重试 400 和 500；无幂等键 |
| 15:12 | Slack | 事实 | Jordan 通过现有手册回滚。Bot 未碰生产 |

**已陈述影响：** Slack 14:33 —「约12%结账失败」（Priya）。未独立验证。

**未解决问题**
- 是否观察到重复扣款？Slack 或 GitHub 中无。
- 谁拥有复盘文档？

**未找到：** 错误预算看板、客户名单、PagerDuty 日志。

已扫描：#inc-checkout、PR #184、部署 9c2a。未发布。生产未触碰。
