# Component: Space

## Level

Molecular (spacing/composition helper)

## Aliases

- gap
- stack
- inline spacing

## Best practices

- **Use for**: consistent spacing between elements in a row/column.
- **Token-only**: spacing values must map to the spacing token scale.
- **Density**: choose spacing based on information density; avoid arbitrary “fine tuning”.

## Layout patterns

- **Form rows**: label + control spacing and vertical rhythm.
- **Button groups**: consistent gap; avoid borders as separators when spacing is sufficient.
- **Toolbar**: group related actions; separate groups with larger token gap.

## Anti-patterns

- Hardcoding margins on children instead of using a spacing component/system.
- Using tiny non-token gaps to “make it look right”.

## Accessibility essentials

- **Touch targets**: ensure spacing does not reduce tap/target areas.
- **Grouping**: spacing can reinforce grouping; ensure groups are perceivable (labels, headings).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `space/inline/none/md/default`
  - `space/stack/comfortable/md/default`

