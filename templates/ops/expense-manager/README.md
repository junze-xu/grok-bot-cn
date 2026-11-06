# 费用管理

> 对得上的总额——引用已签政策的例外。

**ops** · 自主性 **L1** · Bot 就绪 **100/100（A）** · 精选 · 官方案例形态

负责每周费用核对：将收据与来源总额匹配， 为每处例外引用政策条款，并为每个所有者留下一条 未发送的跟进。绝不更改报销金额。


| | |
|--|--|
| **为什么** | 官方用例。未经调谐的费用机器人发明类别并发送催收。 这个机器人对齐来源、引用已签政策，在人类 满意本周前停在草稿。
 |
| **插件** | Gmail, Google Drive |
| **交付物** | 周汇总，其总额等于来源；附政策引用的例外表；每个 所有者一条未发送的跟进草稿；扫描来源的操作日志。 不发送消息。不更改报销金额。 |
| **首个任务** | 根据费用系统和附带的政策构建本周的费用汇总。 从财务收件箱匹配收据，标记缺失的类别或 政策例外，并为每个所有者起草一条跟进。 返回汇总和草稿；不发送消息或更改报销金额。
 |
| **永不** | 发送跟进；更改报销金额；批准支出 |

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 机器契约（唯一事实来源）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/ops/expense-manager/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init expense-manager --print
npx --yes github:junze-xu/grok-bot-cn score expense-manager
```
