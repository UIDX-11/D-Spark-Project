# Component: Notification

## Level

Molecular

## Aliases

- toast notification
- notification panel
- notification card

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/notification](https://arco.design/react/components/notification)
- Arco 源码（React）: [`arco-design/components/Notification`](https://github.com/arco-design/arco-design/tree/main/components/Notification)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Notification** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **卡片**：宽度 **`notification.w`**（304）、内边距 **`notification.p`**（16）、圆角 **`notification.panel.radius`**、投影 **`notification.panel.shadow`**。
- **Tone 底**：info / success / warning / error 使用对应 **`notification.tone.*.bg`** 与 **`notification.tone.*.icon`**；**default** 仅 **`notification.tone.default.bg`**（无左侧 tone 图标槽）。
- **文案**：标题与描述色 **`notification.titleText`**、**`notification.bodyText`**；关闭 **`notification.closeIcon`**。
- **操作区**：与正文间距 **`notification.actions.mt`**，按钮间距 **`notification.actions.gap`**。

## Arco API 对齐（摘要）

| Arco `option` / 行为 | 说明 | 本 demo |
| -------------------- | ---- | ------- |
| `type` | info / success / warning / error / normal | 侧栏 **Type** → **`data-tone`**（`default` 对应无图标的 neutral 卡片） |
| `title` / `content` | 标题与正文 | **`.ds-ntf-title`** / **`.ds-ntf-desc`** |
| `closable` | 显示关闭 | 侧栏 **closable** 勾选控制 **`button.ds-ntf-close`** |
| `btn` / 自定义操作 | 底部按钮 | 侧栏 **actions** 勾选渲染 **`.ds-ntf-actions`** |
| `duration` / 队列 | 自动关闭与堆叠 | Live 为静态结构与 **a11y** 示意，不挂计时器 |

## Arco DOM（与 demo 对齐）

- **根**：`**div#ntfRoot.ds-ntf**`（`**data-tone**`），**`role="status"`** 或 **`role="alert"`**（**error**）。
- **关闭**：**`button.ds-ntf-close`**，`aria-label="Close notification"`。
- **头行**：**`.ds-ntf-head`**，可选 **`span.ds-ntf-ic`** + **`.ds-ntf-head-text`** 内 **`p.ds-ntf-title`**。
- **描述**：**`p.ds-ntf-desc`**。
- **操作**：**`.ds-ntf-actions`** 内 **`button.ds-ntf-btn`**、主按钮 **`button.ds-ntf-btn.ds-ntf-btn--pri`**。
- **类名前缀**：`ds-ntf-*`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **矩阵 Hover**：第二行 **`is-hov`** 使用轻微 **`filter: brightness(0.98)`** 表示悬停方向（与全局 toast 行为一致方向）。
- **主操作按钮**：使用 **`--semantic-action-primary-*`** 作为 **OK** 填充，与系统主按钮语义一致。

## Best practices

- **Use for**: non-blocking but higher-information feedback than `Message` (can include title, description, actions).
- **Keep concise**: title + 1–2 lines description; avoid long content (use Modal/Drawer).
- **Stacking**: limit visible count; merge duplicates when appropriate.
- **Action**: keep actions short; primary action must be obvious and safe.

## Layout patterns

- **Top-right stack**: typical for B-end SaaS; stacked vertically.
- **With actions**: Cancel + primary action (from Figma).
- **Closable**: close icon in top-right of card.

## Anti-patterns

- Using Notification for blocking decisions (use Modal).
- Infinite notifications without throttling or grouping.
- Auto-dismiss too fast for warning/error (must allow reading).

## Accessibility essentials

- **Container**: `role="status"` (polite) by default.
- **Critical error**: can use `role="alert"` (assertive) for truly critical cases.
- **Close**: close icon is a button with `aria-label="Close notification"`.
- **Focus**: if Notification includes actions, ensure actions are keyboard reachable.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `notification/info/rounded/md/default`
  - `notification/success/rounded/md/with-actions`
  - `notification/error/rounded/md/closable`

## Anatomy

```
┌───────────────────────────────┐
│ [icon] Title             [x]  │
│       Description             │
│                 [Cancel] [OK] │  (optional)
└───────────────────────────────┘
```

## Types (tones)


| **Type**       | **Meaning**      | **Container bg token**                          | **Icon token**                                    |
| -------------- | ---------------- | ----------------------------------------------- | ------------------------------------------------- |
| `info` (提示)    | informational    | `var(--component-notification-tone-info-bg)`    | `var(--component-notification-tone-info-icon)`    |
| `success` (成功) | success feedback | `var(--component-notification-tone-success-bg)` | `var(--component-notification-tone-success-icon)` |
| `warning` (警告) | attention needed | `var(--component-notification-tone-warning-bg)` | `var(--component-notification-tone-warning-icon)` |
| `error` (错误)   | failure/serious  | `var(--component-notification-tone-error-bg)`   | `var(--component-notification-tone-error-icon)`   |
| `default` (默认) | neutral          | `var(--component-notification-tone-default-bg)` | *(none)*                                          |


## Sizes

> Figma shows a single card size: `w=304`, `radius=8`, `p=16`, shadow `0 4 10 rgba(0,0,0,0.1)`.


| **Size** | **Width** | **Radius** | **Padding** | **Icon** | **Title** | **Desc** |
| -------- | --------- | ---------- | ----------- | -------- | --------- | -------- |
| `MD`     | 304       | 8          | 16          | 20       | 16 / 22   | 14 / 20  |


## States


| **Part**           | **Token**                                    |
| ------------------ | -------------------------------------------- |
| Panel bg           | `var(--component-notification-panel-bg)`     |
| Panel radius       | `var(--component-notification-panel-radius)` |
| Panel shadow       | `var(--component-notification-panel-shadow)` |
| Title text         | `var(--component-notification-title-text)`   |
| Body text          | `var(--component-notification-body-text)`    |
| Close icon         | `var(--component-notification-close-icon)`   |
| Action gap         | `var(--component-notification-actions-gap)`  |
| Action top spacing | `var(--component-notification-actions-mt)`   |


## Executable interaction rules

### Trigger & duration

- Triggered by system events or user actions (save, background job finished, etc.).
- Default duration: 4–6s (recommended).
- Warning/Error may use longer duration (6–10s) or require manual close (product configurable).

### Stacking (required)

- Stack vertically with consistent gap.
- Max visible: 3 (recommended). Older notifications are dismissed first.
- Duplicate notifications within 1–2s should merge (recommended).

### Close

- Clicking close dismisses that notification only.
- Auto-dismiss timer pauses on hover and when focused inside (recommended).

### Actions

- If actions exist, place them in footer area aligned to the right.
- Primary action is the right-most button; Cancel/secondary on its left.

### Keyboard

- Close button reachable by Tab; Enter/Space activates.
- Action buttons reachable by Tab in visual order.

## Component token bindings (required)


| **Token path**                          | **CSS var**                                  |
| --------------------------------------- | -------------------------------------------- |
| `tokens.notification.tone.info.bg`      | `--component-notification-tone-info-bg`      |
| `tokens.notification.tone.info.icon`    | `--component-notification-tone-info-icon`    |
| `tokens.notification.tone.success.bg`   | `--component-notification-tone-success-bg`   |
| `tokens.notification.tone.success.icon` | `--component-notification-tone-success-icon` |
| `tokens.notification.tone.warning.bg`   | `--component-notification-tone-warning-bg`   |
| `tokens.notification.tone.warning.icon` | `--component-notification-tone-warning-icon` |
| `tokens.notification.tone.error.bg`     | `--component-notification-tone-error-bg`     |
| `tokens.notification.tone.error.icon`   | `--component-notification-tone-error-icon`   |
| `tokens.notification.tone.default.bg`   | `--component-notification-tone-default-bg`   |
| `tokens.notification.panel.bg`          | `--component-notification-panel-bg`          |
| `tokens.notification.panel.radius`      | `--component-notification-panel-radius`      |
| `tokens.notification.panel.shadow`      | `--component-notification-panel-shadow`      |
| `tokens.notification.titleText`         | `--component-notification-title-text`        |
| `tokens.notification.bodyText`          | `--component-notification-body-text`         |
| `tokens.notification.closeIcon`         | `--component-notification-close-icon`        |
| `tokens.notification.p`                 | `--component-notification-p`                 |
| `tokens.notification.w`                 | `--component-notification-w`                 |
| `tokens.notification.actions.gap`       | `--component-notification-actions-gap`       |
| `tokens.notification.actions.mt`        | `--component-notification-actions-mt`        |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

