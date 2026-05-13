# Component / 组件：Input（输入框）

> **Figma component key**: *(audit — paste from library)*  
> **RAG chunk id**: `ds-figma-agent/input`  
> **Dev reference (Vue/HTML 勿作主 RAG)**: `.design-spec/docs/components/input.md`

---

## 1. Intent / 意图（必须与 Figma 描述一致）

**中文**  
用于短文本输入与展示（姓名、标题、搜索等）。须支持默认、悬停、聚焦、禁用、只读、报错等状态；占位符不可替代标签。

**English**  
Short text entry and display (names, titles, search). Supports default, hover, focus, disabled, readonly, error; placeholder is not a substitute for labels.

> **Sequence A**: Align ZH/EN with **Figma component documentation** verbatim.

---

## 2. Variant table / 变体表

> **Audit** Figma variant property names. Below follows `.design-spec/docs/components/input.md` axes.

| Variant property (Figma) — placeholder | Allowed values | Notes |
|----------------------------------------|----------------|-------|
| `Style` | Standard, Range, Search, Textarea, Password, IP, … | Pick variants actually published in library. |
| `Size` | S, L, XL, M *(names **must match Figma**)* | Maps to `data-size` / layout tokens `s` \| `l` \| `xl`. |
| `Affixes` | none, prefix, suffix, group, … | Composite controls keep shared height/radius. |
| `Filled` | empty, filled | Value vs placeholder styling. |
| `State` | default, hover, focus, typing, completed, error, disabled | Error pairs with message below field in layouts. |

---

## 3. Do / Don’t / 推荐与禁止

### Do / 推荐

- ZH: 错误态同时有边框/环与文案；聚焦环可见（键盘 `focus-visible`）。
- EN: Error state shows border/ring + message; visible focus ring for keyboard users.

### Don’t / 禁止

- ZH: 禁止硬编码 hex 表示错误边框。
- EN: No ad-hoc hex for error borders—bind variables only.

---

## 4. Token mapping / Token 映射

| Figma variable *(audit)* | Repo role | CSS reference *(examples)* |
|----------------------------|-----------|------------------------------|
| *(surface/input/bg-default)* | `tokens.input.bgDefault` → component | `--component-input-bg-default` |
| *(border/input/default)* | `tokens.input.borderDefault` | `--component-input-border-default` |
| *(text/placeholder)* | `semantic.text.placeholder` | `--semantic-text-placeholder` |
| *(text/primary value)* | component `input.textValue` | `--component-input-text-value` |
| *(focus ring)* | `tokens.input.ringFocus` | `--component-input-ring-focus` |

---

## 5. Figma “code examples” / Figma 侧约定

### Instance naming

```
Input / {style}-{size}-{state}
```

### Auto Layout

- **Vertical stack**: label (optional) → field row → helper / error line.
- **Horizontal**: prefix slot + field + suffix slot inside **Auto Layout** row; gap from spacing variables.

---

## 6. Copy & interaction — empty / error / 文案与交互

### Empty / 空态

- ZH: 「空」= 无输入值；占位符仅作提示。
- EN: Empty means no value; placeholder is hint only.

### Error / 错误态

- ZH: 文案简短、可行动；与 `error` 视觉状态一致。
- EN: Short, actionable copy; matches error visual state.
