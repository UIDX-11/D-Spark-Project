# PR 前清单：Arco npm / 官网 ↔ demos-react ↔ MD ↔ HTML

> **Layer / 层级**: **L2 — PR 闸门**。  
> 治理边界与真源裁决见 [`../ALIGNMENT_GOVERNANCE.md`](../ALIGNMENT_GOVERNANCE.md)；本清单只承载「PR 提交前自检」步骤。

在修改 **某组件 slug** 的 MD、生成器或 `studio_runtime` 前，请在 PR 描述或自检表中勾选。

## 1. Arco Design Web React（行为真源）

| 项 | 说明 |
|----|------|
| 文档 URL | 与 [`.design-spec/docs/components/<slug>.md`](../components/) **References** 中 `arco.design/react/components/...` 一致；slug→路径映射见 [`demos-react/src/arcoDocRoutes.ts`](../../demos-react/src/arcoDocRoutes.ts)。 |
| 对照摘录 | 记录与本组件相关的：**受控/非受控**、**键盘**、**disabled / loading / error**、**打开关闭**（若有）等段落标题或锚点。 |
| npm 版本 | 与 [`demos-react/package.json`](../../demos-react/package.json) 中 `@arco-design/web-react` **同主版本**；升级须单独 PR（见 [ALIGNMENT_GOVERNANCE](../ALIGNMENT_GOVERNANCE.md) §1.3）。 |

## 2. demos-react 矩阵（可并排验证）

| 项 | 说明 |
|----|------|
| 本地运行 | `cd .design-spec/demos-react && npm run dev`，在真源表卡片中找到对应 slug。 |
| 状态矩阵 | [`ComponentStateMatrix.tsx`](../../demos-react/src/ComponentStateMatrix.tsx) 中该 slug 的示例能覆盖官网 **同一组 props 状态**（至少 default / disabled / loading 等 API 支持的子集）。 |
| 缺口 | 若官网有而矩阵未展示，在本节注明「后续迭代」或当场补矩阵。 |

## 3. MD（规范与生成器输入）

| 项 | 说明 |
|----|------|
| Figma node | References 含 [`figma_truth_table.json`](../../config/figma_truth_table.json) 中该 slug 的 **canonical** `node-id`（与 `triad_reconcile.py` 一致）。 |
| 推断态 | Figma 未画的状态：按 [ALIGNMENT_GOVERNANCE](../ALIGNMENT_GOVERNANCE.md) §3 写 **推断态** 与依据（文档条款或 arco-design 源码路径）。 |
| 与 Arco 差异 | 若有 DOM/行为偏离 Arco，单列 **与 Arco 差异**。 |
| HTML 覆盖边界 | 若静态 HTML `#liveRoot` **故意不实现**部分 Arco 行为，写明并指向 **demos-react** 为对照面。 |

## 4. 生成物与对账

| 项 | 说明 |
|----|------|
| 重跑生成器 | `python3 .design-spec/generator/generate_component_html_demos.py`（HTML 仅由生成器产出）。 |
| 三边对账 | `python3 .design-spec/scripts/triad_reconcile.py`，检查 [`MD_HTML_Figma_TRIAD.md`](./MD_HTML_Figma_TRIAD.md) 中该行无未处理阻塞。 |

## 5. 截图 / E2E（按需）

- Path B：`npm run test:visual`（`.design-spec/e2e`）已覆盖的 slug 更新基线需在与 CI 相同 OS 上执行。  
- 详见 [visual-qa/PLAYWRIGHT.md](../../../docs/visual-qa/PLAYWRIGHT.md)。
