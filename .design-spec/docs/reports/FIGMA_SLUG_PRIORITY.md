# Figma 链接优先序（机器生成 / 快照）

> **Layer / 层级**: **L4 — 生成快照**。  
> 治理：[`DESIGN_MD_GOVERNANCE_AUDIT.md`](DESIGN_MD_GOVERNANCE_AUDIT.md)。

源：[`figma_truth_table.json`](../../config/figma_truth_table.json) · 生成：`python3 .design-spec/scripts/figma_slug_priority.py`

## P0 — 已填 Figma canonical 链接（应先 coding / 对稿）

下列 slug 的 `figma_urls` 非空，建议按 [intent-index](../components/intent-index.md) 复杂度穿插推进。

| slug | display_name |
|------|--------------|
| `alert` | Alert |
| `badge` | Badge |
| `breadcrumb` | Breadcrumb |
| `button` | Button |
| `cascader` | Cascader |
| `checkbox` | Checkbox |
| `datepicker` | DatePicker |
| `dropdown` | Dropdown |
| `input` | Input |
| `input-ip` | InputIP |
| `input-range` | InputRange |
| `menu` | Menu |
| `modal` | Modal |
| `notification` | Notification |
| `pageheader` | PageHeader |
| `pagination` | Pagination |
| `pincode` | PinCode |
| `progress` | Progress |
| `radio` | Radio |
| `slider` | Slider |
| `switch` | Switch |
| `tabs` | Tabs |
| `tag` | Tag |
| `timepicker` | TimePicker |
| `tree` | Tree |
| `upload` | Upload |

## P1 — 尚未填 Figma 链接（先补真源表再进 P0）

| slug | display_name |
|------|--------------|
| `card` | Card |
| `data-display-number` | DataDisplayNumber |
| `form` | Form |
| `input-adornment` | InputAdornment |
| `input-number` | InputNumber |
| `layout` | Layout |
| `list` | List |
| `message` | Message |
| `select` | Select |
| `space` | Space |
| `steps` | Steps |
| `table` | Table |
| `treeselect` | TreeSelect |

## 与 Arco / HTML 流水线的关系

- **行为比对**：见 [`ARCO_PR_PRE_CHECKLIST.md`](./ARCO_PR_PRE_CHECKLIST.md) 与 [`demos-react`](../../demos-react/)（`ComponentStateMatrix.tsx`）。
- **静态 HTML**：`.design-spec/demos/components/<slug>.html`（Path B 视觉 + `studio_runtime` 交互子集）。
