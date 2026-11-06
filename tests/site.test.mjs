import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { resolveRoot } from "../lib/paths.mjs";

const root = resolveRoot();
const html = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
const profiles = JSON.parse(
  fs.readFileSync(path.join(root, "docs/profiles.json"), "utf8")
);

test("catalog copies PROFILE body and START.md", () => {
  assert.match(html, /复制 PROFILE/);
  assert.match(html, /复制 START\.md/);
  assert.match(html, /如何安装此 Bot/);
  assert.match(html, /profiles\.json/);
  assert.match(html, /START\.md/);
});

test("catalog is color-coded by category", () => {
  assert.match(html, /--c-engineering/);
  assert.match(html, /--c-sales/);
  assert.match(html, /--c-marketing/);
  assert.match(html, /data-plugin="GitHub"/);
  assert.match(html, /从这里开始/);
});

test("profiles.json has gold templates", () => {
  assert.match(profiles["pr-reviewer"], /你是 \*\*PR 审查\*\*/);
  assert.match(profiles["inbox-triage"], /你是 \*\*收件箱分类\*\*/);
  assert.match(profiles["installer"], /你是 \*\*安装器\*\*/);
  assert.ok(Object.keys(profiles).length >= 28);
});

test("every catalog card has plugins and a first task", () => {
  assert.match(html, /data-plugins="GitHub"/);
  assert.match(html, /复制首个任务/);
  assert.match(html, /id="bot-pr-reviewer"/);
});
