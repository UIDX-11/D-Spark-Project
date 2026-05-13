# 可选方案：在静态 HTML 内嵌 Arco（React 岛）— 评审备忘

**当前默认**：不采纳；Path B 保持 **MD + token + `studio_runtime`** 生成 HTML，Arco 真交互在 **`demos-react`**。

若产品要求「打开 `.html` 文件即与 Arco 官网同包交互」，需在评审会后择一：

| 方案 | 概要 | 对 e2e / CI 影响 |
|------|------|------------------|
| **React 岛** | 构建 per-demo 或共享 chunk，在 `#liveRoot` `createRoot` 挂载 Arco 组件 | 需 Vite 多入口或独立 bundle；`file://` 下需验证资源路径。 |
| **iframe** | 静态页嵌入 `demos-react` 预览 URL | 当前 smoke 依赖 `file://` 时需改为 **本地 http server** 或 Playwright `baseURL`。 |

定案前需同步：[ALIGNMENT_GOVERNANCE.md](../ALIGNMENT_GOVERNANCE.md)、[`.design-spec/e2e/README.md`](../../e2e/README.md)、[FIGMA_1_1_ALIGNMENT_PRD.md](../../../docs/visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md)。
