# D.Spark-Project

## Design system docs

- **Human-visible entry**: `design-system/README.md`
- **文档地图**: [`docs/DOCUMENTATION_MAP.md`](docs/DOCUMENTATION_MAP.md)
- **Figma 1:1 对齐（PRD）**: [`docs/visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md`](docs/visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md)（需求、目标、验收标准与验证方法）
- **三边对账 / MD 扫描报告**: [`.design-spec/docs/reports/`](.design-spec/docs/reports/)（`MD_HTML_Figma_TRIAD.md`、`CLOSE_MD_GAPS.md`、`COMPONENTS_MD_AUDIT.md`）
- **AI / source of truth (hidden)**: `.design-spec/`
  - `manifest.json` (machine entrypoint)
  - `docs/` (components/layouts/a11y/i18n)
  - `tokens/src/` (primitive → semantic → component)
  - `tokens/dist/tokens.css` (generated CSS variables)