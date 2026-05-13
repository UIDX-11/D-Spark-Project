# Component: Layout

## Level

Molecular (composition container)

## Aliases

- page frame
- shell
- container / region

## References

- Arco Design Web React（API / 行为真源）: [Layout](https://arco.design/react/components/layout)
- Arco 源码（React）: [`arco-design/components/Layout`](https://github.com/arco-design/arco-design/tree/main/components/Layout)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 定位 Layout / 页面框架画板并补充 `node-id=` 深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Best practices

- **Use for**: structuring a page into predictable regions (header/sidebar/content/footer).
- **Consistency**:
  - Keep global navigation regions stable across pages.
  - Use consistent padding and max-width rules from tokens.
- **Responsiveness**:
  - Define breakpoints and collapse behavior for side navigation.
  - Avoid horizontal scrolling on common breakpoints.

## Layout patterns

- **B-end list page**: filter bar (top) + results (table/list) + pagination (bottom).
- **Master/detail**: left `Tree` + right detail content in `Card`.
- **Tabbed sub-pages**: `Tabs` near top of content region.

## Anti-patterns

- Nesting multiple scroll containers without clear ownership (confusing scroll).
- Mixing unrelated padding rules (hardcoded) instead of token spacing scale.

## Accessibility essentials

- **Landmarks**: use semantic regions where possible (header/nav/main/aside/footer).
- **Focus order**: aligns with visual order; avoid focus traps in sidebars.
- **Skip links**: for dense admin pages, support skip-to-content.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `layout/admin/split/md/default`
  - `layout/admin/collapsible/md/collapsed`

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-`* / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。