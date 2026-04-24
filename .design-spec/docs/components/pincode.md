# Component: PinCode

## Level

Molecular

## Aliases

- OTP
- verification code
- one-time password
- SMS code

## Best practices

- **Use for**: short verification codes (4–8 digits) where each digit is visually separated.
- **Auto-advance**: input should move to next cell after a valid digit.
- **Paste-first**: users often paste; support pasting the whole code into any cell.
- **Resend**: show resend countdown and prevent resend spam.
- **Error**: do not clear the code automatically on error; let users correct quickly (optionally “Clear”).

## Layout patterns

- **Login / 2FA**: PinCode + resend + optional “Get code” button.
- **Sensitive actions**: PinCode + confirm button to reduce accidental submission.

## Anti-patterns

- Using separate native inputs without paste handling (breaks fast entry).
- Forcing mouse click into each cell (must be keyboard-friendly).
- Clearing all digits on a single wrong digit without explanation.

## Accessibility essentials

- **Keyboard**: type digits, Backspace to delete, Arrow keys to move between cells.
- **Focus**: single visible focus indicator; focus remains predictable.
- **Name**: group has a label (“Verification code”) and each cell is announced (position).
- **Errors**: error message announced and associated to the group.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `pincode/otp/rounded/md/default`
  - `pincode/otp/rounded/md/active`
  - `pincode/otp/rounded/md/error`
  - `pincode/otp/rounded/md/disabled`

## Anatomy

```
┌──────────────────────────────────────────────┐
│ Cells (N)                                    │
│ [□][□][□][□][□][□]   (optional action button)│
│ Helper / countdown / error message           │
└──────────────────────────────────────────────┘
```

## Variants

| **Kind** | **Cells** | **Action** | **Notes** |
| --- | ---:| --- | --- |
| `otp` | 6 (default) | optional | common for SMS code |
| `otp` | 4 / 8 | optional | per product requirement |

## Sizes

> Figma node shows a square cell of **36×36** with **radius 8** (baseline). If future sizes are introduced, add a size table.

| **Size** | **Cell** | **Radius** | **Font** |
| --- | ---:| ---:| --- |
| `MD` | 36×36 | 8 | 14 / line 20 |

## States

### Cell states (required)

| **State** | **BG** | **Border** | **Text** | **Caret** |
| --- | --- | --- | --- | --- |
| Default (empty) | `var(--component-pin-code-cell-bg-default)` | `var(--component-pin-code-cell-border-default)` | `var(--component-pin-code-cell-text-default)` | none |
| Active (focused) | `var(--component-pin-code-cell-bg-active)` | `var(--component-pin-code-cell-border-active)` | `var(--component-pin-code-cell-text-default)` | `var(--component-pin-code-cell-caret)` |
| Filled | `var(--component-pin-code-cell-bg-filled)` | `var(--component-pin-code-cell-border-filled)` | `var(--component-pin-code-cell-text-filled)` | none |
| Error | `var(--component-pin-code-cell-bg-error)` | `var(--component-pin-code-cell-border-error)` | `var(--component-pin-code-cell-text-default)` | none |
| Disabled | `var(--component-pin-code-cell-bg-disabled)` | `var(--component-pin-code-cell-border-disabled)` | `var(--component-pin-code-cell-text-disabled)` | none |

### Helper / countdown / error text

| **Part** | **Token** |
| --- | --- |
| Helper / countdown | `var(--component-pin-code-help-text)` |
| Error message | `var(--component-pin-code-error-text)` |

## Executable interaction rules

### Input model

- Render **N cells**, but treat input as a **single logical value**.
- Accept digits `0–9` by default (allow alphanumeric only if product requires).

### Typing

- Typing a valid digit sets current cell and moves focus to the next.
- If a cell already has a digit and user types again, replace digit and move next (recommended).

### Backspace

- Backspace on a non-empty cell clears it and stays.
- Backspace on an empty cell moves to previous cell and clears it.

### Paste (required)

- Pasting `k` digits fills current cell onward.
- Ignore non-digit characters in paste (e.g., spaces) if possible.
- If pasted length exceeds remaining cells, truncate.

### Completion

- When all cells filled:
  - Either auto-submit (allowed) OR require explicit submit button (allowed).
  - Prefer explicit submit for sensitive actions; auto-submit for login OTP.

### Resend / countdown

- When countdown active, disable resend action and show remaining seconds (e.g., `Resend 44S`).
- When countdown reaches 0, show `Resend` as enabled action.

### Error handling

- On verification failure:
  - show error message (“验证码错误，请重新输入”)
  - apply error state to all cells (as in Figma)
  - keep existing digits so user can correct quickly (default)

### Keyboard & ARIA (required)

- Group:
  - container has label (e.g., `aria-label="Verification code"`)
  - error message linked via `aria-describedby`
- Cells:
  - each cell is an input with `inputmode="numeric"` and `autocomplete="one-time-code"`
  - ArrowLeft/ArrowRight moves between cells
  - `Esc` does not clear (reserved)

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.pinCode.cell.bgDefault` | `--component-pin-code-cell-bg-default` |
| `tokens.pinCode.cell.bgActive` | `--component-pin-code-cell-bg-active` |
| `tokens.pinCode.cell.bgFilled` | `--component-pin-code-cell-bg-filled` |
| `tokens.pinCode.cell.bgError` | `--component-pin-code-cell-bg-error` |
| `tokens.pinCode.cell.bgDisabled` | `--component-pin-code-cell-bg-disabled` |
| `tokens.pinCode.cell.borderDefault` | `--component-pin-code-cell-border-default` |
| `tokens.pinCode.cell.borderActive` | `--component-pin-code-cell-border-active` |
| `tokens.pinCode.cell.borderFilled` | `--component-pin-code-cell-border-filled` |
| `tokens.pinCode.cell.borderError` | `--component-pin-code-cell-border-error` |
| `tokens.pinCode.cell.borderDisabled` | `--component-pin-code-cell-border-disabled` |
| `tokens.pinCode.cell.textDefault` | `--component-pin-code-cell-text-default` |
| `tokens.pinCode.cell.textFilled` | `--component-pin-code-cell-text-filled` |
| `tokens.pinCode.cell.textDisabled` | `--component-pin-code-cell-text-disabled` |
| `tokens.pinCode.cell.caret` | `--component-pin-code-cell-caret` |
| `tokens.pinCode.helpText` | `--component-pin-code-help-text` |
| `tokens.pinCode.errorText` | `--component-pin-code-error-text` |
