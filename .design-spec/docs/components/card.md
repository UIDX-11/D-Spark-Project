# Component: Card

## Level

Molecular

## Aliases

- panel
- section container
- surface

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/card](https://arco.design/react/components/card)
- Arco 源码（React）: [`arco-design/components/Card`](https://github.com/arco-design/arco-design/tree/main/components/Card)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Card** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 默认卡片：**圆角 12**、**内边距 MD 16 / SM 12**、**分割线上下 12**、标题 **14/20**、正文 **12/18**；与 `tokens/src/component.json` 中 `card.`* 一致。

## Arco API 对齐（摘要）


| Arco `prop`                     | 说明                 | 本 demo                                                                          |
| ------------------------------- | ------------------ | ------------------------------------------------------------------------------- |
| `bordered`                      | 是否显示边框             | **`data-bordered="true                                                          |
| `hoverable`                     | 悬停面变化              | `**data-hoverable="true"**` + `:hover` 使用 `**--component-card-panel-bg-hover**` |
| `size`                          | `medium` / `small` | 侧栏 **Size** → `**data-size="md"` / `"sm"`**（对应 padding token）                   |
| `loading` / `cover` / `actions` | 加载、封面、操作区          | Live 未接；见文档布局模式                                                                 |


## Arco DOM（与 demo 对齐）

- **容器**：`**section.ds-card`**（可点击演示为 `**tabindex="0"`** + `**role="region"**` + `**aria-labelledby**`）。
- **结构**：`**div.ds-card-stack`** 内 `**h3.ds-card-title`** + `**p.ds-card-body**`；分隔为 `**div.ds-card-divider**`（`aria-hidden="true"`）；次行 `**p.ds-card-body.ds-card-body--meta**`。
- **类名前缀**：`ds-card-*`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **可点击焦点环**：`**:focus-visible`** 使用 `**--component-card-clickable-focus-ring`**（与 `**--semantic-focus-ring**` 同源链路的组件别名）。
- **禁用态**：`**data-disabled="true"`** + `**--component-card-disabled-opacity`**。
- **矩阵行 Hover / Focus**：使用 `**is-cd-hover`** / `**is-cd-foc`** 静态类，便于截图与无指针环境稳定对齐。

## Best practices

- **Use for**: grouping related content into a surface with optional header/footer.
- **Header**: title + optional actions; keep actions secondary to the title.
- **Density**: use consistent internal padding from tokens.
- **Dividers**: use tokenized divider styles; avoid overusing borders/shadows.

## Layout patterns

- **Sectioned detail page**: multiple cards, each representing a domain section.
- **Form card**: card header title + form body + footer actions.
- **Dashboard**: grid of cards with consistent height rules.

## Anti-patterns

- Deeply nested cards (visual noise).
- Card used as a generic spacer (use `Space`/layout tokens instead).

## Accessibility essentials

- **Heading structure**: card titles should align with page heading hierarchy.
- **Clickable cards**: if entire card is interactive, provide clear focus/hover and role.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `card/section/rounded/md/default`
  - `card/clickable/rounded/md/focus`

## Sizes


| **Size** | **Padding (px)** | **Title** | **Body** |
| -------- | ---------------- | --------- | -------- |
| `MD`     | 16               | 14 / 20   | 12 / 18  |
| `SM`     | 12               | 14 / 20   | 12 / 18  |


## Component token bindings (required)


| **Token path**                    | **CSS var**                              |
| --------------------------------- | ---------------------------------------- |
| `tokens.card.panel.bg`            | `--component-card-panel-bg`              |
| `tokens.card.panel.bgHover`       | `--component-card-panel-bg-hover`        |
| `tokens.card.panel.radius`        | `--component-card-panel-radius`          |
| `tokens.card.panel.border`        | `--component-card-panel-border`          |
| `tokens.card.panel.borderWidth`   | `--component-card-panel-border-width`    |
| `tokens.card.panel.shadow`        | `--component-card-panel-shadow`          |
| `tokens.card.title.text`          | `--component-card-title-text`            |
| `tokens.card.title.fontSize`      | `--component-card-title-font-size`       |
| `tokens.card.title.lineHeight`    | `--component-card-title-line-height`     |
| `tokens.card.title.fontWeight`    | `--component-card-title-font-weight`     |
| `tokens.card.body.text`           | `--component-card-body-text`             |
| `tokens.card.body.textMeta`       | `--component-card-body-text-meta`        |
| `tokens.card.body.fontSize`       | `--component-card-body-font-size`        |
| `tokens.card.body.lineHeight`     | `--component-card-body-line-height`      |
| `tokens.card.divider.bg`          | `--component-card-divider-bg`            |
| `tokens.card.divider.marginY`     | `--component-card-divider-margin-y`      |
| `tokens.card.divider.thickness`   | `--component-card-divider-thickness`     |
| `tokens.card.layout.paddingMd`    | `--component-card-layout-padding-md`     |
| `tokens.card.layout.paddingSm`    | `--component-card-layout-padding-sm`     |
| `tokens.card.layout.maxWidth`     | `--component-card-layout-max-width`      |
| `tokens.card.layout.titleBodyGap` | `--component-card-layout-title-body-gap` |
| `tokens.card.layout.sectionGap`   | `--component-card-layout-section-gap`    |
| `tokens.card.layout.demoRowGap`   | `--component-card-layout-demo-row-gap`   |
| `tokens.card.clickable.focusRing` | `--component-card-clickable-focus-ring`  |
| `tokens.card.disabled.opacity`    | `--component-card-disabled-opacity`      |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

