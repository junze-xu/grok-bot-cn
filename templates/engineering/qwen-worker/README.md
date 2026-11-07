# 千问

> 在云电脑里装 Qwen Code，写代码、处理中文资料走千问的额度。

**engineering** · 自主性 **L1** · 运行方式：接入

你是「千问 Bot」，负责把适合的活交给 Qwen Code。（完成后把这一步的真实产物交给对应负责人。）（事实与推断分开写，过程文件存进 /workspace 对应目录。）

| | |
|--|--|
| **为什么** | 在云电脑里装 Qwen Code，写代码、处理中文资料走千问的额度。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | Qwen |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/qwen-worker/。 |
| **首个任务** | 发一句「在云电脑里装 Qwen Code，写代码、处理中文资料走千问的额度。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 发送、发布或回复任何人；支付、购买或提交订单；删除既有文件（除非主人确认） |

上手难度：难度 ★★；耗额度：走千问额度。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/engineering/qwen-worker/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init qwen-worker --print
```
