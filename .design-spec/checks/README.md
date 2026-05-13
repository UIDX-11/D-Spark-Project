# Design-spec checks

- **`scan_token_violations.py`** — token 分层治理（见 `design-spec-tokens-ci` Skill）。校验：
  - `core.json` 叶子必须是字面量；
  - `semantic.json` 的 `{...}` 引用必须存在于 `core.json`；
  - `component.json` 的 `{...}` 引用必须存在于 `semantic.json`（**不可越层引用 core**）；
  - 裸 hex/rgba、裸 shadow 字符串以 warning 列出（如 `table.pinned.*` 等组件解剖特例已在脚本白名单中标注）。
  - 使用：`python3 .design-spec/checks/scan_token_violations.py` 或 `--strict` 把 warning 提升为 error。
- **布局快照（可选）**：`package.json` + `export_computed_layout.mjs`（Playwright）。安装：`npm install` 与 `npx playwright install chromium`。

```bash
node export_computed_layout.mjs ../demos/pages/dashboard.html ./reports/generated-layout.json
node compare_layout_diff.mjs ./reports/generated-layout.json ./reports/figma-export.json ./reports/diff-report.md
```

报告目录默认 `.design-spec/checks/reports/`（可加入 `.gitignore` 若需）。

## 若 `npx playwright install chromium` 失败

- 若提示 **active lockfile**：等待其他安装结束，或按提示删除锁后重试：  
  `rm -rf ~/Library/Caches/ms-playwright/__dirlock`  
  然后再执行 `npx playwright install chromium`（或 `npx playwright install`）。
- 若下载报 **`timed out after 30000ms`**、**`ECONNRESET`**、**`socket hang up`**：多为访问 `cdn.playwright.dev` / `storage.googleapis.com` 不稳定。可换网络后重试；或加大单次请求超时（毫秒）后再装，例如：  
  `PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000 npx playwright install chromium`  
  仍失败时参见 [Playwright · Browsers](https://playwright.dev/docs/browsers)（镜像 / 离线安装等）。

阶段计划与验收对照：[`../docs/REQUIREMENTS_AND_PLAN.md`](../docs/REQUIREMENTS_AND_PLAN.md)。  
**偏差修复执行顺序与 PR 门禁**：[`../docs/reports/DEVIATION_REMEDIATION_WORKFLOW.md`](../docs/reports/DEVIATION_REMEDIATION_WORKFLOW.md)。

## 报告生成（三边对账与 MD 门禁）

```bash
# 仓库根目录
python3 .design-spec/scripts/sync_md_canonical_figma.py  # 幂等：MD References 补真源表首条 canonical Figma 链
python3 .design-spec/scripts/triad_reconcile.py          # → docs/reports/MD_HTML_Figma_TRIAD.md
python3 .design-spec/scripts/figma_slug_priority.py    # → docs/reports/FIGMA_SLUG_PRIORITY.md（figma_urls 非空 slug 排序）
python3 .design-spec/scripts/close_md_gaps_scan.py       # → docs/reports/CLOSE_MD_GAPS.md
python3 .design-spec/scripts/components_md_audit.py      # → docs/reports/COMPONENTS_MD_AUDIT.md
python3 .design-spec/scripts/studio_runtime_literal_audit.py              # 仅输出
python3 .design-spec/scripts/studio_runtime_literal_audit.py --fail-if-px-over 200  # 可选 CI 门禁（当前 px≈181）
```

改 MD / `studio_runtime` / 生成器后，还须：`python3 .design-spec/generator/generate_component_html_demos.py` 再跑 `triad_reconcile.py`（见 DEVIATION_REMEDIATION_WORKFLOW）。

## 维护者操作清单（曾在 `docs/design.md`，已搬至此处）

`.cursor/skills/` 下的 Skill 描述「如何维护本规范」（component docs、demos
runtime、tokens-ci、figma-workflows、hybrid spec、e2e）。它们不是 AI
**消费者** 读 `design.md` 时的必读路径，只有维护者需要展开。

- **改 token**（顺序固定）：
  1. 编辑 `tokens/src/*.json`；
  2. `python3 .design-spec/tokens/generate_tokens_css.py`；
  3. `python3 .design-spec/checks/scan_token_violations.py`（可选 `--strict`）；
  4. 重生成依赖 demo / Vue 组件 / Vue admin shell。
- **新增 / 修改组件 fenced block** 后：
  `python3 .design-spec/checks/validate_spec_blocks.py`。
- **触发三边对账证据包**：见上节「报告生成」。
- **变更需求路线** 时先改 [`../docs/REQUIREMENTS_AND_PLAN.md`](../docs/REQUIREMENTS_AND_PLAN.md)
  §1 / §2，再改对应实现路径与 Skill 描述，避免「表与代码两套真源」。
