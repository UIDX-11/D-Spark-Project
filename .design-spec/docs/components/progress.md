# Component: Progress

## Level

Molecular

## Aliases

- progress bar
- step progress (button-like)
- progress ring

## Best practices

- **Use for**: indicating completion of a task or a multi-step operation.
- **Always show meaning**:
  - determinate: percent value is authoritative
  - indeterminate: show activity but **do not** show percent
- **Status mapping (from Figma)**:
  - `inProgress` uses success/active color
  - `success` shows check
  - `error` shows error mark
  - `notStarted` shows muted track + `0%`
  - `cancelling` can show “取消中” text label

## Layout patterns

- **Inline**: progress-line with optional trailing label (`66%` or `取消中`).
- **Compact**: progress-mini marker used as suffix for line success/error.
- **Dashboard**: progress-circle with center label (percent) or status icon.

## Anti-patterns

- Showing percent for indeterminate loading.
- Using red for normal in-progress (reserve red for error only).
- Updating progress too frequently (throttle UI updates; recommended 200–500ms).

## Accessibility essentials

- **Role**: `role="progressbar"`.
- **Aria values**:
  - determinate: set `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow=<value>`
  - indeterminate: omit `aria-valuenow` and add `aria-valuetext="Loading"`
- **Label**: provide `aria-label` or `aria-labelledby` describing the task.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `progress/line/rounded/sm/in-progress`
  - `progress/line/rounded/lg/success`
  - `progress/circle/rounded/md/error`
  - `progress/mini/dot/xs/success`

## Anatomy

### Line

```
[ track (bg) ]
[ fill  (active) ]  (optional) [mini-status] [label]
```

### Circle

```
ring track + ring fill
center: percent text OR status icon
```

## Variants

| **Kind** | **Description** | **Notes** |
| --- | --- | --- |
| `line` | horizontal bar | sizes 4/8, optional label |
| `circle` | ring progress | sizes small/medium/large |
| `mini` | 16px marker | used standalone or as suffix |
| `step` | button-like segmented | shows start/complete in pill |

## Sizes

### Line

| **Size** | **Height** | **Label** |
| --- | ---:| --- |
| `SM` | 4 | 12/16 for small label |
| `LG` | 8 | 14/20 for label |

### Circle

| **Size** | **Diameter** | **Center content** |
| --- | ---:| --- |
| `SM` | 48 | 14/20 percent |
| `MD` | 64 | 14/20 percent |
| `LG` | 80 | 14/20 percent |

### Mini

| **Size** | **Box** |
| --- | ---:|
| `XS` | 16 |

## States

| **State** | **Meaning** | **Line fill** | **Circle center** | **Label** |
| --- | --- | --- | --- | --- |
| `not-started` | 0% | none | `0%` | optional |
| `in-progress` | determinate | active | percent | optional percent |
| `cancelling` | cancelling | active | percent | “取消中” |
| `success` | finished | success | check icon | optional |
| `error` | failed | danger | error icon | optional |

## Executable interaction rules

### Value model

- Clamp percent to \([0, 100]\).
- When switching from indeterminate → determinate, animate from last known percent (or 0) to new value.

### Animation

- Determinate: animate fill length with easing (200–300ms recommended).
- Indeterminate: use looping animation on fill segment (respect reduced-motion).

### Text rules

- If `status=cancelling`, label shows “取消中” (from Figma).
- Only show percent label when width allows; otherwise hide label (do not overflow).

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.progress.line.track` | `--component-progress-line-track` |
| `tokens.progress.line.fillActive` | `--component-progress-line-fill-active` |
| `tokens.progress.line.fillSuccess` | `--component-progress-line-fill-success` |
| `tokens.progress.line.fillError` | `--component-progress-line-fill-error` |
| `tokens.progress.line.hSm` | `--component-progress-line-h-sm` |
| `tokens.progress.line.hLg` | `--component-progress-line-h-lg` |
| `tokens.progress.line.radius` | `--component-progress-line-radius` |
| `tokens.progress.label.text` | `--component-progress-label-text` |
| `tokens.progress.circle.track` | `--component-progress-circle-track` |
| `tokens.progress.circle.strokeActive` | `--component-progress-circle-stroke-active` |
| `tokens.progress.circle.strokeSuccess` | `--component-progress-circle-stroke-success` |
| `tokens.progress.circle.strokeError` | `--component-progress-circle-stroke-error` |
| `tokens.progress.circle.text` | `--component-progress-circle-text` |
| `tokens.progress.circle.sizeSm` | `--component-progress-circle-size-sm` |
| `tokens.progress.circle.sizeMd` | `--component-progress-circle-size-md` |
| `tokens.progress.circle.sizeLg` | `--component-progress-circle-size-lg` |
| `tokens.progress.mini.size` | `--component-progress-mini-size` |
| `tokens.progress.step.bg` | `--component-progress-step-bg` |
| `tokens.progress.step.fill` | `--component-progress-step-fill` |
| `tokens.progress.step.textOnFill` | `--component-progress-step-text-on-fill` |
| `tokens.progress.step.radius` | `--component-progress-step-radius` |
| `tokens.progress.step.h` | `--component-progress-step-h` |
