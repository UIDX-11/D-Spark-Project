# D-Spark Design Spec (AI-Retrievable)

> **L0 — Spec entrypoint.** 本目录是 D-Spark 设计规则的**唯一真源**。
> 人读地图见 [`docs/DOCUMENTATION_MAP.md`](../docs/DOCUMENTATION_MAP.md)；门面入口见 [`design-system/README.md`](../design-system/README.md)。

## What this is

- 面向 **AI 检索** 与 **schema-driven UI 生成** 的设计系统知识库
- 覆盖 **Foundations / Components / Layouts / Content / Accessibility / I18n**
- 目标：**Web (React + Vue)** 与 **Flutter**

## How to use（人与 agent 通用）

1. 始终从 [`docs/design.md`](docs/design.md) 开始（最小规则集 + 严格读序 + 索引）。
2. 组件正文位于 [`docs/components/`](docs/components/)；意图→组件映射见 [`docs/components/intent-index.md`](docs/components/intent-index.md)。
3. 页面/模式正文位于 [`docs/pages/`](docs/pages/) 与 [`docs/pages/patterns/`](docs/pages/patterns/)。
4. Token 真源在 [`tokens/src/`](tokens/) 生成 [`tokens/dist/tokens.css`](tokens/dist/tokens.css)；schema 在 [`schemas/spec-block.schema.json`](schemas/spec-block.schema.json)。
5. 生成器与校验器读 [`generator/schema-ui-contract.md`](generator/schema-ui-contract.md)。

## Tools should read first

- [`manifest.json`](manifest.json) — 机器入口
- [`docs/design.md`](docs/design.md) — AI 消费契约（L0）
- [`docs/REQUIREMENTS_AND_PLAN.md`](docs/REQUIREMENTS_AND_PLAN.md) — 需求拆解 + 阶段计划（含 §R14 Arco Design Web React 叙述基线 与 demos-react 交互态 DoD）
- [`docs/ALIGNMENT_GOVERNANCE.md`](docs/ALIGNMENT_GOVERNANCE.md) — Arco · Figma · token · a11y · PR 验收
- [`generator/schema-ui-contract.md`](generator/schema-ui-contract.md)
- [`docs/components/intent-index.md`](docs/components/intent-index.md)
- [`e2e/README.md`](e2e/README.md) — Playwright 烟雾与截图基线（PR gate）

> **边界提醒：** 任何 `docs/` 之外（包括仓库 `../docs/`、`../design-system/`、`../README.md`）出现的规范正文，都视为缓存或复述，需能在本目录找到原文。