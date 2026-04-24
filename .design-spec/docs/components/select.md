# Component: Select

## Level

Molecular

## Aliases

- dropdown
- picker (web)
- combo box (when searchable)

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

| **Kind** | **When to use** | **Notes** |
| --- | --- | --- |
| `single` | 单选一个值 | Trigger 内显示单个 label |
| `multiple/tags` | 需要直观看到已选内容 | 多选样式 1：展示 tag（Selection item） |
| `multiple/count` | 已选很多、只关心数量 | 多选样式 2：展示 `+N`，减少拥挤 |
| `searchable` | 选项多、需要快速定位 | 下拉顶部增加 Search box |
| `extended-menu` | 下拉需要扩展操作 | 例如 footer：输入框 + “Add item” |

## Sizes

| **Size token** | **Height** | **Radius** | **Chevron size** | **Typical usage** |
| --- | ---:| ---:| ---:| --- |
| `xl` | 36 | 8 | 16 | 关键表单字段、密度较低场景 |
| `lg` | 32 | 6 | 16 | 默认推荐 |
| `md` | 28 | 4 | 12 | 高密度表格/筛选条 |
| `sm` | 24 | 4 | 12 | 极高密度（谨慎使用） |

## States

> 规则：**组件规范只能引用 component tokens**（`var(--component-select-...)`），不要在表格里直接引用 semantic/primitive。

### Trigger — states

| **State** | **Background** | **Border** | **Text** | **Icon** | **Ring** |
| --- | --- | --- | --- | --- | --- |
| Default | `var(--component-select-trigger-bg-default)` | `var(--component-select-trigger-border-default)` | `var(--component-select-trigger-text-default)` | `var(--component-select-trigger-icon-default)` | none |
| Hover | `var(--component-select-trigger-bg-hover)` | `var(--component-select-trigger-border-hover)` | `var(--component-select-trigger-text-default)` | `var(--component-select-trigger-icon-default)` | none |
| Focus | `var(--component-select-trigger-bg-focus)` | `var(--component-select-trigger-border-focus)` | `var(--component-select-trigger-text-focus)` | `var(--component-select-trigger-icon-default)` | `var(--component-select-trigger-ring-focus)` |
| Disabled | `var(--component-select-trigger-bg-disabled)` | `var(--component-select-trigger-border-disabled)` | `var(--component-select-trigger-text-disabled)` | `var(--component-select-trigger-icon-disabled)` | none |
| Error | `var(--component-select-trigger-bg-error)` | `var(--component-select-trigger-border-error)` | `var(--component-select-trigger-text-focus)` | `var(--component-select-trigger-icon-default)` | `var(--component-select-trigger-ring-error)` |

### Placeholder / value text

| **Role** | **Token** |
| --- | --- |
| Placeholder | `var(--component-select-trigger-placeholder)` |
| Value text (single) | `var(--component-select-trigger-text-focus)` |
| Value text (multiple) | `var(--component-select-trigger-text-focus)` |

### Dropdown — states

| **Element** | **Token** |
| --- | --- |
| Dropdown bg | `var(--component-select-dropdown-bg)` |
| Dropdown shadow | `var(--component-select-dropdown-shadow)` |
| Dropdown radius | `var(--component-select-dropdown-radius)` |
| Menu item text | `var(--component-select-item-text)` |
| Menu item bg default | `var(--component-select-item-bg-default)` |
| Menu item bg hover | `var(--component-select-item-bg-hover)` |
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

> 这里的 token 是 **source-of-truth**：`.design-spec/tokens/src/component.json` 里的 `tokens.select.*`。生成结果在 `.design-spec/tokens/dist/tokens.css` 中以 `--component-select-*` 形式出现。

### Trigger

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.select.trigger.bg.default` | `--component-select-trigger-bg-default` |
| `tokens.select.trigger.bg.hover` | `--component-select-trigger-bg-hover` |
| `tokens.select.trigger.bg.focus` | `--component-select-trigger-bg-focus` |
| `tokens.select.trigger.bg.disabled` | `--component-select-trigger-bg-disabled` |
| `tokens.select.trigger.bg.error` | `--component-select-trigger-bg-error` |
| `tokens.select.trigger.border.default` | `--component-select-trigger-border-default` |
| `tokens.select.trigger.border.hover` | `--component-select-trigger-border-hover` |
| `tokens.select.trigger.border.focus` | `--component-select-trigger-border-focus` |
| `tokens.select.trigger.border.disabled` | `--component-select-trigger-border-disabled` |
| `tokens.select.trigger.border.error` | `--component-select-trigger-border-error` |
| `tokens.select.trigger.text.default` | `--component-select-trigger-text-default` |
| `tokens.select.trigger.text.focus` | `--component-select-trigger-text-focus` |
| `tokens.select.trigger.text.disabled` | `--component-select-trigger-text-disabled` |
| `tokens.select.trigger.placeholder` | `--component-select-trigger-placeholder` |
| `tokens.select.trigger.icon.default` | `--component-select-trigger-icon-default` |
| `tokens.select.trigger.icon.disabled` | `--component-select-trigger-icon-disabled` |
| `tokens.select.trigger.ring.focus` | `--component-select-trigger-ring-focus` |
| `tokens.select.trigger.ring.error` | `--component-select-trigger-ring-error` |

### Dropdown / menu items

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.select.dropdown.bg` | `--component-select-dropdown-bg` |
| `tokens.select.dropdown.shadow` | `--component-select-dropdown-shadow` |
| `tokens.select.dropdown.radius` | `--component-select-dropdown-radius` |
| `tokens.select.item.text` | `--component-select-item-text` |
| `tokens.select.item.bg.default` | `--component-select-item-bg-default` |
| `tokens.select.item.bg.hover` | `--component-select-item-bg-hover` |
| `tokens.select.item.bg.selected` | `--component-select-item-bg-selected` |

