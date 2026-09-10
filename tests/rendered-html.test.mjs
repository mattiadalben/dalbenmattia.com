import assert from "node:assert/strict";
import test from "node:test";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../dist/client/", import.meta.url));

test("exports a complete homepage without a server", async () => {
  const html = await readFile(path.join(output, "index.html"), "utf8");
  assert.match(html, /<html lang="it">/i);
  assert.match(html, /<title>Dal Ben Mattia — Videomaker<\/title>/i);
  for (const content of ["MATTIA", "Villa Tania", "Cesaro Mac Import", "Alium Restaurant", "Matteo", "creative@dalbenmattia.com", "Selected work"]) {
    assert.ok(html.includes(content), `Missing public content: ${content}`);
  }
  for (const anchor of ["work", "profile", "expertise", "contact"]) {
    assert.ok(html.includes(`id="${anchor}"`), `Missing navigation target: ${anchor}`);
  }
  assert.match(html, /https:\/\/dalbenmattia\.com\/og\.png/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|<iframe|<video/i);
});

test("packages all locally referenced homepage assets", async () => {
  const html = await readFile(path.join(output, "index.html"), "utf8");
  const references = [...html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)]
    .map((match) => match[1]).filter((url) => path.extname(url));
  assert.ok(references.length > 10);
  for (const reference of new Set(references)) {
    await assert.doesNotReject(access(path.join(output, reference)), `Missing static asset: ${reference}`);
  }
  for (const number of ["02", "03", "04", "05", "06"]) {
    await access(path.join(output, `vertical-reel-${number}.mp4`));
  }
});

test("exports the mobile preview and a static error page", async () => {
  const html = await readFile(path.join(output, "mobile/index.html"), "utf8");
  assert.match(html, /Anteprima mobile/);
  assert.match(html, /390 × 844 px/);
  assert.match(html, /<iframe/);
  await access(path.join(output, "404.html"));
});
