# Arco Design Web React · Figma · 对齐治理（执行规范）

本文档是 **组件长程对齐任务** 的单一事实来源（human + agent）。与 `generator/schema-ui-contract.md` 互补：后者偏 **schema/UI 契约**，本文偏 **真源优先级、token、样式策略、验收与 PR**。

---

## 1. 真源优先级（命中即停）

| 维度 | 真源 | 说明 |
|------|------|------|
| **视觉（像素、间距、圆角、字号、色、阴影）** | **Figma（Light）** | 与 Arco 冲突时 **以 Figma 为准**。 |
| **对外 API** | **Arco Design Web React**（[`@arco-design/web-react`](https://www.npmjs.com/package/@arco-design/web-react) + [官方文档](https://arco.design/react/docs/start)） | props、默认受控与非受控、校验触发时机等与 **React** 实现一致。 |
| **DOM 顺序与语义** | **默认 Arco Design Web React** | 若 Figma 明确要求可 Tab 等结构，允许与 Arco DOM **有文档化差异**（见组件 MD「与 Arco 差异」）。 |
| **CSS 数值** | **Token 文件**（`tokens/src/*.json` → `tokens/dist/tokens.css`） | **禁止**在组件或 demo 样式中写 **颜色字面量**；间距/圆角等 **一律走 token**；缺 token **先新增再引用**。已有 token 中的 **既有色值不得改**，可 **新增别名或新 key** 指向组合或新色。 |

### 1.1 a11y / 焦点 / Tab（裁决表）

| 场景 | 裁决 |
|------|------|
| Figma 明确画成 **明显可 Tab** 的控件 | **以 Figma 为准**（Tab 顺序、是否进入 Tab 环等）。 |
| Figma **未画** focus ring，Arco 有键盘焦点样式 | **行为与 Arco 一致**（保留可见焦点，不因「稿子里没画」而省略）。 |
| 其它 **a11y 语义**（`role`、`aria-*`、读屏文案）与 Figma 冲突 | **以 Figma 为准**（与上两行冲突时，以上表从上向下命中为准）。 |

### 1.2「React 真源」采纳粒度（固定）

- **必须对齐**：props、默认行为、键盘与受控/校验时机（以 **Arco Design Web React** 为准）。
- **默认对齐**：DOM **节点顺序**、可交互元素类型；仅在 Figma 强制要求时偏离，并在 MD 记录。
- **类名**：不要求与 Arco 内部类名字符串一致；设计稿 demo 使用 **`ds-*`** 时，须在 MD 的 References 中写明对照的 Arco 文档链接或 [源码树 `components/*`](https://github.com/arco-design/arco-design/tree/main/components)。

### 1.3 样式策略 **B**（已定，产品侧选项 **B**）

- **主手段**：通过 **修改 / 扩展 token 定义** 满足 Figma，**不在** `studio_runtime.css` 等处以「重写一整套组件 CSS」的方式堆叠颜色与尺寸。
- **允许的最小「机械」CSS 白名单**（仅当 token 无法表达布局机制时，且 **禁止出现颜色/字号/间距数字字面量**，只能引用 `var(--*)` 或继承）：  
  - `display`、`flex-direction`、`flex-wrap`、`align-items`、`justify-content`、`flex`、`flex-shrink`、`min-width: 0`（省略号列）、`overflow`、`position`（不含具体像素偏移）、`visibility`、`pointer-events`。  
  - 若需 **具体像素偏移**，必须先有 **spacing / layout 类 token**，禁止写 `top: 3px` 这类裸值。
- **Arco 版本升级**：视觉不随 Arco patch 漂移；对齐记录以 **固定 Figma 节点 + 固定 `@arco-design/web-react` 版本** 为准（写在各组件 MD 的 References）。

---

## 2. Token 两层与 Figma Variables

- **`semantic-*`**：跨组件语义（文本层级、边框强弱、焦点环、面性阴影等）。Figma Variables 若为全局语义，**优先**落此层，并在 MD 维护 **「Figma 变量名 → CSS 变量名」** 对照（可表格）。
- **`component-*`**：单组件解剖（如 `button.padding-x`）。仅在该组件复用无望时放置。
- **新建前**：先查是否已有 semantic 可表达；禁止重复造近义项。

---

## 3. MD · HTML · Token 流水线

- **MD**：规范、References（Figma node + **Arco Design Web React**）、token 表、与 Arco/Figma 差异、推断态说明。
- **HTML**：**仅由生成器自 MD 生成**（`generator/generate_component_html_demos.py`）；是 MD 的 **外显**，用于校对 MD；**禁止**把手改 HTML 当作真相源。
- **Token**：MD 与生成 HTML **只引用同一套 CSS 变量**；HTML 中出现颜色字面量视为 **生成器或模板缺陷**。

当前主题范围：**仅 Light**。

**Figma 未覆盖的状态**：按 **Arco Design Web React 行为 + 设计系统推断** 实现，并在 MD 增加 **「推断」** 小节，注明依据（[`arco-design` 源码](https://github.com/arco-design/arco-design) 路径或文档条款 + 所用 token）。

---

## 4. PR 与验收

- **每个组件单独 commit / PR**（你已约定）。
- **截图 diff（PR gate）**：见 `.design-spec/e2e/README.md`（固定视口、Light、`deviceScaleFactor: 1`）。基线 PNG 须在与 **GitHub Actions 相同 OS（`ubuntu-latest`）** 下生成，避免本机字体/渲染差：`npm run test:update`，并提交 `tests/**/*-snapshots/**`。
- **启用视觉 gate 的开关**：仓库内 **尚未提交** Playwright 截图基线时，CI 仅跑 **烟雾测试**（`npm test` = `tests/smoke.spec.ts`）。基线合并后，将 workflow 中测试命令改为 `npm run test:all`（或追加 `npm run test:visual`）。GitHub Actions 示例见 **`e2e/github-workflow-design-spec-e2e.yml.example`**（复制到 `.github/workflows/`，推送需 **workflow** 权限的 token）。
- **最小自动化测试**：同目录 Playwright 中包含 **烟雾 + 最小键盘/可见性**；随组件对齐逐步加厚。

---

## 5. 组件对齐顺序（建议）

Button → Tag → Checkbox → … → Form / Table 等复杂件（详见 `docs/components/README.md` 与 intent-index）。

---

## 6. 修订

变更本规范请走单独 PR，并在 `index.md` 中保持「必读文件」链接最新。
