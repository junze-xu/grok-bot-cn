import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
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

test("pack cards offer member pick + crew command + START.md copy", () => {
  assert.match(html, /pack-card/);
  assert.match(html, /data-crew="eng"/);
  assert.match(html, /data-start="eng"/);
  assert.match(html, /data-member="bug-reproduction"/);
  assert.match(html, /data-i18n="packs\.copy_crew"/);
});

test("inline client script compiles (template-literal escapes not broken)", () => {
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length >= 1, "index.html 应至少包含一个内联脚本");
  for (const [, code] of scripts) {
    assert.doesNotThrow(() => new vm.Script(code), "内联客户端脚本语法必须可编译");
  }
});

test("pack card START.md button carries the full START.md text", () => {
  assert.match(html, /const START_MD = "# 开始/);
  assert.match(html, /专项组/);
});
