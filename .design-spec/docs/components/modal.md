# Component: Modal

## Level

Molecular

## Aliases

- dialog
- confirmation dialog
- form modal

## Best practices

- **Use for**: blocking flows that require explicit decision or focused input.
- **Use inline Alert** inside Modal for contextual tips (design includes “带提示” variant).
- **Footer placement rule (from Figma)**:
  - confirm/message/marketing actions align **right**
  - functional data entry controls align **center**
- **Size limits (from Figma)**:
  - max width = 84% of viewport
  - max height = 80% of viewport

## Layout patterns

- **Confirm**: title + description + Cancel/Confirm.
- **Form entry**: title + body slots + footer buttons.
- **With tip**: header + inline Alert in body + form slot.

## Anti-patterns

- Using Modal for non-blocking feedback (use Message/Alert).
- No scroll handling for long content (must support internal scroll).
- Closing destructive modals by accident without protection (warn/confirm).

## Accessibility essentials

- **Role**: `role="dialog"` (or `alertdialog` for destructive confirmations).
- **Labeling**: `aria-labelledby` points to title; `aria-describedby` points to description/body.
- **Focus trap**: focus stays within modal while open.
- **Escape**: `Esc` closes only when `closeOnEsc=true` (default true for normal; false for destructive).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `modal/confirm/rounded/md/default`
  - `modal/confirm/rounded/md/danger`
  - `modal/form/rounded/md/with-tip`

## Anatomy

```
Overlay mask
┌──────────────────────────────────────────┐
│ Header: [icon?] Title            [close] │
│ Body: description / slots / alert tip    │
│ Footer: buttons (Cancel/Confirm/...)     │
└──────────────────────────────────────────┘
```

## Variants

| **Kind** | **Header** | **Body** | **Footer** | **Notes** |
| --- | --- | --- | --- | --- |
| `inform` | icon + title | description | Confirm only | “提示/成功/警告/错误” styles |
| `confirm` | title (optional icon) | description | Cancel + primary | includes “危险” style |
| `form` | title + close | slot | Cancel + primary | “自定义” |
| `form-with-tip` | title + close | inline Alert + slot | Cancel + primary | “带提示” |

## Types (tones)

| **Type** | **Meaning** | **Header icon** | **Notes** |
| --- | --- | --- | --- |
| `default` | neutral | none | plain title |
| `info` (提示) | informational | info icon | non-destructive |
| `success` (成功) | success | success icon | non-destructive |
| `warning` (警告) | warning | warning icon | attention |
| `error` (错误) | error | error icon | failure/destructive |
| `danger` (危险) | destructive confirm | warning icon | requires safer close rules |

## Sizes

> Figma shows `w=440` (default) and `w=464` (with tip). Tokenize width/radius/padding; enforce viewport max constraints.

| **Size** | **Width** | **Radius** | **Padding** |
| --- | ---:| ---:| --- |
| `MD` | 440 | 16 | 24 |
| `MD-with-tip` | 464 | 16 | 24 |

## States

| **Part** | **Token** |
| --- | --- |
| Mask | `var(--component-modal-mask)` |
| Panel bg | `var(--component-modal-panel-bg)` |
| Panel radius | `var(--component-modal-panel-radius)` |
| Panel shadow | `var(--component-modal-panel-shadow)` |
| Title text | `var(--component-modal-title-text)` |
| Body text | `var(--component-modal-body-text)` |
| Close icon | `var(--component-modal-close-icon)` |
| Divider (optional) | `var(--component-modal-divider)` |

## Executable interaction rules

### Open/close

- Open: focus moves to the modal (title or first focusable in body).
- Close triggers:
  - Close button (×) when `closable=true`
  - `Esc` when `closeOnEsc=true`
  - Clicking mask when `closeOnMask=true`
- **Danger confirm**: default `closeOnEsc=false` and `closeOnMask=false` (recommended).

### Focus management (required)

- Trap focus within modal while open.
- Restore focus to the opener element on close.
- If there is a form field, focus the first invalid field on submit error.

### Scroll & sizing (required)

- Lock page scroll while modal is open.
- Modal body scrolls internally when exceeding max height.
- Enforce viewport max: width ≤ 84vw, height ≤ 80vh.

### Footer actions

- Primary action on the right; secondary (Cancel) to its left.
- Enter activates primary when safe (avoid for destructive text entry forms unless explicit).
- For forms, disable primary until validation passes (optional) or show inline errors (required).

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.modal.mask` | `--component-modal-mask` |
| `tokens.modal.panel.bg` | `--component-modal-panel-bg` |
| `tokens.modal.panel.radius` | `--component-modal-panel-radius` |
| `tokens.modal.panel.shadow` | `--component-modal-panel-shadow` |
| `tokens.modal.titleText` | `--component-modal-title-text` |
| `tokens.modal.bodyText` | `--component-modal-body-text` |
| `tokens.modal.closeIcon` | `--component-modal-close-icon` |
| `tokens.modal.divider` | `--component-modal-divider` |
| `tokens.modal.p` | `--component-modal-p` |
| `tokens.modal.w` | `--component-modal-w` |
| `tokens.modal.wWithTip` | `--component-modal-w-with-tip` |
