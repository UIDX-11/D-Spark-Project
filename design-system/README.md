# Design System (Human-visible entry)

> **L3 — Façade only.** 本目录是 GitHub 上的人读门面，**不是规范真源**。规范一律落在 [`.design-spec/`](../.design-spec/)；本仓库分层与 reverse routing 见 [`docs/DOCUMENTATION_MAP.md`](../docs/DOCUMENTATION_MAP.md) 与本轮治理报告 [`DESIGN_MD_GOVERNANCE_AUDIT.md`](../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)。

This folder is the **human-visible entrypoint** on GitHub.

## Where the source of truth lives

All authoritative, AI-retrievable specifications live in:

- [`.design-spec/`](../.design-spec/) (hidden folder)
  - `manifest.json` — machine entrypoint
  - `docs/` — references (components, layouts, a11y, i18n…)
  - `tokens/src/` — token source of truth (primitive → semantic → component)
  - `tokens/dist/tokens.css` — generated CSS variables (for web consumption)

> **Do NOT** add component specs, page specs, or token tables in this folder. If you need to copy a value here for readability, link back to `.design-spec/` instead.

## Quick links

- **AI / tooling entry**: `.design-spec/manifest.json`
- **Global rules**: `.design-spec/docs/design.md`
- **Component library**: `.design-spec/docs/components/README.md`
- **Page skeletons (layouts)**: `.design-spec/docs/layouts/README.md`
- **Intent index**: `.design-spec/docs/components/intent-index.md`
- **Generator contract**: `.design-spec/generator/schema-ui-contract.md`
- **Tokens (CSS dist)**: `.design-spec/tokens/dist/tokens.css`
- **Designer Figma agent (starter MD + skill)**: `.design-spec/docs/figma-agent/` · `skills/design-spec-figma-agent/` · `templates/figma-agent/`

## Dual RAG（双轨检索 / 勿混用）

| Goal | Primary docs | Notes |
|------|----------------|-------|
| **Vue / HTML / Arco 行为与 demo** | `.design-spec/docs/components/*.md` + generator | Implementation truth per `ALIGNMENT_GOVERNANCE.md`. |
| **Figma 装配（变量、变体、Auto Layout）** | `.design-spec/docs/figma-agent/` + `design-spec-figma-agent` Skill | Designer/agent builds screens in Figma; **do not** treat component `Arco API` tables as Figma variant names without Sequence A sync. |

## Routing (3-layer router)

- **Router**: `design-system/SKILL.md`
- **Glossary**: `design-system/glossary.md`
- **Overlays**: `design-system/overlays/`
- **Capability modules (product-lines)**: `design-system/product-lines/`
- **Case studies**: `design-system/case-studies/`
- **Assets links**: `design-system/assets/`

## Recommended workflow

- Read rules from `.design-spec/` (do not fork copies here)
- Only add docs in `design-system/` when they are **entry / routing** docs intended for humans
