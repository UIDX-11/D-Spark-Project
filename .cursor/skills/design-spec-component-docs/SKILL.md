---
name: design-spec-component-docs
description: >-
  Maintains D-Spark component markdown under .design-spec/docs/components:
  Figma reference tables, Figma px vs token tables, variant/state coverage,
  Arco vs HTML demo disclaimers, and self-check sections aligned with
  datepicker.md. Use when the user edits or creates component specs, mentions
  组件文档、规格说明、对稿、Figma 链接、node-id、数值比对、token 绑定、COMPONENT_FIGMA_DOC_AUDIT,
  ALIGNMENT_GOVERNANCE, or paths like docs/components/*.md.
disable-model-invocation: false
---

# Design-spec · 组件文档（`docs/components/*.md`）

## 必须先读的真源

- **金样结构**：`.design-spec/docs/components/datepicker.md`（Figma 参考表 → token bindings → 数值比对 → Arco/demo 说明 → 自检）。
- **审计模板**：`.design-spec/docs/COMPONENT_FIGMA_DOC_AUDIT.md`。
- **治理**：`.design-spec/docs/ALIGNMENT_GOVERNANCE.md`。

## 写作顺序（新组件或改版）

1. **Figma 参考**：表格列链接（含 `node-id`）、Node ID、一句话 + 关键数字。
2. **Component token bindings**：`tokens.*` ↔ `--component-*` / `--semantic-*`。
3. **数值比对**：Figma 语义 | Inspect px | CSS 变量 | 对稿结果。
4. **Variants / States**：与 Figma 变体矩阵可逐条对上或标 N/A。
5. **实现段落**：`studio_runtime` / demo DOM **或** Arco Vue（`apps/arco-vue-datepicker`）二选一写清，并声明 demo 是否像素 1:1。
6. **生成后自检**：`scan_token_violations` 命令与硬编码禁令。
7. **结构化块（可选）**：在 md 中增加 fenced **`json`/`yaml`**，顶层含 **`schemaVersion`**（当前 `0.1.0`）与 **`kind`**（`atomic` 等），校验见 `.design-spec/schemas/spec-block.schema.json`（**`design-spec-hybrid-spec`** Skill）。
8. **必备章节**：全文须含二级标题 **`## Do`** 与 **`## Don't`**（与 Best practices / Anti-patterns 呼应，不可替代标题）。

## 禁止

- 在 md 里写与 `tokens.css` 未定义的裸数值当「规范」却不标为待对稿。
- 把 HTML demo 写成与 Figma 像素等价却不加免责声明。
- 仅用 **Anti-patterns** 代替 **`## Don't`** 标题。
