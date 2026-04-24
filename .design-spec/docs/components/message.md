# Component: Message

## Level

Molecular

## Aliases

- global message
- toast message
- inline toast

## Best practices

- **Use for**: lightweight global feedback after an action (non-blocking).
- **Keep short**: single sentence; avoid long paragraphs in Message (use Notification/Alert).
- **Stacking**: limit simultaneous messages; merge duplicates.
- **Auto-dismiss**: recommended by default (except critical error, product-dependent).

## Layout patterns

- **Global top**: show centered or top area, stacked vertically.
- **Action feedback**: “Saved”, “Upload failed”, “Permission denied”.

## Anti-patterns

- Using Message for content-heavy guidance (use Alert).
- Infinite auto-spam (must debounce).
- Clearing error messages too quickly (must allow reading).

## Accessibility essentials

- **Role**:
  - Info/Success/Warning: `role="status"` (polite)
  - Error: `role="alert"` (assertive) when critical
- **Close**: if closable, close icon is a button with `aria-label="Close message"`.
- **Motion**: avoid strong animations; respect reduced-motion.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `message/info/rounded/md/default`
  - `message/success/rounded/md/closable`

## Anatomy

```
[icon] Message text                     (optional) [x]
```

## Types (tones)

| **Type** | **Meaning** | **Container bg token** | **Icon token** |
| --- | --- | --- | --- |
| `info` (提示) | guidance/help | `var(--component-message-tone-info-bg)` | `var(--component-message-tone-info-icon)` |
| `success` (成功提示) | success feedback | `var(--component-message-tone-success-bg)` | `var(--component-message-tone-success-icon)` |
| `warning` (警示提示) | attention needed | `var(--component-message-tone-warning-bg)` | `var(--component-message-tone-warning-icon)` |
| `error` (错误提示) | failure/serious | `var(--component-message-tone-error-bg)` | `var(--component-message-tone-error-icon)` |

## Sizes

> Figma shows a single size with `px=16`, `py=8`, `radius=8`, icon=16, text=14/20. If more sizes appear later, extend this table.

| **Size** | **Padding X** | **Padding Y** | **Radius** | **Icon** | **Text** |
| --- | ---:| ---:| ---:| ---:| --- |
| `MD` | 16 | 8 | 8 | 16 | 14 / line 20 |

## States

| **Part** | **Token** |
| --- | --- |
| Text | `var(--component-message-text)` |
| Close icon | `var(--component-message-close-icon)` |

## Executable interaction rules

### Trigger & duration

- Message is created by an action (save, submit, etc.).
- Default duration: 2–4 seconds (product configurable).
- Error messages may use longer duration (e.g., 6–8 seconds) or require manual close (optional).

### Stacking rules (required)

- New messages stack vertically with a small gap (tokenized).
- Max visible: 3 (recommended). Older messages are dismissed first.
- Duplicate messages within 1–2 seconds should merge (recommended).

### Close (optional)

- If closable, clicking close dismisses that message only.
- Auto-dismiss timer stops while hovered/focused (optional but recommended).

### Keyboard

- Close button reachable by Tab; Enter/Space activates.

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.message.tone.info.bg` | `--component-message-tone-info-bg` |
| `tokens.message.tone.info.icon` | `--component-message-tone-info-icon` |
| `tokens.message.tone.success.bg` | `--component-message-tone-success-bg` |
| `tokens.message.tone.success.icon` | `--component-message-tone-success-icon` |
| `tokens.message.tone.warning.bg` | `--component-message-tone-warning-bg` |
| `tokens.message.tone.warning.icon` | `--component-message-tone-warning-icon` |
| `tokens.message.tone.error.bg` | `--component-message-tone-error-bg` |
| `tokens.message.tone.error.icon` | `--component-message-tone-error-icon` |
| `tokens.message.text` | `--component-message-text` |
| `tokens.message.closeIcon` | `--component-message-close-icon` |
| `tokens.message.radius` | `--component-message-radius` |
| `tokens.message.px` | `--component-message-px` |
| `tokens.message.py` | `--component-message-py` |
| `tokens.message.gap` | `--component-message-gap` |
