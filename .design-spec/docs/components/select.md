# Component: Select

## Level

Molecular

## Aliases

- dropdown
- picker (web)
- combo box (when searchable)

## Best practices

- **Use for**: choosing from a list of options (single or multiple).
- **When not to**:
  - Small, mutually exclusive sets → use `Radio`.
  - Boolean → use `Checkbox`/`Switch`.
  - Very large sets → require search/async loading.
- **Content**:
  - Option labels must be clear; include secondary text only if necessary.
  - Show selected value(s) clearly; for many selections, summarize with count.
- **States**: default, focus, disabled, error, loading (async).

## Layout patterns

- **Filter bar**: select + cascader + input combos; keep consistent widths.
- **Form field**: select in a `Form` row; validation shows below.

## Anti-patterns

- Hiding critical options behind long scroll without search.
- Using select as navigation without clear affordance (use `Tabs` or nav patterns).

## Accessibility essentials

- **Keyboard**: open/close with keys; navigate options; select without mouse.
- **Name**: clear label; do not rely on placeholder only.
- **Announce**: selection changes should be perceivable.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `select/single/rounded/md/default`
  - `select/multiple/rounded/md/error`

