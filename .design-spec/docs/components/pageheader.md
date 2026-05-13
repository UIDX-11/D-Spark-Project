# Component: PageHeader

## Level

Page (layout block)

## Aliases

- page title bar
- header bar
- content header

## References

- Figma（Light，真源表 canonical / `figma_truth_table.json`）: [Primary node](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116510-134301)
- Arco Design Web React（API / 行为真源）: https://arco.design/react/components/page-header
- Arco 源码（React）: [`arco-design/components/PageHeader`](https://github.com/arco-design/arco-design/tree/main/components/PageHeader)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 单档 **MD**：容器 **px=16 / py=12**，标题 **20/28**，副标题 **14/20**，区隔 **gap=12**，返回与标题间竖线 **h=16**；与 `tokens/src/component.json` 中 `pageHeader.*` 一致。

## Arco API 对齐（摘要）

| Arco `prop` / 区域 | 说明 | 本 demo |
| --- | --- | --- |
| `title` / `subtitle` | 主标题与副标题 | **`h1.ds-ph-title`** / **`p.ds-ph-desc`**（`minimal` 时无副标题） |
| `back` / `@back` | 返回 | **`button.ds-ph-back`**，`aria-label="Back"` |
| `breadcrumb` | 顶部面包屑 | **`breadcrumb`** Layout 时渲染 **`nav.ds-ph-bc`** |
| `extra` | 右侧扩展区 | **`actions`** 为双按钮；**`controls`** 为 **`role="radiogroup"`** 分段控件（`#phSeg`） |

## Arco DOM（与 demo 对齐）

- **根**：**`header.ds-ph`**（Live 为 **`#phRoot`**）；主行 **`div.ds-ph-row`**，左 **`div.ds-ph-left`**，右 **`div.ds-ph-right`**。
- **面包屑**：**`nav.ds-ph-bc`** + **`ol.ds-ph-bc-list`**，当前项 **`aria-current="page"`**。
- **返回**：**`button.ds-ph-back`** + **`span.ds-ph-back-ic`**（`aria-hidden="true"`）。
- **竖分隔**：**`div.ds-ph-vdiv`**（`aria-hidden="true"`），厚度 **`--component-page-header-divider-thickness`**。
- **类名前缀**：`ds-ph-*`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **返回热区**：最小 **`--component-page-header-layout-back-hit-min`**，图标字号 **`--component-page-header-back-icon-size`**。
- **标题/副标题截断**：**`white-space: nowrap`** + **`text-overflow: ellipsis`**（与文档「单行优先」一致）。
- **分段控件焦点**：**`:focus-visible`** 使用 **`--semantic-focus-ring`**。

## Best practices

- **Use for**: list/detail/form pages to provide context (title) and primary actions.
- **Left affordance**: back button is optional; use when the page is a sub-route.
- **Breadcrumb**: optional, shown above heading area when needed.
- **Actions**: keep primary actions on the right; limit to 1–2 primary/secondary buttons.

## Layout patterns

- **Default**: back + title + divider + description (left aligned).
- **With actions**: default left area + right button group.
- **With controls**: right side can host a radio-button-group (tabs-like size switcher).
- **With breadcrumb**: breadcrumb row above the heading.

## Anti-patterns

- Using PageHeader as global app header (it is per-page).
- Too many actions (move secondary actions into overflow menu).
- Title wrapping to multiple lines without spacing rules (must handle overflow).

## Accessibility essentials

- Back button is a button with `aria-label="Back"`.
- Title is the page heading: use `h1` (recommended).
- Action buttons follow normal button accessibility rules.
- Breadcrumb follows `nav aria-label="Breadcrumb"` rules (see `breadcrumb.md`).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `pageheader/default/flat/md/default`
  - `pageheader/with-actions/flat/md/default`
  - `pageheader/with-controls/flat/md/default`

## Anatomy

```
(optional) Breadcrumb row
┌──────────────────────────────────────────────────────────────┐
│ [back] Title | Description                  [controls/actions]│
└──────────────────────────────────────────────────────────────┘
```

## Variants


| **Kind**   | **Breadcrumb** | **Right area**     | **Notes**            |
| ---------- | -------------- | ------------------ | -------------------- |
| `default`  | optional       | none               | base heading         |
| `actions`  | optional       | button group       | 2 buttons in Figma   |
| `controls` | optional       | radio-button-group | “Large/Medium/Small” |


## Sizes

> Figma shows a single size with outer padding `px=16, py=12`, title `20/28`, desc `14/20`, gap `12`, inner divider `h=16`.


| **Size** | **Container**  | **Title** | **Desc** | **Back icon** |
| -------- | -------------- | --------- | -------- | ------------- |
| `MD`     | `px=16, py=12` | 20 / 28   | 14 / 20  | 20            |


## States


| **Part**     | **Token**                                 |
| ------------ | ----------------------------------------- |
| Container bg | `var(--component-page-header-bg)`         |
| Container px | `var(--component-page-header-px)`         |
| Container py | `var(--component-page-header-py)`         |
| Title text   | `var(--component-page-header-title-text)` |
| Desc text    | `var(--component-page-header-desc-text)`  |
| Divider      | `var(--component-page-header-divider)`    |
| Back icon    | `var(--component-page-header-back-icon)`  |
| Gap          | `var(--component-page-header-gap)`        |


## Executable interaction rules

### Back

- If shown, clicking back navigates to previous route.
- Back button target size must be ≥ 32×32 (recommended).

### Title & description overflow

- Title: single line preferred; if too long, truncate with ellipsis.
- Description: single line; truncate with ellipsis; do not wrap under actions.
- Provide tooltip on hover/focus when truncated (recommended).

### Right area priority

- If both controls and actions exist, controls take precedence only when explicitly required by page mode; otherwise actions first.
- When space is constrained, collapse secondary actions into overflow.

### Breadcrumb

- Breadcrumb row is optional; if present it sits above heading with small vertical spacing.

## Component token bindings (required)


| **Token path** | **CSS var** |
| --- | --- |
| `tokens.pageHeader.bg` | `--component-page-header-bg` |
| `tokens.pageHeader.px` | `--component-page-header-px` |
| `tokens.pageHeader.py` | `--component-page-header-py` |
| `tokens.pageHeader.gap` | `--component-page-header-gap` |
| `tokens.pageHeader.titleText` | `--component-page-header-title-text` |
| `tokens.pageHeader.descText` | `--component-page-header-desc-text` |
| `tokens.pageHeader.divider` | `--component-page-header-divider` |
| `tokens.pageHeader.dividerThickness` | `--component-page-header-divider-thickness` |
| `tokens.pageHeader.backIcon` | `--component-page-header-back-icon` |
| `tokens.pageHeader.backIconSize` | `--component-page-header-back-icon-size` |
| `tokens.pageHeader.layout.titleFontSize` | `--component-page-header-layout-title-font-size` |
| `tokens.pageHeader.layout.titleLineHeight` | `--component-page-header-layout-title-line-height` |
| `tokens.pageHeader.layout.descFontSize` | `--component-page-header-layout-desc-font-size` |
| `tokens.pageHeader.layout.descLineHeight` | `--component-page-header-layout-desc-line-height` |
| `tokens.pageHeader.layout.innerDividerHeight` | `--component-page-header-layout-inner-divider-height` |
| `tokens.pageHeader.layout.backHitMin` | `--component-page-header-layout-back-hit-min` |
| `tokens.pageHeader.actionBorder` | `--component-page-header-action-border` |
| `tokens.pageHeader.actionText` | `--component-page-header-action-text` |
| `tokens.pageHeader.actionBg` | `--component-page-header-action-bg` |
| `tokens.pageHeader.actionPrimaryBg` | `--component-page-header-action-primary-bg` |
| `tokens.pageHeader.actionPrimaryText` | `--component-page-header-action-primary-text` |
| `tokens.pageHeader.actionRadius` | `--component-page-header-action-radius` |
| `tokens.pageHeader.actionPaddingX` | `--component-page-header-action-padding-x` |
| `tokens.pageHeader.actionPaddingY` | `--component-page-header-action-padding-y` |
| `tokens.pageHeader.actionGroupGap` | `--component-page-header-action-group-gap` |
| `tokens.pageHeader.segBg` | `--component-page-header-seg-bg` |
| `tokens.pageHeader.segBorder` | `--component-page-header-seg-border` |
| `tokens.pageHeader.segText` | `--component-page-header-seg-text` |
| `tokens.pageHeader.segBgActive` | `--component-page-header-seg-bg-active` |
| `tokens.pageHeader.segBorderActive` | `--component-page-header-seg-border-active` |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

