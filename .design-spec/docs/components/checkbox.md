# Component: Checkbox

## Level

Molecular

## Aliases

- multi-select toggle
- boolean group

## Best practices

- **Use for**: multiple selection or boolean toggles in lists/forms.
- **Group rules**:
  - Provide “Select all” only when it’s meaningful and reversible.
  - Clearly show indeterminate state when partially selected.
- **Labeling**: label should describe the option, not the action.

## Anatomy

High-level structure:

```
[ ] Label (optional)
```

| Part | Description | Notes |
|---|---|---|
| Box | Click/tap target representing selection state | Must meet minimum hit target; visuals should not be the only affordance. |
| Mark | Checkmark (checked) or dash (indeterminate) | Must have sufficient contrast; keep shape stable across states. |
| Label (optional) | Describes the option | Clicking label toggles the checkbox; keep label associated for a11y. |

## Variants

### Variant axes

- **Value**: Unchecked / Checked / Indeterminate
- **State**: Default / Hover / Disabled
- **Label**: with label / box-only

### Variants table

| Value | State | Box | Mark | Label |
|---|---|---|---|---|
| Unchecked | Default | `var(--component-checkbox-unchecked-bg-default)` + `var(--component-checkbox-unchecked-border-default)` | none | `var(--component-checkbox-label-text-default)` |
| Unchecked | Hover | `var(--component-checkbox-unchecked-bg-hover)` + `var(--component-checkbox-unchecked-border-hover)` | none | `var(--component-checkbox-label-text-default)` |
| Unchecked | Disabled | `var(--component-checkbox-unchecked-bg-disabled)` + `var(--component-checkbox-unchecked-border-disabled)` | none | `var(--component-checkbox-label-text-disabled)` |
| Checked | Default | `var(--component-checkbox-checked-bg-default)` | `var(--component-checkbox-checked-mark-default)` | `var(--component-checkbox-label-text-default)` |
| Checked | Disabled | `var(--component-checkbox-checked-bg-disabled)` | `var(--component-checkbox-checked-mark-disabled)` | `var(--component-checkbox-label-text-disabled)` |
| Indeterminate | Default | `var(--component-checkbox-indeterminate-bg-default)` + `var(--component-checkbox-indeterminate-border-default)` | `var(--component-checkbox-indeterminate-dash-default)` | `var(--component-checkbox-label-text-default)` |
| Indeterminate | Disabled | `var(--component-checkbox-indeterminate-bg-disabled)` + `var(--component-checkbox-indeterminate-border-disabled)` | `var(--component-checkbox-indeterminate-dash-disabled)` | `var(--component-checkbox-label-text-disabled)` |

## Sizes

From the provided nodes:

| Size | Box size | Box radius | Gap to label | Label typography |
|---|---:|---:|---:|---|
| M (default) | `var(--component-checkbox-box-size)` | `var(--component-checkbox-box-radius)` | `var(--component-checkbox-gap)` | 14 / Medium, line-height 20 |

## States

| State | When to use | Notes |
|---|---|---|
| Default | Resting state | Primary for most screens. |
| Hover | Pointer hover on web | Do not rely on hover only; keep focus visible too. |
| Disabled | Not interactive | Use to indicate unavailable options; keep label readable. |

## Component token bindings (required)

All values below must come from component tokens (`.design-spec/tokens/src/component.json`) which in turn must reference semantic tokens only.

| Token (CSS) | JSON path | Notes |
|---|---|---|
| `--component-checkbox-box-size` | `tokens.checkbox.boxSize` | px |
| `--component-checkbox-box-radius` | `tokens.checkbox.boxRadius` | px |
| `--component-checkbox-gap` | `tokens.checkbox.gap` | px |
| `--component-checkbox-label-text-default` | `tokens.checkbox.labelTextDefault` | label color |
| `--component-checkbox-label-text-disabled` | `tokens.checkbox.labelTextDisabled` | label color |
| `--component-checkbox-unchecked-bg-default` | `tokens.checkbox.uncheckedBgDefault` | fill |
| `--component-checkbox-unchecked-border-default` | `tokens.checkbox.uncheckedBorderDefault` | border |
| `--component-checkbox-unchecked-bg-hover` | `tokens.checkbox.uncheckedBgHover` | fill |
| `--component-checkbox-unchecked-border-hover` | `tokens.checkbox.uncheckedBorderHover` | border |
| `--component-checkbox-unchecked-bg-disabled` | `tokens.checkbox.uncheckedBgDisabled` | fill |
| `--component-checkbox-unchecked-border-disabled` | `tokens.checkbox.uncheckedBorderDisabled` | border |
| `--component-checkbox-checked-bg-default` | `tokens.checkbox.checkedBgDefault` | fill |
| `--component-checkbox-checked-mark-default` | `tokens.checkbox.checkedMarkDefault` | checkmark |
| `--component-checkbox-checked-bg-disabled` | `tokens.checkbox.checkedBgDisabled` | fill |
| `--component-checkbox-checked-mark-disabled` | `tokens.checkbox.checkedMarkDisabled` | checkmark |
| `--component-checkbox-indeterminate-bg-default` | `tokens.checkbox.indeterminateBgDefault` | fill |
| `--component-checkbox-indeterminate-border-default` | `tokens.checkbox.indeterminateBorderDefault` | border |
| `--component-checkbox-indeterminate-dash-default` | `tokens.checkbox.indeterminateDashDefault` | dash |
| `--component-checkbox-indeterminate-bg-disabled` | `tokens.checkbox.indeterminateBgDisabled` | fill |
| `--component-checkbox-indeterminate-border-disabled` | `tokens.checkbox.indeterminateBorderDisabled` | border |
| `--component-checkbox-indeterminate-dash-disabled` | `tokens.checkbox.indeterminateDashDisabled` | dash |

## Layout patterns

- **Table selection**: row selection checkbox + header checkbox for bulk.
- **Filter panel**: checkbox groups with search when large.
- **Form field**: inline checkbox with helper text.

## Anti-patterns

- Using checkbox for mutually exclusive choices (use `Radio`).
- Tiny hit targets (must meet minimum target size).

## Accessibility essentials

- **Keyboard**: Tab to focus; Space to toggle.
- **Name**: label must be programmatically associated.
- **Indeterminate**: expose indeterminate state semantics (not visual-only).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `checkbox/group/square/md/default`
  - `checkbox/group/square/md/indeterminate`

