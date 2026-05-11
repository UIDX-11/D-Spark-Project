# Component: Input-Adornment

## Level

Molecular

## Aliases

- prepend / append
- input prefix suffix
- affix row

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/input](https://arco.design/react/components/input)（`addBefore` / `addAfter` 等）
- Arco 源码（React）: [`arco-design/components/Input`](https://github.com/arco-design/arco-design/tree/main/components/Input)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Input** 与前后缀组合，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 前后缀区域高度、与输入框的接缝、圆角衔接以 **Input** 稿为准；本模式 **不单独建 `input-adornment` token 前缀**，与单框 Input 共用 **`--component-input-*`**。

## Arco API 对齐（摘要）

| Arco 能力 | 说明 | 本 demo |
| --- | --- | --- |
| `#prepend` / 前缀区 | 左侧 addon | **Prefix addon**：`span.ds-in-addon` + `input` |
| `#append` / 后缀区 | 右侧操作或文案 | **Suffix append**：`ds-in-affix` + `button.ds-in-sfx` |
| 双端缀 | 左 addon + 输入 + 右 addon | **Prefix + suffix**：`ds-in-addon` + `input.ds-in-joined` + `span.ds-in-addon-tail` |

## Arco DOM（与 demo 对齐）

- 与单框 Input 一致：外层 **`div.ds-in-row[data-size=s|l|xl]`**；前缀 **`span.ds-in-addon`**；组合后缀 **`div.ds-in-affix` > `input` + `button.ds-in-sfx`**。
- 类名 **`ds-in-*`** 不要求与 Arco 内部类名一致。

## 推断

- **焦点环**：组合控件焦点策略与 Arco 一致时，以 **`focus-within`** 与 **`--component-input-ring-focus`** 表达；矩阵行仍为静态 `mat-inp-*` 示意。

## Best practices

- **Use for**: stable units (`https://`, `$`, `%`) or compact actions (Send, Search) that do not compete with the main label.
- **Do not** use adornments as the only accessible name for the field; keep a visible label or `aria-label` on the input.

## Anatomy

```
[ addon? ] [ input field                    ] [ addon / button? ]
```

## Accessibility essentials

- **Name**: primary name on **`input`**; adornment icons/buttons need their own **`aria-label`**.
- **Keyboard**: suffix buttons must be focusable and activatable with **Enter** / **Space** (demo 仅展示结构，可逐步加厚交互测试)。

## Layout patterns

- **Filter / form rows**: prefix/suffix aligned to Input **S/L/XL** heights; use `Space` or grid for multi-field rows.
- **Toolbars**: compact suffix actions (search, send) share one baseline with the field.

## Anti-patterns

- Using adornments as the **only** accessible name (always expose label or `aria-label` on the input).
- Different vertical alignment between addon and field without token-driven correction.

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

