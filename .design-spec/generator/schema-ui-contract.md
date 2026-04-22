# Schema UI Contract (Controlled Components + Tokens)

This contract defines how schema-driven UI must be generated so outputs remain consistent and design-system compliant.

## Core policy

- **Only controlled components** may appear in schema.
- **No arbitrary style objects** (no raw hex colors, no raw pixel values).
- **All visuals must reference tokens** (semantic first, component tokens second).

## Component naming rule

Every variant/state must follow:

`type/kind/shape/size/state`

This is used for:
- component variants
- state-driven styles
- className/slot naming

## Allowed schema fields (recommended baseline)

> Adjust to your actual runtime schema once we inspect it.

- `type` (required): controlled component name (e.g. `Button`, `Form`, `Table`)
- `variant` (optional): follows naming rule (`type/kind/shape/size/state`)
- `props` (optional): component props only (no style props that bypass tokens)
- `children` (optional): nested schema nodes
- `a11y` (optional): accessible name/description, role hints if needed
- `i18nKey` (optional): translation key; avoid hardcoding long user-facing strings

## Disallowed patterns

- Any field named `style`, `css`, `sx`, `className` that injects raw values.
- Raw values like `"#fff"`, `"12px"`, `"rgba(...)"` in schema payloads.
- Unbounded component lists (“render arbitrary HTML”).

## Examples

See `schema-examples/` for positive and negative examples.

