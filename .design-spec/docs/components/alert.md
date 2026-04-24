# Component: Alert

## Level

Molecular

## Aliases

- banner
- inline notice
- status message

## Best practices

- **Use for**: communicating important status/feedback within the page (not blocking).
- **Type choice** (from Figma guidance):
  - Use **Warning (orange)** when it impacts other modules/pages, has irreversible consequences, has missing critical info, or affects business goal/value.
  - Otherwise use **Info (blue)**.
- **Keep concise**: 1–2 lines preferred; for longer content, use multiline variant.
- **Actions**: only include a single secondary action (e.g., “Detail”) when it helps resolve the issue.
- **Closable**: close is optional; if the alert can be dismissed permanently, persist that choice (product-dependent).

## Layout patterns

- **Form**: show above the form group for global guidance.
- **Page**: show at top of a section as a banner-like inline block.

## Anti-patterns

- Using Alert for blocking confirmations (use Modal).
- Auto-dismissing critical warnings/errors (should remain until resolved).
- Showing multiple alerts stacked without prioritization (collapse into one summary).

## Accessibility essentials

- **Role**:
  - Info/Success/Warning: `role="status"` (polite)
  - Error: `role="alert"` (assertive)
- **Close**: close button has `aria-label="Close alert"`.
- **Focus**: do not steal focus on render; if triggered by a user action, optionally move focus to the alert region (product-dependent).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `alert/info/rounded/lg/default`
  - `alert/warning/rounded/md/closable`
  - `alert/error/rounded/lg/with-title`
  - `alert/success/rounded/auto/multiline`

## Anatomy

### Default (single line)

```
[icon] Message text                (optional) [Detail] [x]
```

### Multiline

```
[icon] Message text... (wrap)
                (optional) [Detail] [x]
```

### With title

```
[icon] Title
       Message text...              (optional) [Detail] [x]
```

## Variants

| **Kind** | **Has title** | **Multiline** | **Action** | **Close** |
| --- | --- | --- | --- | --- |
| `default` | no | no | optional | optional |
| `multiline` | no | yes | optional | optional |
| `with-title` | yes | optional | optional | optional |

## Types (tones)

| **Type** | **Meaning** | **Container bg token** | **Icon token** |
| --- | --- | --- | --- |
| `info` (提示) | informational guidance | `var(--component-alert-tone-info-bg)` | `var(--component-alert-tone-info-icon)` |
| `success` (成功) | operation success | `var(--component-alert-tone-success-bg)` | `var(--component-alert-tone-success-icon)` |
| `warning` (警告) | needs attention | `var(--component-alert-tone-warning-bg)` | `var(--component-alert-tone-warning-icon)` |
| `error` (错误) | failure/blocked | `var(--component-alert-tone-error-bg)` | `var(--component-alert-tone-error-icon)` |

## Sizes

| **Size** | **Height** | **Padding X** | **Padding Y** | **Radius** |
| --- | ---:| ---:| ---:| ---:|
| `LG` | 36 | 16 | 8 | 8 |
| `MD` | 32 | 16 | 6 | 6 |
| `AUTO` | auto | 16 | 8/12 | 8 |

## States

| **Part** | **Token** |
| --- | --- |
| Text | `var(--component-alert-text)` |
| Title text | `var(--component-alert-title-text)` |
| Close icon | `var(--component-alert-close-icon)` |
| Action text (Detail) | `var(--component-alert-action-text)` |
| Action border | `var(--component-alert-action-border)` |

## Executable interaction rules

### Close

- Close button exists only when `closable=true`.
- Clicking close hides the alert.
- If the alert represents a persistent state (e.g., “Missing required config”), closing should be disabled or the alert should reappear on next render (product-dependent).

### Action button (Detail)

- Action is optional.
- Action should open contextual help (drawer/modal) or navigate to the relevant setting page.

### Auto-dismiss

- **Info** may auto-dismiss (optional) if it’s purely confirmational and not tied to unresolved state.
- **Warning/Error** must not auto-dismiss.

### Keyboard

- Tab order: action (if any) → close (if any).
- Enter/Space activates focused action.

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.alert.tone.info.bg` | `--component-alert-tone-info-bg` |
| `tokens.alert.tone.info.icon` | `--component-alert-tone-info-icon` |
| `tokens.alert.tone.success.bg` | `--component-alert-tone-success-bg` |
| `tokens.alert.tone.success.icon` | `--component-alert-tone-success-icon` |
| `tokens.alert.tone.warning.bg` | `--component-alert-tone-warning-bg` |
| `tokens.alert.tone.warning.icon` | `--component-alert-tone-warning-icon` |
| `tokens.alert.tone.error.bg` | `--component-alert-tone-error-bg` |
| `tokens.alert.tone.error.icon` | `--component-alert-tone-error-icon` |
| `tokens.alert.text` | `--component-alert-text` |
| `tokens.alert.titleText` | `--component-alert-title-text` |
| `tokens.alert.closeIcon` | `--component-alert-close-icon` |
| `tokens.alert.actionText` | `--component-alert-action-text` |
| `tokens.alert.actionBorder` | `--component-alert-action-border` |
| `tokens.alert.radiusLg` | `--component-alert-radius-lg` |
| `tokens.alert.radiusMd` | `--component-alert-radius-md` |
| `tokens.alert.px` | `--component-alert-px` |
| `tokens.alert.pyLg` | `--component-alert-py-lg` |
| `tokens.alert.pyMd` | `--component-alert-py-md` |
