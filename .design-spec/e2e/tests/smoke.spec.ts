import { test, expect } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = path.resolve(__dirname, "../../..");
const alertDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/alert.html")
).href;
const buttonDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/button.html")
).href;
const breadcrumbDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/breadcrumb.html")
).href;
const badgeDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/badge.html")
).href;
const checkboxDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/checkbox.html")
).href;
const radioDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/radio.html")
).href;
const tagDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/tag.html")
).href;
const switchDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/switch.html")
).href;
const inputDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/input.html")
).href;
const sliderDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/slider.html")
).href;
const inputNumberDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/input-number.html")
).href;
const inputIpDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/input-ip.html")
).href;
const inputRangeDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/input-range.html")
).href;
const inputAdornmentDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/input-adornment.html")
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

  test("button: live preview mounts native button", async ({ page }) => {
    await page.goto(buttonDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot button.ds-btn"),
      null,
      { timeout: 15_000 }
    );
    const btn = page.locator("#liveRoot button.ds-btn").first();
    await expect(btn).toBeVisible();
  });

  test("button: variant select is keyboard-reachable", async ({ page }) => {
    await page.goto(buttonDemo);
    await page.getByLabel("Button demo variant").focus();
    await expect(page.getByLabel("Button demo variant")).toBeFocused();
  });

  test("breadcrumb: live mounts nav with accessible name", async ({ page }) => {
    await page.goto(breadcrumbDemo);
    await page.waitForFunction(
      () => !!document.querySelector('#liveRoot nav[aria-label="Breadcrumb"]'),
      null,
      { timeout: 15_000 }
    );
    const nav = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(nav).toBeVisible();
  });

  test("breadcrumb: separator select is keyboard-reachable", async ({ page }) => {
    await page.goto(breadcrumbDemo);
    await page.getByLabel("Breadcrumb demo separator").focus();
    await expect(page.getByLabel("Breadcrumb demo separator")).toBeFocused();
  });

  test("badge: live mounts status role badge", async ({ page }) => {
    await page.goto(badgeDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot .ds-badge[role='status']"),
      null,
      { timeout: 15_000 }
    );
    const bd = page.locator("#liveRoot .ds-badge[role='status']").first();
    await expect(bd).toBeVisible();
  });

  test("badge: kind select is keyboard-reachable", async ({ page }) => {
    await page.goto(badgeDemo);
    await page.getByLabel("Badge demo kind").focus();
    await expect(page.getByLabel("Badge demo kind")).toBeFocused();
  });

  test("checkbox: live mounts checkbox input", async ({ page }) => {
    await page.goto(checkboxDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot input#cbx[type='checkbox']"),
      null,
      { timeout: 15_000 }
    );
    const cb = page.locator("#liveRoot input#cbx");
    await expect(cb).toBeVisible();
  });

  test("checkbox: value select is keyboard-reachable", async ({ page }) => {
    await page.goto(checkboxDemo);
    await page.getByLabel("Checkbox demo value").focus();
    await expect(page.getByLabel("Checkbox demo value")).toBeFocused();
  });

  test("radio: live mounts radiogroup", async ({ page }) => {
    await page.goto(radioDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot [role='radiogroup']"),
      null,
      { timeout: 15_000 }
    );
    const rg = page.locator("#liveRoot [role='radiogroup']").first();
    await expect(rg).toBeVisible();
  });

  test("radio: style select is keyboard-reachable", async ({ page }) => {
    await page.goto(radioDemo);
    await page.getByLabel("Radio demo style").focus();
    await expect(page.getByLabel("Radio demo style")).toBeFocused();
  });

  test("radio: capsule size select is keyboard-reachable", async ({ page }) => {
    await page.goto(radioDemo);
    await page.getByLabel("Radio demo style").selectOption("capsule");
    await page.getByLabel("Radio demo capsule size").focus();
    await expect(page.getByLabel("Radio demo capsule size")).toBeFocused();
  });

  test("tag: live mounts status tag", async ({ page }) => {
    await page.goto(tagDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot .ds-tag.ds-tag--status[role='status']"),
      null,
      { timeout: 15_000 }
    );
    const t = page.locator("#liveRoot .ds-tag.ds-tag--status").first();
    await expect(t).toBeVisible();
  });

  test("tag: kind select is keyboard-reachable", async ({ page }) => {
    await page.goto(tagDemo);
    await page.getByLabel("Tag demo kind").focus();
    await expect(page.getByLabel("Tag demo kind")).toBeFocused();
  });

  test("switch: live mounts role=switch", async ({ page }) => {
    await page.goto(switchDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot button[role='switch']#dsSw"),
      null,
      { timeout: 15_000 }
    );
    const sw = page.locator("#liveRoot button#dsSw[role='switch']");
    await expect(sw).toBeVisible();
  });

  test("switch: variant select is keyboard-reachable", async ({ page }) => {
    await page.goto(switchDemo);
    await page.getByLabel("Switch demo variant").focus();
    await expect(page.getByLabel("Switch demo variant")).toBeFocused();
  });

  test("input: live mounts primary field", async ({ page }) => {
    await page.goto(inputDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot #inLive.ds-input"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #inLive")).toBeVisible();
  });

  test("input: size select is keyboard-reachable", async ({ page }) => {
    await page.goto(inputDemo);
    await page.getByLabel("Input demo size").focus();
    await expect(page.getByLabel("Input demo size")).toBeFocused();
  });

  test("slider: live mounts role=slider", async ({ page }) => {
    await page.goto(sliderDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot [role='slider']"),
      null,
      { timeout: 15_000 }
    );
    const th = page.locator("#liveRoot [role='slider']").first();
    await expect(th).toBeVisible();
  });

  test("slider: variant select is keyboard-reachable", async ({ page }) => {
    await page.goto(sliderDemo);
    await page.getByLabel("Slider demo variant").focus();
    await expect(page.getByLabel("Slider demo variant")).toBeFocused();
  });

  test("input-number: live mounts spinbutton", async ({ page }) => {
    await page.goto(inputNumberDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot [role='spinbutton']"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot [role='spinbutton']").first()).toBeVisible();
  });

  test("input-number: mode select is keyboard-reachable", async ({ page }) => {
    await page.goto(inputNumberDemo);
    await page.getByLabel("InputNumber mode").focus();
    await expect(page.getByLabel("InputNumber mode")).toBeFocused();
  });

  test("input-ip: live mounts IP group", async ({ page }) => {
    await page.goto(inputIpDemo);
    await page.waitForFunction(
      () => !!document.querySelector('#liveRoot .ds-input-ip[role="group"]'),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator('#liveRoot .ds-input-ip[role="group"]').first()).toBeVisible();
  });

  test("input-ip: size select is keyboard-reachable", async ({ page }) => {
    await page.goto(inputIpDemo);
    await page.getByLabel("Input IP demo size").focus();
    await expect(page.getByLabel("Input IP demo size")).toBeFocused();
  });

  test("input-range: live mounts range layout", async ({ page }) => {
    await page.goto(inputRangeDemo);
    await page.waitForFunction(
      () =>
        !!document.querySelector("#liveRoot .ds-ir-plain, #liveRoot .ds-ir-unit"),
      null,
      { timeout: 15_000 }
    );
    const any = page.locator("#liveRoot .ds-ir-plain, #liveRoot .ds-ir-unit").first();
    await expect(any).toBeVisible();
  });

  test("input-range: layout select is keyboard-reachable", async ({ page }) => {
    await page.goto(inputRangeDemo);
    await page.getByLabel("Input range demo layout").focus();
    await expect(page.getByLabel("Input range demo layout")).toBeFocused();
  });

  test("input-adornment: live mounts adornment row", async ({ page }) => {
    await page.goto(inputAdornmentDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot .ds-in-live-host .ds-in-row"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot .ds-in-live-host .ds-in-row").first()).toBeVisible();
  });

  test("input-adornment: variant select is keyboard-reachable", async ({ page }) => {
    await page.goto(inputAdornmentDemo);
    await page.getByLabel("Input adornment demo variant").focus();
    await expect(page.getByLabel("Input adornment demo variant")).toBeFocused();
  });
});
