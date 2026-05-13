# React → Vue 适配与 P5–P7 里程碑（概要）

> **Layer / 层级**: **L3 — 迁移 / 里程碑**。  
> 本文档是 **里程碑计划**，不是规范真源。规范主线（`design.md`、组件 MD、token、Figma inventory）必须先收敛，再启动 P5–P7。  
> 治理与边界声明见 [`../../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)。

## 依赖

- **Token 单一出口**：见 [`.design-spec/docs/TOKEN_PIPELINE_STRATEGY.md`](../../.design-spec/docs/TOKEN_PIPELINE_STRATEGY.md)；未完成前 Vue 侧易与 HTML demos 漂移。  
- **三边闭项**：`MD_HTML_Figma_TRIAD.md` 与 `CLOSE_MD_GAPS.md` 对 P0 组件无未处理阻塞项。

## P5 — 通用逻辑与预工程

- 抽离与框架无关的 **token 名、尺寸阶梯、状态机** 文档或轻量 TS 模块（按需）。  
- Vue3 + Vite + Tailwind 子应用骨架（可参考 `apps/dspark-vue-admin` 或新建 `packages/`）。  
- 维护 **React API 标记清单**（props ↔ Vue props 映射表）。

## P6 — 组件转译

- 核心组件优先：Button、Input、Form、Table…  
- 每组件验收：与同一 `figma_truth_table.json` node 及 Arco Design Web React 行为可对账。
- **转译检查清单**：props 默认值、受控/非受控、`aria-*`、键盘顺序、插槽/子组件映射、样式类名策略（Vue 单文件组件 vs React 封装）。

## P7 — 打包与发布

- `package.json` 字段、`files`、类型入口校验脚本。  
- 发布说明与 **验收报告** 模板（changelog + 已知差异）。
- **发布前**：在 Vue 包上跑与 React 侧 **同 token 名** 的 spot-check（或导入 `tokens/dist` 子集）；E2E 烟雾覆盖主路径。
- **文档**：更新跨框架计划本文 + `docs/visual-qa/MATRIX.md` 中 Vue 列（若启用 Path A/B 双栈对稿）。

## 验证

- Vue 应用 E2E 与/或与 React 侧 **同 token computed** spot-check。  
- 与 [FIGMA_1_1_ALIGNMENT_PRD.md](../visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md) 中 FR-47 一致。
