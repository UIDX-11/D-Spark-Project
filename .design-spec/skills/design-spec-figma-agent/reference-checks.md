# Validation — Figma (AI agent workflow) / 自动与半自动检查

Use after **Sequence A** (MD sync) or **Sequence B** (Figma build). Split into **Blocking** vs **Warning**.

---

## B1. Variable collections (Blocking) / 变量集合

- [ ] No production frame uses **detached** color / text / radius / spacing where a variable exists in `{{FIGMA_VARIABLE_COLLECTION_NAMES}}`.
- [ ] Every listed surface role in component MD **Token mapping** has a **real** Figma variable name (no placeholders left in published docs).

**Semi‑auto**: Sample N instances per page; inspect fills/strokes/text in Figma MCP or plugin output for raw hex vs variable binding.

---

## B2. Library source (Blocking) / 组件来源

- [ ] All DS instances resolve to **team library** `{{TEAM_LIBRARY_NAME}}` (not local duplicates, not stale detached components).
- [ ] **Instance names** follow patterns in component MD **Figma “code examples”**.

---

## B3. Variant parity (Blocking) / 变体一致

- [ ] For each instance, **variant property names** match Figma component definition **exactly** (case-sensitive).
- [ ] **State** coverage: if MD variant table includes `disabled` / `loading` / `error`, screens that need those states use them (not simulated with opacity hacks).

---

## B4. Layout (Warning → Blocking if repeated) / 布局

- [ ] **Auto Layout** direction, padding, gap, and resizing match component MD (or scenario MD).
- [ ] No accidental **absolute** positioning that breaks the documented pattern unless MD explicitly allows it.

---

## B5. Copy & interaction (Blocking for shipped patterns) / 文案与交互

- [ ] **Empty** and **error** UI uses wording / structure from MD (ZH/EN pair as applicable); no contradictory microcopy.
- [ ] Icons or illustrations for empty/error states match library assets if MD references them.

---

## B6. Markdown integrity after sync (Blocking) / 同步后的 MD 完整性

- [ ] Each component MD includes all mandatory H2 sections from template: Intent (bilingual), Variant table, Do/Don’t, Token mapping, Figma “code examples”, empty/error.
- [ ] **Intent** bilingual text is traceable to Figma component **description / documentation** (spot-check side-by-side).

---

## Automation notes / 自动化说明

- **Repo script**: `python3 .design-spec/checks/validate_figma_agent_docs.py` — verifies MASTER anchors and required headings under `docs/figma-agent/` (subset of **B6**). Wire into CI next to `doc_accuracy_guard.py`.
- **Full automation** depends on your Figma setup (REST API, plugins, or MCP scripts). Until wired, treat **B1–B3** as **semi‑auto** via structured MCP inspection + checklist.
- **Regression**: When adding automation, store allowlists: collection IDs, library file keys, component keys.
