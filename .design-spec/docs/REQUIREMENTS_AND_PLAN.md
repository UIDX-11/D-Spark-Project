# D-Spark design-spec · 需求拆解与需求计划

本文档与混合规格 / 可移植 Agent Skill 路线对齐，用于「要什么 → 怎么排 → 落到哪」的对照。真源实现分散在 `.design-spec/` 与 `.cursor/skills/`；**不替代**具体组件 md 或 Figma 表。

## 1. 需求拆解（按目标归类）


| 编号  | 需求主题                   | 要解决的问题                                                           | 验收 / 真源                                                                                                                                                                                                                                                   |
| --- | ---------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1  | **混合规格**               | AI 能稳定消费「人读 Markdown + 机器读 JSON/YAML」                            | 块顶层 `**schemaVersion`** + `**kind`**；`[.design-spec/schemas/spec-block.schema.json](../schemas/spec-block.schema.json)`                                                                                                                                   |
| R2  | **三层文档**               | 原子组件 / 模式 / 典型页分层，避免只会写散件                                        | `[docs/components/](components/)` · `[docs/pages/patterns/](pages/patterns/)` · `[docs/pages/page-dashboard.md](pages/page-dashboard.md)`                                                                                                                 |
| R3  | **Foundation**         | 间距、栅格、投影、布局有统一说法，不与组件 md 抢戏                                      | `[foundations/README.md](foundations/README.md)` · `[间距.md](foundations/间距.md)` · `[栅格.md](foundations/栅格.md)` · `[投影.md](foundations/投影.md)` · `[布局.md](foundations/布局.md)` · `[layout-protocol-reference.md](foundations/layout-protocol-reference.md)` |
| R4  | **栅格策略**               | 仅 12 / 24；默认 12；24 必须显式声明                                        | `[foundations/栅格.md](foundations/栅格.md)` · `kind: responsive` / `page` 块约定                                                                                                                                                                                |
| R5  | **Figma ↔ Web 布局**     | Fill / Hug / Fixed 能映射到 Flex                                     | `[schemas/examples/layout-protocol.example.json](../schemas/examples/layout-protocol.example.json)` · foundation 对照表                                                                                                                                      |
| R6  | **图标**                 | Figma 锚点、尺寸语义、缺失策略、资产位                                           | `[assets/icons/README.md](../assets/icons/README.md)` · `[icons.manifest.json](../assets/icons/icons.manifest.json)` · `tokens.css` 中 `--semantic-icon-size-`* · `[foundations/icons-arco-mapping.md](foundations/icons-arco-mapping.md)`                 |
| R7  | **组件文档质量**             | 每组件必有 **Do / Don't**                                             | 各 `[docs/components/*.md](components/)`                                                                                                                                                                                                                   |
| R8  | **Slot**               | 复杂组件有统一插槽命名入口                                                    | `[docs/slots/registry.yaml](slots/registry.yaml)`                                                                                                                                                                                                         |
| R9  | **可选反向校验**             | 本地对比「页面 computed ↔ Figma 导出」                                     | `[.design-spec/checks/README.md](../checks/README.md)` · `export_computed_layout.mjs` · `compare_layout_diff.mjs`（需本机 Playwright 浏览器）                                                                                                                     |
| R10 | **Figma 双向**           | md → 画布、node → md 有流程说明                                          | `[.cursor/skills/design-spec-figma-workflows/SKILL.md](../../.cursor/skills/design-spec-figma-workflows/SKILL.md)`                                                                                                                                        |
| R11 | **可移植 Skill**          | 不限 Cursor，可上 GitHub 给其它 AI 用                                     | `[.cursor/skills/design-spec-hybrid-spec/SKILL.md](../../.cursor/skills/design-spec-hybrid-spec/SKILL.md)` · `[PACKAGING.md](../../.cursor/skills/design-spec-hybrid-spec/PACKAGING.md)`                                                                  |
| R12 | **Figma Variables 桥接** | 为后续 Vue / 主题留钩子                                                  | `[FIGMA_VARIABLES_TOKEN_BRIDGE.yaml](FIGMA_VARIABLES_TOKEN_BRIDGE.yaml)`（占位，待填）                                                                                                                                                                           |
| R13 | **仓库卫生**               | `node_modules` / `dist` / `.DS_Store`；dashboard canonical；重复文件待审 | 根目录 `[.gitignore](../../.gitignore)` · `[REDUNDANCY_AUDIT.md](REDUNDANCY_AUDIT.md)` · `[page-dashboard.md](pages/page-dashboard.md)` 固定 canonical demo                                                                                                    |


## 2. 需求计划（阶段 → 交付物 → 状态）


| 阶段             | 交付物                                                                                                    | 状态                                                                                                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0 基础**      | Foundation 四篇 + README；`layout-protocol` 人读 + JSON 示例                                                  | **已完成**                                                                                                                                                                                                                 |
| **P0 规格契约**    | `spec-block.schema.json` + `schemas/examples/`*                                                        | **已完成**                                                                                                                                                                                                                 |
| **P0 Token**   | `semantic.icon.size.`* → `tokens/dist/tokens.css`                                                      | **已完成**                                                                                                                                                                                                                 |
| **P0 页面 / 模式** | `page-dashboard.md`；`pro-table` / `search-form`；IA 互链                                                  | **已完成**                                                                                                                                                                                                                 |
| **P0 文档治理**    | 组件 Do/Don't；Slot registry；冗余审计表                                                                        | **已完成**                                                                                                                                                                                                                 |
| **P0 Runtime** | `studio_runtime` 图标类；regenerate demos                                                                  | **已完成**                                                                                                                                                                                                                 |
| **P0 Skills**  | `design-spec-hybrid-spec` + 路由 + component-docs / demos-runtime / figma-workflows 扩展                   | **已完成**                                                                                                                                                                                                                 |
| **P1 环境**      | Playwright Chromium 安装成功，跑通 layout 快照                                                                  | **已触发**：清 `~/Library/Caches/ms-playwright/__dirlock` 后于 `.design-spec/checks` 执行 `npx playwright install chromium`（见 `[checks/README.md](../checks/README.md)`）。**以本机命令成功结束为准**（Chrome zip 较大，下载可能较久）；通过后可将此行改为 **已完成** |
| **P1 填充**      | `icons.manifest.json` 真实条目、`page-dashboard.md` 中 `pageFrameNodeId`、`FIGMA_VARIABLES_TOKEN_BRIDGE` 真实映射 | **部分**：manifest 已含 `libraryName` / `export` / 示例槽位；Figma 画板 node 仍待设计钉定                                                                                                                                                 |
| **P2 清理**      | 按 `[REDUNDANCY_AUDIT.md](REDUNDANCY_AUDIT.md)` 归档 TDesign 仪表盘变体、统一 `page_templates` 生成路径与导航相对路径        | **已执行**（TDesign 页 → `demos/pages/archive/`；根目录同名 HTML 删除；e2e / 索引 / 文档已更新）                                                                                                                                              |


## 3. 相关文档互链


| 文档                                                                     | 用途                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------- |
| [design.md](design.md)                                                 | 设计体系总览；指向本文 § 需求计划                              |
| [REDUNDANCY_AUDIT.md](REDUNDANCY_AUDIT.md)                             | 冗余与归档决策表                                        |
| [pages/information-architecture.md](pages/information-architecture.md) | Starter 级 IA 与静态 B 线覆盖                          |
| [pages/page-dashboard.md](pages/page-dashboard.md)                     | Canonical Dashboard + `figma` / `demoPath` JSON |
| [foundations/README.md](foundations/README.md)                         | Foundation 索引                                   |
| [assets/icons/README.md](../assets/icons/README.md)                    | 图标导出与 Figma 入口                                  |
| [checks/README.md](../checks/README.md)                                | Playwright 安装与 layout 快照命令                      |


**维护约定**：需求变更时先改本文 **§1 / §2**，再改对应实现路径与 Skill 描述，避免「表与代码两套真源」。