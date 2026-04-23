# Component: Input

## Level

Molecular

## Aliases

- text field
- textbox

## Best practices

- **Use for**: short text entry (names, titles, IDs, search).
- **Labeling**: labels describe the data; placeholders are optional hints.
- **States**: default, hover, focus, disabled, readonly, error.
- **Help**: use helper text for constraints (format, limits) and show validation clearly.

## Anatomy

High-level structure (recommended for most form fields):

```
Label (optional)
┌─────────────────────────────────────┐
│ [icon] Placeholder/Value   [action] │
└─────────────────────────────────────┘
Helper text or error message
```


| Part                      | Description                                                  | Notes                                                                                                   |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Label (optional)          | Visible label describing the field                           | Must remain visible; placeholder is not a substitute. Prefer `Form` label association.                  |
| Container                 | Outer wrapper providing background/border/radius             | Token-driven surface + border; avoid hardcoded colors.                                                  |
| Input area                | Text entry region                                            | Must support placeholder + value; respects padding per size.                                            |
| Placeholder               | Hint text when empty                                         | Never replace labels; contrast must remain readable.                                                    |
| Value                     | User-entered text                                            | Supports truncation with horizontal scroll; do not auto-truncate without affordance.                    |
| Caret                     | Text cursor                                                  | Must be visible on focus; ensure contrast.                                                              |
| Prefix slot (`addBefore`) | Leading label/icon/selector (e.g., `http://`)                | Use only when it improves comprehension (units/protocols).                                              |
| Suffix slot (`addAfter`)  | Trailing icon/label/selector (search, clear, unit, dropdown) | Icon-only requires accessible name; keep hit target size.                                               |
| Clear action              | Clears current value                                         | Only visible when there is value; must be keyboard reachable.                                           |
| Helper text               | Prompt/helper text under field                               | Tokenized typography; used for constraints and guidance.                                                |
| Error message             | Validation message under field                               | Must be specific and actionable; associated with the field for a11y. Takes precedence over helper text. |
| Divider                   | Thin separator between segments (range/IP)                   | Visual + structural; do not rely on color alone for meaning.                                            |
| Counter (Textarea)        | Character count (e.g., `0/50`)                               | Optional; announce changes politely; avoid noisy updates.                                               |
| Resizer (Textarea)        | Resize handle                                                | Web-only; must not overlap text; keep accessible resizing if possible.                                  |


## Variants

### Variant axes

From the provided nodes, Input includes:

- **Style**: Standard input / Range input / Search box / Textarea / Password / IP input
- **Affixes**: none / prefix+suffix labels / suffix unit / suffix selector / suffix count text
- **Filled**: empty vs filled value (Figma: `填充文本`)

### Variants


| Name          | Variant                        | Typical use                          | Notes                                                          |
| ------------- | ------------------------------ | ------------------------------------ | -------------------------------------------------------------- |
| 输入框           | Text input                     | General short text entry             | Supports suffix icon; helper/error below.                      |
| 范围输入框         | Range input                    | Min–max values, ranges               | Two inputs + divider + optional suffix unit.                   |
| 搜索框           | Search box                     | Search/filter keyword entry          | Search icon + optional clear; icon can be left/right.          |
| 文本域           | Textarea                       | Multi-line text                      | Optional counter + resizer; supports the same states as input. |
| 密码框           | Password input                 | Password entry                       | Masked value + show/hide action; ensure accessible toggle.     |
| 后置选择器 / 前置选择器 | Input with selector            | Input paired with select (unit/type) | Treat as a composite control; maintain shared height/radius.   |
| 带前置/后置标签      | Input with prefix/suffix label | Protocols, fixed prefixes            | Prefix label is not editable; keep separation clear.           |
| 后置单位 / 后置文本数  | Input with unit / count        | Units (S, %, kg) or counts           | Keep unit visually secondary; never parse unit from user text. |
| IP输入框         | IP segmented input             | IPv4 entry                           | Segmented fields + separators; supports “未输入/输入中/完成/报错/禁用”.    |


## Sizes


|          |            |             |               |               |                   |                                                               |
| -------- | ---------- | ----------- | ------------- | ------------- | ----------------- | ------------------------------------------------------------- |
| **Size** | **Height** | **Padding** | **Padding Y** | **Font Size** | **Corner radius** | **Notes**                                                     |
| XL       | 36px       | 12px        | 8px           | 14px / Medium | 8px               | Default desktop dense forms; supports icons/affixes.          |
| L        | 32px       | 12px        | 6px           | 14px / Medium | 6px               | Common B-end density; keep line-height 20.                    |
| S        | 28px       | 8px         | 6px           | 12px / Medium | 4px               | Compact toolbars/filters; ensure hit targets remain adequate. |
| M        | 24px       | 8px         | 4px           | 12px / Medium | 4px               | Tight spaces; avoid for critical form fields when possible.   |


## States


|            |                      |                  |                   |                     |          |                            |
| ---------- | -------------------- | ---------------- | ----------------- | ------------------- | -------- | -------------------------- |
| **Name**   | **State**            | **Background**   | **Font**          | **Border**          | **Ring** | **When to use**            |
| 默认         | Default              | color-neutral-20 | color-neutral-120 | none                | none     | Resting state              |
| 悬停         | Hover                | color-neutral-60 |                   | none                | none     | Pointer hover on web       |
| 聚焦 / 激活输入框 | Focus                | color-neutral-20 |                   | color-neutral-170   | none     | Active text entry          |
| 输入中        | Typing               | color-neutral-20 | color-neutral-170 | none                | none     | During input               |
| 输入完成       | Completed            | color-neutral-20 | color-neutral-170 | none                | none     | Value confirmed/valid      |
| 报错 / 输入报错  | Error                | color-neutral-20 | color-neutral-170 | color-red-50        | red/20%  | Validation failed          |
| 禁用         | Disabled             | color-neutral-10 | color-neutral-120 | none                | none     | Not editable               |
| 禁用-输入完成    | Disabled (segmented) | color-neutral-10 | color-neutral-120 | none                | none     | IP input disabled variants |


## Layout patterns

- **Search bar**: input + optional clear + submit button.
- **Form row**: label + input + helper/error text.

## Anti-patterns

- Placeholder-only labeling.
- Silent input masks/formatting changes without explaining expected format.

## Accessibility essentials

- **Keyboard**: standard text editing behavior; no custom key overrides.
- **Name**: label association; if icon-only (search), provide accessible name.
- **Error**: expose error state and message to assistive tech.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `input/text/rounded/md/default`
  - `input/text/rounded/md/error`

