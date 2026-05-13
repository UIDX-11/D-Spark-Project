# Token 管道策略（React vs design-spec）

## 现状（双轨）

| 消费方 | 主要 CSS 变量来源 | 说明 |
|--------|-------------------|------|
| **React 库**（`src/components/ui`） | [`src/styles/theme.css`](../../src/styles/theme.css) 等长名/语义变量 + Tailwind | 与 Playground 一致 |
| **静态 HTML demos** | [`.design-spec/tokens/dist/tokens.css`](../tokens/dist/tokens.css) 的 `--semantic-*` / `--component-*` | 生成器 + `studio_runtime.css` |

## 目标（单一出口或显式映射）

**二选一或组合（须评审定案）：**

1. **单一出口 A**：React 侧改为以 `tokens/dist/tokens.css` 为唯一运行时 token 源，长名变量由构建步骤生成映射层注入。  
2. **单一出口 B**：保留 theme.css 为产品源，由 CI 从 `tokens/src` **生成** `theme.css` 片段，禁止手写分叉。  
3. **显式映射**：维护 `token-map.json`（`--长名` → `--semantic-*`），构建时校验两侧引用集合一致。

### 评审定案（Figma 1:1 能力建设计划 · 阶段 B）

**当前阶段**：在 token 管道完全单一化之前，接受 **双轨并行**，但必须 **文档化边界**以免宣称「HTML 与 localhost 像素必然一致」：

| 消费方 | 运行时 token 源 | 说明 |
|--------|-----------------|------|
| **产品 React**（`src/components/ui`） | `src/styles/theme.css` 等 | 与 Vite Playground 一致；演进目标为 **B** 或 **3** 之一。 |
| **design-spec 静态 HTML demos** | `tokens/dist/tokens.css` | 生成器 + `studio_runtime.css`；Path B 截图与 Figma 对稿以此为准。 |

**收口方向**：优先落地 **方案 3（显式映射）** 的轻量版（关键组件 computed 对照表），或 **方案 B** 的 CI 生成片段；关闭条件与 [FIGMA_1_1_ALIGNMENT_PRD.md](../../docs/visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md) FR-10 一致。

## 验收

- 文档化选定策略、负责人、迁移阶段（与 [FIGMA_1_1_ALIGNMENT_PRD.md](../../docs/visual-qa/FIGMA_1_1_ALIGNMENT_PRD.md) FR-10 一致）。  
- 每阶段有关闭条件：例如「Button/Input 在 Playground 与 `button.html` 的 computed 关键 token 一致」。

## 相关路径

- Token 源：`.design-spec/tokens/src/` → `tokens/dist/tokens.css`  
- 治理：[`ALIGNMENT_GOVERNANCE.md`](./ALIGNMENT_GOVERNANCE.md) §2–§3
