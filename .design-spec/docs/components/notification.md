# Component: Notification

## Level

Molecular

## Aliases

- toast notification
- notification panel
- notification card

## Best practices

- **Use for**: non-blocking but higher-information feedback than `Message` (can include title, description, actions).
- **Keep concise**: title + 1–2 lines description; avoid long content (use Modal/Drawer).
- **Stacking**: limit visible count; merge duplicates when appropriate.
- **Action**: keep actions short; primary action must be obvious and safe.

## Layout patterns

- **Top-right stack**: typical for B-end SaaS; stacked vertically.
- **With actions**: Cancel + primary action (from Figma).
- **Closable**: close icon in top-right of card.

## Anti-patterns

- Using Notification for blocking decisions (use Modal).
- Infinite notifications without throttling or grouping.
- Auto-dismiss too fast for warning/error (must allow reading).

## Accessibility essentials

- **Container**: `role="status"` (polite) by default.
- **Critical error**: can use `role="alert"` (assertive) for truly critical cases.
- **Close**: close icon is a button with `aria-label="Close notification"`.
- **Focus**: if Notification includes actions, ensure actions are keyboard reachable.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `notification/info/rounded/md/default`
  - `notification/success/rounded/md/with-actions`
  - `notification/error/rounded/md/closable`

## Anatomy

```
┌───────────────────────────────┐
│ [icon] Title             [x]  │
│       Description             │
│                 [Cancel] [OK] │  (optional)
└───────────────────────────────┘
```

## Types (tones)

| **Type** | **Meaning** | **Container bg token** | **Icon token** |
| --- | --- | --- | --- |
| `info` (提示) | informational | `var(--component-notification-tone-info-bg)` | `var(--component-notification-tone-info-icon)` |
| `success` (成功) | success feedback | `var(--component-notification-tone-success-bg)` | `var(--component-notification-tone-success-icon)` |
| `warning` (警告) | attention needed | `var(--component-notification-tone-warning-bg)` | `var(--component-notification-tone-warning-icon)` |
| `error` (错误) | failure/serious | `var(--component-notification-tone-error-bg)` | `var(--component-notification-tone-error-icon)` |
| `default` (默认) | neutral | `var(--component-notification-tone-default-bg)` | _(none)_ |

## Sizes

> Figma shows a single card size: `w=304`, `radius=8`, `p=16`, shadow `0 4 10 rgba(0,0,0,0.1)`.

| **Size** | **Width** | **Radius** | **Padding** | **Icon** | **Title** | **Desc** |
| --- | ---:| ---:| ---:| ---:| --- | --- |
| `MD` | 304 | 8 | 16 | 20 | 16 / 22 | 14 / 20 |

## States

| **Part** | **Token** |
| --- | --- |
| Panel bg | `var(--component-notification-panel-bg)` |
| Panel radius | `var(--component-notification-panel-radius)` |
| Panel shadow | `var(--component-notification-panel-shadow)` |
| Title text | `var(--component-notification-title-text)` |
| Body text | `var(--component-notification-body-text)` |
| Close icon | `var(--component-notification-close-icon)` |
| Action gap | `var(--component-notification-actions-gap)` |
| Action top spacing | `var(--component-notification-actions-mt)` |

## Executable interaction rules

### Trigger & duration

- Triggered by system events or user actions (save, background job finished, etc.).
- Default duration: 4–6s (recommended).
- Warning/Error may use longer duration (6–10s) or require manual close (product configurable).

### Stacking (required)

- Stack vertically with consistent gap.
- Max visible: 3 (recommended). Older notifications are dismissed first.
- Duplicate notifications within 1–2s should merge (recommended).

### Close

- Clicking close dismisses that notification only.
- Auto-dismiss timer pauses on hover and when focused inside (recommended).

### Actions

- If actions exist, place them in footer area aligned to the right.
- Primary action is the right-most button; Cancel/secondary on its left.

### Keyboard

- Close button reachable by Tab; Enter/Space activates.
- Action buttons reachable by Tab in visual order.

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.notification.tone.info.bg` | `--component-notification-tone-info-bg` |
| `tokens.notification.tone.info.icon` | `--component-notification-tone-info-icon` |
| `tokens.notification.tone.success.bg` | `--component-notification-tone-success-bg` |
| `tokens.notification.tone.success.icon` | `--component-notification-tone-success-icon` |
| `tokens.notification.tone.warning.bg` | `--component-notification-tone-warning-bg` |
| `tokens.notification.tone.warning.icon` | `--component-notification-tone-warning-icon` |
| `tokens.notification.tone.error.bg` | `--component-notification-tone-error-bg` |
| `tokens.notification.tone.error.icon` | `--component-notification-tone-error-icon` |
| `tokens.notification.tone.default.bg` | `--component-notification-tone-default-bg` |
| `tokens.notification.panel.bg` | `--component-notification-panel-bg` |
| `tokens.notification.panel.radius` | `--component-notification-panel-radius` |
| `tokens.notification.panel.shadow` | `--component-notification-panel-shadow` |
| `tokens.notification.titleText` | `--component-notification-title-text` |
| `tokens.notification.bodyText` | `--component-notification-body-text` |
| `tokens.notification.closeIcon` | `--component-notification-close-icon` |
| `tokens.notification.p` | `--component-notification-p` |
| `tokens.notification.w` | `--component-notification-w` |
| `tokens.notification.actions.gap` | `--component-notification-actions-gap` |
| `tokens.notification.actions.mt` | `--component-notification-actions-mt` |
