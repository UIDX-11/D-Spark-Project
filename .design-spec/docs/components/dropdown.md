# Component: Dropdown

## Level

Molecular

## Aliases

- dropdown menu
- context menu
- overflow menu

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/dropdown](https://arco.design/react/components/dropdown)
- Arco 源码（React）: [`arco-design/components/Dropdown`](https://github.com/arco-design/arco-design/tree/main/components/Dropdown)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Dropdown** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 触发器 **M/L** 高度、水平 padding、圆角与菜单项 **MD/SM** 行高、圆角、间距以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- 数值与 `**tokens/src/component.json`** 中 `dropdown.trigger.*`、`dropdown.item.*`、`dropdown.panel.*` 一致；生成变量为 `**--component-dropdown-*`**。

## Arco API 对齐（摘要）


| Arco `prop` / 行为       | 说明     | 本 demo                                               |
| ---------------------- | ------ | ---------------------------------------------------- |
| `popup-visible` / 点击触发 | 默认点击展开 | 点击 `**#ddTrig`** 切换 `**#ddMenu`**，`aria-expanded` 同步 |
| `position`             | 对齐与翻转  | 演示为触发器下方左对齐（未实现 Popper 翻转）                           |
| `trigger`              | 触发器为按钮 | `**button.ds-dd-trg**`                               |


## Arco DOM（与 demo 对齐）

- **触发器**：`**button.ds-dd-trg`**，`aria-haspopup="menu"`、`aria-controls` / `aria-expanded`。
- **面板**：`**div#ddMenu.ds-dd-panel`**，`role="menu"`；子项为 `**button`** 且 `**role="menuitem"**`（与 Arco 可能使用 `li` 包裹不要求字符串一致）。
- 类名前缀 `**ds-dd-***`，不要求与 `arco-dropdown` 字符串一致。

## 推断（Figma 未单独画出的状态）

- **键盘焦点**：触发器与菜单项使用 `**:focus-visible`** + `**--semantic-focus-ring`** 外/内描边，避免鼠标点击双环。
- **搜索框**：复用 `**--component-input-layout-s-`*** 控制高度与水平 padding；边框与占位符走 `**--semantic-border-default`** / `**--semantic-text-placeholder`**（见治理「先 semantic」）。
- **面板最小高度（search）**：`dropdown.panel.searchMinHeight` 保证空结果时仍保留 Figma 注明的可视高度。

## Best practices

- **Use for**: exposing secondary actions or choices from a trigger.
- **Danger actions**: destructive items (e.g. Delete) must be styled as danger and separated (Figma shows a divider before Delete).
- **Searchable dropdown**: when list is long, provide search box; minimum panel height 200px when results are few (Figma note).

## Layout patterns

- **Menu only**: panel with items.
- **Menu with divider**: groups + separators.
- **Menu with search**: top search field + list; optional favorites/star.
- **Submenu**: item with right chevron opens nested panel.

## Anti-patterns

- Opening on hover for primary actions (prefer click).
- Closing menu when interacting with internal checkbox (multi-select) unexpectedly.
- Putting destructive action next to safe actions without grouping/divider.

## Accessibility essentials

- Trigger: `button` with `aria-haspopup="menu"` and `aria-expanded`.
- Menu: `role="menu"`, items: `role="menuitem"` / `menuitemcheckbox` / `menuitemradio`.
- Keyboard: Arrow keys navigate items; Enter activates; Esc closes.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `dropdown/menu/rounded/md/default`
  - `dropdown/menu/rounded/md/with-search`
  - `dropdown/menu/rounded/md/danger-item`

## Anatomy

```
Trigger (optional)
┌──────────────────────────────┐
│ (optional) Search            │
│ Item                         │
│ Item (hover)                 │
│ -------- divider --------     │
│ Delete (danger)              │
└──────────────────────────────┘
```

## Variants

### Trigger variants (from Figma)


| **Size** | **Height** | **Padding X** | **Radius** | **Text** |
| -------- | ---------- | ------------- | ---------- | -------- |
| `L`      | 36         | 8             | 8          | 16 / 22  |
| `M`      | 32         | 8             | 8          | 14 / 20  |


### Menu item variants (from Figma)


| **Style**          | **Use case**       | **Left**      | **Right**                |
| ------------------ | ------------------ | ------------- | ------------------------ |
| `default`          | plain action       | optional icon | optional submenu chevron |
| `single-selected`  | single selection   | optional icon | checkmark                |
| `multi-selected`   | multi selection    | optional icon | checkmark                |
| `leading-checkbox` | multi select list  | checkbox      | none                     |
| `danger`           | destructive action | optional icon | none                     |


### Menu item sizes (from Figma)


| **Size** | **Height** | **Padding Y** | **Radius** | **Gap** |
| -------- | ---------- | ------------- | ---------- | ------- |
| `MD`     | 32         | 6             | 6          | 12      |
| `SM`     | 28         | 4             | 4          | 8       |


## States

> 面板内边距、项间距、分隔边距、搜索最小高度等见 **Component token bindings** 中 `dropdown.panel.`*、`dropdown.item.`*、`dropdown.dividerMargin*`、`dropdown.check.*`。


| **Part**             | **Token**                                      |
| -------------------- | ---------------------------------------------- |
| Panel bg             | `var(--component-dropdown-panel-bg)`           |
| Panel radius         | `var(--component-dropdown-panel-radius)`       |
| Panel shadow         | `var(--component-dropdown-panel-shadow)`       |
| Item bg (default)    | `var(--component-dropdown-item-bg-default)`    |
| Item bg (hover)      | `var(--component-dropdown-item-bg-hover)`      |
| Item text (default)  | `var(--component-dropdown-item-text)`          |
| Item text (disabled) | `var(--component-dropdown-item-text-disabled)` |
| Item text (danger)   | `var(--component-dropdown-item-text-danger)`   |
| Divider              | `var(--component-dropdown-divider)`            |
| Icon                 | `var(--component-dropdown-icon)`               |
| Icon disabled        | `var(--component-dropdown-icon-disabled)`      |
| Check icon           | `var(--component-dropdown-check-icon)`         |
| Submenu chevron      | `var(--component-dropdown-submenu-icon)`       |


## Executable interaction rules

### Open/close

- Default open on click (recommended).
- Close when:
  - clicking outside
  - selecting a `menuitem` action
  - pressing `Esc`
- Do **not** auto-close when toggling `menuitemcheckbox` (multi-select) unless `closeOnSelect=true`.

### Positioning

- Prefer aligning panel to trigger left edge; flip when overflow.
- Keep within viewport; apply max height with internal scroll for long lists.

### Hover intent for submenu

- Submenu opens on hover with small delay (100–200ms recommended).
- Moving mouse away closes after delay unless pointer enters submenu panel.

### Search

- Search input filters items; highlight matches (optional).
- When results are few, keep panel min height 200px (Figma note).
- Empty state: “0 results” (recommended).

### Danger item (required)

- Destructive items use danger text color.
- Place a divider before the destructive group (as in Figma).

## Component token bindings (required)


| **Token path**                          | **CSS var**                                    |
| --------------------------------------- | ---------------------------------------------- |
| `tokens.dropdown.panel.bg`              | `--component-dropdown-panel-bg`                |
| `tokens.dropdown.panel.radius`          | `--component-dropdown-panel-radius`            |
| `tokens.dropdown.panel.shadow`          | `--component-dropdown-panel-shadow`            |
| `tokens.dropdown.panel.padding`         | `--component-dropdown-panel-padding`           |
| `tokens.dropdown.panel.gap`             | `--component-dropdown-panel-gap`               |
| `tokens.dropdown.panel.offsetY`         | `--component-dropdown-panel-offset-y`          |
| `tokens.dropdown.panel.minWidth`        | `--component-dropdown-panel-min-width`         |
| `tokens.dropdown.panel.searchMinHeight` | `--component-dropdown-panel-search-min-height` |
| `tokens.dropdown.item.bgDefault`        | `--component-dropdown-item-bg-default`         |
| `tokens.dropdown.item.bgHover`          | `--component-dropdown-item-bg-hover`           |
| `tokens.dropdown.item.text`             | `--component-dropdown-item-text`               |
| `tokens.dropdown.item.textDisabled`     | `--component-dropdown-item-text-disabled`      |
| `tokens.dropdown.item.textDanger`       | `--component-dropdown-item-text-danger`        |
| `tokens.dropdown.item.radiusMd`         | `--component-dropdown-item-radius-md`          |
| `tokens.dropdown.item.radiusSm`         | `--component-dropdown-item-radius-sm`          |
| `tokens.dropdown.item.hMd`              | `--component-dropdown-item-h-md`               |
| `tokens.dropdown.item.hSm`              | `--component-dropdown-item-h-sm`               |
| `tokens.dropdown.item.gapMd`            | `--component-dropdown-item-gap-md`             |
| `tokens.dropdown.item.gapSm`            | `--component-dropdown-item-gap-sm`             |
| `tokens.dropdown.item.px`               | `--component-dropdown-item-px`                 |
| `tokens.dropdown.item.pyMd`             | `--component-dropdown-item-py-md`              |
| `tokens.dropdown.item.pySm`             | `--component-dropdown-item-py-sm`              |
| `tokens.dropdown.item.fontSize`         | `--component-dropdown-item-font-size`          |
| `tokens.dropdown.item.lineHeight`       | `--component-dropdown-item-line-height`        |
| `tokens.dropdown.divider`               | `--component-dropdown-divider`                 |
| `tokens.dropdown.dividerMarginY`        | `--component-dropdown-divider-margin-y`        |
| `tokens.dropdown.dividerMarginX`        | `--component-dropdown-divider-margin-x`        |
| `tokens.dropdown.check.size`            | `--component-dropdown-check-size`              |
| `tokens.dropdown.check.radius`          | `--component-dropdown-check-radius`            |
| `tokens.dropdown.icon`                  | `--component-dropdown-icon`                    |
| `tokens.dropdown.iconDisabled`          | `--component-dropdown-icon-disabled`           |
| `tokens.dropdown.checkIcon`             | `--component-dropdown-check-icon`              |
| `tokens.dropdown.submenuIcon`           | `--component-dropdown-submenu-icon`            |
| `tokens.dropdown.trigger.bgHover`       | `--component-dropdown-trigger-bg-hover`        |
| `tokens.dropdown.trigger.bgActive`      | `--component-dropdown-trigger-bg-active`       |
| `tokens.dropdown.trigger.text`          | `--component-dropdown-trigger-text`            |
| `tokens.dropdown.trigger.textDisabled`  | `--component-dropdown-trigger-text-disabled`   |
| `tokens.dropdown.trigger.textDisabledL` | `--component-dropdown-trigger-text-disabled-l` |
| `tokens.dropdown.trigger.textDisabledM` | `--component-dropdown-trigger-text-disabled-m` |
| `tokens.dropdown.trigger.radius`        | `--component-dropdown-trigger-radius`          |
| `tokens.dropdown.trigger.px`            | `--component-dropdown-trigger-px`              |
| `tokens.dropdown.trigger.hM`            | `--component-dropdown-trigger-h-m`             |
| `tokens.dropdown.trigger.hL`            | `--component-dropdown-trigger-h-l`             |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

