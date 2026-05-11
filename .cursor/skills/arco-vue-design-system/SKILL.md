---
name: arco-vue-design-system
description: >-
  Vue 3 + Arco Design Vue (@arco-design/web-vue) with D-Spark tokens from
  .design-spec/tokens/dist/tokens.css and optional arco-theme bridge. Use when
  the user mentions Arco、@arco-design/web-vue、a-date-picker、ConfigProvider、
  真组件替代 demo、apps/arco-vue-datepicker、apps/dspark-vue-admin（Starter 级页 IA）、或把业务 UI 与 design-spec token 对齐.
disable-model-invocation: false
---

# Arco Design Vue + D.Spark Token

## 版本

- 以 **`apps/dspark-vue-admin/package.json`**（或 **`apps/arco-vue-datepicker/package.json`**）与 **`npm view @arco-design/web-vue version`** 为准；升级后更新本段与官方 Theme 文档对照。

## 最小集成

1. `import "@arco-design/web-vue/dist/arco.css"` + **项目** `tokens.css`。
2. 用 **`src/styles/arco-theme.css`** 一类文件把 **`--semantic-*` / `--component-*`** 映射到 Arco 文档中的 **CSS 变量**（勿臆造变量名）。
3. 弹层组件注意 **`getPopupContainer`**、**z-index** 与 Modal/Drawer 叠层。

## 与 design-spec 文档

- **`docs/components/*.md`** 继续描述变体与无障碍；实现段写明 **Arco 组件名 + 关键 props**。
- **整页 IA**：`docs/pages/information-architecture.md`；Vue 实现目录 **`apps/dspark-vue-admin`**（`npm run dev`，默认端口 5174）。
- HTML **demo** 须在文档中标明 **非 Arco 行为** 若仍保留静态示意。

## 参考链接

- https://arco.design/vue/docs/start  
- https://arco.design/vue/docs/theme  
