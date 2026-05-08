# Component / 组件：Table（表格）

> **Figma component key**: `Table` (replace with exact key from Figma)  
> **RAG chunk id**: `ds-figma-agent/table`

---

## 1. Intent / 意图（必须与 Figma 描述一致）

**中文（占位 — Sequence A 后与 Figma 对齐）**  
用于展示结构化数据列表，支持列头、行悬停、空数据等。须与 Figma Table 描述一致。

**English (placeholder — align with Figma after Sequence A)**  
Structured data grid with header row, row hover, empty data, and other states per the library.

---

## 2. Variant table / 变体表

> Replace with **exact** Figma variant property names and values.

| Variant property (Figma) | Allowed values | Notes ZH | Notes EN |
|--------------------------|----------------|----------|----------|
| `TBD` | `TBD` | 从 Figma 同步 | Sync from Figma |

---

## 3. Do / Don’t / 推荐与禁止

### Do / 推荐

- ZH: 表头与斑马纹/悬停底使用变量；空表使用专用空态组件或框架。
- EN: Header and hover/zebra fills use variables; use dedicated empty pattern.

### Don’t / 禁止

- ZH: 勿合并后用本地样式覆盖整表边框导致与库不一致。
- EN: Do not detach and override borders inconsistently with the library.

---

## 4. Token mapping / Token 映射

| Figma variable (full path or name) | Semantic token role | Usage ZH | Usage EN |
|-----------------------------------|---------------------|----------|----------|
| `TBD` | `semantic.bg.tableHeader` | 表头背景 | Header background |
| `TBD` | `semantic.bg.tableHover` | 行悬停 | Row hover |

---

## 5. Figma “code examples” / Figma 侧约定

- **Auto Layout**: column header row + scrollable body region as defined in library; align column widths to grid or documented resizing rules after Sequence A.

---

## 6. Copy & interaction — empty / error / 文案与交互

### Empty / 空态

- ZH: 无数据时展示空态插画/文案模块；与场景页一致。
- EN: Use empty-state module when no rows; align with scenario specs.

### Error / 错误态

- ZH: 加载失败时在表格区域或页级展示错误反馈（以 Figma 为准）。
- EN: Show error within table region or page-level per Figma.
