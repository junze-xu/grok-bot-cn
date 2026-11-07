#!/usr/bin/env node
// 复制计数种子构建器。
//
// 数据源：snapshots/imported-counts.json（外部公开计数快照，2026-11-07）。
// 输出：
//   docs/counts.json   静态站点内嵌种子 / 机器 API（bots / teams / start）
//   worker/seed.json   Cloudflare KV 种子（含 known 白名单，见 worker/README.md）
//
// 映射规则（与 convert/import-bots.mjs 的 slug 一致）：
//   M01 → md-m01（Bot）· C11 → md-c11 · T01 → md-t01（功能组）· guide → start（START.md）
// 未在快照里出现的模板/团队以 0 补齐。站点计数只反映本站复制动作次数，不等于安装量。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAll } from "../lib/load.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = "snapshots/imported-counts.json";
const BLOB_KEY = "counts:v1";

export function slug(code) {
  return "md-" + String(code).toLowerCase().replace(/[^a-z0-9]/g, "");
}

export const COUNT_BLOB_KEY = BLOB_KEY;

export function buildCounts(rootDir = root) {
  const loaded = loadAll(rootDir);
  const botIds = [...loaded.templates.map((t) => t.id)].sort();
  const teamIds = [...loaded.teams.map((t) => t.id)].sort();
  const botSet = new Set(botIds);
  const teamSet = new Set(teamIds);

  let counts = {};
  let fetched = "";
  const snapFile = path.join(rootDir, SOURCE);
  if (fs.existsSync(snapFile)) {
    const snap = JSON.parse(fs.readFileSync(snapFile, "utf8"));
    counts = snap.counts || {};
    fetched = snap.fetched || "";
  }

  const bots = {};
  const teams = {};
  let start = 0;
  const unresolved = [];
  for (const [id, n] of Object.entries(counts)) {
    const count = Math.max(0, Number(n) || 0);
    if (id === "guide" || id === "start") {
      start += count;
      continue;
    }
    const mapped = slug(id);
    if (teamSet.has(mapped)) teams[mapped] = count;
    else if (botSet.has(mapped)) bots[mapped] = count;
    else unresolved.push(id);
  }
  for (const id of botIds) if (!(id in bots)) bots[id] = 0;
  for (const id of teamIds) if (!(id in teams)) teams[id] = 0;

  const today = new Date().toISOString().slice(0, 10);
  const payload = {
    generated: today,
    source: SOURCE,
    fetched,
    seed_note:
      "快照种子：来自公开计数快照，仅用于本站热度排序，不代表本站安装量。",
    totals: {
      templates: botIds.length,
      teams: teamIds.length,
      copies: Object.values(bots).reduce((a, b) => a + b, 0) +
        Object.values(teams).reduce((a, b) => a + b, 0) + start,
    },
    bots,
    teams,
    start,
  };
  const workerSeed = {
    version: 1,
    updated: new Date().toISOString(),
    seed_source: SOURCE,
    seed_fetched: fetched,
    known: { bot: botIds, team: teamIds },
    counts: { bot: bots, team: teams, start },
  };
  return { payload, workerSeed, unresolved, botIds, teamIds };
}

export function writeCounts(rootDir = root, result = buildCounts(rootDir)) {
  const docs = path.join(rootDir, "docs");
  fs.mkdirSync(docs, { recursive: true });
  fs.writeFileSync(
    path.join(docs, "counts.json"),
    JSON.stringify(result.payload, null, 2) + "\n"
  );
  const workerDir = path.join(rootDir, "worker");
  fs.mkdirSync(path.join(workerDir, "scripts"), { recursive: true });
  fs.writeFileSync(
    path.join(workerDir, "seed.json"),
    JSON.stringify(result.workerSeed, null, 2) + "\n"
  );
  return result;
}

function main() {
  const result = writeCounts(root);
  const t = result.payload.totals;
  console.log(
    `docs/counts.json  ${t.templates} 模板种子 · ${t.teams} 团队种子 · 拷贝总计 ${t.copies}`
  );
  console.log(`worker/seed.json  KV 种子（${COUNT_BLOB_KEY}）`);
  if (result.unresolved.length) {
    console.warn(`未映射的计数键（${result.unresolved.length}）：${result.unresolved.join(", ")}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
