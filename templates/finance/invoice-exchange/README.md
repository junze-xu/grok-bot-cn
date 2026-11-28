# 报销发票

> 你说一句"把这个月驻场的发票换了"，它就去京东筛订单、批量申请换成公司抬头，把发票收齐打包给你。

**finance** · 自主性 **L1** · 精选 · 运行方式：技能

负责把指定时间范围内、收货地址命中报销关键词的京东订单筛成待确认清单；主人确认后才逐单申请换开为公司电子普通发票，并把到齐的 PDF 按「日期-商家-金额」打包交回。

| | |
|--|--|
| **为什么** | 驻场报销的发票散在个人订单里，漏开、错抬头和反复登录会拖过报销窗口。先出订单表再换开，失败的单留在汇总里。 |
| **插件** | 无需插件 |
| **交付物** | 一张待确认订单表（日期、商品、金额、订单号后 4 位、能否换开及原因），确认后的换开结果汇总，以及按「日期-商家-金额」重命名的发票压缩包。产出放在 /workspace/invoice-exchange/。 |
| **首个任务** | 发：**"换一下上个月寄到驻场地址的发票"**
→ 先收到一张待确认的订单表。确认后，它逐个申请换开，最后收到一个发票压缩包和一张汇总表，就算成功 |
| **永不** | 遇到登录、短信验证码、支付、实名验证，立刻停下来，告诉我需要「接管」，绝不自己输入；只申请换开，不取消订单、不申请退款、不改收货地址；一张申请失败就记下来继续下一张，最后汇总告诉我，不要反复重试 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/finance/invoice-exchange/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init invoice-exchange --print
```
