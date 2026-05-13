# Figma 1:1 偏差修复 — 执行顺序与 PR 门禁

> **Layer / 层级**: **L2 — 工程门禁工作流**。  
> 不是规范真源；命令引用的脚本与生成产物以 `.design-spec/scripts/` 与 `.design-spec/docs/reports/` 最新输出为准。

本文档固化 **「根因修复」排期**（与 gap-analysis 计划一致），并规定改 `.design-spec` 或组件 MD 时的最小命令集。

## 阶段 1 — 真源与三边一致（最高优先级）

**目标**：消除「MD References 与 `figma_truth_table.json` canonical 脱节」类问题；保证 HTML 由生成器产出且 meta 正确。

| 步骤 | 命令 / 动作 |
|------|----------------|
| 1a | 编辑真源：`.design-spec/config/figma_truth_table.json`（仅官方库 `KJfy0GFDs8kLsXTzhTxAjd`）。 |
| 1b | 同步组件 MD：在 `docs/components/<slug>.md` 的 **References** 中写入至少一条带 **相同 `node-id`** 的 Figma 深链；或运行 `python3 .design-spec/scripts/sync_md_canonical_figma.py`（幂等，补首条 canonical）。 |
| 1c | `python3 .design-spec/scripts/triad_reconcile.py` → 审阅 `docs/reports/MD_HTML_Figma_TRIAD.md`。 |
| 1d | 改 MD / `studio_runtime.*` / 生成器后：`python3 .design-spec/generator/generate_component_html_demos.py`。 |
| 1e | 再次 `python3 .design-spec/scripts/triad_reconcile.py`。 |

**说明**：真源表多 node 时，MD 至少命中其一即通过「canonical 缺失」类阻塞；其余 node 在 triad 中可能显示为「未覆盖真源表 node」，按需补链或收敛真源表。

## 阶段 2 — `studio_runtime` 与 HTML 交互子集

**目标**：降低根因 4（机械 px / 壳层）与根因 5（MD→HTML）带来的系统性偏差。

| 步骤 | 命令 / 动作 |
|------|----------------|
| 2a | `python3 .design-spec/scripts/studio_runtime_literal_audit.py`（可选 `--fail-if-px-over N` 作 CI）。 |
| 2b | 将布局/字阶从裸 `px` 迁到 `--semantic-*` / `--component-*`；大表分期清零。 |
| 2c | 对照 MD「Arco API 对齐」表，在 `studio_runtime.js` 实现已声明的键盘 / `focus-visible` / disabled / loading 等子集；未实现须在 MD 写明 **HTML 覆盖边界** 并指 `demos-react`。 |

## 阶段 3 — React（`src/`）与设计 spec token 对齐

**目标**：缓解根因 2（双管道色差）。

| 步骤 | 动作 |
|------|------|
| 3a | 阅读 [`REACT_VS_DESIGN_SPEC_TOKENS.md`](./REACT_VS_DESIGN_SPEC_TOKENS.md)。 |
| 3b | 对稿或改 UI 时，约定「产品 Button/Input 等」以 **哪一侧 CSS 变量** 为验收源，并在 PR 描述写一句。 |
| 3c | （中长期）若引入与 Playground 共用的 React demo，可共用 `src/components/ui` + 统一 theme。 |

## 阶段 4 — 渲染边界与图标真源

**目标**：根因 6、7 — 可接受 diff + 图标路径一致。

| 步骤 | 动作 |
|------|------|
| 4a | 对稿结论引用 [`docs/visual-qa/TOKEN-SPOTCHECK.md`](../../../docs/visual-qa/TOKEN-SPOTCHECK.md) 边界条款。 |
| 4b | 静态 HTML 图标仅使用 [`assets/icons/icons.manifest.json`](../../assets/icons/icons.manifest.json) 登记 SVG。 |

## 交叉引用

- PR 前 Arco / demos-react / MD：[`ARCO_PR_PRE_CHECKLIST.md`](./ARCO_PR_PRE_CHECKLIST.md)  
- Path B vs demos-react 验收：[`HTML_VS_DEMOS_REACT.md`](./HTML_VS_DEMOS_REACT.md)  
- 可选 React 岛（已归档；当前不采纳）：[`../_archive/reports/REACT_ISLANDS_EVAL.md`](../_archive/reports/REACT_ISLANDS_EVAL.md)  
