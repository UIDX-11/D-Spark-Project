# Component: Tabs

## Level

Molecular

## Aliases

- segmented navigation (when simplified)
- sub-page switcher

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

