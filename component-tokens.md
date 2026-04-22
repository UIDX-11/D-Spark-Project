# Component Tokens

Component tokens define **component-scoped roles** that map design intent to concrete visuals.

## Where they live

- `.design-spec/tokens/src/component.json`

## What belongs here

| Component | Examples | Notes |
|---|---|---|
| Button | `button.primary.bg`, `button.primary.text`, `button.primary.radius` | Should align with `button.md` variant axes. |
| Input | `input.bg`, `input.border.default`, `input.border.focus`, `input.text.placeholder` | Should align with `input.md` states + anatomy. |

## Rules

- Component tokens should reference semantic tokens first.
- Keep naming stable and reflect the **variant/state axes**:
  - `type/kind/shape/size/state` (see `.design-spec/manifest.json`)
- Avoid ad-hoc tokens per screen; if it’s not reusable, it doesn’t belong here.

