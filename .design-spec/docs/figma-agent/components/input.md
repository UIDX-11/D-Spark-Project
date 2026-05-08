# Component / 组件：Input（输入框）

> **Figma component key**: `Input` (replace with exact key from Figma)  
> **RAG chunk id**: `ds-figma-agent/input`

---

## 1. Intent / 意图（必须与 Figma 描述一致）

**中文（占位 — Sequence A 后与 Figma 对齐）**  
用于单行文本输入与展示；支持默认、禁用、错误等状态。须与 Figma Input 描述一致。

**English (placeholder — align with Figma after Sequence A)**  
Single-line text entry and display; supports default, disabled, error, and other states per the library.

---

## 2. Variant table / 变体表

> Replace with **exact** Figma variant property names and values.

| Variant property (Figma) | Allowed values | Notes ZH | Notes EN |
|--------------------------|----------------|----------|----------|
| `TBD` | `TBD` | 从 Figma 同步 | Sync from Figma |

---

## 3. Do / Don’t / 推荐与禁止

### Do / 推荐

- ZH: 为错误与占位文案预留足够宽度；与标签对齐关系按库规范。
- EN: Reserve width for error and placeholder copy; align with labels per library.

### Don’t / 禁止

- ZH: 勿用硬编码色表示错误边框；须用变量。
- EN: No ad-hoc hex for error borders; use variables.

---

## 4. Token mapping / Token 映射

| Figma variable (full path or name) | Semantic token role | Usage ZH | Usage EN |
|-----------------------------------|---------------------|----------|----------|
| `TBD` | `semantic.border.default` | 默认边框 | Default border |
| `TBD` | `semantic.text.placeholder` | 占位符 | Placeholder |

---

## 5. Figma “code examples” / Figma 侧约定

- **Auto Layout**: vertical stack for label + field + helper/error line when present; horizontal for prefix/suffix slots if defined in Figma.

---

## 6. Copy & interaction — empty / error / 文案与交互

### Empty / 空态

- ZH: 空值即无内容；不展示伪造占位数据。
- EN: Empty means no value; do not show fake data.

### Error / 错误态

- ZH: 错误文案简短、可行动；与 `error` 变体或附加层一致（以 Figma 为准）。
- EN: Short, actionable error text; match `error` variant or attachment per Figma.
