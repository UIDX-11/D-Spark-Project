# Pattern: Search-Form（筛选条）

与 [`../../components/form.md`](../../components/form.md)、[`../../components/input.md`](../../components/input.md)、[`../../components/select.md`](../../components/select.md) 等组合；通常置于列表页 `toolbar` 上方或侧栏。

## Do

- 在 `pattern` 块中列出 `fields[]`（类型、占位、是否可清空、联动规则）。
- 主按钮「查询」与「重置」成对出现；加载态与空结果在页面级 pattern 中声明。
- 复杂筛选可折叠，默认暴露 3–5 个高频字段。

## Don't

- 用筛选控件承担表单提交类长流程（应跳转独立表单页）。
- 无标签占位导致可访问名称缺失（需 `aria-label` 或可见 label）。

```json
{
  "schemaVersion": "0.1.0",
  "kind": "pattern",
  "patternId": "search-form",
  "composition": [
    { "role": "fields", "atomic": ["input", "select", "date-picker"] },
    { "role": "actions", "atomic": ["button", "space"] }
  ],
  "dataContracts": {
    "fields": [
      { "key": "keyword", "type": "input", "label": "关键词" },
      { "key": "status", "type": "select", "label": "状态" }
    ]
  },
  "behaviors": ["submit", "reset", "loading"]
}
```
