# Path A 工作流（Figma 官方库对稿）

## 真源分层

1. **视觉数值、变体、间距字色、图标**（可在 Figma 画板核对）：以 **官方 published 库** `fileKey = KJfy0GFDs8kLsXTzhTxAjd` 为准。
2. **讨论稿** `fileKey = VqEug9MsAHfG1lpRNP5FKy`：用于协作、Playground 截图并置；可能含导入实例、旧 Frame、非库内手绘，**不得**作为「已对稿」的唯一依据。

## 推荐步骤

1. 在官方库中选中组件画板 → Share → 复制带 `node-id=` 的链接。  
2. 写入 [`.design-spec/config/figma_truth_table.json`](../../.design-spec/config/figma_truth_table.json) 对应 `slug` 的 `figma_urls`。  
3. 同步 [COMPONENT-FIGMA-LINKS.md](./COMPONENT-FIGMA-LINKS.md) 与 `.design-spec/docs/components/<slug>.md` 的 References。  
4. 重跑 `python3 .design-spec/generator/generate_component_html_demos.py` 与 `python3 .design-spec/scripts/triad_reconcile.py`。  
5. 在 [MATRIX.md](./MATRIX.md) 记录 Path A 结论；Path B 指向 `.design-spec/demos/components/<slug>.html`。

## 与治理的关系

对外 API / 默认 DOM 仍以 **Arco Design Web React** 为叙述基线；与 [`.design-spec/docs/ALIGNMENT_GOVERNANCE.md`](../../.design-spec/docs/ALIGNMENT_GOVERNANCE.md) §1 一致。
