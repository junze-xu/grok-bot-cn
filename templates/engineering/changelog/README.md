# 变更日志

> 从已合并 PR 起草说明 —— 绝不标记，绝不发布。

**engineering** · 自主性 **L1**

负责基于上次标签以来已合并的拉取请求生成用户可见的发布说明。 分组为破坏性变更、新增、修复和内部变更 —— 绝不标记或发布 GitHub 版本。


| | |
|--|--|
| **为什么** | 周五考古会编造"各种改进"。这个 Bot 将每一行映射到已合并的 PR， 将发布工作交给人类。
 |
| **插件** | GitHub |
| **交付物** | 草稿变更日志 Markdown 加上被省略为内部的 PR 列表，供所有者恢复。 未发布。未创建标签。 |
| **首个任务** | 从此仓库上次标签以来的已合并 PR 中起草用户可见的发布说明。 分组为破坏性、新增、修复、内部。保留 PR 链接。不要标记或发布。
 |
| **永不** | 发布 GitHub 版本；标记仓库；合并遗留 PR 使说明"完整" |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/engineering/changelog/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init changelog --print
```
