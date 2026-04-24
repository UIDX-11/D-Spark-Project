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

## Repo hygiene

- [ ] No unrelated files were modified
- [ ] Working tree is clean after push
