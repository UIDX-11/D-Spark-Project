# Figma `get_variable_defs` snapshot — pilot components

> **Layer / 层级**: **L4 — 生成快照**（MCP 提取，非规范真源）。  
> 桥接真源在 [`../FIGMA_VARIABLES_TOKEN_BRIDGE.yaml`](../FIGMA_VARIABLES_TOKEN_BRIDGE.yaml)；本快照仅记录单次提取。治理见 [`DESIGN_MD_GOVERNANCE_AUDIT.md`](DESIGN_MD_GOVERNANCE_AUDIT.md)。

Read-only extraction from the Figma MCP `get_variable_defs` for the 7-component pilot set, captured against file `KJfy0GFDs8kLsXTzhTxAjd` (D.S. Web Com — Light V2 2026). Sources are not stable identifiers — re-extract if the Figma file is reorganized.

Variable names use the Figma file's bilingual paths (`填充 Fill/...`, `中性色 Neutral/Global light/...`). These map to D-Spark CSS variables via [FIGMA_VARIABLES_TOKEN_BRIDGE.yaml](../FIGMA_VARIABLES_TOKEN_BRIDGE.yaml).

## Recurring foundations (every pilot node)

| Figma variable path | Resolved value | D-Spark CSS var |
| --- | --- | --- |
| `文字&图标 Text&Icon/无组件绑定 unbound/强调 primary` | `#222222` | `--semantic-text-primary` |
| `文字&图标 Text&Icon/无组件绑定 unbound/次要 secondary` | `#666666` | `--semantic-text-secondary` |
| `文字&图标 Text&Icon/无组件绑定 unbound/辅助 Territory` | `#999999` | `--semantic-text-placeholder` |
| `文字&图标 Text&Icon/无组件绑定 unbound/禁用 disabled` | `#cccccc` | `--semantic-text-muted` |
| `文字&图标 Text&Icon/无组件绑定 unbound/始终白 Always white` | `#ffffff` | `--semantic-text-inverse` |
| `文字&图标 Text&Icon/无组件绑定 unbound/危险&报错&必填 error-default` | `#f14846` | `--semantic-status-danger` |
| `文字&图标 Text&Icon/无组件绑定 unbound/信息&提示&接入 Info` | `#3f78e4` | `--semantic-status-info` |
| `文字&图标 Text&Icon/无组件绑定 unbound/成功 Success` | `#09aa5c` | `--semantic-status-success` |
| `填充 Fill/无组件绑定/页面背景_100  page-100` | `#ffffff` | `--semantic-bg-surface` |
| `填充 Fill/无组件绑定/卡片背景_100 card-100` | `#ffffff` | `--semantic-bg-surface` |
| `字体 Font/Family` | `Montserrat` | (font stack — see `foundations/`) |
| `字重 Font Weight/Weight-常规` | `Medium` (≈ weight 500) | typography preset |
| `字重 Font Weight/Weight-加粗` | `Semibold` (≈ weight 600) | typography preset |
| `12/EN-Medium`, `14/EN-Medium`, `14/EN-Semibold`, `14/CN-Regular`, etc. | composite font specs | `--semantic-font-size-sm/md/lg` + line-height |

## Per-component highlights

### button (10657:99018)

Captures the full button color matrix (primary / secondary / tertiary / outline / text / danger × default/hover/active/disabled).

| Figma path | Value | CSS var |
| --- | --- | --- |
| `填充 Fill/组件绑定/按钮 Button/主按钮 primary/默认 default` | `#222222` | `--semantic-action-primary-bg` → `--component-button-primary-bg-default` |
| `填充 Fill/组件绑定/按钮 Button/主按钮 primary/悬停 hover` | `#4e4e4e` | `--semantic-action-primary-bg-hover` → `--component-button-primary-bg-hover` |
| `填充 Fill/组件绑定/按钮 Button/主按钮 primary/激活 active` | `#1b1b1b` | `--semantic-action-primary-bg-active` → `--component-button-primary-bg-active` |
| `填充 Fill/组件绑定/按钮 Button/主按钮 primary/禁用 disabled` | `#a7a7a7` | `--semantic-action-primary-bg-disabled` → `--component-button-primary-bg-disabled` |
| `文字&图标 Text&Icon/组件绑定 bound/按钮 button/默认按钮 Default/主按钮-默认default` | `#ffffff` | `--component-button-primary-text-default` |
| `填充 Fill/组件绑定/按钮 Button/次按钮 secondary/悬停 hover` | `#e6e6e6` | `--component-button-neutral-bg-hover` |
| `填充 Fill/组件绑定/按钮 Button/次按钮 secondary/激活 activate` | `#cccccc` | `--component-button-neutral-bg-active` |
| `边框 Border/组件绑定/按钮 Button/次按钮 secondary/默认 default` | `#999999` | `--component-button-neutral-border-default` |
| `填充 Fill/组件绑定/按钮 Button/危险_主按钮 danger-primary/默认` | `#f14846` | `--component-button-danger-bg-default` (matches `--semantic-status-danger`) |
| `填充 Fill/组件绑定/按钮 Button/虚框按钮 dashed/默认 default` | `#f7f7f7` | `--component-button-outline-bg-default` (uses `--semantic-bg-form-default`) |

### input (117269:199903)

| Figma path | Value | CSS var |
| --- | --- | --- |
| `填充 Fill/组件绑定/表单 Form/默认` | `#f7f7f7` | `--semantic-bg-form-default` → `--component-input-bg-default` |
| `填充 Fill/组件绑定/表单 Form/悬停` | `#e8e8e8` | `--semantic-bg-form-hover` → `--component-input-bg-hover` |
| `填充 Fill/组件绑定/表单 Form/禁用` | `#fafafa` | `--semantic-bg-form-disabled` → `--component-input-bg-disabled` |
| `填充 Fill/组件绑定/表单 Form/报错` | `#f7f7f7` | `--semantic-bg-form-default` (border carries error state) |
| `边框 Border/组件绑定/表单 Form/激活` | `#222222` | `--semantic-text-primary` → `--component-input-border-focus` |
| `边框 Border/组件绑定/表单 Form/报错` | `#f14846` | `--semantic-status-danger` → `--component-input-border-error` |
| `请输入` | `Please enter` | placeholder copy fallback |

### select (116529:135291)

Same Form palette as `input`. Adds:

| Figma path | Value | Notes |
| --- | --- | --- |
| `请选择` | `Please select` | placeholder copy fallback for select trigger |
| `文字&图标 Text&Icon/无组件绑定 unbound/次要 secondary` | `#666666` | option text |
| `12/CN-Regular` | font preset | helper text |

### table (116997:186851)

Adds table-specific surfaces and dividers:

| Figma path | Value | CSS var |
| --- | --- | --- |
| `填充 Fill/组件绑定/表格 Table/表头背景` | `#fafafa` | `--semantic-bg-table-header` → `--component-table-header-bg` |
| `填充 Fill/组件绑定/表格 Table/默认背景` | `#ffffff` | `--semantic-bg-surface` → `--component-table-bg` |
| `边框 Border/无组件绑定/描边_常规 divider-100` | `#e8e8e8` | `--semantic-border-subtle` → `--component-table-border` |
| `文字&图标 Text&Icon/组件绑定 bound/链接 link/默认_200` | `#222222` | `--component-table-row-text` (link variant) |
| `背景色 Background Color/color-bg-2一级容器背景` | `#FFFFFF` | redundant alias of `--semantic-bg-surface` |

### modal (119237:106936)

Reuses neutrals + status colors; key additions:

| Figma path | Value | CSS var |
| --- | --- | --- |
| `中性色 Neutral/Global light/130 22` | `#222222` | `--semantic-text-primary` (modal body / title) |
| `中性色 Neutral/Global light/70 FF` | `#ffffff` | mask layer of `--component-modal-mask` resolves separately to rgba(0,0,0,0.4) |
| `16/EN-Semibold` | size 16 / weight 600 / lineHeight 22 | `--component-modal-title-text` typography |
| `主色 Primary/Global light/50` | `#222222` | confirm button mapping (same as `--semantic-action-primary-bg`) |
| `告警色 Warning Color/warning-6标签#FFAD14` | `#FFAD14` | `--semantic-status-warning` (in confirm/warning dialogs) |
| `错误 Danger color/Danger-6 常规#F14846` | `#F14846` | `--semantic-status-danger` |

### datepicker (117747:171283)

Form palette + neutrals. No new categories beyond those covered in input.

## Notes on raw export

- Some Figma variables come in two flavours: `组件绑定 bound` (component-bound semantics) vs `无组件绑定 unbound` (raw semantics). Both resolve to the same hex; for D-Spark we map to the semantic-layer CSS variable in either case.
- Hex literals exposed by Figma (`中性色 Neutral/Global light/130 22 = #222222`) match `core.json → color.neutral.170` (`#222222`). When the bridge resolves `中性色 → core`, downstream tools should still consume semantic vars (`--semantic-text-primary`) rather than the core hex.
- Padding/size literals (`4`, `6`, `8`, `36px`) appear as flat numeric variables in Figma; map them to `--semantic-space-xs`, `--core-space-1`, `--semantic-space-sm`, `--core-size-control-lg` respectively (see token bridge).
- `watermark/日期-日月年` (`16/Nov/2025`) is sample data baked into the Figma frame; not a token.
