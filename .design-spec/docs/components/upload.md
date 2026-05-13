# Component: Upload

## Level

Molecular

## Aliases

- file upload
- uploader
- drag and drop upload

## References

- Figma（Light，真源表 canonical / `figma_truth_table.json`）: [Primary node](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124872-118703)
- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/upload](https://arco.design/react/components/upload)
- Arco 源码（React）: [`arco-design/components/Upload`](https://github.com/arco-design/arco-design/tree/main/components/Upload)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **触发区**：圆角与内边距由 `upload.layout.triggerRadius`、`upload.layout.triggerInset*` 驱动；**button** 与 **drag** 最小高度由 `upload.layout.btnMinH` / `upload.layout.dragMinH`（及 SM 档）控制。
- **列表行**：行高、左右内边距、文件图标与缩略图边长由 `upload.layout.rowMinH`、`rowInsetX`、`fileIcon`、`thumb` 等 token 约束。
- **照片卡片**：边长 `cardBox`、圆角 `cardRadius`；遮罩色 `upload.card.mask`（与 Arco 照片墙 hover 一致方向）。

## Arco API 对齐（摘要）


| Arco `prop` | 说明 | 本 demo |
| ----------- | ---- | ------- |
| `list-type` | `text` / `picture` / `picture-card` | 侧栏 **Kind** → `file-*`（文本列表）、`picture-list`、`picture-card` |
| `draggable` | 是否可拖拽到触发区 | **file-drag** 使用 **`div[role="button"].ds-upl-trg--drag`**；其余为 **`button.ds-upl-trg--btn`** |
| `disabled` | 禁用上传 | 矩阵行 **Disabled**（`disabled` / **`is-dis`**） |
| `customRequest` / 实际上传 | 真实上传与校验 | Live 为静态结构与 **a11y** 示意，不接 XHR |

## Arco DOM（与 demo 对齐）

- **根**：`**div#uplRoot.ds-upl**`（`**data-variant**` / **`data-size**`）。
- **提示**：`**p#uplHint.ds-upl-hint**`，触发区 **`aria-describedby="uplHint"`**。
- **触发区**：`**#uplTrig**` — 按钮模式为 **`<button type="button" class="ds-upl-trg ds-upl-trg--btn">`**；拖拽模式为 **`<div role="button" tabindex="0" class="ds-upl-trg ds-upl-trg--drag">`**；内含 **`+`**（`.ds-upl-trg-plus`）与标题/描述栈（`.ds-upl-trg-tit` / `.ds-upl-trg-desc`）。
- **列表**：`**ul.ds-upl-list**` + **`li.ds-upl-item`**；文件名 **`.ds-upl-item-name`**；错误行加 **`ds-upl-item--err`**；操作 **`button.ds-upl-act`**（`aria-label` 含文件名）。
- **进度**：列表内上传中行为 **`div.ds-upl-prog`**，**`role="progressbar"`** + **`aria-valuenow`**。
- **照片墙**：**`.ds-upl-cards`** + **`.ds-upl-card`**，占位 **`div.ds-upl-card-ph`**，悬停操作 **`div.ds-upl-card-mask`** 内按钮。
- **类名前缀**：`ds-upl-*`；不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **矩阵 Drag hover**：静态类 **`is-drag`**，底/边使用 **`--component-upload-trigger-bg-drag-hover`** / **`--component-upload-trigger-border-drag-hover`**。
- **矩阵 Focus**：**`is-foc`** + **`box-shadow: 0 0 0 2px var(--semantic-focus-ring)`**（与 Arco 可聚焦触发区一致方向）。
- **列表进度条**：轨道与填充色复用 **`--component-progress-line-track`** / **`--component-progress-line-fill-active`**，高度 **`--component-progress-line-h-sm`**，与 Upload 文档「上传中」语义一致。

## Best practices

- **Use for**: uploading files or images with optional list and preview.
- **Prefer**: a clear trigger area with accepted types and max size hint.
- **Show progress** during upload and allow cancel/remove.
- **Failure**: keep failed item in list and provide retry (do not silently drop).
- **Security**: validate type/size on client and server; never rely on client-only.

## Layout patterns

- **Forms**: Upload + helper text + validation error.
- **Media management**: picture list + picture card (“photo wall”) preview and actions.

## Anti-patterns

- No feedback after selecting files (must show list/progress).
- Restarting failed uploads without explicit user action (must retry manually).
- Mixing file types and UI patterns without clarity (file-list vs picture list).

## Accessibility essentials

- **Keyboard**: trigger accessible via Tab/Enter/Space; list actions accessible.
- **Focus**: after upload completes/fails, focus should not jump unexpectedly.
- **Name**: trigger has accessible name and accepted type hint via `aria-describedby`.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `upload/file-list/button/md/default`
  - `upload/file-list/drag/md/drag-hover`
  - `upload/picture-list/button/md/uploading`
  - `upload/picture-card/drag/md/hover`

## Anatomy

### Trigger (button)

```
┌──────────────┐
│ Click upload │
└──────────────┘
helper text
```

### Trigger (drag area)

```
┌──────────────────────────────────────┐
│   [+]                                │
│   点击或拖拽文件到此处上传            │
│   Only pdf/png/jpg... ≤ 100MB        │
└──────────────────────────────────────┘
```

### File list item / picture list item

```
[file-icon/thumbnail] filename   [download/progress/retry]  [delete]
```

### Picture card (photo wall)

```
┌──────────┐
│ image    │  (hover) [retry] [delete]
└──────────┘
```

## Variants


| **Kind**       | **Trigger**   | **List**           | **Notes**             |
| -------------- | ------------- | ------------------ | --------------------- |
| `file-list`    | button / drag | file list items    | docs/pdf/etc          |
| `picture-list` | button / drag | picture list items | thumbnail + filename  |
| `picture-card` | button / drag | photo wall cards   | grid of 100×100 cards |


## States

### Trigger states


| **State**  | **BG**                                          | **Border**                                          | **Icon**                                        | **Title text**                                   | **Desc text**                                   |
| ---------- | ----------------------------------------------- | --------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| Default    | `var(--component-upload-trigger-bg-default)`    | `var(--component-upload-trigger-border-default)`    | `var(--component-upload-trigger-icon-default)`  | `var(--component-upload-trigger-title)`          | `var(--component-upload-trigger-desc)`          |
| Hover      | `var(--component-upload-trigger-bg-hover)`      | `var(--component-upload-trigger-border-hover)`      | `var(--component-upload-trigger-icon-default)`  | `var(--component-upload-trigger-title)`          | `var(--component-upload-trigger-desc)`          |
| Disabled   | `var(--component-upload-trigger-bg-disabled)`   | `var(--component-upload-trigger-border-disabled)`   | `var(--component-upload-trigger-icon-disabled)` | `var(--component-upload-trigger-title-disabled)` | `var(--component-upload-trigger-desc-disabled)` |
| Drag hover | `var(--component-upload-trigger-bg-drag-hover)` | `var(--component-upload-trigger-border-drag-hover)` | `var(--component-upload-trigger-icon-default)`  | `var(--component-upload-trigger-title)`          | `var(--component-upload-trigger-desc)`          |


### List item states


| **State** | **BG**                            | **Filename**                                  | **Action**        |
| --------- | --------------------------------- | --------------------------------------------- | ----------------- |
| Default   | `var(--component-upload-item-bg)` | `var(--component-upload-item-filename)`       | download + delete |
| Uploading | `var(--component-upload-item-bg)` | `var(--component-upload-item-filename)`       | progress + delete |
| Error     | `var(--component-upload-item-bg)` | `var(--component-upload-item-filename-error)` | retry + delete    |


### Picture card states (photo wall)


| **State** | **BG**                                      | **Overlay**                         | **Icon**            |
| --------- | ------------------------------------------- | ----------------------------------- | ------------------- |
| Default   | image                                       | none                                | none                |
| Hover     | image                                       | `var(--component-upload-card-mask)` | retry/delete icons  |
| Uploading | `var(--component-upload-card-bg-uploading)` | none                                | mini progress       |
| Error     | `var(--component-upload-card-bg-error)`     | none                                | error icon + delete |


## Executable interaction rules

### File selection

- Trigger opens file picker; selecting adds items to list.
- If multiple files allowed, preserve selection order.
- Validate client-side:
  - type whitelist (e.g., pdf/png/jpg)
  - max file size (e.g., ≤ 100MB)
  - show per-file error if violated

### Drag & drop

- Dragging files over drag area enters **drag-hover** state.
- Dropping files adds them to list and starts upload.
- Dragging non-allowed types must show rejection feedback (toast or inline).

### Upload lifecycle

- Each file has status: `queued → uploading → done | error`.
- Uploading shows progress indicator.
- Error state shows “Click to Retry”.
- Retry restarts upload for that file only.

### Remove / delete

- Delete removes file from list (and cancels upload if uploading).
- For already-uploaded files, delete should optionally call server delete (product-dependent).

### Picture card actions

- Hover shows masked overlay with retry/delete actions.
- Retry only visible when file is failed (or product chooses always show).

### Keyboard & ARIA (required)

- Trigger:
  - is a button-like element with `role="button"` or native `<button>`
  - `aria-describedby` points to accepted types/size hint
- List actions:
  - download/delete/retry are buttons with clear `aria-label` including filename

## Component token bindings (required)


| **Token path**                          | **CSS var**                                    |
| --------------------------------------- | ---------------------------------------------- |
| `tokens.upload.trigger.bgDefault`       | `--component-upload-trigger-bg-default`        |
| `tokens.upload.trigger.bgHover`         | `--component-upload-trigger-bg-hover`          |
| `tokens.upload.trigger.bgDisabled`      | `--component-upload-trigger-bg-disabled`       |
| `tokens.upload.trigger.bgDragHover`     | `--component-upload-trigger-bg-drag-hover`     |
| `tokens.upload.trigger.borderDefault`   | `--component-upload-trigger-border-default`    |
| `tokens.upload.trigger.borderHover`     | `--component-upload-trigger-border-hover`      |
| `tokens.upload.trigger.borderDisabled`  | `--component-upload-trigger-border-disabled`   |
| `tokens.upload.trigger.borderDragHover` | `--component-upload-trigger-border-drag-hover` |
| `tokens.upload.trigger.iconDefault`     | `--component-upload-trigger-icon-default`      |
| `tokens.upload.trigger.iconDisabled`    | `--component-upload-trigger-icon-disabled`     |
| `tokens.upload.trigger.title`           | `--component-upload-trigger-title`             |
| `tokens.upload.trigger.titleDisabled`   | `--component-upload-trigger-title-disabled`    |
| `tokens.upload.trigger.desc`            | `--component-upload-trigger-desc`              |
| `tokens.upload.trigger.descDisabled`    | `--component-upload-trigger-desc-disabled`     |
| `tokens.upload.item.bg`                 | `--component-upload-item-bg`                   |
| `tokens.upload.item.filename`           | `--component-upload-item-filename`             |
| `tokens.upload.item.filenameError`      | `--component-upload-item-filename-error`       |
| `tokens.upload.card.mask`               | `--component-upload-card-mask`                 |
| `tokens.upload.card.bgUploading`        | `--component-upload-card-bg-uploading`         |
| `tokens.upload.card.bgError`            | `--component-upload-card-bg-error`             |
| `tokens.upload.layout.triggerRadius`    | `--component-upload-layout-trigger-radius`     |
| `tokens.upload.layout.triggerInsetX`  | `--component-upload-layout-trigger-inset-x`    |
| `tokens.upload.layout.triggerInsetY`  | `--component-upload-layout-trigger-inset-y`    |
| `tokens.upload.layout.triggerInsetXSm` | `--component-upload-layout-trigger-inset-xsm`  |
| `tokens.upload.layout.triggerInsetYSm` | `--component-upload-layout-trigger-inset-ysm`  |
| `tokens.upload.layout.btnMinH`        | `--component-upload-layout-btn-min-h`          |
| `tokens.upload.layout.btnMinHSm`      | `--component-upload-layout-btn-min-hsm`        |
| `tokens.upload.layout.dragMinH`       | `--component-upload-layout-drag-min-h`         |
| `tokens.upload.layout.dragMinHSm`    | `--component-upload-layout-drag-min-hsm`       |
| `tokens.upload.layout.plusSize`       | `--component-upload-layout-plus-size`          |
| `tokens.upload.layout.titleFont`      | `--component-upload-layout-title-font`         |
| `tokens.upload.layout.titleLine`      | `--component-upload-layout-title-line`         |
| `tokens.upload.layout.descFont`       | `--component-upload-layout-desc-font`          |
| `tokens.upload.layout.descLine`       | `--component-upload-layout-desc-line`          |
| `tokens.upload.layout.listGap`        | `--component-upload-layout-list-gap`           |
| `tokens.upload.layout.rowRadius`      | `--component-upload-layout-row-radius`         |
| `tokens.upload.layout.rowInsetX`      | `--component-upload-layout-row-inset-x`        |
| `tokens.upload.layout.rowMinH`        | `--component-upload-layout-row-min-h`          |
| `tokens.upload.layout.fileIcon`       | `--component-upload-layout-file-icon`          |
| `tokens.upload.layout.thumb`          | `--component-upload-layout-thumb`              |
| `tokens.upload.layout.cardBox`        | `--component-upload-layout-card-box`           |
| `tokens.upload.layout.cardRadius`     | `--component-upload-layout-card-radius`        |
| `tokens.upload.layout.actionGap`      | `--component-upload-layout-action-gap`         |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

