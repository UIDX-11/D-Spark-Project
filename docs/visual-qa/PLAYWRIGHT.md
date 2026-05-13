# Playwright 视觉与烟雾测试

> **L2 — 实现侧验收命令清单 / 不是规范真源。**  
> Playwright 配置真源在 [`.design-spec/e2e/`](../../.design-spec/e2e/)；本文件仅记录开发者最常用的命令与边界约束。

## design-spec（静态 HTML）

配置与命令见 [`.design-spec/e2e/README.md`](../../.design-spec/e2e/README.md)。

```bash
cd .design-spec/e2e
npm install
npx playwright install chromium
npm test                 # 烟雾
npm run test:visual      # 截图对比：`visual.spec.ts`（alert / button / input 的 #liveRoot；需已提交基线）
npm run test:update      # 在 ubuntu-latest 上更新基线（与 CI 一致）
```

**约束**：`file://` 打开本地 HTML；基线 PNG 须在与 GitHub Actions **相同 OS** 上生成（见 ALIGNMENT_GOVERNANCE §4）。

## 根目录 Playground（Vite）

若仓库根存在 `playwright.config.ts` 与 `e2e/visual-qa-app.spec.ts`，用于 localhost Playground 截图；阈值与 viewport 以该配置为准。
