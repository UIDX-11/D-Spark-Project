# Design system — Figma + AI agent master spec / 总纲

> **RAG role**: Global system prompt for Figma assembly. Keep all `docs/figma-agent/components/*.md` consistent with this file.

---

## 0. Source order / 真源顺序

1. **Figma** is authoritative for components, variants, variables, and component **description / documentation** strings.
2. After Figma changes, **sync this markdown** (Sequence A).

---

## 1. Mandatory Figma variable collection / 必须绑定的变量集合

**Bind visuals only through approved Figma variable collections.** No one-off hex on production surfaces.

| Field | Value |
|-------|--------|
| **Approved collection names** | **Replace after audit** — list the exact published collection names from your Figma library (e.g. primitives + semantic collections as named in the file). |
| **Figma library file (URL or key)** | `https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026` |
| **Published team library name** | `D.S-Web-Com_Light_V2_2026` (align with how designers enable the library in Figma) |

---

## 2. Semantic token file (reference) / 语义 token 文件

Use **only** to name `semantic.*` roles in component token tables:

- `.design-spec/tokens/src/semantic.json`

---

## 3. Non‑negotiable compliance / 必须遵守

- **Visual / 视觉**: variables for color, type, spacing, radius.
- **Component usage / 组件用法**: published library instances; correct variants including **disabled** and **loading** where applicable.
- **Copy & interaction / 文案与交互**: empty and error patterns per component docs.

---

## 4. “Code examples” in designer MD / 「代码示例」

**Figma-side only**: instance naming, variant properties, Auto Layout — not Arco API, not HTML.

---

## 5. Bilingual rule / 双语规则

Normative blocks are **ZH + EN**. **Intent** must match Figma description / documentation strings (translate only; same concept names).

---

## 6. Document map / 文档地图

| Doc | Path |
|-----|------|
| This master | `.design-spec/docs/figma-agent/MASTER.md` |
| Per-component | `.design-spec/docs/figma-agent/components/*.md` |
| Scenarios | `.design-spec/docs/figma-agent/scenarios/*.md` |

---

## 7. Intent index / 意图索引

| Figma component (working name) | MD path |
|----------------------------------|---------|
| Button | [components/button.md](components/button.md) |
| Input | [components/input.md](components/input.md) |
| Table | [components/table.md](components/table.md) |
