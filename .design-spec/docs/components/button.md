# Component: Button

## Level

Molecular

## Aliases

- action button
- CTA
- primary action / secondary action

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/button](https://arco.design/react/components/button)
- Arco 源码（React）: [`arco-design/components/Button`](https://github.com/arco-design/arco-design/tree/main/components/Button)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Button** 画板，将本行替换为带 `node-id=` 的深链接。

## Figma

- 像素、间距、圆角、字号、色、阴影以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准（见 `docs/ALIGNMENT_GOVERNANCE.md`）。
- 下方 **Sizes** 与 `tokens/src/component.json` 中 `button.layout.`* 对齐；Figma 变更时先改 token，再更新本文与生成 HTML。

## Arco API 对齐（摘要）


| Arco `prop`                     | 取值 / 默认                                                                 | 设计稿 / demo 说明                                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `type`                          | `primary` | `secondary` | `dashed` | `outline` | `text`（默认 `secondary`） | demo 侧栏 **Variant** 映射：`primary`→Primary，`neutral`→Secondary 面、`ghost`→Outline、`danger`→警示；`dashed` / `text` 待与 Figma 对齐后补充矩阵行。 |
| `status`                        | `normal` | `warning` | `success` | `danger`                             | 当前 token 集以 **normal** 为主；`warning/success` 待 Figma 与 token 扩展。                                                                 |
| `size`                          | `mini` | `small` | `medium` | `large`（默认 `medium`）                      | Live **Size**：`sm`→small、`md`→medium、`lg`→large（与 Figma XL/L/M 命名对照见 Sizes）。                                                    |
| `long`                          | `boolean`                                                               | 未在静态矩阵展示；需时由 token 控制宽度。                                                                                                        |
| `loading` / `loadingFixedWidth` | `boolean`                                                               | **推断**：与 Arco 一致——`loading` 时首子节点为图标区（见 DOM）；`loadingFixedWidth` 保持宽度；demo 后续可加重开关。                                             |
| `disabled`                      | `boolean`                                                               | 矩阵第 5 行。                                                                                                                        |
| `htmlType`                      | `button` | `submit` | `reset`                                           | Live 使用 `type="button"`。                                                                                                        |
| `autofocus`                     | `boolean`                                                               | 默认 false；demo 不开启。                                                                                                              |
| `href`                          | `string`                                                                | 有 `href` 时 Arco 渲染 `<a>`；本页 Live 为 `<button>` 形态。                                                                               |


## Arco DOM（与 demo 对齐）

Arco Design Web React `Button`（无 `href`）典型结构为：`<button>` 内可选 `icon` 子节点 + 文本 `children`；`loading` 时展示加载图标区。

```tsx
<Button type="button" loading={…} disabled={…} onClick={…}>
  {icon}{children}
</Button>
```

本仓库 **Live** 在仅有文案、无 `loading` / `icon` 时 **不渲染** 图标容器，与 Arco 行为一致。类名前缀使用 `**ds-btn**`，子节点顺序与 Arco 相同。

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

From component spec properties:

- **Style**: Primary / Secondary / Text / Filled (Surface) / Outline (Dashed)
- **Kind**: Standard / Danger
- **Leading icon**: optional
- **Type**: Regular (text) / Icon-only

### Variants


|          |             |                                              |                                                |                                                  |                   |                                                     |
| -------- | ----------- | -------------------------------------------- | ---------------------------------------------- | ------------------------------------------------ | ----------------- | --------------------------------------------------- |
| **Name** | **Variant** | **Background**                               | **Font**                                       | **Border**                                       | **Use Case**      | **Intended use**                                    |
| 默认按钮     | Default     | `var(--component-button-primary-bg-default)` | `var(--component-button-primary-text-default)` | none                                             | Primary actions   | The default recommended action in a region          |
| 次要按钮     | Secondary   | `var(--component-button-neutral-bg-default)` | `var(--component-button-neutral-text-default)` | `var(--component-button-neutral-border-default)` | Secondary actions | Alternative actions alongside primary               |
| 辅助按钮     | Tertiary    | `var(--component-button-neutral-bg-default)` | `var(--component-button-neutral-text-default)` | none                                             | Tertiary actions  | Low-emphasis actions, often in toolbars/cards       |
| 幽灵按钮     | Outline     | transparent                                  | `var(--component-button-neutral-text-default)` | `var(--component-button-outline-border-default)` | Subtle actions    | “Add item / add section” patterns                   |
| 链接       | Link        | transparent                                  | `var(--component-button-link-text-default)`    | none                                             | Inline actions    | Compact actions in toolbars, tables, dense surfaces |
| 警示/告警按钮  | Destructive | `var(--component-button-danger-bg-default)`  | `var(--component-button-danger-text-default)`  | none                                             | Dangerous action  | Delete/disable/irreversible actions                 |


## Sizes

Live 预览三档高度与 **Arco `size`**、`**button.layout.live***` token 对应如下（Light）。


| Demo `pgSize` | Arco `size` | 高度 token                                   | 水平内边距 token                                      | 字号 / 行高 token                                                                            |
| ------------- | ----------- | ------------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `lg`          | `large`     | `--component-button-layout-live-height-lg` | `--component-button-layout-live-padding-xlarge`  | `--component-button-layout-live-font-size-lg` / `--component-button-layout-live-line-lg` |
| `md`          | `medium`    | `--component-button-layout-live-height-md` | `--component-button-layout-live-padding-xmedium` | `--component-button-layout-live-font-size-md` / `--component-button-layout-live-line-md` |
| `sm`          | `small`     | `--component-button-layout-live-height-sm` | `--component-button-layout-live-padding-xsmall`  | `--component-button-layout-live-font-size-sm` / `--component-button-layout-live-line-sm` |


> 文档表格中的 XL/L/S/M 命名与 Figma 控件命名对齐时，请在 **Figma Variables** 与上表 token 间维护一行对照（见 `ALIGNMENT_GOVERNANCE` §2）。

## Component token bindings (required)

All values below must come from component tokens (`.design-spec/tokens/src/component.json`) which in turn must reference semantic tokens only.

### Primary (Style: Primary) — states


| State            | Background                                    | Text                                            |
| ---------------- | --------------------------------------------- | ----------------------------------------------- |
| Default          | `var(--component-button-primary-bg-default)`  | `var(--component-button-primary-text-default)`  |
| Hover            | `var(--component-button-primary-bg-hover)`    | `var(--component-button-primary-text-hover)`    |
| Active / Pressed | `var(--component-button-primary-bg-active)`   | `var(--component-button-primary-text-active)`   |
| Disabled         | `var(--component-button-primary-bg-disabled)` | `var(--component-button-primary-text-disabled)` |


### Neutral surfaces (Style: Secondary / Tertiary) — states


| State            | Background                                    | Text                                            | Border                                            |
| ---------------- | --------------------------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| Default          | `var(--component-button-neutral-bg-default)`  | `var(--component-button-neutral-text-default)`  | `var(--component-button-neutral-border-default)`  |
| Hover            | `var(--component-button-neutral-bg-hover)`    | `var(--component-button-neutral-text-hover)`    | `var(--component-button-neutral-border-hover)`    |
| Active / Pressed | `var(--component-button-neutral-bg-active)`   | `var(--component-button-neutral-text-active)`   | `var(--component-button-neutral-border-active)`   |
| Disabled         | `var(--component-button-neutral-bg-disabled)` | `var(--component-button-neutral-text-disabled)` | `var(--component-button-neutral-border-disabled)` |


### Layout & focus（`button.layout` / `button.focusRing`）


| Token path                      | CSS variable                                                     |
| ------------------------------- | ---------------------------------------------------------------- |
| `tokens.button.layout.live.`*   | `--component-button-layout-live-*`（Live 三档尺寸）                    |
| `tokens.button.layout.matrix.*` | `--component-button-layout-matrix-*`（状态矩阵静态按钮）                   |
| `tokens.button.layout.static.*` | `--component-button-layout-static-*`（文档区静态预览 `.btn`）             |
| `tokens.button.focusRing`       | `--component-button-focus-ring`（`:focus-visible`，对齐 Arco 可见焦点行为） |


### Group spacing（semantic）


| Token path                     | CSS variable                                      |
| ------------------------------ | ------------------------------------------------- |
| `tokens.layout.buttonGroupGap` | `--semantic-layout-button-group-gap`（按钮组水平 `gap`） |

定义来源：`semantic.json` → `layout.buttonGroupGap`；生成 `tokens/dist/tokens.css`。**落地**：`generator/studio_runtime.css` 与生成 HTML demo 中按钮行（`.b-row`）使用 `gap: calc(var(--semantic-layout-button-group-gap) * 1px)`。


## Interaction & cursor


|                  |                |              |             |             |                                 |                                                                 |
| ---------------- | -------------- | ------------ | ----------- | ----------- | ------------------------------- | --------------------------------------------------------------- |
| **State**        | **Background** | **Text**     | **Opacity** | **Cursor**  | **When to use**                 | **Minimum requirements**                                        |
| Default          | See bindings   | See bindings | 1           | pointer     | Resting state                   | Clear hierarchy; token-based colors.                            |
| Hover            | See bindings   | See bindings | 1           | pointer     | Pointer hover on web            | Must not be the only affordance; keep contrast.                 |
| Active / Pressed | See bindings   | See bindings | 1           | pointer     | Pointer down / pressed feedback | No layout shift; avoid motion that feels like “disabled”.       |
| Focus            | See bindings   | See bindings | 1           | pointer     | Keyboard focus                  | Visible focus ring; never rely on color-only to indicate focus. |
| Disabled         | See bindings   | See bindings | 1           | not-allowed | Action is unavailable           | Don’t use disabled to “explain validation”; show inline errors. |
| Loading          | See bindings   | See bindings | 1           | wait        | Async in progress               | Keep width stable; announce loading; prevent double-submit.     |


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


| Rule               | Recommendation                                                                                    | Rationale                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Group spacing      | `gap: calc(var(--semantic-layout-button-group-gap) * 1px)` between buttons                        | Keeps groups readable and avoids “toggle-like” confusion. |
| Internal alignment | Align button baselines/heights within a group; do not mix sizes in the same group                 | Prevents jitter and improves scanability.                 |
| Grouping           | Keep related actions adjacent; separate unrelated action clusters with a larger gap (use `Space`) | Reduces cognitive load in dense B-end toolbars.           |
| Overflow           | When actions exceed available width, collapse **least-used** actions first into an overflow menu  | Preserves the primary path and avoids layout breakage.    |


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
| Zero spacing (buttons touching)                    | Reads as toggle/segmented control; increases misclick risk | Use `semantic.layout.buttonGroupGap`（见上表）。                  |
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

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

