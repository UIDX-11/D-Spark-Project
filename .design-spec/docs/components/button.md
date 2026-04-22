# Component: Button

## Level

Molecular

## Aliases

- action button
- CTA
- primary action / secondary action

## Best practices

- **Use for**: committing an action (submit, save, confirm, navigate to next step).
- **Hierarchy**:
  - Prefer **1 primary** button per view/region.
  - Use secondary/tertiary buttons for alternative actions.
- **States**: default, hover, active, focus, disabled, loading.
- **Destructive actions**:
  - Use explicit destructive styling and confirm when irreversible.
  - Avoid mapping destructive actions to “close” icons.
- **Content**:
  - Label uses verb phrase (e.g., “Save”, “Create”, “Publish”).
  - Avoid punctuation in labels.
  - If label is long, prefer rewording; if unavoidable, allow wrapping or use tooltip.

## Variants (Figma-based)

### Variant axes

From Figma component properties:

- **Style**: Primary / Secondary / Text / Filled (Surface) / Outline (Dashed)
- **Kind**: Standard / Danger
- **Leading icon**: optional
- **Type**: Regular (text) / Icon-only

### Variants table


| Style (Figma)                  | Common name (EN)  | Intended use                                           | Notes / anti-misuse                                                                             |
| ------------------------------ | ----------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| 主要按钮                           | Primary           | The default recommended action in a region             | Keep to **1 primary** per region; avoid “primary spam”.                                         |
| 次要按钮                           | Secondary         | Alternative actions alongside primary                  | Use when action is valid but not the recommended path.                                          |
| 三级按钮-tertiary (filled surface) | Filled / Tertiary | Low-emphasis actions, often in toolbars/cards          | Prefer grouping via `Space`; avoid visually overloading dense UIs.                              |
| 文本按钮                           | Text              | Low emphasis, inline actions (e.g., table row actions) | Must still have clear hover/focus affordance.                                                   |
| 线框按钮                           | Outline (solid)   | Secondary/tertiary emphasis without fill               | Use tokens for border/hover; do not use outline to encode “disabled”.                           |
| 虚框按钮                           | Outline / Dashed  | “Add item / add section” patterns                      | Use only when the intent is “add”; don’t use as a generic secondary.                            |
| 图标按钮                           | Icon button       | Compact actions in toolbars, tables, dense surfaces    | Must provide tooltip + accessible name (`aria-label`). Ensure hit target meets min size.        |
| 危险 (Kind)                      | Destructive       | Delete/disable/irreversible actions                    | Prefer confirm dialogs for irreversible actions. Combine with Primary/Secondary/Text as needed. |


## Sizes (Figma-based)

Sizes are defined by height tokens and paired typography/icon sizes.


| Size (Figma) | Height | Typography    | Icon size | Default padding (X / Y) | Corner radius |
| ------------ | ------ | ------------- | --------- | ----------------------- | ------------- |
| XL 大（36）     | 36     | 14 / Semibold | 16        | 16 / 8                  | 6             |
| L 中（32）      | 32     | 14 / Semibold | 16        | 16 / 6                  | 6             |
| M 小 （28）     | 28     | 12 / Semibold | 12        | 12 / 6                  | 4             |
| S 迷你（24）     | 24     | 12 / Medium   | 12        | 8–12 / 4                | 4             |


## States (Figma-based)


| State (Figma) | Common name (EN) | When to use                 | Minimum requirements                                            |
| ------------- | ---------------- | --------------------------- | --------------------------------------------------------------- |
| 默认            | Default          | Resting state               | Clear hierarchy; token-based colors.                            |
| 悬停            | Hover            | Pointer hover on web        | Must not be the only affordance; keep contrast.                 |
| 激活            | Active / Pressed | Pointer down / active state | Provide pressed feedback without layout shift.                  |
| 选中            | Selected         | Toggle/selection contexts   | Selected must be distinguishable from hover/focus; not color-only. |
| 禁用            | Disabled         | Action is unavailable       | Don’t use disabled to “explain validation”; show inline errors. |

## Button group (Figma-based)

Button groups are used when multiple actions are presented together (toolbars, form footers, dialogs).

### Group layout rules

| Rule | Recommendation | Rationale |
|---|---|---|
| Group spacing | **12px gap** between buttons (tokenized) | Matches the button-group container gap observed in Figma export; keeps groups readable and avoids “toggle-like” confusion. |
| Internal alignment | Align button baselines/heights within a group; do not mix sizes in the same group | Prevents jitter and improves scanability. |
| Grouping | Keep related actions adjacent; separate unrelated action clusters with a larger gap (use `Space`) | Reduces cognitive load in dense B-end toolbars. |
| Overflow | When actions exceed available width, collapse **least-used** actions first into an overflow menu | Preserves the primary path and avoids layout breakage. |

### Ordering rules (primary/secondary/destructive)

| Context | Recommended order | Notes |
|---|---|---|
| Common B-end pages (LTR) | Primary → Secondary → Filled/Tertiary/Text → Destructive (if present) | Keep a single primary per region; destructive should not compete for attention. |
| Wizard / step actions | Back/Previous → Next/Continue (Primary) | Order should match navigation direction. |
| Dialog footer | Primary (confirm) + Secondary (cancel) grouped consistently | Keep cancel consistent across dialogs; avoid swapping positions between screens. |

### Anti-patterns (button groups)

| Anti-pattern | Why it’s bad | Preferred alternative |
|---|---|---|
| Multiple Primary buttons in one group | Competing emphasis, unclear recommendation | Choose 1 primary; demote others to secondary/tertiary. |
| Zero spacing (buttons touching) | Reads as toggle/segmented control; increases misclick risk | Use 12px gap (token). |
| Mixed sizes in one group | Visual noise; inconsistent hit targets | Use a single size per group. |
| Destructive placed as primary without confirmation | Increases accidental destructive actions | Use destructive styling + confirm for irreversible actions. |


## Layout patterns

- **Toolbar actions**: primary at the start of the action group; overflow less-used actions.
- **Form footer**: Save/Cancel grouped; keep spacing consistent with `Space`.
- **Dialog footer**: align actions consistently; primary action should be visually distinct.

## Anti-patterns

- Multiple primary buttons competing in the same region.
- Using icon-only buttons without tooltip/label.
- Using disabled state to communicate validation errors (use inline errors instead).

## Accessibility essentials

- **Keyboard**: must be reachable by Tab; Activate with Enter/Space.
- **Focus**: visible focus ring; never remove focus outline without replacement.
- **Name**: accessible name comes from visible label; icon-only requires `aria-label`.
- **Loading**: announce loading state; keep button width stable to avoid layout shift.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `button/primary/rounded/md/default`
  - `button/secondary/rounded/md/disabled`
  - `button/destructive/rounded/md/loading`

