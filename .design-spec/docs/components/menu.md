# Component: Menu

## Level

Molecular

## Aliases

- navigation menu
- sidebar menu
- application menu

## References

- Arco Vue（API / 行为真源）: [https://arco.design/vue/component/menu](https://arco.design/vue/component/menu)
- Arco 源码: `arco-design-vue/packages/web-vue/components/menu/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Menu** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **侧栏容器**：展开宽 **`menu.container.wExpanded`**（220px）、收起 **`wCollapsed`**（48px），背景 **`menu.container.bg`**。
- **菜单行**：行高 **`menu.item.h1`**，左右内边距 **`menu.item.px`**，图标与文案间距 **`menu.item.gap`**；默认 / 悬停 / 选中 / 禁用字色与底 **`menu.item.*`**。
- **分组标题**：**`menu.groupTitle`**。
- **图标 / 折叠箭头**：**`menu.icon`**、**`menu.chevron`**；禁用图标 **`menu.iconDisabled`**。
- **弹出子菜单**：**`menu.pop`**（最小宽、圆角、阴影、项内边距 **`pop.itemPx` / `itemPy`**）。

## Sizes

- 侧栏展开宽度：**220px**（`--component-menu-container-w-expanded`）；收起：**48px**（`--component-menu-container-w-collapsed`）。
- 单行高度：**38px**（`--component-menu-item-h-1`）。
- 弹出层最小宽度：**182px**（`--component-menu-pop-min-w`）。

## Arco API 对齐（摘要）

| Arco 行为 / 概念 | 说明 | 本 demo |
| ---------------- | ---- | ------- |
| 侧栏 / 折叠 | 展开与收起宽度 | 侧栏 **Side width**：**expanded** / **collapsed**（`ds-mu-nav--collapsed`） |
| 子菜单 / 弹出 | 浮层面板 | **View → pop**：**`ds-mu-pop`** + **`ds-mu-pop-item`** |
| `disabled` | 禁用项 | Live 中禁用 **`menuitem`**；矩阵 **Disabled** 行 |
| 键盘方向键 | 菜单内导航 | **`ArrowUp` / `ArrowDown`** 在可用 **`menuitem`** 间切换 **`tabindex`** 与焦点 |

## Arco DOM（与 demo 对齐）

- **侧栏**：**`nav#muRoot.ds-mu-nav`**（**`role="menu"`**），可选 **`ds-mu-nav--collapsed`**。
- **分组**：**`div.ds-mu-group`**。
- **行**：**`button.ds-mu-item`**，**`role="menuitem"`**，可选 **`aria-selected`**；内含 **`span.ds-mu-ic`**、**`span.ds-mu-lbl`**、**`span.ds-mu-chev`**。
- **弹出**：**`div.ds-mu-pop`**（**`role="menu"`**）+ **`button.ds-mu-pop-item`**。
- **类名前缀**：`ds-mu-*`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **矩阵 Hover / Selected / Focus / Disabled**：静态类 **`is-hov`**、**`is-sel`**、**`is-foc`**、**`disabled` / `is-dis`**，与 Live 同源方向。
- **弹出项悬停**：**`ds-mu-pop-item:hover`** 与 **`is-hov`** 均使用 **`--semantic-bg-page`** 作为浅色悬停底。

## Best practices

- **Use for**: primary app navigation, settings groups, or nested command lists.
- **Prefer**: clear hierarchy (group titles), consistent icon + label rhythm, and a visible selected state.
- **Collapse mode**: keep icon targets ≥ 44px where possible; provide tooltips if labels are hidden.

## Layout patterns

- **Left sidebar**: vertical stack with optional collapse to icon rail.
- **Popout submenu**: anchored to parent item; limit width and support scroll for long lists.

## Anti-patterns

- Deep nesting without search or recents (hard to discover).
- Mixing destructive actions into normal nav without confirmation.

## Accessibility essentials

- **Roles**: `role="menu"` / `role="menubar"` (Arco-dependent) with `menuitem` children.
- **Keyboard**: arrow keys to move between items; Enter to activate; Escape to close submenus when applicable.
- **Focus**: visible focus ring on the active item.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `menu/sidebar/vertical/md/expanded`
  - `menu/sidebar/vertical/sm/collapsed`
  - `menu/popover/submenu/md/default`

## Component token bindings (required)

| **Token path** | **CSS var** |
| -------------- | ----------- |
| `tokens.menu.container.bg` | `--component-menu-container-bg` |
| `tokens.menu.container.wExpanded` | `--component-menu-container-w-expanded` |
| `tokens.menu.container.wCollapsed` | `--component-menu-container-w-collapsed` |
| `tokens.menu.item.h1` | `--component-menu-item-h-1` |
| `tokens.menu.item.bgDefault` | `--component-menu-item-bg-default` |
| `tokens.menu.item.bgHover` | `--component-menu-item-bg-hover` |
| `tokens.menu.item.bgSelected` | `--component-menu-item-bg-selected` |
| `tokens.menu.item.text` | `--component-menu-item-text` |
| `tokens.menu.item.textHover` | `--component-menu-item-text-hover` |
| `tokens.menu.item.textSelected` | `--component-menu-item-text-selected` |
| `tokens.menu.item.textDisabled` | `--component-menu-item-text-disabled` |
| `tokens.menu.item.px` | `--component-menu-item-px` |
| `tokens.menu.item.gap` | `--component-menu-item-gap` |
| `tokens.menu.icon` | `--component-menu-icon` |
| `tokens.menu.iconDisabled` | `--component-menu-icon-disabled` |
| `tokens.menu.chevron` | `--component-menu-chevron` |
| `tokens.menu.groupTitle` | `--component-menu-group-title` |
| `tokens.menu.pop.bg` | `--component-menu-pop-bg` |
| `tokens.menu.pop.radius` | `--component-menu-pop-radius` |
| `tokens.menu.pop.shadow` | `--component-menu-pop-shadow` |
| `tokens.menu.pop.minW` | `--component-menu-pop-min-w` |
| `tokens.menu.pop.itemPx` | `--component-menu-pop-item-px` |
| `tokens.menu.pop.itemPy` | `--component-menu-pop-item-py` |
