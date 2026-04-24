# Component: Cascader

## Level

Molecular

## Aliases

- hierarchical selector
- multi-level dropdown

## Best practices

- **Use for**: selecting from hierarchical options where path matters.
- **Search**: provide search when options are large or deep.
- **Display**: show full path or a clear abbreviated representation.
- **Defaults**: avoid preselecting deep options unless user intent is clear.

## Layout patterns

- **Filter bar**: region/category cascader alongside other filters.
- **Form field**: cascader inside a `Form` row with validation rules.

## Anti-patterns

- Using cascader for flat lists (use `Select`).
- Very deep hierarchies without search (poor usability).

## Accessibility essentials

- **Keyboard**: must be operable without mouse; focus and selection visible.
- **Announcements**: selection changes should be perceivable; avoid silent focus jumps.
- **Name**: label the field clearly (Form label or accessible name).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `cascader/filter/rounded/md/default`
  - `cascader/form/rounded/md/error`

## Anatomy

```
┌──────────────────────────────┐
│ Trigger (Select-like)        │
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ Column 1 │ Column 2 │ Column 3 ...          │
│ item >   │ item >   │ item (leaf)           │
└──────────────────────────────────────────────┘
```

- **Trigger**: uses Select-like trigger (placeholder/value + chevron)
- **Popup**: one or more columns
- **Menu item**:
  - label
  - right arrow (has children)
  - selected indicator (single-select) OR checkbox (multi-select)

## Variants

| **Kind** | **When to use** | **Notes** |
| --- | --- | --- |
| `single` | 单选路径 | selected shows checkmark; leaf selects value |
| `multiple` | 多选（含半选/全选） | checkbox state: unchecked/checked/indeterminate |

## Sizes

### Menu item

| **Size** | **Height** | **Padding Y** | **Radius** | **Text size** |
| --- | --- | --- | --- | --- |
| `lg` (32) | 32 | `var(--component-cascader-item-py-lg)` | `var(--component-cascader-item-radius-lg)` | 14 |
| `sm` (28) | 28 | `var(--component-cascader-item-py-sm)` | `var(--component-cascader-item-radius-sm)` | 14 |

## States

### Menu item — states

| **State** | **Background** | **Text** | **Right icon** |
| --- | --- | --- | --- |
| Default | `var(--component-cascader-item-bg-default)` | `var(--component-cascader-item-text-default)` | `var(--component-cascader-item-icon-default)` |
| Hover / Active | `var(--component-cascader-item-bg-hover)` | `var(--component-cascader-item-text-default)` | `var(--component-cascader-item-icon-default)` |
| Disabled | `var(--component-cascader-item-bg-default)` | `var(--component-cascader-item-text-disabled)` | `var(--component-cascader-item-icon-disabled)` |

### Checkbox states (multi-select)

> Checkbox visuals follow `Checkbox` component tokens. Cascader only specifies layout + item bg/text/icon.

| **State** | **Checkbox** | **Meaning** |
| --- | --- | --- |
| Unchecked | checkbox unchecked | none selected in subtree |
| Checked | checkbox checked | all selected in subtree |
| Indeterminate | checkbox indeterminate | partially selected subtree |

## Executable interaction rules

### Navigation & selection

- **Arrow indicator**: show right arrow only for nodes with children.
- **Hover**:
  - Hovering a non-leaf row opens its next column (do not require click).
  - Hovering a leaf does not open a new column.
- **Click**:
  - Single: clicking a leaf selects and closes popup (unless “apply” workflow is used).
  - Multiple: clicking checkbox toggles; clicking row toggles checkbox only if product chooses row-as-toggle (must be consistent).
- **Disabled item**: cannot be focused/selected; its checkbox (if any) is disabled.

### Multi-select propagation (required)

- Selecting a parent selects all enabled children.
- Deselecting a parent deselects all enabled children.
- Parent checkbox becomes **indeterminate** when some (not all) enabled descendants are selected.

### Keyboard & ARIA (required)

- Trigger: `aria-haspopup="tree"` or `listbox` (implementation choice), `aria-expanded`.
- Popup items must be reachable via keyboard:
  - ArrowUp/Down moves within current column (skip disabled).
  - ArrowRight opens next column when node has children.
  - ArrowLeft returns to previous column.
  - Enter selects (single) / toggles (multiple).
  - Esc closes.

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.cascader.popup.bg` | `--component-cascader-popup-bg` |
| `tokens.cascader.popup.radius` | `--component-cascader-popup-radius` |
| `tokens.cascader.popup.shadow` | `--component-cascader-popup-shadow` |
| `tokens.cascader.popup.p` | `--component-cascader-popup-p` |
| `tokens.cascader.column.bg` | `--component-cascader-column-bg` |
| `tokens.cascader.column.divider` | `--component-cascader-column-divider` |
| `tokens.cascader.column.width` | `--component-cascader-column-width` |
| `tokens.cascader.column.p` | `--component-cascader-column-p` |
| `tokens.cascader.item.bgDefault` | `--component-cascader-item-bg-default` |
| `tokens.cascader.item.bgHover` | `--component-cascader-item-bg-hover` |
| `tokens.cascader.item.textDefault` | `--component-cascader-item-text-default` |
| `tokens.cascader.item.textDisabled` | `--component-cascader-item-text-disabled` |
| `tokens.cascader.item.iconDefault` | `--component-cascader-item-icon-default` |
| `tokens.cascader.item.iconDisabled` | `--component-cascader-item-icon-disabled` |
| `tokens.cascader.item.radiusLg` | `--component-cascader-item-radius-lg` |
| `tokens.cascader.item.radiusSm` | `--component-cascader-item-radius-sm` |
| `tokens.cascader.item.px` | `--component-cascader-item-px` |
| `tokens.cascader.item.gap` | `--component-cascader-item-gap` |
| `tokens.cascader.item.gapWithCheckbox` | `--component-cascader-item-gap-with-checkbox` |
| `tokens.cascader.item.pyLg` | `--component-cascader-item-py-lg` |
| `tokens.cascader.item.pySm` | `--component-cascader-item-py-sm` |
| `tokens.cascader.item.minWidth` | `--component-cascader-item-min-width` |
| `tokens.cascader.check.size` | `--component-cascader-check-size` |

