# Component: Slider

## Level

Molecular

## Aliases

- range slider
- slider input
- scrubber

## Best practices

- **Use for**: selecting a value within a continuous range where visual scanning helps.
- **Use marks** for key thresholds (0/25/50/75/100) when they matter.
- **Provide numeric input** when precision is needed (design shows optional input).
- **Tooltips** should appear on drag or focus (avoid always-on for noisy UIs).

## Layout patterns

- **Settings**: value slider with optional input on the right.
- **Filters**: range slider (two thumbs) with min/max inputs.

## Anti-patterns

- Using slider for large discrete sets (use Select).
- No keyboard interaction (must be operable without mouse).
- Range slider without clear min/max meaning (must label).

## Accessibility essentials

- **Keyboard**: Arrow keys step; PageUp/PageDown larger step; Home/End to min/max.
- **Focus**: visible focus ring on thumb.
- **Name**: each thumb has accessible name (e.g., “Minimum value”, “Maximum value”).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `slider/single/rounded/md/default`
  - `slider/single/rounded/md/with-marks`
  - `slider/range/rounded/md/default`

## Anatomy

```
┌────────────────────────────── slider ──────────────────────────────┐
│ Track (inactive)                                                   │
│ Track (active)                                                     │
│ Thumb (1) or Thumbs (2)                                            │
│ (optional) Ticks / marks + labels                                  │
│ (optional) Right input (value) / Min-Max inputs                     │
└────────────────────────────────────────────────────────────────────┘
```

## Variants

| **Kind** | **Thumbs** | **Marks** | **Input** | **Notes** |
| --- | ---:| --- | --- | --- |
| `single` | 1 | optional | optional | default slider |
| `range` | 2 | optional | optional | min–max selection |

## Sizes

> Figma node uses a compact track with a circular thumb (tokenized below). If future sizes are introduced, add a size table.

| **Size** | **Thumb** | **Track radius** |
| --- | --- | --- |
| `MD` | token-driven | token-driven |

## States

### Track

| **Part** | **Token** |
| --- | --- |
| Inactive track | `var(--component-slider-track-bg)` |
| Active track | `var(--component-slider-track-bg-active)` |

### Thumb

| **State** | **BG** | **Border** | **Ring** |
| --- | --- | --- | --- |
| Default | `var(--component-slider-thumb-bg-default)` | `var(--component-slider-thumb-border-default)` | none |
| Hover | `var(--component-slider-thumb-bg-hover)` | `var(--component-slider-thumb-border-hover)` | none |
| Focus/Dragging | `var(--component-slider-thumb-bg-active)` | `var(--component-slider-thumb-border-active)` | `var(--component-slider-thumb-ring-active)` |
| Disabled | `var(--component-slider-thumb-bg-disabled)` | `var(--component-slider-thumb-border-disabled)` | none |

### Marks / ticks

| **Part** | **Token** |
| --- | --- |
| Tick active | `var(--component-slider-tick-active)` |
| Tick inactive | `var(--component-slider-tick-inactive)` |
| Mark label text | `var(--component-slider-mark-text)` |

## Executable interaction rules

### Value model

- Slider has `min`, `max`, `step`.
- Value snaps to step increments.
- Range variant maintains `valueMin ≤ valueMax`.

### Dragging

- Drag thumb updates draft value continuously.
- On release, commit value (or keep live update if product prefers).
- Clicking on track jumps thumb to nearest step (recommended).

### Range

- When thumbs cross, either:
  - swap (allowed) OR
  - clamp (allowed)
  - pick one policy globally.
- Ensure min thumb cannot exceed max thumb after snap.

### Marks (when enabled)

- Marks are optional labeled stops.
- Clicking a mark sets to that mark value.

### Tooltip (optional)

- Show on hover/focus/drag with current value.
- For range, show tooltip per thumb.

### Keyboard & ARIA (required)

- Use `role="slider"` on each thumb with:
  - `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
  - `aria-orientation="horizontal"`
- Key bindings (per thumb):
  - ArrowLeft/ArrowDown: decrease by `step`
  - ArrowRight/ArrowUp: increase by `step`
  - PageDown/PageUp: decrease/increase by \(10×step\) (or configured)
  - Home/End: set to min/max

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.slider.track.bg` | `--component-slider-track-bg` |
| `tokens.slider.track.bgActive` | `--component-slider-track-bg-active` |
| `tokens.slider.track.radius` | `--component-slider-track-radius` |
| `tokens.slider.track.h` | `--component-slider-track-h` |
| `tokens.slider.thumb.bgDefault` | `--component-slider-thumb-bg-default` |
| `tokens.slider.thumb.bgHover` | `--component-slider-thumb-bg-hover` |
| `tokens.slider.thumb.bgActive` | `--component-slider-thumb-bg-active` |
| `tokens.slider.thumb.bgDisabled` | `--component-slider-thumb-bg-disabled` |
| `tokens.slider.thumb.borderDefault` | `--component-slider-thumb-border-default` |
| `tokens.slider.thumb.borderHover` | `--component-slider-thumb-border-hover` |
| `tokens.slider.thumb.borderActive` | `--component-slider-thumb-border-active` |
| `tokens.slider.thumb.borderDisabled` | `--component-slider-thumb-border-disabled` |
| `tokens.slider.thumb.ringActive` | `--component-slider-thumb-ring-active` |
| `tokens.slider.thumb.size` | `--component-slider-thumb-size` |
| `tokens.slider.tick.active` | `--component-slider-tick-active` |
| `tokens.slider.tick.inactive` | `--component-slider-tick-inactive` |
| `tokens.slider.mark.text` | `--component-slider-mark-text` |
