# Overlay: B2B SaaS (Admin / Console)

This overlay is loaded for typical **B-end SaaS** product work.

## Non-negotiable rules (hard)

- **Information density**: default to `md`/`lg` sizes; avoid `sm` unless tables are extremely dense.
- **Predictable layout**: list/detail/form pages must follow the skeleton routes in `.design-spec/docs/layouts/`.
- **Tokens only**: no hardcoded colors/spacing/radius; component usage must match specs.
- **Explainability**: every destructive action must have confirmation and clear copy.

## Common page patterns

- **CRUD list**: filters → results → pagination → batch actions
- **Detail**: summary → sections/tabs → related data
- **Form**: grouped fields → validation → submit/cancel
- **Master/detail**: tree/list → detail panel

## Content rules

- Use concise, action-oriented labels.
- All empty states must include:
  - what this area is
  - why it's empty (when known)
  - the next best action

