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
const progressDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/progress.html")
).href;
const selectDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/select.html")
).href;
const dropdownDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/dropdown.html")
).href;
const menuDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/menu.html")
).href;
const messageDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/message.html")
).href;
const modalDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/modal.html")
).href;
const notificationDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/notification.html")
).href;
const pincodeDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/pincode.html")
).href;
const stepsDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/steps.html")
).href;
const cardDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/card.html")
).href;
const pageheaderDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/pageheader.html")
).href;
const cascaderDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/cascader.html")
).href;
const uploadDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/upload.html")
).href;
const tabsDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/tabs.html")
).href;
const treeDemo = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/components/tree.html")
).href;
const pageDashboard = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/pages/dashboard.html")
).href;
const pageDashboardTdesign = pathToFileURL(
  path.join(repoRoot, ".design-spec/demos/pages/archive/dashboard-tdesign-starter-base.html")
).href;
const pageList = pathToFileURL(path.join(repoRoot, ".design-spec/demos/pages/list.html")).href;
const pageForm = pathToFileURL(path.join(repoRoot, ".design-spec/demos/pages/form.html")).href;

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

  test("progress: live mounts progressbar", async ({ page }) => {
    await page.goto(progressDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot [role='progressbar']"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot [role='progressbar']").first()).toBeVisible();
  });

  test("progress: kind select is keyboard-reachable", async ({ page }) => {
    await page.goto(progressDemo);
    await page.getByLabel("Progress demo kind").focus();
    await expect(page.getByLabel("Progress demo kind")).toBeFocused();
  });

  test("select: live mounts combobox", async ({ page }) => {
    await page.goto(selectDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot [role='combobox']"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot [role='combobox']").first()).toBeVisible();
  });

  test("select: kind select is keyboard-reachable", async ({ page }) => {
    await page.goto(selectDemo);
    await page.getByLabel("Select demo kind").focus();
    await expect(page.getByLabel("Select demo kind")).toBeFocused();
  });

  test("dropdown: live mounts menu", async ({ page }) => {
    await page.goto(dropdownDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot [role='menu']"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot [role='menu']").first()).toBeAttached();
  });

  test("dropdown: variant select is keyboard-reachable", async ({ page }) => {
    await page.goto(dropdownDemo);
    await page.getByLabel("Dropdown demo variant").focus();
    await expect(page.getByLabel("Dropdown demo variant")).toBeFocused();
  });

  test("menu: live mounts menu root", async ({ page }) => {
    await page.goto(menuDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot #muRoot"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #muRoot").first()).toBeVisible();
  });

  test("menu: view and width selects are keyboard-reachable", async ({ page }) => {
    await page.goto(menuDemo);
    await page.getByLabel("Menu demo view").focus();
    await expect(page.getByLabel("Menu demo view")).toBeFocused();
    await page.getByLabel("Menu demo side width").focus();
    await expect(page.getByLabel("Menu demo side width")).toBeFocused();
  });

  test("message: live mounts message surface", async ({ page }) => {
    await page.goto(messageDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot .ds-msg"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot .ds-msg").first()).toBeVisible();
  });

  test("message: type select is keyboard-reachable", async ({ page }) => {
    await page.goto(messageDemo);
    await page.getByLabel("Message demo type").focus();
    await expect(page.getByLabel("Message demo type")).toBeFocused();
  });

  test("modal: live mounts open button and layer", async ({ page }) => {
    await page.goto(modalDemo);
    await page.waitForFunction(
      () =>
        !!document.querySelector("#liveRoot #dsmOpen") && !!document.querySelector("#liveRoot #dsmLayer"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #dsmOpen")).toBeVisible();
    await expect(page.locator("#liveRoot #dsmLayer")).toBeAttached();
  });

  test("modal: opening layer removes hidden", async ({ page }) => {
    await page.goto(modalDemo);
    await page.locator("#dsmOpen").click();
    await expect(page.locator("#dsmLayer")).not.toHaveAttribute("hidden");
  });

  test("modal: layout and width selects are keyboard-reachable", async ({ page }) => {
    await page.goto(modalDemo);
    await page.getByLabel("Modal demo layout").focus();
    await expect(page.getByLabel("Modal demo layout")).toBeFocused();
    await page.getByLabel("Modal demo width").focus();
    await expect(page.getByLabel("Modal demo width")).toBeFocused();
  });

  test("notification: live mounts notification root", async ({ page }) => {
    await page.goto(notificationDemo);
    await page.waitForFunction(
      () =>
        !!document.querySelector("#liveRoot #ntfRoot.ds-ntf") &&
        !!document.querySelector('#liveRoot [role="status"], #liveRoot [role="alert"]'),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #ntfRoot.ds-ntf").first()).toBeVisible();
  });

  test("notification: type select is keyboard-reachable", async ({ page }) => {
    await page.goto(notificationDemo);
    await page.getByLabel("Notification demo type").focus();
    await expect(page.getByLabel("Notification demo type")).toBeFocused();
  });

  test("pincode: live mounts OTP group", async ({ page }) => {
    await page.goto(pincodeDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot #pcGroup[role='group']"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #pcGroup[role='group']").first()).toBeVisible();
  });

  test("pincode: length select is keyboard-reachable", async ({ page }) => {
    await page.goto(pincodeDemo);
    await page.getByLabel("PinCode demo length").focus();
    await expect(page.getByLabel("PinCode demo length")).toBeFocused();
  });

  test("steps: live mounts step list with current step", async ({ page }) => {
    await page.goto(stepsDemo);
    await page.waitForFunction(
      () =>
        !!document.querySelector("#liveRoot #stNav ol.ds-st-list li[aria-current='step']"),
      null,
      { timeout: 15_000 }
    );
    await expect(
      page.locator("#liveRoot #stNav ol.ds-st-list li[aria-current='step']").first()
    ).toBeVisible();
  });

  test("steps: layout select is keyboard-reachable", async ({ page }) => {
    await page.goto(stepsDemo);
    await page.getByLabel("Steps demo layout").focus();
    await expect(page.getByLabel("Steps demo layout")).toBeFocused();
  });

  test("card: live mounts card surface", async ({ page }) => {
    await page.goto(cardDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot #cdRoot.ds-card"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #cdRoot.ds-card").first()).toBeVisible();
  });

  test("card: kind select is keyboard-reachable", async ({ page }) => {
    await page.goto(cardDemo);
    await page.getByLabel("Card demo kind").focus();
    await expect(page.getByLabel("Card demo kind")).toBeFocused();
  });

  test("pageheader: live mounts header with title", async ({ page }) => {
    await page.goto(pageheaderDemo);
    await page.waitForFunction(
      () => !!document.querySelector("#liveRoot #phRoot.ds-ph h1.ds-ph-title"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #phRoot.ds-ph h1.ds-ph-title").first()).toBeVisible();
  });

  test("pageheader: layout select is keyboard-reachable", async ({ page }) => {
    await page.goto(pageheaderDemo);
    await page.getByLabel("PageHeader demo layout").focus();
    await expect(page.getByLabel("PageHeader demo layout")).toBeFocused();
  });

  test("cascader: live mounts combobox and root", async ({ page }) => {
    await page.goto(cascaderDemo);
    await page.waitForFunction(
      () =>
        !!document.querySelector("#liveRoot #csRoot.ds-casc") &&
        !!document.querySelector("#liveRoot #csTrig[role='combobox']"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #csRoot.ds-casc").first()).toBeVisible();
    await expect(page.locator("#liveRoot #csTrig[role='combobox']").first()).toBeVisible();
  });

  test("cascader: mode and size selects are keyboard-reachable", async ({ page }) => {
    await page.goto(cascaderDemo);
    await page.getByLabel("Cascader demo mode").focus();
    await expect(page.getByLabel("Cascader demo mode")).toBeFocused();
    await page.getByLabel("Cascader demo size").focus();
    await expect(page.getByLabel("Cascader demo size")).toBeFocused();
  });

  test("upload: live mounts root and trigger", async ({ page }) => {
    await page.goto(uploadDemo);
    await page.waitForFunction(
      () =>
        !!document.querySelector("#liveRoot #uplRoot.ds-upl") &&
        !!document.querySelector("#liveRoot #uplTrig"),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #uplRoot.ds-upl").first()).toBeVisible();
    await expect(page.locator("#liveRoot #uplTrig").first()).toBeVisible();
  });

  test("upload: kind and size selects are keyboard-reachable", async ({ page }) => {
    await page.goto(uploadDemo);
    await page.getByLabel("Upload demo kind").focus();
    await expect(page.getByLabel("Upload demo kind")).toBeFocused();
    await page.getByLabel("Upload demo size").focus();
    await expect(page.getByLabel("Upload demo size")).toBeFocused();
  });

  test("tabs: live mounts tablist and root", async ({ page }) => {
    await page.goto(tabsDemo);
    await page.waitForFunction(
      () =>
        !!document.querySelector("#liveRoot #tbRoot.ds-tabs") &&
        !!document.querySelector('#liveRoot [role="tablist"]'),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #tbRoot.ds-tabs").first()).toBeVisible();
    await expect(page.locator('#liveRoot [role="tablist"]').first()).toBeVisible();
  });

  test("tabs: kind and size selects are keyboard-reachable", async ({ page }) => {
    await page.goto(tabsDemo);
    await page.getByLabel("Tabs demo kind").focus();
    await expect(page.getByLabel("Tabs demo kind")).toBeFocused();
    await page.getByLabel("Tabs demo size").focus();
    await expect(page.getByLabel("Tabs demo size")).toBeFocused();
  });

  test("tree: live mounts tree and treeitems", async ({ page }) => {
    await page.goto(treeDemo);
    await page.waitForFunction(
      () =>
        !!document.querySelector("#liveRoot #trRoot.ds-tree") &&
        !!document.querySelector('#liveRoot [role="tree"]') &&
        !!document.querySelector('#liveRoot [role="treeitem"]'),
      null,
      { timeout: 15_000 }
    );
    await expect(page.locator("#liveRoot #trRoot.ds-tree").first()).toBeVisible();
    await expect(page.locator('#liveRoot [role="treeitem"]').first()).toBeVisible();
  });

  test("tree: mode and size selects are keyboard-reachable", async ({ page }) => {
    await page.goto(treeDemo);
    await page.getByLabel("Tree demo mode").focus();
    await expect(page.getByLabel("Tree demo mode")).toBeFocused();
    await page.getByLabel("Tree demo size").focus();
    await expect(page.getByLabel("Tree demo size")).toBeFocused();
  });

  test("B-line page template: dashboard mounts shell", async ({ page }) => {
    await page.goto(pageDashboard);
    await expect(page.locator('[data-pt-template="dashboard"]')).toBeVisible();
    await expect(page.locator(".pt-app")).toBeVisible();
    await expect(page.locator(".pt-side")).toBeVisible();
    await expect(page.locator(".pt-side .pt-nav-group")).toHaveCount(3);
    await expect(page.locator("h1")).toContainText("仪表盘");
  });

  test("B-line page template: sidebar collapse toggle", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(pageDashboard);
    const toggle = page.locator("[data-pt-side-toggle]");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await toggle.click();
    await expect(page.locator(".pt-app.pt-side-collapsed")).toHaveCount(1);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(page.locator(".pt-app.pt-side-collapsed")).toHaveCount(0);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  test("B-line TDesign starter dashboard static page", async ({ page }) => {
    await page.goto(pageDashboardTdesign);
    await expect(page.locator(".pt-starter-dashboard")).toBeVisible();
    await expect(page.locator('[data-pt-template="tdesign-starter-dashboard"]')).toBeVisible();
    await expect(page.locator("#moneyContainer")).toBeVisible();
    await expect(page.getByRole("heading", { name: "销售订单排名" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "采购订单排名" })).toBeVisible();
  });

  test("B-line page template: header notify shows toast", async ({ page }) => {
    await page.goto(pageDashboard);
    await page.locator("[data-pt-notify]").click();
    await expect(page.locator("#ptToastHost .pt-toast")).toHaveCount(1);
  });

  test("B-line page template: list mounts table and pagination", async ({ page }) => {
    await page.goto(pageList);
    await expect(page.locator('[data-pt-template="list"]')).toBeVisible();
    await expect(page.locator("table.pt-table")).toBeVisible();
    await expect(page.locator(".pt-pagination")).toBeVisible();
  });

  test("B-line page template: form mounts form rows", async ({ page }) => {
    await page.goto(pageForm);
    await expect(page.locator('[data-pt-template="form"]')).toBeVisible();
    await expect(page.locator(".pt-form-row")).toHaveCount(4);
  });
});
