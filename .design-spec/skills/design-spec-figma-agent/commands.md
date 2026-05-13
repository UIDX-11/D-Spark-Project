# Repeatable command sequences / 可重复命令序列

Run in an **AI agent session** (Cursor, Claude Code, etc.) with the **design-spec-figma-agent** skill loaded. Copy the active sequence into the agent task. **Do not skip validation** (Sequence C).

---

## Sequence A — Figma → MD sync / Figma 更新后同步 Markdown

**Goal**: After designers change Figma, refresh bilingual MD so RAG matches the library.

1. **Open master** `.design-spec/templates/figma-agent/MASTER.md` (or your repo copy) and confirm placeholders: variable collection names, library URL/key, team library name.
2. **For each touched component**, read Figma: component **description / docs**, **variant properties**, **variable bindings** on reference instances (use Figma MCP: metadata / design context as available).
3. **Patch component MD** using `.design-spec/templates/figma-agent/COMPONENT.md`:
   - **Intent** ZH/EN = Figma strings (translate only; do not rename concepts).
   - **Variant table** = exact Figma property names and allowed values.
   - **Token mapping** rows = only variables that exist; left column Figma, right column `semantic.*` from `.design-spec/tokens/src/semantic.json`.
   - **Figma “code examples”** = instance naming + Auto Layout rules observed in the library reference.
4. **Update intent index** table in master (component key → MD path).
5. **Run Sequence C** on changed files.

---

## Sequence B — RAG → Figma build / 用 Agent 一键生成 Figma 界面

**Goal**: Assemble or extend frames using MD as system + retrieval context.

1. **Load context**:
   - Always include **master** MD (global rules + variable mandate).
   - Retrieve **only** component MD files needed for the target screen (avoid unrelated chunks).
2. **Set system constraints** (must be stated to the model):
   - Instances only from **published team library** named in master.
   - Colors/type/spacing/radius only via **approved variable collections**; forbid arbitrary hex on production surfaces.
   - Variants must match **variant table**; include **disabled** and **loading** when the spec lists them.
   - Apply **empty** and **error** patterns from each component MD.
3. **Execute in Figma** (MCP / `use_figma` per project rules): place instances, set variants, apply variables, apply Auto Layout per MD.
4. **Run Sequence C** on the resulting selection or page.

---

## Sequence C — Auto / semi‑auto validation / 校验（必跑）

Execute checks in [reference-checks.md](reference-checks.md).

**Structured MD checks (repo)**:

```bash
python3 .design-spec/checks/validate_figma_agent_docs.py
```

**Pass criteria**: all **Blocking** items clear, or explicitly waived in writing with owner + reason.

**On failure**: return to Sequence A (if MD drift) or Sequence B (if build drift), then re-run C.
