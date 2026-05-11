# Component: Table

## Level

Molecular

## Aliases

- data grid
- results table

## References

- Arco Design Web React（API / 行为真源）: [Table](https://arco.design/react/components/table)
- Arco 源码（React）: [`arco-design/components/Table`](https://github.com/arco-design/arco-design/tree/main/components/Table)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 定位 Table 画板并补充 `node-id=` 深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Best practices

- **Use for**: structured, comparable datasets (columns/rows).
- **Density**: support compact density for B-end; keep line-height readable.
- **Columns**:
  - Left-align text; right-align numbers.
  - Truncate long content with tooltip; keep key identifiers visible.
- **Interactions**:
  - Sorting/filtering must be discoverable and not rely on hover only.
  - Row actions: primary action visible; secondary actions in overflow.
- **States**: loading, empty, error; preserve column headers when possible.

## Layout patterns

- **CRUD page**: filter form above + table + pagination below.
- **Selection**: checkbox selection + bulk action bar.
- **Sticky header**: for long tables, sticky header improves scanability.

## Anti-patterns

- Tables inside narrow cards causing horizontal scroll on common breakpoints.
- Using table for layout (use `Layout`/`Space`).

## Accessibility essentials

- **Semantics**: proper table semantics; headers (`th`) and scope.
- **Keyboard**: focus management for interactive cells; avoid trapping focus.
- **Announcements**: sorting/filtering changes should be perceivable (aria-live where appropriate).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `table/results/none/md/default`
  - `table/results/none/md/empty`

## Anatomy

```
Table container
  Header row (th)
  Body rows (tr)
    Cells (td)
      Optional: inline controls (Input/Select/Dropdown/Switch/Progress/etc.)
  Optional: sticky header
  Optional: pagination
```

## Variants

| **Kind** | **Features** | **Notes** |
| --- | --- | --- |
| `basic` | header + rows | default |
| `striped` | alternating row bg | optional |
| `bordered` | vertical dividers | optional |
| `sticky-header` | header sticks on scroll | recommended for long lists |
| `with-selection` | checkbox column + bulk actions | common in CRUD |
| `with-actions` | action column (icons/overflow) | keep consistent width |
| `with-inline-controls` | input/select/progress inside cells | ensure focus rules |

## Sizes (row density)

> Figma shows row heights as discrete sizes (e.g. 36/44/52) and separate header height. Tokenize height + paddings.

| **Density** | **Row height** | **Use case** |
| --- | ---:| --- |
| `compact` | 36 | dense B-end tables |
| `default` | 44 | default |
| `comfortable` | 52 | readability |

## States

| **State** | **Row bg** | **Text** | **Notes** |
| --- | --- | --- | --- |
| `default` | default bg | normal | |
| `hover` | hover bg | normal | hover does not change layout |
| `selected` | selected bg | normal | selection persists on hover |
| `disabled-row` | disabled bg | muted | optional; avoid if possible |
| `error-cell` | n/a | danger | e.g. invalid inline input |
| `loading` | skeleton rows | muted | keep header visible |
| `empty` | empty state | muted | page empty vs local empty differ (Figma note) |

## Executable interaction rules

## Hard rules (MUST / MUST NOT)

- **MUST** use tokens for all Table visuals (bg/border/shadow/padding/indicator). No ad-hoc hex/px in product UI.
- **MUST** keep header/body column widths identical under all states (hover/selected/loading/virtualized).
- **MUST NOT** rely on hover-only affordances for critical actions (sort/filter/row actions must be visible or focus-visible).
- **MUST** provide stable row identity (`rowKey`) so selection/expand/tree state survives sort/paginate (when data represents same entities).
- **MUST** avoid layout shift:
  - sort icons / resize handles / action icons must not change column width when appearing
  - expanded content must not change header/body alignment

### Keyboard navigation model (choose ONE, document per product)

> This is a **hard contract**. Mixing models across tables in one product is forbidden.

| **Model** | **What is focusable by default** | **When to use** |
| --- | --- | --- |
| `row-focus` | each row is a single tab stop; interactive controls inside row are entered via explicit action | most CRUD tables |
| `cell-focus` | each cell can receive focus and arrow-key navigation moves focus cell-to-cell | data-heavy / spreadsheet-like |

#### `row-focus` model rules (required if chosen)

- Tab order:
  - `Tab` moves focus: toolbar → header controls → row 1 → row 2 → … → pagination
  - inside a focused row, `Enter` toggles “row action mode” (or opens primary action) (product decision)
- Arrow keys:
  - `Up/Down`: move focused row
  - `Home/End`: jump to first/last row in current page
- Selection:
  - `Space` toggles row checkbox when selection enabled
- Expand / tree:
  - `Right`: expand (if expandable/collapsed)
  - `Left`: collapse (if expanded)
- **MUST** expose a visible focus ring for the focused row (tokenized)

#### `cell-focus` model rules (required if chosen)

- Tab order:
  - `Tab` enters the grid at the first focusable cell; leaves grid after the last focusable cell
  - `Tab` does **not** traverse every cell by default when the grid is large; use roving tabindex (one active cell)
- Arrow keys:
  - `Up/Down/Left/Right` moves active cell
  - `PageUp/PageDown` moves by viewport (virtualization must support this)
- Editing:
  - `Enter` enters edit mode for editable cell
  - `Esc` exits edit mode (revert changes if not committed)
- **MUST** render a cell focus outline without shifting layout (tokenized outline)

### Column sizing

- Columns must support:
  - fixed width (e.g. checkbox/action)
  - min/max width with truncation + tooltip
- Text columns left-aligned; numeric columns right-aligned.

### Column resize (required when enabled)

- Resize handle is on the right edge of the header cell.
- Dragging updates column width:
  - must clamp to `minWidth` and `maxWidth` per column
  - must not cause layout jank (use transform/raf when possible)
- Show a resize indicator line while dragging; commit width on pointer up.
- Keyboard support (recommended):
  - focused header + `Alt+Left/Right` adjusts width in steps (e.g. 8px)

### Column reorder / drag (required when enabled)

- Drag is initiated from a dedicated drag handle or by long-press on header label (product decision); avoid accidental drags during sorting.
- While dragging:
  - show a ghost preview
  - show insertion indicator line between columns
  - auto-scroll horizontally when near edges
- Drop rules:
  - respect pinned (fixed) columns: pinned group cannot be dropped into non-pinned region and vice versa
  - preserve column widths after reorder

### Sorting

- Sort toggle is on header cell:
  - cycle: none → asc → desc
  - show sort indicator when active (not hover-only)
- Sorting does not reset pagination selection (unless data source changes).

### Fixed columns / pinned columns (required when enabled)

- Pinned columns:
  - `left` pinned group (e.g. checkbox, identifier)
  - `right` pinned group (e.g. actions)
- Horizontal scroll must keep pinned columns stationary.
- Visual separation:
  - show shadow on the boundary between pinned and scrollable region
  - shadow appears only when there is overflow scroll in that direction
- Header + body alignment is strict: pinned column widths must match body cells.

### Selection (required for `with-selection`)

- Header checkbox:
  - unchecked: none selected
  - indeterminate: some selected
  - checked: all selected (current page by default)
- Bulk actions appear when selection count > 0.

### Row actions

- Primary action may be an icon button; secondary actions go into dropdown/overflow.
- Do not hide all actions behind hover-only for critical flows (discoverability).

### Inline controls in cells

- Entering edit mode:
  - click focuses control, does not select row (unless product chooses row click selection; then use separate selection checkbox)
- Validation:
  - invalid field shows inline error message and sets `aria-invalid`
  - table does not shift columns when error appears (use reserved helper area or overlay tooltip)

### Tree table (required when enabled)

- Tree uses a dedicated expand/collapse toggle in the first “tree column”.
- Indentation:
  - each depth adds `indent` spacing (tokenized)
  - toggles align consistently regardless of row selection checkbox
- Loading children:
  - expanding a node may show a loading indicator in place (do not block entire table)
- Selection + tree:
  - selecting a parent may optionally select children (product decision) but must be explicit and documented

### Expandable row (required when enabled)

- Expand toggle location:
  - either a dedicated expand column OR within first column (tree-style)
- Expanded content:
  - spans full row width across all columns (including pinned)
  - must not break column alignment
  - uses a distinct background and padding (tokenized)
- Expansion state must be preserved across sorting and pagination when row identity is stable.

### Cell merge (rowspan/colspan) (required when enabled)

- Merge is data-driven (computed by grouping rules); never manual drag merge in B-end tables.
- Visual rules:
  - merged region preserves outer borders; inner borders removed
  - text alignment remains consistent with column type
- Interaction rules:
  - selection and hover apply to the whole merged region
  - keyboard navigation skips internal “phantom” cells

### Virtual scrolling (required when enabled)

- Use virtualization when:
  - rows > 200 (rule-of-thumb) OR row rendering is expensive
- Requirements:
  - sticky header works with virtualization
  - pinned columns remain aligned with virtualized rows
  - overscan rows are rendered above/below viewport (tokenized `overscan`)
- **MUST** define row height strategy:
  - fixed row heights (preferred) OR measured dynamic heights (more expensive, document limits)
- **MUST** define scroll-to-index behavior:
  - `scrollToIndex(i)` aligns to row top (default) and supports `center` alignment optionally
- Accessibility:
  - announce total row count
  - do not break “find in page” expectations for critical workflows (document limitation)

### Scrolling & sticky header

- Sticky header remains visible during vertical scroll.
- Horizontal scroll:
  - keep header and body columns aligned
  - optional: sticky first/last column for identifiers/actions
- Scrollbars in Figma are demonstrative; use real scrollbar component when needed (Figma note).

### Empty

- Empty states:
  - **page empty**: black line + brand color
  - **local empty**: gray line only
  - local empty sizes: S/M/L (Figma note)

## Accessibility essentials (more executable)

- Use semantic table markup:
  - header cells `th` with `scope="col"`
  - row headers when needed: `th scope="row"`
- Sorting:
  - `aria-sort="ascending|descending|none"` on sorted column header
- Selection:
  - checkbox labels include row identifier (`aria-label="Select row: <name>"`)
- Inline controls:
  - maintain predictable tab order within a row

## Verification checklist (self-check)

- [ ] **Tokens-only styling**: no new non-token colors/spacing/shadows introduced.
- [ ] **Pinned alignment**: pinned header/body widths match scrollable region; no 1px drift.
- [ ] **Pinned shadow**: boundary shadow appears only when overflow exists in that direction.
- [ ] **Resize**: min/max clamped; indicator line shown; commit on pointer up.
- [ ] **Reorder**: insertion indicator shown; pinned-group constraint enforced; widths preserved.
- [ ] **Tree**: indentation uses token; toggle alignment consistent with selection checkbox.
- [ ] **Expand**: expanded content spans full width; uses tokenized bg/padding; state stable by rowKey.
- [ ] **Merge**: borders correct; hover/selection applies to merged region; keyboard skips phantom cells.
- [ ] **Virtual**: overscan token applied; sticky header works; keyboard model still valid.
- [ ] **A11y**: `aria-sort` set; selection labels include row identifier; focus visible (row or cell).

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.table.bg` | `--component-table-bg` |
| `tokens.table.border` | `--component-table-border` |
| `tokens.table.header.bg` | `--component-table-header-bg` |
| `tokens.table.header.text` | `--component-table-header-text` |
| `tokens.table.header.hCompact` | `--component-table-header-h-compact` |
| `tokens.table.header.hDefault` | `--component-table-header-h-default` |
| `tokens.table.header.hComfortable` | `--component-table-header-h-comfortable` |
| `tokens.table.row.bgDefault` | `--component-table-row-bg-default` |
| `tokens.table.row.bgHover` | `--component-table-row-bg-hover` |
| `tokens.table.row.bgSelected` | `--component-table-row-bg-selected` |
| `tokens.table.row.text` | `--component-table-row-text` |
| `tokens.table.row.textMuted` | `--component-table-row-text-muted` |
| `tokens.table.row.hCompact` | `--component-table-row-h-compact` |
| `tokens.table.row.hDefault` | `--component-table-row-h-default` |
| `tokens.table.row.hComfortable` | `--component-table-row-h-comfortable` |
| `tokens.table.cell.px` | `--component-table-cell-px` |
| `tokens.table.cell.pyCompact` | `--component-table-cell-py-compact` |
| `tokens.table.cell.pyDefault` | `--component-table-cell-py-default` |
| `tokens.table.cell.pyComfortable` | `--component-table-cell-py-comfortable` |
| `tokens.table.pinned.shadowLeft` | `--component-table-pinned-shadow-left` |
| `tokens.table.pinned.shadowRight` | `--component-table-pinned-shadow-right` |
| `tokens.table.column.resizeHandleW` | `--component-table-column-resize-handle-w` |
| `tokens.table.column.resizeHandleColor` | `--component-table-column-resize-handle-color` |
| `tokens.table.column.dragIndicatorW` | `--component-table-column-drag-indicator-w` |
| `tokens.table.column.dragIndicatorColor` | `--component-table-column-drag-indicator-color` |
| `tokens.table.tree.indent` | `--component-table-tree-indent` |
| `tokens.table.tree.toggleSize` | `--component-table-tree-toggle-size` |
| `tokens.table.tree.toggleColor` | `--component-table-tree-toggle-color` |
| `tokens.table.expand.bg` | `--component-table-expand-bg` |
| `tokens.table.expand.px` | `--component-table-expand-px` |
| `tokens.table.expand.py` | `--component-table-expand-py` |
| `tokens.table.merge.bg` | `--component-table-merge-bg` |
| `tokens.table.virtual.overscan` | `--component-table-virtual-overscan` |
| `tokens.table.pinned.divider` | `--component-table-pinned-divider` |
| `tokens.table.pinned.shadowTier1` | `--component-table-pinned-shadow-tier1` |
| `tokens.table.pinned.shadowTier2` | `--component-table-pinned-shadow-tier2` |
| `tokens.table.focus.rowRing` | `--component-table-focus-row-ring` |
| `tokens.table.focus.cellOutlineW` | `--component-table-focus-cell-outline-w` |
| `tokens.table.focus.cellOutlineColor` | `--component-table-focus-cell-outline-color` |
| `tokens.table.virtual.rowHeightMode` | `--component-table-virtual-row-height-mode` |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

