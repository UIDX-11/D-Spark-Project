# Component / 组件：Table（表格）

> **Figma component key**: *(audit — paste from library)*  
> **RAG chunk id**: `ds-figma-agent/table`  
> **Dev reference (Vue/HTML 勿作主 RAG)**: `.design-spec/docs/components/table.md`

---

## 1. Intent / 意图（必须与 Figma 描述一致）

**中文**  
用于展示可比较多列的结构化数据；支持排序、筛选、行悬停、选中、加载与空数据；列宽与滚动行为须稳定。

**English**  
Structured comparable data in rows/columns; supports sort, filter, hover, selection, loading, empty; stable column widths and scroll behavior.

> **Sequence A**: Replace with **Figma documentation** strings (ZH + EN).

---

## 2. Variant table / 变体表

> **Audit** against library. Axes derived from `.design-spec/docs/components/table.md`.

| Variant property (Figma) — placeholder | Allowed values | Notes |
|----------------------------------------|----------------|-------|
| `Kind` | basic, striped, bordered, sticky-header, … | Match published set. |
| `Density` | compact, default, comfortable | Row heights (e.g. 36 / 44 / 52) — **confirm in Figma**. |
| `Selection` | none, with-selection | Checkbox column + bulk bar. |
| `Actions` | none, with-actions | Action column width stable. |
| `State` *(frame)* | default, loading, empty, error | Header stays visible when possible; skeleton for loading. |

---

## 3. Do / Don’t / 推荐与禁止

### Do / 推荐

- ZH: 表头与行背景、分割线一律走变量；空态区分 **页面级空** 与 **局部空**（见 dev 文档 Figma 说明）。
- EN: Token-only surfaces; distinguish **page empty** vs **local empty** per spec.

### Don’t / 禁止

- ZH: 勿用表格做纯排版栅格（用 Layout / Space）。
- EN: Do not use table for page layout grids.

---

## 4. Token mapping / Token 映射

| Figma variable *(audit)* | Repo role | CSS reference *(examples)* |
|---------------------------|-----------|------------------------------|
| *(table surface)* | `tokens.table.bg` | `--component-table-bg` |
| *(header bg)* | `tokens.table.header.bg` | `--component-table-header-bg` |
| *(row hover)* | `semantic.bg.tableHover` | `--semantic-bg-table-hover` |
| *(row default)* | `tokens.table.row.bgDefault` | `--component-table-row-bg-default` |
| *(border)* | `tokens.table.border` | `--component-table-border` |

Full matrix: `.design-spec/docs/components/table.md` → Component token bindings.

---

## 5. Figma “code examples” / Figma 侧约定

### Instance naming

```
Table / {kind}-{density}
Example: Table / basic-default
```

### Auto Layout

- **Column header row**: separate Auto Layout from body; sticky header per library.
- **Body**: vertical stack of rows; horizontal scroll container aligns header and body.

---

## 6. Copy & interaction — empty / error / 文案与交互

### Empty / 空态

- ZH: **页面空**与**列表空**插画/文案层级不同（稿侧区分线色与组件规格）。
- EN: Page vs local empty patterns differ—follow Figma reference frames.

### Error / 错误态

- ZH: 加载失败时表格区内或页级错误反馈；保留表头若可能。
- EN: Show error in table region or page-level; keep header when specified.
