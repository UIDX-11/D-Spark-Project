# design-spec 文档站点（骨架）

本目录为 **文档站点基础结构** 占位：完整 VitePress / Docusaurus 等可按 `docs-system-batch` 扩容。

## 当前推荐入口（已存在）

- 仓库文档地图：[../../docs/DOCUMENTATION_MAP.md](../../docs/DOCUMENTATION_MAP.md)
- 视觉 QA：[../../docs/visual-qa/README.md](../../docs/visual-qa/README.md)
- 对齐治理：[../docs/ALIGNMENT_GOVERNANCE.md](../docs/ALIGNMENT_GOVERNANCE.md)
- 机器报告目录：[../docs/reports/](../docs/reports/)

## 后续接入

- 将 `../docs/components` 与 `../../docs/visual-qa` 纳入侧边栏导航。  
- 构建时调用 `triad_reconcile.py` 将报告嵌入「状态」页（可选）。
