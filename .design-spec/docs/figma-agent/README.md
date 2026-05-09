# Figma agent — starter docs / 设计师 RAG 起步文档

This folder holds **filled copies** of `.design-spec/templates/figma-agent/` used as **RAG / system prompt** in AI agents (Cursor, Claude Code, …) when building **Figma** UI.

- **Master**: [MASTER.md](MASTER.md) — variable mandate, library scope, intent index.
- **Per-component**: [components/](components/) — sync from Figma with **Sequence A** in `.design-spec/skills/design-spec-figma-agent/commands.md`.
- **Scenarios**: [scenarios/page-form.md](scenarios/page-form.md), [scenarios/page-list.md](scenarios/page-list.md)

**Dev-facing** Arco / Vue specs stay under `docs/components/`; do not mix them as the primary RAG source for Figma-only tasks.
