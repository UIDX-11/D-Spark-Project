# Component: DatePicker

## Level

Molecular

## Aliases

- date picker
- datetime picker
- range picker
- calendar picker

## References

- Arco Design Web React（API / 行为真源）: [DatePicker](https://arco.design/react/components/date-picker)
- Arco 源码（React）: [`arco-design/components/DatePicker`](https://github.com/arco-design/arco-design/tree/main/components/DatePicker)
- Figma（Light，视觉真源）: 见本文 **「Figma 参考」** 各节点链接；文件总入口 [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026)。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Best practices

- **Use for**: selecting a date, date range, and optionally time.
- **Input format**: show placeholder format (e.g. `dd/mm/yy`) and keep it consistent across app.
- **Range**: prefer range picker for “start–end”; do not force users to pick two single dates.
- **Presets**: provide quick ranges only when they match the domain (e.g. “Last 7 days” for analytics).
- **Validation**: enforce min/max, disabled dates, and invalid ranges with clear error message.

## Layout patterns

- **Forms**: `FormItem(label + DatePicker + help/error)` with required/optional.
- **Filter bar**: date range with presets, optional time.
- **Tables / reports**: range picker with “Apply” to avoid re-query on every click.

## Anti-patterns

- Auto-applying a range while the user is still choosing end date (use Apply in data-heavy pages).
- Allowing invalid ranges silently (must block or explain).
- Hiding current month/year context (navigation must stay visible).

## Accessibility essentials

- **Keyboard**: full operation without mouse (open, navigate days, select, confirm/cancel, close).
- **Focus**: visible focus on day cell and time list items; focus does not jump silently.
- **Name**: trigger must have an accessible name (Form label or `aria-label`).
- **Announcements**: selection changes and invalid actions should be perceivable to screen readers.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `datepicker/date/rounded/md/default`
  - `datepicker/date/rounded/md/error`
  - `datepicker/datetime/rounded/md/default`
  - `datepicker/date-range/rounded/md/default`

## Anatomy

```
┌──────────────────────────────┐
│ Trigger (value / placeholder)│  [calendar icon]
└──────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────────┐
│ Header: month/year + prev/next             │
│ Week row                                   │
│ Day grid (hover/selected/range/disabled)   │
│ (optional) Time panel / time columns       │
│ (optional) Presets                         │
│ (optional) Footer actions (Confirm/Cancel) │
└────────────────────────────────────────────┘
```

## Variants


| **Kind**         | **Range** | **Time** | **When to use**           |
| ---------------- | --------- | -------- | ------------------------- |
| `date`           | no        | no       | standard date selection   |
| `datetime`       | no        | yes      | date + time, single value |
| `date-range`     | yes       | no       | start–end date            |
| `datetime-range` | yes       | yes      | start–end with time       |
| `week`           | optional  | no       | week-based reporting      |
| `month`          | optional  | no       | month-level selection     |
| `year`           | optional  | no       | year-level selection      |
| `quarter`        | optional  | no       | quarter selection         |


## States

### Trigger (input-like) — states


| **State** | **Background**                                    | **Border**                                            | **Text**                                            | **Icon**                                            | **Ring**                                         |
| --------- | ------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------ |
| Default   | `var(--component-datepicker-trigger-bg-default)`  | `var(--component-datepicker-trigger-border-default)`  | `var(--component-datepicker-trigger-text-default)`  | `var(--component-datepicker-trigger-icon-default)`  | none                                             |
| Focus     | `var(--component-datepicker-trigger-bg-focus)`    | `var(--component-datepicker-trigger-border-focus)`    | `var(--component-datepicker-trigger-text-focus)`    | `var(--component-datepicker-trigger-icon-default)`  | `var(--component-datepicker-trigger-ring-focus)` |
| Error     | `var(--component-datepicker-trigger-bg-error)`    | `var(--component-datepicker-trigger-border-error)`    | `var(--component-datepicker-trigger-text-default)`  | `var(--component-datepicker-trigger-icon-default)`  | `var(--component-datepicker-trigger-ring-error)` |
| Disabled  | `var(--component-datepicker-trigger-bg-disabled)` | `var(--component-datepicker-trigger-border-disabled)` | `var(--component-datepicker-trigger-text-disabled)` | `var(--component-datepicker-trigger-icon-disabled)` | none                                             |


### Day cell — states (required)


| **State** | **Background**                                | **Text**                                        | **Notes**         |
| --------- | --------------------------------------------- | ----------------------------------------------- | ----------------- |
| Default   | `var(--component-datepicker-day-bg-default)`  | `var(--component-datepicker-day-text-default)`  | normal day        |
| Hover     | `var(--component-datepicker-day-bg-hover)`    | `var(--component-datepicker-day-text-default)`  | hover highlight   |
| Selected  | `var(--component-datepicker-day-bg-selected)` | `var(--component-datepicker-day-text-selected)` | single selection  |
| In range  | `var(--component-datepicker-day-bg-in-range)` | `var(--component-datepicker-day-text-default)`  | between start/end |
| Disabled  | `var(--component-datepicker-day-bg-default)`  | `var(--component-datepicker-day-text-disabled)` | disabled date     |


## Executable interaction rules

### Open/close

- Clicking trigger toggles popup.
- Clicking outside closes popup.
- `Esc` closes popup and returns focus to trigger.

### Single date

- Click a day selects it.
- If the picker is used in **filters / reports**, prefer **Apply** (Confirm) to commit.
- If the picker is used in **forms**, it may auto-commit on selection (no Apply) if product prefers.

### Range selection

- First click selects **start**.
- Second click selects **end**.
- If end < start, either:
  - swap (allowed) OR
  - reset start (allowed)
  - pick one policy and apply consistently across app.
- While picking end, hovering days should show a **preview range**.

### Time selection (when enabled)

- Time can be selected via:
  - time columns (HH / mm / ss) OR
  - a time input field
- If Confirm exists, time changes should not commit until Confirm.

### Presets (when enabled)

- Presets apply to range pickers (recommended).
- Preset selection must update calendar view to the selected range.

### Keyboard & ARIA (required)

- Trigger:
  - `aria-haspopup="dialog"` and `aria-expanded`
- Popup:
  - Treat as dialog-like overlay. Focus is trapped while open (recommended for date+time).
- Calendar grid:
  - Arrow keys move focus day-by-day (skip disabled).
  - PageUp/PageDown changes month (optional).
  - Home/End jumps to start/end of week (optional).
  - Enter selects focused day.

## Component token bindings (required)


| **Token path**                             | **CSS var**                                      |
| ------------------------------------------ | ------------------------------------------------ |
| `tokens.datepicker.trigger.bgDefault`      | `--component-datepicker-trigger-bg-default`      |
| `tokens.datepicker.trigger.bgFocus`        | `--component-datepicker-trigger-bg-focus`        |
| `tokens.datepicker.trigger.bgError`        | `--component-datepicker-trigger-bg-error`        |
| `tokens.datepicker.trigger.bgDisabled`     | `--component-datepicker-trigger-bg-disabled`     |
| `tokens.datepicker.trigger.borderDefault`  | `--component-datepicker-trigger-border-default`  |
| `tokens.datepicker.trigger.borderFocus`    | `--component-datepicker-trigger-border-focus`    |
| `tokens.datepicker.trigger.borderError`    | `--component-datepicker-trigger-border-error`    |
| `tokens.datepicker.trigger.borderDisabled` | `--component-datepicker-trigger-border-disabled` |
| `tokens.datepicker.trigger.textDefault`    | `--component-datepicker-trigger-text-default`    |
| `tokens.datepicker.trigger.textFocus`      | `--component-datepicker-trigger-text-focus`      |
| `tokens.datepicker.trigger.textDisabled`   | `--component-datepicker-trigger-text-disabled`   |
| `tokens.datepicker.trigger.iconDefault`    | `--component-datepicker-trigger-icon-default`    |
| `tokens.datepicker.trigger.iconDisabled`   | `--component-datepicker-trigger-icon-disabled`   |
| `tokens.datepicker.trigger.ringFocus`      | `--component-datepicker-trigger-ring-focus`      |
| `tokens.datepicker.trigger.ringError`      | `--component-datepicker-trigger-ring-error`      |
| `tokens.datepicker.panel.bg`               | `--component-datepicker-panel-bg`                |
| `tokens.datepicker.panel.border`           | `--component-datepicker-panel-border`            |
| `tokens.datepicker.panel.radius`           | `--component-datepicker-panel-radius`            |
| `tokens.datepicker.panel.shadow`           | `--component-datepicker-panel-shadow`            |
| `tokens.datepicker.day.bgDefault`          | `--component-datepicker-day-bg-default`          |
| `tokens.datepicker.day.bgHover`            | `--component-datepicker-day-bg-hover`            |
| `tokens.datepicker.day.bgSelected`         | `--component-datepicker-day-bg-selected`         |
| `tokens.datepicker.day.bgInRange`          | `--component-datepicker-day-bg-in-range`         |
| `tokens.datepicker.day.textDefault`        | `--component-datepicker-day-text-default`        |
| `tokens.datepicker.day.textSelected`       | `--component-datepicker-day-text-selected`       |
| `tokens.datepicker.day.textDisabled`       | `--component-datepicker-day-text-disabled`       |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

