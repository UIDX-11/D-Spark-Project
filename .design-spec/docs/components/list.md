# Component: List

## Level

Molecular

## Aliases

- results list
- feed
- collection

## Best practices

- **Use for**: rendering a collection when table semantics are not required.
- **Density**: offer compact/comfortable densities via tokens.
- **States**: loading (skeleton), empty, error, partial results.
- **Actions**: prefer row-level actions aligned to row end; avoid clutter.

## Layout patterns

- **Search results**: filter bar + list items + pagination/infinite scroll.
- **Master list**: list on the left, detail panel on the right.

## Anti-patterns

- Using list when structured comparison is needed (use `Table`).
- Hiding critical information behind hover-only affordances.

## Accessibility essentials

- **Semantics**: use proper list semantics (ul/ol) or ARIA patterns if custom.
- **Keyboard**: row focus/selection must be reachable and visible.
- **Announce updates**: for dynamic updates, ensure screen readers get meaningful updates.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `list/results/none/md/default`
  - `list/results/none/md/empty`

