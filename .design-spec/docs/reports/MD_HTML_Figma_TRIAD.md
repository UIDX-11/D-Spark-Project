# MD–HTML–Figma 三边对账表（机器生成）

真源节点列表：`.design-spec/config/figma_truth_table.json`。
生成命令：`python3 .design-spec/scripts/triad_reconcile.py`

| 组件ID | MD 路径 | HTML 路径 | 真源表 node（canonical） | MD 中出现的 node-id | HTML meta slug | 缺失 / 不一致（摘要） |
|--------|---------|-----------|---------------------------|---------------------|----------------|------------------------|
| `alert` | .design-spec/docs/components/alert.md | .design-spec/demos/components/alert.html | 124872-121819 | 124872-121819 | OK | — |
| `badge` | .design-spec/docs/components/badge.md | .design-spec/demos/components/badge.html | 116449-132541, 116449-132801, 116449-133206… | — | OK | MD References 未出现任一 canonical node-id |
| `breadcrumb` | .design-spec/docs/components/breadcrumb.md | .design-spec/demos/components/breadcrumb.html | 116476-133550, 116476-133367 | — | OK | MD References 未出现任一 canonical node-id |
| `button` | .design-spec/docs/components/button.md | .design-spec/demos/components/button.html | 10657-99018, 277087-36652 | — | OK | MD References 未出现任一 canonical node-id |
| `card` | .design-spec/docs/components/card.md | .design-spec/demos/components/card.html | — | — | OK | — |
| `cascader` | .design-spec/docs/components/cascader.md | .design-spec/demos/components/cascader.html | 286613-3654, 286622-1371, 286640-41658… | — | OK | MD References 未出现任一 canonical node-id |
| `checkbox` | .design-spec/docs/components/checkbox.md | .design-spec/demos/components/checkbox.html | 116449-133503, 116449-133385 | — | OK | MD References 未出现任一 canonical node-id |
| `data-display-number` | .design-spec/docs/components/data-display-number.md | .design-spec/demos/components/data-display-number.html | — | — | OK | — |
| `datepicker` | .design-spec/docs/components/datepicker.md | .design-spec/demos/components/datepicker.html | 117747-171283, 123612-128253 | — | OK | MD References 未出现任一 canonical node-id |
| `dropdown` | .design-spec/docs/components/dropdown.md | .design-spec/demos/components/dropdown.html | 116479-133907, 116479-134191, 283153-5274… | — | OK | MD References 未出现任一 canonical node-id |
| `form` | .design-spec/docs/components/form.md | .design-spec/demos/components/form.html | — | — | OK | — |
| `input` | .design-spec/docs/components/input.md | .design-spec/demos/components/input.html | 117269-199903 | — | OK | MD References 未出现任一 canonical node-id |
| `input-adornment` | .design-spec/docs/components/input-adornment.md | .design-spec/demos/components/input-adornment.html | — | — | OK | — |
| `input-ip` | .design-spec/docs/components/input-ip.md | .design-spec/demos/components/input-ip.html | 288620-2128 | 288620-2128 | OK | — |
| `input-number` | .design-spec/docs/components/input-number.md | .design-spec/demos/components/input-number.html | — | — | OK | — |
| `input-range` | .design-spec/docs/components/input-range.md | .design-spec/demos/components/input-range.html | 297108-6113 | 297108-6113 | OK | — |
| `layout` | .design-spec/docs/components/layout.md | .design-spec/demos/components/layout.html | — | — | OK | — |
| `list` | .design-spec/docs/components/list.md | .design-spec/demos/components/list.html | — | — | OK | — |
| `menu` | .design-spec/docs/components/menu.md | .design-spec/demos/components/menu.html | 118262-164627 | 118145-152369, 118125-152281, 118262-158322 | OK | MD References 未出现任一 canonical node-id |
| `message` | .design-spec/docs/components/message.md | .design-spec/demos/components/message.html | — | — | OK | — |
| `modal` | .design-spec/docs/components/modal.md | .design-spec/demos/components/modal.html | 119237-106936, 284016-9485, 284016-9652 | — | OK | MD References 未出现任一 canonical node-id |
| `notification` | .design-spec/docs/components/notification.md | .design-spec/demos/components/notification.html | 123397-114318 | — | OK | MD References 未出现任一 canonical node-id |
| `pageheader` | .design-spec/docs/components/pageheader.md | .design-spec/demos/components/pageheader.html | 116510-134301 | — | OK | MD References 未出现任一 canonical node-id |
| `pagination` | .design-spec/docs/components/pagination.md | .design-spec/demos/components/pagination.html | 118845-144970 | — | OK | MD References 未出现任一 canonical node-id |
| `pincode` | .design-spec/docs/components/pincode.md | .design-spec/demos/components/pincode.html | 286976-20982, 289451-2744 | — | OK | MD References 未出现任一 canonical node-id |
| `progress` | .design-spec/docs/components/progress.md | .design-spec/demos/components/progress.html | 124809-124417, 124784-123557, 124809-123629… | — | OK | MD References 未出现任一 canonical node-id |
| `radio` | .design-spec/docs/components/radio.md | .design-spec/demos/components/radio.html | 275133-160500, 116455-132100, 116449-134996 | — | OK | MD References 未出现任一 canonical node-id |
| `select` | .design-spec/docs/components/select.md | .design-spec/demos/components/select.html | — | — | OK | — |
| `slider` | .design-spec/docs/components/slider.md | .design-spec/demos/components/slider.html | 124384-142926, 124384-142709 | — | OK | MD References 未出现任一 canonical node-id |
| `space` | .design-spec/docs/components/space.md | .design-spec/demos/components/space.html | — | — | OK | — |
| `steps` | .design-spec/docs/components/steps.md | .design-spec/demos/components/steps.html | — | — | OK | — |
| `switch` | .design-spec/docs/components/switch.md | .design-spec/demos/components/switch.html | 116456-132645 | — | OK | MD References 未出现任一 canonical node-id |
| `table` | .design-spec/docs/components/table.md | .design-spec/demos/components/table.html | — | — | OK | — |
| `tabs` | .design-spec/docs/components/tabs.md | .design-spec/demos/components/tabs.html | 124009-129610, 275170-212614, 124064-145588… | — | OK | MD References 未出现任一 canonical node-id |
| `tag` | .design-spec/docs/components/tag.md | .design-spec/demos/components/tag.html | 275126-37182, 148903-192071, 275128-132007 | — | OK | MD References 未出现任一 canonical node-id |
| `timepicker` | .design-spec/docs/components/timepicker.md | .design-spec/demos/components/timepicker.html | 284471-9574, 123515-115495, 123515-118309 | — | OK | MD References 未出现任一 canonical node-id |
| `tree` | .design-spec/docs/components/tree.md | .design-spec/demos/components/tree.html | 275610-141002, 275610-138273, 275610-132287… | — | OK | MD References 未出现任一 canonical node-id |
| `treeselect` | .design-spec/docs/components/treeselect.md | .design-spec/demos/components/treeselect.html | — | — | OK | — |
| `upload` | .design-spec/docs/components/upload.md | .design-spec/demos/components/upload.html | 124872-118703, 124847-119433, 124847-119633… | — | OK | MD References 未出现任一 canonical node-id |

## 集合差集

- 仅 MD：`[]`
- 仅真源表：`[]`

