---
name: design-spec-demos-runtime
description: >-
  D-Spark HTML component demos under .design-spec/demos, studio_runtime.css/js,
  and generate_component_html_demos.py. Use when the user mentions demo、静态演示、
  studio_runtime、generator、regenerate demos、mountDatepicker、ds-dp、liveRoot,
  or edits paths under .design-spec/generator/ or .design-spec/demos/.
disable-model-invocation: false
---

# Design-spec · HTML Demos 与 `studio_runtime`

## 权威路径

- **运行时**：`.design-spec/generator/studio_runtime.css`、`.design-spec/generator/studio_runtime.js`
- **生成脚本**：`.design-spec/generator/generate_component_html_demos.py`
- **输出**：`.design-spec/demos/components/*.html`、`.design-spec/demos/index.html`、`.design-spec/demos/gallery-*.html`（组件索引聚合）、`.design-spec/demos/pages/*.html`（**页面对稿模版**：通用仪表盘 / 列表 / 表单）与 **`demos/pages/archive/dashboard-tdesign-starter-base.html`**（TDesign Starter 仪表盘静态对稿，非 canonical）
- **C 线 · Vue 真页面**：`apps/dspark-vue-admin`（Starter 级路由与侧栏；IA 文档 `.design-spec/docs/pages/information-architecture.md`）；索引页含启动说明
- **页模版样式**：`.design-spec/generator/page_templates.css`；逻辑与脚本：`.design-spec/generator/page_templates.py`、`.design-spec/generator/page_templates.js`（`demos/pages/page_templates.js`）；**TDesign 静态仪表盘**另含 `generator/dashboard-starter.js`（输出 `demos/pages/dashboard-starter.js`）+ **ECharts CDN**（见生成 HTML）

## 工作流

1. 改 **token 或布局契约** 时，先查 **对应 `docs/components/<slug>.md`** 是否已写清 DOM / 类名约定。
2. 改 **generator 或 runtime** 后，按仓库惯例 **重新生成 demos**（以项目脚本为准，常见为对 `generate_component_html_demos.py` 的调用方式见该文件头或 `checks/README.md`）。
3. 运行 **`python3 .design-spec/checks/scan_token_violations.py`**（或带 `--ci`）确认无新增裸值违规。

## 硬规则（与 datepicker 一致方向）

- **禁止**在治理段对触发器等写 **内联 `style.* = …px`**；状态用 **class / `disabled` / `aria-*`**。
- **间距/色/圆角** 须来自 **`--component-*` / `--semantic-*`**，与 `datepicker.md`「异常报告」一致。

## 与混合规格 / 交互

- 规格中的 **`behaviors[]`**（如 `open`、`submit`）应对齐 **`studio_runtime.js`** 中已有 **mount\*** 约定；新模式在 `page_templates.js` 或专用脚本中扩展。
- 可选布局快照：在关键容器上加 **`data-layout-snapshot`**，配合 `.design-spec/checks/export_computed_layout.mjs` 导出 computed 样式 JSON（见 **`design-spec-hybrid-spec`**）。
