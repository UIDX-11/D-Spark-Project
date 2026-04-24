# Layout: Page List (CRUD List)

## Intent

用于典型 B 端 CRUD 列表页：筛选 → 列表 → 分页 → 批量操作（可选）。

## Skeleton (required sections)

1. **Page header**
   - Title
   - Primary action (optional)
2. **Filter / query bar**
   - 常见：`Input` / `Select` / `Cascader` / `DatePicker`（如后续补充）
3. **Results**
   - `Table` / `List`
4. **Pagination**
5. **Empty / loading / error**

## Composition rules (hard)

- **Always**:
  - 使用 `.design-spec/docs/components/` 中的分子组件拼装
  - 样式只来自 tokens（不写死 hex/spacing/radius）
  - 所有表单控件必须有 label（可见或 a11y label）
- **Never**:
  - 过滤条件超出一行时无限换行导致页面抖动（应折叠/更多）

## Recommended components

- **Filters**: `Input`, `Select`, `Cascader`, `Form`
- **Actions**: `Button`, `Dropdown`（如后续补充）
- **Results**: `Table` (优先), `List`
- **Support**: `Tabs`（当列表分组/状态筛选明显时）, `Tag`（状态/分类展示）

## States

- **Loading**: 首屏 loading + 表格 skeleton（如后续定义）
- **Empty**: 提供空态文案 + 引导操作
- **Error**: 错误提示 + retry

## Accessibility essentials

- Filter 与 results 的焦点顺序清晰
- 表格可键盘导航（如后续 Table 规范补齐后强制）

