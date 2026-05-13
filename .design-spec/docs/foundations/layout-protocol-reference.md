# Layout protocol（Figma Auto Layout → Web）

与 `**kind: layoutProtocol**` 规格块及 [schemas/examples/layout-protocol.example.json](../schemas/examples/layout-protocol.example.json) 一致。


| Figma                            | Web 默认映射                                                                  |
| -------------------------------- | ------------------------------------------------------------------------- |
| Direction: Horizontal / Vertical | `flex-direction: row` / `column`                                          |
| Alignment（主轴）                    | `justify-content`（`flex-start` / `center` / `flex-end` / `space-between`） |
| Alignment（交叉轴）                   | `align-items`（`flex-start` / `center` / `flex-end` / `stretch`）           |
| Hug contents                     | `width`/`height: fit-content`；或行内图标行用 `inline-flex` + `flex: 0 0 auto`    |
| Fill container（横向）               | `flex: 1 1 0` + `min-width: 0`（表格、可滚动区）                                   |
| Fill container（纵向）               | `flex: 1 1 auto`；滚动放在子层 `overflow: auto`                                  |
| Fixed                            | `flex: 0 0 <basis>`，basis 用语义间距 token                                     |
| Gap                              | `gap` 映射到 spacing token（见 [间距.md](间距.md)）                                 |
| Padding                          | `padding` 映射到 spacing token                                               |


Figma 未给出参数时，在组件 md 的 `**metrics**` 或 `**layoutProtocol.override**` 中补全。