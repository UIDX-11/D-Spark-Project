---
name: design-spec-e2e
description: >-
  D-Spark design-spec Playwright tests under .design-spec/e2e and GitHub Actions
  workflow for design-spec (e.g. design-spec-e2e.yml). Use when the user mentions
  e2e、Playwright、smoke、打开 demo、预览页、或修改 .design-spec/e2e/ or
  .github/workflows/*design-spec*.
disable-model-invocation: false
---

# Design-spec · E2E

## 路径

- **测试**：`.design-spec/e2e/`（如 `tests/smoke.spec.ts`）
- **包管理**：`.design-spec/e2e/package.json`
- **CI**：`.github/workflows/design-spec-e2e.yml`（若存在）

## 原则

1. **选择器** 优先 **稳定角色 / 文案 / data 属性**，避免绑死易变的实现细节类名（除非文档约定 `ds-*` 为契约）。
2. 改 **demos 或 studio_runtime** 导致 DOM 变化时，**同步更新** smoke 与文档中的「自检」段落。
3. 本地调试：在 `e2e` 目录按 **`package.json` scripts** 运行（常见为 `npx playwright test`）；具体以文件为准。

## 与 token 扫描的关系

- E2E 管 **行为/可见性**；**`scan_token_violations`** 管 **CSS 硬编码** — 两者互补，PR 可并行要求。
