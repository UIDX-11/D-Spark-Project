# Design System (Human-visible entry)

This folder is the **human-visible entrypoint** on GitHub.

## Where the source of truth lives

All authoritative, AI-retrievable specifications live in:

- `.design-spec/` (hidden folder)
  - `manifest.json` — machine entrypoint
  - `docs/` — references (components, layouts, a11y, i18n…)
  - `tokens/src/` — token source of truth (primitive → semantic → component)
  - `tokens/dist/tokens.css` — generated CSS variables (for web consumption)

## Quick links

- **AI / tooling entry**: `.design-spec/manifest.json`
- **Global rules**: `.design-spec/docs/design.md`
- **Component library**: `.design-spec/docs/components/README.md`
- **Intent index**: `.design-spec/docs/components/intent-index.md`
- **Generator contract**: `.design-spec/generator/schema-ui-contract.md`
- **Tokens (CSS dist)**: `.design-spec/tokens/dist/tokens.css`

## Recommended workflow

- Read rules from `.design-spec/` (do not fork copies here)
- Only add docs in `design-system/` when they are **entry / routing** docs intended for humans
