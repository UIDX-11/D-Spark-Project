# Component: PageHeader

## Level

Page (layout block)

## Aliases

- page title bar
- header bar
- content header

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

| **Kind** | **Breadcrumb** | **Right area** | **Notes** |
| --- | --- | --- | --- |
| `default` | optional | none | base heading |
| `actions` | optional | button group | 2 buttons in Figma |
| `controls` | optional | radio-button-group | “Large/Medium/Small” |

## Sizes

> Figma shows a single size with outer padding `px=16, py=12`, title `20/28`, desc `14/20`, gap `12`, inner divider `h=16`.

| **Size** | **Container** | **Title** | **Desc** | **Back icon** |
| --- | --- | --- | --- | ---:|
| `MD` | `px=16, py=12` | 20 / 28 | 14 / 20 | 20 |

## States

| **Part** | **Token** |
| --- | --- |
| Container bg | `var(--component-page-header-bg)` |
| Container px | `var(--component-page-header-px)` |
| Container py | `var(--component-page-header-py)` |
| Title text | `var(--component-page-header-title-text)` |
| Desc text | `var(--component-page-header-desc-text)` |
| Divider | `var(--component-page-header-divider)` |
| Back icon | `var(--component-page-header-back-icon)` |
| Gap | `var(--component-page-header-gap)` |

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
| `tokens.pageHeader.backIcon` | `--component-page-header-back-icon` |
| `tokens.pageHeader.backIconSize` | `--component-page-header-back-icon-size` |
