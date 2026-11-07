# 视频解说

> 把一个视频做成中文解说视频。

**creator** · 自主性 **L1** · 运行方式：技能 · 来源：mdldm.club/C22

：把一个视频做成中文解说视频。（完成后把这一步的真实产物交给对应负责人。）（事实与推断分开写，过程文件存进 /workspace 对应目录。）

| | |
|--|--|
| **为什么** | 把一个视频做成中文解说视频。。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | GitHub |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-c22/。 |
| **首个任务** | 发一句「把一个视频做成中文解说视频。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 没有授权的影视剧、别人的视频，一律不做；解说稿要有自己的观点，不要只是复述；发送、发布或回复任何人 |

上手难度：难度 ★★★；耗额度：高。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/md-c22/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-c22 --print
```
