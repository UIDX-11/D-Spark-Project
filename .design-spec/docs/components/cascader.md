# Component: Cascader

## Level

Molecular

## Aliases

- hierarchical selector
- multi-level dropdown

## Best practices

- **Use for**: selecting from hierarchical options where path matters.
- **Search**: provide search when options are large or deep.
- **Display**: show full path or a clear abbreviated representation.
- **Defaults**: avoid preselecting deep options unless user intent is clear.

## Layout patterns

- **Filter bar**: region/category cascader alongside other filters.
- **Form field**: cascader inside a `Form` row with validation rules.

## Anti-patterns

- Using cascader for flat lists (use `Select`).
- Very deep hierarchies without search (poor usability).

## Accessibility essentials

- **Keyboard**: must be operable without mouse; focus and selection visible.
- **Announcements**: selection changes should be perceivable; avoid silent focus jumps.
- **Name**: label the field clearly (Form label or accessible name).

## Variant naming (type/kind/shape/size/state)

- Examples:
  - `cascader/filter/rounded/md/default`
  - `cascader/form/rounded/md/error`

