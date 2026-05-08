# Component / 组件：Button（按钮）

> **Figma component key**: `Button` (replace with exact key from Figma)  
> **RAG chunk id**: `ds-figma-agent/button`

---

## 1. Intent / 意图（必须与 Figma 描述一致）

**中文（与 Figma 组件描述/文档字符串一致；以下为占位，执行 Sequence A 后替换）**  
用于在界面中发起主要或次要操作（提交、保存、取消等）。须与 Figma 中 Button 组件说明逐字对齐。

**English (placeholder — replace after Sequence A sync with Figma documentation)**  
Used to trigger primary or secondary actions (submit, save, cancel, etc.). Must match the Figma Button component description verbatim.

---

## 2. Variant table / 变体表

> **Replace** property names and values with the **exact** strings from the published Figma component.

| Variant property (Figma) | Allowed values | Notes ZH | Notes EN |
|--------------------------|----------------|----------|----------|
| `TBD` | `TBD` | 从 Figma 同步 | Sync from Figma |

---

## 3. Do / Don’t / 推荐与禁止

### Do / 推荐

- ZH: 同一视觉区域内主操作按钮数量克制；加载态保留可识别性。
- EN: Limit primary buttons per region; keep loading state recognizable.

### Don’t / 禁止

- ZH: 不要用透明度模拟禁用；不要用非库内组件冒充 Button。
- EN: Do not fake disabled state with opacity only; do not use non-library substitutes.

---

## 4. Token mapping / Token 映射（Figma Variables ↔ semantic）

**Rule / 规则**: Use only collections listed in [MASTER.md](../MASTER.md).

| Figma variable (full path or name) | Semantic token role | Usage ZH | Usage EN |
|-----------------------------------|---------------------|----------|----------|
| `TBD` | `semantic.action.primary.bg` | 主按钮背景 | Primary fill |
| `TBD` | `semantic.text.primary` | 主按钮文案 | Primary label |

---

## 5. Figma “code examples” / Figma 侧约定

### Instance naming / 实例命名

```
Button / {variant}-{state}
```

### Auto Layout / 自动布局

- **Direction / 方向**: Horizontal for label + optional icon.
- **Padding / 内边距**: Bind horizontal/vertical padding to spacing variables after audit.
- **Gap / 间距**: Icon–label gap from library convention.

---

## 6. Copy & interaction — empty / error / 文案与交互

### Empty / 空态

- ZH: 按钮本身无空态；若置于空工具栏，遵循场景模板。
- EN: No empty state on the control itself; follow scenario MD if inside an empty toolbar.

### Error / 错误态

- ZH: 错误由表单/页面反馈承载；按钮可用 `danger` 变体表达破坏性操作（以 Figma 为准）。
- EN: Errors live in form/page patterns; use destructive variant per Figma when applicable.
