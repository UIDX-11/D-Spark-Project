# Component: Layout

## Level

Molecular (composition container)

## Aliases

- page frame
- shell
- container / region

## Best practices

- **Use for**: structuring a page into predictable regions (header/sidebar/content/footer).
- **Consistency**:
  - Keep global navigation regions stable across pages.
  - Use consistent padding and max-width rules from tokens.
- **Responsiveness**:
  - Define breakpoints and collapse behavior for side navigation.
  - Avoid horizontal scrolling on common breakpoints.

## Layout patterns

- **B-end list page**: filter bar (top) + results (table/list) + pagination (bottom).
- **Master/detail**: left `Tree` + right detail content in `Card`.
- **Tabbed sub-pages**: `Tabs` near top of content region.

## Anti-patterns

- Nesting multiple scroll containers without clear ownership (confusing scroll).
- Mixing unrelated padding rules (hardcoded) instead of token spacing scale.

## Accessibility essentials

- **Landmarks**: use semantic regions where possible (header/nav/main/aside/footer).
- **Focus order**: aligns with visual order; avoid focus traps in sidebars.
- **Skip links**: for dense admin pages, support skip-to-content.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `layout/admin/split/md/default`
  - `layout/admin/collapsible/md/collapsed`

