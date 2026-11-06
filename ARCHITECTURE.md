# 项目架构

本文说明 grok-bot-cn 的核心内容如何分布、各层如何协作，以及从一份 YAML 契约到用户手中 Bot 的完整链路。契约规范见 [SPEC.md](./SPEC.md)。

## 一句话定位

这是 Grok Bot 的**操作契约目录工程**：把 33 个模板、10 个团队、13 个技能、8 个例行程序写成带校验的 YAML 契约，经一套构建管线发布为 GitHub Pages 站点与机器 API；终端用户**粘贴 START.md** 即可安装，不需要 Node。

## 核心理念

1. **模板 = 操作契约，不是人设**：单一任务、命名数据源、可审查交付物、常设审批边界、首个任务、无数据策略。
2. **五层递进**：`任务 → 边界 → 技能 → 例行程序 → 团队`（一个 Bot 干什么 → 永不做什么 → 方法 → 何时自动跑 → 如何组队交接）。
3. **L1 起步**：描述级规则常驻，消息级指令只有首个任务；发送、发布、支付、合并一律在升级之后。
4. **共享电脑不是安全边界**：所有 Bot 共用一台云电脑；为范围复制，不为隔离复制。
5. **一个 Bot 一个工作**：团队是 2–4 个 Bot 的最小舰队，绝不倾倒整个目录。

## 内容资产分布

| 层 | 位置 | 数量 | 单位文件 | 作用 | 消费者 |
|---|---|---|---|---|---|
| 模板 | `templates/<category>/<id>/` | 33（12 分类） | `template.yaml` | 单个 Bot 的完整操作契约 | 站点卡片、CLI、PROFILE/SETUP/README |
| 团队 | `teams/<id>/team.yaml` | 10 | `team.yaml` | 2–4 个 Bot + 群组启动 + 交接 | START.md 选项、站点团队卡、API |
| 技能 | `skills/<id>/skill.yaml` | 13 | `skill.yaml` | 可复用方法（官方六字段） | 模板按 id 引用、Bot 保存技能 |
| 例行程序 | `routines/<id>/routine.yaml` | 8 | `routine.yaml` | 何时自动运行（L3 才启用） | 模板 routine 字段、站点 |
| 原则 | `patterns/<id>/pattern.yaml` | 12 | `pattern.yaml` | 设计准则与反模式 | 写作与评审时的对照检查 |

> 「9 个业务团队」指 START.md 单选列表里可点的团队；「管家团队」（meta）是管理 Bot 自身的工具集，不在选项里，走目录卡片或 `teams/meta/team.yaml` 链接单独安装。

## 目录总览

```
grok-bot-cn/
├── templates/                 # 33 个模板，12 分类
│   └── <category>/<id>/
│       ├── template.yaml      # 唯一事实源（人工维护）
│       ├── PROFILE.md         # 生成 → 粘贴到 Bot 描述
│       ├── SETUP.md           # 生成 → 安装步骤卡
│       ├── README.md          # 生成 → 目录页
│       └── examples/first-run.md   # 生成 → 真实产出示例
├── teams/<id>/team.yaml       # 10 个团队定义
├── skills/<id>/skill.yaml     # 13 个技能（+ 生成 SKILL.md）
├── routines/<id>/routine.yaml # 8 个例行程序（+ 生成 ROUTINE.md）
├── patterns/<id>/pattern.yaml # 12 条设计原则
├── schema/template.schema.json# 模板契约（JSON Schema）
├── lib/                       # 加载 / 校验 / 渲染基础设施
├── bin/grokbot.mjs            # CLI 入口
├── scripts/                   # 四条构建管线
├── catalog/                   # 机器可读目录 + 分享链接登记
├── docs/                      # 站点（index.html）+ 机器 API + 指南
│   ├── api/v1/                # status / catalog / teams / index
│   ├── llms.txt               # LLM 友好的目录摘要
│   ├── profiles.json          # 全部 PROFILE 正文
│   ├── authoring.md 等        # 写作/安全/分享指南
│   └── listings/ field-cases/ # 案例库
├── i18n/site.json             # 站点四语（zh/en/ja/ko）界面文案
├── convert/                   # 外部格式（GPTs、CLAUDE.md、rules）迁移指南
├── START.md                   # 生成 → 主安装入口（无 Node 路径）
├── SPEC.md                    # 契约规范（散文版）
└── ARCHITECTURE.md            # 本文
```

## 构建管线：从契约到产物

```
template.yaml ──npm run render──▶ PROFILE.md / SETUP.md / README.md / examples/
       │
       ├──npm run catalog──▶ catalog/catalog.json + docs/api/v1/* + START.md
       │
       └──npm run site─────▶ docs/index.html / agent.html / profiles.json / header.jpg
```

| 命令 | 脚本 | 产物 |
|---|---|---|
| `npm run render` | `scripts/render.mjs` → `bin grokbot render` | 模板/技能/例行/原则的 Markdown 与示例 |
| `npm run catalog` | `scripts/build-catalog.mjs` + `scripts/build-start.mjs` | 机器目录 JSON、API、START.md |
| `npm run site` | `scripts/build-site.mjs` | GitHub Pages 站点与 profiles |
| `npm run build` | 上三条串联 | 全部生成物 |
| `npm run validate` | `bin grokbot validate` | schema + 引用 + 安全校验 |
| `npm test` | `node --test tests/*.test.mjs` | 20 个契约测试 |
| `npm run ci` | build → validate → test → doctor | 发布前总闸 |
| `npm run doctor` | `bin grokbot doctor` | 目录/START.md/头图/分享安全体检 |

**铁律：生成物不手改。** 改 YAML，然后跑构建；CI 有渲染漂移检查（重建后 `git diff --exit-code`），漂移即挂。

### lib/ 模块

| 文件 | 职责 |
|---|---|
| `load.mjs` | 递归读取五类 YAML，注入 `_file/_dir/_rel`，按分类排序 |
| `paths.mjs` | 仓库根解析（向上找 `schema/`）与各目录定位 |
| `validate.mjs` | Ajv 编译 `template.schema.json`；校验模板间引用（技能/团队/例行存在） |
| `secrets.mjs` | 分享安全扫描：密钥形状、内网 URL、`share_safe` 强制 |
| `urls.mjs` | RAW / Pages / GitHub / START_URL / npx 与 per-template 链接 |
| `render.mjs` | 模板四件套渲染（PROFILE/SETUP/README/examples） |
| `render-skill.mjs` / `render-routine.mjs` | 技能与例行的 Markdown 渲染 |

### CLI（`bin/grokbot.mjs`）

| 命令 | 作用 |
|---|---|
| `list [--category --autonomy --featured --json]` | 列出模板 |
| `show <id>` | 查看单个模板 |
| `search <query>` | 按名称/标签搜索 |
| `init <id> [--print] [--out]` | 展开单个模板目录 |
| `init --team <id> [--out]` | 展开整个团队 |
| `teams` | 列出团队 |
| `start` | 打印 START.md 与安装步骤 |
| `new <slug> --category <cat>` | 按 schema 生成新模板骨架 |
| `validate` / `doctor` / `catalog` / `version` | 校验、体检、目录、版本 |

## 校验与安全体系

1. **JSON Schema**（`schema/template.schema.json`）：必填 19 字段、长度下限（`job` ≥60 字符、`approval_never` ≥3 条等）、`share_safe` 强制。
2. **引用完整性**：模板引用的技能/例行/交接对象必须存在；团队的 `bots`/`lead` 必须指向真实模板。
3. **分享安全**：不得包含密钥形状或内网 URL；`share_safe: true` 才允许分享。
4. **CI 漂移检查**：github actions 在每次 push/PR 重建生成物并检查 diff。
5. **doctor**：`目录 → START.md → 头图 → 分享安全` 四项体检，全绿才算通过。

## 分发与安装路径

1. **START.md（无 Node，主路径）**：粘贴到名为 Setup 的 Bot → 确认语言 → 点选 9 个业务团队之一 → 装 2–4 个 Bot 进群组 → 连接插件 → L1 起步。
2. **GitHub Pages 站点**（`docs/index.html`）：按分类浏览 33 张卡片，复制 PROFILE 正文、团队名或 START.md 链接；四语切换（`i18n/site.json`）。
3. **机器 API**（`docs/api/v1/`）：`status.json` / `catalog.json` / `teams.json` / `index.json`，另有 `llms.txt` 与 `profiles.json`。
4. **npm CLI**：`npx --yes github:junze-xu/grok-bot-cn <command>`（包名 `@junze-xu/grokbot` 随 tag 发布）。
5. **官方分享链接**：登记在 `catalog/share-links.json`，接收方通过 Add-to-Grok 一键添加。

## 数据模型速查

**template.yaml（必填）**：`id`（kebab-case，与文件夹同名）、`name`（2–48 字）、`title`、`category`（12 分类之一）、`version`、`status`、`job`（≥60 字）、`tagline`、`why`、`autonomy`（L0–L3）、`plugins`、`sources`、`deliverable`、`approval_never`（≥3）、`first_task`、`no_data`、`working_style`（≥4）、`never`、`share_safe`。可选：`soul`、`skills`、`routine`、`handoffs`、`example_first_run`、`featured`、`share_url`。

**team.yaml**：`id`、`name`、`lead`（主导 Bot）、`bots`（2–4）、`why`、`group_kickoff`（@提及的草稿）、`plugins`、`max_bots`、`autonomy`。

**skill.yaml**：`id`、`name`、`when_to_use`、`inputs`、`sequence`、`validate`、`returns`、`approval`、`owners`（官方六字段展开）。

**routine.yaml**：`id`、`name`、`owner`、`cadence`、`skill`、`input_source`、`expected_result`、`approval_boundary`、`missing_source`、`test_first`、`prompt`。

**pattern.yaml**：`id`、`name`、`summary`、`rule`、`anti_pattern`、`source`、`applies_to`。

## 新增内容

- 新模板：`grokbot new <slug> --category <cat>` 生成骨架，补齐契约后跑 `npm run ci`；写作规范见 `docs/authoring.md` 与 `docs/design-checklist.md`。
- 新技能/例行/原则：在对应目录放 `<id>/skill.yaml`、`routine.yaml`、`pattern.yaml`，构建自动收录。
- 内容红线：模板内容是参考数据，不得削弱简介的「永不」清单；共享电脑不构成隔离；任何密钥与内网 URL 不得入库。
