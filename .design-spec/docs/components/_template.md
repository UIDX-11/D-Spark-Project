# Component: <Name>

## Level

Molecular

## Aliases

- <synonym 1>
- <synonym 2>

## Best practices

- **Intent**: what this component is for.
- **States**: required states (default/hover/active/focus/disabled/loading/error/empty).
- **Content**: text rules, truncation, tooltips.

## Layout patterns

- **Common placements**: where it typically lives.
- **Composition**: which components it composes with.

## Anti-patterns

- **What to avoid** and why.

## Accessibility essentials

- **Keyboard**: required key interactions.
- **Focus**: visible focus and logical order.
- **Name**: accessible name rules.
- **Contrast**: token-driven contrast targets.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `<type>/<kind>/<shape>/<size>/<state>`

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

