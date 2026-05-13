# Design.md Governance Audit — 全项目文档治理与隔离报告

> **状态**：v0.2（2026-05-12 IA 收敛）  
> **目标**：围绕「Figma 规范 → `design.md` / hybrid spec」主线建立 **五层文档真源**，把无用文档与无用章节按 **混合隔离策略** 处理；同时把 `design.md` 收敛为最小 AI 入口。**v0.2 额外完成**：仓库根入口（`README.md` / `DOCUMENTATION_MAP.md` / `.design-spec/index.md`）按 **双入口路由** 收敛，所有执行类文档统一补充层级声明与真源回链，机器报告显式声明 L4。  
> **不是**：组件 / Figma / token 真源；那些仍在各自规范文档内。

## 1. 真源分层（治理后基线）

| 层级 | 角色 | 代表文件 |
|------|------|----------|
| **L0 入口与路线** | AI / 人读最小入口与阶段计划 | [`.design-spec/docs/design.md`](../design.md) · [`REQUIREMENTS_AND_PLAN.md`](../REQUIREMENTS_AND_PLAN.md) · [`../../PORTABLE_SPEC_README.md`](../../PORTABLE_SPEC_README.md) · [`../../index.md`](../../index.md) |
| **L1 规范真源** | 组件 / 页面 / token / Figma 节点契约 | [`ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md) · [`COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md) · [`FIGMA_VARIABLES_TOKEN_BRIDGE.yaml`](../FIGMA_VARIABLES_TOKEN_BRIDGE.yaml) · `docs/components/**` · `docs/pages/**` · `docs/foundations/**` · `docs/layouts/**` · `docs/slots/registry.yaml` · `schemas/spec-block.schema.json` |
| **L2 实现 & QA** | 人读实现规范、证据链、PR 闸门 | [`docs/components.md`](../../../docs/components.md) · [`docs/DOCUMENTATION_MAP.md`](../../../docs/DOCUMENTATION_MAP.md) · [`docs/visual-qa/**`](../../../docs/visual-qa/) · [`reports/ARCO_PR_PRE_CHECKLIST.md`](ARCO_PR_PRE_CHECKLIST.md) · [`reports/DEVIATION_REMEDIATION_WORKFLOW.md`](DEVIATION_REMEDIATION_WORKFLOW.md) · [`reports/HTML_VS_DEMOS_REACT.md`](HTML_VS_DEMOS_REACT.md) · [`reports/REACT_VS_DESIGN_SPEC_TOKENS.md`](REACT_VS_DESIGN_SPEC_TOKENS.md) · [`TOKEN_PIPELINE_STRATEGY.md`](../TOKEN_PIPELINE_STRATEGY.md) · [`README.md`](../../../README.md) |
| **L3 操作 / 迁移 / 参考** | 手递、迁移、产品线 overlay、Vue 管理壳 | [`docs/figma-handoff/README.md`](../../../docs/figma-handoff/README.md) · [`docs/cross-framework/REACT_VUE_ADAPTER_PLAN.md`](../../../docs/cross-framework/REACT_VUE_ADAPTER_PLAN.md) · [`apps/dspark-vue-admin/README.md`](../../../apps/dspark-vue-admin/README.md) · [`design-system/README.md`](../../../design-system/README.md) · [`design-system/SKILL.md`](../../../design-system/SKILL.md) · [`design-system/glossary.md`](../../../design-system/glossary.md) · [`design-system/checklist.md`](../../../design-system/checklist.md) · [`design-system/product-lines/**`](../../../design-system/product-lines/) · [`design-system/overlays/**`](../../../design-system/overlays/) · `.design-spec/docs/figma-agent/**`（Figma RAG 旁路） |
| **L4 生成快照 / 隔离归档** | 机器报告、占位、未采纳方案、参考稿 | [`reports/MD_HTML_Figma_TRIAD.md`](MD_HTML_Figma_TRIAD.md) · [`reports/COMPONENTS_MD_AUDIT.md`](COMPONENTS_MD_AUDIT.md) · [`reports/CLOSE_MD_GAPS.md`](CLOSE_MD_GAPS.md) · [`reports/FIGMA_SLUG_PRIORITY.md`](FIGMA_SLUG_PRIORITY.md) · [`reports/FIGMA_VAR_DEFS_PILOT.md`](FIGMA_VAR_DEFS_PILOT.md) · [`reports/FIGMA_NAMING_AUDIT_TEMPLATE.md`](FIGMA_NAMING_AUDIT_TEMPLATE.md) · [`docs/visual-qa/ALIGNMENT_AUDIT_REPORT.md`](../../../docs/visual-qa/ALIGNMENT_AUDIT_REPORT.md) · [`../_archive/`](../_archive/) |

> 关键约束：L0/L1 是规范真源；L2 是证据链；L3 是 **参考与操作**；L4 是 **不视为真源** 的生成/归档区。  
> AI 消费规范时 **只读 L0+L1**，需要落 PR 时再扩展到 L2，**不要** 把 L4 当输入。

## 2. 本轮隔离动作（已执行）

### 2.1 整篇隔离 → `.design-spec/docs/_archive/`

| 原路径 | 现路径 | 理由 |
|--------|--------|------|
| `.design-spec/docs/pages/dashboard-tdesign-starter-base.md` | `.design-spec/docs/_archive/pages/dashboard-tdesign-starter-base.md` | TDesign Starter 参考 B 线，不是 D.S Web Com 主线 canonical Dashboard；`REDUNDANCY_AUDIT.md` 已声明归档。 |
| `.design-spec/docs/reports/REACT_ISLANDS_EVAL.md` | `.design-spec/docs/_archive/reports/REACT_ISLANDS_EVAL.md` | 文档自述「**当前默认：不采纳**」；保留作为评审备忘但移出常规报告目录。 |

### 2.2 局部隔离 / 章节迁移

| 内容 | 原位置 | 现位置 | 说明 |
|------|--------|--------|------|
| 全量 Component index 巨表 | `design.md` §Component index | [`components/README.md`](../components/README.md) §Slug → spec index | 单一编辑面；`design.md` 改为「索引指针」。 |
| Pilot scope 表格 | `design.md` §Pilot scope | [`COMPONENT_FIGMA_INVENTORY.md` §Pilot components](../COMPONENT_FIGMA_INVENTORY.md#pilot-components-first-batch) | 与 inventory 重复，统一以 inventory 为准。 |
| 外部 AI prompt template | `design.md` §Prompt template | [`../../PORTABLE_SPEC_README.md` §External-tool prompt template](../../PORTABLE_SPEC_README.md#external-tool-prompt-template) | 外部消费者的「打包」面板；不是 AI 内部读序。 |
| Operational notes（token edit 顺序、Skill 说明、Vue admin shell 重生成） | `design.md` §Operational notes | [`../../checks/README.md`](../../checks/README.md) §维护者操作清单 | 维护流程 ≠ AI 消费契约。 |
| Token & schema index 子项 | `design.md` §Token & schema index | 入口仍保留 1 行；详细脚本/示例由 [`../../checks/README.md`](../../checks/README.md) 与 [`../../schemas/`](../../schemas/) 承接。 |

### 2.3 生成快照「边界化」

机器生成的报告保持原位（CI 与脚本仍消费），但 **不再被视为规范真源**：

- 现已通过 [`../../PORTABLE_SPEC_README.md`](../../PORTABLE_SPEC_README.md) 与本审计报告显式声明它们属于 L4。
- `design.md` 不再在读序里出现 `reports/` 路径。

### 2.4 边界声明（已就地标注，未移动）

| 文档 | 边界声明要点 |
|------|--------------|
| [`docs/figma-handoff/README.md`](../../../docs/figma-handoff/README.md) | 这是「方案 B / 方案 C」localhost 手递流程，**非** Figma → design.md 视觉验收真源；讨论稿 fileKey 不替代官方库。 |
| [`docs/cross-framework/REACT_VUE_ADAPTER_PLAN.md`](../../../docs/cross-framework/REACT_VUE_ADAPTER_PLAN.md) | 跨框架迁移计划（P5–P7 里程碑），依赖 token 单一出口与三边闭项；不在主线消费链路中。 |
| [`docs/visual-qa/ALIGNMENT_AUDIT_REPORT.md`](../../../docs/visual-qa/ALIGNMENT_AUDIT_REPORT.md) | 滚动「执行摘要」，**不**复述机器报告内容；数值与表格请回查源报告。 |
| 各机器报告（TRIAD / COMPONENTS_MD_AUDIT / CLOSE_MD_GAPS / FIGMA_SLUG_PRIORITY / FIGMA_VAR_DEFS_PILOT） | 头部已声明「**机器生成 / 快照**」属性。 |
| [`design-system/changelog.md`](../../../design-system/changelog.md) · [`design-system/case-studies/README.md`](../../../design-system/case-studies/README.md) | 占位文档，仅供「设计系统门面」展示；与 design.md 主线无关。 |

## 3. 修正的高风险误导点

| 文件 | 问题 | 处理 |
|------|------|------|
| [`.design-spec/docs/figma-agent/MASTER.md`](../figma-agent/MASTER.md) | 「Figma first → sync this markdown」会让读者把 figma-agent 当 design.md 主线；引用旧 `docs/ALIGNMENT_GOVERNANCE.md` 路径 | 改写为：**Figma 是视觉与 variant 输入；`design.md` / spec block 才是 AI 消费契约**；路径全部改为 `.design-spec/docs/...`；标注本目录为 **Figma RAG 旁路（L3）**。 |
| [`.design-spec/docs/figma-agent/README.md`](../figma-agent/README.md) | `docs/components/` 路径错误（应为 `.design-spec/docs/components/`） | 修正路径并加 L3 边界声明。 |
| [`.design-spec/docs/ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md) §6 | 提到不存在的 `index.md` 维护链 | 改为同步维护 [`../index.md`](../../index.md)（仓库级）、`design.md` 与 [`REQUIREMENTS_AND_PLAN.md`](../REQUIREMENTS_AND_PLAN.md)。 |
| [`.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md) | 引用 `/Users/wangfei/.cursor/plans/...` 个人路径，非仓库内 | 删除该行，本仓库内 inventory 即 canonical。 |
| [`.design-spec/docs/REQUIREMENTS_AND_PLAN.md`](../REQUIREMENTS_AND_PLAN.md) R12 | 仍称 `FIGMA_VARIABLES_TOKEN_BRIDGE.yaml` 为「占位，待填」，与 YAML 真实状态不符 | 更新为「已含 pilot 7 组件 mapping 与 gaps；后续迭代补全语义层」。 |
| [`docs/components.md`](../../../docs/components.md) | 仅指向 `src/components/ui` 与组件 MD，未引导到 page / pattern hybrid 规范 | 补一节「页面 / 模式组装」指向 `.design-spec/docs/pages/` 与 `pages/patterns/`。 |
| [`design-system/checklist.md`](../../../design-system/checklist.md) | 引用 `docs/figma-agent/MASTER.md`（缺前缀） | 改为 `.design-spec/docs/figma-agent/MASTER.md`；并在 Figma agent 小节加 L3 注脚。 |
| [`docs/visual-qa/README.md`](../../../docs/visual-qa/README.md) · [`reports/DEVIATION_REMEDIATION_WORKFLOW.md`](DEVIATION_REMEDIATION_WORKFLOW.md) | 引用已归档的 `REACT_ISLANDS_EVAL.md` 路径 | 链接更新到 `_archive/reports/REACT_ISLANDS_EVAL.md`。 |
| [`docs/DOCUMENTATION_MAP.md`](../../../docs/DOCUMENTATION_MAP.md) | 没有「治理审计」与「归档」入口 | 增加本报告与 `_archive/` 索引。 |

## 4. `design.md` 精简前 / 后

**前**：约 225 行，含 TL;DR、Non-negotiable、读序、Pilot 表、全量 Component 表、Foundations 列表、Pattern/Page index、Token & schema index、外部 Prompt template、Operational notes。  
**后**：约 100 行，仅含：

- 目的与「这不是什么」（What this file is not）
- TL;DR（7 条）
- 严格读序（1–8）
- **单链接** 的 indices 路由表
- 一行 pilot 摘要 + 指向 inventory 的链接

被移走但保留的内容已在 §2.2 给出 destination。

## 5. 治理后的标准流程

| 场景 | 改这里 |
|------|--------|
| 新增 / 重命名组件 slug | [`components/README.md`](../components/README.md) 表格 + [`intent-index.md`](../components/intent-index.md) + [`COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md) |
| 改 Figma 节点 / fileKey | [`COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md) + [`../../config/figma_truth_table.json`](../../config/figma_truth_table.json)（双更新；inventory 为人读 SoT，truth_table 为脚本 SoT） |
| 改 token 流水线 | [`tokens/src/*.json`](../../tokens/src/) → 重生成 `tokens/dist/tokens.css` → 跑 `scan_token_violations.py`，过程见 [`../../checks/README.md`](../../checks/README.md) |
| 改路线 / 阶段计划 | [`REQUIREMENTS_AND_PLAN.md`](../REQUIREMENTS_AND_PLAN.md) §1 / §2 |
| 改 Arco · Figma · a11y · PR 治理 | [`ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md) |
| 改外部 AI prompt | [`../../PORTABLE_SPEC_README.md`](../../PORTABLE_SPEC_README.md) §External-tool prompt template |
| 改 AI 入口规则 | [`design.md`](../design.md)（仅在影响读序 / 非协商规则时变更） |

## 6. 双真源风险与未决

- **inventory ↔ truth_table**：[`COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md) 是人读 SoT，[`figma_truth_table.json`](../../config/figma_truth_table.json) 是脚本 SoT。本轮通过本报告 §5 流程显式声明 **双更新**；后续可考虑用脚本从 JSON 单向生成 inventory 的 Markdown 表。
- **`figma-agent/` vs `design.md`**：figma-agent 是 Figma RAG（旁路语料）。本轮通过边界声明与路径修正区分；但若 figma-agent 在 SKILL 路由中权重过高，仍可能被误读为主线，需要持续审视。
- **TDesign 归档**：归档后 `apps/dspark-vue-admin` README 中仍引用 TDesign Starter 作为视觉对照。这是 **应用层灵感参考**（L3），不影响 design-spec 主线，但需在该 README 中明确注脚（参见 §3）。

## 7. 复核清单

变更落地后须复核：

- [ ] `design.md` 不再出现 pilot 全表 / 组件大表 / prompt template / 重生成命令；
- [ ] 全部 `docs/figma-agent/...` 链接前缀正确；
- [ ] 全部 `index.md` 引用指向真实存在的 `.design-spec/index.md`；
- [ ] `_archive/` 内文件未被入口索引（design.md / DOCUMENTATION_MAP / visual-qa/README）误引为真源；
- [ ] 机器生成报告头部含「生成 / 快照」标识；
- [ ] `docs/figma-handoff/`、`docs/cross-framework/`、`visual-qa/ALIGNMENT_AUDIT_REPORT.md` 顶部含 L2/L3 边界声明；
- [ ] 修订前后所有 Markdown 链接可通（不绝对要求 CI，肉眼通读）。

复核执行结果记录在本报告下方「修订记录」。

## 8. IA 收敛动作（v0.2）

本轮按「入口收敛 + 一事一真源 + 证据层降噪」三原则继续收敛 IA。

### 8.1 入口收敛（L0）

| 文件 | 变化 |
|------|------|
| [`README.md`](../../../README.md) | 改为「单一路由 + 启动说明」：用「2 跳到达真源」表替换原先散落的描述；明确「**只读这一行**：规范在 `.design-spec/`，`docs/` 仅承载执行说明，`design-system/` 是 GitHub 门面」。 |
| [`docs/DOCUMENTATION_MAP.md`](../../../docs/DOCUMENTATION_MAP.md) | 顶部加 **TL;DR — 一事一真源** 反向表（明确每个主题的真源 + 不要去哪里找）；底部加 **维护者操作要点**（改规则只改 `.design-spec/`、`docs/` 不复述、reports 不进读序、入口最多 2 跳）。 |
| [`.design-spec/index.md`](../../index.md) | 加 L0 头部说明；与 `design.md` / `DOCUMENTATION_MAP.md` 互链；底部加「`docs/`、`design-system/`、`README.md` 出现的规范正文都视为缓存/复述」的边界提醒。 |

### 8.2 一事一真源去重（L2/L3）

| 文件 | 变化 |
|------|------|
| [`docs/components.md`](../../../docs/components.md) | 顶部加 L2 banner，声明组件参数/变体/token 真源在 `.design-spec/docs/components/*.md` 与 `.design-spec/tokens/dist/tokens.css`，本文件不做镜像。 |
| [`docs/visual-qa/COMPONENT-FIGMA-LINKS.md`](../../../docs/visual-qa/COMPONENT-FIGMA-LINKS.md) | 顶部加 L2 banner，显式声明 SoT 是 [`figma_truth_table.json`](../../config/figma_truth_table.json) + [`COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md)，本表仅为人读镜像，**禁止**作为冲突时的裁决依据。 |
| [`design-system/README.md`](../../../design-system/README.md) | 顶部加 **L3 — Façade only** banner；明确禁止在该目录新增组件/页面/token 规范正文，需要时改为链接到 `.design-spec/`。 |

### 8.3 执行层边界声明补全（L2）

为以下 `docs/visual-qa/**` 与 `.design-spec/docs/reports/**` 文件统一加层级 banner + 真源回链（之前缺失或仅在文末）：

- `docs/visual-qa/`：[`PATH-A-WORKFLOW.md`](../../../docs/visual-qa/PATH-A-WORKFLOW.md)、[`PLAYWRIGHT.md`](../../../docs/visual-qa/PLAYWRIGHT.md)、[`TOKEN-SPOTCHECK.md`](../../../docs/visual-qa/TOKEN-SPOTCHECK.md)、[`MATRIX.md`](../../../docs/visual-qa/MATRIX.md)、[`FIGMA_1_1_ALIGNMENT_PRD.md`](../../../docs/visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md)、[`README.md`](../../../docs/visual-qa/README.md)。
- `.design-spec/docs/reports/`：[`HTML_VS_DEMOS_REACT.md`](HTML_VS_DEMOS_REACT.md)、[`REACT_VS_DESIGN_SPEC_TOKENS.md`](REACT_VS_DESIGN_SPEC_TOKENS.md)、[`ARCO_PR_PRE_CHECKLIST.md`](ARCO_PR_PRE_CHECKLIST.md)、[`DEVIATION_REMEDIATION_WORKFLOW.md`](DEVIATION_REMEDIATION_WORKFLOW.md)、[`FIGMA_NAMING_AUDIT_TEMPLATE.md`](FIGMA_NAMING_AUDIT_TEMPLATE.md)。

每个 banner 声明：所在层级（L2/L3/L4）、文件不承载什么内容、与真源的回链路径。

### 8.4 入口链路验收

- `README.md` → `design.md`（2 跳到 L1 规范真源）：✅
- `README.md` → `DOCUMENTATION_MAP.md` → L1/L2/L3/L4 路由：✅
- `README.md` → `PORTABLE_SPEC_README.md`（外部打包路径）：✅
- `.design-spec/index.md` → `design.md` + `DOCUMENTATION_MAP.md`：✅
- `docs/` 与 `design-system/` 中 **不再** 出现组件/页面/token 规范正文（仅链接或执行检查清单）。
- `.design-spec/docs/reports/` 11 个报告均已自标层级；机器生成 5 个标 L4，工作流/checklist 6 个标 L2。

### 8.5 隔离无用工件（v0.2 续）

| 路径 | 类型 | 大小 | 处理 | 理由 |
|------|------|------|------|------|
| `dist/` | Vite production 构建产物 | 372K | **删除 + 加入 `.gitignore`**（`/dist/`、`.vite/`、`**/.vite/`） | 完全可由 `npm run build` 重生成；不应进入版本库。 |
| `dist-playground/` | 旧 Playground 构建产物（2026-05-10） | 352K | **删除 + 加入 `.gitignore`**（`/dist-playground/`） | 已被新 `dist/` 取代；属于历史构建快照，无审计价值。 |
| `.vite/` | Vite 依赖缓存 | 8K | **删除 + 加入 `.gitignore`** | 本地缓存，第一次启动后自动重建。 |
| `docs/figma-handoff/dashboard-fullpage.png` | 一次性手递截图 | 104K | **删除 + 加入 `.gitignore`**（`docs/figma-handoff/*.png`） | 该 PNG 由同目录 `capture-dashboard.sh` 按需重生成；文档前置 banner 已声明「非真源」；保留脚本即可。 |

副链路调整：

- [`docs/DOCUMENTATION_MAP.md`](../../../docs/DOCUMENTATION_MAP.md) L4 表格中 `dashboard-fullpage.png` 已改写为「**已隔离**，按需重生成；进入 `.gitignore`，不再常驻仓库」。
- [`docs/figma-handoff/README.md`](../../../docs/figma-handoff/README.md) banner 与 §C2 注释同步更新（描述 PNG 现在按需生成、`dist/` 与历史 `dist-playground/` 已 gitignore）。
- 本表 §1 L4 路径列表删除 `docs/figma-handoff/dashboard-fullpage.png`（不再常驻仓库）。

## 9. 修订记录

| 版本 | 日期 | 说明 |
|------|------|------|
| 0.1 | 2026-05-12 | 首版：定义 L0–L4 分层、记录归档与章节迁移、修正高风险误导点、精简 `design.md`。 |
| 0.2 | 2026-05-12 | IA 收敛：入口双路由化（README + DOCUMENTATION_MAP）、`.design-spec/index.md` 升级为 L0、执行层文档统一补 banner、reports 全量标层级、规范正文去重检查。 |
| 0.3 | 2026-05-12 | 无用工件隔离：删除 `dist/`、`dist-playground/`、`.vite/`、`docs/figma-handoff/dashboard-fullpage.png`，扩展 `.gitignore` 防回流；同步更新 `DOCUMENTATION_MAP` L4 与 `figma-handoff/README.md`。 |
