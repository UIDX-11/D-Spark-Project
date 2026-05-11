# Component: Menu

## Level

Molecular

## Aliases

- navigation menu
- sidebar menu
- application menu

## References

- Arco Design Web React（API / 行为真源）· Menu: [https://arco.design/react/components/menu](https://arco.design/react/components/menu)
- Arco Design Web React · Layout（侧栏常见 **`Layout.Sider`** + **`collapsed`** / **`onCollapse`** 组合）: [https://arco.design/react/components/layout](https://arco.design/react/components/layout)
- Arco 源码（React）: [`arco-design/components/Menu`](https://github.com/arco-design/arco-design/tree/main/components/Menu)
- Figma（Light，视觉真源）深链：
  - 一级竖向菜单项矩阵 **`vertical-menu-item/1st-level`**: [node 118145:152369](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=118145-152369)
  - 多列 Mega（二级 + 菜单组列）: [node 118125:152281](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=118125-152281)
  - 弹出子菜单项矩阵 **`pop-menu-item/1st-level`**: [node 118262:158322](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=118262-158322)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## B 线页模版（`page_templates`）与单组件 Menu demo 的边界

- **页级 HTML**（`.design-spec/demos/pages/*.html`）侧栏由 **`.pt-side` / `.pt-nav-item` / `.pt-side-toggle`** 组成，脚本见 [`.design-spec/generator/page_templates.js`](../../generator/page_templates.js)，样式见 [`.design-spec/generator/page_templates.css`](../../generator/page_templates.css)，DOM 由 [`.design-spec/generator/page_templates.py`](../../generator/page_templates.py) 生成；**不挂载** Arco Design Web React 运行时。
- **折叠行为**：在 **视口宽度 ≥ 961px** 时，通过 `.pt-app.pt-side-collapsed` 将侧栏在 **`--component-menu-container-w-expanded`（220）** 与 **`--component-menu-container-w-collapsed`（48）** 间切换；**≤960px** 时不用收起宽度（侧栏栈式全宽）。演示用 **`localStorage`** 键 **`dspark_pt_side_collapsed`**（`1` = 收起）记忆上次状态。
- **单组件 demo**（`.design-spec/demos/components/menu.html`）仍使用 **`ds-mu-*` Live** 与下表 **Arco DOM** 对齐；与页模版 **类名不同**，但 **共用** `tokens.css` 中 **`--component-menu-*`**。

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
| 侧栏 / 折叠 | 展开与收起宽度 | **单组件 Live**：**`ds-mu-nav--collapsed`**；**页模版 B 线**：**`.pt-app.pt-side-collapsed`** + **`[data-pt-side-toggle]`**（≥961px 视口） |
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

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。
- **页级 B 线**：在桌面视口实现与规格一致的 **220 / 48** 侧栏宽切换（见 **B 线页模版** 节），折叠按钮具备 **`aria-expanded`** / **`aria-controls`**。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。
- 假定「已定义 Menu token」即 **自动**具备折叠交互：页模版须 **显式**实现 `.pt-side-toggle` 与脚本（或改用 Arco Layout + Menu 真组件）。

