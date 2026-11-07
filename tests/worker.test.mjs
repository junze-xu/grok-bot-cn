// Cloudflare Worker 逻辑自测：用内存 KV 模拟 COUNTS_KV，直接驱动默认导出的 fetch。
// 覆盖：计数 +1、白名单、排行、批量 ingest、提交校验/回退、飞书 URL 校验与文本计数。
// worker/ 是部署专属、不入库；本地没有该目录时整组用例跳过。
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const workerUrl = new URL("../worker/src/index.js", import.meta.url);
const hasWorker = fs.existsSync(workerUrl);
const worker = hasWorker ? (await import(workerUrl)).default : null;

function harness(seed) {
  const store = new Map();
  if (seed) store.set("counts:v1", JSON.stringify(seed));
  const env = {
    COUNTS_KV: {
      get: async (k) => store.get(k) ?? null,
      put: async (k, v) => store.set(k, v),
    },
    AUTH_SECRET: "test-secret",
  };
  const call = async (method, path, body) => {
    const init = { method };
    if (body) {
      init.headers = { "Content-Type": "application/json" };
      init.body = JSON.stringify(body);
    }
    const res = await worker.fetch(new Request("https://counts.test" + path, init), env, {});
    return { status: res.status, body: await res.json() };
  };
  return { store, call };
}

const seeded = {
  version: 1,
  updated: "2026-11-07T00:00:00.000Z",
  known: { bot: ["known-bot", "md-m01"], team: ["md-t01"] },
  counts: { bot: { "known-bot": 5, "md-m01": 365 }, team: { "md-t01": 34 }, start: 24 },
};

test("未种子时开放计数：health / count / counts / rank / start", { skip: !hasWorker }, async () => {
  const { call } = harness(null);
  let r = await call("GET", "/api/v1/health");
  assert.equal(r.status, 200);
  assert.equal(r.body.seeded, false);

  r = await call("POST", "/api/v1/count", { id: "md-c11", kind: "bot" });
  assert.equal(r.status, 200);
  assert.equal(r.body.count, 1);
  r = await call("POST", "/api/v1/count", { id: "md-c11", kind: "bot" });
  assert.equal(r.body.count, 2);
  r = await call("POST", "/api/v1/count", { id: "start", kind: "start" });
  assert.equal(r.body.count, 1);

  r = await call("GET", "/api/v1/counts");
  assert.equal(r.body.counts.bot["md-c11"], 2);
  assert.equal(r.body.counts.start, 1);

  r = await call("GET", "/api/v1/rank?kind=bot&limit=5");
  assert.equal(r.body.items[0].id, "md-c11");
  assert.equal(r.body.items[0].count, 2);
});

test("种子后仅白名单计数，未知 id 被拒", { skip: !hasWorker }, async () => {
  const { call } = harness(seeded);
  let r = await call("POST", "/api/v1/count", { id: "md-c11", kind: "bot" });
  assert.equal(r.status, 404);
  r = await call("POST", "/api/v1/count", { id: "known-bot", kind: "bot" });
  assert.equal(r.status, 200);
  assert.equal(r.body.count, 6);
  r = await call("POST", "/api/v1/count", { id: "md-t01", kind: "team" });
  assert.equal(r.body.count, 35);
  r = await call("GET", "/api/v1/health");
  assert.equal(r.body.seeded, true);
});

test("批量 ingest 与非法入参", { skip: !hasWorker }, async () => {
  const { call } = harness(seeded);
  const r = await call("POST", "/api/v1/ingest", {
    items: [
      { id: "known-bot", kind: "bot" },
      { id: "nope", kind: "bot" },
      { id: "md-t01", kind: "team" },
    ],
  });
  assert.equal(r.body.counted, 2);
  assert.equal(r.body.failed, 1);
  const bad = await call("POST", "/api/v1/count", { id: "BAD ID", kind: "bot" });
  assert.equal(bad.status, 400);
});

test("提交校验：拒绝短文本；无凭据时回退草稿链接", { skip: !hasWorker }, async () => {
  const { call } = harness(seeded);
  let r = await call("POST", "/api/v1/submit", { name: "x", job: "太短" });
  assert.equal(r.status, 400);
  assert.ok(r.body.errors.length > 0);

  r = await call("POST", "/api/v1/submit", {
    name: "测试 Bot",
    title: "测试岗位",
    category: "ops",
    autonomy: "L1",
    job: "这是一个足够长的一句话任务描述，用来说明该 Bot 可重复产出的具体结果是什么，确保满足六十个字符的下限要求，让陌生同事也能一眼看懂这份契约在交付什么。",
    tagline: "不少于十二个字符的简介文本",
    why: "不少于十二个字符的理由说明",
    first_task: "在空白对话中发送这句话即可得到第一个可审查产出物。",
    approval_never: ["发送消息", "发布内容", "修改生产"],
    plugins: ["GitHub"],
    share_safe: true,
    author: "tester",
  });
  assert.equal(r.status, 503);
  assert.match(r.body.draft_url, /issues\/new/);
});

test("飞书/Lark 适配：URL 校验与文本计数", { skip: !hasWorker }, async () => {
  const { call } = harness(seeded);
  let r = await call("POST", "/api/v1/feishu", { type: "url_verification", challenge: "abc123" });
  assert.equal(r.body.challenge, "abc123");
  r = await call("POST", "/api/v1/feishu", { text: "我复制了 md-m01 和 md-c11" });
  assert.equal(r.body.counted, 1);
  assert.equal(r.body.hits[0].id, "md-m01");
  assert.equal(r.body.hits[0].count, 366);
  const get = await call("GET", "/api/v1/feishu");
  assert.equal(get.status, 200);
});
