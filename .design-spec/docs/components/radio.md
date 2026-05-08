# Component: Radio

## Level

Molecular

## Aliases

- single-select toggle
- option group

## References

- Arco Vue（API / 行为真源）: https://arco.design/vue/component/radio
- Arco 源码: `arco-design-vue/packages/web-vue/components/radio/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Radio** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 外圈与内点尺寸、与标签间距、字阶/行高、描边与填充以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- **Sizes** 与 `tokens/src/component.json` 中 `radio.outerSize`、`radio.dotSize`、`radio.gap`、`radio.layout.*`、`radio.focusRing`，以及胶囊 `radioButton.*` 对齐。

## Arco API 对齐（摘要）

| Arco `prop` | 说明 | 本 demo |
| ------------- | ---- | ------- |
| `model-value` / `v-model`（`RadioGroup`） | 受控选中值 | Live 固定两项，首项默认选中；整组 `disabled` 由侧栏 **Content / state** 切换 |
| `disabled` | 不可交互 | 侧栏 **disabled** 时组内 `input` 均 `disabled` |
| `type="button"`（`Radio`） | 胶囊形态 | 侧栏 **Style**：`capsule` 使用 `radioButton.*` token 的 pill 结构 |

## Arco DOM（与 demo 对齐）

- **经典圆点**：**`label`** 包裹 **`input[type=radio]`**（视觉隐藏）+ **`span.ds-rb-outer`**（外圈）+ **`span.ds-rb-dot`**（内点）+ **`span.ds-rb-col`**（标签/辅助文案）；`for` / `id` 关联。
- **胶囊**：**`label.ds-rbc`** + **`input`** + **`span.ds-rbc-pill`**；组容器可加 **`div.ds-rg.ds-rg-capsule`** 控制横向间距。
- 类名前缀 **`ds-rb*`** / **`ds-rbc`**，不要求与 `arco-radio*` 字符串一致。

## Best practices

- **Use for**: mutually exclusive choices (exactly one option in a group).
- **Group rules**:
  - Provide a clear default when appropriate.
  - Do not mix Radio with Checkbox semantics in the same group.
- **Labeling**: label describes the option, not the action.

## Anatomy

High-level structure:

```
( ) Label (optional)
    Helper text (optional)
```

| Part | Description | Notes |
|---|---|---|
| Outer control | Circular indicator showing selection | Must meet minimum hit target. |
| Inner dot | Visible only when selected | Keep centered; size should not change across states. |
| Label (optional) | Option label | Clicking label selects the option; associate for a11y. |
| Helper text (optional) | Supporting text under label | Use for constraints/description; keep visually secondary. |

## Variants

### Variant axes

- **Value**: Unselected / Selected
- **State**: Default / Hover / Disabled
- **Content**: label only / label + helper
- **Style**: Classic (circle) / Radio Button (capsule)

### Classic radio (circle) variants

| Value | State | Outer | Dot | Label |
|---|---|---|---|---|
| Unselected | Default | `var(--component-radio-unchecked-bg-default)` + `var(--component-radio-unchecked-border-default)` | none | `var(--component-radio-label-text-default)` |
| Unselected | Hover | `var(--component-radio-unchecked-bg-hover)` + `var(--component-radio-unchecked-border-hover)` | none | `var(--component-radio-label-text-default)` |
| Unselected | Disabled | `var(--component-radio-unchecked-bg-disabled)` + `var(--component-radio-unchecked-border-disabled)` | none | `var(--component-radio-label-text-disabled)` |
| Selected | Default | `var(--component-radio-checked-outer-default)` | `var(--component-radio-checked-dot-default)` | `var(--component-radio-label-text-default)` |
| Selected | Disabled | `var(--component-radio-checked-outer-disabled)` | `var(--component-radio-checked-dot-disabled)` | `var(--component-radio-label-text-disabled)` |

### Radio Button (capsule) variants

| Value | State | Background | Text |
|---|---|---|---|
| Unselected | Default | `var(--component-radio-button-bg-default)` | `var(--component-radio-button-text-default)` |
| Selected | Default | `var(--component-radio-button-bg-selected)` | `var(--component-radio-button-text-selected)` |
| Disabled | Disabled | `var(--component-radio-button-bg-disabled)` | `var(--component-radio-button-text-disabled)` |

## Sizes

### Classic radio (circle)

From the provided nodes:

| Size | Outer size | Dot size | Gap to label | Label typography | Helper typography |
|---|---:|---:|---:|---|---|
| M (default) | `var(--component-radio-outer-size)` | `var(--component-radio-dot-size)` | `var(--component-radio-gap)` | `var(--component-radio-layout-label-font-size)` / line-height `var(--component-radio-layout-label-line-height)` | `var(--component-radio-layout-helper-font-size)` / line-height `var(--component-radio-layout-helper-line-height)` |

### Radio Button (capsule)

| Size | Height | Padding X | Padding Y | Radius |
|---|---:|---:|---:|---:|
| L | auto | `var(--component-radio-button-px-lg)` | `var(--component-radio-button-py-lg)` | `var(--component-radio-button-radius-lg)` |
| M | auto | `var(--component-radio-button-px-md)` | `var(--component-radio-button-py-md)` | `var(--component-radio-button-radius-md)` |
| S | `var(--component-radio-button-h-sm)` | `var(--component-radio-button-px-sm)` | (centered) | `var(--component-radio-button-radius-sm)` |

Demo：侧栏 **Capsule size** 切换 `data-capsule-size="lg|md|sm"`，矩阵与 Live 同步。

## States

| State | When to use | Notes |
|---|---|---|
| Default | Resting state | Primary for most screens. |
| Hover | Pointer hover on web | Must not be the only affordance; keep focus visible too. |
| Disabled | Not interactive | Use to indicate unavailable options; keep label readable. |
| Selected | The chosen option | Exactly one in group; use clear visual difference. |

## Component token bindings (required)

All values below must come from component tokens (`.design-spec/tokens/src/component.json`) which in turn must reference semantic tokens only.

### Classic radio (circle)

| Token (CSS) | JSON path |
|---|---|
| `--component-radio-outer-size` | `tokens.radio.outerSize` |
| `--component-radio-dot-size` | `tokens.radio.dotSize` |
| `--component-radio-gap` | `tokens.radio.gap` |
| `--component-radio-label-text-default` | `tokens.radio.labelTextDefault` |
| `--component-radio-label-text-disabled` | `tokens.radio.labelTextDisabled` |
| `--component-radio-helper-text-default` | `tokens.radio.helperTextDefault` |
| `--component-radio-helper-text-disabled` | `tokens.radio.helperTextDisabled` |
| `--component-radio-unchecked-bg-default` | `tokens.radio.uncheckedBgDefault` |
| `--component-radio-unchecked-border-default` | `tokens.radio.uncheckedBorderDefault` |
| `--component-radio-unchecked-bg-hover` | `tokens.radio.uncheckedBgHover` |
| `--component-radio-unchecked-border-hover` | `tokens.radio.uncheckedBorderHover` |
| `--component-radio-unchecked-bg-disabled` | `tokens.radio.uncheckedBgDisabled` |
| `--component-radio-unchecked-border-disabled` | `tokens.radio.uncheckedBorderDisabled` |
| `--component-radio-checked-outer-default` | `tokens.radio.checkedOuterDefault` |
| `--component-radio-checked-dot-default` | `tokens.radio.checkedDotDefault` |
| `--component-radio-checked-outer-disabled` | `tokens.radio.checkedOuterDisabled` |
| `--component-radio-checked-dot-disabled` | `tokens.radio.checkedDotDisabled` |
| `--component-radio-focus-ring` | `tokens.radio.focusRing` |
| `--component-radio-layout-label-font-size` | `tokens.radio.layout.labelFontSize` |
| `--component-radio-layout-label-line-height` | `tokens.radio.layout.labelLineHeight` |
| `--component-radio-layout-helper-font-size` | `tokens.radio.layout.helperFontSize` |
| `--component-radio-layout-helper-line-height` | `tokens.radio.layout.helperLineHeight` |

### Radio Button (capsule)

| Token (CSS) | JSON path |
|---|---|
| `--component-radio-button-gap` | `tokens.radioButton.gap` |
| `--component-radio-button-bg-default` | `tokens.radioButton.bgDefault` |
| `--component-radio-button-text-default` | `tokens.radioButton.textDefault` |
| `--component-radio-button-bg-selected` | `tokens.radioButton.bgSelected` |
| `--component-radio-button-text-selected` | `tokens.radioButton.textSelected` |
| `--component-radio-button-bg-disabled` | `tokens.radioButton.bgDisabled` |
| `--component-radio-button-text-disabled` | `tokens.radioButton.textDisabled` |
| `--component-radio-button-radius-lg` | `tokens.radioButton.radiusLg` |
| `--component-radio-button-radius-md` | `tokens.radioButton.radiusMd` |
| `--component-radio-button-radius-sm` | `tokens.radioButton.radiusSm` |
| `--component-radio-button-px-lg` | `tokens.radioButton.pxLg` |
| `--component-radio-button-py-lg` | `tokens.radioButton.pyLg` |
| `--component-radio-button-px-md` | `tokens.radioButton.pxMd` |
| `--component-radio-button-py-md` | `tokens.radioButton.pyMd` |
| `--component-radio-button-px-sm` | `tokens.radioButton.pxSm` |
| `--component-radio-button-h-sm` | `tokens.radioButton.hSm` |

## Layout patterns

- **Form field**: radio group with helper text and validation message below.
- **Segmented selection**: use Radio Button (capsule) for compact, mutually-exclusive filters.

## Anti-patterns

- Using Radio for multiple selection (use `Checkbox`).
- Groups without a clear label/context.

## 推断（Figma 未单独画出的状态）

- **键盘焦点环**：稿侧未必逐态标注；与 Arco Web 一致保留 **`input:focus-visible`** 外显环，token 为 **`--component-radio-focus-ring`**（`tokens.radio.focusRing` → semantic `focus.ring`）。
- **矩阵「Focus」行**：静态示意，使用 **`is-demo-focus`** 类模拟与 `:focus-visible` 相同的 `box-shadow`，便于并排对比。

## Accessibility essentials

- **Keyboard**: Tab to group, arrow keys to move between options, Space to select (platform-dependent); at minimum support Tab + Space on each control.
- **Name**: label must be programmatically associated.
- **State**: expose selected/disabled semantics, not visual-only.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `radio/group/circle/md/default`
  - `radio/group/circle/md/selected`
  - `radio-button/group/capsule/md/selected`

