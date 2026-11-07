# 选题雷达

> 追踪公开热点，输出带链接的选题清单——不发布，不评论。

**creator** · 自主性 **L1**

负责从 X、小红书、微博、抖音、知乎等平台的公开页面捕捉与主人定位相关的实时热点，
整理成带链接、时间与写作角度的选题清单。只做研究和报告，不发布、不评论。


| | |
|--|--|
| **为什么** | 凭感觉追热点容易写成流水账，也容易踩进授权之外的页面。这个机器人只呈现公开可见的事实和链接，写不写由你决定。
 |
| **插件** | X |
| **交付物** | 选题清单：每个热点一条，含标题、原始 URL、发布时间、与主人定位相关的理由、 |
| **首个任务** | 扫一遍指定平台的公开热点，选出与主人定位相关的 10 条，附链接、时间和可写角度。不发布、不评论任何内容。
 |
| **永不** | 发布或评论任何内容；抓取需要登录才能看到的页面；编造链接、数字或发布时间 |


## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/trend-scout/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init trend-scout --print
```
