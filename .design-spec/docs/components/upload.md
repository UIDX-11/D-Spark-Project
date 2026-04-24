# Component: Upload

## Level

Molecular

## Aliases

- file upload
- uploader
- drag and drop upload

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

| **Kind** | **Trigger** | **List** | **Notes** |
| --- | --- | --- | --- |
| `file-list` | button / drag | file list items | docs/pdf/etc |
| `picture-list` | button / drag | picture list items | thumbnail + filename |
| `picture-card` | button / drag | photo wall cards | grid of 100×100 cards |

## States

### Trigger states

| **State** | **BG** | **Border** | **Icon** | **Title text** | **Desc text** |
| --- | --- | --- | --- | --- | --- |
| Default | `var(--component-upload-trigger-bg-default)` | `var(--component-upload-trigger-border-default)` | `var(--component-upload-trigger-icon-default)` | `var(--component-upload-trigger-title)` | `var(--component-upload-trigger-desc)` |
| Hover | `var(--component-upload-trigger-bg-hover)` | `var(--component-upload-trigger-border-hover)` | `var(--component-upload-trigger-icon-default)` | `var(--component-upload-trigger-title)` | `var(--component-upload-trigger-desc)` |
| Disabled | `var(--component-upload-trigger-bg-disabled)` | `var(--component-upload-trigger-border-disabled)` | `var(--component-upload-trigger-icon-disabled)` | `var(--component-upload-trigger-title-disabled)` | `var(--component-upload-trigger-desc-disabled)` |
| Drag hover | `var(--component-upload-trigger-bg-drag-hover)` | `var(--component-upload-trigger-border-drag-hover)` | `var(--component-upload-trigger-icon-default)` | `var(--component-upload-trigger-title)` | `var(--component-upload-trigger-desc)` |

### List item states

| **State** | **BG** | **Filename** | **Action** |
| --- | --- | --- | --- |
| Default | `var(--component-upload-item-bg)` | `var(--component-upload-item-filename)` | download + delete |
| Uploading | `var(--component-upload-item-bg)` | `var(--component-upload-item-filename)` | progress + delete |
| Error | `var(--component-upload-item-bg)` | `var(--component-upload-item-filename-error)` | retry + delete |

### Picture card states (photo wall)

| **State** | **BG** | **Overlay** | **Icon** |
| --- | --- | --- | --- |
| Default | image | none | none |
| Hover | image | `var(--component-upload-card-mask)` | retry/delete icons |
| Uploading | `var(--component-upload-card-bg-uploading)` | none | mini progress |
| Error | `var(--component-upload-card-bg-error)` | none | error icon + delete |

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

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.upload.trigger.bgDefault` | `--component-upload-trigger-bg-default` |
| `tokens.upload.trigger.bgHover` | `--component-upload-trigger-bg-hover` |
| `tokens.upload.trigger.bgDisabled` | `--component-upload-trigger-bg-disabled` |
| `tokens.upload.trigger.bgDragHover` | `--component-upload-trigger-bg-drag-hover` |
| `tokens.upload.trigger.borderDefault` | `--component-upload-trigger-border-default` |
| `tokens.upload.trigger.borderHover` | `--component-upload-trigger-border-hover` |
| `tokens.upload.trigger.borderDisabled` | `--component-upload-trigger-border-disabled` |
| `tokens.upload.trigger.borderDragHover` | `--component-upload-trigger-border-drag-hover` |
| `tokens.upload.trigger.iconDefault` | `--component-upload-trigger-icon-default` |
| `tokens.upload.trigger.iconDisabled` | `--component-upload-trigger-icon-disabled` |
| `tokens.upload.trigger.title` | `--component-upload-trigger-title` |
| `tokens.upload.trigger.titleDisabled` | `--component-upload-trigger-title-disabled` |
| `tokens.upload.trigger.desc` | `--component-upload-trigger-desc` |
| `tokens.upload.trigger.descDisabled` | `--component-upload-trigger-desc-disabled` |
| `tokens.upload.item.bg` | `--component-upload-item-bg` |
| `tokens.upload.item.filename` | `--component-upload-item-filename` |
| `tokens.upload.item.filenameError` | `--component-upload-item-filename-error` |
| `tokens.upload.card.mask` | `--component-upload-card-mask` |
| `tokens.upload.card.bgUploading` | `--component-upload-card-bg-uploading` |
| `tokens.upload.card.bgError` | `--component-upload-card-bg-error` |
