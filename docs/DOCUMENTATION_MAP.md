# 文档地图（Documentation map）

> **真源分层**：L0 入口 → L1 规范 → L2 实现/QA → L3 操作/迁移/参考 → L4 生成快照/归档。  
> 见 [`.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)。

## TL;DR — 一事一真源

| 主题 | **唯一真源** | 不要再去这里找 |
| --- | --- | --- |
| 设计规则 / AI 消费入口 | [`.design-spec/docs/design.md`](../.design-spec/docs/design.md) | `design-system/README.md`、本仓库 `README.md`、`docs/*.md` 仅做路由/执行 |
| 组件规范正文 | [`.design-spec/docs/components/*.md`](../.design-spec/docs/components/) | `docs/components.md`（实现契约/索引）、`design-system/**`（GitHub 门面） |
| 页面与模式 | [`.design-spec/docs/pages/`](../.design-spec/docs/pages/) · [`pages/patterns/`](../.design-spec/docs/pages/patterns/) | `apps/dspark-vue-admin/`（参考实现）、`src/` 业务示例 |
| Token（语义/组件/原子） | [`.design-spec/tokens/src/`](../.design-spec/tokens/) → 生成 [`.design-spec/tokens/dist/tokens.css`](../.design-spec/tokens/dist/tokens.css) | 手写硬编码、组件文件内的 hex |
| Schema / fenced block | [`.design-spec/schemas/spec-block.schema.json`](../.design-spec/schemas/spec-block.schema.json) | 任何复述 schema 字段的散文 |
| Figma 节点 / 视觉真源 | Figma（Light mode）+ [`.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md`](../.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md) / [`config/figma_truth_table.json`](../.design-spec/config/figma_truth_table.json) | 截图、报告中的间接引用 |
| 偏差修复 / PR 闸门 | [`.design-spec/docs/reports/DEVIATION_REMEDIATION_WORKFLOW.md`](../.design-spec/docs/reports/DEVIATION_REMEDIATION_WORKFLOW.md) · [`ARCO_PR_PRE_CHECKLIST.md`](../.design-spec/docs/reports/ARCO_PR_PRE_CHECKLIST.md) | 散落在各 README 里的「注意事项」 |

**反向规则：** 任何在 `docs/`、`design-system/`、`README.md` 出现的「规范正文」都视为缓存/复述，必须能在 [`.design-spec/`](../.design-spec/) 找到原文。修改规则**只改 `.design-spec/`**，下游靠链接拉取。

## L0 — 入口与路线（最先读）

| 文档 | 说明 |
|------|------|
| [`.design-spec/docs/design.md`](../.design-spec/docs/design.md) | AI 入口：规则 + 严格读序 + 单链路由（最小入口；不重复索引） |
| [`.design-spec/docs/REQUIREMENTS_AND_PLAN.md`](../.design-spec/docs/REQUIREMENTS_AND_PLAN.md) | 需求拆解（R1–R15）与阶段计划（P0–P2） |
| [`.design-spec/PORTABLE_SPEC_README.md`](../.design-spec/PORTABLE_SPEC_README.md) | 可移植包说明 + 外部 AI prompt template |
| [`.design-spec/index.md`](../.design-spec/index.md) | 仓库级入口（manifest / 必读列表） |

## L1 — 规范真源

| 文档 | 说明 |
|------|------|
| [`.design-spec/docs/ALIGNMENT_GOVERNANCE.md`](../.design-spec/docs/ALIGNMENT_GOVERNANCE.md) | Arco · Figma · token · a11y · PR 治理 |
| [`.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md`](../.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md) | 组件 ↔ Figma 节点（canonical，人读 SoT） |
| [`.design-spec/config/figma_truth_table.json`](../.design-spec/config/figma_truth_table.json) | 同上（机器 SoT） |
| [`.design-spec/docs/FIGMA_VARIABLES_TOKEN_BRIDGE.yaml`](../.design-spec/docs/FIGMA_VARIABLES_TOKEN_BRIDGE.yaml) | Figma 变量 → CSS 变量桥接（`kind: tokenMap`） |
| `.design-spec/docs/components/*.md` | 组件规范（含 `Spec block (atomic)` JSON） |
| [`.design-spec/docs/components/README.md`](../.design-spec/docs/components/README.md) | 组件 slug → spec 索引（编辑面） |
| [`.design-spec/docs/components/intent-index.md`](../.design-spec/docs/components/intent-index.md) | 意图 → 组件/模式映射 |
| `.design-spec/docs/pages/*.md` · `.design-spec/docs/pages/patterns/*.md` | 页面与模式（`page` / `pattern` block） |
| `.design-spec/docs/foundations/*.md` | 间距 / 栅格 / 投影 / 布局 / 图标 / layout-protocol |
| [`.design-spec/docs/slots/registry.yaml`](../.design-spec/docs/slots/registry.yaml) | Slot 注册表 |
| [`.design-spec/schemas/spec-block.schema.json`](../.design-spec/schemas/spec-block.schema.json) | fenced JSON/YAML block 校验契约 |

## L2 — 实现 & QA（人读契约 / 证据链）

| 文档 | 说明 |
|------|------|
| [components.md](./components.md) | **页面实现契约**：组件知识库引用、Form/Input/Button 用法、变体命名、token 与无障碍检查清单、页面/模式组装 |
| [visual-qa/README.md](./visual-qa/README.md) | 视觉 QA 入口、真源 fileKey |
| [visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md](./visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md) | Figma 1:1 对齐 PRD（需求 / 目标 / 验收 / 验证） |
| [visual-qa/COMPONENT-FIGMA-LINKS.md](./visual-qa/COMPONENT-FIGMA-LINKS.md) | 包导出 ↔ MD ↔ Figma Primary |
| [visual-qa/PATH-A-WORKFLOW.md](./visual-qa/PATH-A-WORKFLOW.md) | Path A 对稿（官方库） |
| [visual-qa/MATRIX.md](./visual-qa/MATRIX.md) | Path A/B 对稿矩阵 |
| [visual-qa/TOKEN-SPOTCHECK.md](./visual-qa/TOKEN-SPOTCHECK.md) | Token 与渲染边界 |
| [visual-qa/PLAYWRIGHT.md](./visual-qa/PLAYWRIGHT.md) | 截图 / smoke |
| [visual-qa/ALIGNMENT_AUDIT_REPORT.md](./visual-qa/ALIGNMENT_AUDIT_REPORT.md) | 滚动审计摘要（不复述机器报告） |
| [`.design-spec/docs/TOKEN_PIPELINE_STRATEGY.md`](../.design-spec/docs/TOKEN_PIPELINE_STRATEGY.md) | 双轨 token 边界 |
| [`.design-spec/docs/reports/ARCO_PR_PRE_CHECKLIST.md`](../.design-spec/docs/reports/ARCO_PR_PRE_CHECKLIST.md) | PR 闸门：Arco ↔ demos-react ↔ MD ↔ HTML |
| [`.design-spec/docs/reports/DEVIATION_REMEDIATION_WORKFLOW.md`](../.design-spec/docs/reports/DEVIATION_REMEDIATION_WORKFLOW.md) | 偏差修复执行顺序 |
| [`.design-spec/docs/reports/HTML_VS_DEMOS_REACT.md`](../.design-spec/docs/reports/HTML_VS_DEMOS_REACT.md) | Path B HTML vs demos-react 验收分工 |
| [`.design-spec/docs/reports/REACT_VS_DESIGN_SPEC_TOKENS.md`](../.design-spec/docs/reports/REACT_VS_DESIGN_SPEC_TOKENS.md) | 两套 CSS 变量命名说明 |
| [`.design-spec/docs/reports/FIGMA_NAMING_AUDIT_TEMPLATE.md`](../.design-spec/docs/reports/FIGMA_NAMING_AUDIT_TEMPLATE.md) | Figma 命名审查模板 |

## L3 — 操作 / 迁移 / 参考

| 文档 | 说明 |
|------|------|
| [figma-handoff/README.md](./figma-handoff/README.md) | localhost → Figma 讨论稿手递（非视觉验收真源） |
| [cross-framework/REACT_VUE_ADAPTER_PLAN.md](./cross-framework/REACT_VUE_ADAPTER_PLAN.md) | P5–P7 跨框架迁移计划 |
| [`apps/dspark-vue-admin/README.md`](../apps/dspark-vue-admin/README.md) | Vue 管理壳（Starter 级 IA） |
| [`design-system/README.md`](../design-system/README.md) | GitHub 门面入口 |
| [`design-system/SKILL.md`](../design-system/SKILL.md) | 3 层路由 |
| [`design-system/glossary.md`](../design-system/glossary.md) | 术语字典 |
| [`design-system/checklist.md`](../design-system/checklist.md) | 自检清单 |
| `design-system/product-lines/*.md` · `design-system/overlays/*.md` | 产品线 / overlay capability |
| `.design-spec/docs/figma-agent/**` | Figma RAG 旁路语料（与 `design.md` 主线分离） |

## L4 — 生成快照 / 隔离归档（不视为真源）

| 路径 | 说明 |
|------|------|
| [`.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md`](../.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md) | 三边对账（`triad_reconcile.py` 生成） |
| [`.design-spec/docs/reports/COMPONENTS_MD_AUDIT.md`](../.design-spec/docs/reports/COMPONENTS_MD_AUDIT.md) | 组件 MD 结构审计（生成） |
| [`.design-spec/docs/reports/CLOSE_MD_GAPS.md`](../.design-spec/docs/reports/CLOSE_MD_GAPS.md) | 占位 / 待办扫描（生成） |
| [`.design-spec/docs/reports/FIGMA_SLUG_PRIORITY.md`](../.design-spec/docs/reports/FIGMA_SLUG_PRIORITY.md) | Figma 链接优先序（生成） |
| [`.design-spec/docs/reports/FIGMA_VAR_DEFS_PILOT.md`](../.design-spec/docs/reports/FIGMA_VAR_DEFS_PILOT.md) | MCP 变量定义快照 |
| [`.design-spec/docs/_archive/`](../.design-spec/docs/_archive/) | 整篇隔离归档（TDesign Starter、React Islands 评审等） |
| `docs/figma-handoff/dashboard-fullpage.png` | **已隔离**：按需由 [`capture-dashboard.sh`](./figma-handoff/capture-dashboard.sh) 重生成；进入 `.gitignore`，不再常驻仓库 |

## 治理与代码库

| 路径 | 说明 |
|------|------|
| [`.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md) | **本轮治理报告**：分层、隔离、章节迁移、IA 收敛 |
| [`.design-spec/docs/REDUNDANCY_AUDIT.md`](../.design-spec/docs/REDUNDANCY_AUDIT.md) | 仓库冗余审计清单 |
| [`.design-spec/checks/README.md`](../.design-spec/checks/README.md) | 维护者操作清单（重生成 / 校验 / 三边对账） |
| [`src/components/ui/index.ts`](../src/components/ui/index.ts) | React 组件导出 |

## 维护者操作要点

- **改规则只改 `.design-spec/`**：组件 / 页面 / token / schema 的正文修改一律落在 `.design-spec/docs/` 与 `.design-spec/tokens/`、`.design-spec/schemas/`，下游靠链接引用。
- **`docs/` 不复述规范**：若发现 `docs/*.md` 中含组件参数 / Figma 数值 / token 表，应改为链接到 `.design-spec/` 真源。
- **`reports/` 与 `_archive/` 不进读序**：机器生成报告与历史归档仅用于追溯、不视为规范真源；新增机器报告必须在文首加 `> Source-of-truth: snapshot (generated)` 横幅。
- **入口最多 2 跳**：`README.md` → `design.md` 或 `DOCUMENTATION_MAP.md` → 主题真源；任何超过 2 跳的导航视为缺陷，应在 [DESIGN_MD_GOVERNANCE_AUDIT.md](../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md) 登记。
