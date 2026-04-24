# Component: Switch

## Level

Molecular

## Aliases

- toggle
- on/off

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


