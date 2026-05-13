# 对外镜像（任意 AI 工具）

D-Spark 的可移植规范包 = **整个 `.design-spec/` 目录**，外加一份入口说明。下列步骤覆盖镜像、版本与许可。

## 必备文件清单（最小可用集）

| 路径 | 作用 |
| --- | --- |
| `.design-spec/PORTABLE_SPEC_README.md` | 对外 AI 入口的「读这个先」（必带） |
| `.design-spec/docs/design.md` | 全局规则、读取顺序、组件 / pattern / page 索引（必带） |
| `.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md` | 组件 ↔ Figma node 真源（必带） |
| `.design-spec/docs/FIGMA_VARIABLES_TOKEN_BRIDGE.yaml` | Figma 变量 → CSS var 桥接（必带，AI 据此还原色彩/字体/尺寸） |
| `.design-spec/docs/components/*.md` | 每个组件的规格 + `Spec block (atomic)` JSON（必带） |
| `.design-spec/docs/pages/` 与 `docs/pages/patterns/` | 页面与组合 pattern（必带） |
| `.design-spec/docs/foundations/*.md` | 间距、栅格、投影、图标、layout protocol（必带） |
| `.design-spec/tokens/src/*.json` + `tokens/dist/tokens.css` | token 源 + 解析后的 CSS 变量；运行时只消费 `dist`（必带） |
| `.design-spec/schemas/spec-block.schema.json` + `examples/` | fenced JSON 块的校验真源（必带） |
| `.design-spec/checks/scan_token_violations.py` + `validate_spec_blocks.py` | 治理与校验脚本（推荐随包，CI 用） |
| `.design-spec/docs/reports/FIGMA_VAR_DEFS_PILOT.md` | 7 个 pilot 组件 MCP 抽取快照（推荐随包） |

## 镜像方式

1. **整目录复制（最简单）**：`cp -r .design-spec/ <target-repo>/.design-spec/`，无需改动任何路径。
2. **`git submodule`（推荐）**：把本仓库挂为 submodule，并 `sparse-checkout` `.design-spec/`；用 tag/commit 钉版本，避免 token 改名静默扩散。
3. **`SKILL.md` 镜像**：仅在外部 AI 工具支持「skill 加载」时需要：复制 `.cursor/skills/design-spec-hybrid-spec/SKILL.md` 到目标仓库 `skills/design-spec-hybrid-spec/SKILL.md`，并让其内的相对路径指向同步的 `.design-spec/`。

## 版本与约束

- **schema 版本**：与 `spec-block.schema.json` 中 **`schemaVersion: 0.1.0`** 对齐；任何破坏性变更都要递增版本并在此文件追加 “迁移摘要” 小节。
- **token 版本**：每个 `tokens/src/*.json` 顶层有 `version` 字段；新增是次版本，重命名/删除是破坏性变更。
- **node-id 真源**：以 `COMPONENT_FIGMA_INVENTORY.md` 为唯一来源；如设计稿改名/重组，先更新本表，再同步 `components/*.md`。
- **许可**：Figma 文件访问权限、Arco Design 与导出 SVG 的版权由使用方自行合规。

## 校验脚本（外部消费者也可直接跑）

```bash
python3 .design-spec/tokens/generate_tokens_css.py
python3 .design-spec/checks/scan_token_violations.py
python3 .design-spec/checks/validate_spec_blocks.py
```

三条命令分别覆盖：token 重生成、引用分层治理（core/semantic/component）、组件 `Spec block (atomic)` 的 schema 校验。任何外接 AI 工具，提交前都应跑过。
