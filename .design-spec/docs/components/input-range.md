# Component: Input-Range

## Level

Molecular

## Aliases

- range input
- min–max input
- dual-field range

## Best practices

- **Use for**: numeric or text **minimum and maximum** on one row (filters, settings), not date pickers (use **DatePicker** / **RangePicker** for dates).
- **Labeling**: label the pair (“From / To” or “Min / Max”); the middle separator is decorative—do not rely on it alone for meaning.
- **States**: each field follows the same states as **Input** (default, hover, focus, error, disabled); validate min ≤ max when both are set.

## Anatomy

### Plain（双字段）

```
[ Min field ] — [ Max field ]
```

| Part | Description |
|------|--------------|
| Container | `display: flex` row; optional max width; gap between fields and divider. |
| Min / Max | Two **Input**-styled fields; same size tokens as Input. |
| Divider | Visual em dash (—) between fields; `aria-hidden` where appropriate. |

### With suffix unit（带单位）

[Figma · RangeInput 范围输入框（带单位）](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=297108-6113)

| Part | Description |
|------|--------------|
| Unified chrome | Single rounded container: shared **background** and **border** (default / hover / `:focus-within` / error). |
| Min / Max | Two fields inside the chrome; placeholders e.g. “Please enter”; **no** per-field outer ring—focus reads on the whole control. |
| Middle separator | Short **horizontal** rule (8px) between the two values. |
| Divider + unit | **Vertical** rule then **suffix unit** (e.g. `%`); unit area **`padding-right: 12px`** from the container edge (Figma). |
| Error | Optional line **below** the unified field, **4px** under the control (same row as matrix preview), **error** color (`This is error message` in spec). |

## Tokens

**Input-Range** reuses **Input** surface tokens (`--component-input-*`) so range rows stay visually identical to single-line Input. If range-specific tokens are introduced later, they would use `--component-input-range-*` and this doc should be updated.

## Arco / implementation

In **Arco Design Vue**, range rows are often composed from two `a-input` (or similar) plus layout; there is no separate root export named “InputRange” in the same way as `InputPassword`. Treat **Input-Range** as a **documented pattern + demo** bound to the Input token family.

## HTML preview

Static demo: [`input-range.html`](../../demos/components/input-range.html) — **size**, **layout** (`Plain` vs **With suffix unit**), optional **suffix unit** text, plus a **status matrix** (plain rows + with-unit + with-unit error).
