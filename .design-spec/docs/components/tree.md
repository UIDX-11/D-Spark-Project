# Component: Tree

## Level

Molecular

## Aliases

- hierarchy
- navigation tree
- taxonomy

## References

- Arco Vue（API / 行为真源）: [https://arco.design/vue/component/tree](https://arco.design/vue/component/tree)
- Arco 源码: `arco-design-vue/packages/web-vue/components/tree/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Tree** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **行**：默认/悬停/选中底与字色由 `tree.row.*` 驱动；圆角 `tree.row.radius`。
- **展开开关**：占位宽高 `tree.toggle.size`，图标色 `tree.toggle.color` / 禁用 `tree.toggle.colorDisabled`。
- **层级**：子级相对父级缩进 `tree.layout.indent` px；行最小高度 MD/SM 为 `tree.layout.rowMinH` / `rowMinSm`。
- **表格内嵌树**（Table 展开行等）：仍使用 `table.tree` → **`--component-table-tree-*`**，与独立 **Tree** 组件 token 分离。

## Sizes

- Live 行高：MD 为 **`tree.layout.rowMinH`** px，SM 为 **`tree.layout.rowMinSm`** px（侧栏 **Size** 映射 `#trRoot` 的 **`data-size`**）。
- 缩进：每加深一级子列表增加 **`tree.layout.indent`** px（`studio_runtime.css` 中嵌套 **`ul.ds-tree-list`** 的 **`padding-inline-start`**）。

## Arco API 对齐（摘要）

| Arco `prop` / 行为 | 说明 | 本 demo |
| ------------------- | ---- | ------- |
| `checkable` | 行前勾选 | 侧栏 **Mode → checkbox** 时渲染 **`span.ds-tree-cb`**，选中同步 **`aria-selected`** |
| `disabled` | 禁用节点 | Live 中 **legacy (disabled)** 行 **`aria-disabled="true"`** |
| `expandedKeys` / 展开 | 控制子树显隐 | **`aria-expanded`** + 子 **`ul`** 的 **`hidden`**；点击 **`button.ds-tree-toggle`** 切换 |
| `selectedKeys` | 选中高亮 | 点击非禁用行设置唯一 **`aria-selected="true"`**（静态示意，非受控 keys） |
| 虚拟滚动 / 拖拽 / 搜索 | 大数据与编辑场景 | Live 为结构与 **a11y** 示意，不接虚拟列表 |

## Arco DOM（与 demo 对齐）

- **根**：`**div#trRoot.ds-tree**`（`**data-size**` = md \| sm，`**data-variant**` = simple \| checkbox），**`role="tree"`**。
- **列表**：嵌套 **`ul.ds-tree-list`**，**`role="group"`**；节点 **`li.ds-tree-node`**，**`role="treeitem"`**，可选 **`aria-level`**、**`aria-expanded`**（仅可展开父节点）、**`aria-selected`**、**`aria-disabled`**。
- **行**：**`.ds-tree-row`** 包裹 **`button.ds-tree-toggle`**（或叶占位 **`span.ds-tree-toggle.ds-tree-toggle--leaf`**）、可选 **`span.ds-tree-cb`**、**`span.ds-tree-label`**。
- **类名前缀**：`ds-tree-*`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **矩阵 Hover / Selected / Focus / Disabled**：静态类 **`is-hov`**、**`is-sel`**、**`is-foc`**、**`is-dis`**（与 Live 行态同源方向），Focus 行使用 **`box-shadow: 0 0 0 2px var(--component-tree-focus-ring)`**。
- **checkbox 勾选**：复选框方格与对勾轨迹复用 **`--component-checkbox-*`**，与 Cascader 多选列一致方向。

## Best practices

- **Use for**: hierarchical data (categories, org structure, nested resources).
- **Interactions**:
  - Expand/collapse affordance must be clear and targetable.
  - Support search/filter when node count is high.
- **Selection**: clearly differentiate selection from focus/hover.

## Layout patterns

- **Master/detail**: left tree + right content panel.
- **Permissions**: tree with checkbox selection (if applicable).

## Anti-patterns

- Large trees without search (poor findability).
- Hiding expand/collapse behind hover only.

## Accessibility essentials

- **Keyboard**: follow treeview pattern (arrow keys, Home/End, expand/collapse keys).
- **Name**: each node has a clear label; icons must not be the only signal.
- **Focus**: visible focus on current node (`:focus-visible` 行环 **`--component-tree-focus-ring`**).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `tree/navigation/none/md/default`
  - `tree/selection/none/md/with-checkbox`

## Component token bindings (required)

| **Token path** | **CSS var** |
| -------------- | ----------- |
| `tokens.tree.row.bgDefault` | `--component-tree-row-bg-default` |
| `tokens.tree.row.bgHover` | `--component-tree-row-bg-hover` |
| `tokens.tree.row.bgSelected` | `--component-tree-row-bg-selected` |
| `tokens.tree.row.text` | `--component-tree-row-text` |
| `tokens.tree.row.textDisabled` | `--component-tree-row-text-disabled` |
| `tokens.tree.row.radius` | `--component-tree-row-radius` |
| `tokens.tree.toggle.size` | `--component-tree-toggle-size` |
| `tokens.tree.toggle.color` | `--component-tree-toggle-color` |
| `tokens.tree.toggle.colorDisabled` | `--component-tree-toggle-color-disabled` |
| `tokens.tree.layout.indent` | `--component-tree-layout-indent` |
| `tokens.tree.layout.rowMinH` | `--component-tree-layout-row-min-h` |
| `tokens.tree.layout.rowMinSm` | `--component-tree-layout-row-min-sm` |
| `tokens.tree.layout.rowGap` | `--component-tree-layout-row-gap` |
| `tokens.tree.layout.cbGap` | `--component-tree-layout-cb-gap` |
| `tokens.tree.focus.ring` | `--component-tree-focus-ring` |
| `tokens.table.tree.indent`（Table 内嵌） | `--component-table-tree-indent` |
| `tokens.table.tree.toggleSize` | `--component-table-tree-toggle-size` |
| `tokens.table.tree.toggleColor` | `--component-table-tree-toggle-color` |
