# Page: Dashboard（典型页 · canonical）

本页为 **D-Spark 默认 Dashboard 模版** 的规格入口；可交互 HTML 真源见下方 `demoPath`。其他 dashboard 变体见 [`REDUNDANCY_AUDIT.md`](../REDUNDANCY_AUDIT.md)。

## References

- 需求与阶段计划：[REQUIREMENTS_AND_PLAN.md](../REQUIREMENTS_AND_PLAN.md)
- IA：[`information-architecture.md`](information-architecture.md)
- 布局基础：[`foundations/布局.md`](../foundations/布局.md)
- 栅格：[`foundations/栅格.md`](../foundations/栅格.md)

## Do

- 生成 HTML / Figma 时优先使用本文件的 `demoPath` 与 `figma` 锚点。
- 默认 **`gridColumns: 12`**；仅在高密度业务下于 `responsive` 块显式改为 `24`。

## Don't

- 在未更新本规格的情况下切换 canonical demo 路径，避免 AI 引用分叉。

```json
{
  "schemaVersion": "0.1.0",
  "kind": "page",
  "templateId": "dashboard-default",
  "layoutShell": "header + sidebar + scrollable-main",
  "regions": [
    { "id": "toolbar", "patterns": [], "atomic": ["breadcrumb", "space"] },
    { "id": "main", "patterns": ["pro-table"], "gridColumns": 12 }
  ],
  "responsive": {
    "gridColumns": 12,
    "note": "显式 24 时在此覆盖"
  },
  "demoPath": "../../demos/pages/dashboard.html",
  "figma": {
    "fileKey": "KJfy0GFDs8kLsXTzhTxAjd",
    "pageFrameNodeId": null,
    "pageFrameNote": "典型 Dashboard 画板 node-id 由设计钉定后填入；未填前对稿以 HTML demo 与截图为准。",
    "icons": {
      "rootNodeId": "276593:77",
      "manifestPath": "../../assets/icons/icons.manifest.json"
    }
  }
}
```
