#!/usr/bin/env node
/**
 * Optional local layout snapshot: open an HTML file, sample computed styles on :root + [data-layout-snapshot].
 *
 * Usage (from .design-spec/checks after npm i):
 *   node export_computed_layout.mjs ../demos/pages/dashboard.html ./reports/layout-snapshot.json
 *
 * Figma side: export node metadata JSON manually or via MCP; pass to compare_layout_diff.mjs
 */
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";

const htmlPath = path.resolve(process.argv[2] || "");
const outPath = path.resolve(process.argv[3] || path.join("reports", "generated-layout.json"));

if (!htmlPath || !fs.existsSync(htmlPath)) {
  console.error("Usage: node export_computed_layout.mjs <path-to.html> [out.json]");
  process.exit(1);
}

const fileUrl = pathToFileURL(htmlPath).href;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(fileUrl, { waitUntil: "load" });

const box = await page.evaluate(() => {
  const pick = (el) => {
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      width: cs.width,
      height: cs.height,
      paddingTop: cs.paddingTop,
      paddingRight: cs.paddingRight,
      paddingBottom: cs.paddingBottom,
      paddingLeft: cs.paddingLeft,
      gap: cs.gap || null,
      fontSize: cs.fontSize,
      borderRadius: cs.borderRadius,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
    };
  };
  const root = document.documentElement;
  const marked = document.querySelector("[data-layout-snapshot]");
  return {
    viewport: { w: window.innerWidth, h: window.innerHeight },
    root: pick(root),
    snapshot: marked ? pick(marked) : null,
  };
});

await browser.close();

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ source: htmlPath, ...box }, null, 2), "utf-8");
console.log("Wrote", outPath);
