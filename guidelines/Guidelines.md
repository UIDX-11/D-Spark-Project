# Design System

This project uses the following design system packages. Please read them before anything else.

**MUST READ IN FULL**

- [Component usage](./components.md) - import paths and catalog for every
  exported component
- [DSWebComLightV22026 Guidelines](../src/DSWebComLightV22026/guidelines/Guidelines.md) - D.S Web Com_Light_V2_2026 guidelines

## Before building UI

Before writing a custom button, input, card, or any other component, first
check the catalog in `components.md` and follow any discovery steps in
`setup.md`. Prefer kit components. Only hand-roll a custom replacement
when the kit component genuinely cannot meet the requirement, and leave a
code comment explaining why the kit was insufficient.

## Before applying styles

Before hardcoding a color, spacing, radius, font-size, or any other style
value, check the kit's stylesheet (imported per `setup.md`) for a CSS
custom property that fits — e.g. `--primary-button`, `--text-default`,
`--spacer-md`. Use the property via `var(--name)` (or the matching
Tailwind utility, if the kit defines one) rather than a raw hex / px /
rem value. Hardcoded values bypass the kit's theming and break dark mode,
re-skinning, and any future token changes.
