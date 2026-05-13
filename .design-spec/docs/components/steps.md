# Component: Steps

## Level

Molecular

## Aliases

- stepper
- process steps
- wizard steps

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/steps](https://arco.design/react/components/steps)
- Arco 源码（React）: [`arco-design/components/Steps`](https://github.com/arco-design/arco-design/tree/main/components/Steps)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **LG / MD** 图标方格、标题/描述字号与行高、连接器长度见 **Sizes**；与 `tokens/src/component.json` 中 `steps.layout.*`、`steps.icon.sizeLg` / `sizeMd`、`steps.connector.*` 一致。

## Arco API 对齐（摘要）


| Arco `prop`          | 说明                        | 本 demo                                             |
| -------------------- | ------------------------- | -------------------------------------------------- |
| `direction`          | `horizontal` / `vertical` | 侧栏 **Layout** → `data-orientation`（`v` 为 vertical） |
| `size`               | 步骤尺寸档                     | 侧栏 **Size** → `data-size`（`lg` / `md`）             |
| `current` / `status` | 当前步与各步状态                  | Live 固定 4 步或 **error** 变体 3 步（当前步为 error）          |
| `onChange` / 可点击步    | 回退已完成步等                   | Live 仅展示态，无点击导航（见文档交互规则）                           |


## Arco DOM（与 demo 对齐）

- **外层**：`**nav.ds-st`** + `**aria-label`**；`**ol.ds-st-list`**（可选 `**role="list"**`）+ `**li.ds-st-item**`。
- **当前步**：`**aria-current="step"`** 落在当前或 error 激活的 `**li`** 上。
- **图标**：`**span.ds-st-icon.ds-st-icon--{completed|current|pending|error|disabled}`** + `**span.ds-st-icon-glyph`**（`aria-hidden="true"`）。
- **文案**：`**p.ds-st-title`**（修饰 `**ds-st-title--current`** 等）、可选 `**p.ds-st-desc**`。
- **连接器**：`**div.ds-st-connector`**，已完成段加 `**ds-st-connector--completed`**。
- 类名前缀 `**ds-st-***`，不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **连接器厚度**：使用 `**--component-steps-connector-thickness`**（token），避免样式中的裸 `1px`。
- **垂直布局**：`direction=vertical` 时连接器为步骤块下方的横线（与横向「段间线」同一 token，布局由 `studio_runtime.css` 机械规则区分）。

## Best practices

- **Use for**: showing progress through a multi-step flow.
- **Keep short**: 3–6 steps recommended; if > 6, consider grouping or using vertical with scroll.
- **Status meaning (from Figma)**:
  - `completed`: check icon
  - `current/in-progress`: filled circle with number
  - `pending`: outlined circle with number + muted text
  - `error`: red circle with close icon + red title
  - `disabled`: muted border/text; not clickable

## Layout patterns

- **Horizontal**: common for wizards and forms.
- **Vertical**: for long step titles/descriptions or sidebars.
- **With description**: title + a short line of description.

## Anti-patterns

- Making future steps clickable without validation (must define rule).
- Using Steps as primary navigation for unrelated pages.
- Hiding error state details; always provide guidance near the step content.

## Accessibility essentials

- Use list semantics: `ol > li`.
- Current step: `aria-current="step"`.
- Completed steps can be links/buttons if clickable; otherwise plain text.
- Error step should be announced; provide `aria-describedby` for error message in content region.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `steps/horizontal/connected/lg/default`
  - `steps/vertical/connected/md/with-description`
  - `steps/horizontal/connected/lg/error`

## Anatomy

```
[icon/number] Title
            (optional) Description
            (optional) Connector line to next
```

## Variants


| **Kind**           | **Orientation**     | **Connector** | **Description**      |
| ------------------ | ------------------- | ------------- | -------------------- |
| `default`          | horizontal          | optional      | title only           |
| `with-description` | horizontal/vertical | optional      | title + description  |
| `vertical`         | vertical            | optional      | better for long text |


## Sizes (from Figma)


| **Size** | **Step icon box** | **Title** | **Desc** | **Connector length** |
| -------- | ----------------- | --------- | -------- | -------------------- |
| `LG`     | 28                | 16 / 22   | 14 / 20  | 28                   |
| `MD`     | 24                | 14 / 20   | 14 / 20  | 28                   |


## States


| **State**   | **Icon**              | **Title color**    | **Connector** |
| ----------- | --------------------- | ------------------ | ------------- |
| `completed` | check                 | primary            | solid (dark)  |
| `current`   | filled number         | primary (semibold) | subtle        |
| `pending`   | outlined number       | secondary          | subtle        |
| `error`     | red close             | danger             | subtle        |
| `disabled`  | muted outlined number | muted              | subtle        |


## Executable interaction rules

### Step navigation policy (required)

- **Default**: user may go back to any completed step.
- User may not jump forward beyond the first pending step unless `allowSkip=true`.
- When a user clicks a completed step, navigate and preserve previously entered data.

### Validation gate

- On “Next”, validate current step fields.
- If invalid, keep current step, mark state `error`, and focus first invalid field.

### Connector logic

- Connector reflects completion:
  - connector before current: `completed` style
  - connector after current: `pending` style

### Keyboard

- If steps are clickable: each step title is focusable.
- Enter/Space activates navigation.

## Component token bindings (required)


| **Token path**                          | **CSS var**                                     |
| --------------------------------------- | ----------------------------------------------- |
| `tokens.steps.layout.titleFontSizeLg`   | `--component-steps-layout-title-font-size-lg`   |
| `tokens.steps.layout.titleLineHeightLg` | `--component-steps-layout-title-line-height-lg` |
| `tokens.steps.layout.titleFontSizeMd`   | `--component-steps-layout-title-font-size-md`   |
| `tokens.steps.layout.titleLineHeightMd` | `--component-steps-layout-title-line-height-md` |
| `tokens.steps.layout.descFontSize`      | `--component-steps-layout-desc-font-size`       |
| `tokens.steps.layout.descLineHeight`    | `--component-steps-layout-desc-line-height`     |
| `tokens.steps.layout.iconInnerFontLg`   | `--component-steps-layout-icon-inner-font-lg`   |
| `tokens.steps.layout.iconInnerLineLg`   | `--component-steps-layout-icon-inner-line-lg`   |
| `tokens.steps.layout.iconInnerFontMd`   | `--component-steps-layout-icon-inner-font-md`   |
| `tokens.steps.layout.iconInnerLineMd`   | `--component-steps-layout-icon-inner-line-md`   |
| `tokens.steps.icon.sizeLg`              | `--component-steps-icon-size-lg`                |
| `tokens.steps.icon.sizeMd`              | `--component-steps-icon-size-md`                |
| `tokens.steps.icon.bgCurrent`           | `--component-steps-icon-bg-current`             |
| `tokens.steps.icon.bgCompleted`         | `--component-steps-icon-bg-completed`           |
| `tokens.steps.icon.borderPending`       | `--component-steps-icon-border-pending`         |
| `tokens.steps.icon.borderDisabled`      | `--component-steps-icon-border-disabled`        |
| `tokens.steps.icon.bgError`             | `--component-steps-icon-bg-error`               |
| `tokens.steps.icon.borderCompleted`     | `--component-steps-icon-border-completed`       |
| `tokens.steps.icon.textOnCurrent`       | `--component-steps-icon-text-on-current`        |
| `tokens.steps.icon.textPending`         | `--component-steps-icon-text-pending`           |
| `tokens.steps.icon.textDisabled`        | `--component-steps-icon-text-disabled`          |
| `tokens.steps.title.text`               | `--component-steps-title-text`                  |
| `tokens.steps.title.textCurrent`        | `--component-steps-title-text-current`          |
| `tokens.steps.title.textPending`        | `--component-steps-title-text-pending`          |
| `tokens.steps.title.textError`          | `--component-steps-title-text-error`            |
| `tokens.steps.title.textDisabled`       | `--component-steps-title-text-disabled`         |
| `tokens.steps.desc.text`                | `--component-steps-desc-text`                   |
| `tokens.steps.connector.track`          | `--component-steps-connector-track`             |
| `tokens.steps.connector.trackCompleted` | `--component-steps-connector-track-completed`   |
| `tokens.steps.connector.length`         | `--component-steps-connector-length`            |
| `tokens.steps.connector.thickness`      | `--component-steps-connector-thickness`         |
| `tokens.steps.gap`                      | `--component-steps-gap`                         |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

