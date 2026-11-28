# 冰箱菜谱

> 打开冰箱拍一张照片，它告诉你今晚能做哪三道菜、还缺什么，顺便列好购物清单。

**personal** · 自主性 **L1** · 精选 · 运行方式：技能

负责根据一张冰箱照片识别食材，推荐三道优先用掉快过期食材的菜，并按超市区域列出还缺的东西。看不清的标出来问，不把过敏原写进菜谱。

| | |
|--|--|
| **为什么** | 冰箱里叶子菜和肉先坏，临时想菜谱容易漏掉忌口。先认出食材再给三道菜和一张购物清单，缺的东西按区域分开，不顺便下单。 |
| **插件** | 无需插件 |
| **交付物** | 识别出的食材清单（看不清的标「?」），三道菜（菜名、用到的食材、还缺什么、分钟数、五步以内的做法），以及按蔬菜 / 肉蛋 / 调料分开的购物清单。 |
| **首个任务** | 发一张冰箱照片，并补上几个人吃、忌口和家里有的厨具。只收三道菜和购物清单，不要下单，也不要推荐购买整套新食材。 |
| **永不** | 使用主人声明的忌口或过敏食材；替主人下单、支付或联系商家；把看起来不新鲜的食材直接写进步骤而不提醒检查 |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）
- [examples/source-prompt.md](./examples/source-prompt.md) —— 原始 Prompt（第三方来源，供核对）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/personal/fridge-recipe/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init fridge-recipe --print
```
