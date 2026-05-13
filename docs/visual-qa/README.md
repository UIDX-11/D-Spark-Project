# 视觉 QA（Visual QA）

> **L2 — 实现侧验收口径 / 不复述组件规范。**  
> 本目录约定 **Path A（Figma 官方库）** 与 **Path B（静态 HTML demos）** 的对稿口径与证据链。组件参数与变体真源仍以 [`.design-spec/docs/components/*.md`](../../.design-spec/docs/components/) 为准。文档分层与 reverse routing 见 [`docs/DOCUMENTATION_MAP.md`](../DOCUMENTATION_MAP.md)。

## 真源与必读

| 主题 | 文档 |
|------|------|
| 产品需求（目标 / 验收 / 验证） | [FIGMA_1_1_ALIGNMENT_PRD.md](./FIGMA_1_1_ALIGNMENT_PRD.md) |
| 组件 ↔ Figma 索引（Primary node） | [COMPONENT-FIGMA-LINKS.md](./COMPONENT-FIGMA-LINKS.md) |
| Path A 工作流（讨论稿 vs 官方库） | [PATH-A-WORKFLOW.md](./PATH-A-WORKFLOW.md) |
| 对稿矩阵（签字） | [MATRIX.md](./MATRIX.md)（含 Arco 矩阵列与 Figma slug 优先序） |
| PR 前：Arco ↔ demos-react ↔ MD ↔ HTML | [ARCO_PR_PRE_CHECKLIST.md](../../.design-spec/docs/reports/ARCO_PR_PRE_CHECKLIST.md) |
| Path B HTML vs demos-react 验收 | [HTML_VS_DEMOS_REACT.md](../../.design-spec/docs/reports/HTML_VS_DEMOS_REACT.md) |
| 可选：HTML 内嵌 Arco（React 岛）评审（已归档；不采纳） | [_archive/reports/REACT_ISLANDS_EVAL.md](../../.design-spec/docs/_archive/reports/REACT_ISLANDS_EVAL.md) |
| Figma 已填链 slug 排序（P0/P1） | [FIGMA_SLUG_PRIORITY.md](../../.design-spec/docs/reports/FIGMA_SLUG_PRIORITY.md) |
| Playwright / 截图基线 | [PLAYWRIGHT.md](./PLAYWRIGHT.md) |
| Token 与渲染边界 spot-check | [TOKEN-SPOTCHECK.md](./TOKEN-SPOTCHECK.md) |
| 对齐审计报告（汇总） | [ALIGNMENT_AUDIT_REPORT.md](./ALIGNMENT_AUDIT_REPORT.md) |
| 偏差修复执行顺序与 PR 门禁 | [DEVIATION_REMEDIATION_WORKFLOW.md](../../.design-spec/docs/reports/DEVIATION_REMEDIATION_WORKFLOW.md) |
| React vs design-spec token 双管道 | [REACT_VS_DESIGN_SPEC_TOKENS.md](../../.design-spec/docs/reports/REACT_VS_DESIGN_SPEC_TOKENS.md) |

**官方库 fileKey（视觉真源）**：`KJfy0GFDs8kLsXTzhTxAjd`（D.S-Web-Com_Light_V2_2026）。  
协作讨论稿 `VqEug9MsAHfG1lpRNP5FKy` **不作为** Path A 视觉验收真源，仅用于 Playground 协作，见 PATH-A-WORKFLOW。

## 机器产出

- 真源表：`.design-spec/config/figma_truth_table.json`
- 三边对账：`.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md`（`python3 .design-spec/scripts/triad_reconcile.py`）
- Figma 链接优先序：`.design-spec/docs/reports/FIGMA_SLUG_PRIORITY.md`（`python3 .design-spec/scripts/figma_slug_priority.py`）
- MD 占位扫描：`.design-spec/docs/reports/CLOSE_MD_GAPS.md`（`close_md_gaps_scan.py`）
- 组件 MD 结构审计：`.design-spec/docs/reports/COMPONENTS_MD_AUDIT.md`（`components_md_audit.py`）
