# Component / 组件：{{COMPONENT_NAME_EN}}（{{COMPONENT_NAME_ZH}}）

> **Figma component key**: `{{FIGMA_COMPONENT_KEY}}`  
> **RAG chunk id**: `ds-figma-agent/{{COMPONENT_SLUG}}`

---

## 1. Intent / 意图（必须与 Figma 描述一致）

**中文（与 Figma 组件描述/文档字符串一致）**  
{{INTENT_ZH_SAME_AS_FIGMA}}

**English (same intent as Figma; aligned naming)**  
{{INTENT_EN_SAME_AS_FIGMA}}

---

## 2. Variant table / 变体表

> Property names and values MUST match Figma **exactly** (including spelling and casing).

| Variant property (Figma) | Allowed values | Notes ZH | Notes EN |
|--------------------------|----------------|----------|----------|
| `{{PROP}}` | `{{VALUES}}` | | |
| `State` (example) | `default`, `hover`, `disabled`, `loading`, `error` | | |

_Add rows for every variant dimension published in the library._

---

## 3. Do / Don’t / 推荐与禁止

### Do / 推荐

- ZH: {{DO_ZH}}
- EN: {{DO_EN}}

### Don’t / 禁止

- ZH: {{DONT_ZH}}
- EN: {{DONT_EN}}

---

## 4. Token mapping / Token 映射（Figma Variables ↔ semantic）

**Rule / 规则**: On all production surfaces, bind using **only** collections listed in the master spec: `{{FIGMA_VARIABLE_COLLECTION_NAMES}}`.

| Figma variable (full path or name) | Semantic token role | Usage ZH | Usage EN |
|-----------------------------------|---------------------|----------|----------|
| `{{FIGMA_VAR}}` | `semantic.{{role}}` | | |
| `{{FIGMA_VAR}}` | `semantic.{{role}}` | | |

_No row = no binding; do not invent Figma variables in MD._

---

## 5. Figma “code examples” / Figma 侧约定（实例、变体、布局）

### Instance naming / 实例命名

```
{{INSTANCE_NAMING_PATTERN}}
```

Example / 示例：

| Layer role ZH | Layer role EN | Instance name |
|---------------|---------------|----------------|
| 主按钮 | Primary button | `{{EXAMPLE_NAME}}` |

### Variant usage / 变体使用

```text
{{VARIANT_USAGE_SNIPPET}}
```

### Auto Layout / 自动布局

- **Direction / 方向**: {{AL_DIRECTION}}
- **Padding / 内边距**: {{AL_PADDING_RULE}}（bound to variables: `{{VARS}}`）
- **Gap / 间距**: {{AL_GAP_RULE}}
- **Resizing / 拉伸**: {{AL_RESIZE_RULES}}
- **Nested rules / 嵌套**: {{AL_NESTING_RULES}}

---

## 6. Copy & interaction — empty / error / 文案与交互（空态、错误态）

### Empty / 空态

- ZH: {{EMPTY_ZH}}
- EN: {{EMPTY_EN}}

### Error / 错误态

- ZH: {{ERROR_ZH}}
- EN: {{ERROR_EN}}

---

## 7. Parent scenarios / 所属场景（可选，后期）

- `{{LINK_TO_SCENARIO_MD}}`
