# Component: Breadcrumb

## Level

Molecular

## Aliases

- breadcrumb trail
- location / path nav

## References

- Arco Vue（API / 行为真源）: [https://arco.design/vue/component/breadcrumb](https://arco.design/vue/component/breadcrumb)
- Arco 源码: `arco-design-vue/packages/web-vue/components/breadcrumb/`（`breadcrumb` + `breadcrumb-item`）
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Breadcrumb** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 字号、行高、分隔符尺寸、项间距、链接水平内边距、单项 `max-width` 以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- 下方 **Sizes** 与 `tokens/src/component.json` 中 `breadcrumb.layout.*`、`breadcrumb.gap`、`breadcrumb.px`、`breadcrumb.itemMaxW`、`breadcrumb.separator.*` 对齐。

## Arco API 对齐（摘要）


| Arco `prop` / 行为        | 说明               | 本 demo                                          |
| ----------------------- | ---------------- | ----------------------------------------------- |
| `routes` / `modelValue` | 由数据驱动各级文案与链接     | 静态示例文案                                          |
| `separator`             | 自定义分隔符（字符或 slot） | 侧栏 **Separator** 映射为字符：`/`、`>`、`›`、`⌄`、`⌃`      |
| 末级为当前页                  | 最后一级不可为外链        | 末项为 `<span aria-current="page">`                |
| `max-count` 等折叠         | 中间折叠为菜单          | **collapse** 行展示 `…` 按钮（菜单逻辑见 Executable rules） |


## Arco DOM（与 demo 对齐）

- 外层 `**nav`**，`aria-label="Breadcrumb"`（或等价可本地化文案）。
- 内层 `**ol` > `li**`：每个可导航层级为 `**li` > `a**`；分隔符单独 `**li**` 且 `**aria-hidden="true"**`；当前页为 `**span**`（或不可聚焦节点）并带 `**aria-current="page"**`。
- 类名前缀本仓库为 `**ds-bc-***`，不要求与 `arco-breadcrumb*` 字符串一致。

## Best practices

- **Use for**: showing current location in hierarchy and enabling quick navigation back.
- **Last item** is current page: **not a link**, uses emphasis style.
- **Max width**: each crumb uses a max width (Figma shows `max-w=300` per link container); overflow must be handled.

## Layout patterns

- **2-level**: `Home / News`
- **3-level**: `Home / Channel / News`
- **4-level**: `Home / Channel / Users / News`
- **4+ collapsed**: `Home / … / Channel / News` (ellipsis crumb)

## Anti-patterns

- Making the current page crumb clickable.
- Truncating without tooltip/menu for hidden items.
- Using breadcrumb as primary navigation (it is secondary).

## Accessibility essentials

- Wrap in `nav` with `aria-label="Breadcrumb"`.
- Use ordered list semantics: `ol > li`.
- Current page item uses `aria-current="page"`.
- Separators are decorative: `aria-hidden="true"`.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `breadcrumb/text/slash/md/default`
  - `breadcrumb/text/chevron/md/default`
  - `breadcrumb/text/chevron/md/collapsed`

## Anatomy

```
[crumb link] [separator] [crumb link] [separator] [current crumb]
```

## Variants

### Separator kinds (from Figma)


| **Kind**        | **Visual**          | **Token**                                     |
| --------------- | ------------------- | --------------------------------------------- |
| `slash`         | `/` (line icon)     | `var(--component-breadcrumb-separator-color)` |
| `chevron`       | `>`                 | `var(--component-breadcrumb-separator-color)` |
| `chevron-right` | right arrow         | `var(--component-breadcrumb-separator-color)` |
| `chevron-down`  | down arrow (expand) | `var(--component-breadcrumb-separator-color)` |
| `chevron-up`    | up arrow (collapse) | `var(--component-breadcrumb-separator-color)` |


### Depth variants


| **Depth** | **Pattern**     | **Overflow rule**                |
| --------- | --------------- | -------------------------------- |
| `2`       | `A / B`         | no collapse                      |
| `3`       | `A / B / C`     | truncate long labels             |
| `4`       | `A / B / C / D` | truncate long labels             |
| `4+`      | `A / … / C / D` | collapse middle crumbs into menu |


## Sizes

Live 侧栏 **Depth** / **Separator** 与 **Figma / token** 对应如下（当前仅 **MD** 一档；Light）。

> Figma 单档示意：正文 **14 / 20**，分隔符占位 **16**，链接水平 **px=4**，项间距 **gap=4**，单项 **max-w=300**。


| Demo / 文档 | 字号 / 行高 token                                                                           | 分隔符占位 token                             | 间距 token                     | 链接水平 padding                | 单项 max-width                        |
| --------- | --------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------- | --------------------------- | ----------------------------------- |
| `MD`（默认）  | `--component-breadcrumb-layout-font-size` / `--component-breadcrumb-layout-line-height` | `--component-breadcrumb-separator-size` | `--component-breadcrumb-gap` | `--component-breadcrumb-px` | `--component-breadcrumb-item-max-w` |


## States


| **Part**            | **Token**                                     |
| ------------------- | --------------------------------------------- |
| Link text (default) | `var(--component-breadcrumb-link-text)`       |
| Link text (hover)   | `var(--component-breadcrumb-link-text-hover)` |
| Current text        | `var(--component-breadcrumb-current-text)`    |
| Separator color     | `var(--component-breadcrumb-separator-color)` |
| Icon size           | `var(--component-breadcrumb-separator-size)`  |


## Executable interaction rules

### Link behavior

- All crumbs except last are links.
- Click target includes the padded container (px from token).
- Hover changes link text color; underline is optional (product decision) but must be consistent.

### Overflow / collapse (required for 4+)

- For depth > 4, collapse middle crumbs into a single ellipsis crumb `…`.
- Ellipsis crumb opens a menu listing hidden crumbs in order.
- Hidden items keep their original URLs; clicking navigates accordingly.
- Current page must remain visible (last crumb is never collapsed).

### Truncation

- Each crumb label may truncate with ellipsis within its max width.
- Provide tooltip (on hover/focus) showing full label when truncated.

### Keyboard

- Tab moves across crumb links and the ellipsis control (if present).
- Ellipsis menu opens with Enter/Space; closes with Esc.

## Component token bindings (required)


| **Token path**                        | **CSS var**                                 |
| ------------------------------------- | ------------------------------------------- |
| `tokens.breadcrumb.link.text`         | `--component-breadcrumb-link-text`          |
| `tokens.breadcrumb.link.textHover`    | `--component-breadcrumb-link-text-hover`    |
| `tokens.breadcrumb.current.text`      | `--component-breadcrumb-current-text`       |
| `tokens.breadcrumb.separator.color`   | `--component-breadcrumb-separator-color`    |
| `tokens.breadcrumb.separator.size`    | `--component-breadcrumb-separator-size`     |
| `tokens.breadcrumb.gap`               | `--component-breadcrumb-gap`                |
| `tokens.breadcrumb.px`                | `--component-breadcrumb-px`                 |
| `tokens.breadcrumb.itemMaxW`          | `--component-breadcrumb-item-max-w`         |
| `tokens.breadcrumb.layout.fontSize`   | `--component-breadcrumb-layout-font-size`   |
| `tokens.breadcrumb.layout.lineHeight` | `--component-breadcrumb-layout-line-height` |
| `tokens.breadcrumb.linkFocusRing`     | `--component-breadcrumb-link-focus-ring`    |


