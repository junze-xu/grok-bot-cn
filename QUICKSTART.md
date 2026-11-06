# 快速上手 —— 5 分钟

你需要 [Grok Bot](https://x.ai/bot)（桌面应用；Cursor / SuperGrok 合格套餐）。本目录不会替你运行 Bot。它给你一份可粘贴的操作契约。

## 方案 A —— 安装器 Bot（无需 Node）

1. 创建一个名为 `Setup` 的 Bot
2. 粘贴以下 URL 并发送：

```
https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md
```

3. 点击一个团队（试试 **Eng**）
4. 连接它列出的插件
5. 第一周停留在 L1

## 方案 B —— 单个 Bot，复制 PROFILE

浏览 [Pages 目录](https://junze-xu.github.io/grok-bot-cn/) 并点击 **复制 PROFILE**，或者：

```bash
npx --yes github:junze-xu/grok-bot-cn init pr-reviewer --print
```

1. 在 Grok Bot 中：**新建 → 创建新智能体**
2. **Bot 操作 → 编辑个人资料**
3. 命名为 `PR 审查`。把打印出的简介粘贴到描述中
4. 如果有的话，在「设置 → 插件」下连接 **GitHub**
5. 发送简介底部的首个任务
6. 在两次运行看起来正常之前，不要启用例行程序

## 方案 C —— 用 CLI 组建团队

```bash
npx --yes github:junze-xu/grok-bot-cn init --team eng --out ./eng-bots
```

从 `./eng-bots/*/PROFILE.md` 创建三个 Bot，把它们放进一个群组，粘贴 `TEAM.md` 启动词。

## 方案 D —— 给你写的契约打分

```bash
npx --yes github:junze-xu/grok-bot-cn new onboard-ledger --category ops
# 编辑 templates/ops/onboard-ledger/template.yaml
npx --yes github:junze-xu/grok-bot-cn score onboard-ledger
npx --yes github:junze-xu/grok-bot-cn validate
```

「就绪」意味着 **≥ 80** 且声明了自主性级别。

```bash
npx --yes github:junze-xu/grok-bot-cn score --badge --md
```

## 「第一周」指什么

读取并准备。做草稿，不发送。官方顺序：描述里的任务 → 一个真实任务 → 修正它 → 保存一个技能 → 用第二个输入测试 → 然后也许才是例行程序。

详情：[SPEC.md](./SPEC.md) · [docs/autonomy.md](./docs/autonomy.md) · [docs/safety.md](./docs/safety.md)
