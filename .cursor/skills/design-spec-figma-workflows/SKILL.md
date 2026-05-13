---
name: design-spec-figma-workflows
description: >-
  Writes or updates Figma canvas content for D-Spark via MCP use_figma: import
  published components (e.g. datepicker-dropdown from D.S Web Com_Light_V2_2026),
  place instances on a target page/fileKey. Use when the user says 在 Figma 里生成、
  插入组件、importComponentSetByKey、按 datepicker.md 对稿、plugin-figma-figma,
  fileKey、node-id、讨论稿、或给出 figma.com/design URLs for this repo.
  Before use_figma, follow the Cursor figma-use skill if present.
disable-model-invocation: false
---

# Design-spec · Figma（本项目 MCP 工作流）

## 前置

- 调用 **`use_figma`** 前：若环境中有 **`figma-use`** Skill，**必须先加载**（官方要求）。
- 本 Skill 只描述 **本仓库文档里出现的 Figma 习惯**，不重复完整 Plugin API。

## 从 `datepicker.md` 取真源

- **库文件（Light 2026）**：`KJfy0GFDs8kLsXTzhTxAjd`（D.S-Web-Com_Light_V2_2026）
- **单日 combo 参考节点**：`117683:171261`
- **触发器矩阵**：`117747:171283`
- **变体画板**：`123612:128253`  
  具体以 **当前** `.design-spec/docs/components/datepicker.md` 内表格为准（若日后更新 ID，以 md 为准）。

## 在「讨论稿」等其它文件中放置组件

1. 从用户 URL 解析 **`fileKey`** 与 **`node-id`**（`-` → `:`）。
2. **`search_design_system`**（MCP）用 **「datepicker-dropdown」「table」** 等关键词 + **`fileKey`** 取 **`componentKey`**。
3. **`importComponentSetByKeyAsync`** → 取 **`defaultVariant`** 或按变体名匹配 **`createInstance`**。
4. **`appendChild`** 到目标 **PAGE** 或 **FRAME**；新顶层 Frame 错开 **`(80,80)`** 或已有内容 **`maxY + gap`**。
5. **`return`** 新建节点 **id** 列表。
6. **实例描述**：在 Figma 实例 `description` 中可写 **`slot.<component>.<region>`**（与 `.design-spec/docs/slots/registry.yaml` 对齐），便于画布 ↔ md 回填。

## 双向流程（md ↔ Figma）

### A. 规格 → 画布（md → Figma）

1. 读目标 **`page`/`pattern`** 块（例：`.design-spec/docs/pages/page-dashboard.md`）中的 **`figma.fileKey`** 与 **`regions[]`**。
2. **`search_design_system`** + **`importComponentSetByKeyAsync`** 放置组件实例；Auto Layout 参数遵循 **`layoutProtocol`** 示例（`.design-spec/schemas/examples/layout-protocol.example.json`）。
3. 栅格：**默认 12 列**；仅当 md 中 **`gridColumns: 24`** 显式声明时使用 24（见 **`docs/foundations/栅格.md`**）。

### B. 画布 → 规格（node → md）

1. 对用户给出的 **`fileKey` + `node-id`** 调用 **`get_metadata`** / **`get_design_context`**（只读 MCP）。
2. 将关键尺寸、padding、gap 填入对应组件 md 的 **`metrics[]`** 或 **`numericToToken`**；无法自动推断的写入 **`layoutProtocol.override`**。
3. 图标节点导出路径更新 **`assets/icons/icons.manifest.json`**。

## 增量

- 一步一做：先 inspect 页面，再 import，再验证（必要时 `get_metadata` / `get_screenshot`）。
