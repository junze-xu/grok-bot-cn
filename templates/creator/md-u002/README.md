# 微信全能捕手(铁柱老师微信BOT优化版)

> 把微信公众号文章和视频号分享链接原样抓成 Markdown、图片、原视频与逐字稿，也能给其他 Bot 供稿。

**creator** · 自主性 **L1** · 运行方式：技能

$18：把微信公众号文章和视频号分享链接原样抓成 Markdown、图片、原视频与逐字稿，也能给其他 Bot 供稿。（完成后把这一步的真实产物交给对应负责人。）

| | |
|--|--|
| **为什么** | 把微信公众号文章和视频号分享链接原样抓成 Markdown、图片、原视频与逐字稿，也能给其他 Bot 供稿。把这一步做成可重复、可审查的产出，代替每次手搓。 |
| **插件** | 无需插件 |
| **交付物** | 一份可交付给主人的成果与一句回执，事实与推断分开。产出存放在 /workspace/md-u002/。 |
| **首个任务** | 随便发一条微信公众号文章链接（mp.weixin.qq.com/s/...）或视频号分享链接（weixin.qq.com/sph/...），能收到原样 Markdown+本地图片压缩包，或通过 ffprobe 校验的 mp4 视频文件，即搭建成功。 |
| **永不** | 发送、发布或回复任何人；支付、购买或提交订单；删除既有文件（除非主人确认） |

上手难度：难度 ★；耗额度：低。

## 文件

- [PROFILE.md](./PROFILE.md) —— 粘贴到 Bot 描述中
- [SETUP.md](./SETUP.md) —— 插件、首个任务、技能、例行程序
- [template.yaml](./template.yaml) —— 唯一事实来源（机器可读）

## 安装

把原始 PROFILE 粘贴到 **Bot 操作 → 编辑个人资料**，或把此 URL 发给名为 Setup 的 Bot：

https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/templates/creator/md-u002/PROFILE.md

安装器：https://raw.githubusercontent.com/junze-xu/grok-bot-cn/main/START.md

CLI（可选）：

```bash
npx --yes github:junze-xu/grok-bot-cn init md-u002 --print
```
