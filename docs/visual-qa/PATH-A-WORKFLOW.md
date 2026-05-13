# Path A 工作流（Figma 官方库对稿）

> **L2 — 执行流程 / 不是规范真源。**  
> 任何与组件参数 / token 的冲突以 [`.design-spec/docs/components/*.md`](../../.design-spec/docs/components/) 与 [`.design-spec/docs/ALIGNMENT_GOVERNANCE.md`](../../.design-spec/docs/ALIGNMENT_GOVERNANCE.md) 为准。

## 真源分层

1. **视觉数值、变体、间距字色、图标**（可在 Figma 画板核对）：以 **官方 published 库** `fileKey = KJfy0GFDs8kLsXTzhTxAjd` 为准。
2. **讨论稿** `fileKey = VqEug9MsAHfG1lpRNP5FKy`：用于协作、Playground 截图并置；可能含导入实例、旧 Frame、非库内手绘，**不得**作为「已对稿」的唯一依据。

## 推荐步骤

1. 在官方库中选中组件画板 → Share → 复制带 `node-id=` 的链接。  
2. 写入 [`.design-spec/config/figma_truth_table.json`](../../.design-spec/config/figma_truth_table.json) 对应 `slug` 的 `figma_urls`。  
3. 同步 [COMPONENT-FIGMA-LINKS.md](./COMPONENT-FIGMA-LINKS.md) 与 `.design-spec/docs/components/<slug>.md` 的 References。  
4. 重跑 `python3 .design-spec/generator/generate_component_html_demos.py` 与 `python3 .design-spec/scripts/triad_reconcile.py`。  
5. 在 [MATRIX.md](./MATRIX.md) 记录 Path A 结论；Path B 指向 `.design-spec/demos/components/<slug>.html`。

## Arco 比对 → demos-react → MD → HTML（与 Path A 并行）

Path A 只管 **Figma 视觉**；**交互与状态机**以 Arco npm + 官网为准，在改 MD / 跑 HTML 生成器前先走完下面短链（详见 [ARCO_PR_PRE_CHECKLIST.md](../../.design-spec/docs/reports/ARCO_PR_PRE_CHECKLIST.md)）。

1. 打开 Arco 文档（与组件 MD **References** 同 URL）。  
2. 本地 `.design-spec/demos-react`：`npm run dev`，在 [`ComponentStateMatrix.tsx`](../../.design-spec/demos-react/src/ComponentStateMatrix.tsx) 中补齐与官网可并排的 props 矩阵。  
3. 更新 `.design-spec/docs/components/<slug>.md`（推断态、与 Arco 差异、HTML 覆盖边界）。  
4. 再改 `generate_component_html_demos.py` / `studio_runtime.*` 并重跑生成器与 `triad_reconcile.py`。

**验收分工**：静态 HTML 只实现 MD 声明子集；不要求与 Arco 全量行为一致时，以 **demos-react + 官网** 为主验收面（[HTML_VS_DEMOS_REACT.md](../../.design-spec/docs/reports/HTML_VS_DEMOS_REACT.md)）。

## 与治理的关系

对外 API / 默认 DOM 仍以 **Arco Design Web React** 为叙述基线；与 [`.design-spec/docs/ALIGNMENT_GOVERNANCE.md`](../../.design-spec/docs/ALIGNMENT_GOVERNANCE.md) §1 一致。
