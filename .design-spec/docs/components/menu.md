# Component: Menu (Left Navigation)

## Level

Page (layout block)

## Aliases

- sidebar menu
- left nav
- navigation menu

## Best practices

- **Use for**: primary navigation in B-end SaaS.
- **Keep stable**: preserve expanded/collapsed state per user (recommended).
- **Default**: one selected leaf at a time; parent shows selected/expanded state.
- **Collapsed mode**: icon-only rail; show tooltip on hover; open flyout for submenus.

## Layout patterns

- **Expanded**: width ~220, shows icon + label + optional chevron/badge.
- **Collapsed**: width ~48, icon only; submenu opens as pop-menu.
- **Grouped**: group titles (muted) + group items.

## Anti-patterns

- Mixing navigation and destructive actions in the left menu.
- Losing selection highlight when route changes (must reflect routing).
- Deep nesting without search (3+ levels should be rare).

## Accessibility essentials

- Wrap in `nav` with `aria-label="Main navigation"`.
- Items are links or buttons:
  - leaf: link (`role="link"`)
  - parent: button controlling submenu (`aria-expanded`)
- Keyboard:
  - Up/Down moves focus
  - Right expands submenu / enters pop-menu
  - Left collapses / returns
  - Enter activates
  - Esc closes pop-menu

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `menu/sidebar/expanded/md/default`
  - `menu/sidebar/collapsed/md/default`
  - `menu/sidebar/expanded/md/selected`

## Anatomy

```
Menu container
  Item (1st-level)
    [icon] Label                 [chevron]
    (optional) Submenu (inline when expanded)

Collapsed:
  [icon] (tooltip)
  Submenu opens as pop-menu (2nd-level)
```

## Variants

### Container variants (from Figma)

| **Variant** | **Width** | **Use** |
| --- | ---:| --- |
| `expanded` | 220 | normal sidebar |
| `collapsed` | 48 | icon rail |

### Item levels

| **Level** | **Placement** | **When used** |
| --- | --- | --- |
| `1st-level` | sidebar | top-level routes |
| `2nd-level` | inline or pop-menu | section routes |
| `3rd-level+` | inline or pop-menu | avoid; only for complex IA |

### Item states (from Figma)

| **State** | **Meaning** |
| --- | --- |
| `default` | normal |
| `hover` | pointer hover |
| `selected` | current route/section |
| `selected-hover` | selected + hover |
| `disabled` | not available |

### Submenu behavior

| **Mode** | **Expanded sidebar** | **Collapsed sidebar** |
| --- | --- | --- |
| `submenu` | inline accordion | pop-menu flyout |

## Sizes

> Figma shows `1st-level` item height ~38 (label 14/20) and `2nd-level pop-menu` item paddings `px=12, py=9` with min-width ~182.

| **Part** | **Value** |
| --- | --- |
| 1st-level item height | 38 |
| 1st-level width (expanded) | 200–220 |
| collapsed rail width | 48 |
| pop-menu item px | 12 |
| pop-menu item py | 9 |
| pop-menu min width | 182 |

## Executable interaction rules

### Selection model (required)

- Exactly one leaf item is `selected` per menu group.
- Parent item is `selected` when any descendant is selected.

### Expand/collapse

- Expanded sidebar:
  - clicking a parent toggles inline submenu (accordion).
  - optional: allow multiple parents expanded; otherwise single-expanded accordion (recommended).
- Collapsed sidebar:
  - hover/focus on icon shows tooltip (label).
  - click opens pop-menu flyout; click outside closes.

### Routing sync (required)

- Menu state must reflect URL:
  - on navigation, update `selected` and expand ancestors.

### Disabled

- Disabled items are not focusable/clickable.
- If a selected item becomes disabled (permission change), fallback to nearest enabled ancestor or default route.

### Pop-menu (2nd-level) rules

- Min width 182 (from Figma).
- Supports group titles (muted) and grouped subitems.
- Hover highlights background; selected uses semibold.

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
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
