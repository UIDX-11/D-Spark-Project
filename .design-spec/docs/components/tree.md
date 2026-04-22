# Component: Tree

## Level

Molecular

## Aliases

- hierarchy
- navigation tree
- taxonomy

## Best practices

- **Use for**: hierarchical data (categories, org structure, nested resources).
- **Interactions**:
  - Expand/collapse affordance must be clear and targetable.
  - Support search/filter when node count is high.
- **Selection**: clearly differentiate selection from focus/hover.

## Layout patterns

- **Master/detail**: left tree + right content panel.
- **Permissions**: tree with checkbox selection (if applicable).

## Anti-patterns

- Large trees without search (poor findability).
- Hiding expand/collapse behind hover only.

## Accessibility essentials

- **Keyboard**: follow treeview pattern (arrow keys, Home/End, expand/collapse keys).
- **Name**: each node has a clear label; icons must not be the only signal.
- **Focus**: visible focus on current node.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `tree/navigation/none/md/default`
  - `tree/selection/none/md/with-checkbox`

