# 视觉 QA（Visual QA）

本目录约定 **Path A（Figma 官方库）** 与 **Path B（静态 HTML demos）** 的对稿与证据链。

## 真源与必读

| 主题 | 文档 |
|------|------|
| 产品需求（目标 / 验收 / 验证） | [FIGMA_1_1_ALIGNMENT_PRD.md](./FIGMA_1_1_ALIGNMENT_PRD.md) |
| 组件 ↔ Figma 索引（Primary node） | [COMPONENT-FIGMA-LINKS.md](./COMPONENT-FIGMA-LINKS.md) |
| Path A 工作流（讨论稿 vs 官方库） | [PATH-A-WORKFLOW.md](./PATH-A-WORKFLOW.md) |
| 对稿矩阵（签字） | [MATRIX.md](./MATRIX.md) |
| Playwright / 截图基线 | [PLAYWRIGHT.md](./PLAYWRIGHT.md) |
| Token 与渲染边界 spot-check | [TOKEN-SPOTCHECK.md](./TOKEN-SPOTCHECK.md) |
| 对齐审计报告（汇总） | [ALIGNMENT_AUDIT_REPORT.md](./ALIGNMENT_AUDIT_REPORT.md) |

**官方库 fileKey（视觉真源）**：`KJfy0GFDs8kLsXTzhTxAjd`（D.S-Web-Com_Light_V2_2026）。  
协作讨论稿 `VqEug9MsAHfG1lpRNP5FKy` **不作为** Path A 视觉验收真源，仅用于 Playground 协作，见 PATH-A-WORKFLOW。

## 机器产出

- 真源表：`.design-spec/config/figma_truth_table.json`
- 三边对账：`.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md`（`python3 .design-spec/scripts/triad_reconcile.py`）
- MD 占位扫描：`.design-spec/docs/reports/CLOSE_MD_GAPS.md`（`close_md_gaps_scan.py`）
- 组件 MD 结构审计：`.design-spec/docs/reports/COMPONENTS_MD_AUDIT.md`（`components_md_audit.py`）
