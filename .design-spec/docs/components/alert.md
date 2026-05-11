# Component: Alert

## Level

Molecular

## Aliases

- banner
- inline notice
- status message

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/alert](https://arco.design/react/components/alert)
- Arco 源码（React）: [`arco-design/components/Alert`](https://github.com/arco-design/arco-design/tree/main/components/Alert)
- Figma（Light，视觉真源）: [D.S. Web Com — Alert 节点](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124872-121819)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 像素、间距、圆角、字号、色以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- **Sizes** 与 `tokens/src/component.json` 中 `alert.layout.*`、`alert.radius*`、`alert.px` 对齐；Figma 变更时先改 token，再更新本文与生成 HTML。

## Arco API 对齐（摘要）


| Arco `prop` / 子节点 | 取值 / 默认             | 设计稿 / demo 说明                                                         |
| ------------------ | ------------------- | --------------------------------------------------------------------- |
| `type`             | `info`              | `success`                                                             |
| `show-icon`        | `boolean`，默认 `true` | `normal` 且无自定义图标时 Arco 默认不显示图标；demo 勾选框对齐。                        |
| `closable`         | 默认 `false`          | 勾选后渲染 `div.ds-alert-close-btn`。                                       |
| `title`            | 可选                  | 勾选 **title** 时根加 `with-title`，进入标题版式。                                 |
| `action`           | 可选 ReactNode        | 勾选 **action** 时渲染 `Detail` 按钮。                                   |
| `banner`           | `boolean`           | 勾选后 `is-banner`：去圆角与描边（与 Arco 一致）。                                    |
| `center`           | `boolean`           | 与 `banner` 等组合；`is-center` + body `flex: initial` 与 Arco 一致。          |
| `closeElement`     | 可选                  | 勾选 **自定义关闭元素** 时关闭区为文案样式（`is-slot`）。                       |
| `size`             | Arco 文档中的档位         | demo 用 **LG / MD / AUTO** 映射见 **Sizes**（对应 `is-md`、`is-auto` 与默认 LG）。 |


## Arco DOM（与 demo 对齐）

Arco Design Web React `Alert` 结构要点：根 `**div[role="alert"]`** → 可选图标区 → `**div` body**（可选 title + content）→ 可选 action 外包层 → 可选关闭区（**非**原生 `<button>` 时为 `div` + `role="button"`）。

本仓库 Live / 矩阵类名前缀为 `**ds-alert`**，子节点顺序与 Arco 一致；关闭节点为 `**div.ds-alert-close-btn`**，`tabindex="-1"`，`aria-label="Close"`。

## Best practices

- **Use for**: communicating important status/feedback within the page (not blocking).
- **Type choice** (from Figma guidance):
  - Use **Warning (orange)** when it impacts other modules/pages, has irreversible consequences, has missing critical info, or affects business goal/value.
  - Otherwise use **Info (blue)**.
- **Keep concise**: 1–2 lines preferred; for longer content, use multiline variant.
- **Actions**: only include a single secondary action (e.g., “Detail”) when it helps resolve the issue.
- **Closable**: close is optional; if the alert can be dismissed permanently, persist that choice (product-dependent).

## Layout patterns

- **Form**: show above the form group for global guidance.
- **Page**: show at top of a section as a banner-like inline block.

## Count badge

当需要在 Alert 内同时传达 **状态文案** 与 **可量化提醒**（未读数、待办条数等）时，使用 **count badge** 与 Alert **组合**，而不是把数字硬塞进一句长文案里。

- **Arco 对齐**：React `Alert` **没有** `count` / `badge` 一类独立 prop；数量由 `**Badge`**（`count` / `dot` / `status`）或自定义节点插入 `**title`**、**内容区** 或 `**action**` 区域实现，顺序与 DOM 以 Arco `Alert` 实现为准。
- **视觉与 token**：数字徽章的尺寸、圆角、上限展示（如 `99+`）、`0` 是否隐藏等，遵循 **[Badge](badge.md)** 与 `tokens/src/component.json` 的 `**badge`** 段；Alert 容器仍只用 `**alert.*`** 色面与内边距，**不在 Alert token 里重复定义徽章色**（治理：先复用 Badge / semantic）。
- **版式建议**：
  - **标题行**：`title` 内「标题文案 + Badge」横向排列，徽章紧贴标题或置于标题尾侧（以 Figma 为准）。
  - **正文行**：单行 Alert 可在主文案**起笔前**或**句末**放小号 count，注意与左侧图标的间距 ≥ `alert.layout.gap` 的语义等价（可用 `gap` / `margin-inline` token 化）。
  - **操作区**：与 `action` 内按钮并列时，徽章仅作补充计数，**主操作仍应是可聚焦控件**（按钮/链接）。
- **无障碍**：由**宿主**提供读屏名称（例如 `aria-label="3 条待处理"` 或在可见文案中写出数量）；勿仅用裸数字徽章作为唯一信息。
- **命名示例**：`alert/warning/rounded/lg/with-count-badge`（variant 轴上的扩展，实现上 = Alert + Badge 组合）。

> 当前 `.design-spec` HTML demo **未**内置 Count 开关；落地页实现时在 MD 与生成器侧补齐示例即可。

## Anti-patterns

- Using Alert for blocking confirmations (use Modal).
- Auto-dismissing critical warnings/errors (should remain until resolved).
- Showing multiple alerts stacked without prioritization (collapse into one summary).

## Accessibility essentials

- **Role**: Arco Design Web React 源码根节点为 `**role="alert"`**（所有 `type` 一致）。若产品需区分 polite / assertive，可在封装层按类型覆盖为 `status` 等（非 Arco 默认）。
- **Close**: 与 Arco 一致为 `**div.ds-alert-close-btn`**，`tabindex="-1"`，`role="button"`，`aria-label="Close"`（非原生 `<button>`）。
- **Focus**: do not steal focus on render; if triggered by a user action, optionally move focus to the alert region (product-dependent).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `alert/info/rounded/lg/default`
  - `alert/warning/rounded/md/closable`
  - `alert/error/rounded/lg/with-title`
  - `alert/success/rounded/auto/multiline`
  - `alert/info/rounded/lg/with-count-badge`

## Anatomy

- **DOM（对齐 Arco Design Web React `Alert`）**：根 `**div[role="alert"]`** → 可选 `**div.ds-alert-icon`**（`icon`）→ `**div.ds-alert-body`**（内为可选 `**div.ds-alert-title**`（`title`）+ `**div.ds-alert-content**`（`children`））→ 可选 `**div.ds-alert-action**`（`action` 外包层）→ 可选 `**div.ds-alert-close-btn**`（`closeElement` / 默认关闭）。
- **Vertical alignment**: 有 `title` 时（根带 `with-title`），左侧状态图标与**标题首行**垂直居中对齐；无 `title` 时，图标与 `**.ds-alert-content`** 块垂直居中对齐（含多行时与正文块整体居中）。

### Default (single line)

```
[icon] Message text                (optional) [Detail] [x]
```

### Multiline

```
[icon] Message text... (wrap)
                (optional) [Detail] [x]
```

### With title

```
[icon] Title
       Message text...              (optional) [Detail] [x]
```

## Variants


| **Kind**        | **Has title** | **Multiline** | **Action slot** | **Closable** | **Notes**              |
| --------------- | ------------- | ------------- | --------------- | ------------ | ---------------------- |
| `default`       | no            | no            | optional        | optional     | base line              |
| `multiline`     | no            | yes           | optional        | optional     | wraps text             |
| `with-title`    | yes           | optional      | optional        | optional     | title + content        |
| `banner-center` | optional      | optional      | optional        | optional     | Arco `banner + center` |


## Types (tones)


| **Type**       | **Meaning**            | **Container bg token**                   | **Icon token**                             | **Arco note**                                         |
| -------------- | ---------------------- | ---------------------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| `info` (提示)    | informational guidance | `var(--component-alert-tone-info-bg)`    | `var(--component-alert-tone-info-icon)`    | default type                                          |
| `success` (成功) | operation success      | `var(--component-alert-tone-success-bg)` | `var(--component-alert-tone-success-icon)` | -                                                     |
| `warning` (警告) | needs attention        | `var(--component-alert-tone-warning-bg)` | `var(--component-alert-tone-warning-icon)` | -                                                     |
| `error` (错误)   | failure/blocked        | `var(--component-alert-tone-error-bg)`   | `var(--component-alert-tone-error-icon)`   | Arco 根仍为 `role="alert"`                               |
| `normal` (中性)  | neutral notice         | `var(--component-alert-tone-normal-bg)`  | `var(--component-alert-tone-normal-icon)`  | Arco 2.41+；默认不展示图标；边框 `var(--semantic-border-subtle)` |


## Sizes

Live 侧栏 **Size** 与 **Figma / token**、demo 类名对应如下（Light）。


| Demo `pgSize` | 含义（Figma）                                                              | 主要 CSS 变量                                                                                                                             |
| ------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `lg`（默认）      | LG：高度随内容；水平 16；垂直对称 11 / 11（总 22px，单行+图标在色块内几何居中；不对称 14/8 会使正文相对整框略偏下） | `--component-alert-px`、`--component-alert-layout-lg-padding-top` / `padding-bottom`、`--component-alert-radius-lg`                     |
| `md`          | MD：`min-height` 32；水平 16；垂直对称 6；圆角 6                                   | `--component-alert-px`、`--component-alert-layout-md-min-height`、`--component-alert-layout-md-padding-y`、`--component-alert-radius-md` |
| `auto`        | AUTO / 多行或标题场景：上 14 / 下 12                                             | `--component-alert-layout-auto-padding-top` / `padding-bottom`、`--component-alert-px`、`--component-alert-radius-lg`                   |


> Arco Design Web React `size` 枚举与 Figma **LG/MD/AUTO** 命名若不一致，以上表 **token** 为桥梁；请在 Figma Variables 与 `alert.layout.*` 间维护对照（见 `ALIGNMENT_GOVERNANCE` §2）。

## States


| **Part**             | **Token**                              |
| -------------------- | -------------------------------------- |
| Text                 | `var(--component-alert-text)`          |
| Title text           | `var(--component-alert-title-text)`    |
| Close icon           | `var(--component-alert-close-icon)`    |
| Action text (Detail) | `var(--component-alert-action-text)`   |
| Action border        | `var(--component-alert-action-border)` |


## Arco API 细则（与 React 文档一致）


| **Prop/slot/event**     | **Rule**                                                                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                  | supports `info/success/warning/error/normal`                                                                                                 |
| `show-icon`             | default `true`; for `normal`, default visual is no icon                                                                                      |
| `closable`              | default `false`; close element appears only when enabled                                                                                     |
| `title` / `#title`      | when present, switches to title layout                                                                                                       |
| `#action`               | optional action area, typically one secondary action                                                                                         |
| `banner`                | removes border and radius                                                                                                                    |
| `center`                | 与 Arco 一致：`justify-content: center`，且 **body 为 `flex: initial`**（非 `flex:1`），使图标 + 正文 + 操作/关闭作为一整块水平居中；勿对尾部操作区使用会吃掉剩余空间的 `margin-left: auto` |
| `#close-element`        | allows custom close element                                                                                                                  |
| `close` / `after-close` | close click and after animation lifecycle                                                                                                    |


## Executable interaction rules

### Close

- Close 节点（`div.ds-alert-close-btn`）仅在 `closable=true` 时渲染（与 Arco 一致）。
- 点击关闭区域会隐藏 Alert（demo 直接 `remove()`；Arco 为 `visible=false` + 过渡）。
- If the alert represents a persistent state (e.g., “Missing required config”), closing should be disabled or the alert should reappear on next render (product-dependent).
- `#close-element` 替换默认关闭展示内容，仍挂在 `**div.ds-alert-close-btn**` 上并保留关闭行为。

### Action button (Detail)

- Action is optional.
- Action should open contextual help (drawer/modal) or navigate to the relevant setting page.

### Auto-dismiss

- **Info** may auto-dismiss (optional) if it’s purely confirmational and not tied to unresolved state.
- **Warning/Error** must not auto-dismiss.
- `normal` follows product policy; default is non-auto-dismiss like other inline notices.

### Keyboard

- Arco 关闭节点为 `**tabindex="-1"`**，默认**不参与** Tab 顺序；可操作区为 `**div.ds-alert-action` 内真实控件**（如 `<button>`）走常规 Tab。
- Enter/Space activates focused **action** button when applicable.

## Component token bindings (required)


| **Token path**                                          | **CSS var**                                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `tokens.alert.tone.info.bg`                             | `--component-alert-tone-info-bg`                                                                |
| `tokens.alert.tone.info.icon`                           | `--component-alert-tone-info-icon`                                                              |
| `tokens.alert.tone.success.`*                           | `--component-alert-tone-success-bg` / `…-icon`                                                  |
| `tokens.alert.tone.warning.`*                           | `--component-alert-tone-warning-bg` / `…-icon`                                                  |
| `tokens.alert.tone.error.`*                             | `--component-alert-tone-error-bg` / `…-icon`                                                    |
| `tokens.alert.tone.normal.bg`                           | `--component-alert-tone-normal-bg`                                                              |
| `tokens.alert.tone.normal.icon`                         | `--component-alert-tone-normal-icon`                                                            |
| `tokens.alert.text`                                     | `--component-alert-text`                                                                        |
| `tokens.alert.titleText`                                | `--component-alert-title-text`                                                                  |
| `tokens.alert.closeIcon`                                | `--component-alert-close-icon`                                                                  |
| `tokens.alert.actionText`                               | `--component-alert-action-text`                                                                 |
| `tokens.alert.actionBorder`                             | `--component-alert-action-border`                                                               |
| `tokens.alert.radiusLg` / `radiusMd`                    | `--component-alert-radius-lg` / `--component-alert-radius-md`                                   |
| `tokens.alert.px`                                       | `--component-alert-px`                                                                          |
| `tokens.alert.layout.gap`                               | `--component-alert-layout-gap`                                                                  |
| `tokens.alert.layout.lg.paddingTop` / `paddingBottom`   | `--component-alert-layout-lg-padding-top` / `…-bottom`                                          |
| `tokens.alert.layout.md.minHeight` / `paddingY`         | `--component-alert-layout-md-min-height` / `…-padding-y`                                        |
| `tokens.alert.layout.auto.paddingTop` / `paddingBottom` | `--component-alert-layout-auto-padding-top` / `…-bottom`                                        |
| `tokens.alert.layout.icon.size` / `glyphFontSize`       | `--component-alert-layout-icon-size` / `…-glyph-font-size`                                      |
| `tokens.alert.layout.withTitleIconMarginTop`            | `--component-alert-layout-with-title-icon-margin-top`                                           |
| `tokens.alert.layout.closeSlotPaddingX`                 | `--component-alert-layout-close-slot-padding-x`                                                 |
| `tokens.alert.layout.title.`*                           | `--component-alert-layout-title-font-size` / `…-line-height` / `…-margin-bottom`                |
| `tokens.alert.layout.content.`*                         | `--component-alert-layout-content-font-size` / `…-line-height`                                  |
| `tokens.alert.actionButton.*`                           | `--component-alert-action-button-radius` / `height` / `padding-x` / `font-size` / `line-height` |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

