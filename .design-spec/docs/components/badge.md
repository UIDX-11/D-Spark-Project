# Component: Badge

## Level

Molecular

## Aliases

- indicator
- notification badge
- count badge
- status dot

## References

- Arco Vue（API / 行为真源）: https://arco.design/vue/component/badge
- Arco 源码: `arco-design-vue/packages/web-vue/components/badge/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Badge** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- Count / dot / status 的尺寸、圆角、间距、色与字重以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- **Sizes** 与 `tokens/src/component.json` 中 `badge.count.*`、`badge.dot.*`、`badge.status.*` 对齐；变更时先改 token，再更新本文与生成 HTML。

## Arco API 对齐（摘要）

| Arco `prop` / 行为 | 说明 | 本 demo |
| ------------------ | ---- | ------- |
| `count` / `text` | 数字或文案；`0` 是否隐藏由业务决定 | 侧栏 **State** 提供 `single` / `multi`（`99+`）示意 |
| `dot` | 仅红点提示 | **Kind** = `dot` + default / disabled |
| `status` / `status` 色 | 与 `processing` 等枚举对应 | **Kind** = `status` + 侧栏 tone 选项 |
| `offset` 等叠加 | 相对宿主定位 | 本页仅单徽章，叠加见 **Layout patterns** |

## Arco DOM（与 demo 对齐）

- **Count**：外层 **`span`**（demo：`span.ds-badge.ds-badge--count`），内层 **`span.ds-badge-count`** 承载数字与 pill 背景（类名前缀 **`ds-badge*`**，不要求与 `arco-badge` 字符串一致）。
- **Dot**：**`span.ds-badge.ds-badge--dot`** + **`span.ds-badge-dot`**（`aria-hidden`），外层 **`role="status"`** 与 **`aria-label`** 由宿主/产品文案提供；demo 使用固定示意文案。
- **Status**：**`span.ds-badge.ds-badge--status`** + 圆点 + **`span.ds-badge-status-label`**。

## Best practices

- **Use for**:
  - 显示“未读/待处理数量”（count badge）
  - 显示“状态”（status dot + label）
- **When not to**:
  - 作为唯一的告警信息载体（应配合文案/Toast/Alert）
  - 用 badge 替代按钮或导航（badge 只做提示）
- **Content**:
  - 数量建议限制上限显示（例如 `99+` / `999+`，按业务约定）
  - 非关键不展示 `0`
- **States**: default, disabled（置灰）

## Layout patterns

- **Top bar icon**: 图标右上角叠加 badge（单数或红点）
- **Avatar**: 头像右上角叠加 badge（数字、红点或自定义 icon）
- **List item**: 文本或图标旁边放置状态 badge（dot + label）

## Anti-patterns

- badge 过大或数字过长导致遮挡主体内容
- 颜色语义混乱：同一颜色在不同场景表达不同含义
- 把 badge 当成可点击主要入口（除非明确设计为可交互控件）

## Accessibility essentials

- **Name**:
  - count badge 应被读屏为 “未读 X” / “通知 X”（由宿主组件提供 aria-label）
  - dot badge 需要可感知文本（如“进行中/成功/提醒/错误”）或通过 aria-label 补足语义
- **Focus**: badge 一般不单独可聚焦；若可点击，必须有清晰 focus ring 和 hit target
- **Contrast**: 文本/数字与背景的对比度需满足可读性（token 驱动）

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `badge/count/pill/sm/default`
  - `badge/dot/pill/sm/default`
  - `badge/status/dot+label/sm/success`

## Anatomy

### Count badge

```
┌───────────┐
│   16      │   (min width, padding-x)
└───────────┘
```

- **Container**: pill 背景 + 圆角（100px）
- **Text**: 数字/上限文案（12/Medium）

### Dot badge

```
●   (no text)
```

- **Dot**: 固定直径的小圆点

### Status badge

```
●  Status
```

- **Dot**: 颜色表达状态（默认/进行中/成功/提醒/错误）
- **Label**: 14/Medium 文本

## Variants


| **Kind**         | **When to use**       | **Notes**             |
| ---------------- | --------------------- | --------------------- |
| `count`          | 未读数/数量提醒              | 建议做最大值截断：`99+`/`999+` |
| `dot`            | 只提示“有更新”但不关心数量        | 不要用 dot 表达多个语义        |
| `status`         | 状态展示（配合文本）            | dot 颜色必须稳定映射语义        |
| `overlay/icon`   | 叠加在 icon/头像右上角        | 位置需与宿主组件保持一致          |
| `overlay/custom` | 叠加自定义 icon（如 message） | 需要 icon-wrapper       |


## Sizes

Live 侧栏 **Kind** / **State or tone** 与 Figma、token 对应（当前单档 MD；Light）。

| **Element** | **CSS 变量** |
| ----------- | ------------ |
| Count 高度 / 圆角 / 水平 padding（多位） | `--component-badge-count-height` / `--component-badge-count-radius` / `--component-badge-count-px` |
| Count 单数字 padding / min-width | `--component-badge-count-px-single` / `--component-badge-count-min-width-single` |
| Count 字号 / 行高 | `--component-badge-count-font-size` / `--component-badge-count-line-height` |
| Dot 直径 | `--component-badge-dot-size` |
| Dot 填充（默认 / disabled） | `--component-badge-dot-fill-default` / `--component-badge-dot-fill-disabled` |
| Status 点与文案间距 / 文案字号行高 | `--component-badge-status-gap` / `--component-badge-status-font-size` / `--component-badge-status-line-height` |
| Status 文案色 | `--component-badge-status-label` |


## States

### Count / dot (default vs disabled)


| **State** | **Background**                             | **Text**                                     |
| --------- | ------------------------------------------ | -------------------------------------------- |
| Default   | `var(--component-badge-count-bg-default)`  | `var(--component-badge-count-text-default)`  |
| Disabled  | `var(--component-badge-count-bg-disabled)` | `var(--component-badge-count-text-disabled)` |


### Status — semantic colors


| **Status** | **Dot**                                        | **Label**                             |
| ---------- | ---------------------------------------------- | ------------------------------------- |
| Default    | `var(--component-badge-status-dot-default)`    | `var(--component-badge-status-label)` |
| Processing | `var(--component-badge-status-dot-processing)` | `var(--component-badge-status-label)` |
| Success    | `var(--component-badge-status-dot-success)`    | `var(--component-badge-status-label)` |
| Warning    | `var(--component-badge-status-dot-warning)`    | `var(--component-badge-status-label)` |
| Error      | `var(--component-badge-status-dot-error)`      | `var(--component-badge-status-label)` |


## Component token bindings (required)

### Count / dot


| **Token path**                      | **CSS var**                                |
| ----------------------------------- | ------------------------------------------ |
| `tokens.badge.count.bg.default`     | `--component-badge-count-bg-default`       |
| `tokens.badge.count.bg.disabled`    | `--component-badge-count-bg-disabled`      |
| `tokens.badge.count.text.default`   | `--component-badge-count-text-default`     |
| `tokens.badge.count.text.disabled`  | `--component-badge-count-text-disabled`    |
| `tokens.badge.count.height`         | `--component-badge-count-height`           |
| `tokens.badge.count.radius`         | `--component-badge-count-radius`           |
| `tokens.badge.count.px`             | `--component-badge-count-px`               |
| `tokens.badge.count.pxSingle`       | `--component-badge-count-px-single`        |
| `tokens.badge.count.minWidthSingle` | `--component-badge-count-min-width-single` |
| `tokens.badge.count.fontSize`       | `--component-badge-count-font-size`        |
| `tokens.badge.count.lineHeight`     | `--component-badge-count-line-height`      |
| `tokens.badge.dot.size`             | `--component-badge-dot-size`               |
| `tokens.badge.dot.fillDefault`      | `--component-badge-dot-fill-default`       |
| `tokens.badge.dot.fillDisabled`     | `--component-badge-dot-fill-disabled`      |


### Status


| **Token path**                       | **CSS var**                               |
| ------------------------------------ | ----------------------------------------- |
| `tokens.badge.status.gap`            | `--component-badge-status-gap`            |
| `tokens.badge.status.fontSize`      | `--component-badge-status-font-size`     |
| `tokens.badge.status.lineHeight`    | `--component-badge-status-line-height`   |
| `tokens.badge.status.dot.default`    | `--component-badge-status-dot-default`    |
| `tokens.badge.status.dot.processing` | `--component-badge-status-dot-processing` |
| `tokens.badge.status.dot.success`    | `--component-badge-status-dot-success`    |
| `tokens.badge.status.dot.warning`    | `--component-badge-status-dot-warning`    |
| `tokens.badge.status.dot.error`      | `--component-badge-status-dot-error`      |
| `tokens.badge.status.label`          | `--component-badge-status-label`          |


