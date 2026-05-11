# Design-spec checks

- **`scan_token_violations.py`** — token 治理（见 `design-spec-tokens-ci` Skill）。
- **布局快照（可选）**：`package.json` + `export_computed_layout.mjs`（Playwright）。安装：`npm install` 与 `npx playwright install chromium`。

```bash
node export_computed_layout.mjs ../demos/pages/dashboard.html ./reports/generated-layout.json
node compare_layout_diff.mjs ./reports/generated-layout.json ./reports/figma-export.json ./reports/diff-report.md
```

报告目录默认 `.design-spec/checks/reports/`（可加入 `.gitignore` 若需）。

## 若 `npx playwright install chromium` 失败

- 若提示 **active lockfile**：等待其他安装结束，或按提示删除锁后重试：  
  `rm -rf ~/Library/Caches/ms-playwright/__dirlock`  
  然后再执行 `npx playwright install chromium`（或 `npx playwright install`）。
- 若下载报 **`timed out after 30000ms`**、**`ECONNRESET`**、**`socket hang up`**：多为访问 `cdn.playwright.dev` / `storage.googleapis.com` 不稳定。可换网络后重试；或加大单次请求超时（毫秒）后再装，例如：  
  `PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000 npx playwright install chromium`  
  仍失败时参见 [Playwright · Browsers](https://playwright.dev/docs/browsers)（镜像 / 离线安装等）。

阶段计划与验收对照：[`../docs/REQUIREMENTS_AND_PLAN.md`](../docs/REQUIREMENTS_AND_PLAN.md)。
