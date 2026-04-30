# Component: Dropdown

## Level

Molecular

## Aliases

- dropdown menu
- context menu
- overflow menu

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
| --- | ---:| ---:| ---:| --- |
| `L` | 36 | 8 | 8 | 16 / 22 |
| `M` | 32 | 8 | 8 | 14 / 20 |

### Menu item variants (from Figma)

| **Style** | **Use case** | **Left** | **Right** |
| --- | --- | --- | --- |
| `default` | plain action | optional icon | optional submenu chevron |
| `single-selected` | single selection | optional icon | checkmark |
| `multi-selected` | multi selection | optional icon | checkmark |
| `leading-checkbox` | multi select list | checkbox | none |
| `danger` | destructive action | optional icon | none |

### Menu item sizes (from Figma)

| **Size** | **Height** | **Padding Y** | **Radius** | **Gap** |
| --- | ---:| ---:| ---:| ---:|
| `MD` | 32 | 6 | 6 | 12 |
| `SM` | 28 | 4 | 4 | 8 |

## States

| **Part** | **Token** |
| --- | --- |
| Panel bg | `var(--component-dropdown-panel-bg)` |
| Panel radius | `var(--component-dropdown-panel-radius)` |
| Panel shadow | `var(--component-dropdown-panel-shadow)` |
| Item bg (default) | `var(--component-dropdown-item-bg-default)` |
| Item bg (hover) | `var(--component-dropdown-item-bg-hover)` |
| Item text (default) | `var(--component-dropdown-item-text)` |
| Item text (disabled) | `var(--component-dropdown-item-text-disabled)` |
| Item text (danger) | `var(--component-dropdown-item-text-danger)` |
| Divider | `var(--component-dropdown-divider)` |
| Icon | `var(--component-dropdown-icon)` |
| Icon disabled | `var(--component-dropdown-icon-disabled)` |
| Check icon | `var(--component-dropdown-check-icon)` |
| Submenu chevron | `var(--component-dropdown-submenu-icon)` |

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

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.dropdown.panel.bg` | `--component-dropdown-panel-bg` |
| `tokens.dropdown.panel.radius` | `--component-dropdown-panel-radius` |
| `tokens.dropdown.panel.shadow` | `--component-dropdown-panel-shadow` |
| `tokens.dropdown.item.bgDefault` | `--component-dropdown-item-bg-default` |
| `tokens.dropdown.item.bgHover` | `--component-dropdown-item-bg-hover` |
| `tokens.dropdown.item.text` | `--component-dropdown-item-text` |
| `tokens.dropdown.item.textDisabled` | `--component-dropdown-item-text-disabled` |
| `tokens.dropdown.item.textDanger` | `--component-dropdown-item-text-danger` |
| `tokens.dropdown.item.radiusMd` | `--component-dropdown-item-radius-md` |
| `tokens.dropdown.item.radiusSm` | `--component-dropdown-item-radius-sm` |
| `tokens.dropdown.item.hMd` | `--component-dropdown-item-h-md` |
| `tokens.dropdown.item.hSm` | `--component-dropdown-item-h-sm` |
| `tokens.dropdown.item.gapMd` | `--component-dropdown-item-gap-md` |
| `tokens.dropdown.item.gapSm` | `--component-dropdown-item-gap-sm` |
| `tokens.dropdown.divider` | `--component-dropdown-divider` |
| `tokens.dropdown.icon` | `--component-dropdown-icon` |
| `tokens.dropdown.iconDisabled` | `--component-dropdown-icon-disabled` |
| `tokens.dropdown.checkIcon` | `--component-dropdown-check-icon` |
| `tokens.dropdown.submenuIcon` | `--component-dropdown-submenu-icon` |
| `tokens.dropdown.trigger.bgHover` | `--component-dropdown-trigger-bg-hover` |
| `tokens.dropdown.trigger.bgActive` | `--component-dropdown-trigger-bg-active` |
| `tokens.dropdown.trigger.text` | `--component-dropdown-trigger-text` |
| `tokens.dropdown.trigger.textDisabled` | `--component-dropdown-trigger-text-disabled` |
| `tokens.dropdown.trigger.textDisabledL` | `--component-dropdown-trigger-text-disabled-l` |
| `tokens.dropdown.trigger.textDisabledM` | `--component-dropdown-trigger-text-disabled-m` |
| `tokens.dropdown.trigger.radius` | `--component-dropdown-trigger-radius` |
| `tokens.dropdown.trigger.px` | `--component-dropdown-trigger-px` |
| `tokens.dropdown.trigger.hM` | `--component-dropdown-trigger-h-m` |
| `tokens.dropdown.trigger.hL` | `--component-dropdown-trigger-h-l` |
