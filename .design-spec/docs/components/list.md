# Component: List

## Level

Molecular

## Aliases

- results list
- feed
- collection

## References

- Arco Vue（API / 行为真源）: [List](https://arco.design/vue/component/list)
- Arco 源码: `arco-design-vue/packages/web-vue/components/list/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 定位 List 画板并补充 `node-id=` 深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Best practices

- **Use for**: rendering a collection when table semantics are not required.
- **Density**: offer compact/comfortable densities via tokens.
- **States**: loading (skeleton), empty, error, partial results.
- **Actions**: prefer row-level actions aligned to row end; avoid clutter.

## Layout patterns

- **Search results**: filter bar + list items + pagination/infinite scroll.
- **Master list**: list on the left, detail panel on the right.

## Anti-patterns

- Using list when structured comparison is needed (use `Table`).
- Hiding critical information behind hover-only affordances.

## Accessibility essentials

- **Semantics**: use proper list semantics (ul/ol) or ARIA patterns if custom.
- **Keyboard**: row focus/selection must be reachable and visible.
- **Announce updates**: for dynamic updates, ensure screen readers get meaningful updates.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `list/results/none/md/default`
  - `list/results/none/md/empty`

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

