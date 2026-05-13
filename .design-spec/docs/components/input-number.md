# Component: InputNumber

## Level

Molecular

## Aliases

- number input
- numeric input
- stepper

## References

- Arco Design Web React `InputNumber`（交互细则真源）: [https://arco.design/react/components/input-number](https://arco.design/react/components/input-number)
- Arco Design Web React `Input`（关联输入形态参考）: [https://arco.design/react/components/input](https://arco.design/react/components/input)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 行高、边框、加减控件与焦点环以 **`--component-input-number-*`** 为准，并与 Input 四档高度表（文档 **Sizes**）对齐 demo 的 **`data-size`**（s / l / xl）。

## Arco API 对齐（摘要）

| 能力 | 本 demo |
| --- | --- |
| `mode`：`embed` / `button` / `plain` | 侧栏 **Mode** |
| `hideControl` | **hideControl** 勾选隐藏步进按钮 |
| `error` | **error** 勾选为外壳/中区加 `is-error` |
| `readOnly` | **readOnly** 勾选 |
| `role="spinbutton"` + `aria-valuemin/max/now` | Live 输入框 |

## Arco DOM（与 demo 对齐）

- Live 使用 **`div.ds-num--embed|button|plain`** 包裹 **`input.ds-input.in-num.ds-num-inp`** 与 **`button.ds-num-btn`**；不要求与 `arco-input-number` 类名一致。

## 推断

- **长按步进**：demo 为 **1000ms** 后每 **200ms** 重复（与 Arco Design Web React 交互预期同量级；精确间隔以产品测试为准）。

## Best practices

- **Use for**: numeric values with validation, precision, min/max, and step.
- **Prefer**: plain `Input` for free-form text; `InputNumber` must enforce numeric parsing.
- **Affixes**: use suffix/prefix only for stable units (e.g. `%`, `kg`); avoid ambiguous units.
- **Step buttons**: show only when step interaction adds value (e.g. quantity).
- **Error**: show field error + message; do not silently clamp without feedback (unless explicitly required).

## Layout patterns

- **Forms**: `FormItem(label + InputNumber + help/error)`.
- **Tables**: inline editing for quantity/price with confirm/apply.
- **Filters**: min/max pairs for range filtering (use 2 inputs).

## Anti-patterns

- Using `InputNumber` for IDs or phone numbers (leading zeros, formatting).
- Clamping values without communicating (users think their input “disappeared”).
- Showing step buttons when min/max is narrow and causes constant disabled states (prefer dropdown/slider).

## Accessibility essentials

- **Keyboard**: arrow keys step; Home/End (optional) jump to min/max; Enter commits (if apply flow).
- **Focus**: visible focus ring; step buttons reachable and labeled.
- **Name**: input has accessible name; step buttons have `aria-label` (Increase/Decrease).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `input-number/plain/rounded/xl/default`
  - `input-number/plain/rounded/xl/focus`
  - `input-number/stepper/rounded/xl/default`
  - `input-number/stepper/rounded/xl/error`

## Anatomy

### Plain

```
┌──────────────────────────────┐
│ Value / Placeholder     [unit]│
│ (optional helper/error)       │
└──────────────────────────────┘
```

### Stepper (加减模式)

```
┌──────────────────────────────────────────┐
│ [-]  Value / Placeholder (center)  [+]   │
│ (optional helper/error)                  │
└──────────────────────────────────────────┘
```

## Variants


| **Kind**  | **加减模式** | **填充**     | **Notes**                       |
| --------- | -------- | ---------- | ------------------------------- |
| `plain`   | false    | true/false | input with optional suffix unit |
| `stepper` | true     | true       | minus/value/plus buttons        |


## Sizes


| **Size** | **Height** | **Radius** | **Padding X** | **Text**     |
| -------- | ---------- | ---------- | ------------- | ------------ |
| `XL`     | 36         | 8          | 12            | 14 / line 20 |
| `L`      | 32         | 6          | 12            | 14 / line 20 |
| `M`      | 28         | 6          | 12            | 14 / line 20 |
| `S`      | 24         | 6          | 12            | 14 / line 20 |


## States

### Trigger (input-like) — states


| **State** | **BG**                                      | **Border**                                      | **Text**                                      | **Ring**                                   |
| --------- | ------------------------------------------- | ----------------------------------------------- | --------------------------------------------- | ------------------------------------------ |
| Default   | `var(--component-input-number-bg-default)`  | `var(--component-input-number-border-default)`  | `var(--component-input-number-text-value)`    | none                                       |
| Hover     | `var(--component-input-number-bg-hover)`    | `var(--component-input-number-border-hover)`    | `var(--component-input-number-text-value)`    | none                                       |
| Focus     | `var(--component-input-number-bg-focus)`    | `var(--component-input-number-border-focus)`    | `var(--component-input-number-text-value)`    | `var(--component-input-number-ring-focus)` |
| Disabled  | `var(--component-input-number-bg-disabled)` | `var(--component-input-number-border-disabled)` | `var(--component-input-number-text-disabled)` | none                                       |
| Error     | `var(--component-input-number-bg-default)`  | `var(--component-input-number-border-error)`    | `var(--component-input-number-text-value)`    | `var(--component-input-number-ring-error)` |


### Placeholder / helper / suffix (unit)


| **Part**           | **Token**                                            |
| ------------------ | ---------------------------------------------------- |
| Placeholder text   | `var(--component-input-number-text-placeholder)`     |
| Helper text        | `var(--component-input-number-helper-text)`          |
| Error text         | `var(--component-input-number-error-text)`           |
| Suffix (unit) text | `var(--component-input-number-suffix-text)`          |
| Suffix disabled    | `var(--component-input-number-suffix-text-disabled)` |


### Stepper buttons (加减模式)


| **Part**            | **BG**                                      | **Border/Divider**                           | **Icon**                                  | **Icon disabled**                                  |
| ------------------- | ------------------------------------------- | -------------------------------------------- | ----------------------------------------- | -------------------------------------------------- |
| Minus / Plus button | `var(--component-input-number-step-btn-bg)` | `var(--component-input-number-step-divider)` | `var(--component-input-number-step-icon)` | `var(--component-input-number-step-icon-disabled)` |


## Executable interaction rules

### Parsing & formatting

- Input accepts digits, optional leading `-`, and one decimal separator (locale-aware).
- On blur (or confirm), normalize to configured precision.
- If user input is invalid, keep raw text while focused and show error on commit/blur.

### Step behavior (required)

- `step` defaults to 1 unless specified.
- ArrowUp increases by step; ArrowDown decreases by step.
- Step buttons:
  - Click `+` increases, `-` decreases.
  - Press & hold (optional): repeats with accelerating rate.

### Min/Max

- If next step would exceed bounds, block that action and disable the corresponding button.
- If user types beyond bounds:
  - Either clamp on blur/confirm (allowed) OR show error and require correction (allowed).
  - Pick one policy globally.

### Range usage

- For numeric ranges, use two `InputNumber` fields: Min / Max.
- Validation: Min ≤ Max; otherwise show error on the offending field(s).

### Keyboard & ARIA (required)

- Input is `role="spinbutton"` with:
  - `aria-valuemin`, `aria-valuemax`, `aria-valuenow` (when value is valid)
- Step buttons:
  - `aria-label="Increase value"` and `aria-label="Decrease value"`

## Component token bindings (required)


| **Token path**                          | **CSS var**                                     |
| --------------------------------------- | ----------------------------------------------- |
| `tokens.inputNumber.bgDefault`          | `--component-input-number-bg-default`           |
| `tokens.inputNumber.bgHover`            | `--component-input-number-bg-hover`             |
| `tokens.inputNumber.bgFocus`            | `--component-input-number-bg-focus`             |
| `tokens.inputNumber.bgDisabled`         | `--component-input-number-bg-disabled`          |
| `tokens.inputNumber.borderDefault`      | `--component-input-number-border-default`       |
| `tokens.inputNumber.borderHover`        | `--component-input-number-border-hover`         |
| `tokens.inputNumber.borderFocus`        | `--component-input-number-border-focus`         |
| `tokens.inputNumber.borderDisabled`     | `--component-input-number-border-disabled`      |
| `tokens.inputNumber.borderError`        | `--component-input-number-border-error`         |
| `tokens.inputNumber.textValue`          | `--component-input-number-text-value`           |
| `tokens.inputNumber.textPlaceholder`    | `--component-input-number-text-placeholder`     |
| `tokens.inputNumber.textDisabled`       | `--component-input-number-text-disabled`        |
| `tokens.inputNumber.helperText`         | `--component-input-number-helper-text`          |
| `tokens.inputNumber.errorText`          | `--component-input-number-error-text`           |
| `tokens.inputNumber.suffixText`         | `--component-input-number-suffix-text`          |
| `tokens.inputNumber.suffixTextDisabled` | `--component-input-number-suffix-text-disabled` |
| `tokens.inputNumber.ringFocus`          | `--component-input-number-ring-focus`           |
| `tokens.inputNumber.ringError`          | `--component-input-number-ring-error`           |
| `tokens.inputNumber.step.btnBg`         | `--component-input-number-step-btn-bg`          |
| `tokens.inputNumber.step.divider`       | `--component-input-number-step-divider`         |
| `tokens.inputNumber.step.icon`          | `--component-input-number-step-icon`            |
| `tokens.inputNumber.step.iconDisabled`  | `--component-input-number-step-icon-disabled`   |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

