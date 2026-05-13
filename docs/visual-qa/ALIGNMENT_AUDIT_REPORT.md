# 设计规范对齐审计报告（滚动更新）

> **Layer / 层级**: **L2 — 证据链摘要**。  
> 本文档是 **滚动执行摘要**；具体数值与表格请回查机器报告（[`MD_HTML_Figma_TRIAD.md`](../../.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md)、[`CLOSE_MD_GAPS.md`](../../.design-spec/docs/reports/CLOSE_MD_GAPS.md)、[`COMPONENTS_MD_AUDIT.md`](../../.design-spec/docs/reports/COMPONENTS_MD_AUDIT.md)）。**不要** 在此粘贴大段机器表，避免与生成报告漂移。  
> 治理与文档分层：[`.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)。

## 1. 摘要

| 项 | 状态 | 说明 |
|----|------|------|
| 官方库真源 | `KJfy0GFDs8kLsXTzhTxAjd` | 见 [COMPONENT-FIGMA-LINKS.md](./COMPONENT-FIGMA-LINKS.md) |
| MD–HTML–Figma 三边 | 见机器报告 | [`.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md`](../../.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md) |
| MD 占位 / 待办扫描 | 见 CLOSE_MD_GAPS | [`.design-spec/docs/reports/CLOSE_MD_GAPS.md`](../../.design-spec/docs/reports/CLOSE_MD_GAPS.md) |
| studio_runtime 字面量 | 见审计脚本输出 | `python3 .design-spec/scripts/studio_runtime_literal_audit.py` |
| Figma 命名审查 | 模板 | [`.design-spec/docs/reports/FIGMA_NAMING_AUDIT_TEMPLATE.md`](../../.design-spec/docs/reports/FIGMA_NAMING_AUDIT_TEMPLATE.md) |

## 2. 三边对账结论（人工摘要）

机器报告（随 `triad_reconcile.py` 刷新）：[`.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md`](../../.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md)（当前 **39** 行组件）。

- **集合一致**：MD、真源表、HTML 路径集合无「仅 MD / 仅真源表」差集（见 triad 文末）。
- **待收敛（高频）**：约 **23** 行在「缺失 / 不一致」列标注 **MD References 未出现任一 canonical node-id**（即 MD 的 Figma 深链接尚未与 `figma_truth_table.json` 主 node 对齐）。优先对 **Button / Input / Alert** 等已 Path B 截图的 slug 回填 References，再扩展至表单与导航类。
- **无真源 node 的 slug**：真源表 `figma_urls` 为空者（如 `card`、`form`、`message`、`select`、`space`、`steps`、`table`、`treeselect` 等）triad 不判「MD 缺 node」，须在表中补链后再宣称可对稿。

**下一迭代优先级**：① 回填 References 与 canonical node-id；② 为 `select` / `table` 等补 Figma 行；③ 收紧 `studio_runtime.css` 字面量（见 `studio_runtime_literal_audit.py`，可选 `--fail-if-px-over` 门禁）。

## 3. 样式 / 交互 / 命名差异与方案

**Path B 静态 HTML vs `demos-react`（Arco npm）**：视觉以 Figma + token 为主在 HTML 验收；**交互与与官网 1:1 的状态机**以 **`demos-react` + Arco 文档** 为主验收面。HTML 的 `#liveRoot` 仅保证 MD 声明子集（见 [HTML_VS_DEMOS_REACT.md](../../.design-spec/docs/reports/HTML_VS_DEMOS_REACT.md)）。对稿矩阵中 **Arco 矩阵** 列与 slug 机器排序见 [MATRIX.md](./MATRIX.md)、[FIGMA_SLUG_PRIORITY.md](../../.design-spec/docs/reports/FIGMA_SLUG_PRIORITY.md)。**执行顺序与命令**见 [DEVIATION_REMEDIATION_WORKFLOW.md](../../.design-spec/docs/reports/DEVIATION_REMEDIATION_WORKFLOW.md)（含 `sync_md_canonical_figma.py`、生成器与 `triad_reconcile.py`）。

（按 PR 或按组件追加小节。）

## 4. 附录

- [FIGMA_1_1_ALIGNMENT_PRD.md](./FIGMA_1_1_ALIGNMENT_PRD.md)  
- [ALIGNMENT_GOVERNANCE.md](../../.design-spec/docs/ALIGNMENT_GOVERNANCE.md)
