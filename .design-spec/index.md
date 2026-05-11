# D-Spark Design Spec (AI-Retrievable)

This directory is the **single entrypoint** for D-Spark UI generation rules.

## What this is

- A design-system knowledge base optimized for **AI retrieval** and **schema-driven UI generation**
- Covers **Foundations, Components, Layouts, Content, Accessibility, I18n**
- Targets **Web (React + Vue)** and **Flutter**

## How to use (for humans & agents)

- Start at `docs/design.md` for the overview and global rules.
- Use the component library in `docs/components/`.
- Use `docs/components/intent-index.md` to go from **intent → recommended patterns/components**.
- For generators/validators, enforce `generator/schema-ui-contract.md`.
- For a human-visible entry on GitHub, start at `../design-system/README.md`.

## Files that tools should read first

- `manifest.json`
- `docs/design.md`
- `docs/REQUIREMENTS_AND_PLAN.md` — 需求拆解与阶段计划（含 **§R14 Arco Design Web React 叙述基线** 与 `demos-react` 交互态 DoD）
- `docs/ALIGNMENT_GOVERNANCE.md` — **Arco Design Web React · Figma · token · a11y · PR 验收**（组件长程对齐单一事实来源）
- `generator/schema-ui-contract.md`
- `docs/components/intent-index.md`
- `e2e/README.md` — Playwright 烟雾与截图基线（PR gate）