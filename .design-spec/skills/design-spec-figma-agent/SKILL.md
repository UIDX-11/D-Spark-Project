---
name: design-spec-figma-agent
description: >-
  Guides designer-first Figma assembly in AI agent tools using bilingual design markdown
  as RAG/system prompt, sync-from-Figma-to-md workflows, and blocking validation. Use when
  designers build Figma UI with Cursor, Claude Code, or similar agents loading this repo
  skill, syncing Figma into designer MD, running repeatable command sequences, or when
  the user mentions figma-agent templates, Figma MCP, variable-set mandates, or Figma-side
  "code examples".
---

# design-spec-figma-agent

## Goal

Designers use an **AI agent environment** (e.g. **Cursor**, **Claude Code**, or any assistant that can load this repository’s **Skill**, attach **design md** as RAG / system prompt, and call **Figma MCP**) to produce **Figma** UI that respects:

- Visuals (color, type, spacing, radius) via **approved Figma variables**
- Component usage (variants, states including disabled / loading)
- Copy & interaction (empty, error)

**Source order**: update **Figma** first, then sync **markdown**. Do **not** document Arco-to-Figma API mapping.

## Where templates live

- Master / 总纲: `.design-spec/templates/figma-agent/MASTER.md`
- Component: `.design-spec/templates/figma-agent/COMPONENT.md`
- Scenario (later): `.design-spec/templates/figma-agent/SCENARIO.md`
- Index: `.design-spec/templates/figma-agent/README.md`

Copy templates into your chosen doc root (e.g. `.design-spec/docs/figma-agent/`) and replace `{{placeholders}}`.

## RAG usage (any agent)

1. **System layer**: always inject the **master** MD (variable collection mandate, library scope, global rules).
2. **Retrieval layer**: pull **only** component MD files required for the current screen; include **scenario** MD when working on page templates.
3. **Tooling**: use **Figma MCP** (read for sync; write for build) per repo conventions. If `use_figma` is required for writes, load the **figma-use** skill first.
4. **Output**: Figma instances + variables + Auto Layout as specified in MD — not HTML/Arco unless the user explicitly changes scope.

## Mandatory sections per component MD

Aligned with the **COMPONENT** template:

- **Intent** (ZH + EN) — **same naming as Figma** component description / documentation strings
- **Variant table** — Figma property names and values **verbatim**
- **Do / Don’t**
- **Token mapping** — **Figma variable name ↔ `semantic.*`**; master lists **must-use variable collections**
- **Figma “code examples”** — instance naming, variant usage, **Auto Layout** rules

## Repeatable workflows

Follow verbatim steps in:

- [commands.md](commands.md) — **Sequence A** (Figma → MD), **Sequence B** (RAG → Figma), **Sequence C** (validation)

## Validation

Run **Sequence C** after every A or B. Check definitions:

- [reference-checks.md](reference-checks.md)

**Rule**: do not mark a task complete while any **Blocking** item in reference-checks is open.

## Relationship to other repo skills

- **design-spec-doc-writer**: targets Arco-Vue-centric **developer** component docs under `.design-spec/docs/components/`. **design-spec-figma-agent** targets **designer** workflows (**agent + Figma**) and **Figma-first** MD; do not merge Arco API mapping into designer MD unless the user expands scope.

## Making this skill discoverable (optional)

This skill lives under `.design-spec/skills/`. Wire it into whichever agent you use, for example:

- **Cursor**: symlink or copy this folder to `.cursor/skills/design-spec-figma-agent/`.
- **Claude Code** (or similar): add a project rule or plugin/skill entry that points agents to this `SKILL.md` and `commands.md` when the task is Figma assembly.
