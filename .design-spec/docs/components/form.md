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

## Anatomy

### Vertical (label on top)

```
Label (optional + required *)
[ Control (Input/Select/...) ]
Helper text OR Error message
```

### Horizontal (label on left)

```
Label (fixed width)  [ Control ]  Helper/Error
```

## Variants

| **Kind** | **Label layout** | **Columns** | **Typical use** |
| --- | --- | --- | --- |
| `edit` | vertical / horizontal | 1–2 | create/edit pages |
| `filter` | horizontal (compact) | multi-inline | list filters |

## Sizes

> Figma includes field sizes across controls: `XL(36) / L(32) / M(28) / S(24)` (used by Input/Select/Date/Time/etc). Form must not override component sizes, only spacing/alignment.

| **Token** | **Meaning** |
| --- | --- |
| `rowGap` | spacing between form items |
| `colGap` | spacing between columns (2-col layout) |
| `labelGap` | spacing between label and control (vertical) |
| `labelW` | label width (horizontal) |

## States

| **State** | **Meaning** | **Rule** |
| --- | --- | --- |
| `default` | untouched | no error shown |
| `focused` | editing | optional inline hint |
| `valid` | passes validation | optional success hint |
| `error` | validation failed | show error text + set field invalid |
| `disabled` | not editable | disable control + mute label/helper |

## Executable interaction rules

### Field state machine (required)

- A field has state derived from: `touched`, `dirty`, `valid`, `disabled`.
- **Show error** when:
  - user blurs the field after interaction (`touched=true`) AND invalid, OR
  - user submits the form and any invalid fields exist.
- **Do not** show error on first render (unless server returns errors).

### Validation timing (required)

- `onBlur`: validate field (recommended default).
- `onSubmit`: validate all fields and reveal all errors.
- `onChange`: only for constrained inputs (e.g., numeric range) or when explicitly required.

### Submit behavior (required)

- Disable primary submit button while submitting.
- Prevent double submit (debounce/throttle + loading state).
- On submit failure:
  - focus first invalid field
  - scroll it into view (smooth, respects reduced motion)

### Required indicator

- Required fields show `*` near label (tokenized color).
- Required indicator is not the only requirement signal (also validate and message).

### Error binding (required)

- Control receives `aria-invalid="true"` when error is visible.
- Error/help text uses `aria-describedby` id referenced by the control.

### Layout rules

- **Vertical**: label above; helper/error below control.
- **Horizontal**:
  - label has fixed width and right aligned (recommended) or left aligned (product decision)
  - error/help appears under control (preferred) to avoid layout shift
- **2 columns**:
  - use consistent `colGap`
  - allow full-width items by spanning 2 columns

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.form.rowGap` | `--component-form-row-gap` |
| `tokens.form.colGap` | `--component-form-col-gap` |
| `tokens.form.labelGap` | `--component-form-label-gap` |
| `tokens.form.labelW` | `--component-form-label-w` |
| `tokens.form.labelText` | `--component-form-label-text` |
| `tokens.form.labelTextDisabled` | `--component-form-label-text-disabled` |
| `tokens.form.requiredMark` | `--component-form-required-mark` |
| `tokens.form.helpText` | `--component-form-help-text` |
| `tokens.form.errorText` | `--component-form-error-text` |

