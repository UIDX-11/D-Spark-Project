import { test, expect } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = path.resolve(__dirname, "../../..");
const alertDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/alert.html")
).href;

test.describe("Screenshot baselines (PR gate)", () => {
  test("alert live preview", async ({ page }) => {
    await page.goto(alertDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot [role='alert']"),
      null,
      { timeout: 15_000 }
    );
    const live = page.locator("#liveRoot");
    await expect(live).toHaveScreenshot("alert-liveRoot.png");
  });
});
