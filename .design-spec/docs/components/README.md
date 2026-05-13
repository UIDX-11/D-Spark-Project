# Components (Molecular)

This folder is the **AI-retrievable component knowledge base** and the
canonical **slug → spec** index for D-Spark.

长程 **与 Arco Design Web React + Figma 对齐** 的写法、token 与 PR 验收，见
[`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md)（执行前必读）。
组件 ↔ Figma 节点的映射真源在
[`../COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md)。

## Required sections for each component spec

Each component spec must include:

- Best practices
- Layout patterns
- Aliases (synonyms)
- Anti-patterns
- Accessibility essentials

并配 **`## Do`** 与 **`## Don't`** 二级标题（详见
[`design-spec-component-docs` Skill](../../../.cursor/skills/design-spec-component-docs/SKILL.md)）。

## Component naming rule

Variant/state naming must follow:

`type/kind/shape/size/state`

Example (illustrative):

- `button/primary/rounded/md/disabled`
- `input/text/underline/lg/error`

## Slug → spec index (canonical)

下表是 `design.md` 的组件路由真源；新增 slug 时先改本表，再更新
[`intent-index.md`](intent-index.md) 与
[`../COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md)。

| Slug | Level | Spec |
| --- | --- | --- |
| alert | Molecular | [alert.md](alert.md) |
| badge | Molecular | [badge.md](badge.md) |
| breadcrumb | Molecular | [breadcrumb.md](breadcrumb.md) |
| button (pilot) | Molecular | [button.md](button.md) |
| card | Molecular | [card.md](card.md) |
| cascader | Molecular | [cascader.md](cascader.md) |
| checkbox | Molecular | [checkbox.md](checkbox.md) |
| data-display-number | Molecular | [data-display-number.md](data-display-number.md) |
| datepicker (pilot) | Molecular | [datepicker.md](datepicker.md) |
| dropdown | Molecular | [dropdown.md](dropdown.md) |
| form (pilot) | Molecular | [form.md](form.md) |
| input (pilot) | Molecular | [input.md](input.md) |
| input-adornment | Molecular | [input-adornment.md](input-adornment.md) |
| input-ip | Molecular | [input-ip.md](input-ip.md) |
| input-number | Molecular | [input-number.md](input-number.md) |
| input-range | Molecular | [input-range.md](input-range.md) |
| layout | Molecular | [layout.md](layout.md) |
| list | Molecular | [list.md](list.md) |
| menu | Molecular | [menu.md](menu.md) |
| message | Molecular | [message.md](message.md) |
| modal (pilot) | Molecular | [modal.md](modal.md) |
| notification | Molecular | [notification.md](notification.md) |
| pageheader | Molecular | [pageheader.md](pageheader.md) |
| pagination | Molecular | [pagination.md](pagination.md) |
| pincode | Molecular | [pincode.md](pincode.md) |
| progress | Molecular | [progress.md](progress.md) |
| radio | Molecular | [radio.md](radio.md) |
| select (pilot) | Molecular | [select.md](select.md) |
| slider | Molecular | [slider.md](slider.md) |
| space | Molecular | [space.md](space.md) |
| steps | Molecular | [steps.md](steps.md) |
| switch | Molecular | [switch.md](switch.md) |
| table (pilot) | Molecular | [table.md](table.md) |
| tabs | Molecular | [tabs.md](tabs.md) |
| tag | Molecular | [tag.md](tag.md) |
| timepicker | Molecular | [timepicker.md](timepicker.md) |
| tree | Molecular | [tree.md](tree.md) |
| treeselect | Molecular | [treeselect.md](treeselect.md) |
| upload | Molecular | [upload.md](upload.md) |

> Pilot 标记的组件已有完整 `Spec block (atomic)` JSON；其余组件按相同模板
> 在后续批次补齐。Pilot 与 Figma 节点对照表见
> [`../COMPONENT_FIGMA_INVENTORY.md` → Pilot components](../COMPONENT_FIGMA_INVENTORY.md#pilot-components-first-batch)。

## Initial "deep" component set (v0.1, historical)

保留以便回顾首批深度撰写顺序，新增组件以上面的 **slug → spec** 表为准。

- Button · Layout · Space · Card · List · Data Display (Number)
- Table · Tabs · Tag · Tree · Cascader · Checkbox · Radio
- Form · Input · Select · Switch · Badge

See also [`intent-index.md`](intent-index.md) for intent-based retrieval.
