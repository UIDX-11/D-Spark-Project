# Scenario / 场景：List page（列表页 / CRUD）

> **Maps to layout spec**: `.design-spec/docs/layouts/page-list.md`  
> **Prerequisite**: Table, Input, Button, Pagination (when available) exist in `docs/figma-agent/components/` after Sequence A.

---

## 1. Intent / 意图

**中文**  
典型 B 端 CRUD 列表：**筛选 → 结果（表格/列表）→ 分页**；可选批量操作；须包含加载、空态、错误态。

**English**  
Standard admin CRUD list: **filters → results (table/list) → pagination**; optional bulk actions; includes loading, empty, and error states.

---

## 2. Figma frame structure / 画板结构

| Region ZH | Region EN | Typical components |
|-----------|-----------|-------------------|
| 页头 | Page header | Title, primary action |
| 筛选区 | Filter / query bar | Input, Select, Form row |
| 结果区 | Results | Table (preferred) or List |
| 分页 | Pagination | Pagination component |
| 批量操作 | Bulk bar | Shown when selection > 0 |

---

## 3. Variable & library mandate / 变量与组件库

Same as [MASTER.md](../MASTER.md): variables from approved library file `KJfy0GFDs8kLsXTzhTxAjd`; instances from published team library.

---

## 4. Layout & Auto Layout / 布局约定

- ZH: 纵向 **Auto Layout**：页头 → 筛选条 → 表格容器 → 分页；筛选超出一行时用折叠/「更多」而非无限换行抖动。
- EN: Vertical Auto Layout stack; filters use collapse/more when wrapping would jitter.

---

## 5. Do / Don’t

### Do

- ZH: 表格与筛选 **同一页面宽度栅格**；空态提供引导操作。
- EN: Align filters and table to grid; empty state includes next action.

### Don’t

- ZH: 不要在窄卡片内塞宽表导致不可控横向滚动（除非稿侧明确要求）。
- EN: Avoid unintentional horizontal scroll from nesting wide tables in narrow cards.

---

## 6. Reference component docs / 引用组件文档

| Component | MD path |
|-----------|---------|
| Table | [../components/table.md](../components/table.md) |
| Input | [../components/input.md](../components/input.md) |
| Button | [../components/button.md](../components/button.md) |
