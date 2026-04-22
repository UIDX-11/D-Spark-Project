# Component: Input

## Level

Molecular

## Aliases

- text field
- textbox

## Best practices

- **Use for**: short text entry (names, titles, IDs, search).
- **Labeling**: labels describe the data; placeholders are optional hints.
- **States**: default, hover, focus, disabled, readonly, error.
- **Help**: use helper text for constraints (format, limits) and show validation clearly.

## Layout patterns

- **Search bar**: input + optional clear + submit button.
- **Form row**: label + input + helper/error text.

## Anti-patterns

- Placeholder-only labeling.
- Silent input masks/formatting changes without explaining expected format.

## Accessibility essentials

- **Keyboard**: standard text editing behavior; no custom key overrides.
- **Name**: label association; if icon-only (search), provide accessible name.
- **Error**: expose error state and message to assistive tech.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `input/text/rounded/md/default`
  - `input/text/rounded/md/error`

