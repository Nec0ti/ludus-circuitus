import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const css = readFileSync(new URL("../assets/css/input.css", import.meta.url), "utf8");
const theme = css.match(/@plugin "daisyui\/theme" \{\s*name: "ludus";([\s\S]*?)\n\}/)?.[1];
assert.ok(theme, "ludus theme exists");
const colors = Object.fromEntries([...theme.matchAll(/--color-([\w-]+):\s*(#[\da-f]{6})/gi)].map(([, name, value]) => [name, value]));

function luminance(hex) {
  const rgb = hex.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16) / 255).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

test("site palette keeps normal text and controls above WCAG contrast floors", () => {
  for (const surface of ["base-100", "base-200", "base-300"]) {
    assert.ok(contrast(colors["base-content"], colors[surface]) >= 4.5, `${surface} body text contrast`);
  }
  for (const accent of ["primary", "secondary", "accent"]) {
    assert.ok(contrast(colors[accent], colors["base-200"]) >= 4.5, `${accent} text contrast`);
    assert.ok(contrast(colors[`${accent}-content`], colors[accent]) >= 4.5, `${accent} button text contrast`);
  }
  assert.ok(contrast("#74877a", colors["base-200"]) >= 3, "strong circuit line contrast");
});

test("workbench microcopy colors stay readable on their dark panels", () => {
  const darkPanel = "#2c3a37";
  for (const color of ["#b9c1b7", "#c6d3c3"]) {
    assert.ok(contrast(color, darkPanel) >= 4.5, `${color} needs 4.5:1 against workbench panel`);
  }
});
