# 文档地图（Documentation map）

## 产品与设计对齐

| 文档 | 说明 |
|------|------|
| [visual-qa/README.md](./visual-qa/README.md) | 视觉 QA 入口、真源 fileKey |
| [visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md](./visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md) | Figma 1:1 对齐 PRD（需求 / 目标 / 验收 / 验证） |
| [visual-qa/COMPONENT-FIGMA-LINKS.md](./visual-qa/COMPONENT-FIGMA-LINKS.md) | 包导出 ↔ MD ↔ Figma Primary |
| [visual-qa/MATRIX.md](./visual-qa/MATRIX.md) | Path A/B 对稿矩阵 |
| [visual-qa/ALIGNMENT_AUDIT_REPORT.md](./visual-qa/ALIGNMENT_AUDIT_REPORT.md) | 对齐审计滚动报告 |

## design-spec（规范与 demos）

| 路径 | 说明 |
|------|------|
| `.design-spec/docs/ALIGNMENT_GOVERNANCE.md` | Arco / Figma / token 治理 |
| `.design-spec/docs/components/*.md` | 组件规范（生成器输入） |
| `.design-spec/config/figma_truth_table.json` | Figma canonical 节点（机器） |
| `.design-spec/demos/components/*.html` | 静态 HTML demos |
| `.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md` | 三边对账（`triad_reconcile.py` 生成） |
| `.design-spec/docs/reports/CLOSE_MD_GAPS.md` | MD 占位 / 待办扫描（`close_md_gaps_scan.py`） |
| `.design-spec/docs/reports/COMPONENTS_MD_AUDIT.md` | 组件 MD 结构审计（`components_md_audit.py`） |
| `.design-spec/docs/reports/FIGMA_NAMING_AUDIT_TEMPLATE.md` | Figma 命名审查表模板 |
| `.design-spec/demos-react/` | React + Vite + Tailwind 矩阵壳（与生成器解耦） |

## 代码库

| 路径 | 说明 |
|------|------|
| `src/components/ui/index.ts` | React 组件导出 |
| `design-system/README.md` | 面向人的设计系统叙述入口 |
