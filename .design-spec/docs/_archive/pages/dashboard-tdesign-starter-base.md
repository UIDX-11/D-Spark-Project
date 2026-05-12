# TDesign Starter · 仪表盘基础页（静态对稿）

对稿参考：[TDesign Starter · 仪表盘 / 基础](https://tdesign.tencent.com/starter/vue/dashboard/base) 与仓库 [tdesign-vue-starter `src/pages/dashboard/base`](https://github.com/Tencent/tdesign-vue-starter/tree/develop/src/pages/dashboard/base)。

**静态实现产物**：`.design-spec/demos/pages/archive/dashboard-tdesign-starter-base.html`（B 线 · token + ECharts CDN + 上级目录的 `dashboard-starter.js`）。

## 视觉基准（建议视口 1440×900）

| 区域 | 与参考对齐的规格 | 说明 |
|------|------------------|------|
| 全局 gutter | `16px`（≈ `--component-card-layout-demo-row-gap` 若数值一致则用 token） | 行/列间距 |
| 顶部 KPI 卡高度 | `168px` | 四卡一行（大屏） |
| KPI 内嵌小图 | 约 `120×66`（首卡折线）、`120×42`（次卡柱） | 随视口缩放逻辑在 `dashboard-starter.js` |
| 中部图区高度 | `326px` | 饼图容器与折线图容器 |
| 出入库柱状区 | `351px` | `#stokeContainer` |
| 参考截图 | 请在上述视口自行截取参考站全页，附于设计评审或 Figma | 本仓库不托管第三方站点截图文件 |

## 结构对照（TDesign → 静态 DOM）

| 顺序 | 参考组件块 | 静态页 |
|------|------------|--------|
| 0 | `t-back-top` | `#ptStarterBackTop` 按钮 |
| 1 | `TopPanel` | `.pt-starter-kpi-row` 四卡 |
| 2 | `MiddleChart` | `.pt-starter-mid` 饼 + 折线 + 日期 |
| 3 | `RankList` | 两表 + 分段单选 |
| 4 | `OutputOverview` | 柱状 + 导出 + 两嵌套指标卡 |

## 组件 / token 对照（自检）

- **Card / Table / Button / Input**：与 `.design-spec/docs/components` 中对应 md 的语义一致；色与间距优先 `--semantic-*` / `--component-*`。
- **Trend**：`.pt-starter-trend` + `--semantic-*` 状态色（涨跌）。
- **图表**：ECharts 系列色与 [Vue 侧 `echarts-helpers.ts`](../../apps/dspark-vue-admin/src/views/dashboard/echarts-helpers.ts) 同源逻辑（`dashboard-starter.js` 内联等价实现），便于后续抽共享模块。

## 已知与参考站的差异（须在验收时接受或迭代）

1. **日期范围**：使用原生 `<input type="date">` 双控件，**无** TDesign RangePicker 浮层面板与动效 1:1。
2. **ECharts**：默认自 **jsDelivr CDN** 加载；离线环境请改为本地 `echarts.min.js` 或改为静态截图对稿。
3. **排名表「本周 / 近三个月」**：当前仅切换 **选中态**，表格数据未切换（占位）；需要真数据时再接线。
4. **右侧全局主题抽屉**：不属于 `dashboard/base` 内容区，**不在本页范围**。

## 验收建议

- [ ] 1440 宽下四段垂直顺序与参考一致，关键高度与 gutter 符合上表  
- [ ] 首 KPI 卡主色底、反色字与内嵌折线可读  
- [ ] 饼图中心文案、图例「线上 / 门店」与双折线 legend「本月 / 上月」存在  
- [ ] 两表列：排名圆点（前三高亮）、客户/供应商名称、较上周、订单量、日期、操作  
- [ ] `scan_token_violations`（若仓库已配置）无新增违规  
