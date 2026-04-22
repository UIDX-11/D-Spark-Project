# Component: Data Display (Number)

## Level

Molecular

## Aliases

- KPI
- metric
- statistic
- number badge (when compact)

## Best practices

- **Use for**: displaying key numeric values (counts, amounts, percentages).
- **Formatting**:
  - Respect i18n for thousands separators, decimals, currency, units.
  - Never concatenate unit strings blindly; use locale-aware formatting where possible.
- **Comparison**: when showing change, include direction + magnitude (e.g., +3.2%).
- **States**: loading placeholder; unknown value (“—”); error tooltip if unavailable.

## Layout patterns

- **KPI grid**: cards with consistent baseline alignment.
- **Inline metric**: label + value, value aligned right in dense tables/cards.

## Anti-patterns

- Too many decimals (reduce readability).
- Using color only to encode meaning (also include text/icon).

## Accessibility essentials

- **Text**: ensure sufficient contrast; do not rely on color alone.
- **Readable**: avoid overly small font sizes in dense KPI rows.
- **ARIA**: if value updates live, announce changes appropriately (avoid noisy updates).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `data-display/number/none/md/default`
  - `data-display/number/none/md/loading`

