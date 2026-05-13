# Figma + AI agent — designer markdown templates

Designer-facing **bilingual (ZH / EN)** markdown used as **RAG / system prompt** in an **AI agent environment** (e.g. **Cursor**, **Claude Code**, or any tool that can load this repo’s **Skill** and **Figma MCP**). Source order: **update Figma first**, then sync these files.

| File | Use |
|------|-----|
| [MASTER.md](MASTER.md) | Global rules, variable set mandate, library scope |
| [COMPONENT.md](COMPONENT.md) | One file per component; intent must match Figma description |
| [SCENARIO.md](SCENARIO.md) | Page patterns (forms, lists); use after core components exist |

**Skill id**: `design-spec-figma-agent`

Repo paths for semantic tokens (for the Token mapping table): `.design-spec/tokens/src/semantic.json` (and related `core.json` if needed).
