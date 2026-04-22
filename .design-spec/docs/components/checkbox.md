# Component: Checkbox

## Level

Molecular

## Aliases

- multi-select toggle
- boolean group

## Best practices

- **Use for**: multiple selection or boolean toggles in lists/forms.
- **Group rules**:
  - Provide “Select all” only when it’s meaningful and reversible.
  - Clearly show indeterminate state when partially selected.
- **Labeling**: label should describe the option, not the action.

## Layout patterns

- **Table selection**: row selection checkbox + header checkbox for bulk.
- **Filter panel**: checkbox groups with search when large.
- **Form field**: inline checkbox with helper text.

## Anti-patterns

- Using checkbox for mutually exclusive choices (use `Radio`).
- Tiny hit targets (must meet minimum target size).

## Accessibility essentials

- **Keyboard**: Tab to focus; Space to toggle.
- **Name**: label must be programmatically associated.
- **Indeterminate**: expose indeterminate state semantics (not visual-only).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `checkbox/group/square/md/default`
  - `checkbox/group/square/md/indeterminate`

