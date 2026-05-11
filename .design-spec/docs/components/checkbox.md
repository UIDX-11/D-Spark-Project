# Component: Checkbox

## Level

Molecular

## Aliases

- multi-select toggle
- boolean group

## References

- Arco Vue（API / 行为真源）: [https://arco.design/vue/component/checkbox](https://arco.design/vue/component/checkbox)
- Arco 源码: `arco-design-vue/packages/web-vue/components/checkbox/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Checkbox** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 方框尺寸、圆角、与标签间距、字阶/行高、描边与填充、勾选/横杠图形以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- **Sizes** 与 `tokens/src/component.json` 中 `checkbox.box*`、`checkbox.gap`、`checkbox.layout.*`、`checkbox.focusRing` 对齐。

## Arco API 对齐（摘要）


| Arco `prop`               | 说明   | 本 demo                                                         |
| ------------------------- | ---- | -------------------------------------------------------------- |
| `model-value` / `v-model` | 受控值  | 侧栏 **Value**：unchecked / checked / indeterminate               |
| `disabled`                | 不可交互 | 侧栏 **State**：default / disabled                                |
| `indeterminate`           | 半选   | 与 `checked` 互斥；Live 切到 indeterminate 时脚本设 `indeterminate=true` |


## Arco DOM（与 demo 对齐）

- 推荐：`**label`** 包裹 `**input[type=checkbox]**`（可视觉隐藏）+ 自定义 **方框**（demo：`span.ds-cb-box`）+ `**span` 文案**；`for` / `id` 关联保证点击标签切换。
- 类名前缀 `**ds-cb*`**，不要求与 `arco-checkbox*` 字符串一致。

## Best practices

- **Use for**: multiple selection or boolean toggles in lists/forms.
- **Group rules**:
  - Provide “Select all” only when it’s meaningful and reversible.
  - Clearly show indeterminate state when partially selected.
- **Labeling**: label should describe the option, not the action.

## Anatomy

High-level structure:

```
[ ] Label (optional)
```


| Part             | Description                                   | Notes                                                                    |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| Box              | Click/tap target representing selection state | Must meet minimum hit target; visuals should not be the only affordance. |
| Mark             | Checkmark (checked) or dash (indeterminate)   | Must have sufficient contrast; keep shape stable across states.          |
| Label (optional) | Describes the option                          | Clicking label toggles the checkbox; keep label associated for a11y.     |


## Variants

### Variant axes

- **Value**: Unchecked / Checked / Indeterminate
- **State**: Default / Hover / Disabled
- **Label**: with label / box-only

### Variants table


| Value         | State    | Box                                                                                                               | Mark                                                    | Label                                           |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------- |
| Unchecked     | Default  | `var(--component-checkbox-unchecked-bg-default)` + `var(--component-checkbox-unchecked-border-default)`           | none                                                    | `var(--component-checkbox-label-text-default)`  |
| Unchecked     | Hover    | `var(--component-checkbox-unchecked-bg-hover)` + `var(--component-checkbox-unchecked-border-hover)`               | none                                                    | `var(--component-checkbox-label-text-default)`  |
| Unchecked     | Disabled | `var(--component-checkbox-unchecked-bg-disabled)` + `var(--component-checkbox-unchecked-border-disabled)`         | none                                                    | `var(--component-checkbox-label-text-disabled)` |
| Checked       | Default  | `var(--component-checkbox-checked-bg-default)`                                                                    | `var(--component-checkbox-checked-mark-default)`        | `var(--component-checkbox-label-text-default)`  |
| Checked       | Disabled | `var(--component-checkbox-checked-bg-disabled)`                                                                   | `var(--component-checkbox-checked-mark-disabled)`       | `var(--component-checkbox-label-text-disabled)` |
| Indeterminate | Default  | `var(--component-checkbox-indeterminate-bg-default)` + `var(--component-checkbox-indeterminate-border-default)`   | `var(--component-checkbox-indeterminate-dash-default)`  | `var(--component-checkbox-label-text-default)`  |
| Indeterminate | Disabled | `var(--component-checkbox-indeterminate-bg-disabled)` + `var(--component-checkbox-indeterminate-border-disabled)` | `var(--component-checkbox-indeterminate-dash-disabled)` | `var(--component-checkbox-label-text-disabled)` |


## Sizes

Live 侧栏 **Value** / **State** 与 Figma、token 对应（单档 **M**；Light）。


| 维度          | Token / 变量                                                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 方框边长 / 圆角   | `--component-checkbox-box-size` / `--component-checkbox-box-radius`                                                              |
| 与标签间距       | `--component-checkbox-gap`                                                                                                       |
| 标签字号 / 行高   | `--component-checkbox-layout-label-font-size` / `--component-checkbox-layout-label-line-height`                                  |
| 勾选号尺寸 / 描边宽 | `--component-checkbox-layout-mark-width` / `--component-checkbox-layout-mark-height` / `--component-checkbox-layout-mark-border` |
| 半选横条        | `--component-checkbox-layout-indeterminate-bar-width` / `--component-checkbox-layout-indeterminate-bar-height`                   |
| 焦点环         | `--component-checkbox-focus-ring`                                                                                                |


## States


| State    | When to use          | Notes                                                     |
| -------- | -------------------- | --------------------------------------------------------- |
| Default  | Resting state        | Primary for most screens.                                 |
| Hover    | Pointer hover on web | Do not rely on hover only; keep focus visible too.        |
| Disabled | Not interactive      | Use to indicate unavailable options; keep label readable. |


## Component token bindings (required)

All values below must come from component tokens (`.design-spec/tokens/src/component.json`) which in turn must reference semantic tokens only.


| Token (CSS)                                            | JSON path                                       | Notes       |
| ------------------------------------------------------ | ----------------------------------------------- | ----------- |
| `--component-checkbox-box-size`                        | `tokens.checkbox.boxSize`                       | px          |
| `--component-checkbox-box-radius`                      | `tokens.checkbox.boxRadius`                     | px          |
| `--component-checkbox-gap`                             | `tokens.checkbox.gap`                           | px          |
| `--component-checkbox-focus-ring`                      | `tokens.checkbox.focusRing`                     | 焦点          |
| `--component-checkbox-layout-label-font-size`          | `tokens.checkbox.layout.labelFontSize`          | 标签          |
| `--component-checkbox-layout-label-line-height`        | `tokens.checkbox.layout.labelLineHeight`        | 标签          |
| `--component-checkbox-layout-mark-width`               | `tokens.checkbox.layout.markWidth`              | 勾选示意        |
| `--component-checkbox-layout-mark-height`              | `tokens.checkbox.layout.markHeight`             | 勾选示意        |
| `--component-checkbox-layout-mark-border`              | `tokens.checkbox.layout.markBorder`             | 勾选示意        |
| `--component-checkbox-layout-indeterminate-bar-width`  | `tokens.checkbox.layout.indeterminateBarWidth`  | 半选          |
| `--component-checkbox-layout-indeterminate-bar-height` | `tokens.checkbox.layout.indeterminateBarHeight` | 半选          |
| `--component-checkbox-label-text-default`              | `tokens.checkbox.labelTextDefault`              | label color |
| `--component-checkbox-label-text-disabled`             | `tokens.checkbox.labelTextDisabled`             | label color |
| `--component-checkbox-unchecked-bg-default`            | `tokens.checkbox.uncheckedBgDefault`            | fill        |
| `--component-checkbox-unchecked-border-default`        | `tokens.checkbox.uncheckedBorderDefault`        | border      |
| `--component-checkbox-unchecked-bg-hover`              | `tokens.checkbox.uncheckedBgHover`              | fill        |
| `--component-checkbox-unchecked-border-hover`          | `tokens.checkbox.uncheckedBorderHover`          | border      |
| `--component-checkbox-unchecked-bg-disabled`           | `tokens.checkbox.uncheckedBgDisabled`           | fill        |
| `--component-checkbox-unchecked-border-disabled`       | `tokens.checkbox.uncheckedBorderDisabled`       | border      |
| `--component-checkbox-checked-bg-default`              | `tokens.checkbox.checkedBgDefault`              | fill        |
| `--component-checkbox-checked-mark-default`            | `tokens.checkbox.checkedMarkDefault`            | checkmark   |
| `--component-checkbox-checked-bg-disabled`             | `tokens.checkbox.checkedBgDisabled`             | fill        |
| `--component-checkbox-checked-mark-disabled`           | `tokens.checkbox.checkedMarkDisabled`           | checkmark   |
| `--component-checkbox-indeterminate-bg-default`        | `tokens.checkbox.indeterminateBgDefault`        | fill        |
| `--component-checkbox-indeterminate-border-default`    | `tokens.checkbox.indeterminateBorderDefault`    | border      |
| `--component-checkbox-indeterminate-dash-default`      | `tokens.checkbox.indeterminateDashDefault`      | dash        |
| `--component-checkbox-indeterminate-bg-disabled`       | `tokens.checkbox.indeterminateBgDisabled`       | fill        |
| `--component-checkbox-indeterminate-border-disabled`   | `tokens.checkbox.indeterminateBorderDisabled`   | border      |
| `--component-checkbox-indeterminate-dash-disabled`     | `tokens.checkbox.indeterminateDashDisabled`     | dash        |


## Layout patterns

- **Table selection**: row selection checkbox + header checkbox for bulk.
- **Filter panel**: checkbox groups with search when large.
- **Form field**: inline checkbox with helper text.

## Anti-patterns

- Using checkbox for mutually exclusive choices (use `Radio`).
- Tiny hit targets (must meet minimum target size).

## Accessibility essentials

- **Keyboard**: Tab to focus；**Space** 切换（与原生 `checkbox` 一致）。
- **Name**: 文案与控件通过 `**label` + `for`/`id`** 或 `aria-labelledby` 关联。
- **Indeterminate**: 使用 `**input.indeterminate`**（或 Arco 等价 API），勿仅做视觉横杠而无语义。

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `checkbox/group/square/md/default`
  - `checkbox/group/square/md/indeterminate`

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

