# Component: Tabs

## Level

Molecular

## Aliases

- segmented navigation (when simplified)
- sub-page switcher

## Best practices

- **Use for**: switching between related views at the same hierarchy level.
- **Labeling**: short, noun labels; avoid sentence-like labels.
- **Counts**: if showing counts, keep formatting stable (avoid layout shift).
- **Overflow**: support scrollable tab bar or overflow menu for many tabs.

## Layout patterns

- **Detail page**: base info + tabs for related sections.
- **Module navigation**: tabs under page header for sub-areas.

## Anti-patterns

- Nesting multiple tab sets deeply (navigation confusion).
- Using tabs to hide required steps in a flow (use stepper/wizard patterns).

## Accessibility essentials

- **Keyboard**: follow tabs ARIA pattern (arrow keys to move, Enter/Space to activate).
- **Focus**: visible focus on tab; active state distinct from focus state.
- **Name**: tabs have clear labels; icons alone are insufficient.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `tabs/line/rounded/md/default`
  - `tabs/line/rounded/md/overflow`

