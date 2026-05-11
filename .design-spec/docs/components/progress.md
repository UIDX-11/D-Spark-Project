# Component: Progress

## Level

Molecular

## Aliases

- progress bar
- step progress (button-like)
- progress ring

## References

- Arco Design Web React（API / 行为真源）: [https://arco.design/react/components/progress](https://arco.design/react/components/progress)
- Arco 源码（React）: [`arco-design/components/Progress`](https://github.com/arco-design/arco-design/tree/main/components/Progress)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Progress** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- **Line** 轨道与填充色、**SM/LG** 高度、圆角与 **Circle** 直径档以稿面为准；与 `tokens/src/component.json` 中 `progress.line.*`、`progress.circle.*`、`progress.mini.*`、`progress.step.*` 一致。

## Arco API 对齐（摘要）


| Arco `prop` / 行为     | 说明                             | 本 demo                                               |
| -------------------- | ------------------------------ | ---------------------------------------------------- |
| `type`               | `line` / `circle` / `mini` / … | 侧栏 **Kind**：line / circle / mini / step（step 为静态示意）  |
| `percent` / `status` | 0–100 与成功/错误等                  | 侧栏 **State**：running / zero / success / error / busy |
| `size`（若适用）          | 尺寸档                            | 侧栏 **Size** 映射 line 高（sm/lg）与 circle（sm/md/lg）       |


## Arco DOM（与 demo 对齐）

- **Line**：`role="progressbar"` 置于条形容器；**determinate** 使用 `aria-valuemin` / `aria-valuemax` / `aria-valuenow`；**indeterminate** 省略 `aria-valuenow` 并使用 `aria-valuetext="Loading"`（与 `progress.md` Executable rules 一致）。
- **Circle**：外层 `role="progressbar"` + SVG `aria-hidden="true"` 装饰环；中心文案为可视百分比（读屏依赖 `aria-valuenow` 等）。
- 类名前缀 `**ds-pr-*`**，不要求与 `arco-progress*` 一致。

## 推断

- **Indeterminate 动画**：demo 对 line / circle 使用 **CSS 动画**（`prefers-reduced-motion: reduce` 时减弱或关闭），不新增动画色 token。
- **Step 形态**：Arco `steps` 模式与 Figma「药丸分段」接近；本 demo 用 `**role="group"`** 三格静态示意，完整键盘与状态机可在后续迭代加厚。

## Best practices

- **Use for**: indicating completion of a task or a multi-step operation.
- **Always show meaning**:
  - determinate: percent value is authoritative
  - indeterminate: show activity but **do not** show percent
- **Status mapping (from Figma)**:
  - `inProgress` uses success/active color
  - `success` shows check
  - `error` shows error mark
  - `notStarted` shows muted track + `0%`
  - `cancelling` can show “取消中” text label

## Layout patterns

- **Inline**: progress-line with optional trailing label (`66%` or `取消中`).
- **Compact**: progress-mini marker used as suffix for line success/error.
- **Dashboard**: progress-circle with center label (percent) or status icon.

## Anti-patterns

- Showing percent for indeterminate loading.
- Using red for normal in-progress (reserve red for error only).
- Updating progress too frequently (throttle UI updates; recommended 200–500ms).

## Accessibility essentials

- **Role**: `role="progressbar"`.
- **Aria values**:
  - determinate: set `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow=<value>`
  - indeterminate: omit `aria-valuenow` and add `aria-valuetext="Loading"`
- **Label**: provide `aria-label` or `aria-labelledby` describing the task.

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `progress/line/rounded/sm/in-progress`
  - `progress/line/rounded/lg/success`
  - `progress/circle/rounded/md/error`
  - `progress/mini/dot/xs/success`

## Anatomy

### Line

```
[ track (bg) ]
[ fill  (active) ]  (optional) [mini-status] [label]
```

### Circle

```
ring track + ring fill
center: percent text OR status icon
```

## Variants


| **Kind** | **Description**       | **Notes**                    |
| -------- | --------------------- | ---------------------------- |
| `line`   | horizontal bar        | sizes 4/8, optional label    |
| `circle` | ring progress         | sizes small/medium/large     |
| `mini`   | 16px marker           | used standalone or as suffix |
| `step`   | button-like segmented | shows start/complete in pill |


## Sizes

### Line


| **Size** | **Height** | **Label**             |
| -------- | ---------- | --------------------- |
| `SM`     | 4          | 12/16 for small label |
| `LG`     | 8          | 14/20 for label       |


### Circle


| **Size** | **Diameter** | **Center content** |
| -------- | ------------ | ------------------ |
| `SM`     | 48           | 14/20 percent      |
| `MD`     | 64           | 14/20 percent      |
| `LG`     | 80           | 14/20 percent      |


### Mini


| **Size** | **Box** |
| -------- | ------- |
| `XS`     | 16      |


## States


| **State**     | **Meaning** | **Line fill** | **Circle center** | **Label**        |
| ------------- | ----------- | ------------- | ----------------- | ---------------- |
| `not-started` | 0%          | none          | `0%`              | optional         |
| `in-progress` | determinate | active        | percent           | optional percent |
| `cancelling`  | cancelling  | active        | percent           | “取消中”            |
| `success`     | finished    | success       | check icon        | optional         |
| `error`       | failed      | danger        | error icon        | optional         |


## Executable interaction rules

### Value model

- Clamp percent to [0, 100].
- When switching from indeterminate → determinate, animate from last known percent (or 0) to new value.

### Animation

- Determinate: animate fill length with easing (200–300ms recommended).
- Indeterminate: use looping animation on fill segment (respect reduced-motion).

### Text rules

- If `status=cancelling`, label shows “取消中” (from Figma).
- Only show percent label when width allows; otherwise hide label (do not overflow).

## Component token bindings (required)


| **Token path**                         | **CSS var**                                  |
| -------------------------------------- | -------------------------------------------- |
| `tokens.progress.line.track`           | `--component-progress-line-track`            |
| `tokens.progress.line.fillActive`      | `--component-progress-line-fill-active`      |
| `tokens.progress.line.fillSuccess`     | `--component-progress-line-fill-success`     |
| `tokens.progress.line.fillError`       | `--component-progress-line-fill-error`       |
| `tokens.progress.line.hSm`             | `--component-progress-line-h-sm`             |
| `tokens.progress.line.hLg`             | `--component-progress-line-h-lg`             |
| `tokens.progress.line.radius`          | `--component-progress-line-radius`           |
| `tokens.progress.label.text`           | `--component-progress-label-text`            |
| `tokens.progress.circle.track`         | `--component-progress-circle-track`          |
| `tokens.progress.circle.strokeActive`  | `--component-progress-circle-stroke-active`  |
| `tokens.progress.circle.strokeSuccess` | `--component-progress-circle-stroke-success` |
| `tokens.progress.circle.strokeError`   | `--component-progress-circle-stroke-error`   |
| `tokens.progress.circle.text`          | `--component-progress-circle-text`           |
| `tokens.progress.circle.sizeSm`        | `--component-progress-circle-size-sm`        |
| `tokens.progress.circle.sizeMd`        | `--component-progress-circle-size-md`        |
| `tokens.progress.circle.sizeLg`        | `--component-progress-circle-size-lg`        |
| `tokens.progress.mini.size`            | `--component-progress-mini-size`             |
| `tokens.progress.step.bg`              | `--component-progress-step-bg`               |
| `tokens.progress.step.fill`            | `--component-progress-step-fill`             |
| `tokens.progress.step.textOnFill`      | `--component-progress-step-text-on-fill`     |
| `tokens.progress.step.radius`          | `--component-progress-step-radius`           |
| `tokens.progress.step.h`               | `--component-progress-step-h`                |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

