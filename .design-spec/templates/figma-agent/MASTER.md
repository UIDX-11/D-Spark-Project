# Design system — Figma + AI agent master spec / 总纲

> **RAG role**: Treat this file as **global system prompt** for any Figma assembly task run by an **AI agent** (Cursor, Claude Code, etc.) using this repo’s skill and MCP. All component pages must stay consistent with this master spec.

---

## 0. Source order / 真源顺序

1. **Figma** is authoritative for components, variants, variables, and component **description / documentation** strings.
2. After Figma changes, **sync this markdown** (do not invent variants or tokens not present in Figma).

---

## 1. Mandatory Figma variable collection / 必须绑定的变量集合

**Designers MUST bind visuals only through the approved Figma variable collections.** No one-off hex on production surfaces, no detached styles for color/type/radius/spacing that have a token.

| Field | Value |
|-------|--------|
| **Approved collection names** | `{{FIGMA_VARIABLE_COLLECTION_NAMES}}` |
| **Figma library file (URL or key)** | `{{FIGMA_LIBRARY_URL_OR_KEY}}` |
| **Published team library name** | `{{TEAM_LIBRARY_NAME}}` |

If a needed role is missing from variables, **stop**: extend variables in Figma first, then update token mapping tables in component docs.

---

## 2. Semantic token file (code-side reference) / 语义 token 文件

Used only to **name** semantic roles in MD tables (`semantic.*`). Figma variable names are still authoritative in the left column of each component’s **Token mapping** table.

- **Path**: `.design-spec/tokens/src/semantic.json`

---

## 3. Non‑negotiable compliance / 必须遵守

### Visual / 视觉

- Color, typography, spacing, corner radius from **variables** only.
- Grid and Auto Layout follow conventions in component docs.

### Component usage / 组件用法

- Instances from **published library** only; correct **variant properties** and **states** (including disabled, loading).
- Naming: follow `type/kind/shape/size/state` where the library defines it.

### Copy & interaction / 文案与交互

- Empty and error states use **approved patterns** from component docs (no improvised microcopy that changes meaning).

---

## 4. What “code examples” means in this system / 「代码示例」含义

In these designer MD files, “code examples” are **Figma-side**: instance naming, variant property names, Auto Layout rules — **not** Arco API and not HTML.

---

## 5. Bilingual rule / 双语规则

- Every normative block has **中文** and **English** in the same section (or adjacent paragraphs).
- **Intent** strings MUST match Figma component **description / documentation** wording in both languages (same naming; translate, do not rename concepts).

---

## 6. Document map / 文档地图

| Doc | Path pattern |
|-----|----------------|
| This master | `{{MASTER_DOC_PATH}}` |
| Per-component | `{{COMPONENT_DOCS_GLOB}}` |
| Scenarios (later) | `{{SCENARIO_DOCS_GLOB}}` |

---

## 7. Intent index / 意图索引（可选）

Link each Figma component key to its MD file (fill after sync):

| Figma component key | MD path |
|---------------------|---------|
| `{{KEY}}` | `{{PATH}}` |
