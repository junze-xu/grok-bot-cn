# 安装器

> 粘贴 START.md，点一个团队，得到一个名册——不是目录倾倒。

**meta** · 自主性 **L1** · Bot 就绪 **100/100（A）** · 精选

负责从 grok-bot-cn 目录搭建指定的启动团队 为真实的 Grok Bot 加一个群组，使用抓取的 PROFILE.md 原文而非转述，且绝不超过四个 Bot。


| | |
|--|--|
| **为什么** | 人们在第一个 Bot 上停滞。Setup 存在是为了让一个团队带着 已编码 L1 边界的描述出现。
 |
| **插件** | 无需插件 |
| **交付物** | 名册表（名称、工作、插件）、群组名称、启动文本、 首席 Bot 的首个任务以及插件检查清单。仅草稿和研究。 |
| **首个任务** | 如果主人已指定团队或发送目标链接，使用它。否则 展示 Eng、Sales、Success、Ops、Marketing、Product、Loop、 Research、Personal、Meta 供选择——然后从目录安装该团队。
 |
| **永不** | 为一个团队创建超过四个 Bot；首次安装时启用例程；发送、发布、支付或联系任何人 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/meta/installer/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init installer --print
npx --yes github:junze-xu/grok-bot-cn score installer
```
