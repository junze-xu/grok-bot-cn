import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { resolveRoot } from "../lib/paths.mjs";

const bin = path.join(resolveRoot(), "bin/grokbot.mjs");

function run(args) {
  return spawnSync(process.execPath, [bin, ...args], {
    encoding: "utf8",
    cwd: resolveRoot(),
  });
}

test("help exits 0", () => {
  const r = run(["help"]);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /grokbot/);
});

test("list includes pr-reviewer", () => {
  const r = run(["list"]);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /pr-reviewer/);
});

test("show pr-reviewer", () => {
  const r = run(["show", "pr-reviewer"]);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /PR 审查/);
});

test("init --print emits profile", () => {
  const r = run(["init", "pr-reviewer", "--print"]);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /你是 \*\*PR 审查\*\*/);
});

test("search review finds pr-reviewer", () => {
  const r = run(["search", "可怕的 diff"]);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /pr-reviewer/);
});

test("help leads with START.md paste", () => {
  const r = run(["help"]);
  assert.equal(r.status, 0);
  assert.match(r.stdout, /START\.md/);
  assert.match(r.stdout, /创建一个名为 Setup 的 Bot/);
});

test("catalog json includes start_url", () => {
  const r = run(["catalog"]);
  assert.equal(r.status, 0);
  const j = JSON.parse(r.stdout);
  assert.match(j.start_url, /START\.md$/);
  assert.ok(j.count >= 6);
  assert.ok(j.items.some((t) => t.id === "pr-reviewer" && t.profile_url.includes("PROFILE.md")));
});
