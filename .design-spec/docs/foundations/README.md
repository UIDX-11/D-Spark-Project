# Foundations

Foundations define the cross-platform primitives that every component must use.

## Documents (中文规格)

| 文档 | 说明 |
|------|------|
| [间距.md](间距.md) | 全局间距尺度、gap、与 `tokens` 关系 |
| [栅格.md](栅格.md) | 12 / 24 等分栅格、默认 12、显式 24 |
| [投影.md](投影.md) | 层级 / 阴影原则、与组件 token 互链 |
| [布局.md](布局.md) | 宏观 shell / region、与栅格组合 |
| [layout-protocol-reference.md](layout-protocol-reference.md) | Fill/Hug/Fixed → Flex 对照（人读）；JSON 见 `schemas/examples/layout-protocol.example.json` |
| [icons-arco-mapping.md](icons-arco-mapping.md) | Figma↔Arco 图标降级（非对稿）；品牌 SVG 见 `../../assets/icons/` |

需求与阶段计划（验收对照）：[`../REQUIREMENTS_AND_PLAN.md`](../REQUIREMENTS_AND_PLAN.md)。

## Contents (legacy index)

- Color system (semantic first) — *待独立 md*
- Typography scale — *待独立 md*
- Spacing scale — **见 [间距.md](间距.md)**
- Radius, shadow, elevation — **见 [投影.md](投影.md)** + tokens
- Motion (durations/easing) and reduced-motion support
- Breakpoints and responsive rules — **见 [栅格.md](栅格.md)** + `kind: responsive` 块

The source of truth for values is `../../tokens/src/`.
