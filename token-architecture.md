# Token Architecture

This document describes how design tokens are structured and consumed in D-Spark.

## Source of truth

- Token sources live in `.design-spec/tokens/src/`
  - `core.json` (primitive tokens)
  - `semantic.json` (semantic tokens)
  - `component.json` (component tokens)

## Layers


| Layer            | What it is                             | Examples                                    | Rules                                                                    |
| ---------------- | -------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| Primitive (core) | Raw values, never reference UI meaning | `color.neutral.0`, `space.4`, `radius.md`   | Stable, cross-platform. Avoid naming by usage (no “buttonBg”).           |
| Semantic         | Meaningful roles used across the UI    | `bg.page`, `text.primary`, `border.default` | Prefer semantic tokens in UI. Semantic may reference primitive.          |
| Component        | Component-scoped roles                 | `button.primary.bg`, `input.border.focus`   | Component tokens reference semantic (preferred) or primitive (fallback). |


## Referencing rules

- UI code and schema-driven UI should **never** use raw values.
- Prefer: **Component token → Semantic token → Primitive token**.
- A token may reference other tokens using `{path.to.token}`.

## Platform outputs

Token outputs (CSS/TS/Dart) are produced under `.design-spec/tokens/dist/` (to be extended).