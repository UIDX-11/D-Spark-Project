# Component: Tabs

## Level

Molecular

## Aliases

- segmented navigation (when simplified)
- sub-page switcher

## References

- Figma（Light，真源表 canonical / `figma_truth_table.json`）: [Primary node](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124009-129610)
- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/tabs](https://arco.design/react/components/tabs)
- Arco 源码（React）: [`arco-design/components/Tabs`](https://github.com/arco-design/arco-design/tree/main/components/Tabs)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **Underline**：水平间距与下划线厚度见 `tabs.underline.*`（`px` / `pyLg` / `pyMd` / `indicatorThickness` 等）。
- **Border**：四档高度对应 `tabs.border.pyS` … `pyXL` 与 `radiusSm` / `radiusMd` / `radiusLg`。
- **分段、可滚动、纵向**：分别见 `tabs.segmented.*`、`tabs.scrollable.*`、`tabs.vertical.*`。

## Arco API 对齐（摘要）


| Arco `prop` | 说明 | 本 demo |
| ----------- | ---- | ------- |
| `type` / 形态 | `line` / `card` / `rounded` 等 | 侧栏 **Kind** → **`underline`** / **`pill`** / **`segmented`** / **`border`** / **`vertical`** / **`scrollable`**（槽位+关闭） |
| `direction` | `horizontal` / `vertical` | **vertical** → **`data-orientation="vertical"`** + 纵向键盘 |
| `editable` / `show-add-button` | 可编辑标签、添加 | Live 未接 **+** 与重命名；见文档 **Add tab (+)** |
| `destroy-on-hide` 等 | 面板销毁策略 | Live 仅用 **`hidden`** 切换显隐 |

## Arco DOM（与 demo 对齐）

- **根**：`**div#tbRoot.ds-tabs**` + 形态类 **`ds-tabs--underline`** 等；**vertical** 时 **`data-orientation="vertical"`**；**underline** 使用 **`data-size="lg"` / `"md"`**；**border** 使用 **`data-border-size="xl"|"lg"|"md"|"sm"`**。
- **Tab 条**：`**div.ds-tabs-bar` → `div[role="tablist"].ds-tabs-list`**。
- **Tab**：默认 **`<button type="button" role="tab" class="ds-tabs-tab">`**；**scrollable** 为 **`div[role="tab"].ds-tabs-tab`**，内 **`button.ds-tabs-close`**（`tabindex="-1"`）避免嵌套可聚焦按钮。
- **面板区**：`**div.ds-tabs-panels`** 内 **`section.ds-tabs-panel`**，**`role="tabpanel"`**，**`aria-labelledby`** 指向对应 tab **`id`**。
- **类名前缀**：`ds-tabs-*`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **矩阵 Focus 行**：**`is-foc`** + **`box-shadow: 0 0 0 2px var(--semantic-focus-ring)`**，与键盘 **`focus-visible`** 同向。
- **矩阵 Hover / Selected**：**`is-hov`**、**`is-sel`** 静态类，便于无指针截图；与 **`aria-selected`** 态并存时以矩阵行为准。
- **分段容器外圆角**：demo 使用 **`--component-tabs-border-radius-md`** 作为分段条外轮廓（Figma 若单独标注可再拆 token）。

## Best practices

- **Use for**: switching between related views at the same hierarchy level.
- **Labeling**: short, noun labels; avoid sentence-like labels.
- **Counts**: if showing counts, keep formatting stable (avoid layout shift).
- **Overflow**: support scrollable tab bar or overflow menu for many tabs.

## Layout patterns

- **Detail page**: base info + tabs for related sections.
- **Module navigation**: tabs under page header for sub-areas.

## Anti-patterns

- Nesting multiple tab sets deeply (navigation confusion).
- Using tabs to hide required steps in a flow (use stepper/wizard patterns).

## Accessibility essentials

- **Keyboard**: follow tabs ARIA pattern (arrow keys to move, Enter/Space to activate).
- **Focus**: visible focus on tab; active state distinct from focus state.
- **Name**: tabs have clear labels; icons alone are insufficient.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `tabs/line/rounded/md/default`
  - `tabs/line/rounded/md/overflow`

## Anatomy

### Underline tabs (horizontal)

```
┌────────────────────────────────────────────┐
│ Tab 1  Tab 2  Tab 3 ...              [>]  │
├─────── active indicator (underline) ───────┤
│ Panel content                              │
└────────────────────────────────────────────┘
```

- **Tab item**: (optional icon) + label (+ optional close)
- **Indicator**: underline for selected tab
- **Overflow**: scrollable rail + direction buttons

### Pill tabs

```
┌───────────────────────────────┐
│ ( Tab1 ) ( Tab2 ) ( Tab3 )    │
└───────────────────────────────┘
```

- Used when tabs behave like “chips”

### Segmented tabs

```
┌───────────────────────────────┐
│ Tab1 | Tab2 | Tab3            │
└───────────────────────────────┘
```

### Scrollable / slot tabs (card-slot)

```
┌────────────────────────────────────────────┐
│ [Tab1 ×][Tab2 ×][Tab3 ×] ...          [+]  │
└────────────────────────────────────────────┘
```

### Vertical tabs

```
┌──────────────┬─────────────────────────────┐
│ Tab 1 ▌      │ Panel content               │
│ Tab 2        │                             │
│ Tab 3        │                             │
└──────────────┴─────────────────────────────┘
```

- Uses **right-side indicator** for selected item

## Variants

| **Kind** | **When to use** | **Notes** |
| --- | --- | --- |
| `underline` | 默认信息架构下的同级视图切换 | Selected = underline + semibold label |
| `pill` | 轻量筛选/子区域切换 | Selected = filled pill |
| `segmented` | 更强对齐的分段控制器 | Dividers between items |
| `scrollable` | 数量多/可关闭/可新增 tab | Supports close + add |
| `vertical` | 左侧导航 + 右侧内容 | Selected = right indicator |
| `border` | “边框选项卡”风格 | Selected border stronger |

## Sizes

### Underline tabs

| **Size** | **Horizontal padding** | **Vertical padding** | **Height** | **Gap** |
| --- | --- | --- | --- | --- |
| `lg` (L44) | `var(--component-tabs-underline-px)` | `var(--component-tabs-underline-py-lg)` | auto | `var(--component-tabs-underline-gap)` |
| `md` (M32) | `var(--component-tabs-underline-px)` | `var(--component-tabs-underline-py-md)` | `var(--component-tabs-underline-h-md)` | `var(--component-tabs-underline-gap)` |

### Border tabs

| **Size** | **Radius** | **Padding X** | **Padding Y** |
| --- | --- | --- | --- |
| `xl` (36) | `var(--component-tabs-border-radius-lg)` | `var(--component-tabs-border-px)` | `var(--component-tabs-border-py-xl)` |
| `lg` (32) | `var(--component-tabs-border-radius-md)` | `var(--component-tabs-border-px)` | `var(--component-tabs-border-py-l)` |
| `md` (28) | `var(--component-tabs-border-radius-sm)` | `var(--component-tabs-border-px)` | `var(--component-tabs-border-py-m)` |
| `sm` (24) | `var(--component-tabs-border-radius-sm)` | `var(--component-tabs-border-px)` | `var(--component-tabs-border-py-s)` |

## States

### Underline tabs — item states

| **State** | **Text** | **Indicator** |
| --- | --- | --- |
| Default | `var(--component-tabs-underline-text-default)` | none |
| Hover | `var(--component-tabs-underline-text-hover)` | none |
| Selected | `var(--component-tabs-underline-text-selected)` | `var(--component-tabs-underline-indicator-selected)` |
| Disabled | `var(--component-tabs-underline-text-disabled)` | none |

### Pill tabs — item states

| **State** | **Background** | **Text** |
| --- | --- | --- |
| Default | `var(--component-tabs-pill-bg-default)` | `var(--component-tabs-pill-text-default)` |
| Hover | `var(--component-tabs-pill-bg-hover)` | `var(--component-tabs-pill-text-hover)` |
| Selected | `var(--component-tabs-pill-bg-selected)` | `var(--component-tabs-pill-text-selected)` |
| Disabled | `var(--component-tabs-pill-bg-disabled)` | `var(--component-tabs-pill-text-disabled)` |

### Vertical tabs — item states

| **State** | **Wrapper bg** | **Text** | **Right indicator** |
| --- | --- | --- | --- |
| Default | `var(--component-tabs-vertical-wrapper-bg-default)` | `var(--component-tabs-vertical-text-default)` | none |
| Hover | `var(--component-tabs-vertical-wrapper-bg-hover)` | `var(--component-tabs-vertical-text-default)` | none |
| Selected | `var(--component-tabs-vertical-wrapper-bg-default)` | `var(--component-tabs-vertical-text-selected)` | `var(--component-tabs-vertical-indicator-selected)` |
| Disabled | `var(--component-tabs-vertical-wrapper-bg-default)` | `var(--component-tabs-vertical-text-disabled)` | none |

### Scrollable tabs — item states (slot tabs)

| **State** | **Background** | **Border** | **Text** |
| --- | --- | --- | --- |
| Default | `var(--component-tabs-scrollable-item-bg-default)` | `var(--component-tabs-scrollable-item-border)` | `var(--component-tabs-scrollable-item-text-default)` |
| Selected | `var(--component-tabs-scrollable-item-bg-selected)` | `var(--component-tabs-scrollable-item-border)` | `var(--component-tabs-scrollable-item-text-selected)` |

## Executable interaction rules

### Overflow rule (scroll vs menu)

- **When overflow happens**: tabs row width exceeds container.
- **Default strategy**: keep the row **horizontally scrollable** and show **direction buttons** (left/right).
- **Menu strategy (optional)**: if product requires fast jump, provide an **overflow menu** (“More”) that lists all tabs.
- **Priority**:
  - **Scrollable** is default (keeps spatial memory).
  - **Menu** is an additive shortcut; never remove the currently selected tab from the visible rail.
- **Direction buttons behavior**:
  - **Enabled** only when there is content to scroll in that direction.
  - **Click**: scroll by \(~1–2\) tab widths (consistent step).
  - **Press & hold** (optional): continuous scroll.
  - **Keyboard**: must be reachable by Tab; Enter/Space activates.

### Closable tabs (×)

- **Use for**: user-created or user-manageable views (e.g., “Saved search”, “Draft”, “Temp tab”).
- **Never closable**:
  - The **first** / “Home” / default tab if it anchors the page.
  - Any tab that would leave the view without a valid selected target.
- **Hit target**:
  - Close icon must have a **minimum hit area 24×24** (even if icon is 12×12).
  - Close icon must not steal the click from the tab label (separate target).
- **Hover affordance**:
  - Close icon can appear on hover/focus; once visible, it must remain visible while the pointer is over it.
  - Disabled tabs: close icon is also disabled.
- **Close action result**:
  - If the **active tab** is closed: select the **nearest enabled tab**:
    1. Prefer the tab to the **left**.
    2. Else the tab to the **right**.
    3. Else no-op (should be prevented by “Never closable”).
  - If a **non-active tab** is closed: keep current selection.
- **Undo (recommended)**: provide “Undo” toast for destructive close when content may be lost.
- **A11y**:
  - Close button must have `aria-label="Close <tab name>"`.
  - Close must be operable with keyboard (Tab to close, Enter/Space to activate).

### Add tab (+)

- **Use for**: create new view / add a new entity under the same tab set.
- **Placement**:
  - Append to the **right end** of the rail.
  - In overflow: keep “+” visible when possible; otherwise place “+” near overflow menu.
- **Behavior**:
  - Click “+” creates a new tab and **immediately selects** it.
  - Newly created tab label must enter a **rename** state if naming is required (inline edit or modal).
  - Respect max tabs limit (if any). When reached, “+” becomes disabled with explanation.

### Keyboard & ARIA (required)

- **Roles**:
  - Tab list: `role="tablist"`
  - Tabs: `role="tab"` with `aria-selected`
  - Panels: `role="tabpanel"` with `aria-labelledby`
- **Roving tabindex**:
  - Only one tab has `tabindex="0"`; others `-1`.
- **Key bindings**:
  - ArrowLeft / ArrowRight: move focus between tabs (skip disabled).
  - Home / End: focus first / last enabled tab.
  - Enter / Space: activate focused tab.
  - Delete / Backspace (optional): close focused tab if closable.
- **Focus vs selected**:
  - Focus ring must be visible even when selected.
  - Activation must not require mouse; keyboard-only must work.

## Component token bindings (required)

> 规则：本文件只引用 `var(--component-tabs-...)`，组件 token 必须从 `component.json` 生成。

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.tabs.directionButton.bgDefault` | `--component-tabs-direction-button-bg-default` |
| `tokens.tabs.directionButton.bgHover` | `--component-tabs-direction-button-bg-hover` |
| `tokens.tabs.directionButton.iconDefault` | `--component-tabs-direction-button-icon-default` |
| `tokens.tabs.directionButton.iconDisabled` | `--component-tabs-direction-button-icon-disabled` |
| `tokens.tabs.directionButton.radius` | `--component-tabs-direction-button-radius` |
| `tokens.tabs.directionButton.p` | `--component-tabs-direction-button-p` |
| `tokens.tabs.directionButton.iconSize` | `--component-tabs-direction-button-icon-size` |
| `tokens.tabs.underline.textDefault` | `--component-tabs-underline-text-default` |
| `tokens.tabs.underline.textHover` | `--component-tabs-underline-text-hover` |
| `tokens.tabs.underline.textSelected` | `--component-tabs-underline-text-selected` |
| `tokens.tabs.underline.textDisabled` | `--component-tabs-underline-text-disabled` |
| `tokens.tabs.underline.indicatorSelected` | `--component-tabs-underline-indicator-selected` |
| `tokens.tabs.underline.indicatorThickness` | `--component-tabs-underline-indicator-thickness` |
| `tokens.tabs.underline.gap` | `--component-tabs-underline-gap` |
| `tokens.tabs.underline.px` | `--component-tabs-underline-px` |
| `tokens.tabs.underline.pyLg` | `--component-tabs-underline-py-lg` |
| `tokens.tabs.underline.pyMd` | `--component-tabs-underline-py-md` |
| `tokens.tabs.underline.hMd` | `--component-tabs-underline-h-md` |
| `tokens.tabs.pill.bgDefault` | `--component-tabs-pill-bg-default` |
| `tokens.tabs.pill.bgHover` | `--component-tabs-pill-bg-hover` |
| `tokens.tabs.pill.bgSelected` | `--component-tabs-pill-bg-selected` |
| `tokens.tabs.pill.bgDisabled` | `--component-tabs-pill-bg-disabled` |
| `tokens.tabs.pill.textDefault` | `--component-tabs-pill-text-default` |
| `tokens.tabs.pill.textHover` | `--component-tabs-pill-text-hover` |
| `tokens.tabs.pill.textSelected` | `--component-tabs-pill-text-selected` |
| `tokens.tabs.pill.textDisabled` | `--component-tabs-pill-text-disabled` |
| `tokens.tabs.vertical.wrapperBgDefault` | `--component-tabs-vertical-wrapper-bg-default` |
| `tokens.tabs.vertical.wrapperBgHover` | `--component-tabs-vertical-wrapper-bg-hover` |
| `tokens.tabs.vertical.textDefault` | `--component-tabs-vertical-text-default` |
| `tokens.tabs.vertical.textSelected` | `--component-tabs-vertical-text-selected` |
| `tokens.tabs.vertical.textDisabled` | `--component-tabs-vertical-text-disabled` |
| `tokens.tabs.vertical.indicatorSelected` | `--component-tabs-vertical-indicator-selected` |
| `tokens.tabs.scrollable.railBorder` | `--component-tabs-scrollable-rail-border` |
| `tokens.tabs.scrollable.item.bgDefault` | `--component-tabs-scrollable-item-bg-default` |
| `tokens.tabs.scrollable.item.bgSelected` | `--component-tabs-scrollable-item-bg-selected` |
| `tokens.tabs.scrollable.item.border` | `--component-tabs-scrollable-item-border` |
| `tokens.tabs.scrollable.item.textDefault` | `--component-tabs-scrollable-item-text-default` |
| `tokens.tabs.scrollable.item.textSelected` | `--component-tabs-scrollable-item-text-selected` |
| `tokens.tabs.border.borderDefault` | `--component-tabs-border-border-default` |
| `tokens.tabs.border.borderSelected` | `--component-tabs-border-border-selected` |
| `tokens.tabs.border.textDefault` | `--component-tabs-border-text-default` |
| `tokens.tabs.border.textSelected` | `--component-tabs-border-text-selected` |
| `tokens.tabs.border.px` | `--component-tabs-border-px` |
| `tokens.tabs.border.pyS` | `--component-tabs-border-py-s` |
| `tokens.tabs.border.pyM` | `--component-tabs-border-py-m` |
| `tokens.tabs.border.pyL` | `--component-tabs-border-py-l` |
| `tokens.tabs.border.pyXL` | `--component-tabs-border-py-xl` |
| `tokens.tabs.border.radiusSm` | `--component-tabs-border-radius-sm` |
| `tokens.tabs.border.radiusMd` | `--component-tabs-border-radius-md` |
| `tokens.tabs.border.radiusLg` | `--component-tabs-border-radius-lg` |
| `tokens.tabs.segmented.containerBg` | `--component-tabs-segmented-container-bg` |
| `tokens.tabs.segmented.divider` | `--component-tabs-segmented-divider` |
| `tokens.tabs.segmented.h` | `--component-tabs-segmented-h` |
| `tokens.tabs.segmented.px` | `--component-tabs-segmented-px` |
| `tokens.tabs.segmented.itemBg` | `--component-tabs-segmented-item-bg` |
| `tokens.tabs.segmented.itemBgHover` | `--component-tabs-segmented-item-bg-hover` |
| `tokens.tabs.segmented.itemBgSelected` | `--component-tabs-segmented-item-bg-selected` |
| `tokens.tabs.segmented.itemBgDisabled` | `--component-tabs-segmented-item-bg-disabled` |
| `tokens.tabs.segmented.textDefault` | `--component-tabs-segmented-text-default` |
| `tokens.tabs.segmented.textSelected` | `--component-tabs-segmented-text-selected` |
| `tokens.tabs.segmented.textDisabled` | `--component-tabs-segmented-text-disabled` |
| `tokens.tabs.line.border` | `--component-tabs-line-border` |
| `tokens.tabs.line.bg` | `--component-tabs-line-bg` |
| `tokens.tabs.line.textDefault` | `--component-tabs-line-text-default` |
| `tokens.tabs.line.textSelected` | `--component-tabs-line-text-selected` |
| `tokens.tabs.line.px` | `--component-tabs-line-px` |
| `tokens.tabs.line.py` | `--component-tabs-line-py` |
| `tokens.tabs.pill.radius` | `--component-tabs-pill-radius` |
| `tokens.tabs.pill.minWidth` | `--component-tabs-pill-min-width` |
| `tokens.tabs.pill.px` | `--component-tabs-pill-px` |
| `tokens.tabs.pill.py` | `--component-tabs-pill-py` |
| `tokens.tabs.scrollable.radiusTop` | `--component-tabs-scrollable-radius-top` |
| `tokens.tabs.scrollable.px` / `py` / `gap` | `--component-tabs-scrollable-px` 等 |
| `tokens.tabs.scrollable.item.closeIcon` | `--component-tabs-scrollable-item-close-icon` |
| `tokens.tabs.scrollable.closeP` / `closeRadius` / `closeIconSize` | `--component-tabs-scrollable-close-p` 等 |
| `tokens.tabs.vertical.itemGap` / `itemPx` / `outerPx` / `width` / `radius` | `--component-tabs-vertical-item-gap` 等 |
| `tokens.tabs.vertical.indicatorThickness` | `--component-tabs-vertical-indicator-thickness` |
| `tokens.tabs.underline.iconSize` | `--component-tabs-underline-icon-size` |
| `tokens.tabs.underline.pbSelectedLg` / `pbSelectedMd` | `--component-tabs-underline-pb-selected-lg` 等 |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

