# Component: Alert

## Level

Molecular

## Aliases

- banner
- inline notice
- status message

## References

- Arco Vue: https://arco.design/vue/component/alert
- Figma: https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124872-121819

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

## Anti-patterns

- Using Alert for blocking confirmations (use Modal).
- Auto-dismissing critical warnings/errors (should remain until resolved).
- Showing multiple alerts stacked without prioritization (collapse into one summary).

## Accessibility essentials

- **Role**: Arco Vue 源码根节点为 **`role="alert"`**（所有 `type` 一致）。若产品需区分 polite / assertive，可在封装层按类型覆盖为 `status` 等（非 Arco 默认）。
- **Close**: 与 Arco 一致为 **`div.ds-alert-close-btn`**，`tabindex="-1"`，`role="button"`，`aria-label="Close"`（非原生 `<button>`）。
- **Focus**: do not steal focus on render; if triggered by a user action, optionally move focus to the alert region (product-dependent).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `alert/info/rounded/lg/default`
  - `alert/warning/rounded/md/closable`
  - `alert/error/rounded/lg/with-title`
  - `alert/success/rounded/auto/multiline`

## Anatomy

- **DOM（对齐 Arco Vue `packages/web-vue/components/alert/alert.vue`）**：根 **`div[role="alert"]`** → 可选 **`div.ds-alert-icon`**（`#icon`）→ **`div.ds-alert-body`**（内为可选 **`div.ds-alert-title`**（`#title`）+ **`div.ds-alert-content`**（默认插槽））→ 可选 **`div.ds-alert-action`**（`#action` 外包层）→ 可选 **`div.ds-alert-close-btn`**（`#close-element` / 默认关闭）。
- **Vertical alignment**: 有 `title` 时（根带 `with-title`），左侧状态图标与**标题首行**垂直居中对齐；无 `title` 时，图标与 **`.ds-alert-content`** 块垂直居中对齐（含多行时与正文块整体居中）。

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

| **Kind**         | **Has title** | **Multiline** | **Action slot** | **Closable** | **Notes** |
| ---------------- | ------------- | ------------- | --------------- | ------------ | --------- |
| `default`        | no            | no            | optional        | optional     | base line |
| `multiline`      | no            | yes           | optional        | optional     | wraps text |
| `with-title`     | yes           | optional      | optional        | optional     | title + content |
| `banner-center`  | optional      | optional      | optional        | optional     | Arco `banner + center` |

## Types (tones)

| **Type**          | **Meaning**            | **Container bg token**                   | **Icon token**                             | **Arco note** |
| ----------------- | ---------------------- | ---------------------------------------- | ------------------------------------------ | ------------- |
| `info` (提示)     | informational guidance | `var(--component-alert-tone-info-bg)`    | `var(--component-alert-tone-info-icon)`    | default type |
| `success` (成功)  | operation success      | `var(--component-alert-tone-success-bg)` | `var(--component-alert-tone-success-icon)` | - |
| `warning` (警告)  | needs attention        | `var(--component-alert-tone-warning-bg)` | `var(--component-alert-tone-warning-icon)` | - |
| `error` (错误)    | failure/blocked        | `var(--component-alert-tone-error-bg)`   | `var(--component-alert-tone-error-icon)`   | Arco 根仍为 `role="alert"` |
| `normal` (中性)   | neutral notice         | semantic surface + subtle border         | optional                                   | Arco 2.41+; icon hidden by default |


## Sizes


| **Size** | **Height** | **Padding X** | **Padding Y** | **Radius** |
| -------- | ---------- | ------------- | ------------- | ---------- |
| `LG`     | auto       | 16            | 上 14 / 下 8  | 8          |
| `MD`     | 32         | 16            | 6             | 6          |
| `AUTO`   | auto       | 16            | 上 14 / 下 12 | 8          |


## States


| **Part**             | **Token**                              |
| -------------------- | -------------------------------------- |
| Text                 | `var(--component-alert-text)`          |
| Title text           | `var(--component-alert-title-text)`    |
| Close icon           | `var(--component-alert-close-icon)`    |
| Action text (Detail) | `var(--component-alert-action-text)`   |
| Action border        | `var(--component-alert-action-border)` |

## Arco API alignment (required)

| **Prop/slot/event** | **Rule** |
| ------------------- | -------- |
| `type` | supports `info/success/warning/error/normal` |
| `show-icon` | default `true`; for `normal`, default visual is no icon |
| `closable` | default `false`; close element appears only when enabled |
| `title` / `#title` | when present, switches to title layout |
| `#action` | optional action area, typically one secondary action |
| `banner` | removes border and radius |
| `center` | 与 Arco 一致：`justify-content: center`，且 **body 为 `flex: initial`**（非 `flex:1`），使图标 + 正文 + 操作/关闭作为一整块水平居中；勿对尾部操作区使用会吃掉剩余空间的 `margin-left: auto` |
| `#close-element` | allows custom close element |
| `close` / `after-close` | close click and after animation lifecycle |


## Executable interaction rules

### Close

- Close 节点（`div.ds-alert-close-btn`）仅在 `closable=true` 时渲染（与 Arco 一致）。
- 点击关闭区域会隐藏 Alert（demo 直接 `remove()`；Arco 为 `visible=false` + 过渡）。
- If the alert represents a persistent state (e.g., “Missing required config”), closing should be disabled or the alert should reappear on next render (product-dependent).
- `#close-element` 替换默认关闭展示内容，仍挂在 **`div.ds-alert-close-btn`** 上并保留关闭行为。

### Action button (Detail)

- Action is optional.
- Action should open contextual help (drawer/modal) or navigate to the relevant setting page.

### Auto-dismiss

- **Info** may auto-dismiss (optional) if it’s purely confirmational and not tied to unresolved state.
- **Warning/Error** must not auto-dismiss.
- `normal` follows product policy; default is non-auto-dismiss like other inline notices.

### Keyboard

- Arco 关闭节点为 **`tabindex="-1"`**，默认**不参与** Tab 顺序；可操作区为 **`div.ds-alert-action` 内真实控件**（如 `<button>`）走常规 Tab。
- Enter/Space activates focused **action** button when applicable.

## Component token bindings (required)


| **Token path**                   | **CSS var**                           |
| -------------------------------- | ------------------------------------- |
| `tokens.alert.tone.info.bg`      | `--component-alert-tone-info-bg`      |
| `tokens.alert.tone.info.icon`    | `--component-alert-tone-info-icon`    |
| `tokens.alert.tone.success.bg`   | `--component-alert-tone-success-bg`   |
| `tokens.alert.tone.success.icon` | `--component-alert-tone-success-icon` |
| `tokens.alert.tone.warning.bg`   | `--component-alert-tone-warning-bg`   |
| `tokens.alert.tone.warning.icon` | `--component-alert-tone-warning-icon` |
| `tokens.alert.tone.error.bg`     | `--component-alert-tone-error-bg`     |
| `tokens.alert.tone.error.icon`   | `--component-alert-tone-error-icon`   |
| `tokens.alert.text`              | `--component-alert-text`              |
| `tokens.alert.titleText`         | `--component-alert-title-text`        |
| `tokens.alert.closeIcon`         | `--component-alert-close-icon`        |
| `tokens.alert.actionText`        | `--component-alert-action-text`       |
| `tokens.alert.actionBorder`      | `--component-alert-action-border`     |
| `tokens.alert.radiusLg`          | `--component-alert-radius-lg`         |
| `tokens.alert.radiusMd`          | `--component-alert-radius-md`         |
| `tokens.alert.px`                | `--component-alert-px`                |
| `tokens.alert.pyLg`              | `--component-alert-py-lg`             |
| `tokens.alert.pyMd`              | `--component-alert-py-md`             |


