# Component: Slider

## Level

Molecular

## Aliases

- range slider
- slider input
- scrubber

## References

- Arco Vue（API / 行为真源）: [https://arco.design/vue/component/slider](https://arco.design/vue/component/slider)
- Arco 源码: `arco-design-vue/packages/web-vue/components/slider/`
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Slider** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 轨道高度、圆角、激活段与拇指尺寸、刻度点与标注字色以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- 下方 **Component token bindings** 与 `tokens/src/component.json` 中 `slider.*` 对齐。

## Arco API 对齐（摘要）

| Arco `prop` / 行为 | 说明 | 本 demo |
| --- | --- | --- |
| `model-value` / `default-value` | 单值或 `[min,max]` 范围 | 侧栏 **single / range**；Live 内可键盘与拖拽改值 |
| `min` / `max` / `step` | 边界与步进 | 固定 `0` / `100` / `1`（演示） |
| `marks` | 刻度与标注 | 侧栏 **Marks on** 时展示 0–100 五档 |
| `disabled` | 禁用 | 侧栏 **disabled** |
| `show-tooltip` 等 | 可选气泡 | 未实现（见「推断」） |

## Arco DOM（与 demo 对齐）

- Arco 实现为组合组件（输入条、拇指、刻度等）；本仓库 Live 使用 **`div.ds-sl-track` + `div.ds-sl-fill` + `button.ds-sl-thumb`**，拇指为 **`role="slider"`** 并带 **`aria-valuemin` / `aria-valuemax` / `aria-valuenow`**，不要求类名与 `arco-slider*` 一致。
- 刻度与标注在 demo 中为装饰性展示：`aria-hidden="true"`（与 Arco 可聚焦刻度策略不同处见 MD「推断」）。

## 推断

- **Tooltip**：Arco 支持 `show-tooltip` 等；稿面与 token 未定义气泡层时，demo 不展示 tooltip，仅保留 thumb 焦点环（`--component-slider-thumb-ring-active`）。
- **Marks 点击跳转**：Arco `marks` 可配合交互；当前 HTML demo 仅静态展示刻度与标签，不实现点击刻度设值（可在后续对齐任务中按 `slider.md` Executable rules 扩展）。
- **范围滑块交叉**：键盘或拖拽后若两拇指顺序颠倒，demo 采用 **交换两值** 以保持 `min ≤ max` 的视觉与填充段一致（与常见「交换」策略一致，若产品选定 clamp 策略需在 MD 与脚本中统一）。

## Best practices

- **Use for**: selecting a value within a continuous range where visual scanning helps.
- **Use marks** for key thresholds (0/25/50/75/100) when they matter.
- **Provide numeric input** when precision is needed (design shows optional input).
- **Tooltips** should appear on drag or focus (avoid always-on for noisy UIs).

## Layout patterns

- **Settings**: value slider with optional input on the right.
- **Filters**: range slider (two thumbs) with min/max inputs.

## Anti-patterns

- Using slider for large discrete sets (use Select).
- No keyboard interaction (must be operable without mouse).
- Range slider without clear min/max meaning (must label).

## Accessibility essentials

- **Keyboard**: Arrow keys step; PageUp/PageDown larger step; Home/End to min/max.
- **Focus**: visible focus ring on thumb.
- **Name**: each thumb has accessible name (e.g., “Minimum value”, “Maximum value”).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `slider/single/rounded/md/default`
  - `slider/single/rounded/md/with-marks`
  - `slider/range/rounded/md/default`

## Anatomy

```
┌────────────────────────────── slider ──────────────────────────────┐
│ Track (inactive)                                                   │
│ Track (active)                                                     │
│ Thumb (1) or Thumbs (2)                                            │
│ (optional) Ticks / marks + labels                                  │
│ (optional) Right input (value) / Min-Max inputs                     │
└────────────────────────────────────────────────────────────────────┘
```

## Variants

| **Kind** | **Thumbs** | **Marks** | **Input** | **Notes** |
| --- | ---:| --- | --- | --- |
| `single` | 1 | optional | optional | default slider |
| `range` | 2 | optional | optional | min–max selection |

## Sizes

> Figma node uses a compact track with a circular thumb (tokenized below). If future sizes are introduced, add a size table.

| **Size** | **Thumb** | **Track radius** |
| --- | --- | --- |
| `MD` | token-driven | token-driven |

## States

### Track

| **Part** | **Token** |
| --- | --- |
| Inactive track | `var(--component-slider-track-bg)` |
| Active track | `var(--component-slider-track-bg-active)` |

### Thumb

| **State** | **BG** | **Border** | **Ring** |
| --- | --- | --- | --- |
| Default | `var(--component-slider-thumb-bg-default)` | `var(--component-slider-thumb-border-default)` | none |
| Hover | `var(--component-slider-thumb-bg-hover)` | `var(--component-slider-thumb-border-hover)` | none |
| Focus/Dragging | `var(--component-slider-thumb-bg-active)` | `var(--component-slider-thumb-border-active)` | `var(--component-slider-thumb-ring-active)` |
| Disabled | `var(--component-slider-thumb-bg-disabled)` | `var(--component-slider-thumb-border-disabled)` | none |

### Marks / ticks

| **Part** | **Token** |
| --- | --- |
| Tick active | `var(--component-slider-tick-active)` |
| Tick inactive | `var(--component-slider-tick-inactive)` |
| Tick dot尺寸 | `var(--component-slider-tick-size)`（与布局间距 `layout.ticksMarginTop` 配合） |
| Mark label text | `var(--component-slider-mark-text)` |
| Mark label字号 | `var(--component-slider-mark-font-size)`（与 `layout.marksMarginTop` 配合） |

## Executable interaction rules

### Value model

- Slider has `min`, `max`, `step`.
- Value snaps to step increments.
- Range variant maintains `valueMin ≤ valueMax`.

### Dragging

- Drag thumb updates draft value continuously.
- On release, commit value (or keep live update if product prefers).
- Clicking on track jumps thumb to nearest step (recommended).

### Range

- When thumbs cross, either:
  - swap (allowed) OR
  - clamp (allowed)
  - pick one policy globally.
- Ensure min thumb cannot exceed max thumb after snap.

### Marks (when enabled)

- Marks are optional labeled stops.
- Clicking a mark sets to that mark value.

### Tooltip (optional)

- Show on hover/focus/drag with current value.
- For range, show tooltip per thumb.

### Keyboard & ARIA (required)

- Use `role="slider"` on each thumb with:
  - `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
  - `aria-orientation="horizontal"`
- Key bindings (per thumb):
  - ArrowLeft/ArrowDown: decrease by `step`
  - ArrowRight/ArrowUp: increase by `step`
  - PageDown/PageUp: decrease/increase by \(10×step\) (or configured)
  - Home/End: set to min/max

## Component token bindings (required)

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.slider.track.bg` | `--component-slider-track-bg` |
| `tokens.slider.track.bgActive` | `--component-slider-track-bg-active` |
| `tokens.slider.track.radius` | `--component-slider-track-radius` |
| `tokens.slider.track.h` | `--component-slider-track-h` |
| `tokens.slider.track.maxWidth` | `--component-slider-track-max-width` |
| `tokens.slider.layout.ticksMarginTop` | `--component-slider-layout-ticks-margin-top` |
| `tokens.slider.layout.marksMarginTop` | `--component-slider-layout-marks-margin-top` |
| `tokens.slider.thumb.bgDefault` | `--component-slider-thumb-bg-default` |
| `tokens.slider.thumb.bgHover` | `--component-slider-thumb-bg-hover` |
| `tokens.slider.thumb.bgActive` | `--component-slider-thumb-bg-active` |
| `tokens.slider.thumb.bgDisabled` | `--component-slider-thumb-bg-disabled` |
| `tokens.slider.thumb.borderDefault` | `--component-slider-thumb-border-default` |
| `tokens.slider.thumb.borderHover` | `--component-slider-thumb-border-hover` |
| `tokens.slider.thumb.borderActive` | `--component-slider-thumb-border-active` |
| `tokens.slider.thumb.borderDisabled` | `--component-slider-thumb-border-disabled` |
| `tokens.slider.thumb.ringActive` | `--component-slider-thumb-ring-active` |
| `tokens.slider.thumb.size` | `--component-slider-thumb-size` |
| `tokens.slider.thumb.borderWidth` | `--component-slider-thumb-border-width` |
| `tokens.slider.tick.active` | `--component-slider-tick-active` |
| `tokens.slider.tick.inactive` | `--component-slider-tick-inactive` |
| `tokens.slider.tick.size` | `--component-slider-tick-size` |
| `tokens.slider.mark.text` | `--component-slider-mark-text` |
| `tokens.slider.mark.fontSize` | `--component-slider-mark-font-size` |
