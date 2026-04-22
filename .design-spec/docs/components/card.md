# Component: Card

## Level

Molecular

## Aliases

- panel
- section container
- surface

## Best practices

- **Use for**: grouping related content into a surface with optional header/footer.
- **Header**: title + optional actions; keep actions secondary to the title.
- **Density**: use consistent internal padding from tokens.
- **Dividers**: use tokenized divider styles; avoid overusing borders/shadows.

## Layout patterns

- **Sectioned detail page**: multiple cards, each representing a domain section.
- **Form card**: card header title + form body + footer actions.
- **Dashboard**: grid of cards with consistent height rules.

## Anti-patterns

- Deeply nested cards (visual noise).
- Card used as a generic spacer (use `Space`/layout tokens instead).

## Accessibility essentials

- **Heading structure**: card titles should align with page heading hierarchy.
- **Clickable cards**: if entire card is interactive, provide clear focus/hover and role.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `card/section/rounded/md/default`
  - `card/clickable/rounded/md/focus`

