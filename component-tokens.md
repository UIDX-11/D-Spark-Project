# Component Tokens

Component tokens define **component-scoped roles** that map design intent to concrete visuals.

## Where they live

- **Design-spec source of truth (normalized)**: `.design-spec/tokens/src/component.json`
- **Imported sources (Figma exports)**:
  - `~/Downloads/3.组件颜色 Component color /光储Global light.tokens.json` (component color)
  - (optional) component-specific exports as needed

## What belongs here

| Component | Examples | Notes |
|---|---|---|
| Button | `button.primary.bg`, `button.primary.text`, `button.primary.radius` | Should align with `button.md` variant axes. |
| Input | `input.bg`, `input.border.default`, `input.border.focus`, `input.text.placeholder` | Should align with `input.md` states + anatomy. |

## Relationship to component specs

- The **authoritative, human-readable** place to describe component token needs is the component spec:
  - Button: `.design-spec/docs/components/button.md`
  - Input: `.design-spec/docs/components/input.md`
- This file is intentionally **not** a duplicate token catalog. Keep long token lists in:
  - `.design-spec/tokens/src/component.json` (normalized source of truth)
  - or generated outputs under `.design-spec/tokens/dist/` (future)

## Rules

- Component tokens should reference semantic tokens first.
- Keep naming stable and reflect the **variant/state axes**:
  - `type/kind/shape/size/state` (see `.design-spec/manifest.json`)
- Avoid ad-hoc tokens per screen; if it’s not reusable, it doesn’t belong here.