# 静态 HTML（Path B）与 demos-react（Arco npm）验收分工

> **Layer / 层级**: **L2 — 验收分工口径**。  
> 不是组件规范真源；与 Arco 行为 / Figma 视觉冲突时回到 [`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md) 与 [`../components/`](../components/)。

| 维度 | 主验收面 | 说明 |
|------|----------|------|
| **视觉**（色、间距、圆角、字重、阴影） | **Figma Light** + **token**（`tokens/dist/tokens.css`） | 与 [`.design-spec/demos/components/<slug>.html`](../../demos/components/) 并排或 Path A 截图。 |
| **交互 / 状态机 / 与官网一致** | **`demos-react` + Arco 官网**（`@arco-design/web-react`） | 与 npm 包、文档同一运行时；见 [`ComponentStateMatrix.tsx`](../../demos-react/src/ComponentStateMatrix.tsx)。 |
| **静态 HTML `#liveRoot`** | **MD 声明子集** + `studio_runtime.js` | 实现键盘可达、`focus-visible`、disabled/loading 等与 MD「Arco API 对齐」表一致的部分；**不要求**与 Arco 内部类名或全部边缘行为一致。 |

未在 HTML 中实现的行为，须在组件 MD 标明 **HTML 覆盖边界** 并指向 **demos-react**（见 [ARCO_PR_PRE_CHECKLIST.md](./ARCO_PR_PRE_CHECKLIST.md)）。
