# Primitive Tokens (Core)

Primitive tokens are the **raw, platform-agnostic** values that everything else builds on.

## Where they live

- `.design-spec/tokens/src/core.json`

## What belongs here

| Category | Examples | Notes |
|---|---|---|
| Color ramps | `color.neutral.0…900` | Use ramps/steps, not component names. |
| Spacing scale | `space.0, space.2, space.3, space.4` | Numeric scale; map to px as needed per platform. |
| Radius | `radius.sm, radius.md` | Keep small set; avoid “unique one-offs”. |
| Typography base | `font.size.sm/md/lg` | Pair with line-height tokens in future iterations. |

## Rules

- No usage naming (avoid `buttonPrimaryBg` in primitives).
- Add tokens only if they are reusable (no “just for one screen”).
- Prefer adding semantic tokens rather than expanding primitives aggressively.

