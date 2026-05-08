# Skill: design-spec-doc-auditor

用于审校组件文档准确性，优先发现“行为真源漂移”和“章节缺失”问题。

## Audit targets

- `.design-spec/docs/components/*.md`
- `.design-spec/docs/ALIGNMENT_GOVERNANCE.md`
- `.design-spec/sources/behavior-source.json`

## Mandatory checks

1. 行为真源是否仍为 Arco Vue
2. 是否存在 React 真源引用（文案或链接）
3. 必备 H2 章节是否齐全
4. References 是否包含 Arco Vue 与 Figma 来源
5. Token 绑定是否使用 CSS 变量（不接受裸色值）

## Report format

审校输出按严重级别排序：

- `Critical`：行为真源冲突（Vue/React 混用）
- `Major`：必备章节缺失、References 缺失
- `Minor`：术语不一致、示例说明不清

每条问题需包含：

- 文件路径
- 问题类型
- 最小修复建议

## Auto checks to run

- `python3 .design-spec/checks/ensure_vue_truth_source.py`
- `python3 .design-spec/checks/doc_accuracy_guard.py`
