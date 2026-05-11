# Component: Select

## Level

Molecular

## Aliases

- dropdown
- picker (web)
- combo box (when searchable)

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/select](https://arco.design/react/components/select)
- Arco 源码（React）: [`arco-design/components/Select`](https://github.com/arco-design/arco-design/tree/main/components/Select)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Select** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 触发器高度、圆角、水平 padding、占位与正文、边框与 **focus / error ring** 以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- **XL / LG / MD / SM** 与 `tokens/src/component.json` 中 `select.layout.xl` / `lg` / `md` / `sm` 对齐；最大宽与 Input 一致时复用 `**input.maxWidth`**（`--component-input-max-width`）。

## Arco API 对齐（摘要）


| Arco `prop`                   | 说明   | 本 demo                                                                 |
| ----------------------------- | ---- | ---------------------------------------------------------------------- |
| `multiple`                    | 多选   | **Kind**：`multiple-tags`（chip 示意）、`multiple-count`（汇总 chip）            |
| `allow-search`                | 可搜索  | **Kind**：`searchable`，下拉内 `input[type=search]` 过滤                      |
| `size` / `error` / `disabled` | 尺寸与态 | 侧栏 **Size**（`data-size`）、**Trigger state**（default / error / disabled） |


## Arco DOM（与 demo 对齐）

- **单选 / 可搜索**：`**button.ds-sel-trg`**，`role="combobox"`，`aria-controls` / `aria-expanded`；`**div#stl.ds-sel-list**`，`role="listbox"`；可见 `**#selDemoLbl**` 满足读屏标签。
- **多选**：Live 中 tags / count 为 **静态示意**（与 Arco 内 tag 结构不要求字符串一致），chip 视觉复用 `**--component-tag-group-*`**。
- 类名前缀 `**ds-sel-***`，不要求与 `arco-select` 字符串一致。

## 推断（Figma 未单独画出的状态）

- **键盘焦点**：触发器使用 `**:focus-visible`** 展示 `**--component-select-trigger-ring-focus**`，避免鼠标点击出现双环。
- **下拉项 Focus 行（矩阵）**：使用 `**inset` + `--component-select-trigger-ring-focus`** 与 Arco 选项聚焦可读性一致。
- **已选值文本色**：规范表为 `**--component-select-trigger-text-focus`**；若与占位对比度不足，以 **token 源** 调整为准（不改为裸 hex）。

## Best practices

- **Use for**: choosing from a list of options (single or multiple).
- **When not to**:
  - Small, mutually exclusive sets → use `Radio`.
  - Boolean → use `Checkbox`/`Switch`.
  - Very large sets → require search/async loading.
- **Content**:
  - Option labels must be clear; include secondary text only if necessary.
  - Show selected value(s) clearly; for many selections, summarize with count.
- **States**: default, focus, disabled, error, loading (async).

## Layout patterns

- **Filter bar**: select + cascader + input combos; keep consistent widths.
- **Form field**: select in a `Form` row; validation shows below.

## Anti-patterns

- Hiding critical options behind long scroll without search.
- Using select as navigation without clear affordance (use `Tabs` or nav patterns).

## Accessibility essentials

- **Keyboard**: open/close with keys; navigate options; select without mouse.
- **Name**: clear label; do not rely on placeholder only.
- **Announce**: selection changes should be perceivable.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `select/single/rounded/md/default`
  - `select/multiple/rounded/md/error`

## Anatomy

### Trigger (single / multiple)

```
┌───────────────────────────────────────────────┐
│ Placeholder / Value(s)                [chev]  │
└───────────────────────────────────────────────┘
```

- **Field container**: background + border + radius
- **Value area**:
  - **Single**: placeholder or selected label
  - **Multiple**:
    - **Style 1 (tags)**: shows selected items as `Selection item` chips
    - **Style 2 (count)**: shows `Selection item` chip + `+N` summary
- **Right slot** (optional, priority order):
  - **Clear** (when can clear)
  - **Dropdown indicator** (chevron)
- **Validation message**: displayed below when `error`

### Selection item (chip inside multiple select)

- **Content**: label + optional close icon
- **Behavior**:
  - Close icon removes that selection (keyboard reachable)
  - When selections exceed available width:
    - Prefer **count style** (`+N`) to preserve layout stability

### Dropdown

- **Dropdown container**: surface + radius + shadow
- **Search box (optional)**: appears at top for large option sets
- **Menu item**:
  - Single-select item (text)
  - Multi-select item (checkbox + text)
- **Extended menu (optional)**: footer area under a divider (e.g. quick add)

## Variants

> 变体命名遵循：`select/<kind>/<shape>/<size>/<state>`


| **Kind**         | **When to use** | **Notes**                     |
| ---------------- | --------------- | ----------------------------- |
| `single`         | 单选一个值           | Trigger 内显示单个 label           |
| `multiple/tags`  | 需要直观看到已选内容      | 多选样式 1：展示 tag（Selection item） |
| `multiple/count` | 已选很多、只关心数量      | 多选样式 2：展示 `+N`，减少拥挤           |
| `searchable`     | 选项多、需要快速定位      | 下拉顶部增加 Search box             |
| `extended-menu`  | 下拉需要扩展操作        | 例如 footer：输入框 + “Add item”    |


## Sizes

> 数值与 **CSS 变量** 对应关系：`tokens/src/component.json` → `select.layout.{xl|lg|md|sm}.`* → `--component-select-layout-{size}-*`（由 `tokens/generate_tokens_css.py` 生成）。


| **Size token** | **Height** | **Radius** | **Chevron size**               | **Typical usage** |
| -------------- | ---------- | ---------- | ------------------------------ | ----------------- |
| `xl`           | 36         | 8          | 12（示意框，见 `layout.xl.chevSize`） | 关键表单字段、密度较低场景     |
| `lg`           | 32         | 6          | 12                             | 默认推荐              |
| `md`           | 28         | 4          | 10                             | 高密度表格/筛选条         |
| `sm`           | 24         | 4          | 10                             | 极高密度（谨慎使用）        |


## States

> 规则：**组件规范只能引用 component tokens**（`var(--component-select-...)`），不要在表格里直接引用 semantic/primitive。

### Trigger — states


| **State** | **Background**                                | **Border**                                        | **Text**                                        | **Icon**                                        | **Ring**                                     |
| --------- | --------------------------------------------- | ------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | -------------------------------------------- |
| Default   | `var(--component-select-trigger-bg-default)`  | `var(--component-select-trigger-border-default)`  | `var(--component-select-trigger-text-default)`  | `var(--component-select-trigger-icon-default)`  | none                                         |
| Hover     | `var(--component-select-trigger-bg-hover)`    | `var(--component-select-trigger-border-hover)`    | `var(--component-select-trigger-text-default)`  | `var(--component-select-trigger-icon-default)`  | none                                         |
| Focus     | `var(--component-select-trigger-bg-focus)`    | `var(--component-select-trigger-border-focus)`    | `var(--component-select-trigger-text-focus)`    | `var(--component-select-trigger-icon-default)`  | `var(--component-select-trigger-ring-focus)` |
| Disabled  | `var(--component-select-trigger-bg-disabled)` | `var(--component-select-trigger-border-disabled)` | `var(--component-select-trigger-text-disabled)` | `var(--component-select-trigger-icon-disabled)` | none                                         |
| Error     | `var(--component-select-trigger-bg-error)`    | `var(--component-select-trigger-border-error)`    | `var(--component-select-trigger-text-focus)`    | `var(--component-select-trigger-icon-default)`  | `var(--component-select-trigger-ring-error)` |


### Placeholder / value text


| **Role**              | **Token**                                     |
| --------------------- | --------------------------------------------- |
| Placeholder           | `var(--component-select-trigger-placeholder)` |
| Value text (single)   | `var(--component-select-trigger-text-focus)`  |
| Value text (multiple) | `var(--component-select-trigger-text-focus)`  |


### Dropdown — states


| **Element**           | **Token**                                  |
| --------------------- | ------------------------------------------ |
| Dropdown bg           | `var(--component-select-dropdown-bg)`      |
| Dropdown shadow       | `var(--component-select-dropdown-shadow)`  |
| Dropdown radius       | `var(--component-select-dropdown-radius)`  |
| Menu item text        | `var(--component-select-item-text)`        |
| Menu item bg default  | `var(--component-select-item-bg-default)`  |
| Menu item bg hover    | `var(--component-select-item-bg-hover)`    |
| Menu item bg selected | `var(--component-select-item-bg-selected)` |


## Layout patterns

- **Form field + validation**:
  - Label 在上或左，Select Trigger 对齐输入控件高度
  - Error message 在下方，与 `Input`/`Form` 的错误样式一致
- **Filter bar**:
  - 多个选择器并排，统一使用同一 Size（推荐 `lg` 或 `md`）
  - 多选默认优先用 **count** 样式避免高度抖动

## Anti-patterns

- 在没有 Label 的情况下只用 placeholder 作为字段名（读屏/记忆负担）
- 多选已选很多但仍强行展示所有 tags（导致布局跳动、难以扫描）
- 下拉没有分组/搜索时仍让用户滚动上百项

## Accessibility essentials

- **Role / semantics**:
  - 单选：Combobox + Listbox（或等价语义）
  - 多选：Combobox + Listbox，选中项可被“移除”
- **Keyboard**:
  - `Enter`/`Space` 打开关闭
  - `↑/↓` 导航选项，`Enter` 选择
  - `Esc` 关闭
  - 多选 tags 的 close 必须可聚焦并可通过键盘删除
- **Screen reader**:
  - 必须有可感知的 Label（不要只靠 placeholder）
  - Error 状态需宣读（关联到错误文本）

## Component token bindings (required)

> 这里的 token 是 **source-of-truth**：`.design-spec/tokens/src/component.json` 里的 `tokens.select.`*。生成结果在 `.design-spec/tokens/dist/tokens.css` 中以 `--component-select-*` 形式出现。

### Trigger


| **Token path**                          | **CSS var**                                    |
| --------------------------------------- | ---------------------------------------------- |
| `tokens.select.trigger.bg.default`      | `--component-select-trigger-bg-default`        |
| `tokens.select.trigger.bg.hover`        | `--component-select-trigger-bg-hover`          |
| `tokens.select.trigger.bg.focus`        | `--component-select-trigger-bg-focus`          |
| `tokens.select.trigger.bg.disabled`     | `--component-select-trigger-bg-disabled`       |
| `tokens.select.trigger.bg.error`        | `--component-select-trigger-bg-error`          |
| `tokens.select.trigger.border.default`  | `--component-select-trigger-border-default`    |
| `tokens.select.trigger.border.hover`    | `--component-select-trigger-border-hover`      |
| `tokens.select.trigger.border.focus`    | `--component-select-trigger-border-focus`      |
| `tokens.select.trigger.border.disabled` | `--component-select-trigger-border-disabled`   |
| `tokens.select.trigger.border.error`    | `--component-select-trigger-border-error`      |
| `tokens.select.trigger.text.default`    | `--component-select-trigger-text-default`      |
| `tokens.select.trigger.text.focus`      | `--component-select-trigger-text-focus`        |
| `tokens.select.trigger.text.disabled`   | `--component-select-trigger-text-disabled`     |
| `tokens.select.trigger.placeholder`     | `--component-select-trigger-placeholder`       |
| `tokens.select.trigger.icon.default`    | `--component-select-trigger-icon-default`      |
| `tokens.select.trigger.icon.disabled`   | `--component-select-trigger-icon-disabled`     |
| `tokens.select.trigger.ring.focus`      | `--component-select-trigger-ring-focus`        |
| `tokens.select.trigger.ring.error`      | `--component-select-trigger-ring-error`        |
| `tokens.select.trigger.chevStrokeWidth` | `--component-select-trigger-chev-stroke-width` |


### Dropdown / menu items


| **Token path**                   | **CSS var**                            |
| -------------------------------- | -------------------------------------- |
| `tokens.select.dropdown.bg`      | `--component-select-dropdown-bg`       |
| `tokens.select.dropdown.shadow`  | `--component-select-dropdown-shadow`   |
| `tokens.select.dropdown.radius`  | `--component-select-dropdown-radius`   |
| `tokens.select.dropdown.offsetY` | `--component-select-dropdown-offset-y` |
| `tokens.select.dropdown.padding` | `--component-select-dropdown-padding`  |
| `tokens.select.item.text`        | `--component-select-item-text`         |
| `tokens.select.item.bg.default`  | `--component-select-item-bg-default`   |
| `tokens.select.item.bg.hover`    | `--component-select-item-bg-hover`     |
| `tokens.select.item.bg.selected` | `--component-select-item-bg-selected`  |


### Layout（触发器 + 选项行，按 size）


| **Token path**                                                        | **CSS var**                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------ |
| `tokens.select.layout.<size>.triggerHeight`（size 为 xl / lg / md / sm） | `--component-select-layout-<size>-trigger-height`      |
| `tokens.select.layout.*.triggerRadius`                                | `--component-select-layout-{size}-trigger-radius`      |
| `tokens.select.layout.*.triggerPaddingX`                              | `--component-select-layout-{size}-trigger-padding-x`   |
| `tokens.select.layout.*.triggerFontSize`                              | `--component-select-layout-{size}-trigger-font-size`   |
| `tokens.select.layout.*.triggerLineHeight`                            | `--component-select-layout-{size}-trigger-line-height` |
| `tokens.select.layout.*.itemHeight`                                   | `--component-select-layout-{size}-item-height`         |
| `tokens.select.layout.*.itemRadius`                                   | `--component-select-layout-{size}-item-radius`         |
| `tokens.select.layout.*.chevSize`                                     | `--component-select-layout-{size}-chev-size`           |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

