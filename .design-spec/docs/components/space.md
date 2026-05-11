# Component: Space

## Level

Molecular (spacing/composition helper)

## Aliases

- gap
- stack
- inline spacing

## References

- Arco Vue（API / 行为真源）: [Space](https://arco.design/vue/component/space)
- Arco 源码: `arco-design-vue/packages/web-vue/components/space/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 间距与组件留白以稿为准。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Best practices

- **Use for**: consistent spacing between elements in a row/column.
- **Token-only**: spacing values must map to the spacing token scale.
- **Density**: choose spacing based on information density; avoid arbitrary “fine tuning”.

## Layout patterns

- **Form rows**: label + control spacing and vertical rhythm.
- **Button groups**: consistent gap; avoid borders as separators when spacing is sufficient.
- **Toolbar**: group related actions; separate groups with larger token gap.

## Anti-patterns

- Hardcoding margins on children instead of using a spacing component/system.
- Using tiny non-token gaps to “make it look right”.

## Accessibility essentials

- **Touch targets**: ensure spacing does not reduce tap/target areas.
- **Grouping**: spacing can reinforce grouping; ensure groups are perceivable (labels, headings).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `space/inline/none/md/default`
  - `space/stack/comfortable/md/default`

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-`* / `--component-`*），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。