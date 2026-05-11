# 设计规范对齐审计报告（滚动更新）

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

（按 PR 或按组件追加小节。）

## 4. 附录

- [FIGMA_1_1_ALIGNMENT_PRD.md](./FIGMA_1_1_ALIGNMENT_PRD.md)  
- [ALIGNMENT_GOVERNANCE.md](../../.design-spec/docs/ALIGNMENT_GOVERNANCE.md)
