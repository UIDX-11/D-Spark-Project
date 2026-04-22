# Component: Form

## Level

Molecular

## Aliases

- data entry
- input group

## Best practices

- **Use for**: collecting and validating user input.
- **Validation**:
  - Prefer inline validation on blur/submit; avoid noisy validation on every keystroke.
  - Error messages must be actionable and specific.
- **Layout**:
  - Align labels consistently; choose label position (top/left) per density.
  - Keep a predictable vertical rhythm using spacing tokens.
- **Actions**: Save/Cancel at consistent location (often footer).

## Layout patterns

- **Filter form**: compact, inline fields; collapse advanced filters.
- **Edit form**: sectioned into cards; progressive disclosure for advanced settings.

## Anti-patterns

- Hiding required fields behind collapsed sections without indication.
- Using placeholder text as the only label.

## Accessibility essentials

- **Labels**: every control has a visible label or accessible name.
- **Errors**: associate error text with the field; announce errors on submit.
- **Focus**: on submit failure, move focus to first invalid field (without disorienting jumps).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `form/edit/none/md/default`
  - `form/filter/none/md/compact`

