# Component: Data Display (Number)

## Level

Molecular

## Aliases

- KPI
- metric
- statistic
- number badge (when compact)

## References

- Arco Design Web React（API / 行为真源）: [Statistic](https://arco.design/react/components/statistic)（数值展示优先对齐 Statistic；复杂 KPI 组合按治理文档约束）
- Arco 源码（React）: [`arco-design/components/Statistic`](https://github.com/arco-design/arco-design/tree/main/components/Statistic)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 定位 Data display / number 相关画板并补充带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Best practices

- **Use for**: displaying key numeric values (counts, amounts, percentages).
- **Formatting**:
  - Respect i18n for thousands separators, decimals, currency, units.
  - Never concatenate unit strings blindly; use locale-aware formatting where possible.
- **Comparison**: when showing change, include direction + magnitude (e.g., +3.2%).
- **States**: loading placeholder; unknown value (“—”); error tooltip if unavailable.

## Layout patterns

- **KPI grid**: cards with consistent baseline alignment.
- **Inline metric**: label + value, value aligned right in dense tables/cards.

## Anti-patterns

- Too many decimals (reduce readability).
- Using color only to encode meaning (also include text/icon).

## Accessibility essentials

- **Text**: ensure sufficient contrast; do not rely on color alone.
- **Readable**: avoid overly small font sizes in dense KPI rows.
- **ARIA**: if value updates live, announce changes appropriately (avoid noisy updates).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `data-display/number/none/md/default`
  - `data-display/number/none/md/loading`

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

