import { test, expect } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = path.resolve(__dirname, "../../..");

/** 与 `figma_truth_table.json` 中已填 canonical 且 demo 稳定的 slug 对齐；可随 triad 闭项扩展。 */
const TRIAD_DEMO_SLUGS = ["alert", "button", "input"] as const;

function demoHref(slug: string): string {
  return pathToFileURL(path.join(repoRoot, ".design-spec/demos/components", `${slug}.html`)).href;
}

test.describe("Triad-aligned HTML demos (#liveRoot screenshot)", () => {
  for (const slug of TRIAD_DEMO_SLUGS) {
    test(`${slug} #liveRoot baseline`, async ({ page }) => {
      await page.goto(demoHref(slug));
      const live = page.locator("#liveRoot");
      await live.waitFor({ state: "visible", timeout: 15_000 });
      if (slug === "alert") {
        await page.waitForFunction(
          () => !!document.querySelector("#liveRoot [role='alert']"),
          null,
          { timeout: 15_000 }
        );
      } else if (slug === "button") {
        await page.waitForSelector("#liveRoot .ds-btn", { timeout: 15_000 });
      } else if (slug === "input") {
        await page.waitForSelector("#liveRoot .ds-input, #liveRoot input", { timeout: 15_000 });
      }
      await expect(live).toHaveScreenshot(`${slug}-liveRoot.png`);
    });
  }
});
