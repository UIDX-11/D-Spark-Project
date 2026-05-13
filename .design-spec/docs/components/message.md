# Component: Message

## Level

Molecular

## Aliases

- global message
- toast message
- inline toast

## References

- Arco Design Web React（API / 行为真源）: https://arco.design/react/components/message
- Arco 源码（React）: [`arco-design/components/Message`](https://github.com/arco-design/arco-design/tree/main/components/Message)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 当前稿面为 **单一 MD 尺寸**：`px` / `py` / `radius` / 图标与正文见 **Sizes**；与 `tokens/src/component.json` 中 `message.*` 一致。

## Arco API 对齐（摘要）

| Arco `prop` | 说明 | 本 demo |
| --- | --- | --- |
| `type` / `content` | tone 与文案 | 侧栏 **Type** → `data-tone` + 固定英文短句 |
| `closable` | 是否显示关闭 | **closable** 复选框控制是否渲染关闭按钮 |
| `duration` / 全局队列 | 自动消失与堆叠 | Live 仅单条示意；堆叠见矩阵下方 **静态 stack** 与文档规则 |

## Arco DOM（与 demo 对齐）

- **单条**：**`div.ds-msg`** + **`span.ds-msg-ic`**（`aria-hidden="true"`）+ **`span.ds-msg-txt`**；关闭为 **`button.ds-msg-close`**。
- **读屏**：非 error 为 **`role="status"`**，**`error`** 为 **`role="alert"`**（与文档 a11y 表一致）。
- 类名前缀 **`ds-msg-*`**，不要求与 Arco 运行时 DOM 字符串一致。

## 推断（Figma 未单独画出的状态）

- **关闭按钮焦点**：**`:focus-visible`** + **`--semantic-focus-ring`**。
- **图标槽**：演示用字符占位；生产环境应对齐 Arco 图标组件与 **tone icon** token。

## Best practices

- **Use for**: lightweight global feedback after an action (non-blocking).
- **Keep short**: single sentence; avoid long paragraphs in Message (use Notification/Alert).
- **Stacking**: limit simultaneous messages; merge duplicates.
- **Auto-dismiss**: recommended by default (except critical error, product-dependent).

## Layout patterns

- **Global top**: show centered or top area, stacked vertically.
- **Action feedback**: “Saved”, “Upload failed”, “Permission denied”.

## Anti-patterns

- Using Message for content-heavy guidance (use Alert).
- Infinite auto-spam (must debounce).
- Clearing error messages too quickly (must allow reading).

## Accessibility essentials

- **Role**:
  - Info/Success/Warning: `role="status"` (polite)
  - Error: `role="alert"` (assertive) when critical
- **Close**: if closable, close icon is a button with `aria-label="Close message"`.
- **Motion**: avoid strong animations; respect reduced-motion.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `message/info/rounded/md/default`
  - `message/success/rounded/md/closable`

## Anatomy

```
[icon] Message text                     (optional) [x]
```

## Types (tones)

| **Type** | **Meaning** | **Container bg token** | **Icon token** |
| --- | --- | --- | --- |
| `info` (提示) | guidance/help | `var(--component-message-tone-info-bg)` | `var(--component-message-tone-info-icon)` |
| `success` (成功提示) | success feedback | `var(--component-message-tone-success-bg)` | `var(--component-message-tone-success-icon)` |
| `warning` (警示提示) | attention needed | `var(--component-message-tone-warning-bg)` | `var(--component-message-tone-warning-icon)` |
| `error` (错误提示) | failure/serious | `var(--component-message-tone-error-bg)` | `var(--component-message-tone-error-icon)` |

## Sizes

> 数值与 CSS 变量：`message.px` / `py` / `radius` / `gap` / `iconSize` / `fontSize` / `lineHeight` → `--component-message-*`。若 Figma 增加多档尺寸，先扩展 **token** 再更新本表与 demo。

| **Size** | **Padding X** | **Padding Y** | **Radius** | **Icon** | **Text** |
| --- | ---:| ---:| ---:| ---:| --- |
| `MD` | 16 | 8 | 8 | 16 | 14 / line 20 |

## States

| **Part** | **Token** |
| --- | --- |
| Text | `var(--component-message-text)` |
| Close icon | `var(--component-message-close-icon)` |

## Executable interaction rules

### Trigger & duration

- Message is created by an action (save, submit, etc.).
- Default duration: 2–4 seconds (product configurable).
- Error messages may use longer duration (e.g., 6–8 seconds) or require manual close (optional).

### Stacking rules (required)

- New messages stack vertically with a small gap (tokenized).
- Max visible: 3 (recommended). Older messages are dismissed first.
- Duplicate messages within 1–2 seconds should merge (recommended).

### Close (optional)

- If closable, clicking close dismisses that message only.
- Auto-dismiss timer stops while hovered/focused (optional but recommended).

### Keyboard

- Close button reachable by Tab; Enter/Space activates.

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.message.tone.info.bg` | `--component-message-tone-info-bg` |
| `tokens.message.tone.info.icon` | `--component-message-tone-info-icon` |
| `tokens.message.tone.success.bg` | `--component-message-tone-success-bg` |
| `tokens.message.tone.success.icon` | `--component-message-tone-success-icon` |
| `tokens.message.tone.warning.bg` | `--component-message-tone-warning-bg` |
| `tokens.message.tone.warning.icon` | `--component-message-tone-warning-icon` |
| `tokens.message.tone.error.bg` | `--component-message-tone-error-bg` |
| `tokens.message.tone.error.icon` | `--component-message-tone-error-icon` |
| `tokens.message.text` | `--component-message-text` |
| `tokens.message.closeIcon` | `--component-message-close-icon` |
| `tokens.message.radius` | `--component-message-radius` |
| `tokens.message.px` | `--component-message-px` |
| `tokens.message.py` | `--component-message-py` |
| `tokens.message.gap` | `--component-message-gap` |
| `tokens.message.iconSize` | `--component-message-icon-size` |
| `tokens.message.fontSize` | `--component-message-font-size` |
| `tokens.message.lineHeight` | `--component-message-line-height` |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

