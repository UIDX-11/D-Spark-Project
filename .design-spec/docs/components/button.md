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

## Variants

### Variant axes

From Figma component properties:

- **Style**: Primary / Secondary / Text / Filled (Surface) / Outline (Dashed)
- **Kind**: Standard / Danger
- **Leading icon**: optional
- **Type**: Regular (text) / Icon-only

### Variants


|          |             |                 |               |                   |                   |                                                     |
| -------- | ----------- | --------------- | ------------- | ----------------- | ----------------- | --------------------------------------------------- |
| **Name** | **Variant** | **Background**  | **Font**      | **Border**        | **Use Case**      | **Intended use**                                    |
| 默认按钮     | Default     | color-primary   | white         | none              | Primary actions   | The default recommended action in a region          |
| 次要按钮     | Secondary   | color-secondary | color-primary | color-neutral-120 | Secondary actions | Alternative actions alongside primary               |
| 辅助按钮     | Tertiary    | color-teritiary | color-primary | none              | Tertiary actions  | Low-emphasis actions, often in toolbars/cards       |
| 幽灵按钮     | Outline     | transparent     | color-primary | none              | Subtle actions    | “Add item / add section” patterns                   |
| 链接       | Link        | transparent     | color-link    | none              |                   | Compact actions in toolbars, tables, dense surfaces |
| 警示/告警按钮  | Destructive | color-error     | white         | none              | Dangerous action  | Delete/disable/irreversible actions                 |

## Sizes

Sizes are defined by height tokens and paired typography/icon sizes.


|          |            |               |               |                 |               |                   |
| -------- | ---------- | ------------- | ------------- | --------------- | ------------- | ----------------- |
| **Size** | **Height** | **Padding X** | **Padding Y** | **Font Size**   | **Icon Size** | **Corner radius** |
| XL       | 36px       | 16px          | 8px           | 14px / Semibold | 16px          | 6px               |
| L        | 32px       | 16px          | 6px           | 14px / Semibold | 16px          | 6px               |
| S        | 28px       | 12px          | 6px           | 12px / Semibold | 12px          | 4px               |
| M        | 24px       | 12px          | 4px           | 12px / Medium   | 12px          | 4px               |


## States


|                  |                |          |             |             |                                                |                                                                    |
| ---------------- | -------------- | -------- | ----------- | ----------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| **State**        | **Background** | **Text** | **Opacity** | **Cursor**  | **When to use**                                | **Minimum requirements**                                           |
| Default          | token          | token    | 1           | pointer     | Resting state                                  | Clear hierarchy; token-based colors.                               |
| Hover            | darker         | token    | 1           | pointer     | Resting state                                  | Clear hierarchy; token-based colors.                               |
| Active / Pressed | darkest        | token    | 1           | pointer     | Provide pressed feedback without layout shift. | Provide pressed feedback without layout shift.                     |
| Focus            | token          | token    | 1           | pointer     | Toggle/selection contexts                      | Selected must be distinguishable from hover/focus; not color-only. |
| Disabled         | muted          | muted-fg | 0.5         | not-allowed | Action is unavailable                          | Don’t use disabled to “explain validation”; show inline errors.    |
| Loading          | token          | token    | 0.7         | wait        |                                                |                                                                    |


### **Anatomy**

```
┌─────────────────────────────────────┐
│  [icon]  Label Text  [icon]         │
└─────────────────────────────────────┘
     ↑                      ↑
  leading icon         trailing icon
```

## Button group

Button groups are used when multiple actions are presented together (toolbars, form footers, dialogs).

### Group layout rules


| Rule               | Recommendation                                                                                    | Rationale                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Group spacing      | **12px gap** between buttons (tokenized)                                                          | Matches the button-group container gap observed in Figma export; keeps groups readable and avoids “toggle-like” confusion. |
| Internal alignment | Align button baselines/heights within a group; do not mix sizes in the same group                 | Prevents jitter and improves scanability.                                                                                  |
| Grouping           | Keep related actions adjacent; separate unrelated action clusters with a larger gap (use `Space`) | Reduces cognitive load in dense B-end toolbars.                                                                            |
| Overflow           | When actions exceed available width, collapse **least-used** actions first into an overflow menu  | Preserves the primary path and avoids layout breakage.                                                                     |


### Ordering rules (primary/secondary/destructive)


| Context                  | Recommended order                                                     | Notes                                                                            |
| ------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Common B-end pages (LTR) | Primary → Secondary → Filled/Tertiary/Text → Destructive (if present) | Keep a single primary per region; destructive should not compete for attention.  |
| Wizard / step actions    | Back/Previous → Next/Continue (Primary)                               | Order should match navigation direction.                                         |
| Dialog footer            | Primary (confirm) + Secondary (cancel) grouped consistently           | Keep cancel consistent across dialogs; avoid swapping positions between screens. |


### Anti-patterns (button groups)


| Anti-pattern                                       | Why it’s bad                                               | Preferred alternative                                       |
| -------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| Multiple Primary buttons in one group              | Competing emphasis, unclear recommendation                 | Choose 1 primary; demote others to secondary/tertiary.      |
| Zero spacing (buttons touching)                    | Reads as toggle/segmented control; increases misclick risk | Use 12px gap (token).                                       |
| Mixed sizes in one group                           | Visual noise; inconsistent hit targets                     | Use a single size per group.                                |
| Destructive placed as primary without confirmation | Increases accidental destructive actions                   | Use destructive styling + confirm for irreversible actions. |


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

