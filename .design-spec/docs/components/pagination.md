# Component: Pagination

## Level

Molecular

## Aliases

- pager
- page navigator

## Best practices

- **Use for**: large lists/tables; keep pagination near the content it controls (usually bottom-right).
- **Default behavior**:
  - page index is 1-based in UI
  - the currently selected page is visually emphasized
- **With Table**: pair with page-size selector and total count (Figma shows `Total 50`, `10/Page`).

## Layout patterns

- **Full**: `Total` + `PageSize` + `Prev` + page numbers + `Next` + `Go to` input.
- **Compact**: hide Total and PageSize; keep numbers + arrows.
- **Disabled**: all controls disabled style.

## Anti-patterns

- Showing too many page numbers without ellipsis.
- Allowing invalid “Go to” input without validation feedback.
- Resetting page unexpectedly when pageSize changes (must define rule).

## Accessibility essentials

- Wrap in `nav` with `aria-label="Pagination"`.
- Use buttons/links for pages and arrows, with clear `aria-label`:
  - `aria-label="Previous page"`, `aria-label="Next page"`
  - page item: `aria-label="Page 3"`, current: `aria-current="page"`
- “Go to” input has label (visible or `aria-label="Go to page"`).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `pagination/full/rounded/md/default`
  - `pagination/compact/rounded/sm/default`
  - `pagination/full/rounded/md/disabled`

## Anatomy

```
Total (optional) | PageSize selector (optional) | [Prev] [1] [2] [3] ... [N] [Next] | Go to (optional) [input]
```

## Variants

### Layout variants

| **Kind** | **Includes** |
| --- | --- |
| `full` | total + pageSize + numbers + goTo |
| `compact` | numbers + arrows only |

### Page-size control

| **Type** | **UI** | **Rule** |
| --- | --- | --- |
| `select` | `10/Page` dropdown | changes `pageSize` |

### Go-to control

| **Type** | **UI** | **Rule** |
| --- | --- | --- |
| `input` | `Go to [  ]` | jump to page |

## Sizes (from Figma)

| **Size** | **Item box** | **Radius** | **Text** |
| --- | ---:| ---:| --- |
| `LG` | 36 | 6 | 14 / 20 |
| `MD` | 32 | 6 | 14 / 20 |
| `SM` | 28 | 4 | 12 / 16 for some labels |
| `XS` | 24 | 4 | 12 / 16 |

## States

| **Part** | **State** | **Token** |
| --- | --- | --- |
| Page item | default | `var(--component-pagination-item-text)` |
| Page item | current | `var(--component-pagination-item-text-current)` / `var(--component-pagination-item-bg-current)` |
| Page item | hover | `var(--component-pagination-item-bg-hover)` |
| Arrow | default | `var(--component-pagination-arrow-icon)` |
| Arrow | disabled | `var(--component-pagination-arrow-icon-disabled)` |
| Total / labels | default | `var(--component-pagination-label-text)` |
| Disabled (all) | disabled | `var(--component-pagination-disabled-text)` / `var(--component-pagination-disabled-bg)` |

## Executable interaction rules

### Page calculation

- Given `totalItems` and `pageSize`, `totalPages = ceil(totalItems / pageSize)`.
- Page numbers are 1..totalPages.

### Prev/Next

- Prev is disabled when `currentPage=1`.
- Next is disabled when `currentPage=totalPages`.

### Ellipsis rule (required)

- When `totalPages` is large, show:
  - first page
  - a window around current page (e.g., ±1)
  - last page
  - ellipsis `...` for gaps
- Ellipsis is not a page; it may open quick-jump menu optionally, otherwise inert.

### Page-size change (required)

- When pageSize changes, keep the first item of the current page visible:
  - `newPage = floor(((currentPage-1)*oldPageSize)/newPageSize) + 1`
  - clamp to \([1, totalPages]\)

### Go to (input)

- Accept only integers.
- Clamp to \([1, totalPages]\).
- Trigger jump on Enter or blur (product configurable; recommend Enter).
- Empty input does not change page.

### Keyboard

- Tab order: pageSize → prev → page numbers → next → goTo.
- Left/Right arrow keys may move between page items when focused (optional).

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.pagination.item.bgDefault` | `--component-pagination-item-bg-default` |
| `tokens.pagination.item.bgHover` | `--component-pagination-item-bg-hover` |
| `tokens.pagination.item.bgCurrent` | `--component-pagination-item-bg-current` |
| `tokens.pagination.item.text` | `--component-pagination-item-text` |
| `tokens.pagination.item.textCurrent` | `--component-pagination-item-text-current` |
| `tokens.pagination.item.radiusMd` | `--component-pagination-item-radius-md` |
| `tokens.pagination.item.radiusSm` | `--component-pagination-item-radius-sm` |
| `tokens.pagination.item.sizeLg` | `--component-pagination-item-size-lg` |
| `tokens.pagination.item.sizeMd` | `--component-pagination-item-size-md` |
| `tokens.pagination.item.sizeSm` | `--component-pagination-item-size-sm` |
| `tokens.pagination.item.sizeXs` | `--component-pagination-item-size-xs` |
| `tokens.pagination.arrow.icon` | `--component-pagination-arrow-icon` |
| `tokens.pagination.arrow.iconDisabled` | `--component-pagination-arrow-icon-disabled` |
| `tokens.pagination.label.text` | `--component-pagination-label-text` |
| `tokens.pagination.disabled.text` | `--component-pagination-disabled-text` |
| `tokens.pagination.disabled.bg` | `--component-pagination-disabled-bg` |
| `tokens.pagination.gap` | `--component-pagination-gap` |
