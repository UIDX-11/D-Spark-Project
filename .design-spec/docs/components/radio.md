# Component: Radio

## Level

Molecular

## Aliases

- single-select toggle
- option group

## Best practices

- **Use for**: mutually exclusive choices (exactly one option in a group).
- **Group rules**:
  - Provide a clear default when appropriate.
  - Do not mix Radio with Checkbox semantics in the same group.
- **Labeling**: label describes the option, not the action.

## Anatomy

High-level structure:

```
( ) Label (optional)
    Helper text (optional)
```

| Part | Description | Notes |
|---|---|---|
| Outer control | Circular indicator showing selection | Must meet minimum hit target. |
| Inner dot | Visible only when selected | Keep centered; size should not change across states. |
| Label (optional) | Option label | Clicking label selects the option; associate for a11y. |
| Helper text (optional) | Supporting text under label | Use for constraints/description; keep visually secondary. |

## Variants

### Variant axes

- **Value**: Unselected / Selected
- **State**: Default / Hover / Disabled
- **Content**: label only / label + helper
- **Style**: Classic (circle) / Radio Button (capsule)

### Classic radio (circle) variants

| Value | State | Outer | Dot | Label |
|---|---|---|---|---|
| Unselected | Default | `var(--component-radio-unchecked-bg-default)` + `var(--component-radio-unchecked-border-default)` | none | `var(--component-radio-label-text-default)` |
| Unselected | Hover | `var(--component-radio-unchecked-bg-hover)` + `var(--component-radio-unchecked-border-hover)` | none | `var(--component-radio-label-text-default)` |
| Unselected | Disabled | `var(--component-radio-unchecked-bg-disabled)` + `var(--component-radio-unchecked-border-disabled)` | none | `var(--component-radio-label-text-disabled)` |
| Selected | Default | `var(--component-radio-checked-outer-default)` | `var(--component-radio-checked-dot-default)` | `var(--component-radio-label-text-default)` |
| Selected | Disabled | `var(--component-radio-checked-outer-disabled)` | `var(--component-radio-checked-dot-disabled)` | `var(--component-radio-label-text-disabled)` |

### Radio Button (capsule) variants

| Value | State | Background | Text |
|---|---|---|---|
| Unselected | Default | `var(--component-radio-button-bg-default)` | `var(--component-radio-button-text-default)` |
| Selected | Default | `var(--component-radio-button-bg-selected)` | `var(--component-radio-button-text-selected)` |
| Disabled | Disabled | `var(--component-radio-button-bg-disabled)` | `var(--component-radio-button-text-disabled)` |

## Sizes

### Classic radio (circle)

From the provided nodes:

| Size | Outer size | Dot size | Gap to label | Label typography | Helper typography |
|---|---:|---:|---:|---|---|
| M (default) | `var(--component-radio-outer-size)` | `var(--component-radio-dot-size)` | `var(--component-radio-gap)` | 14 / Medium, line-height 20 | 12 / Medium, line-height 16 |

### Radio Button (capsule)

| Size | Height | Padding X | Padding Y | Radius |
|---|---:|---:|---:|---:|
| L | auto | `var(--component-radio-button-px-lg)` | `var(--component-radio-button-py-lg)` | `var(--component-radio-button-radius-lg)` |
| M | auto | `var(--component-radio-button-px-md)` | `var(--component-radio-button-py-md)` | `var(--component-radio-button-radius-md)` |
| S | `var(--component-radio-button-h-sm)` | `var(--component-radio-button-px-sm)` | (centered) | `var(--component-radio-button-radius-sm)` |

## States

| State | When to use | Notes |
|---|---|---|
| Default | Resting state | Primary for most screens. |
| Hover | Pointer hover on web | Must not be the only affordance; keep focus visible too. |
| Disabled | Not interactive | Use to indicate unavailable options; keep label readable. |
| Selected | The chosen option | Exactly one in group; use clear visual difference. |

## Component token bindings (required)

All values below must come from component tokens (`.design-spec/tokens/src/component.json`) which in turn must reference semantic tokens only.

### Classic radio (circle)

| Token (CSS) | JSON path |
|---|---|
| `--component-radio-outer-size` | `tokens.radio.outerSize` |
| `--component-radio-dot-size` | `tokens.radio.dotSize` |
| `--component-radio-gap` | `tokens.radio.gap` |
| `--component-radio-label-text-default` | `tokens.radio.labelTextDefault` |
| `--component-radio-label-text-disabled` | `tokens.radio.labelTextDisabled` |
| `--component-radio-helper-text-default` | `tokens.radio.helperTextDefault` |
| `--component-radio-helper-text-disabled` | `tokens.radio.helperTextDisabled` |
| `--component-radio-unchecked-bg-default` | `tokens.radio.uncheckedBgDefault` |
| `--component-radio-unchecked-border-default` | `tokens.radio.uncheckedBorderDefault` |
| `--component-radio-unchecked-bg-hover` | `tokens.radio.uncheckedBgHover` |
| `--component-radio-unchecked-border-hover` | `tokens.radio.uncheckedBorderHover` |
| `--component-radio-unchecked-bg-disabled` | `tokens.radio.uncheckedBgDisabled` |
| `--component-radio-unchecked-border-disabled` | `tokens.radio.uncheckedBorderDisabled` |
| `--component-radio-checked-outer-default` | `tokens.radio.checkedOuterDefault` |
| `--component-radio-checked-dot-default` | `tokens.radio.checkedDotDefault` |
| `--component-radio-checked-outer-disabled` | `tokens.radio.checkedOuterDisabled` |
| `--component-radio-checked-dot-disabled` | `tokens.radio.checkedDotDisabled` |

### Radio Button (capsule)

| Token (CSS) | JSON path |
|---|---|
| `--component-radio-button-gap` | `tokens.radioButton.gap` |
| `--component-radio-button-bg-default` | `tokens.radioButton.bgDefault` |
| `--component-radio-button-text-default` | `tokens.radioButton.textDefault` |
| `--component-radio-button-bg-selected` | `tokens.radioButton.bgSelected` |
| `--component-radio-button-text-selected` | `tokens.radioButton.textSelected` |
| `--component-radio-button-bg-disabled` | `tokens.radioButton.bgDisabled` |
| `--component-radio-button-text-disabled` | `tokens.radioButton.textDisabled` |
| `--component-radio-button-radius-lg` | `tokens.radioButton.radiusLg` |
| `--component-radio-button-radius-md` | `tokens.radioButton.radiusMd` |
| `--component-radio-button-radius-sm` | `tokens.radioButton.radiusSm` |
| `--component-radio-button-px-lg` | `tokens.radioButton.pxLg` |
| `--component-radio-button-py-lg` | `tokens.radioButton.pyLg` |
| `--component-radio-button-px-md` | `tokens.radioButton.pxMd` |
| `--component-radio-button-py-md` | `tokens.radioButton.pyMd` |
| `--component-radio-button-px-sm` | `tokens.radioButton.pxSm` |
| `--component-radio-button-h-sm` | `tokens.radioButton.hSm` |

## Layout patterns

- **Form field**: radio group with helper text and validation message below.
- **Segmented selection**: use Radio Button (capsule) for compact, mutually-exclusive filters.

## Anti-patterns

- Using Radio for multiple selection (use `Checkbox`).
- Groups without a clear label/context.

## Accessibility essentials

- **Keyboard**: Tab to group, arrow keys to move between options, Space to select (platform-dependent); at minimum support Tab + Space on each control.
- **Name**: label must be programmatically associated.
- **State**: expose selected/disabled semantics, not visual-only.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `radio/group/circle/md/default`
  - `radio/group/circle/md/selected`
  - `radio-button/group/capsule/md/selected`

