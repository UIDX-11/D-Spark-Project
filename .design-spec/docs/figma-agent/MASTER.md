# Design system — Figma agent master spec / Figma 装配总纲

> **Layer / 层级**: **L3 — Figma RAG 旁路语料**。  
> 本目录服务「设计师 / Figma 装配 agent」在 Figma 画布内的工作流，**不是** `Figma 规范 → design.md / hybrid spec` 的 AI 消费入口。  
> 真源链 `design.md → tokens/dist/tokens.css → COMPONENT_FIGMA_INVENTORY → components/<slug>.md → schemas/spec-block.schema.json` 见 [`../design.md`](../design.md) 与 [`../reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../reports/DESIGN_MD_GOVERNANCE_AUDIT.md)。
>
> **RAG role**: System prompt for **Figma assembly only**. Keep all
> `figma-agent/components/*.md` consistent with this file. Web / Vue
> implementation specs live under [`../components/`](../components/) and
> [`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md).

---

## 0. Source order / 真源顺序

| 角色 | 真源 | 用途 |
|------|------|------|
| **视觉数值 / variant / Figma variables** | **Figma** 官方库（fileKey `KJfy0GFDs8kLsXTzhTxAjd`） | Figma 装配的 variant、Auto Layout、variable binding。 |
| **AI / 代码消费契约** | [`../design.md`](../design.md) + 组件 / 页面 / 模式 MD 中的 fenced spec block | 任何「从规范生成代码」的 AI 应以这条链路为准；本 figma-agent 目录是 **画布侧** 的镜像语料。 |
| **Arco 行为 / a11y / PR 治理** | [`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md) | 与 figma-agent 不冲突时遵守；视觉冲突优先 Figma（治理 §1）。 |

> **变更顺序**：Figma 改动后 **同步** `figma-agent/**` 的镜像 MD，**并** 通过
> [`../reports/DEVIATION_REMEDIATION_WORKFLOW.md`](../reports/DEVIATION_REMEDIATION_WORKFLOW.md) 流程把新的 node-id / variable mapping
> 写回 [`../COMPONENT_FIGMA_INVENTORY.md`](../COMPONENT_FIGMA_INVENTORY.md) 与
> [`../../config/figma_truth_table.json`](../../config/figma_truth_table.json)，**这才完成主线落地**。`figma-agent/` 单独刷新不视为
> 规范变更。

---

## 1. Mandatory Figma library & variables / 必须绑定的库与变量

**Bind visuals only through variables published from the approved library file.** No one-off hex on production surfaces for roles already covered by tokens (see [`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md)).

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
| *(pending — paste from Figma Variables panel)* | See [`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md) §2 | Primitives / scales typically align with `tokens/src/core.json`. |
| *(pending — paste from Figma Variables panel)* | Semantic (`semantic-*` in CSS) | Cross-component semantics; align with `tokens/src/semantic.json`. |
| *(pending — paste from Figma Variables panel)* | Component (`component-*` in CSS) | Per-component anatomy; align with `tokens/src/component.json`. |

**Minimum gate before marking "audit complete" / 审计完成的最低标准**:

- [ ] Every row above is filled with **real collection names** from Figma (no "pending").
- [ ] Token mapping tables in `figma-agent/components/*.md` only reference variables that live under these collections.
- [ ] Any new collection is mirrored into [`../FIGMA_VARIABLES_TOKEN_BRIDGE.yaml`](../FIGMA_VARIABLES_TOKEN_BRIDGE.yaml) so AI consumers downstream of `design.md` resolve to the same semantic CSS variable.

### 1.3 Alignment governance / 对齐治理（摘要）

- Two token layers and Figma mapping rules: [`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md) §2 (*Token 两层与 Figma Variables*).
- Visual truth order: [`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md) §1.

---

## 2. Semantic token file (reference) / 语义 token 文件

Use **only** to name `semantic.*` roles in component token tables:

- [`../../tokens/src/semantic.json`](../../tokens/src/semantic.json)

---

## 3. Non‑negotiable compliance / 必须遵守

- **Visual / 视觉**: variables for color, type, spacing, radius.
- **Component usage / 组件用法**: published library instances; correct variants including **disabled** and **loading** where applicable.
- **Copy & interaction / 文案与交互**: empty and error patterns per [`../components/`](../components/).

---

## 4. "Code examples" in designer MD / 「代码示例」

**Figma-side only**: instance naming, variant properties, Auto Layout — not Arco API, not HTML. For code-side specs go back to [`../components/<slug>.md`](../components/) and the fenced `Spec block (atomic)` JSON.

---

## 5. Bilingual rule / 双语规则

Normative blocks are **ZH + EN**. **Intent** must match Figma description / documentation strings (translate only; same concept names).

---

## 6. Document map / 文档地图

| Doc | Path |
|-----|------|
| This master | [`MASTER.md`](MASTER.md) |
| Per-component (Figma-side mirror) | [`components/*.md`](components/) |
| Scenarios | [`scenarios/*.md`](scenarios/) |
| **Web / Vue authoring specs (主线)** | [`../components/`](../components/) |
| **AI 消费入口** | [`../design.md`](../design.md) |
| **治理审计** | [`../reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../reports/DESIGN_MD_GOVERNANCE_AUDIT.md) |

### Scenarios / 场景（starter）

| Scenario | MD |
|----------|-----|
| Form page | [scenarios/page-form.md](scenarios/page-form.md) |
| List page (CRUD) | [scenarios/page-list.md](scenarios/page-list.md) |

---

## 7. Intent index / 意图索引

> 仅列 figma-agent 已经准备好的镜像组件；主线 slug → spec 索引在
> [`../components/README.md`](../components/README.md)。

| Figma component (working name) | Figma-side MD |
|--------------------------------|---------------|
| Button | [components/button.md](components/button.md) |
| Input | [components/input.md](components/input.md) |
| Table | [components/table.md](components/table.md) |

---

## 8. Scenario index / 场景索引

| Page pattern | Layout reference (主线) | Figma agent scenario |
|--------------|-------------------------|-----------------------|
| Form | [`../layouts/page-form.md`](../layouts/page-form.md) | [scenarios/page-form.md](scenarios/page-form.md) |
| List (CRUD) | [`../layouts/page-list.md`](../layouts/page-list.md) | [scenarios/page-list.md](scenarios/page-list.md) |
