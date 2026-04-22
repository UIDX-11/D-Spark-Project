# Primitive Tokens (Core)

Primitive tokens are the **raw, platform-agnostic** values that everything else builds on.

## Where they live

- **Design-spec source of truth (normalized)**: `.design-spec/tokens/src/core.json`
- **Imported source (Figma export)**: `~/Downloads/Mode 1.tokens.json`

## What belongs here


| Category        | Examples                            | Notes                                              |
| --------------- | ----------------------------------- | -------------------------------------------------- |
| Color ramps     | `color.neutral.*`, `color.orange.*` | Use ramps/steps, not component names.              |
| Spacing scale   | `space.*`                           | Numeric scale; map to px as needed per platform.   |
| Radius          | `radius.*`                          | Keep small set; avoid “unique one-offs”.           |
| Typography base | `font.*`                            | Pair with line-height tokens in future iterations. |


## Current primitive color source (Mode 1 export)

The file `Mode 1.tokens.json` is organized like:

`<palette name> → Light/Dark → <step> → { $type, $value, $extensions }`

Where:

- `**$type`** is `color`
- `**$value.hex**` is the canonical value for most consumption
- `**$extensions.com.figma.variableId**` links back to the Figma Variable

### Palette list as CSS variables (example)

Below is a **CSS Variables** representation of the Neutral ramp (Light mode) taken from `Mode 1.tokens.json`.

```css
:root {
  /* 中性色Neutral / Light */
  --color-neutral-00:  #FFFFFF;
  --color-neutral-10:  #FAFAFA;
  --color-neutral-20:  #F7F7F7;
  --color-neutral-30:  #F0F0F0;
  --color-neutral-40:  #E7E7E7;
  --color-neutral-50:  #E6E6E6;
  --color-neutral-60:  #E8E8E8;
  --color-neutral-70:  #E0E0E0;
  --color-neutral-80:  #CCCCCC;
  --color-neutral-90:  #C2C2C2;
  --color-neutral-100: #BFBFBF;
  --color-neutral-110: #A7A7A7;
  --color-neutral-120: #999999;
  --color-neutral-130: #858585;
  --color-neutral-140: #666666;
  --color-neutral-150: #555555;
  --color-neutral-160: #4E4E4E;
  --color-neutral-170: #222222;
  --color-neutral-180: #1B1B1B;
}
```

Other palettes in `Mode 1.tokens.json` can be expressed in the same format:

- **橘色 orange**: `--color-orange-10 … --color-orange-50`
- **绿色 Green / 黄色 Yellow / 红色 Red / 蓝色 Blue / 深蓝色 Deep Blue**
- **遮罩 Mask**: include alpha (e.g. `--color-mask-*: rgba(...)`), and keep a single stable key per mode.


### Step naming guidance (normalization)

The export mixes step keys like `10`, `10-#E6F7EF`, and `10 #FFE6BA`.

For the normalized primitive layer we should standardize to:

- **numeric steps only** (e.g. `10`, `20`, `30`, …) for ramps
- keep hex only as the value, not in the key

Example (export → normalized idea):


| Export path                    | Value                 | Suggested normalized key  |
| ------------------------------ | --------------------- | ------------------------- |
| `中性色Neutral.Light.20`          | `#F7F7F7`             | `color.neutral.light.20`  |
| `橘色 orange.Light."40 #FF8100"` | `#FF8100`             | `color.orange.light.40`   |
| `遮罩Mask.Dark.Specialcolor`     | `#2C2C2C` @ 0.8 alpha | `color.mask.dark.default` |


## Rules

- No usage naming (avoid `buttonPrimaryBg` in primitives).
- Add tokens only if they are reusable (no “just for one screen”).
- Prefer adding semantic tokens rather than expanding primitives aggressively.

