# Component: Tag

## Level

Molecular

## Aliases

- label
- chip
- status badge

## References

- Figma（Light，真源表 canonical / `figma_truth_table.json`）: [Primary node](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275126-37182)
- Arco Design Web React（API / 行为真源）: https://arco.design/react/components/tag
- Arco 源码（React）: [`arco-design/components/Tag`](https://github.com/arco-design/arco-design/tree/main/components/Tag)
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- Status / selector / group / add-button 的圆角、间距、字阶与色以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- **Sizes** 与 `tokens/src/component.json` 中 `tag.status.*`、`tag.selector.*`、`tag.group.*`、`tag.addButton.*` 及 `tag.focusRing` 对齐。

## Arco API 对齐（摘要）

| Arco `prop` / 行为 | 说明 | 本 demo |
| ------------------ | ---- | ------- |
| `color` / 语义色（status） | offline / red / orangered / … | 侧栏 **Tone**：offline / danger / success / warning / info（映射设计 token） |
| `size`（status / 部分形态） | 尺寸档 | 侧栏 **Size**：lg / md / sm / xs（**selector** / **group** 档位置灰，尺寸走各自 token） |
| `closable` / 关闭 | 可移除标签 | **group** 行内 **`button.ds-tag__close`** + `aria-label` |
| `checkable` / 选中（selector） | 筛选态 | **selector** 侧栏 **state**：selected 等 |

## Arco DOM（与 demo 对齐）

- **Status**：**`span.ds-tag.ds-tag--status`**，`data-tone` / **`data-size`** 驱动 token；读屏用 **`role="status"`** 与可见文案。
- **Selector**：**`button[type=button].ds-tag.ds-tag--selector`**（可获焦）；选中态 **`is-selected`**；hover/disabled 用 **`is-demo-hover`** / **`is-disabled`** + **`disabled`** 示意。
- **Group**：**`span.ds-tag.ds-tag--group`** + 文案 + **`button.ds-tag__close`**（`aria-label` 移除）。
- **Add-button**：**`button.ds-tag.ds-tag--add`** + **`data-size`** + 前缀 **`+`**（`aria-hidden` 于装饰图标容器）。
- 类名前缀 **`ds-tag*`**，不要求与 `arco-tag` 字符串一致。

## 推断（Figma 未单独画出的状态）

- **键盘焦点环**：与 Arco 一致保留 **`focus-visible`** 外显环，token **`--component-tag-focus-ring`**（`tokens.tag.focusRing` → semantic `focus.ring`）。
- **Selector hover**：矩阵与部分 Live 态用 **`is-demo-hover`** 类模拟 hover 底色（静态并排对比）。

## Best practices

- **Use for**: small, scannable metadata (status, category, attribute).
- **Color**: semantic colors must come from tokens; ensure contrast.
- **Dismissible**: only when removal is safe and predictable; confirm if destructive.
- **Length**: keep tags short; truncate with tooltip when needed.

## Layout patterns

- **Table cells**: status tag in a status column.
- **Filters**: selected filters represented as removable tags.

## Anti-patterns

- Using too many tags (visual noise); prefer grouping or a summary.
- Encoding meaning with color only (include text/icon).

## Accessibility essentials

- **Dismissible tags**: close button must be keyboard focusable and labeled.
- **Contrast**: ensure tag background/text meet contrast requirements.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `tag/status/rounded/sm/default`
  - `tag/filter/rounded/sm/dismissible`

## Anatomy

### Status tag

```
┌──────────────┐
│ [icon] Label │  (optional icon)
└──────────────┘
```

- **Container**: bg / border (optional) / radius
- **Content**: label (Semibold)
- **Leading icon (optional)**: used for warning/info (when defined)

### Selector tag

```
┌──────────┐
│  Label   │  (pill button-like tag)
└──────────┘
```

- Used as filter/selection chips

### Tag group (dismissible)

```
┌────────────────┐
│ Label     [x]  │
└────────────────┘
```

- Close icon must be focusable + labeled (a11y)

### Add tag button

```
┌──────────────┐
│ [+] Add Tag  │
└──────────────┘
```

## Variants

| **Kind** | **When to use** | **Notes** |
| --- | --- | --- |
| `status` | 状态/属性展示 | tone: offline/danger/success/warning/info; style: bg / outline / border / text |
| `selector` | 筛选/选择标签 | state: default/hover/selected/disabled |
| `group` | 多个可移除标签 | close 可 hover；disabled 置灰 |
| `add-button` | 添加标签入口 | 可仅图标/仅文字/图标+文字（按场景） |

## Sizes

### Status tag

| **Size** | **Height** | **Radius** | **Padding X** | **Padding Y** | **Text size** | **Min width** |
| --- | ---:| ---:| ---:| ---:| ---:| ---:|
| `lg` (大) | `var(--component-tag-status-h-lg)` | `var(--component-tag-status-radius-lg)` | `var(--component-tag-status-px-md)` | `var(--component-tag-status-py-lg)` | `var(--component-tag-status-text-size-md)` | `var(--component-tag-status-min-width)` |
| `md` (中) | `var(--component-tag-status-h-md)` | `var(--component-tag-status-radius-md)` | `var(--component-tag-status-px-md)` | `var(--component-tag-status-py-md)` | `var(--component-tag-status-text-size-md)` | `var(--component-tag-status-min-width)` |
| `sm` (小) | `var(--component-tag-status-h-sm)` | `var(--component-tag-status-radius-md)` | `var(--component-tag-status-px-md)` | `var(--component-tag-status-py-sm)` | `var(--component-tag-status-text-size-md)` | `var(--component-tag-status-min-width)` |
| `xs` (迷你) | `var(--component-tag-status-h-xs)` | `var(--component-tag-status-radius-md)` | `var(--component-tag-status-px-sm)` | `var(--component-tag-status-py-sm)` | `var(--component-tag-status-text-size-sm)` | `var(--component-tag-status-min-width)` |

## States

### Status tag — tones (required)

> 规则：组件规范只引用 component tokens（`var(--component-tag-...)`）。

| **Tone** | **Background** | **Text** | **Border** |
| --- | --- | --- | --- |
| Offline | `var(--component-tag-status-tone-offline-bg)` | `var(--component-tag-status-tone-offline-text)` | `var(--component-tag-status-tone-offline-border)` |
| Danger | `var(--component-tag-status-tone-danger-bg)` | `var(--component-tag-status-tone-danger-text)` | `var(--component-tag-status-tone-danger-border)` |
| Success | `var(--component-tag-status-tone-success-bg)` | `var(--component-tag-status-tone-success-text)` | `var(--component-tag-status-tone-success-border)` |
| Warning | `var(--component-tag-status-tone-warning-bg)` | `var(--component-tag-status-tone-warning-text)` | `var(--component-tag-status-tone-warning-border)` |
| Info | `var(--component-tag-status-tone-info-bg)` | `var(--component-tag-status-tone-info-text)` | `var(--component-tag-status-tone-info-border)` |

### Selector tag — states

| **State** | **Background** | **Border** | **Text** |
| --- | --- | --- | --- |
| Default | `var(--component-tag-selector-bg-default)` | none | `var(--component-tag-selector-text-default)` |
| Hover | `var(--component-tag-selector-bg-hover)` | none | `var(--component-tag-selector-text-default)` |
| Selected | `var(--component-tag-selector-bg-selected)` | `var(--component-tag-selector-border-selected)` | `var(--component-tag-selector-text-default)` |
| Disabled | `var(--component-tag-selector-bg-disabled)` | none | `var(--component-tag-selector-text-disabled)` |

### Tag group — states

| **State** | **Background** | **Text** | **Close icon** | **Close hover bg** |
| --- | --- | --- | --- | --- |
| Default | `var(--component-tag-group-bg-default)` | `var(--component-tag-group-text-default)` | `var(--component-tag-group-icon-default)` | none |
| Hover | `var(--component-tag-group-bg-hover)` | `var(--component-tag-group-text-default)` | `var(--component-tag-group-icon-default)` | none |
| Disabled | `var(--component-tag-group-bg-disabled)` | `var(--component-tag-group-text-disabled)` | `var(--component-tag-group-icon-disabled)` | none |
| Close hover | (keep bg) | (keep text) | (keep icon) | `var(--component-tag-group-close-bg-hover)` |

## Component token bindings (required)

### Shared（焦点）

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.tag.focusRing` | `--component-tag-focus-ring` |

### Status tag

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.tag.status.tone.offline.bg` | `--component-tag-status-tone-offline-bg` |
| `tokens.tag.status.tone.offline.text` | `--component-tag-status-tone-offline-text` |
| `tokens.tag.status.tone.offline.border` | `--component-tag-status-tone-offline-border` |
| `tokens.tag.status.tone.danger.bg` | `--component-tag-status-tone-danger-bg` |
| `tokens.tag.status.tone.danger.text` | `--component-tag-status-tone-danger-text` |
| `tokens.tag.status.tone.danger.border` | `--component-tag-status-tone-danger-border` |
| `tokens.tag.status.tone.success.bg` | `--component-tag-status-tone-success-bg` |
| `tokens.tag.status.tone.success.text` | `--component-tag-status-tone-success-text` |
| `tokens.tag.status.tone.success.border` | `--component-tag-status-tone-success-border` |
| `tokens.tag.status.tone.warning.bg` | `--component-tag-status-tone-warning-bg` |
| `tokens.tag.status.tone.warning.text` | `--component-tag-status-tone-warning-text` |
| `tokens.tag.status.tone.warning.border` | `--component-tag-status-tone-warning-border` |
| `tokens.tag.status.tone.info.bg` | `--component-tag-status-tone-info-bg` |
| `tokens.tag.status.tone.info.text` | `--component-tag-status-tone-info-text` |
| `tokens.tag.status.tone.info.border` | `--component-tag-status-tone-info-border` |
| `tokens.tag.status.radiusMd` | `--component-tag-status-radius-md` |
| `tokens.tag.status.radiusLg` | `--component-tag-status-radius-lg` |
| `tokens.tag.status.minWidth` | `--component-tag-status-min-width` |
| `tokens.tag.status.pxSm` | `--component-tag-status-px-sm` |
| `tokens.tag.status.pxMd` | `--component-tag-status-px-md` |
| `tokens.tag.status.pySm` | `--component-tag-status-py-sm` |
| `tokens.tag.status.pyMd` | `--component-tag-status-py-md` |
| `tokens.tag.status.pyLg` | `--component-tag-status-py-lg` |
| `tokens.tag.status.hXs` | `--component-tag-status-h-xs` |
| `tokens.tag.status.hSm` | `--component-tag-status-h-sm` |
| `tokens.tag.status.hMd` | `--component-tag-status-h-md` |
| `tokens.tag.status.hLg` | `--component-tag-status-h-lg` |
| `tokens.tag.status.textSizeSm` | `--component-tag-status-text-size-sm` |
| `tokens.tag.status.textSizeMd` | `--component-tag-status-text-size-md` |

### Selector tag

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.tag.selector.bgDefault` | `--component-tag-selector-bg-default` |
| `tokens.tag.selector.bgHover` | `--component-tag-selector-bg-hover` |
| `tokens.tag.selector.bgSelected` | `--component-tag-selector-bg-selected` |
| `tokens.tag.selector.bgDisabled` | `--component-tag-selector-bg-disabled` |
| `tokens.tag.selector.borderSelected` | `--component-tag-selector-border-selected` |
| `tokens.tag.selector.textDefault` | `--component-tag-selector-text-default` |
| `tokens.tag.selector.textDisabled` | `--component-tag-selector-text-disabled` |
| `tokens.tag.selector.radius` | `--component-tag-selector-radius` |
| `tokens.tag.selector.px` | `--component-tag-selector-px` |
| `tokens.tag.selector.py` | `--component-tag-selector-py` |

### Tag group

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.tag.group.bgDefault` | `--component-tag-group-bg-default` |
| `tokens.tag.group.bgHover` | `--component-tag-group-bg-hover` |
| `tokens.tag.group.bgDisabled` | `--component-tag-group-bg-disabled` |
| `tokens.tag.group.textDefault` | `--component-tag-group-text-default` |
| `tokens.tag.group.textDisabled` | `--component-tag-group-text-disabled` |
| `tokens.tag.group.iconDefault` | `--component-tag-group-icon-default` |
| `tokens.tag.group.iconDisabled` | `--component-tag-group-icon-disabled` |
| `tokens.tag.group.closeBgHover` | `--component-tag-group-close-bg-hover` |
| `tokens.tag.group.radius` | `--component-tag-group-radius` |
| `tokens.tag.group.gap` | `--component-tag-group-gap` |
| `tokens.tag.group.px` | `--component-tag-group-px` |
| `tokens.tag.group.py` | `--component-tag-group-py` |
| `tokens.tag.group.h` | `--component-tag-group-h` |

### Add tag button

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.tag.addButton.bg` | `--component-tag-add-button-bg` |
| `tokens.tag.addButton.text` | `--component-tag-add-button-text` |
| `tokens.tag.addButton.icon` | `--component-tag-add-button-icon` |
| `tokens.tag.addButton.radiusLg` | `--component-tag-add-button-radius-lg` |
| `tokens.tag.addButton.radiusMd` | `--component-tag-add-button-radius-md` |
| `tokens.tag.addButton.radiusSm` | `--component-tag-add-button-radius-sm` |
| `tokens.tag.addButton.radiusXs` | `--component-tag-add-button-radius-xs` |
| `tokens.tag.addButton.gap` | `--component-tag-add-button-gap` |
| `tokens.tag.addButton.px` | `--component-tag-add-button-px` |
| `tokens.tag.addButton.pyLg` | `--component-tag-add-button-py-lg` |
| `tokens.tag.addButton.pyMd` | `--component-tag-add-button-py-md` |
| `tokens.tag.addButton.pySm` | `--component-tag-add-button-py-sm` |
| `tokens.tag.addButton.hLg` | `--component-tag-add-button-h-lg` |
| `tokens.tag.addButton.iconSizeLg` | `--component-tag-add-button-icon-size-lg` |
| `tokens.tag.addButton.iconSizeSm` | `--component-tag-add-button-icon-size-sm` |
| `tokens.tag.addButton.textSizeLg` | `--component-tag-add-button-text-size-lg` |
| `tokens.tag.addButton.textSizeSm` | `--component-tag-add-button-text-size-sm` |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

