# Component: Modal

## Level

Molecular

## Aliases

- dialog
- confirmation dialog
- form modal

## References

- Arco Vue（API / 行为真源）: [https://arco.design/vue/component/modal](https://arco.design/vue/component/modal)
- Arco 源码: `arco-design-vue/packages/web-vue/components/modal/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Modal** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **遮罩**：`modal.mask` → **`--component-modal-mask`**。
- **面板**：背景 / 圆角 / 投影为 **`modal.panel.*`** → **`--component-modal-panel-*`**；默认宽 **`modal.w`**（440）、带提示 **`modal.wWithTip`**（464）；内边距 **`modal.p`**（24）。
- **页脚**：操作按钮与 `Modal` 内 `footer` 对齐方向一致（主操作在右）；演示中 **`ds-mini-btn`** 复用主按钮语义色。

## Arco API 对齐（摘要）

| Arco `prop` / 行为 | 说明 | 本 demo |
| ------------------ | ---- | ------- |
| `v-model:visible` / 显隐 | 控制弹出层 | **`#dsmOpen`** 打开 **`#dsmLayer`**（移除 **`hidden`**） |
| `width` | 面板宽度 | 侧栏 **Width** → 内联 **`min(..., var(--component-modal-w|w-with-tip)…)`** 与 SM/LG 示意宽度 |
| `maskClosable` | 点击遮罩关闭 | **`#dsmBd`** 点击 → 关闭 |
| `escToExit` | Esc 关闭 | **`document` keydown Escape**（层打开时） |
| `onOk` / `onCancel` | 按钮回调 | **Cancel** / **OK** 与关闭共用示意（无业务回调） |
| `title` / `content` | 标题与内容 | **`#dsmT`**、**`#dsmD`**；**with-tip** 时增加 **`role="note"`** 的 **`.ds-modal-tip`** |

## Arco DOM（与 demo 对齐）

- **触发**：**`button#dsmOpen.ds-open-modal`**。
- **层**：**`div#dsmLayer.ds-modal-layer`**（`hidden` 控制显隐），内 **`div#dsmBd.ds-modal-backdrop`** + **`div.ds-modal-panel`**。
- **面板**：**`role="dialog"`**、**`aria-modal="true"`**、**`aria-labelledby="dsmT"`**、**`aria-describedby="dsmD"`**。
- **头**：**`header.ds-modal-h`** + **`h2#dsmT.ds-modal-title`** + **`button#dsmX.ds-modal-x`**（`aria-label="Close"`）。
- **体**：**`div.ds-modal-body`**，可选顶部 **`.ds-modal-tip`**。
- **脚**：**`div.ds-modal-actions`** + **`button.ds-mini-btn`** / **`button.ds-mini-btn.primary`**。
- **类名前缀**：`ds-modal-*`、`ds-mini-btn`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **矩阵**：第二行 **`is-hov`**（外环/阴影）、第三行 **`is-act`**（虚线 outline）、第四行 **`is-foc`**（焦点环 **`--semantic-focus-ring`**）、第五行 **`is-dis`**（透明度）；与 Live 侧栏无关。
- **底部按钮焦点**：**`ds-mini-btn:focus-visible`** 与 **`ds-modal-x:focus-visible`** 使用同一 focus ring 方向。

## Best practices

- **Use for**: blocking flows that require explicit decision or focused input.
- **Use inline Alert** inside Modal for contextual tips (design includes “带提示” variant).
- **Footer placement rule (from Figma)**:
  - confirm/message/marketing actions align **right**
  - functional data entry controls align **center**
- **Size limits (from Figma)**:
  - max width = 84% of viewport
  - max height = 80% of viewport

## Layout patterns

- **Confirm**: title + description + Cancel/Confirm.
- **Form entry**: title + body slots + footer buttons.
- **With tip**: header + inline Alert in body + form slot.

## Anti-patterns

- Using Modal for non-blocking feedback (use Message/Alert).
- No scroll handling for long content (must support internal scroll).
- Closing destructive modals by accident without protection (warn/confirm).

## Accessibility essentials

- **Role**: `role="dialog"` (or `alertdialog` for destructive confirmations).
- **Labeling**: `aria-labelledby` points to title; `aria-describedby` points to description/body.
- **Focus trap**: focus stays within modal while open.
- **Escape**: `Esc` closes only when `closeOnEsc=true` (default true for normal; false for destructive).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `modal/confirm/rounded/md/default`
  - `modal/confirm/rounded/md/danger`
  - `modal/form/rounded/md/with-tip`

## Anatomy

```
Overlay mask
┌──────────────────────────────────────────┐
│ Header: [icon?] Title            [close] │
│ Body: description / slots / alert tip    │
│ Footer: buttons (Cancel/Confirm/...)     │
└──────────────────────────────────────────┘
```

## Variants


| **Kind**        | **Header**            | **Body**            | **Footer**       | **Notes**            |
| --------------- | --------------------- | ------------------- | ---------------- | -------------------- |
| `inform`        | icon + title          | description         | Confirm only     | “提示/成功/警告/错误” styles |
| `confirm`       | title (optional icon) | description         | Cancel + primary | includes “危险” style  |
| `form`          | title + close         | slot                | Cancel + primary | “自定义”                |
| `form-with-tip` | title + close         | inline Alert + slot | Cancel + primary | “带提示”                |


## Types (tones)


| **Type**       | **Meaning**         | **Header icon** | **Notes**                  |
| -------------- | ------------------- | --------------- | -------------------------- |
| `default`      | neutral             | none            | plain title                |
| `info` (提示)    | informational       | info icon       | non-destructive            |
| `success` (成功) | success             | success icon    | non-destructive            |
| `warning` (警告) | warning             | warning icon    | attention                  |
| `error` (错误)   | error               | error icon      | failure/destructive        |
| `danger` (危险)  | destructive confirm | warning icon    | requires safer close rules |


## Sizes

> Figma shows `w=440` (default) and `w=464` (with tip). Tokenize width/radius/padding; enforce viewport max constraints.


| **Size**      | **Width** | **Radius** | **Padding** |
| ------------- | --------- | ---------- | ----------- |
| `MD`          | 440       | 16         | 24          |
| `MD-with-tip` | 464       | 16         | 24          |


## States


| **Part**           | **Token**                             |
| ------------------ | ------------------------------------- |
| Mask               | `var(--component-modal-mask)`         |
| Panel bg           | `var(--component-modal-panel-bg)`     |
| Panel radius       | `var(--component-modal-panel-radius)` |
| Panel shadow       | `var(--component-modal-panel-shadow)` |
| Title text         | `var(--component-modal-title-text)`   |
| Body text          | `var(--component-modal-body-text)`    |
| Close icon         | `var(--component-modal-close-icon)`   |
| Divider (optional) | `var(--component-modal-divider)`      |


## Executable interaction rules

### Open/close

- Open: focus moves to the modal (title or first focusable in body).
- Close triggers:
  - Close button (×) when `closable=true`
  - `Esc` when `closeOnEsc=true`
  - Clicking mask when `closeOnMask=true`
- **Danger confirm**: default `closeOnEsc=false` and `closeOnMask=false` (recommended).

### Focus management (required)

- Trap focus within modal while open.
- Restore focus to the opener element on close.
- If there is a form field, focus the first invalid field on submit error.

### Scroll & sizing (required)

- Lock page scroll while modal is open.
- Modal body scrolls internally when exceeding max height.
- Enforce viewport max: width ≤ 84vw, height ≤ 80vh.

### Footer actions

- Primary action on the right; secondary (Cancel) to its left.
- Enter activates primary when safe (avoid for destructive text entry forms unless explicit).
- For forms, disable primary until validation passes (optional) or show inline errors (required).

## Component token bindings (required)


| **Token path**              | **CSS var**                      |
| --------------------------- | -------------------------------- |
| `tokens.modal.mask`         | `--component-modal-mask`         |
| `tokens.modal.panel.bg`     | `--component-modal-panel-bg`     |
| `tokens.modal.panel.radius` | `--component-modal-panel-radius` |
| `tokens.modal.panel.shadow` | `--component-modal-panel-shadow` |
| `tokens.modal.titleText`    | `--component-modal-title-text`   |
| `tokens.modal.bodyText`     | `--component-modal-body-text`    |
| `tokens.modal.closeIcon`    | `--component-modal-close-icon`   |
| `tokens.modal.divider`      | `--component-modal-divider`      |
| `tokens.modal.p`            | `--component-modal-p`            |
| `tokens.modal.w`            | `--component-modal-w`            |
| `tokens.modal.wWithTip`     | `--component-modal-w-with-tip`   |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

