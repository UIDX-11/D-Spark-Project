# D-Spark · `design.md` — AI generation entry point

This document is the **first file any AI tool should read** before generating
UI on top of D-Spark. It is intentionally minimal: it lists the
non-negotiable rules, the read order, and pointers to the canonical indices.
It is **not** a duplicate registry of components, pilot status, maintenance
runbooks or external prompt templates — those live in their own files (see
[§ What this file is not](#what-this-file-is-not)).

Source of truth for the design system lives in this repository under
[`.design-spec/`](..). AI tools running outside Cursor should follow the read
order in [§ Read order](#read-order) and never invent values that bypass the
linked files.

## TL;DR for AI tools

1. **Tokens first.** Every color, spacing, radius, font-size and shadow MUST
   come from `--semantic-*` or `--component-*` CSS variables defined in
   [`tokens/dist/tokens.css`](../tokens/dist/tokens.css). No hex, no raw `px`
   beyond what is already in a token.
2. **Use approved components only.** Build UI from the specs indexed by
   [`docs/components/README.md`](components/README.md) and
   [`docs/components/intent-index.md`](components/intent-index.md).
3. **Match Figma when conflict.** When Figma and Arco Design Web React
   disagree on **visuals**, **Figma is canonical** (file
   `KJfy0GFDs8kLsXTzhTxAjd`, see
   [`COMPONENT_FIGMA_INVENTORY.md`](COMPONENT_FIGMA_INVENTORY.md)). For
   **API / behavior / a11y** the priority is spelled out in
   [`ALIGNMENT_GOVERNANCE.md`](ALIGNMENT_GOVERNANCE.md) §1.
4. **Variant naming is `type/kind/shape/size/state`** — always.
5. **A11y is non-negotiable.** Keyboard reachability, visible focus and an
   accessible name MUST be present for every interactive element. Detail in
   [`accessibility/README.md`](accessibility/README.md) and
   [`ALIGNMENT_GOVERNANCE.md`](ALIGNMENT_GOVERNANCE.md) §1.1.
6. **Validate machine-readable blocks.** Any `json` / `yaml` fenced block
   tagged with a `kind` from
   [`../schemas/spec-block.schema.json`](../schemas/spec-block.schema.json)
   MUST conform; the spec block is the contract you should program against
   rather than restating its values in code.
7. **No invented Figma nodes.** Use the node-ids verbatim from
   [`COMPONENT_FIGMA_INVENTORY.md`](COMPONENT_FIGMA_INVENTORY.md). If a
   component is `pending` there, stop and ask — do not back-fill from another
   design system.

## Read order

AI tools consuming this repo should load files in **this exact order**:

1. **`design.md`** — this file. Rules and indices.
2. **[`tokens/dist/tokens.css`](../tokens/dist/tokens.css)** — resolved
   design tokens (consumed at runtime).
3. **[`COMPONENT_FIGMA_INVENTORY.md`](COMPONENT_FIGMA_INVENTORY.md)** —
   component ↔ Figma node mapping (canonical).
4. **[`FIGMA_VARIABLES_TOKEN_BRIDGE.yaml`](FIGMA_VARIABLES_TOKEN_BRIDGE.yaml)**
   — Figma variable path → CSS variable bridge.
5. **`components/<slug>.md`** — the spec for the component(s) being used,
   including the fenced `Spec block (atomic)` JSON.
6. **`pages/<id>.md` / `pages/patterns/<id>.md`** — for page-level layout and
   common composition rules.
7. **[`../schemas/spec-block.schema.json`](../schemas/spec-block.schema.json)**
   — JSON schema for validating any machine-readable block (`atomic`,
   `pattern`, `page`, `layoutProtocol`, `slotRegistry`, `responsive`,
   `tokenMap`).
8. **[`foundations/README.md`](foundations/README.md)** — grid, spacing,
   shadow, layout protocol, icon manifest indices.

If you only need to render a single component, you may skip steps 6 and 8 but
NEVER skip steps 1–5.

## Indices (single link per area)

This file does not duplicate the indices. Follow each link below; each
target file is the **single edit surface** for that index.

| Area | Canonical index |
| --- | --- |
| Component slug → spec | [`components/README.md`](components/README.md) |
| Intent → recommended components / patterns | [`components/intent-index.md`](components/intent-index.md) |
| Component → Figma node | [`COMPONENT_FIGMA_INVENTORY.md`](COMPONENT_FIGMA_INVENTORY.md) |
| Pattern specs | [`pages/patterns/`](pages/patterns/) (`search-form.md`, `pro-table.md`) |
| Page specs | [`pages/`](pages/) (canonical: [`pages/page-dashboard.md`](pages/page-dashboard.md), IA: [`pages/information-architecture.md`](pages/information-architecture.md)) |
| Layout templates | [`layouts/README.md`](layouts/README.md) |
| Foundations (间距 / 栅格 / 投影 / 布局 / 图标 / layout-protocol) | [`foundations/README.md`](foundations/README.md) |
| Token sources & generators | [`../tokens/`](../tokens/) (CSS: [`tokens/dist/tokens.css`](../tokens/dist/tokens.css)) |
| Schemas & examples | [`../schemas/`](../schemas/) |
| External AI prompt template & packaging | [`../PORTABLE_SPEC_README.md`](../PORTABLE_SPEC_README.md) |
| Maintainer pipeline (regenerate tokens / demos / reports) | [`../checks/README.md`](../checks/README.md) |
| Long-running Arco · Figma · token · PR governance | [`ALIGNMENT_GOVERNANCE.md`](ALIGNMENT_GOVERNANCE.md) |
| Requirements & phased plan | [`REQUIREMENTS_AND_PLAN.md`](REQUIREMENTS_AND_PLAN.md) |

> Pilot scope (first end-to-end `Figma → token → component md → design.md →
> AI output` loop): **button, input, select, form, table, modal,
> datepicker.** Full pilot table with primary/additional Figma nodes lives in
> [`COMPONENT_FIGMA_INVENTORY.md` → Pilot components](COMPONENT_FIGMA_INVENTORY.md#pilot-components-first-batch).

## What this file is not

`design.md` is the **AI entry point**, not a catch-all. Do not expand it with
content that already lives elsewhere; instead, link.

- **Not a component registry.** Full slug table lives in
  [`components/README.md`](components/README.md).
- **Not a pilot tracker.** Pilot rows live in
  [`COMPONENT_FIGMA_INVENTORY.md`](COMPONENT_FIGMA_INVENTORY.md).
- **Not a PRD / QA evidence index.** That is
  [`../../docs/visual-qa/README.md`](../../docs/visual-qa/README.md) and the
  PRD it links to.
- **Not a generator / maintainer runbook.** That is
  [`../checks/README.md`](../checks/README.md) plus the workflow under
  [`reports/DEVIATION_REMEDIATION_WORKFLOW.md`](reports/DEVIATION_REMEDIATION_WORKFLOW.md).
- **Not a list of generated reports.** Machine reports under
  [`reports/`](reports/) are **snapshots**, not part of the read order.
- **Not the external-AI prompt template.** That is in
  [`../PORTABLE_SPEC_README.md`](../PORTABLE_SPEC_README.md) under
  *External-tool prompt template*.

If you are tempted to add a table, a checklist or a maintainer note here,
ask whether it belongs in one of the linked files first.
