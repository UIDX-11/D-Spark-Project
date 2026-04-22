# Semantic Tokens

Semantic tokens represent **UI meaning**, not raw values.

## Where they live

- `.design-spec/tokens/src/semantic.json`

## Why semantic tokens

- Enable consistent usage across components and pages.
- Make themes (light/dark, brand variants) possible without rewriting components.

## Typical semantic groups

| Group | Examples | Used by |
|---|---|---|
| Background | `bg.page`, `bg.surface` | Layout, cards, inputs |
| Text | `text.primary` | All components |
| Border | `border.default` | Inputs, dividers, tables |

## Rules

- Semantic tokens may reference primitives.
- Components should prefer semantic tokens over primitives.
- Avoid leaking component semantics into this layer (keep it global).

