# React Playground（`src/styles/theme.css`）与设计 spec（`tokens/dist/tokens.css`）

> **Layer / 层级**: **L2 — 双管道说明**。  
> Token 真源在 [`../../tokens/`](../../tokens/)；本文件只说明两套 CSS 变量并存的边界与对照思路，不复述 token 数值。

## 为何存在两套变量

| 管道 | 主要 CSS 入口 | 用途 |
|------|----------------|------|
| **产品 / Playground** | `src/styles/theme.css`（`:root` 下 `--background`、`--primary`、`--radius` 等） | `src/components/ui` + Tailwind 任意值 / CVA；偏 **应用壳 + 通用 shadcn 风格 token**。 |
| **Path B 静态 demos** | `.design-spec/tokens/dist/tokens.css`（`--core-*`、`--semantic-*`、`--component-*`） | 生成器 + `studio_runtime.css`；对齐 **Figma Light DS** 与 `component.json` 源。 |

两者 **不是** 同一命名空间：对稿时若混用「localhost 截图」与「`.html` 截图」而不声明验收面，会产生 **假偏差**（根因 2）。

## 语义对照（示意，非自动同步）

以下仅表达 **设计意图** 上的近似关系；数值以各自源文件为准，合并前须逐 token 核验。

| design-spec（示例） | React theme（示例） | 备注 |
|---------------------|---------------------|------|
| `--semantic-text-primary` / `--core-color-neutral-170` | `--foreground` | 主文案色 |
| `--semantic-border-default` | `--border` | 默认描边 |
| `--semantic-action-primary-bg` | `--primary` | 主按钮面（色值可能不同体系） |
| `--component-button-*` | Tailwind + CVA 组合 | 组件级须从 `tokens` 或 Figma 同步后再映射 |

## 收敛建议

1. **对稿声明**：MATRIX / PR 写清本 PR 验证的是 **Path A vs HTML** 还是 **Path A vs localhost**。  
2. **单一数值源**：组件视觉以 Figma → `tokens/src` → `tokens/dist` 为准；若产品 UI 须与 DS 一致，应在 `theme.css` 或 Tailwind 主题中 **引用或复制** 同一十六进制 / 同一 CSS 变量名（需工程化决策）。  
3. **禁止**：在未更新 `tokens` 的情况下，仅凭 `theme.css` 改色后宣称与 Figma 1:1。
