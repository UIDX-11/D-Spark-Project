---
name: design-spec-hybrid-spec
description: >-
  D-Spark hybrid design specs: Markdown with fenced JSON/YAML blocks (kind atomic,
  pattern, page, layoutProtocol, slotRegistry, responsive, tokenMap), JSON Schema
  under .design-spec/schemas/, foundations (间距/栅格/投影/布局), icons manifest,
  optional layout snapshot scripts, portable to any AI tool via GitHub. Use when
  the user mentions design.md、混合规格、schemaVersion、page.md、pattern、
  layoutProtocol、slotRegistry、可移植 Skill、或 cross-tool design tokens.
disable-model-invocation: false
---

# Design-spec · 混合规格（Markdown + JSON / 可移植）

## 真源路径

| 内容 | 路径 |
|------|------|
| **需求拆解与阶段计划（总表）** | `.design-spec/docs/REQUIREMENTS_AND_PLAN.md` |
| JSON Schema（`schemaVersion` **0.1.0**） | `.design-spec/schemas/spec-block.schema.json` |
| 示例块 | `.design-spec/schemas/examples/` |
| Foundation（中文） | `.design-spec/docs/foundations/`（间距、栅格、投影、布局） |
| 典型页 `page` | `.design-spec/docs/pages/page-dashboard.md` |
| 模式 | `.design-spec/docs/pages/patterns/*.md` |
| Slot 注册表 | `.design-spec/docs/slots/registry.yaml` |
| 图标 manifest | `.design-spec/assets/icons/icons.manifest.json` |
| Figma Variables 桥接（占位） | `.design-spec/docs/FIGMA_VARIABLES_TOKEN_BRIDGE.yaml` |
| 冗余审计 | `.design-spec/docs/REDUNDANCY_AUDIT.md` |

## 块类型（`kind`）

- **`atomic`**：`bindings[]`、`metrics[]`（组件级，对齐 `docs/components/*.md`）
- **`pattern`**：`patternId`、`composition[]`、`dataContracts`、`behaviors[]`
- **`page`**：`templateId`、`regions[]`、`demoPath`、`figma`、`responsive`（**`gridColumns` 默认 12，仅显式写 24**）
- **`layoutProtocol`**：Figma Auto Layout → Web 映射（见 `examples/layout-protocol.example.json`）
- **`slotRegistry`** / **`responsive`** / **`tokenMap`**：见 Schema `oneOf`

校验（可选）：`ajv validate -s .design-spec/schemas/spec-block.schema.json -d <block.json>`

## 图标治理（摘要）

- Figma：`KJfy0GFDs8kLsXTzhTxAjd`，根 **`276593:77`**。
- 默认展示：`calc(var(--semantic-icon-size-md) * 1px)`；类名 **`.ds-icon--md`**（`studio_runtime.css`）。
- 缺失：HTML 用 **`.ds-icon-placeholder`** + `data-icon-gap`；禁止静默 emoji；可降级见 `docs/foundations/icons-arco-mapping.md`。

## 可选本地「反向校验」

```bash
cd .design-spec/checks && npm install && npx playwright install chromium
node export_computed_layout.mjs ../demos/pages/dashboard.html ./reports/generated-layout.json
# 将 Figma 导出 JSON 与 generated-layout.json 对照：
node compare_layout_diff.mjs ./reports/generated-layout.json ./reports/figma-export.json ./reports/diff-report.md
```

退出码默认 **0**（报告型）；不替代 CI smoke。

## 与 Cursor 外工具

本 Skill 正文与 **Schema 文件**可镜像到任意 GitHub 仓库；消费者需同时取得 **`.design-spec/tokens/dist/tokens.css`**（或 submodule 本仓库）。详见同目录 **`PACKAGING.md`**。

## 写 Figma 画布

写操作前加载 **`figma-use`**，再遵循 **`design-spec-figma-workflows`**（双向流程已写入该 Skill）。
