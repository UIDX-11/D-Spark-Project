# Component: Tag

## Level

Molecular

## Aliases

- label
- chip
- status badge

## Best practices

- **Use for**: small, scannable metadata (status, category, attribute).
- **Color**: semantic colors must come from tokens; ensure contrast.
- **Dismissible**: only when removal is safe and predictable; confirm if destructive.
- **Length**: keep tags short; truncate with tooltip when needed.

## Layout patterns

- **Table cells**: status tag in a status column.
- **Filters**: selected filters represented as removable tags.

## Anti-patterns

- Using too many tags (visual noise); prefer grouping or a summary.
- Encoding meaning with color only (include text/icon).

## Accessibility essentials

- **Dismissible tags**: close button must be keyboard focusable and labeled.
- **Contrast**: ensure tag background/text meet contrast requirements.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `tag/status/rounded/sm/default`
  - `tag/filter/rounded/sm/dismissible`

