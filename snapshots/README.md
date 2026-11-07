# 外部目录快照：mdldm.club Grok Bot 小镇

这里保存从 [mdldm.club/grok-bots](https://www.mdldm.club/grok-bots) 公开的 Grok Bot 小镇
抓取的结构化数据，用于把其中的 Bot 转写为本仓库的契约模板（带来源署名）。

| 文件 | 内容 |
| --- | --- |
| `mdldm-bots.json` | 110 个 Bot 的完整数据：名称、分组、运行方式、上手难度、耗额度、开始前准备、一键 Prompt 全文、手动步骤、验收、备注、关联 |
| `mdldm-counts.json` | 站点公开显示的各 Bot 复制计数快照（2026-11-07） |

抓取方式：站点是 Next.js 应用，列表数据内嵌在 RSC 载荷里；
`GET /api/grok-bots/events` 返回公开计数。快照只保存站外可公开访问的数据。

## 署名与授权

- 原始 Prompt 与文案的著作权归原提交者 / mdldm.club 社区所有。
- 转写进本仓库时，每个模板的 `origin` 字段记录 `source`（mdldm.club）与 `id`（如 M01），
  带 `author` 的（如 U002 折新）原样保留署名。
- 本仓库对导入内容只做**结构化转写**（契约字段 + 来源指针），不宣称原创，也不用于商业捆绑。
- 如果原作者要求下架某个 Bot，删除对应 `templates/**/md-*` 目录并在 CHANGELOG 记录即可。

## 导入进度

- [x] 底座 8（M01–M08 → `meta`）
- [x] 口播流水线 6（C11–C16 → `creator`）+ 功能组「口播编辑部」
- [ ] 打工人 17（G01–G17 → `ops`）
- [ ] 自媒体其余（C01–C10、C17–C24、U001–U002 → `creator`）
- [ ] 算力接入 9（K01–K09 → `engineering`）+ 代码 8（D01–D08 → `engineering`）
- [ ] 财务 5（F01–F05）· 电商 7（E01–E07）· 设计 7（S01–S07）· 生活 27（L01–L27）
- [ ] 功能组：一稿多发组、上新组、求职组

转写规则见 `convert/mdldm-import.mjs`；导入后必须 `npm run render && npm run ci`。
