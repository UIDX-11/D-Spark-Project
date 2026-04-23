# Component Tokens

Component tokens define **component-scoped roles** that map design intent to concrete visuals.

## Where they live

- **Design-spec source of truth (normalized)**: `.design-spec/tokens/src/component.json`
- **Upstream dependency**: semantic tokens at `.design-spec/tokens/src/semantic.json`

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

## Naming ↔ JSON path mapping (required)

Component tokens have **one canonical JSON path** and **one canonical CSS variable name**.

### JSON path convention

- **Root**: `.design-spec/tokens/src/component.json` → `tokens`
- **Path format**: `tokens.<component>.<variantGroup>.<property>`
- Example:
  - `tokens.button.primary.bgDefault`

### CSS variable convention

- **Prefix**: `--component-`
- **Convert path segments**:
  - Remove the leading `tokens.`
  - Convert camelCase to kebab-case (`bgDefault` → `bg-default`)
  - Join with `-`
- Example:
  - `tokens.button.primary.bgDefault` → `--component-button-primary-bg-default`

This mapping is what allows:
- Component specs (`button.md`, `input.md`) to reference stable, readable `var(--component-...)`
- The token source of truth to remain structured in JSON

## Minimal build step (generate `.design-spec/tokens/dist/tokens.css`)

To make `var(--component-...)` real in code, generate a CSS file from:

- **Primitive**: `.design-spec/tokens/src/core.json`
- **Semantic**: `.design-spec/tokens/src/semantic.json` (may reference core)
- **Component**: `.design-spec/tokens/src/component.json` (must reference semantic only)

Run:

```bash
python3 ".design-spec/tokens/generate_tokens_css.py"
```

Output:

- `.design-spec/tokens/dist/tokens.css`

## Rules

- Component tokens should reference semantic tokens first.
- Keep naming stable and reflect the **variant/state axes**:
  - `type/kind/shape/size/state` (see `.design-spec/manifest.json`)
- Avoid ad-hoc tokens per screen; if it’s not reusable, it doesn’t belong here.