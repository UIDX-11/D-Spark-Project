# Pattern: Pro-Table（列表 + 工具栏 + 表格）

与 [`../../components/table.md`](../../components/table.md)、[`../../components/pagination.md`](../../components/pagination.md) 组合使用；适用于 CRUD 列表页主区域。

## Do

- 在 `pattern` 块中声明 `dataContracts.columns[]`（列 key、标题、对齐、是否可排序）。
- 工具栏操作与行操作分区；批量操作需明确禁用条件。
- 默认页面栅格 **12 列**（见 [`../../foundations/栅格.md`](../../foundations/栅格.md)）。

## Don't

- 在无规格说明时自创列宽算法而不绑定布局协议。
- 将筛选表单与表格拆成无关联的两个块而不通过 `composition` 引用 `search-form`。

```json
{
  "schemaVersion": "0.1.0",
  "kind": "pattern",
  "patternId": "pro-table",
  "composition": [
    { "role": "toolbar", "atomic": ["space", "button"] },
    { "role": "table", "atomic": ["table", "pagination"] }
  ],
  "dataContracts": {
    "columns": [
      { "key": "name", "title": "名称", "width": "flex" },
      { "key": "status", "title": "状态", "width": 120 }
    ]
  },
  "layoutShell": "content-region-12col"
}
```
