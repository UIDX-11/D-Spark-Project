# Component: Switch

## Level

Molecular

## Aliases

- toggle
- on/off

## References

- Arco Design Web React（API / 行为真源）: https://arco.design/react/components/switch
- Arco 源码（React）: [`arco-design/components/Switch`](https://github.com/arco-design/arco-design/tree/main/components/Switch)
- Figma（Light，视觉真源）: [D.S. Web Com — Light](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) — 请在文件中定位 **Switch** 画板，将本行替换为带 `node-id=` 的深链接。
- 治理规范: `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`

## Figma

- 轨道 on/off 色、禁用轨道、滑块与阴影、md/lg 宽高与滑块直径以 **Figma Light** 为准；与 Arco 冲突时以 Figma 为准。
- **round / linear** 与 `tokens/src/component.json` 中 `switch.size.*`、`switch.linear.*`、`switch.knobInset`、`switch.focusRing` 对齐。

## Arco API 对齐（摘要）

| Arco `prop` | 说明 | 本 demo |
| ------------- | ---- | ------- |
| `model-value` / `v-model` | 受控开/关 | Live 点击切换 `aria-checked`（非受控示意） |
| `disabled` | 不可交互 | 侧栏 **State**：default / disabled |
| `size` | sm / default（md）/ lg | 侧栏 **Size**：md / lg（demo 无 sm） |
| `type` | `line`（线性）/ 默认圆轨 | 侧栏 **Variant**：round / linear（`data-variant`） |

## Arco DOM（与 demo 对齐）

- 推荐：**`button[type=button]`** 根节点（demo：`button.ds-switch`），内层 **`span.ds-switch-track`** + **`span.ds-switch-knob`**；**`role="switch"`**、**`aria-checked`**、禁用 **`disabled`** + **`aria-disabled`**。
- 可见名称：demo 使用 **`aria-label`**；表单场景应用 **`aria-labelledby`** 关联文案。
- 类名前缀 **`ds-switch*`**，不要求与 `arco-switch` 字符串一致。

## 推断（Figma 未单独画出的状态）

- **键盘焦点环**：与 Arco 一致保留 **`focus-visible`** 外显环，token **`--component-switch-focus-ring`**（`tokens.switch.focusRing`）。
- **矩阵「Focus」行**：静态 **`is-demo-focus`** 与真焦点环同款 `box-shadow`，便于并排对比。
- **线性轨道高度**：Figma 若未拆 md/lg，demo 使用 **`tokens.switch.linear.md.trackHeight` / `lg.trackHeight`** 推断细轨厚度。

## Best practices

- **Use for**: 即时开关某个布尔设置（on/off）。
- **When not to**:
  - 需要“确认/提交”的场景 → 用 `Checkbox` + 提交按钮或 `Form`
  - 多个互斥项 → 用 `Radio`
- **States**: default, disabled
- **Content**:
  - 轨道内内容建议保持极简（无 / 图标）
  - 在列表或表单中，建议配合右侧说明文案（不要让用户猜测开关含义）

## Layout patterns

- **Settings list**: 左侧标题+说明，右侧 Switch
- **Inline form**: 与 Input/Select 同行对齐（同一密度）
- **Table row**: 作为布尔字段快速编辑（注意禁用态与权限）

## Anti-patterns

- 用 Switch 表达多状态（>2 状态）
- 仅靠颜色表达开关含义（必须有清晰的 on/off 语义）
- 禁用态仍表现为可交互（hover/press 反馈）

## Accessibility essentials

- **Role**: `switch`
- **Name**: 必须有可访问名称（label/aria-label），不要只靠图标
- **Keyboard**: `Space`/`Enter` 切换
- **State**: 使用 `aria-checked` 反映开/关；禁用用 `aria-disabled`

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `switch/round/pill/lg/default`
  - `switch/round/pill/md/disabled`
  - `switch/linear/pill/lg/default`

## Anatomy

### Round (圆形)

```
┌──────────────────┐
│  [track content] │   track (pill)
│          (knob)  │   knob (circle)
└──────────────────┘
```

- **Track**: pill 背景色
- **Knob**: 圆形滑块（可带 icon）
- **Track content (optional)**: 无 / 图标（如对勾）

### Linear (线性)

```
track (thin)  ─────────────
knob          ○
```

- **Track**: 细轨道
- **Knob**: 更大的圆形滑块（带阴影）

## Variants


| **Kind**            | **When to use** | **Notes**     |
| ------------------- | --------------- | ------------- |
| `round`             | 默认推荐            | 轨道与滑块一体，视觉更明确 |
| `linear`            | 极简/弱强调          | 轨道更细，主要依赖滑块位置 |
| `trackContent/none` | 默认              | 轨道内无图标        |
| `trackContent/icon` | 需要更强 on/off 提示  | 仅用于辅助，不替代语义文本 |


## Sizes


| **Size** | **Height**                               | **Width**                               | **Knob**                               |
| -------- | ---------------------------------------- | --------------------------------------- | -------------------------------------- |
| `lg`     | `var(--component-switch-size-lg-height)` | `var(--component-switch-size-lg-width)` | `var(--component-switch-size-lg-knob)` |
| `md`     | `var(--component-switch-size-md-height)` | `var(--component-switch-size-md-width)` | `var(--component-switch-size-md-knob)` |


## States

> 规则：组件规范只引用 component tokens（`var(--component-switch-...)`）。

### Track colors


| **State** | **On**                                      | **Off**                                      |
| --------- | ------------------------------------------- | -------------------------------------------- |
| Default   | `var(--component-switch-track-on-default)`  | `var(--component-switch-track-off-default)`  |
| Disabled  | `var(--component-switch-track-on-disabled)` | `var(--component-switch-track-off-disabled)` |


### Knob


| **State** | **Knob bg**                                | **Knob shadow**                       |
| --------- | ------------------------------------------ | ------------------------------------- |
| Default   | `var(--component-switch-knob-bg-default)`  | `var(--component-switch-knob-shadow)` |
| Disabled  | `var(--component-switch-knob-bg-disabled)` | `var(--component-switch-knob-shadow)` |


### Icons (optional)


| **Role**        | **Token**                          |
| --------------- | ---------------------------------- |
| Track icon (on) | `var(--component-switch-icon-on)`  |
| Knob icon (off) | `var(--component-switch-icon-off)` |


## Component token bindings (required)

### Shared（焦点与布局）

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.switch.focusRing` | `--component-switch-focus-ring` |
| `tokens.switch.knobInset` | `--component-switch-knob-inset` |

### Linear（细轨高度，与 `data-variant="linear"` 配套）

| **Token path** | **CSS var** |
| --- | --- |
| `tokens.switch.linear.md.trackHeight` | `--component-switch-linear-md-track-height` |
| `tokens.switch.linear.lg.trackHeight` | `--component-switch-linear-lg-track-height` |

### Colors


| **Token path**                     | **CSS var**                             |
| ---------------------------------- | --------------------------------------- |
| `tokens.switch.track.on.default`   | `--component-switch-track-on-default`   |
| `tokens.switch.track.on.disabled`  | `--component-switch-track-on-disabled`  |
| `tokens.switch.track.off.default`  | `--component-switch-track-off-default`  |
| `tokens.switch.track.off.disabled` | `--component-switch-track-off-disabled` |
| `tokens.switch.knob.bg.default`    | `--component-switch-knob-bg-default`    |
| `tokens.switch.knob.bg.disabled`   | `--component-switch-knob-bg-disabled`   |
| `tokens.switch.icon.on`            | `--component-switch-icon-on`            |
| `tokens.switch.icon.off`           | `--component-switch-icon-off`           |
| `tokens.switch.knob.shadow`        | `--component-switch-knob-shadow`        |


### Sizes


| **Token path**                 | **CSS var**                         |
| ------------------------------ | ----------------------------------- |
| `tokens.switch.size.lg.height` | `--component-switch-size-lg-height` |
| `tokens.switch.size.lg.width`  | `--component-switch-size-lg-width`  |
| `tokens.switch.size.lg.knob`   | `--component-switch-size-lg-knob`   |
| `tokens.switch.size.md.height` | `--component-switch-size-md-height` |
| `tokens.switch.size.md.width`  | `--component-switch-size-md-width`  |
| `tokens.switch.size.md.knob`   | `--component-switch-size-md-knob`   |

## Do

- 遵循本文 **Best practices** / **Variants** 与 Figma、token 表；governed HTML 使用 `tokens.css` 变量（`--semantic-*` / `--component-*`），避免裸 px/hex。
- 落实 **Accessibility essentials**（键盘、可见焦点、可访问名称）。

## Don't

- 违反 **Anti-patterns** 与本组件规格中的异常条款；在 design-spec demo 中对布局/色使用内联 `style=…px/#…`（见 `scan_token_violations`）。

