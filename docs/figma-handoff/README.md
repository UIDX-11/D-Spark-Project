# Figma 手递 — 方案 B（MCP 推送）/ 方案 C（截图）

> **Layer / 层级**: **L3 — 操作 / 手递**。  
> 本文档不是 `Figma 规范 → design.md` 视觉验收真源；只是把本地 localhost 截图 / 网页 推到 **讨论稿** 的临时手递流程。  
> Path A 视觉对稿真源仍是 **官方库 `KJfy0GFDs8kLsXTzhTxAjd`**（详见 [`../visual-qa/PATH-A-WORKFLOW.md`](../visual-qa/PATH-A-WORKFLOW.md) 与 [`../../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)）。  
> **不要** 把 `dashboard-fullpage.png`（按需由 `capture-dashboard.sh` 重生成，**已从仓库隔离**，进入 `.gitignore`）与讨论稿 `VqEug9MsAHfG1lpRNP5FKy` 当作组件 / 页面规范的真源；它们仅供讨论。

在 **Figma 里看到 Dashboard** 的两种做法：**方案 B** 用 Cursor 的 Figma MCP 把网页抓进文件；**方案 C** 用本地 PNG 拖入画布。

---

## 方案 B：Figma MCP → `generate_figma_design`（推送到 Figma）

**当前 Cursor 会话若未接入 Figma MCP**，代理无法替你调用工具；需你在本机完成连接后，在 **新对话**里让 AI 执行推送（或按 Figma 官方插件流程操作）。

### B1. 前置条件

1. 安装并登录 **Figma 桌面端**，打开目标文件：  
   `https://www.figma.com/design/VqEug9MsAHfG1lpRNP5FKy/...`（file key：`VqEug9MsAHfG1lpRNP5FKy`）
2. 在 **Cursor** 中启用 **Figma 官方 MCP / 插件**（Settings → MCP / Integrations，按 Cursor 与 Figma 当前文档完成授权）。
3. 本地 **先启动** Dashboard 开发服，浏览器能打开：  
   `http://localhost:5173/`（端口以你项目为准）

### B2. 在 Cursor 里发起（示例话术）

连接 MCP 后，在新对话中说明：

> 请使用 `generate_figma_design`，把 `http://localhost:5173/` 整页捕获到 Figma 文件 `VqEug9MsAHfG1lpRNP5FKy`，输出到当前讨论用画布或空白区域；帧名 `Dashboard — from localhost`。

具体 **工具名与参数** 以你安装的 Figma MCP 为准（常见为 `generate_figma_design`，参数含 `url`、`fileKey`；若有 `nodeId` 可指定父节点）。

### B3. 若曾出现带 `#figmacapture=...` 的浏览器地址

那是 Figma 侧 **网页捕获** 流程：保持 **dev 已启动**，在浏览器打开该完整 URL，等待自动提交；完成后到 Figma 文件里查看是否出现新帧/截图层。

### B4. 与方案 C 的配合

MCP 常先生成 **位图参考帧**；若要 **可编辑组件实例**，还需在同一文件里用设计库组件重建（你文档 Path A 中的 `search_design_system` + `use_figma` 工作流）。

---

## 方案 C：Dashboard 截图手递（PNG）

把本地跑起来的页面 **导出为一张全页 PNG**，再 **拖入 / 粘贴** 到设计文件。

## C1. 启动本地页面

在能启动 Dashboard 的项目根目录执行（以你仓库实际脚本为准）：

```bash
pnpm dev
# 或
npm run dev
```

浏览器能打开 Dashboard（默认多为 `http://localhost:5173/`）。

## C2. 生成本地 PNG（推荐）

在**仓库根目录**执行：

```bash
chmod +x docs/figma-handoff/capture-dashboard.sh
./docs/figma-handoff/capture-dashboard.sh
```

输出文件：`docs/figma-handoff/dashboard-fullpage.png`

**注意**：脚本只检查 `DASHBOARD_URL` 能否访问；页面内容取决于你本地跑的是 **当前源码的 dev** 还是已构建的 **`dist/` 静态预览**（截图可能是构建快照，而非最新 `src/pages/Dashboard`）。要以源码为准时，请用 `npm run dev` 跑起来再执行本脚本。`dist/` 与历史 `dist-playground/` 已被 `.gitignore`，每次构建后会重新生成。

若端口或地址不同：

```bash
DASHBOARD_URL=http://127.0.0.1:3000/ ./docs/figma-handoff/capture-dashboard.sh
```

**首次**在本机使用 `npx playwright screenshot` 时，若提示缺少浏览器，请先执行：

```bash
npx playwright@1.49.0 install chromium
```

## C3. 放进 Figma

1. 打开目标 Figma 文件与画布。
2. 菜单 **Place image…**（或把 `dashboard-fullpage.png` **拖进画布** / **复制图片后 Ctrl/Cmd+V 粘贴**）。
3. 建议把该帧命名为 `Dashboard — screenshot (方式C)`，便于与正式组件稿区分。

## C4. 纯手动（不用脚本）

1. 浏览器打开 Dashboard，缩放到合适宽度（例如 1440px）。
2. 使用系统截图或浏览器「整页截图」扩展保存 PNG。
3. 同上拖入 Figma。
