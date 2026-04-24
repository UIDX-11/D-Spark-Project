# Component Tokens

Component tokens define **component-scoped roles** that map design intent to concrete visuals.

## What problem this layer solves

Semantic tokens like `--color-primary` describe **global meaning**, but they do not uniquely describe a component decision such as:

- “Button / Primary / background / hover”
- “Input / border / focus”

Component tokens provide a **stable interface per component**, so component specs can be precise and AI-generated UI stays consistent.

## Where they live

- **Design-spec source of truth (normalized)**: `.design-spec/tokens/src/component.json`
- **Upstream dependency**: semantic tokens at `.design-spec/tokens/src/semantic.json`

## How this differs from docs and outputs

Use the right artifact for the right job:

| Artifact | What it is | Who consumes it | Why it exists |
|---|---|---|---|
| `.design-spec/tokens/src/component.json` | **Structured source of truth** (component → semantic bindings) | generator + code | machine-readable, easy to validate and diff |
| `component-tokens.md` | **Rules + indexing + mapping conventions** | humans + AI | prevents drift, keeps naming consistent |
| `.design-spec/tokens/dist/tokens.css` | **Generated CSS variables** | runtime CSS | actual `--component-*` values usable in code |

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

## Minimal token families (recommended shape)

Keep token sets **minimal, complete, and state-driven**. Recommended “families” per component:

### Button (example)

- **Primary**
  - `tokens.button.primary.bgDefault/bgHover/bgActive/bgDisabled`
  - `tokens.button.primary.textDefault/textHover/textActive/textDisabled`
- **Neutral surface (Secondary/Tertiary)**
  - `tokens.button.neutral.bgDefault/bgHover/bgActive/bgDisabled`
  - `tokens.button.neutral.textDefault/textHover/textActive/textDisabled`
  - `tokens.button.neutral.borderDefault/borderHover/borderActive/borderDisabled`
- **Link / Outline / Danger** (only if needed)
  - `tokens.button.link.textDefault`
  - `tokens.button.outline.borderDefault`
  - `tokens.button.danger.bgDefault`, `tokens.button.danger.textDefault`

### Input (example)

- Background: `tokens.input.bgDefault/bgHover/bgFocus/bgTyping/bgCompleted/bgError/bgDisabled`
- Text: `tokens.input.textDefault/textFocus/textDisabled`
- Border: `tokens.input.borderDefault/borderHover/borderFocus/borderError/borderDisabled`
- Ring: `tokens.input.ringFocus/ringError`

These JSON paths are expected to map 1:1 to CSS variables via the naming rule above.

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

## Workflow (how to add or change component tokens)

- **Step 1 — Update the component spec**
  - Add/update the binding table in `.design-spec/docs/components/<component>.md`
  - Use `var(--component-...)` only (no semantic/primitive variables in component specs)
- **Step 2 — Update `component.json`**
  - Add the corresponding `tokens.<component>...` paths
  - Values must reference **semantic** tokens only (e.g. `{action.primary.bg}`, not raw hex)
- **Step 3 — Regenerate dist**
  - Run `python3 ".design-spec/tokens/generate_tokens_css.py"`
  - Ensure `.design-spec/tokens/dist/tokens.css` includes the expected `--component-*` variables

## Rules

- Component tokens should reference semantic tokens first.
- Keep naming stable and reflect the **variant/state axes**:
  - `type/kind/shape/size/state` (see `.design-spec/manifest.json`)
- Avoid ad-hoc tokens per screen; if it’s not reusable, it doesn’t belong here.

## Anti-patterns

- Referencing semantic tokens directly inside component specs (e.g. `var(--color-primary)` in `button.md`).
- Putting large, duplicated CSS catalogs in Markdown when a generated `tokens.css` exists.
- Creating one-off screen tokens in the component layer (those belong in page styles, not the design system).