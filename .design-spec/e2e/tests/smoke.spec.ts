import { test, expect } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = path.resolve(__dirname, "../../..");
const alertDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/alert.html")
).href;

test.describe("Design-spec HTML demos (smoke)", () => {
  test("alert: live region mounts with role=alert", async ({ page }) => {
    await page.goto(alertDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot [role='alert']"),
      null,
      { timeout: 15_000 }
    );
    const live = page.locator("#liveRoot [role='alert']").first();
    await expect(live).toBeVisible();
  });

  test("alert: type select is keyboard-reachable", async ({ page }) => {
    await page.goto(alertDemo);
    await page.getByLabel("Alert type").focus();
    await expect(page.getByLabel("Alert type")).toBeFocused();
  });
});
