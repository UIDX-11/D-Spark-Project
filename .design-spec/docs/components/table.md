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

