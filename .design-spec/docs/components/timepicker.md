# Component: TimePicker

## Level

Molecular

## Aliases

- time picker
- time range picker
- time select

## References

- Arco Design Web React（API / 行为真源）: [TimePicker](https://arco.design/react/components/time-picker)
- Arco 源码（React）: [`arco-design/components/TimePicker`](https://github.com/arco-design/arco-design/tree/main/components/TimePicker)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 定位 TimePicker 画板并补充 `node-id=` 深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Best practices

- **Use for**: selecting time-only values (with optional seconds) and time ranges.
- **Prefer time format consistency**: do not mix `HH:mm` and `HH:mm:ss` in the same product area unless required.
- **12h vs 24h**: pick one as default per locale/product; do not switch without an explicit setting.
- **Apply**: for filters/reports, prefer confirm/apply to avoid triggering queries on every scroll.
- **Clear**: provide clear only when value is optional; do not show clear for required fields.

## Layout patterns

- **Forms**: `FormItem(label + TimePicker + help/error)`.
- **Filter bar**: time range with confirm/apply.
- **DateTime**: paired with `DatePicker` for “date + time” flows.

## Anti-patterns

- Auto-committing while user is still scrolling the time list.
- Allowing invalid range (end < start) without feedback.
- Hiding AM/PM column in 12h mode (must be selectable).

## Accessibility essentials

- **Keyboard**: open/close, move between columns, select value, confirm/cancel.
- **Focus**: visible focus on list items; roving focus per column.
- **Name**: trigger must have accessible name (label or `aria-label`).
- **Announce**: selection changes should be announced (especially with 12h AM/PM).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `timepicker/time/rounded/xl/default`
  - `timepicker/time/rounded/l/error`
  - `timepicker/time-range/rounded/xl/active`

## Anatomy

```
┌──────────────────────────────┐
│ Trigger (value/placeholder)  │  [time icon]  (optional clear)
└──────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────────┐
│ Panel                                      │
│ - Time columns (HH / mm / ss)              │
│ - (12h) AM/PM column                       │
│ - (optional) extra content row             │
│ - Footer actions (Current time / Confirm)  │
└────────────────────────────────────────────┘
```

## Variants

| **Kind** | **Format** | **Clock** | **Extra content** | **Notes** |
| --- | --- | --- | --- | --- |
| `time` | `HH:mm` | 24h | optional | common for forms |
| `time` | `HH:mm:ss` | 24h | optional | when seconds matter |
| `time` | `HH:mm` | 12h | optional | with AM/PM column |
| `time` | `HH:mm:ss` | 12h | optional | with AM/PM column |
| `time` | `HH:mm` / `HH:mm:ss` | loop 24h | optional | cyclic list (wrap) |
| `time-range` | same as above | 12h/24h/loop | optional | start–end trigger |

## Sizes

> Sizes apply to the **trigger** (single and range).

| **Size** | **Height** | **Font** | **Icon** | **Padding X** | **Radius** |
| --- | ---:| --- | ---:| ---:| ---:|
| `XL` | 36 | 14 / line 20 | 20 | 12 | 8 |
| `L` | 32 | 14 / line 20 | 20 | 12 | 6 |
| `M` | 28 | 14 / line 20 | 20 | 12 | 6 |
| `S` | 24 | 14 / line 20 | 20 | 12 | 6 |

## States

### Trigger (input-like) — states

| **State** | **BG** | **Border** | **Text** | **Icon** | **Ring** |
| --- | --- | --- | --- | --- | --- |
| Default | `var(--component-timepicker-trigger-bg-default)` | `var(--component-timepicker-trigger-border-default)` | `var(--component-timepicker-trigger-text-placeholder)` | `var(--component-timepicker-trigger-icon-default)` | none |
| Hover | `var(--component-timepicker-trigger-bg-hover)` | `var(--component-timepicker-trigger-border-hover)` | `var(--component-timepicker-trigger-text-placeholder)` | `var(--component-timepicker-trigger-icon-default)` | none |
| Active | `var(--component-timepicker-trigger-bg-active)` | `var(--component-timepicker-trigger-border-active)` | `var(--component-timepicker-trigger-text-value)` | `var(--component-timepicker-trigger-icon-default)` | `var(--component-timepicker-trigger-ring-active)` |
| Error | `var(--component-timepicker-trigger-bg-default)` | `var(--component-timepicker-trigger-border-error)` | `var(--component-timepicker-trigger-text-placeholder)` | `var(--component-timepicker-trigger-icon-default)` | `var(--component-timepicker-trigger-ring-error)` |
| Disabled | `var(--component-timepicker-trigger-bg-disabled)` | `var(--component-timepicker-trigger-border-disabled)` | `var(--component-timepicker-trigger-text-disabled)` | `var(--component-timepicker-trigger-icon-disabled)` | none |

### Time item (list cell) — states

| **State** | **BG** | **Text** | **Radius** |
| --- | --- | --- | --- |
| Default | `var(--component-timepicker-item-bg-default)` | `var(--component-timepicker-item-text-default)` | `var(--component-timepicker-item-radius)` |
| Hover | `var(--component-timepicker-item-bg-hover)` | `var(--component-timepicker-item-text-default)` | `var(--component-timepicker-item-radius)` |
| Selected | `var(--component-timepicker-item-bg-selected)` | `var(--component-timepicker-item-text-default)` | `var(--component-timepicker-item-radius)` |
| Disabled | `var(--component-timepicker-item-bg-default)` | `var(--component-timepicker-item-text-disabled)` | `var(--component-timepicker-item-radius)` |

## Executable interaction rules

### Open/close

- Click trigger opens panel; click outside closes.
- `Esc` closes and returns focus to trigger.

### Selection model

- **List columns**:
  - `HH` column selects hour.
  - `mm` column selects minute.
  - `ss` column (optional) selects second.
  - `AM/PM` column exists only in 12h mode.
- **Commit policy**:
  - If footer confirm exists, selection changes are **draft** until Confirm.
  - “Current Time” sets draft to now (respecting format) and does not close unless Confirm commits.

### Range

- Range trigger shows start and end parts.
- Clear (if present) clears both.
- Validation:
  - If end < start, block confirm and show error (recommended), or auto-swap (allowed). Pick one policy globally.

### Keyboard & ARIA (required)

- Trigger:
  - `aria-haspopup="dialog"` and `aria-expanded`
- Panel:
  - Focus moves into the first active column on open.
  - ArrowUp/ArrowDown: move within current column.
  - ArrowLeft/ArrowRight: switch columns (HH ↔ mm ↔ ss ↔ AM/PM).
  - Enter: select focused item.
  - `Esc`: close.

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.timepicker.trigger.bgDefault` | `--component-timepicker-trigger-bg-default` |
| `tokens.timepicker.trigger.bgHover` | `--component-timepicker-trigger-bg-hover` |
| `tokens.timepicker.trigger.bgActive` | `--component-timepicker-trigger-bg-active` |
| `tokens.timepicker.trigger.bgDisabled` | `--component-timepicker-trigger-bg-disabled` |
| `tokens.timepicker.trigger.borderDefault` | `--component-timepicker-trigger-border-default` |
| `tokens.timepicker.trigger.borderHover` | `--component-timepicker-trigger-border-hover` |
| `tokens.timepicker.trigger.borderActive` | `--component-timepicker-trigger-border-active` |
| `tokens.timepicker.trigger.borderError` | `--component-timepicker-trigger-border-error` |
| `tokens.timepicker.trigger.borderDisabled` | `--component-timepicker-trigger-border-disabled` |
| `tokens.timepicker.trigger.textPlaceholder` | `--component-timepicker-trigger-text-placeholder` |
| `tokens.timepicker.trigger.textValue` | `--component-timepicker-trigger-text-value` |
| `tokens.timepicker.trigger.textDisabled` | `--component-timepicker-trigger-text-disabled` |
| `tokens.timepicker.trigger.iconDefault` | `--component-timepicker-trigger-icon-default` |
| `tokens.timepicker.trigger.iconDisabled` | `--component-timepicker-trigger-icon-disabled` |
| `tokens.timepicker.trigger.ringActive` | `--component-timepicker-trigger-ring-active` |
| `tokens.timepicker.trigger.ringError` | `--component-timepicker-trigger-ring-error` |
| `tokens.timepicker.panel.bg` | `--component-timepicker-panel-bg` |
| `tokens.timepicker.panel.border` | `--component-timepicker-panel-border` |
| `tokens.timepicker.panel.radius` | `--component-timepicker-panel-radius` |
| `tokens.timepicker.panel.shadow` | `--component-timepicker-panel-shadow` |
| `tokens.timepicker.panel.p` | `--component-timepicker-panel-p` |
| `tokens.timepicker.item.bgDefault` | `--component-timepicker-item-bg-default` |
| `tokens.timepicker.item.bgHover` | `--component-timepicker-item-bg-hover` |
| `tokens.timepicker.item.bgSelected` | `--component-timepicker-item-bg-selected` |
| `tokens.timepicker.item.textDefault` | `--component-timepicker-item-text-default` |
| `tokens.timepicker.item.textDisabled` | `--component-timepicker-item-text-disabled` |
| `tokens.timepicker.item.radius` | `--component-timepicker-item-radius` |
| `tokens.timepicker.footer.divider` | `--component-timepicker-footer-divider` |
| `tokens.timepicker.footer.p` | `--component-timepicker-footer-p` |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

