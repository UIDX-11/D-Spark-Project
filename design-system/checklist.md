# Self-check checklist (for agents)

## Tokens

- [ ] No hex colors were introduced in component specs
- [ ] Component specs reference only `var(--component-...)`
- [ ] `tokens/src/core.json → semantic.json → component.json` layering is preserved
- [ ] `tokens/dist/tokens.css` was regenerated after token changes

## Components / pages

- [ ] Anatomy includes required parts and optional parts explicitly
- [ ] Variants / sizes / states are tabled and unambiguous
- [ ] Disabled state is defined (no hover/press affordance)
- [ ] Accessibility essentials cover role/name/keyboard

## Figma agent (`design-spec-figma-agent`)

- [ ] Sequence C in `.design-spec/skills/design-spec-figma-agent/reference-checks.md` was run after Figma → MD sync or RAG → Figma build
- [ ] Production surfaces use only approved Figma variable collections (see `docs/figma-agent/MASTER.md`)
- [ ] Instances come from the published team library named in master; variant property names match the library

## Repo hygiene

- [ ] No unrelated files were modified
- [ ] Working tree is clean after push
