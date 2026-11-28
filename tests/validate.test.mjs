import test from "node:test";
import assert from "node:assert/strict";
import { loadAll } from "../lib/load.mjs";
import { validateLoaded } from "../lib/validate.mjs";
import { resolveRoot } from "../lib/paths.mjs";
import { renderProfile } from "../lib/render.mjs";
import { findSecrets } from "../lib/secrets.mjs";

const loaded = loadAll(resolveRoot());

test("catalog loads templates", () => {
  assert.ok(loaded.templates.length >= 151, "catalog shrank below the current template set");
  assert.ok(loaded.teams.length >= 16);
});

test("validate has no errors", () => {
  const r = validateLoaded(loaded);
  assert.equal(
    r.errors.length,
    0,
    r.errors.map((e) => `${e.file}: ${e.msg}`).join("\n")
  );
});

test("validateLoaded can run twice in one process", () => {
  const again = validateLoaded(loaded);
  assert.equal(again.errors.length, 0);
});

test("stable and featured templates have no import filler", () => {
  for (const t of loaded.templates) {
    if (t.status !== "stable" && t.featured !== true) continue;
    const blob = [t.job, t.why, t.deliverable, t.example_first_run].join("\n");
    assert.doesNotMatch(blob, /原设定的验收话术/);
    assert.doesNotMatch(blob, /把这一步做成可重复、可审查的产出，代替每次手搓/);
    assert.doesNotMatch(blob, /一份可交付给主人的成果与一句回执/);
    assert.doesNotMatch(t.job, /^[。：，、]/);
  }
});

test("ids unique and folder-aligned", () => {
  const ids = loaded.templates.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("gold templates exist", () => {
  for (const id of [
    "installer",
    "pr-reviewer",
    "sales-outbound",
    "chief-of-staff",
    "research-desk",
  ]) {
    assert.ok(
      loaded.templates.some((t) => t.id === id),
      `missing gold template ${id}`
    );
  }
});

test("PROFILE render includes standing boundary", () => {
  const t = loaded.templates.find((x) => x.id === "pr-reviewer");
  const md = renderProfile(t);
  assert.match(md, /审批边界/);
  assert.match(md, /- 合并/);
  assert.match(md, /L1 草稿/);
});

test("no secret-like strings in catalog yaml", () => {
  const hits = [];
  for (const t of loaded.templates) {
    hits.push(...findSecrets(t._raw, t._file));
  }
  assert.equal(hits.length, 0, JSON.stringify(hits));
});

test("featured templates have example first runs", () => {
  for (const t of loaded.templates.filter((x) => x.featured)) {
    assert.ok(
      (t.example_first_run || "").length >= 80,
      `${t.id} featured without example`
    );
  }
});

test("teams reference real bots and include lead", () => {
  const ids = new Set(loaded.templates.map((t) => t.id));
  for (const team of loaded.teams) {
    assert.ok(team.bots.includes(team.lead), team.id);
    for (const b of team.bots) {
      assert.ok(ids.has(b), `${team.id} unknown bot ${b}`);
    }
    assert.ok(team.bots.length <= team.max_bots, team.id);
  }
});

test("routines require test_first and known owners", () => {
  const ids = new Set(loaded.templates.map((t) => t.id));
  const skills = new Set(loaded.skills.map((s) => s.id));
  for (const r of loaded.routines) {
    assert.equal(r.test_first, true, r.id);
    if (r.owner) assert.ok(ids.has(r.owner), r.owner);
    if (r.skill) assert.ok(skills.has(r.skill), r.skill);
  }
});
