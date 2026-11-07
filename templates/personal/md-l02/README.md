# 冰箱菜谱

> 打开冰箱拍一张照片，它告诉你今晚能做哪三道菜、还缺什么，顺便列好购物清单。

**personal** · 自主性 **L1** · 精选 · 运行方式：技能

：打开冰箱拍一张照片，它告诉你今晚能做哪三道菜、还缺什么，顺便列好购物清单。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 打开冰箱拍一张照片，它告诉你今晚能做哪三道菜、还缺什么，顺便列好购物清单。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-l02/。 |
| **首个任务** | 发一句「打开冰箱拍一张照片，它告诉你今晚能做哪三道菜、还缺什么，顺便列好购物清单。」，用第一个真实任务跑通流程，把结果发回本对话。 |
| **永不** | 忌口 / 过敏：{{比如 不吃香菜、海鲜过敏}}；食材看起来不新鲜的，提醒我检查一下再用；发送、发布或回复任何人 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/md-l02/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-l02 --print
```
