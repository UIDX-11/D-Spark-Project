# Component: TreeSelect

## Level

Molecular

## Aliases

- tree select
- hierarchical select
- tree dropdown

## References

- Arco Vue（API / 行为真源）: [TreeSelect](https://arco.design/vue/component/tree-select)
- Arco 源码: `arco-design-vue/packages/web-vue/components/tree-select/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 定位 TreeSelect 画板并补充 `node-id=` 深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Best practices

- **Use for**: selecting from hierarchical data (categories, org tree).
- **Prefer search** when the tree is deep or large.
- **Show full path** (or tooltip) when labels repeat across branches.
- **Selection clarity**:
  - Single: show selected label in trigger.
  - Multiple: show tags or count summary (choose one pattern consistently).

## Layout patterns

- **Forms**: `FormItem(label + TreeSelect + help/error)`.
- **Filters**: multiple select + search + clear.

## Anti-patterns

- Loading huge trees without virtualization/search (performance).
- Allowing selection of non-leaf nodes without clear policy (must define).
- Expanding/collapsing without preserving scroll/focus (disorienting).

## Accessibility essentials

- **Keyboard**: open/close, navigate tree, expand/collapse, select, clear.
- **Focus**: visible focus on tree row; focus returns to trigger on close.
- **Name**: trigger has accessible name via label or `aria-label`.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `treeselect/single/rounded/xl/default`
  - `treeselect/single/rounded/xl/focus`
  - `treeselect/multiple/rounded/xl/default`

## Anatomy

```
┌──────────────────────────────┐
│ Trigger (value/placeholder)  │  [chevron]
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Panel                         │
│  - Tree rows                   │
│    - Switcher (expand/collapse)│
│    - Label                     │
│  (optional) footer actions     │
└──────────────────────────────┘
```

## Variants

| **Kind** | **Selection** | **Search** | **Clear** | **Notes** |
| --- | --- | --- | --- | --- |
| `single` | single | optional | optional | default |
| `multiple` | checkbox | optional | optional | supports indeterminate parents |

## Sizes

> Sizes apply to the **trigger** (from Figma: 36/32/28/24). Dropdown rows follow a consistent row height (token-driven).

| **Size** | **Height** | **Padding X** | **Padding Y** | **Radius** | **Font** | **Icon** |
| --- | ---:| ---:| ---:| ---:| --- | ---:|
| `XL` | 36 | 12 | 8 | 8 | 14 / line 20 | 20 |
| `L` | 32 | 12 | 6 | 6 | 14 / line 20 | 20 |
| `M` | 28 | 8 | 6 | 4 | 12 / line 16 | 16 |
| `S` | 24 | 8 | 4 | 4 | 12 / line 16 | 16 |

## States

### Trigger (input-like)

| **State** | **BG** | **Border** | **Text placeholder** | **Text value** | **Icon** | **Ring** |
| --- | --- | --- | --- | --- | --- | --- |
| Default | `var(--component-tree-select-trigger-bg-default)` | `var(--component-tree-select-trigger-border-default)` | `var(--component-tree-select-trigger-text-placeholder)` | `var(--component-tree-select-trigger-text-value)` | `var(--component-tree-select-trigger-icon-default)` | none |
| Hover | `var(--component-tree-select-trigger-bg-hover)` | `var(--component-tree-select-trigger-border-hover)` | `var(--component-tree-select-trigger-text-placeholder)` | `var(--component-tree-select-trigger-text-value)` | `var(--component-tree-select-trigger-icon-default)` | none |
| Focus / Open | `var(--component-tree-select-trigger-bg-focus)` | `var(--component-tree-select-trigger-border-focus)` | `var(--component-tree-select-trigger-text-placeholder)` | `var(--component-tree-select-trigger-text-value)` | `var(--component-tree-select-trigger-icon-open)` | `var(--component-tree-select-trigger-ring-focus)` |
| Disabled | `var(--component-tree-select-trigger-bg-disabled)` | `var(--component-tree-select-trigger-border-disabled)` | `var(--component-tree-select-trigger-text-disabled)` | `var(--component-tree-select-trigger-text-disabled)` | `var(--component-tree-select-trigger-icon-disabled)` | none |
| Error | `var(--component-tree-select-trigger-bg-default)` | `var(--component-tree-select-trigger-border-error)` | `var(--component-tree-select-trigger-text-placeholder)` | `var(--component-tree-select-trigger-text-value)` | `var(--component-tree-select-trigger-icon-default)` | `var(--component-tree-select-trigger-ring-error)` |

### Panel / row

| **Part** | **Token** |
| --- | --- |
| Panel BG | `var(--component-tree-select-panel-bg)` |
| Panel radius | `var(--component-tree-select-panel-radius)` |
| Panel shadow | `var(--component-tree-select-panel-shadow)` |
| Row text | `var(--component-tree-select-row-text)` |
| Row text disabled | `var(--component-tree-select-row-text-disabled)` |
| Row BG hover | `var(--component-tree-select-row-bg-hover)` |
| Row BG selected | `var(--component-tree-select-row-bg-selected)` |
| Switcher icon | `var(--component-tree-select-switcher-icon)` |

## Executable interaction rules

### Open/close

- Click trigger toggles panel.
- Click outside closes panel.
- `Esc` closes and returns focus to trigger.

### Expand/collapse (required)

- Switcher shown only for nodes with children.
- Click switcher toggles expand/collapse without selecting the node.
- Preserve expanded state while panel is open.

### Selection policy (required)

- **Single**:
  - Clicking a node selects it.
  - If product requires leaf-only selection, disable non-leaf selection (allowed); otherwise allow selecting both (allowed). Pick one policy.
- **Multiple**:
  - Each row has checkbox.
  - Parent checkbox reflects children (checked / unchecked / indeterminate).
  - Clicking row toggles checkbox only if product chooses row-as-toggle; otherwise only checkbox toggles. Pick one policy.

### Search (optional)

- If enabled, search filters nodes by label.
- Matched nodes should keep ancestors visible (to preserve hierarchy).

### Clear (optional)

- Clear action clears selection and keeps panel closed (recommended).

### Keyboard & ARIA (required)

- Trigger:
  - `role="combobox"`, `aria-expanded`, `aria-controls`
- Panel:
  - `role="tree"` (or treegrid when columns exist)
- Tree item:
  - `role="treeitem"` with `aria-level`, `aria-expanded` (when applicable), `aria-selected`
- Key bindings:
  - ArrowUp/ArrowDown: move focus between visible rows
  - ArrowRight: expand (if collapsible) else move to first child
  - ArrowLeft: collapse (if expanded) else move to parent
  - Enter/Space: select/toggle
  - Esc: close

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.treeSelect.trigger.bgDefault` | `--component-tree-select-trigger-bg-default` |
| `tokens.treeSelect.trigger.bgHover` | `--component-tree-select-trigger-bg-hover` |
| `tokens.treeSelect.trigger.bgFocus` | `--component-tree-select-trigger-bg-focus` |
| `tokens.treeSelect.trigger.bgDisabled` | `--component-tree-select-trigger-bg-disabled` |
| `tokens.treeSelect.trigger.borderDefault` | `--component-tree-select-trigger-border-default` |
| `tokens.treeSelect.trigger.borderHover` | `--component-tree-select-trigger-border-hover` |
| `tokens.treeSelect.trigger.borderFocus` | `--component-tree-select-trigger-border-focus` |
| `tokens.treeSelect.trigger.borderDisabled` | `--component-tree-select-trigger-border-disabled` |
| `tokens.treeSelect.trigger.borderError` | `--component-tree-select-trigger-border-error` |
| `tokens.treeSelect.trigger.textPlaceholder` | `--component-tree-select-trigger-text-placeholder` |
| `tokens.treeSelect.trigger.textValue` | `--component-tree-select-trigger-text-value` |
| `tokens.treeSelect.trigger.textDisabled` | `--component-tree-select-trigger-text-disabled` |
| `tokens.treeSelect.trigger.iconDefault` | `--component-tree-select-trigger-icon-default` |
| `tokens.treeSelect.trigger.iconOpen` | `--component-tree-select-trigger-icon-open` |
| `tokens.treeSelect.trigger.iconDisabled` | `--component-tree-select-trigger-icon-disabled` |
| `tokens.treeSelect.trigger.ringFocus` | `--component-tree-select-trigger-ring-focus` |
| `tokens.treeSelect.trigger.ringError` | `--component-tree-select-trigger-ring-error` |
| `tokens.treeSelect.panel.bg` | `--component-tree-select-panel-bg` |
| `tokens.treeSelect.panel.radius` | `--component-tree-select-panel-radius` |
| `tokens.treeSelect.panel.shadow` | `--component-tree-select-panel-shadow` |
| `tokens.treeSelect.row.text` | `--component-tree-select-row-text` |
| `tokens.treeSelect.row.textDisabled` | `--component-tree-select-row-text-disabled` |
| `tokens.treeSelect.row.bgHover` | `--component-tree-select-row-bg-hover` |
| `tokens.treeSelect.row.bgSelected` | `--component-tree-select-row-bg-selected` |
| `tokens.treeSelect.switcher.icon` | `--component-tree-select-switcher-icon` |
