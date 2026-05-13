# 1:1 视觉对稿矩阵（Path A / Path B）

> **L2 — 签字矩阵 / 不是 Figma 节点真源。**  
> 组件 ↔ Figma node 的 SoT 见 [`.design-spec/config/figma_truth_table.json`](../../.design-spec/config/figma_truth_table.json) 与 [`.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md`](../../.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md)；本文件仅用于人工对稿签字与状态记录。

**Figma 官方库**：`KJfy0GFDs8kLsXTzhTxAjd`  
**静态 HTML demos**：`.design-spec/demos/components/<组件>.html`（由生成器自 MD 产出）

## 签字区

| 角色 | 姓名 | 日期 | 备注 |
|------|------|------|------|
| 设计 | | | |
| 前端 | | | |

## 组件 × 状态（模板）

**Path A 结果**：`Pass` / `Diff-可接受` / `Diff-须修` / `Skip`  
**Path B**：指向静态 demo 路径或 `N/A`。  
**Arco 矩阵（demos-react）**：与 Arco 官网同一 npm 包下的 props/状态示意；`未建` / `已建` / `例外已记`（与 HTML 是否 1:1 无关，见 [HTML_VS_DEMOS_REACT](../../.design-spec/docs/reports/HTML_VS_DEMOS_REACT.md)）。

| 组件 | 状态 / 场景 | Figma 参考（canonical） | Path A 结果 | 偏差说明 | Path B（HTML） | Arco 矩阵（demos-react） |
|------|-------------|------------------------|-------------|----------|----------------|-------------------------|
| Alert | info + close | 见 [COMPONENT-FIGMA-LINKS](./COMPONENT-FIGMA-LINKS.md) | | | `.design-spec/demos/components/alert.html` | 已建 |
| Button | default / hover / disabled | 同上 | | | `.design-spec/demos/components/button.html` | 已建 |

> **Figma 链接优先序（P0 / P1 slug）**：机器表 [FIGMA_SLUG_PRIORITY.md](../../.design-spec/docs/reports/FIGMA_SLUG_PRIORITY.md)（`python3 .design-spec/scripts/figma_slug_priority.py` 更新）。  
> 完整组件列表与 node 以 `figma_truth_table.json` 与三边对账表为准；本表随对稿进度逐行填满。

## 自动化截图（Path B 证据链）

- **配置**：`.design-spec/e2e/playwright.config.ts` — viewport **1280×720**、`deviceScaleFactor: 1`、Light、`animations: disabled`。  
- **阈值**：`toHaveScreenshot` 默认 `maxDiffPixels: 1200`、`threshold: 0.25`（与 Figma 并置或 export diff 时在此范围内记为可接受；须收紧时改配置并全量更新基线）。  
- **用例**：`npm run test:visual` 运行 `tests/visual.spec.ts`，对 **`alert` / `button` / `input`** 的 `#liveRoot` 截图（与 `figma_truth_table.json` 中已填 canonical 的 triad 对齐 slug 一致；闭项后可扩展列表）。  
- **基线**：在 **ubuntu-latest**（与 CI 一致）执行 `npm run test:update` 后提交 `tests/**/*-snapshots/**`。详见 [PLAYWRIGHT.md](./PLAYWRIGHT.md) 与 [`.design-spec/e2e/README.md`](../../.design-spec/e2e/README.md)。
