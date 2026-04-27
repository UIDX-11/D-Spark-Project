# Component: Breadcrumb

## Level

Molecular

## Aliases

- breadcrumb trail
- location / path nav

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

| **Kind** | **Visual** | **Token** |
| --- | --- | --- |
| `slash` | `/` (line icon) | `var(--component-breadcrumb-separator-color)` |
| `chevron` | `>` | `var(--component-breadcrumb-separator-color)` |
| `chevron-right` | right arrow | `var(--component-breadcrumb-separator-color)` |
| `chevron-down` | down arrow (expand) | `var(--component-breadcrumb-separator-color)` |
| `chevron-up` | up arrow (collapse) | `var(--component-breadcrumb-separator-color)` |

### Depth variants

| **Depth** | **Pattern** | **Overflow rule** |
| --- | --- | --- |
| `2` | `A / B` | no collapse |
| `3` | `A / B / C` | truncate long labels |
| `4` | `A / B / C / D` | truncate long labels |
| `4+` | `A / … / C / D` | collapse middle crumbs into menu |

## Sizes

> Figma shows a single size: text `14/20`, separator box `16`, link padding `px=4`, gap `4`.

| **Size** | **Text** | **Separator** | **Gap** | **Item px** |
| --- | --- | ---:| ---:| ---:|
| `MD` | 14 / 20 | 16 | 4 | 4 |

## States

| **Part** | **Token** |
| --- | --- |
| Link text (default) | `var(--component-breadcrumb-link-text)` |
| Link text (hover) | `var(--component-breadcrumb-link-text-hover)` |
| Current text | `var(--component-breadcrumb-current-text)` |
| Separator color | `var(--component-breadcrumb-separator-color)` |
| Icon size | `var(--component-breadcrumb-separator-size)` |

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

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.breadcrumb.link.text` | `--component-breadcrumb-link-text` |
| `tokens.breadcrumb.link.textHover` | `--component-breadcrumb-link-text-hover` |
| `tokens.breadcrumb.current.text` | `--component-breadcrumb-current-text` |
| `tokens.breadcrumb.separator.color` | `--component-breadcrumb-separator-color` |
| `tokens.breadcrumb.separator.size` | `--component-breadcrumb-separator-size` |
| `tokens.breadcrumb.gap` | `--component-breadcrumb-gap` |
| `tokens.breadcrumb.px` | `--component-breadcrumb-px` |
| `tokens.breadcrumb.itemMaxW` | `--component-breadcrumb-item-max-w` |
