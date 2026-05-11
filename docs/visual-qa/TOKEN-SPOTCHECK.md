# Token 与渲染边界 Spot-check

以下情形 **允许** 与 Figma 导出或像素 diff 存在已知差异；对稿结论须结合「是否在边界内」说明：

- **字体**：系统字体栈与 Figma 字体渲染差异。  
- **亚像素**：边框/线宽 1px、对齐到半像素。  
- **图标**：笔画粗细、视口 box；静态路径须走 [`.design-spec/assets/icons/icons.manifest.json`](../../.design-spec/assets/icons/icons.manifest.json) 登记的 Figma 导出 SVG。  
- **Toast / Message**：DOM 角色与层级可能与稿不同，以行为 + token 计算值为准。

## 建议操作

1. 打开 `.design-spec/demos/components/<slug>.html` 与 Figma canonical node 并置。  
2. DevTools 检查关键 `computed style` 是否来自 `--semantic-*` / `--component-*`。  
3. 截图对比使用文档化 `maxDiffPixels` / `threshold`（见 `.design-spec/e2e/playwright.config.ts`）。
