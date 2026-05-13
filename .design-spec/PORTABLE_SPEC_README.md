# D-Spark · Portable Design Spec Package

This folder (`.design-spec/`) is a **self-contained, AI-friendly design-system
package**. It is intended to be vendored into another repository, mirrored
via `git submodule`, or copied into the working set of an AI tool (Cursor,
Claude Code, Cline, Copilot Workspace, custom RAG, …) so the agent can
generate UI that conforms to D-Spark without re-reading the host repo.

## What is included

The portable package is `.design-spec/` plus a single entry doc. Everything
referenced by `docs/design.md` lives within this folder.

```
.design-spec/
├── PORTABLE_SPEC_README.md          ← read first (this file)
├── docs/
│   ├── design.md                    ← AI entry point (rules + indices)
│   ├── COMPONENT_FIGMA_INVENTORY.md ← component ↔ Figma node mapping
│   ├── FIGMA_VARIABLES_TOKEN_BRIDGE.yaml ← Figma var → CSS var bridge
│   ├── components/*.md              ← per-component specs (incl. pilot atomic blocks)
│   ├── pages/                       ← page-level specs
│   ├── pages/patterns/              ← composition patterns
│   ├── foundations/                 ← grid, spacing, shadow, icons
│   └── reports/                     ← MCP extraction snapshots, audit reports
├── tokens/
│   ├── src/                         ← core.json, semantic.json, component.json
│   ├── dist/tokens.css              ← resolved CSS variables (consume at runtime)
│   └── generate_tokens_css.py       ← regenerate dist from src
├── schemas/
│   ├── spec-block.schema.json       ← JSON schema for fenced spec blocks (v0.1.0)
│   └── examples/                    ← example atomic / layout-protocol blocks
└── checks/
    ├── scan_token_violations.py     ← token-layering governance
    └── validate_spec_blocks.py      ← extract+validate Spec block (atomic) JSON
```

## Required read order for AI tools

| # | File | Why |
| --- | --- | --- |
| 1 | `docs/design.md` | Non-negotiable rules, indices, prompt template |
| 2 | `tokens/dist/tokens.css` | Resolved CSS variables — the only token source you should consume |
| 3 | `docs/COMPONENT_FIGMA_INVENTORY.md` | Component ↔ Figma node mapping |
| 4 | `docs/FIGMA_VARIABLES_TOKEN_BRIDGE.yaml` | Figma variable path → CSS var bridge |
| 5 | `docs/components/<slug>.md` | Per-component spec + `Spec block (atomic)` JSON |
| 6 | `docs/pages/*.md` and `docs/pages/patterns/*.md` | Page templates and composition patterns |
| 7 | `schemas/spec-block.schema.json` | Validate any fenced JSON spec block |
| 8 | `docs/foundations/*.md` | Grid / spacing / shadow / icon manifest |

Skip 6 & 8 when rendering a single component. Never skip 1–5.

## Constraint priority (top wins)

1. Rules in `docs/design.md` → **Non-negotiable rules**.
2. Component-level `Spec block (atomic)` (machine-readable JSON inside each
   `components/<slug>.md`).
3. The narrative tables in `components/<slug>.md` (variants, states, token
   bindings).
4. Pattern / page specs in `pages/` for composition.
5. Foundations (grid, shadow, etc.) for ambient defaults.
6. Tokens (`--semantic-*`, `--component-*`) — **never** invent values that
   bypass tokens.

When two layers disagree, the higher-priority layer wins. If a layer cannot
satisfy a rule, the AI should stop and surface the conflict rather than
improvise.

## External-tool prompt template

When invoking an LLM to generate UI on top of D-Spark from outside Cursor,
the system / context message should at minimum say:

```
You are generating UI that targets D-Spark.

Rules:
- Read .design-spec/docs/design.md first; follow its read order.
- Use only the components listed in .design-spec/docs/components/README.md
  (slug → spec index) or .design-spec/docs/components/intent-index.md.
- Use only --semantic-* or --component-* CSS variables from
  .design-spec/tokens/dist/tokens.css. Never hardcode hex, px, or shadow
  strings.
- When a component has a fenced "Spec block (atomic)", treat it as the
  contract: variant axes, bindings, metrics and i18n defaults are
  authoritative.
- For Figma alignment, use the node-ids from
  .design-spec/docs/COMPONENT_FIGMA_INVENTORY.md with
  fileKey KJfy0GFDs8kLsXTzhTxAjd via the Figma MCP.

If you cannot satisfy a rule, stop and explain rather than invent values.
```

This template is **the single home** for the external prompt; do not copy it
into `docs/design.md`. AI tools should read this file alongside `design.md`
when configuring a downstream agent.

### Prototype mode (React + Arco)

For React prototyping on top of D-Spark, the **stack and component-library
preamble are pre-loaded**. Downstream business prompts MUST NOT re-paste the
"React 技术栈使用 Arco design" / npm / GitHub link block — they should only
describe the page or module to build. Both the IDE rule
(`.cursor/rules/prototype-react-arco.mdc` in the host repo when shipped via
submodule) and the system message below already imply the stack.

System / context message to send before any prototype task:

```
You are a senior frontend engineer building React prototypes on D-Spark.

Stack (already implied — do NOT ask the user to repeat):
- React + @arco-design/web-react (https://github.com/arco-design/arco-design).
- Use only the components exported from src/components/ui in the host repo,
  whose contracts are specified by .design-spec/docs/components/*.md and
  routed via docs/components.md.

Hard rules:
- NEVER emit raw <button>, <input>, <select>, <textarea>, <form>, <dialog>
  for product interactions. Use the wrapped components instead (Button,
  Input, Select, Checkbox, Radio, Switch, Form + FormField + FormItem +
  FormMessage, Modal, Drawer, …).
- Only compose components and pass props. Hover / expand / selected /
  validation states are owned by the base components — do NOT re-implement
  them with custom CSS or JS in the prototype layer.
- All colors, spacing, radius, font-size, shadow MUST come from
  --semantic-* / --component-* / --ds-* CSS variables in
  .design-spec/tokens/dist/tokens.css. No hex, no raw px beyond tokens.
- Variant naming is always type/kind/shape/size/state.
- For forms, use Form + FormField + FormItem + FormMessage, label always
  visible, error messages actionable, one primary button per region with
  type="submit" bound to the form id.
- Read order before generating: design.md → tokens.css →
  COMPONENT_FIGMA_INVENTORY.md → components/<slug>.md →
  pages/<id>.md or pages/patterns/<id>.md.

If you cannot satisfy a rule, stop and explain rather than invent values.
```

Business prompt skeleton (what the human user actually writes after the
system message above is loaded once):

```
{Page or module goal, e.g. login page / device list / inspection detail}

Module structure:
- Region A: …
- Region B: …

Key data fields: …

Acceptance:
- Interaction: …
- Visual: follow design.md, tokens only
- Forms: Form + FormItem + FormMessage
```

## How to ship this package to another tool

1. **Copy verbatim.** `cp -r .design-spec/ <target-repo>/.design-spec/` is the
   default delivery. The package is self-contained: no path in it reaches up
   out of `.design-spec/` except for examples referring back to the host
   repo (e.g. `docs/REQUIREMENTS_AND_PLAN.md`); those are optional pointers
   and not required for UI generation.
2. **Git submodule (recommended).** Mount the D-Spark repo as a submodule and
   sparse-checkout only `.design-spec/`. Pin a tag/commit so token changes
   don't drift silently.
3. **RAG ingestion.** When indexing into a RAG system, prefer chunking by
   `docs/design.md` headers and by component file boundaries. Keep
   `tokens/dist/tokens.css` in a single chunk; consumers should retrieve the
   whole file when any token lookup is needed.
4. **MCP server pairing.** If the consumer also has access to the Figma MCP,
   they should resolve node-ids from `COMPONENT_FIGMA_INVENTORY.md` with
   `fileKey = KJfy0GFDs8kLsXTzhTxAjd`. The token bridge already records the
   `:` form node-ids the MCP expects.

## Versioning

- Schema version: see `schemas/spec-block.schema.json → $defs.v0_1_0` and the
  `schemaVersion` literal in every fenced JSON block. Currently **`0.1.0`**.
- Token CSS uses additive changes whenever possible; renames trigger a minor
  bump of `tokens/src/*.json → version`.
- Breaking changes will be summarized in a `CHANGELOG.md` (TODO once first
  external consumer integrates).

## Validation toolbox

Run before every commit that touches tokens or component specs:

```bash
# Regenerate tokens, then check layering rules.
python3 .design-spec/tokens/generate_tokens_css.py
python3 .design-spec/checks/scan_token_violations.py

# Validate fenced "Spec block (atomic)" JSON in component markdown.
python3 .design-spec/checks/validate_spec_blocks.py
```

CI may pass `--strict` to `scan_token_violations.py` to fail on the table
pinned shadow exception list as well — that flag is intended only for the
strictest validation.

## Status snapshot

- **Pilot atomic blocks**: button, input, select, form, table, modal,
  datepicker. The remaining components have narrative specs and will get
  atomic blocks in the next batch.
- **Figma inventory**: 33 of 39 components have a canonical node-id. Pending:
  `card`, `data-display-number`, `form`, `layout`, `list`, `space`.
- **Token bridge**: covers all variables observed in the 7 pilot components;
  gaps list tracks danger soft tones and i18n placeholders that should NOT be
  bridged to a CSS var.
- **Validation tooling**: layering check + atomic-block validator are wired
  up; both pass against the current sources.
