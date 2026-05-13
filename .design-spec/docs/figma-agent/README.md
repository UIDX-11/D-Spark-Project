# Figma agent — starter docs / 设计师 RAG 起步文档

> **Layer / 层级**: **L3 — Figma RAG 旁路语料**。  
> 本目录服务 **Figma 装配 / 设计师 agent**；不是 `design.md` 主线消费入口。  
> 主线 = [`../design.md`](../design.md) + [`../components/*.md`](../components/) + [`../COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md) + fenced spec block。本目录的镜像 MD 不替代它们。

This folder holds **filled copies** of `.design-spec/templates/figma-agent/`
used as **RAG / system prompt** in AI agents (Cursor, Claude Code, …) when
building **Figma** UI.

- **Master**: [MASTER.md](MASTER.md) — variable mandate, library scope, intent index, **L3 boundary statement**.
- **Per-component (Figma-side mirror)**: [components/](components/) — sync from Figma with **Sequence A** in `.design-spec/skills/design-spec-figma-agent/commands.md`.
- **Scenarios**: [scenarios/page-form.md](scenarios/page-form.md), [scenarios/page-list.md](scenarios/page-list.md)

## Boundary / 边界

- **Dev-facing** Web / Vue / Arco specs stay under [`../components/`](../components/); do not mix them as the primary RAG source for Figma-only tasks.
- Updating files here **does not** count as updating the design system. After every Figma sync, also write the new node-id / variable mapping back to [`../COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md), [`../../config/figma_truth_table.json`](../../config/figma_truth_table.json) and (if a new variable) [`../FIGMA_VARIABLES_TOKEN_BRIDGE.yaml`](../FIGMA_VARIABLES_TOKEN_BRIDGE.yaml).
- Governance for boundary and isolation: [`../reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../reports/DESIGN_MD_GOVERNANCE_AUDIT.md).
