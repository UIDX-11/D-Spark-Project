# Web UI 组件 ↔ Figma 真源索引

面向 `@UIDX-11/dspark-web-ui`（[`src/components/ui/index.ts`](../../src/components/ui/index.ts)）与 Figma 库 **D.S-Web-Com_Light_V2_2026**，`fileKey` = **`KJfy0GFDs8kLsXTzhTxAjd`**（官方视觉真源）。

**Canonical 多节点列表**：见 [`.design-spec/config/figma_truth_table.json`](../../.design-spec/config/figma_truth_table.json)（机器可读）。本表「Primary Figma」取每行 `figma_urls[0]`。

| 导出组件 / API | design-spec 文档 | Primary Figma（canonical） |
|----------------|------------------|----------------------------|
| Button | [button.md](../../.design-spec/docs/components/button.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=10657-99018) `10657-99018`（+1 nodes，见 JSON） |
| Input | [input.md](../../.design-spec/docs/components/input.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=117269-199903) `117269-199903` |
| Checkbox | [checkbox.md](../../.design-spec/docs/components/checkbox.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-133503) `116449-133503`（+1 nodes，见 JSON） |
| Radio, RadioGroup | [radio.md](../../.design-spec/docs/components/radio.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275133-160500) `275133-160500`（+2 nodes，见 JSON） |
| Switch | [switch.md](../../.design-spec/docs/components/switch.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116456-132645) `116456-132645` |
| Select | [select.md](../../.design-spec/docs/components/select.md) | 待补（真源表该 slug 无 node） |
| Card, CardHeader, CardBody, CardFooter | [card.md](../../.design-spec/docs/components/card.md) | 待补（真源表该 slug 无 node） |
| Space | [space.md](../../.design-spec/docs/components/space.md) | 待补（真源表该 slug 无 node） |
| Divider | —（无独立 md，见 intent-index） | 待补（真源表该 slug 无 node） |
| Breadcrumb | [breadcrumb.md](../../.design-spec/docs/components/breadcrumb.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116476-133550) `116476-133550`（+1 nodes，见 JSON） |
| Pagination | [pagination.md](../../.design-spec/docs/components/pagination.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=118845-144970) `118845-144970` |
| Tabs | [tabs.md](../../.design-spec/docs/components/tabs.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124009-129610) `124009-129610`（+8 nodes，见 JSON） |
| Avatar | —（无独立 md，见 intent-index） | 待补（真源表该 slug 无 node） |
| Badge | [badge.md](../../.design-spec/docs/components/badge.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-132541) `116449-132541`（+3 nodes，见 JSON） |
| Table | [table.md](../../.design-spec/docs/components/table.md) | 待补（真源表该 slug 无 node） |
| Tag | [tag.md](../../.design-spec/docs/components/tag.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275126-37182) `275126-37182`（+2 nodes，见 JSON） |
| Empty | —（无独立 md，见 intent-index） | 待补（真源表该 slug 无 node） |
| Alert | [alert.md](../../.design-spec/docs/components/alert.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124872-121819) `124872-121819` |
| Loading | —（无独立 md，见 intent-index） | 待补（真源表该 slug 无 node） |
| message | [message.md](../../.design-spec/docs/components/message.md) | 待补（真源表该 slug 无 node） |
| Tooltip | —（无独立 md，见 intent-index） | 待补（真源表该 slug 无 node） |
| Modal | [modal.md](../../.design-spec/docs/components/modal.md) | [Primary](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=119237-106936) `119237-106936`（+2 nodes，见 JSON） |
| Drawer | —（无独立 md，见 intent-index） | 待补（真源表该 slug 无 node） |
| Form, FormField, FormItem, FormMessage | [form.md](../../.design-spec/docs/components/form.md) | 待补（真源表该 slug 无 node） |

## 维护流程

1. 更新 `.design-spec/config/figma_truth_table.json` 中对应 `slug` 的 `figma_urls` / `figma_node_ids`。
2. 将同一 Primary 链接回填 `.design-spec/docs/components/<slug>.md` 的 References。
3. 运行 `python3 .design-spec/scripts/triad_reconcile.py`，处理 `MD_HTML_Figma_TRIAD.md` 中的不一致项。

