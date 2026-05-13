# `.design-spec/docs/_archive/` — 隔离归档区

> **Non-source-of-truth**：本目录是 design-spec 内被隔离的历史 / 旁路 / 不采纳文档归档区。  
> AI 工具与文档消费者在执行 `Figma 规范 → design.md / hybrid spec` 链路时 **不应** 把本目录文件视为规范真源；仅作为历史参考保留。

## 收录范围

- 与官方组件库（fileKey `KJfy0GFDs8kLsXTzhTxAjd`）主线不同的参考 demo 或参考页（如 TDesign Starter 类）。
- 评审后 **未采纳** 的备选方案备忘（如 React 岛、未启用的实验流程）。
- 已被生成器或机器报告替代、不再人工维护的旧报告。

## 重新启用规则

如需把某文档重新提升为规范层（L0/L1）：

1. 在 [`.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../reports/DESIGN_MD_GOVERNANCE_AUDIT.md) 中记录变更理由与归属层级。
2. 移出本目录到对应实际位置。
3. 同步更新 [`.design-spec/docs/design.md`](../design.md) 入口索引与 [`docs/DOCUMENTATION_MAP.md`](../../../docs/DOCUMENTATION_MAP.md)。

## 当前条目

- `pages/dashboard-tdesign-starter-base.md` — TDesign Starter 风格仪表盘参考稿（B 线）。`page-dashboard.md` 才是 canonical Dashboard。
- `reports/REACT_ISLANDS_EVAL.md` — “HTML 内嵌 Arco React 岛”备选方案，**当前默认不采纳**；Path B 仍以 `studio_runtime` 为准，Arco 真交互在 `demos-react`。

## 已移除（仅记录，本目录无文件）

- **B 线 gallery 聚合页**（原 `.design-spec/demos/gallery-b1-forms-inputs.html` 等三页）：与单组件 `demos/components/<slug>.html` 功能重复，已于 2026-05-12 从仓库删除；`generate_component_html_demos.py` 不再生成；Playwright smoke 不再覆盖。
