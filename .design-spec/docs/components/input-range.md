# Component: Input-Range

## Level

Molecular

## Aliases

- range input
- min–max input
- dual-field range

## References

- Arco Vue（组合真源）: [https://arco.design/vue/component/input](https://arco.design/vue/component/input)（双字段由两个 `Input` 或 `InputNumber` 与布局组成）
- Arco 源码: `arco-design-vue/packages/web-vue/components/input/`
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **Plain**：两框间距与 em dash 样式以稿面为准；本 demo 间距使用 `**--semantic-layout-button-group-gap`**。
- **With suffix unit**：统一外壳、中段 8px 横线、竖线 + 右侧 `**%`** 与 Figma [RangeInput 带单位](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=297108-6113) 对齐意图；token 仍用 `**--component-input-***`。

## Arco API 对齐（摘要）


| 模式         | 说明                  | 本 demo                                      |
| ---------- | ------------------- | ------------------------------------------- |
| 双 `Input`  | `min` / `max` 文案与校验 | **Plain**：两 `input.ds-input` + `aria-label` |
| 统一视觉行 + 单位 | 单容器内双值              | **With suffix unit**：`.ds-ir-unit` + `%` 后缀 |


## Arco DOM（与 demo 对齐）

- 无强制单一 DOM；demo 使用 `**div.ds-ir-plain`** 或 `**div.ds-ir-unit**`，输入为 `**input.ds-input**`（或 `**ds-ir-unit-inp**` 去框化置于统一底上）。

## 推断

- **错误文案**：使用 `**--component-form-error-text`** 与 Input 错误环 `**--component-input-ring-error**`，与 Form 错误语义一致。

## Best practices

- **Use for**: numeric or text **minimum and maximum** on one row (filters, settings), not date pickers (use **DatePicker** / **RangePicker** for dates).
- **Labeling**: label the pair (“From / To” or “Min / Max”); the middle separator is decorative—do not rely on it alone for meaning.
- **States**: each field follows the same states as **Input** (default, hover, focus, error, disabled); validate min ≤ max when both are set.

## Anatomy

### Plain（双字段）

```
[ Min field ] — [ Max field ]
```


| Part      | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| Container | `display: flex` row; optional max width; gap between fields and divider. |
| Min / Max | Two **Input**-styled fields; same size tokens as Input.                  |
| Divider   | Visual em dash (—) between fields; `aria-hidden` where appropriate.      |


### With suffix unit（带单位）

[Figma · RangeInput 范围输入框（带单位）](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=297108-6113)


| Part             | Description                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unified chrome   | Single rounded container: shared **background** and **border** (default / hover / `:focus-within` / error).                                           |
| Min / Max        | Two fields inside the chrome; placeholders e.g. “Please enter”; **no** per-field outer ring—focus reads on the whole control.                         |
| Middle separator | Short **horizontal** rule (8px) between the two values.                                                                                               |
| Divider + unit   | **Vertical** rule then **suffix unit** (e.g. `%`); unit area `**padding-right: 12px`** from the container edge (Figma).                               |
| Error            | Optional line **below** the unified field, **4px** under the control (same row as matrix preview), **error** color (`This is error message` in spec). |


## Tokens

**Input-Range** reuses **Input** surface tokens (`--component-input-`*) so range rows stay visually identical to single-line Input. If range-specific tokens are introduced later, they would use `--component-input-range-*` and this doc should be updated.

## Arco / implementation

In **Arco Design Vue**, range rows are often composed from two `a-input` (or similar) plus layout; there is no separate root export named “InputRange” in the same way as `InputPassword`. Treat **Input-Range** as a **documented pattern + demo** bound to the Input token family.

## HTML preview

Static demo: `[input-range.html](../../demos/components/input-range.html)` — **size**, **layout** (`Plain` vs **With suffix unit**), optional **suffix unit** text, plus a **status matrix** (plain rows + with-unit + with-unit error).