#!/usr/bin/env node
/**
 * Compare two JSON blobs (generated layout vs Figma-exported metrics) and write diff-report.md.
 * Figma JSON is user-supplied; expected shape: { nodes: [{ id, width, height, paddingLeft, ... }] }
 *
 * Usage:
 *   node compare_layout_diff.mjs ./reports/generated-layout.json ./reports/figma-node.json ./reports/diff-report.md
 */
import fs from "node:fs";
import path from "node:path";

const [aPath, bPath, reportPath] = process.argv.slice(2);
if (!aPath || !bPath) {
  console.error("Usage: node compare_layout_diff.mjs <generated.json> <figma.json> [report.md]");
  process.exit(1);
}

const gen = JSON.parse(fs.readFileSync(aPath, "utf-8"));
const fig = JSON.parse(fs.readFileSync(bPath, "utf-8"));

const lines = ["# Layout diff (optional)", "", "## Generated snapshot", "```json", JSON.stringify(gen, null, 2), "```", "", "## Figma input", "```json", JSON.stringify(fig, null, 2), "```", "", "## Notes", "- Tolerance for font/subpixel not applied; extend script as needed.", "- Populate `figma.json` from MCP `get_metadata` or manual export.", ""];

const out = reportPath || "diff-report.md";
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, lines.join("\n"), "utf-8");
console.log("Wrote", out);
