# 组件使用规范（Components）

> **L2 — 实现侧人读契约 / 不复述规范正文。**  
> 本文件只承担「在本仓库实现页面时如何用组件」的检查清单与命名约束。组件参数、变体、token 数值的**唯一真源**是 [`.design-spec/docs/components/*.md`](../.design-spec/docs/components/) 与 [`.design-spec/tokens/dist/tokens.css`](../.design-spec/tokens/dist/tokens.css)，本文件不做镜像。

本文件为 **项目根目录 `docs/` 下的人读契约**：实现页面与布局时，须与 **设计规范组件知识库** 及 **Arco / Figma 治理** 一致。机器可读规格以 `.design-spec/docs/components/*.md` 为准。

## 1. 规范真源

| 层级 | 路径 | 用途 |
|------|------|------|
| 组件知识库（必备章节、命名规则） | [`.design-spec/docs/components/README.md`](../.design-spec/docs/components/README.md) | 每个组件 MD 须含 Best practices、Layout patterns、Aliases、Anti-patterns、Accessibility essentials |
| 单组件规格（token、Arco 对齐、Figma） | `.design-spec/docs/components/<slug>.md` | 实现与验收的逐组件依据 |
| 治理 | [`.design-spec/docs/ALIGNMENT_GOVERNANCE.md`](../.design-spec/docs/ALIGNMENT_GOVERNANCE.md) | 视觉以 Figma Light + token；行为叙述以 Arco Design Web React 为基线 |

## 2. 变体命名（强制）

所有变体 / 状态命名遵循：

`type/kind/shape/size/state`

示例：`input/text/underline/lg/default`、`button/primary/rounded/md/default`。

## 3. 代码侧使用约定

- **入口**：业务页面只使用 [`src/components/ui`](../src/components/ui/index.ts) 导出组件，不绕过封装自造「同款」控件。
- **表单**：数据收集与校验须用 **Form + FormField + FormItem + FormMessage**（见 [Form 规范](../.design-spec/docs/components/form.md)）：垂直版式、**标签常驻**、占位符不可替代标签、提交时展示可操作的错误文案。
- **输入**：须满足 [Input 规范](../.design-spec/docs/components/input.md)（尺寸与 token、`:focus-visible`、错误态等）；密码字段使用 **`type="password"`**，并保持标签与控件 `htmlFor` / `id` 关联。
- **按钮**：须满足 [Button 规范](../.design-spec/docs/components/button.md)；**同一区域仅一个主按钮**（Primary / `variant="main"`）；提交动作用 **动词** 文案（如「登录」），主按钮使用 `type="submit"` 与 `form` 属性关联表单 `id`。
- **样式**：页面布局与字色、间距、圆角、边框须使用 **主题与 DS token**（与 Playground 一致的长变量名或 `--ds-*`），禁止为对齐 Figma 在页面内写裸十六进制替代 token（治理策略 B 见 ALIGNMENT_GOVERNANCE §1.3）。

## 4. 页面级检查清单（登录等表单页）

- [ ] References 级需求已对照 **Input / Button / Form** 三份 MD。  
- [ ] 每个字段有 **FormItem label** + **FormMessage**。  
- [ ] 主按钮唯一，且 `type="submit"` 绑定表单。  
- [ ] 无障碍：错误与字段关联；提交失败时可将焦点移至首个无效字段（与 Form 规范一致）。

## 5. 页面与模式组装

> 复杂页面 / 多组件组合不要只看 `src/components/ui`，必须回到混合规格的 **page / pattern** 层，避免在业务页面手工堆叠形成 ad-hoc 布局。

- **Page 规范**（含 `templateId` / `regions` / `demoPath` / Figma 锚点的 fenced `page` block）：[`.design-spec/docs/pages/`](../.design-spec/docs/pages/)（canonical Dashboard：[`page-dashboard.md`](../.design-spec/docs/pages/page-dashboard.md)；IA：[`information-architecture.md`](../.design-spec/docs/pages/information-architecture.md)）。
- **Pattern 规范**（模式：组件组合 + 行为）：[`.design-spec/docs/pages/patterns/`](../.design-spec/docs/pages/patterns/)（如 [`search-form.md`](../.design-spec/docs/pages/patterns/search-form.md)、[`pro-table.md`](../.design-spec/docs/pages/patterns/pro-table.md)）。
- **Layout 模板**（页面骨架）：[`.design-spec/docs/layouts/README.md`](../.design-spec/docs/layouts/README.md)。
- **AI 入口与读序**：[`.design-spec/docs/design.md`](../.design-spec/docs/design.md)。

## 6. 原型 prompt 入口

> 在 Cursor / 外部 AI 对话里要求“构建原型演示”时，**技术栈（React + Arco）与本文件的铁律不必再粘贴到 prompt**，统一由下方两处真源承担：

| 场景 | 真源 |
|------|------|
| Cursor IDE 内自动生效（命中“高级前端研发专家 / 构建原型演示 / prototype”等语义即加载） | [`.cursor/rules/prototype-react-arco.mdc`](../.cursor/rules/prototype-react-arco.mdc) |
| 外部 AI 工具调用 / 跨工具复用 | [`.design-spec/PORTABLE_SPEC_README.md`](../.design-spec/PORTABLE_SPEC_README.md) §External-tool prompt template → *Prototype mode* |

业务提示词只需描述**页面/模块目标、结构、字段、验收**，禁止在 prompt 中重复声明 npm / GitHub 链接或重述本文件铁律。

## 7. 文档互链

- 文档地图：[DOCUMENTATION_MAP.md](./DOCUMENTATION_MAP.md)
- 包导出 ↔ Figma：[visual-qa/COMPONENT-FIGMA-LINKS.md](./visual-qa/COMPONENT-FIGMA-LINKS.md)
- 治理审计与文档分层：[`.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)
