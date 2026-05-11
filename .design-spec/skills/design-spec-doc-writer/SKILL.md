# Skill: design-spec-doc-writer

用于在 `d-spark-project` 中高一致性地产出组件文档（Markdown）。

## Goal

让 AI 生成文档时：

- 行为真源统一为 **Arco Design Web React**
- 视觉真源统一为 **Figma Light**
- token 绑定与项目治理规范保持一致

## Scope

- 目标目录：`.design-spec/docs/components/*.md`
- 参考治理：`.design-spec/docs/ALIGNMENT_GOVERNANCE.md`
- 命名规范：`type/kind/shape/size/state`

## Required output skeleton

每个组件文档必须包含以下 H2：

- `## Aliases`
- `## References`
- `## Best practices`
- `## Layout patterns`
- `## Anti-patterns`
- `## Accessibility essentials`

并建议包含：

- `## Figma`
- `## Arco API 对齐（摘要）`
- `## Component token bindings (required)`
- `## Variant naming (type/kind/shape/size/state)`

## Source-truth rules

- 行为相关表述必须使用 **Arco Design Web React** 术语与链接（`https://arco.design/react/components/...`）
- 禁止写入 **Arco Vue** 真源表述（如 `arco.design/vue/component/...`、`arco-design-vue/`）
- Figma 与 Arco 冲突时，视觉以 Figma 为准；行为/API 以 Arco Design Web React 为准

## Writing constraints

- 未确认的行为必须放在 `## 推断` 段并注明依据
- token 必须写 CSS 变量名，不写硬编码颜色值
- References 中至少包含：
  - Arco Design Web React 组件文档链接
  - Figma 设计来源
  - 本项目治理规范链接

## Validation hook

提交前应通过：

- `python3 .design-spec/checks/ensure_react_truth_source.py`
- `python3 .design-spec/checks/doc_accuracy_guard.py`
