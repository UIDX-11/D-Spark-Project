# Design Overview

This document defines the **global UI generation rules** for D-Spark.

## Goals

- Make AI-generated UI behave like it is built with a real design system.
- Make outputs consistent across **Web (Vue)** and **Flutter**.
- Ensure accessibility and internationalization are considered by default.

## Non-negotiable rules

1. **Controlled components only**: UI must be composed from the approved component set (see `docs/components/README.md`).
2. **Tokens first**: visual styling must come from design tokens (no hardcoded colors/spacing/radius/typography).
3. **Naming rule**: component variants/states must follow `type/kind/shape/size/state`.
4. **A11y by default**: every interactive component must have keyboard/focus semantics and accessible names.
5. **I18n-ready content**: content must tolerate longer strings and different formats (dates, numbers).

## Taxonomy (Atomic / Molecular / Page)

- **Atomic**: primitive building blocks (color, spacing, typography, icon, divider).
- **Molecular**: common UI components (Button, Form, Table, Tabs, …).
- **Page**: page templates and common page-level patterns.

Most “B-end common components” live in **Molecular**.

## Where the source of truth lives

- **Components**: `docs/components/`
- **Foundations**: `docs/foundations/`
- **需求拆解与阶段计划（混合规格 / Skill）**: `docs/REQUIREMENTS_AND_PLAN.md`
- **Tokens**: `tokens/src/` (source) → `tokens/dist/` (platform outputs)
- **Generator contract**: `generator/schema-ui-contract.md`
- **Arco · Figma · Vue 对齐与 PR 规则**: `docs/ALIGNMENT_GOVERNANCE.md`（含真源优先级、样式策略 **B**、token 两层、MD→HTML 流水线、截图与 e2e 验收）
- **Designer Figma（AI Agent，不限定单一工具）**: `templates/figma-agent/` and `skills/design-spec-figma-agent/`（在 **Cursor、Claude Code** 等可加载本仓库 Skill、挂载双语 MD 为 RAG、并调用 **Figma MCP** 的 Agent 环境中，在 **Figma** 搭界面；Figma 优先、变量集合强制、可重复命令与校验）

