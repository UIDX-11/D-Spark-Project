# D.Spark · Vue 管理壳（Starter 级 IA）

Vue 3 + [Arco Design Vue](https://arco.design/vue) + 仓库内 `.design-spec/tokens/dist/tokens.css`。侧栏与路由对齐 `.design-spec/docs/pages/information-architecture.md`（文案可换为你的产品）。

## 开发

```bash
cd apps/dspark-vue-admin
npm install
npm run dev
```

默认开发服务器：<http://127.0.0.1:5174>（见 `vite.config.ts`）。

## 构建

```bash
npm run build
npm run preview
```

## 说明

- **分步表单**：`/form/step`
- **树状筛选列表**：`/list/tree`
- **数据总览**（`/dashboard/base`）：区块结构 **借鉴** [TDesign Starter 仪表盘](https://tdesign.tencent.com/starter/vue/dashboard/base)（仅作为应用层 IA 灵感参考），组件已替换为 Arco + ECharts（见 `views/dashboard/*`）。视觉真源仍是 D.S Web Com `KJfy0GFDs8kLsXTzhTxAjd` + `tokens/dist/tokens.css`；与 design-spec 主线无关的 TDesign 参考文档已归档至 [`.design-spec/docs/_archive/pages/dashboard-tdesign-starter-base.md`](../../.design-spec/docs/_archive/pages/dashboard-tdesign-starter-base.md)。
- 静态 B 线对稿页仍在 `.design-spec/demos/pages/*.html`，与真页面互补。
- 「内嵌文档」使用 iframe；若目标站禁止嵌入，页面可能空白，可改为自有文档地址。
- 治理与文档分层：见 [`.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)。
