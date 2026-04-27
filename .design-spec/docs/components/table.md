# Component: Table

## Level

Molecular

## Aliases

- data grid
- results table

## Best practices

- **Use for**: structured, comparable datasets (columns/rows).
- **Density**: support compact density for B-end; keep line-height readable.
- **Columns**:
  - Left-align text; right-align numbers.
  - Truncate long content with tooltip; keep key identifiers visible.
- **Interactions**:
  - Sorting/filtering must be discoverable and not rely on hover only.
  - Row actions: primary action visible; secondary actions in overflow.
- **States**: loading, empty, error; preserve column headers when possible.

## Layout patterns

- **CRUD page**: filter form above + table + pagination below.
- **Selection**: checkbox selection + bulk action bar.
- **Sticky header**: for long tables, sticky header improves scanability.

## Anti-patterns

- Tables inside narrow cards causing horizontal scroll on common breakpoints.
- Using table for layout (use `Layout`/`Space`).

## Accessibility essentials

- **Semantics**: proper table semantics; headers (`th`) and scope.
- **Keyboard**: focus management for interactive cells; avoid trapping focus.
- **Announcements**: sorting/filtering changes should be perceivable (aria-live where appropriate).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `table/results/none/md/default`
  - `table/results/none/md/empty`

## Anatomy

```
Table container
  Header row (th)
  Body rows (tr)
    Cells (td)
      Optional: inline controls (Input/Select/Dropdown/Switch/Progress/etc.)
  Optional: sticky header
  Optional: pagination
```

## Variants

| **Kind** | **Features** | **Notes** |
| --- | --- | --- |
| `basic` | header + rows | default |
| `striped` | alternating row bg | optional |
| `bordered` | vertical dividers | optional |
| `sticky-header` | header sticks on scroll | recommended for long lists |
| `with-selection` | checkbox column + bulk actions | common in CRUD |
| `with-actions` | action column (icons/overflow) | keep consistent width |
| `with-inline-controls` | input/select/progress inside cells | ensure focus rules |

## Sizes (row density)

> Figma shows row heights as discrete sizes (e.g. 36/44/52) and separate header height. Tokenize height + paddings.

| **Density** | **Row height** | **Use case** |
| --- | ---:| --- |
| `compact` | 36 | dense B-end tables |
| `default` | 44 | default |
| `comfortable` | 52 | readability |

## States

| **State** | **Row bg** | **Text** | **Notes** |
| --- | --- | --- | --- |
| `default` | default bg | normal | |
| `hover` | hover bg | normal | hover does not change layout |
| `selected` | selected bg | normal | selection persists on hover |
| `disabled-row` | disabled bg | muted | optional; avoid if possible |
| `error-cell` | n/a | danger | e.g. invalid inline input |
| `loading` | skeleton rows | muted | keep header visible |
| `empty` | empty state | muted | page empty vs local empty differ (Figma note) |

## Executable interaction rules

### Column sizing

- Columns must support:
  - fixed width (e.g. checkbox/action)
  - min/max width with truncation + tooltip
- Text columns left-aligned; numeric columns right-aligned.

### Sorting

- Sort toggle is on header cell:
  - cycle: none → asc → desc
  - show sort indicator when active (not hover-only)
- Sorting does not reset pagination selection (unless data source changes).

### Selection (required for `with-selection`)

- Header checkbox:
  - unchecked: none selected
  - indeterminate: some selected
  - checked: all selected (current page by default)
- Bulk actions appear when selection count > 0.

### Row actions

- Primary action may be an icon button; secondary actions go into dropdown/overflow.
- Do not hide all actions behind hover-only for critical flows (discoverability).

### Inline controls in cells

- Entering edit mode:
  - click focuses control, does not select row (unless product chooses row click selection; then use separate selection checkbox)
- Validation:
  - invalid field shows inline error message and sets `aria-invalid`
  - table does not shift columns when error appears (use reserved helper area or overlay tooltip)

### Scrolling & sticky header

- Sticky header remains visible during vertical scroll.
- Horizontal scroll:
  - keep header and body columns aligned
  - optional: sticky first/last column for identifiers/actions
- Scrollbars in Figma are demonstrative; use real scrollbar component when needed (Figma note).

### Empty

- Empty states:
  - **page empty**: black line + brand color
  - **local empty**: gray line only
  - local empty sizes: S/M/L (Figma note)

## Accessibility essentials (more executable)

- Use semantic table markup:
  - header cells `th` with `scope="col"`
  - row headers when needed: `th scope="row"`
- Sorting:
  - `aria-sort="ascending|descending|none"` on sorted column header
- Selection:
  - checkbox labels include row identifier (`aria-label="Select row: <name>"`)
- Inline controls:
  - maintain predictable tab order within a row

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.table.bg` | `--component-table-bg` |
| `tokens.table.border` | `--component-table-border` |
| `tokens.table.header.bg` | `--component-table-header-bg` |
| `tokens.table.header.text` | `--component-table-header-text` |
| `tokens.table.row.bgDefault` | `--component-table-row-bg-default` |
| `tokens.table.row.bgHover` | `--component-table-row-bg-hover` |
| `tokens.table.row.bgSelected` | `--component-table-row-bg-selected` |
| `tokens.table.row.text` | `--component-table-row-text` |
| `tokens.table.row.textMuted` | `--component-table-row-text-muted` |
| `tokens.table.row.hCompact` | `--component-table-row-h-compact` |
| `tokens.table.row.hDefault` | `--component-table-row-h-default` |
| `tokens.table.row.hComfortable` | `--component-table-row-h-comfortable` |
| `tokens.table.cell.px` | `--component-table-cell-px` |
| `tokens.table.cell.pyCompact` | `--component-table-cell-py-compact` |
| `tokens.table.cell.pyDefault` | `--component-table-cell-py-default` |
| `tokens.table.cell.pyComfortable` | `--component-table-cell-py-comfortable` |

