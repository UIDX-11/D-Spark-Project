# Token 与渲染边界 Spot-check

> **L2 — 验收边界口径 / 不是 token 真源。**  
> Token 真源在 [`.design-spec/tokens/`](../../.design-spec/tokens/)；本文件仅约定「哪些差异属于已知渲染边界，不计为 Figma 漂移」。

以下情形 **允许** 与 Figma 导出或像素 diff 存在已知差异；对稿结论须结合「是否在边界内」说明：

- **字体**：系统字体栈与 Figma 字体渲染差异。  
- **亚像素**：边框/线宽 1px、对齐到半像素。  
- **导出缩放**：Figma 导出 PNG 的 **倍率 / 裁切** 与 Playwright 截图 viewport 不一致时，diff 工具会放大噪声；应使用同一倍率与 `deviceScaleFactor`（见 `PLAYWRIGHT.md`）。  
- **阴影与模糊**：浏览器 `box-shadow` / `filter` 与 Figma **Drop shadow** 的半径、扩散、色空间不完全等价；以 token 化后的相对关系为准，允许微小色差。  
- **图标**：笔画粗细、视口 box；Path B 静态 HTML **必须**使用 [`.design-spec/assets/icons/icons.manifest.json`](../../.design-spec/assets/icons/icons.manifest.json) 登记的 **Figma 导出 SVG** 路径，禁止未登记图标字体或与 manifest 不一致的 URL。  
- **Toast / Message**：DOM 角色与层级可能与稿不同，以行为 + token 计算值为准。

### 与「双管道」相关的边界

若对稿一方为 **`src/` Playground**、另一方为 **`.design-spec/demos/components/*.html`**，请先阅读 [`.design-spec/docs/reports/REACT_VS_DESIGN_SPEC_TOKENS.md`](../../.design-spec/docs/reports/REACT_VS_DESIGN_SPEC_TOKENS.md)，再在结论中声明验收面；避免将 **两套 CSS 变量命名** 造成的差异误判为 Figma 漂移。

## 建议操作

1. 打开 `.design-spec/demos/components/<slug>.html` 与 Figma canonical node 并置。  
2. DevTools 检查关键 `computed style` 是否来自 `--semantic-*` / `--component-*`。  
3. 截图对比使用文档化 `maxDiffPixels` / `threshold`（见 `.design-spec/e2e/playwright.config.ts`）。
