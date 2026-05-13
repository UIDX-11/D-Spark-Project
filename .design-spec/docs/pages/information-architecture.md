# 页级信息架构（Starter 级 · D.Spark）

本文档约定中后台「典型页面」的**结构层级**（借鉴常见 Starter 的分组方式），**菜单文案与路由 path 可由产品自行替换**。**设计规范（`.design-spec`）组件行为/API 叙述基线为 Arco Design Web React**；示例实现工程 **`apps/dspark-vue-admin`**（Vue 3 + Arco Design Vue + `tokens.css`）仅作 **页壳与路由参考**，与组件 MD 真源分离。静态 B 线页模版（`demos/pages/*.html`）仅覆盖部分代表页，用于 Figma 对稿。阶段计划与验收对照：[REQUIREMENTS_AND_PLAN.md](../REQUIREMENTS_AND_PLAN.md)。

- **Dashboard 混合规格（`page` 块）**：[page-dashboard.md](./page-dashboard.md)（canonical：`demos/pages/dashboard.html`）。
- **模式级骨架**：[patterns/pro-table.md](./patterns/pro-table.md)、[patterns/search-form.md](./patterns/search-form.md)。

## 与参考工程的关系

- 分组思路可参考 [TDesign Vue Starter](https://github.com/Tencent/tdesign-vue-starter)（仪表盘 / 列表变体 / 表单变体 / 详情 / 结果 / 登录等），**不拷贝其代码与文案**。
- 技术栈以 **`apps/dspark-vue-admin` 内 Vue 3 + @arco-design/web-vue** 为准（与 design-spec 组件 MD 的 **React 叙述基线**分离）；后续可与 Arco Pro 类 IA 再对齐一次。

## 路由与菜单分组（默认 path）

| 一级（侧栏） | 二级（菜单项） | path | 说明 |
|-------------|----------------|------|------|
| 控制台 | 数据总览 | `/dashboard/base` | KPI、快捷区 |
| 控制台 | 分析报表 | `/dashboard/detail` | 图表/报表占位 |
| 列表与检索 | 标准列表 | `/list/base` | 表格 + 分页 |
| 列表与检索 | 卡片列表 | `/list/card` | 卡片栅格 |
| 列表与检索 | 高级筛选 | `/list/filter` | 多条件筛选条 |
| 列表与检索 | 树状筛选 | `/list/tree` | 左侧树 + 右侧表 |
| 表单 | 标准表单 | `/form/base` | 单页表单 |
| 表单 | 分步表单 | `/form/step` | 步骤条 + 分步字段 |
| 详情 | 基础详情 | `/detail/base` | 描述列表 + 主信息 |
| 详情 | 多区块详情 | `/detail/advanced` | 多卡片区块 |
| 详情 | 数据详情 | `/detail/deploy` | 时间线/元数据占位 |
| 详情 | 下级详情 | `/detail/secondary` | 主从/嵌套占位 |
| 结果页 | 成功 / 失败 / 无权限 / 不存在 / 服务错误 / 网络异常 / 浏览器不兼容 / 维护中 | `/result/*` | 各状态一页 |
| 其他 | 个人中心 | `/user` | 账户与偏好占位 |
| 其他 | 多级菜单示例 | `/nest-menu` | 深层导航占位 |
| 其他 | 内嵌页 | `/frame/doc` | iframe 占位 |
| （无侧栏） | 登录 | `/login` | 空白布局 |

## 静态 B 线（HTML）与 Vue 的边界

| 能力 | `demos/pages/*.html` | `apps/dspark-vue-admin` |
|------|----------------------|-------------------------|
| 设计 token | 仅 CSS 变量 | `tokens.css` + Arco |
| 组件行为 | 轻量 `page_templates.js`；TDesign 仪表盘另见 `dashboard-starter.js` + ECharts CDN | Arco 真组件 |
| IA 覆盖 | 通用仪表盘 / 列表 / 表单；另 **`demos/pages/archive/dashboard-tdesign-starter-base.html`** 对齐 [TDesign Starter 仪表盘 base](https://tdesign.tencent.com/starter/vue/dashboard/base) 四段结构 | **上表全量** |

页级对稿说明见 [_archive/pages/dashboard-tdesign-starter-base.md](../_archive/pages/dashboard-tdesign-starter-base.md)（**B 线参考，已归档**；canonical 仍为 [`page-dashboard.md`](page-dashboard.md)）。

## 维护约定

- 新增页面类型时：先更新**本表**，再补 **Vue 路由与侧栏配置**（`apps/dspark-vue-admin/src/config/menu.ts`），必要时再择要加静态对稿页。
