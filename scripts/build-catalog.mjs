#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAll } from "../lib/load.mjs";
import { validateLoaded } from "../lib/validate.mjs";
import { buildCatalog, loadShareLinks } from "../lib/catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const loaded = loadAll(root);
const result = validateLoaded(loaded);
if (result.errors.length) {
  for (const e of result.errors) console.error(e.file, e.msg);
  process.exit(1);
}
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const { catalog, api, status, index, llms } = buildCatalog(loaded, {
  version: pkg.version,
  shareLinks: loadShareLinks(root),
});

const dir = path.join(root, "catalog");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n");

const docs = path.join(root, "docs");
fs.mkdirSync(path.join(docs, "api", "v1"), { recursive: true });
fs.writeFileSync(path.join(docs, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n");
fs.writeFileSync(path.join(docs, "api", "v1", "catalog.json"), JSON.stringify(api, null, 2) + "\n");
fs.writeFileSync(
  path.join(docs, "api", "v1", "teams.json"),
  JSON.stringify({ api_version: "v1", count: catalog.teams.length, items: catalog.teams }, null, 2) + "\n"
);
fs.writeFileSync(path.join(docs, "api", "v1", "status.json"), JSON.stringify(status, null, 2) + "\n");
fs.writeFileSync(path.join(docs, "api", "v1", "index.json"), JSON.stringify(index, null, 2) + "\n");
fs.writeFileSync(path.join(docs, "llms.txt"), llms);

console.log(`catalog.json  ${catalog.templates.length} templates`);
