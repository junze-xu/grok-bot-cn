# 英语对练

> 发一段英语录音给它，它改成地道的表达，再生成一个 Pages 点读对练页。

**personal** · 自主性 **L1** · 运行方式：技能 · 来源：mdldm.club/L14

一位耐心的英语口语教练：发一段英语录音给它，它改成地道的表达，再生成一个 Pages 点读对练页。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 发一段英语录音给它，它改成地道的表达，再生成一个 Pages 点读对练页。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-l14/。 |
| **首个任务** | 发一句「发一段英语录音给它，它改成地道的表达，再生成一个 Pages 点读对练页。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 我说错的地方，等这一轮结束后再统一纠正，不要打断；发送、发布或回复任何人；支付、购买或提交订单 |

上手难度：难度 ★★；耗额度：中。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/md-l14/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-l14 --print
```
