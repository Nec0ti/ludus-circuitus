import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { errorCatalog, ludusError, normalizeLudusError } from "../assets/js/errors.mjs";

test("diagnostics have stable codes, learner titles, and one matching docs page each", () => {
  const index = readFileSync(new URL("../docs/errors/index.md", import.meta.url), "utf8");
  for (const [code, definition] of Object.entries(errorCatalog)) {
    const file = new URL(`../docs/errors/${definition.slug}.md`, import.meta.url);
    assert.ok(existsSync(file), `${code} must have its own detail page`);
    assert.match(readFileSync(file, "utf8"), new RegExp(`permalink: /docs/errors/${definition.slug}/`));
    assert.ok(index.includes(code), `${code} must be listed in the catalog`);
  }
});

test("coded errors preserve their identifier and unknown exceptions stay generic", () => {
  const mismatch = ludusError("VL0001", "Kaynak 8 bit, hedef 1 bit.");
  assert.ok(mismatch instanceof Error);
  assert.equal(mismatch.code, "VL0001");
  assert.equal(normalizeLudusError(mismatch), mismatch);
  assert.equal(normalizeLudusError(new TypeError("private runtime details")).code, "VL9999");
  assert.doesNotMatch(normalizeLudusError(new TypeError("private runtime details")).message, /private runtime details/);
});
