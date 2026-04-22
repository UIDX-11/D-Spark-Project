# Primitive Tokens (Core)

Primitive tokens are the **raw, platform-agnostic** values that everything else builds on.

## Where they live

- **Design-spec source of truth (normalized)**: `.design-spec/tokens/src/core.json`
- **Imported source (Figma export)**: `~/Downloads/Mode 1.tokens.json`

## What belongs here

| Category | Examples | Notes |
|---|---|---|
| Color ramps | `color.neutral.*`, `color.orange.*` | Use ramps/steps, not component names. |
| Spacing scale | `space.*` | Numeric scale; map to px as needed per platform. |
| Radius | `radius.*` | Keep small set; avoid “unique one-offs”. |
| Typography base | `font.*` | Pair with line-height tokens in future iterations. |

## Current primitive color source (Mode 1 export)

The file `Mode 1.tokens.json` is organized like:

`<palette name> → Light/Dark → <step> → { $type, $value, $extensions }`

Where:

- **`$type`** is `color`
- **`$value.hex`** is the canonical value for most consumption
- **`$extensions.com.figma.variableId`** links back to the Figma Variable

### Palettes included (examples)

| Palette (as exported) | Contains | Notes |
|---|---|---|
| 中性色Neutral | Light + Dark ramps, including `00` (white) | Use as the main neutral ramp. |
| 橘色 orange / 绿色Green / 黄色Yellow / 红色Red / 蓝色Blue / 深蓝色 Deep Blue | Light + Dark ramps | Keep step naming consistent during normalization. |
| 遮罩Mask | Light + Dark special color with alpha | Normalize into something like `color.mask.*` primitives. |

### Step naming guidance (normalization)

The export mixes step keys like `10`, `10-#E6F7EF`, and `10 #FFE6BA`.

For the normalized primitive layer we should standardize to:

- **numeric steps only** (e.g. `10`, `20`, `30`, …) for ramps
- keep hex only as the value, not in the key

Example (export → normalized idea):

| Export path | Value | Suggested normalized key |
|---|---|---|
| `中性色Neutral.Light.20` | `#F7F7F7` | `color.neutral.light.20` |
| `橘色 orange.Light."40 #FF8100"` | `#FF8100` | `color.orange.light.40` |
| `遮罩Mask.Dark.Specialcolor` | `#2C2C2C` @ 0.8 alpha | `color.mask.dark.default` |

## Rules

- No usage naming (avoid `buttonPrimaryBg` in primitives).
- Add tokens only if they are reusable (no “just for one screen”).
- Prefer adding semantic tokens rather than expanding primitives aggressively.