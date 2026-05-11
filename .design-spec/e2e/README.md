# Design spec — Playwright (smoke + visual)

## 目的

- **烟雾**（`npm test`，**CI 默认**）：静态 HTML demo 能加载，核心区域挂载成功；最小键盘可达性。
- **截图 diff（PR gate）**：固定 **视口 1280×720**、**Light**、`deviceScaleFactor: 1`、**禁用动画**，对 `#liveRoot` 等区域做 `toHaveScreenshot` 基线对比。运行 `npm run test:visual` 或 `npm run test:all`。

### 启用截图 gate 前

仓库需先包含在 **`ubuntu-latest`**（与 CI 一致）上生成的 **`tests/**/*-snapshots/**` PNG**。在此之前 CI 只执行烟雾，避免无基线即失败。基线就绪后，把 workflow 里的测试改为 `npm run test:all`（或追加 `npm run test:visual`）。详见 `docs/ALIGNMENT_GOVERNANCE.md` §4。

### GitHub Actions

- 示例 workflow：**`github-workflow-design-spec-e2e.yml.example`** → 复制为仓库根目录 **`.github/workflows/design-spec-e2e.yml`**。
- 若推送时提示 **PAT 缺少 `workflow` scope**：在浏览器里新建该文件，或换用带 **workflow** 权限的 token 再推送。

## 运行

```bash
cd .design-spec/e2e
npm install
npx playwright install chromium
npm test                 # 烟雾（与 CI 默认一致）
npm run test:visual      # 截图对比：`tests/visual.spec.ts`（alert / button / input #liveRoot；需已提交基线）
npm run test:all         # 烟雾 + 截图
```

首次或 Figma/样式有意变更后，在 **与 CI 相同 OS**（推荐 Ubuntu，与 GitHub Actions 一致）上更新基线：

```bash
npm run test:update
```

将生成的 `tests/**/*.png` 一并提交。

## 约束

- Demo 使用 `file://` 打开本地 HTML；不启动 HTTP 服务。
- 若本机字体与 CI 不一致导致 diff，请在 **同一 Docker / CI 镜像** 上生成基线，或后续改为 `npx playwright install-deps` + 锁定字体栈（治理文档后续迭代）。
