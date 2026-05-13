# D-Spark 项目 Skills（`.cursor/skills/`）

| Skill | 用途摘要 |
|-------|-----------|
| `design-spec-component-docs` | 写/改 `.design-spec/docs/components/*.md`，对齐 Figma 表与 token |
| `design-spec-demos-runtime` | `demos/`、`studio_runtime`、HTML demo 生成器 |
| `design-spec-tokens-ci` | `tokens/src`、`tokens.css`、`scan_token_violations` |
| `design-spec-figma-workflows` | 在本仓库相关 Figma 文件里插组件、`use_figma` 流程 |
| `design-spec-e2e` | `.design-spec/e2e` Playwright 与 GitHub workflow |
| `design-spec-hybrid-spec` | Markdown+JSON 混合规格、Schema、`page`/pattern、图标 manifest、可移植 GitHub |

**自动匹配**：各 `SKILL.md` 的 `description` 含触发词，且 `disable-model-invocation: false`，便于 Agent 按自然语言加载。  
**显式路由**：`.cursor/rules/design-spec-skill-routing.mdc`（`alwaysApply: true`）在命中场景时要求先 **Read** 对应 `SKILL.md`。

执行 `use_figma` 前仍请遵循 Cursor 自带的 **figma-use**（若已安装）。
