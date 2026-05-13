# Self-check checklist (for agents)

> **Scope**: 适用于 D-Spark 设计系统人 / agent 提交前自检；与
> [`.design-spec/docs/reports/ARCO_PR_PRE_CHECKLIST.md`](../.design-spec/docs/reports/ARCO_PR_PRE_CHECKLIST.md) 配合使用（后者是 PR 闸门细则）。

## Tokens

- [ ] No hex colors were introduced in component specs
- [ ] Component specs reference only `var(--component-...)`
- [ ] `tokens/src/core.json → semantic.json → component.json` layering is preserved
- [ ] `tokens/dist/tokens.css` was regenerated after token changes
- [ ] `python3 .design-spec/checks/scan_token_violations.py` 通过（或在 PR 中说明白名单）

## Components / pages

- [ ] Anatomy includes required parts and optional parts explicitly
- [ ] Variants / sizes / states are tabled and unambiguous
- [ ] Disabled state is defined (no hover/press affordance)
- [ ] Accessibility essentials cover role/name/keyboard
- [ ] 复杂页面对照 [`.design-spec/docs/pages/`](../.design-spec/docs/pages/) 与 [`pages/patterns/`](../.design-spec/docs/pages/patterns/) 的 `page` / `pattern` fenced block

## Figma agent (`design-spec-figma-agent`, L3 旁路)

> figma-agent 仅服务 Figma 装配；不替代 `design.md` 主线。详见
> [`.design-spec/docs/figma-agent/README.md`](../.design-spec/docs/figma-agent/README.md)
> 与 [`.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](../.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)。

- [ ] Sequence C in `.design-spec/skills/design-spec-figma-agent/reference-checks.md` was run after Figma → MD sync or RAG → Figma build
- [ ] Production surfaces use only approved Figma variable collections (see [`.design-spec/docs/figma-agent/MASTER.md`](../.design-spec/docs/figma-agent/MASTER.md))
- [ ] Instances come from the published team library named in master; variant property names match the library
- [ ] Figma 改动已回写 [`.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md`](../.design-spec/docs/COMPONENT_FIGMA_INVENTORY.md) 与 [`.design-spec/config/figma_truth_table.json`](../.design-spec/config/figma_truth_table.json)（双 SoT 同步）

## Repo hygiene

- [ ] No unrelated files were modified
- [ ] Working tree is clean after push
- [ ] 修改入口（`design.md` / `index.md` / `DOCUMENTATION_MAP.md`）时确认未把 `_archive/` 或 `reports/`（生成快照）误升为真源
