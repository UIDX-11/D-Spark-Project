# Component / 组件：Button（按钮）

> **Figma component key**: *(audit — paste exact component key from library)*  
> **RAG chunk id**: `ds-figma-agent/button`  
> **Dev reference (Vue/HTML 勿作主 RAG / not primary RAG for Figma-only tasks)**: `.design-spec/docs/components/button.md`

---

## 1. Intent / 意图（必须与 Figma 描述一致）

**中文**  
用于触发操作（提交、保存、取消、导航下一步等）。同一区域内主操作应有清晰层级；破坏性操作须使用警示样式并有确认。

**English**  
Commits actions (submit, save, cancel, next step). Maintain clear hierarchy—typically one primary per region; destructive actions use danger styling and confirmation when irreversible.

> **Sequence A**: Replace the above with **verbatim** text from the Figma component **description / documentation** (ZH + EN), keeping naming aligned.

---

## 2. Variant table / 变体表

> **Audit**: Replace property names and values with **exact** strings from the published Figma component (case-sensitive). Below mirrors **design axes** from `.design-spec/docs/components/button.md` until audited.

| Variant property (Figma) — placeholder | Allowed values (示例，须与 Figma 一致) | Notes |
|------------------------------------------|------------------------------------------|-------|
| `Style` *(或稿侧命名)* | Primary, Secondary, Tertiary, Outline, Link | Maps to token families `primary` / `neutral` / `outline` / `link` / `danger`. |
| `Kind` | Standard, Danger | Danger = destructive / irreversible. |
| `Size` | XL, L, M, S *(或 md/sm/lg —**以 Figma 为准**)* | Align with `--component-button-layout-live-*` sizes in token sheet. |
| `Leading icon` | true / false | Icon slot optional. |
| `Type` | Default, Icon-only | Icon-only hit target still meets minimum size. |
| `State` *(实例状态)* | default, hover, active, focus-visible, disabled, loading | Loading keeps stable width where specified. |

---

## 3. Do / Don’t / 推荐与禁止

### Do / 推荐

- ZH: 区域内尽量只有 **一个主按钮**；按钮组水平间距使用变量（仓库语义：`semantic.layout.buttonGroupGap` → `--semantic-layout-button-group-gap`）。
- EN: Prefer **one primary** per region; horizontal spacing in groups uses tokens (`semantic.layout.buttonGroupGap`).

### Don’t / 禁止

- ZH: 不要用透明度伪装禁用态；不要用非库内组件冒充按钮。
- EN: Do not fake disabled with opacity alone; no non-library substitutes.

---

## 4. Token mapping / Token 映射（Figma Variables ↔ semantic / component）

**Rule**: Left column = **Figma variable path/name** (fill after Inspect). Right column = repo role (`semantic.*` JSON path under `.design-spec/tokens/src/semantic.json` or `component.*` under `component.json`). See `docs/ALIGNMENT_GOVERNANCE.md` §2.

| Figma variable *(audit)* | Repo role | CSS reference *(generated)* |
|---------------------------|-----------|-------------------------------|
| *(e.g. color/primary/bg-default)* | `semantic.action.primary.bg` | `--semantic-action-primary-bg` |
| *(e.g. color/text/on-primary)* | `semantic.action.primary.text` | `--semantic-action-primary-text` |
| *(e.g. spacing/button-group-gap)* | `semantic.layout.buttonGroupGap` | `--semantic-layout-button-group-gap` |
| *(component fills)* | `tokens.button.primary.bgDefault` → component | `--component-button-primary-bg-default` |

_Add one row per binding used on reference instances; remove rows that do not exist in Figma._

---

## 5. Figma “code examples” / Figma 侧约定

### Instance naming / 实例命名

```
Button / {style}-{kind}-{size}
Example: Button / Primary-Standard-L
```

### Auto Layout / 自动布局

- **Direction**: horizontal for label + optional icons.
- **Padding**: map horizontal/vertical padding to spacing variables from library (match **Sizes** in dev doc).
- **Min width**: respect library min-width for text buttons; icon-only uses square frame per size.

---

## 6. Copy & interaction — empty / error / 文案与交互

### Empty / 空态

- ZH: 控件本身无「空」态；置于空工具栏时遵循场景模板。
- EN: No empty state on control; follow scenario MD when inside empty toolbar.

### Error / 错误态

- ZH: 表单级错误在字段/页面反馈；按钮不承担长错误文案。
- EN: Field/page handles validation errors; button stays concise.
