# Component: Input

## Level

Molecular

## Aliases

- text field
- textbox

## References

- Arco Vue（API / 行为真源）: https://arco.design/vue/component/input
- Arco 源码: `arco-design-vue/packages/web-vue/components/input/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Input** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 各尺寸高度、水平/垂直 padding、圆角、占位与正文色、边框与 **focus ring** 以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- **S / L / XL** 与 `tokens/src/component.json` 中 `input.layout.s` / `l` / `xl` 及 `input.maxWidth`、`input.textValue` 对齐。

## Arco API 对齐（摘要）

| Arco `prop` | 说明 | 本 demo |
| ------------- | ---- | ------- |
| `size` | `mini` / `small` / `medium` / `large` 等 | 侧栏 **Size**：`sm`→S、`md`→L、`lg`→XL（`data-size=s|l|xl`） |
| `type` / `password` | 密码显隐 | **Password** 变体 + `aria-pressed` / `aria-label` |
| `Search` | 搜索框 | **Search** 变体，`type="search"`，`role="search"` |
| `add-after` / `add-before` | 前后缀 | **Suffix** / **group** 组合示意 |

## Arco DOM（与 demo 对齐）

- **单框**：原生 **`input.ds-input`**，`data-size` 驱动 layout token；占位色 **`--component-input-text-default`**，输入正文 **`--component-input-text-value`**。
- **组合**：**`.ds-in-row`** 包裹；**group** 使用 **`span.ds-in-addon`** + **`input`**，`role="group"` 与 **`aria-label`**；**search** 使用 **`role="search"`** 容器 + 左侧装饰 **`aria-hidden`**。
- 类名前缀 **`ds-input*` / `ds-in-*`**，不要求与 `arco-input` 字符串一致。

## 推断（Figma 未单独画出的状态）

- **键盘焦点**：使用 **`:focus-visible`** 展示 **`--component-input-ring-focus`**，避免鼠标点击出现双环。
- **矩阵 Active / Focus 行**：静态 **`mat-inp-*`** 类，与 Arco 态色一致，便于并排对比。

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
- **Filled**: empty vs filled value

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


|            |                      |                  |                   |                   |          |                            |
| ---------- | -------------------- | ---------------- | ----------------- | ----------------- | -------- | -------------------------- |
| **Name**   | **State**            | **Background**   | **Font**          | **Border**        | **Ring** | **When to use**            |
| 默认         | Default              | `var(--component-input-bg-default)` | `var(--component-input-text-default)` | `var(--component-input-border-default)` | none | Resting state |
| 悬停         | Hover                | `var(--component-input-bg-hover)` | `var(--component-input-text-default)` | `var(--component-input-border-hover)` | none | Pointer hover on web |
| 聚焦 / 激活输入框 | Focus                | `var(--component-input-bg-focus)` | `var(--component-input-text-focus)` | `var(--component-input-border-focus)` | `var(--component-input-ring-focus)` | Active text entry |
| 输入中        | Typing               | `var(--component-input-bg-typing)` | `var(--component-input-text-focus)` | `var(--component-input-border-focus)` | none | During input |
| 输入完成       | Completed            | `var(--component-input-bg-completed)` | `var(--component-input-text-focus)` | `var(--component-input-border-default)` | none | Value confirmed/valid |
| 报错 / 输入报错  | Error                | `var(--component-input-bg-error)` | `var(--component-input-text-focus)` | `var(--component-input-border-error)` | `var(--component-input-ring-error)` | Validation failed |
| 禁用         | Disabled             | `var(--component-input-bg-disabled)` | `var(--component-input-text-disabled)` | `var(--component-input-border-disabled)` | none | Not editable |
| 禁用-输入完成    | Disabled (segmented) | `var(--component-input-bg-disabled)` | `var(--component-input-text-disabled)` | `var(--component-input-border-disabled)` | none | IP input disabled variants |


## Layout patterns

- **Search bar**: input + optional clear + submit button.
- **Form row**: label + input + helper/error text.

## Anti-patterns

- Placeholder-only labeling.
- Silent input masks/formatting changes without explaining expected format.

## Component token bindings (required)

### Shared

| Token (CSS) | JSON path |
| --- | --- |
| `--component-input-max-width` | `tokens.input.maxWidth` |
| `--component-input-text-value` | `tokens.input.textValue` |

### Layout（`data-size` = `s` \| `l` \| `xl`）

| Token (CSS) | JSON path |
| --- | --- |
| `--component-input-layout-s-height` | `tokens.input.layout.s.height` |
| `--component-input-layout-s-padding-x` | `tokens.input.layout.s.paddingX` |
| `--component-input-layout-s-padding-y` | `tokens.input.layout.s.paddingY` |
| `--component-input-layout-s-font-size` | `tokens.input.layout.s.fontSize` |
| `--component-input-layout-s-line-height` | `tokens.input.layout.s.lineHeight` |
| `--component-input-layout-s-radius` | `tokens.input.layout.s.radius` |
| `--component-input-layout-l-height` | `tokens.input.layout.l.height` |
| `--component-input-layout-l-padding-x` | `tokens.input.layout.l.paddingX` |
| `--component-input-layout-l-padding-y` | `tokens.input.layout.l.paddingY` |
| `--component-input-layout-l-font-size` | `tokens.input.layout.l.fontSize` |
| `--component-input-layout-l-line-height` | `tokens.input.layout.l.lineHeight` |
| `--component-input-layout-l-radius` | `tokens.input.layout.l.radius` |
| `--component-input-layout-xl-height` | `tokens.input.layout.xl.height` |
| `--component-input-layout-xl-padding-x` | `tokens.input.layout.xl.paddingX` |
| `--component-input-layout-xl-padding-y` | `tokens.input.layout.xl.paddingY` |
| `--component-input-layout-xl-font-size` | `tokens.input.layout.xl.fontSize` |
| `--component-input-layout-xl-line-height` | `tokens.input.layout.xl.lineHeight` |
| `--component-input-layout-xl-radius` | `tokens.input.layout.xl.radius` |

### Surfaces（背景 / 边框 / 环 / 占位与禁用字色）

| Token (CSS) | JSON path |
| --- | --- |
| `--component-input-bg-default` | `tokens.input.bgDefault` |
| `--component-input-bg-hover` | `tokens.input.bgHover` |
| `--component-input-bg-focus` | `tokens.input.bgFocus` |
| `--component-input-bg-typing` | `tokens.input.bgTyping` |
| `--component-input-bg-completed` | `tokens.input.bgCompleted` |
| `--component-input-bg-error` | `tokens.input.bgError` |
| `--component-input-bg-disabled` | `tokens.input.bgDisabled` |
| `--component-input-text-default` | `tokens.input.textDefault` |
| `--component-input-text-focus` | `tokens.input.textFocus` |
| `--component-input-text-disabled` | `tokens.input.textDisabled` |
| `--component-input-border-default` | `tokens.input.borderDefault` |
| `--component-input-border-hover` | `tokens.input.borderHover` |
| `--component-input-border-focus` | `tokens.input.borderFocus` |
| `--component-input-border-error` | `tokens.input.borderError` |
| `--component-input-border-disabled` | `tokens.input.borderDisabled` |
| `--component-input-ring-focus` | `tokens.input.ringFocus` |
| `--component-input-ring-error` | `tokens.input.ringError` |

## Accessibility essentials

- **Keyboard**: standard text editing behavior; no custom key overrides.
- **Name**: label association; if icon-only (search), provide accessible name.
- **Error**: expose error state and message to assistive tech.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `input/text/rounded/md/default`
  - `input/text/rounded/md/error`

