# Component: Cascader

## Level

Molecular

## Aliases

- hierarchical selector
- multi-level dropdown

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/cascader](https://arco.design/react/components/cascader)
- Arco 源码（React）: [`arco-design/components/Cascader`](https://github.com/arco-design/arco-design/tree/main/components/Cascader)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Cascader** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **触发器**：LG **32px** 高、水平内边距 **12px**、圆角 **6px**；SM **28px** / **8px** / **4px**；与 `tokens/src/component.json` 中 `cascader.layout.trigger*` 一致。
- **列**：固定列宽 **220px**、列内边距 **4px**、列间 **divider**；项纵向 padding LG **6px** / SM **4px**，选中列行底 `item.bgActive`。

## Arco API 对齐（摘要）


| Arco `prop` | 说明 | 本 demo |
| ----------- | ---- | ------- |
| `multiple` | 多选，父子联动 | 侧栏 **multiple** → 列内 **`ds-casc-cb`**（半选 / 勾选） |
| `error` | 校验错误 | 侧栏 **error** → **`ds-casc-trg--err`** + **`aria-invalid`** |
| `size` | 尺寸档 | 侧栏 **Size** → **`data-size="lg"` / `"sm"`**（触发器与行高 token） |
| `path-mode` / `expand-trigger` 等 | 路径展示、展开交互 | Live 未接键盘列导航；见文档 **Executable interaction rules** |

## Arco DOM（与 demo 对齐）

- **根**：`**div#csRoot.ds-casc**`（`**data-size**` / **`data-mode**`）。
- **触发器**：`**button#csTrig.ds-casc-trg**`，`**role="combobox"`** + **`aria-expanded`** + **`aria-controls="csPanel"`** + **`aria-haspopup="listbox"`**；值域为 **`.ds-casc-trg-txt`**，右侧 **`.ds-casc-trg-chev`**。
- **面板**：`**#csPanel.ds-casc-panel**`，`**role="region"`**；子级 **`.ds-casc-cols`** + **`.ds-casc-col`** + **`ul.ds-casc-ul[role="listbox"]`**，选项为 **`button.ds-casc-item[role="option"]`**。
- **类名前缀**：`ds-casc-*`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **矩阵行 Hover**：静态类 **`is-hov`**，与 **`item.bgHover`** 对齐，便于无指针环境截图。
- **矩阵行 Checked**：**`span.ds-casc-cb.is-on`**，勾选绘制与 **Checkbox** token 链一致。
- **全局 Escape**：`document` 上 **`Escape`** 关闭面板（demo 刷新时会卸装旧监听，避免重复）。

## Best practices

- **Use for**: selecting from hierarchical options where path matters.
- **Search**: provide search when options are large or deep.
- **Display**: show full path or a clear abbreviated representation.
- **Defaults**: avoid preselecting deep options unless user intent is clear.

## Layout patterns

- **Filter bar**: region/category cascader alongside other filters.
- **Form field**: cascader inside a `Form` row with validation rules.

## Anti-patterns

- Using cascader for flat lists (use `Select`).
- Very deep hierarchies without search (poor usability).

## Accessibility essentials

- **Keyboard**: must be operable without mouse; focus and selection visible.
- **Announcements**: selection changes should be perceivable; avoid silent focus jumps.
- **Name**: label the field clearly (Form label or accessible name).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `cascader/filter/rounded/md/default`
  - `cascader/form/rounded/md/error`

## Anatomy

```
┌──────────────────────────────┐
│ Trigger (Select-like)        │
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ Column 1 │ Column 2 │ Column 3 ...          │
│ item >   │ item >   │ item (leaf)           │
└──────────────────────────────────────────────┘
```

- **Trigger**: uses Select-like trigger (placeholder/value + chevron)
- **Popup**: one or more columns
- **Menu item**:
  - label
  - right arrow (has children)
  - selected indicator (single-select) OR checkbox (multi-select)

## Variants


| **Kind**   | **When to use** | **Notes**                                       |
| ---------- | --------------- | ----------------------------------------------- |
| `single`   | 单选路径            | selected shows checkmark; leaf selects value    |
| `multiple` | 多选（含半选/全选）      | checkbox state: unchecked/checked/indeterminate |


## Sizes

### Menu item


| **Size**  | **Height** | **Padding Y**                          | **Radius**                                 | **Text size** |
| --------- | ---------- | -------------------------------------- | ------------------------------------------ | ------------- |
| `lg` (32) | 32         | `var(--component-cascader-item-py-lg)` | `var(--component-cascader-item-radius-lg)` | 14            |
| `sm` (28) | 28         | `var(--component-cascader-item-py-sm)` | `var(--component-cascader-item-radius-sm)` | 14            |


## States

### Menu item — states


| **State**      | **Background**                              | **Text**                                       | **Right icon**                                 |
| -------------- | ------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Default        | `var(--component-cascader-item-bg-default)` | `var(--component-cascader-item-text-default)`  | `var(--component-cascader-item-icon-default)`  |
| Hover / Active | `var(--component-cascader-item-bg-hover)`   | `var(--component-cascader-item-text-default)`  | `var(--component-cascader-item-icon-default)`  |
| Disabled       | `var(--component-cascader-item-bg-default)` | `var(--component-cascader-item-text-disabled)` | `var(--component-cascader-item-icon-disabled)` |


### Checkbox states (multi-select)

> Checkbox visuals follow `Checkbox` component tokens. Cascader only specifies layout + item bg/text/icon.


| **State**     | **Checkbox**           | **Meaning**                |
| ------------- | ---------------------- | -------------------------- |
| Unchecked     | checkbox unchecked     | none selected in subtree   |
| Checked       | checkbox checked       | all selected in subtree    |
| Indeterminate | checkbox indeterminate | partially selected subtree |


## Executable interaction rules

### Navigation & selection

- **Arrow indicator**: show right arrow only for nodes with children.
- **Hover**:
  - Hovering a non-leaf row opens its next column (do not require click).
  - Hovering a leaf does not open a new column.
- **Click**:
  - Single: clicking a leaf selects and closes popup (unless “apply” workflow is used).
  - Multiple: clicking checkbox toggles; clicking row toggles checkbox only if product chooses row-as-toggle (must be consistent).
- **Disabled item**: cannot be focused/selected; its checkbox (if any) is disabled.

### Multi-select propagation (required)

- Selecting a parent selects all enabled children.
- Deselecting a parent deselects all enabled children.
- Parent checkbox becomes **indeterminate** when some (not all) enabled descendants are selected.

### Keyboard & ARIA (required)

- Trigger: `aria-haspopup="tree"` or `listbox` (implementation choice), `aria-expanded`.
- Popup items must be reachable via keyboard:
  - ArrowUp/Down moves within current column (skip disabled).
  - ArrowRight opens next column when node has children.
  - ArrowLeft returns to previous column.
  - Enter selects (single) / toggles (multiple).
  - Esc closes.

## Component token bindings (required)


| **Token path**                         | **CSS var**                                   |
| -------------------------------------- | --------------------------------------------- |
| `tokens.cascader.popup.bg`             | `--component-cascader-popup-bg`               |
| `tokens.cascader.popup.radius`         | `--component-cascader-popup-radius`           |
| `tokens.cascader.popup.shadow`         | `--component-cascader-popup-shadow`           |
| `tokens.cascader.popup.p`              | `--component-cascader-popup-p`                |
| `tokens.cascader.column.bg`            | `--component-cascader-column-bg`              |
| `tokens.cascader.column.divider`       | `--component-cascader-column-divider`         |
| `tokens.cascader.column.width`         | `--component-cascader-column-width`           |
| `tokens.cascader.column.p`             | `--component-cascader-column-p`               |
| `tokens.cascader.item.bgDefault`       | `--component-cascader-item-bg-default`        |
| `tokens.cascader.item.bgHover`         | `--component-cascader-item-bg-hover`          |
| `tokens.cascader.item.textDefault`     | `--component-cascader-item-text-default`      |
| `tokens.cascader.item.textDisabled`    | `--component-cascader-item-text-disabled`     |
| `tokens.cascader.item.iconDefault`     | `--component-cascader-item-icon-default`      |
| `tokens.cascader.item.iconDisabled`    | `--component-cascader-item-icon-disabled`     |
| `tokens.cascader.item.radiusLg`        | `--component-cascader-item-radius-lg`         |
| `tokens.cascader.item.radiusSm`        | `--component-cascader-item-radius-sm`         |
| `tokens.cascader.item.px`              | `--component-cascader-item-px`                |
| `tokens.cascader.item.gap`             | `--component-cascader-item-gap`               |
| `tokens.cascader.item.gapWithCheckbox` | `--component-cascader-item-gap-with-checkbox` |
| `tokens.cascader.item.pyLg`            | `--component-cascader-item-py-lg`             |
| `tokens.cascader.item.pySm`            | `--component-cascader-item-py-sm`             |
| `tokens.cascader.item.minWidth`        | `--component-cascader-item-min-width`         |
| `tokens.cascader.item.bgActive`       | `--component-cascader-item-bg-active`         |
| `tokens.cascader.check.size`           | `--component-cascader-check-size`             |
| `tokens.cascader.trigger.bgDefault`   | `--component-cascader-trigger-bg-default`     |
| `tokens.cascader.trigger.bgHover`     | `--component-cascader-trigger-bg-hover`       |
| `tokens.cascader.trigger.borderDefault` | `--component-cascader-trigger-border-default` |
| `tokens.cascader.trigger.borderFocus` | `--component-cascader-trigger-border-focus`   |
| `tokens.cascader.trigger.borderError` | `--component-cascader-trigger-border-error`   |
| `tokens.cascader.trigger.textPlaceholder` | `--component-cascader-trigger-text-placeholder` |
| `tokens.cascader.trigger.textValue`  | `--component-cascader-trigger-text-value`     |
| `tokens.cascader.trigger.ringFocus`  | `--component-cascader-trigger-ring-focus`     |
| `tokens.cascader.layout.triggerHeightLg` | `--component-cascader-layout-trigger-height-lg` |
| `tokens.cascader.layout.triggerHeightSm` | `--component-cascader-layout-trigger-height-sm` |
| `tokens.cascader.layout.triggerPadLg` | `--component-cascader-layout-trigger-pad-lg`   |
| `tokens.cascader.layout.triggerPadSm` | `--component-cascader-layout-trigger-pad-sm`   |
| `tokens.cascader.layout.triggerRadiusLg` | `--component-cascader-layout-trigger-radius-lg` |
| `tokens.cascader.layout.triggerRadiusSm` | `--component-cascader-layout-trigger-radius-sm` |
| `tokens.cascader.layout.triggerFontLg` | `--component-cascader-layout-trigger-font-lg` |
| `tokens.cascader.layout.triggerFontSm` | `--component-cascader-layout-trigger-font-sm` |
| `tokens.cascader.layout.triggerLineLg` | `--component-cascader-layout-trigger-line-lg` |
| `tokens.cascader.layout.triggerLineSm` | `--component-cascader-layout-trigger-line-sm` |
| `tokens.cascader.layout.chevLg`       | `--component-cascader-layout-chev-lg`         |
| `tokens.cascader.layout.chevSm`     | `--component-cascader-layout-chev-sm`       |
| `tokens.cascader.layout.chevStrokeWidth` | `--component-cascader-layout-chev-stroke-width` |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

