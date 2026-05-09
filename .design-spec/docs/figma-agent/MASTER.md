# Design system — Figma + AI agent master spec / 总纲

> **RAG role**: Global system prompt for Figma assembly. Keep all `docs/figma-agent/components/*.md` consistent with this file.

---

## 0. Source order / 真源顺序

1. **Figma** is authoritative for components, variants, variables, and component **description / documentation** strings.
2. After Figma changes, **sync this markdown** (Sequence A in `.design-spec/skills/design-spec-figma-agent/commands.md`).

---

## 1. Mandatory Figma library & variables / 必须绑定的库与变量

**Bind visuals only through variables published from the approved library file.** No one-off hex on production surfaces for roles already covered by tokens (see `docs/ALIGNMENT_GOVERNANCE.md`).

### 1.1 Approved library (canonical) / 批准的组件库文件

| Field | Value |
|-------|--------|
| **Library display name** | `D.S-Web-Com_Light_V2_2026` |
| **Figma `fileKey`** | `KJfy0GFDs8kLsXTzhTxAjd` |
| **Design file URL** | [Open in Figma](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026) |
| **Published usage** | Designers enable this file as a **team library** in Figma; instances and variables must come from this published library, not stale detached copies. |

### 1.2 Variable collections — audit register / 变量集合登记

Exact **collection names** must match the **Variables** sidebar in file `KJfy0GFDs8kLsXTzhTxAjd` (spelling and casing). Update this table when Figma adds or renames collections.

**How to audit / 如何审计**: Open the link above → **Local variables** (or **Main menu → Variables**) → copy each **collection** title into the first column below.

| Collection name (exactly as in Figma) | Maps to repo token layer | Notes |
|----------------------------------------|---------------------------|--------|
| *(pending — paste from Figma Variables panel)* | See `docs/ALIGNMENT_GOVERNANCE.md` §2 | Primitives / scales typically align with `tokens/src/core.json`. |
| *(pending — paste from Figma Variables panel)* | Semantic (`semantic-*` in CSS) | Cross-component semantics; align with `tokens/src/semantic.json`. |
| *(pending — paste from Figma Variables panel)* | Component (`component-*` in CSS) | Per-component anatomy; align with `tokens/src/component.json`. |

**Minimum gate before marking “audit complete” / 审计完成的最低标准**:

- [ ] Every row above is filled with **real collection names** from Figma (no “pending”).
- [ ] Token mapping tables in `docs/figma-agent/components/*.md` only reference variables that live under these collections.

### 1.3 Alignment governance / 对齐治理（摘要）

- Two token layers and Figma mapping rules: **`docs/ALIGNMENT_GOVERNANCE.md`** §2 (*Token 两层与 Figma Variables*).
- Visual truth order: **`docs/ALIGNMENT_GOVERNANCE.md`** §1.

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
|--------------------------------|---------|
| Button | [components/button.md](components/button.md) |
| Input | [components/input.md](components/input.md) |
| Table | [components/table.md](components/table.md) |
