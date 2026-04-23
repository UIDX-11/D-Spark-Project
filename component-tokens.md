# Component Tokens

Component tokens define **component-scoped roles** that map design intent to concrete visuals.

## Where they live

- **Design-spec source of truth (normalized)**: `.design-spec/tokens/src/component.json`
- **Imported source (Figma export)**: `~/Downloads/3.组件颜色 Component color /光储Global light.tokens.json`

## What belongs here

| Component | Examples | Notes |
|---|---|---|
| Button | `button.primary.bg`, `button.primary.text`, `button.primary.radius` | Should align with `button.md` variant axes. |
| Input | `input.bg`, `input.border.default`, `input.border.focus`, `input.text.placeholder` | Should align with `input.md` states + anatomy. |

## Component color groups (from Global light export)

The provided export groups component colors into three major categories:

| Group (export) | Meaning | Typical consumers |
|---|---|---|
| 文字&图标 Text&Icon | Text/icon colors for bound & unbound contexts | Buttons, inputs, links, status text |
| 填充 Fill | Background/surface fills for components and states | Button bg, tags, table, cards, empty states |
| 边框 Border | Borders/strokes for components and states | Inputs, tabs, checkbox/radio, button outlines |

## Component color list as CSS variables (Global light)

```css
:root {
  /* Component color tokens (Global light) */
  --component-and-text-and-icon-bound-button-no-primary-default: #222222;
  --component-and-text-and-icon-bound-button-primary-disabled: #CCCCCC;
  --component-and-text-and-icon-bound-link: #6985BF;
  --component-and-text-and-icon-bound-link-100: #506DAF;
  --component-and-text-and-icon-unbound-always-white: #FFFFFF;
  --component-and-text-and-icon-unbound-and-and-error: #F14846;
  --component-and-text-and-icon-unbound-and-and-info: #3F78E4;
  --component-and-text-and-icon-unbound-brand: #FF8100;
  --component-and-text-and-icon-unbound-disabled: #CCCCCC;
  --component-and-text-and-icon-unbound-link: #506DAF;
  --component-and-text-and-icon-unbound-offline: #666666;
  --component-and-text-and-icon-unbound-primary: #222222;
  --component-and-text-and-icon-unbound-primary-reverse: #FFFFFF;
  --component-and-text-and-icon-unbound-secondary: #666666;
  --component-and-text-and-icon-unbound-selected: #222222;
  --component-and-text-and-icon-unbound-success: #09AA5C;
  --component-and-text-and-icon-unbound-territory: #999999;
  --component-and-text-and-icon-unbound-warning: #FFAD14;
  --component-border: #FAFAFA;
  --component-border-100: #E8E8E8;
  --component-border-200: #BFBFBF;
  --component-border-button-dashed-default: #999999;
  --component-border-button-dashed-disabled: #E7E7E7;
  --component-border-button-secondary: #F14846;
  --component-border-button-secondary-default: #999999;
  --component-border-button-secondary-disabled: #E7E7E7;
  --component-border-button-virtual: #F9AFA5;
  --component-border-checkbox: #999999;
  --component-border-form: #F14846;
  --component-border-option-card: #E8E8E8;
  --component-border-radio: #999999;
  --component-border-tabs: #999999;
  --component-fill-100-card-background: #FFFFFF;
  --component-fill-200-card-background: #F7F7F7;
  --component-fill-always-white: #FFFFFF;
  --component-fill-badge: #F14846;
  --component-fill-brand: #FF8100;
  --component-fill-button-dashed-active: #CCCCCC;
  --component-fill-button-dashed-default: #F7F7F7;
  --component-fill-button-dashed-disabled: #FAFAFA;
  --component-fill-button-dashed-hover: #E6E6E6;
  --component-fill-button-facial: #FEEDED;
  --component-fill-button-main: #F14846;
  --component-fill-button-primary-active: #1B1B1B;
  --component-fill-button-primary-default: #222222;
  --component-fill-button-primary-disabled: #A7A7A7;
  --component-fill-button-primary-hover: #4E4E4E;
  --component-fill-button-secondary-activate: #CCCCCC;
  --component-fill-button-secondary-hover: #E6E6E6;
  --component-fill-button-tertiary-active: #CCCCCC;
  --component-fill-button-tertiary-default: #F7F7F7;
  --component-fill-button-tertiary-disabled: #FAFAFA;
  --component-fill-button-tertiary-hover: #E6E6E6;
  --component-fill-button-text: #F7F7F7;
  --component-fill-button-text-active: #CCCCCC;
  --component-fill-button-text-hover: #E6E6E6;
  --component-fill-button-virtual: #FEEDED;
  --component-fill-cascader: #FFFFFF;
  --component-fill-checkbox: #FFFFFF;
  --component-fill-control-background: #222222;
  --component-fill-disabled: #FAFAFA;
  --component-fill-empty-state: #FF8100;
  --component-fill-empty-state-100: #FFFFFF;
  --component-fill-empty-state-200: #F7F7F7;
  --component-fill-empty-state-300: #E8E8E8;
  --component-fill-empty-state-400: #E6E6E6;
  --component-fill-empty-state-500: #999999;
  --component-fill-empty-state-600: #222222;
  --component-fill-error: #FEEDED;
  --component-fill-form: #F7F7F7;
  --component-fill-info: #ECF2FC;
  --component-fill-offline: #F0F0F0;
  --component-fill-option-card: #FFFFFF;
  --component-fill-page-background: #F7F7F7;
  --component-fill-radio: #FFFFFF;
  --component-fill-secondary: #666666;
  --component-fill-success: #E6F7EF;
  --component-fill-table: #FAFAFA;
  --component-fill-tabs: #FFFFFF;
  --component-fill-tag-add-tag-button: #F7F7F7;
  --component-fill-tag-selector-tag: #FAFAFA;
  --component-fill-tag-state-tag: #F0F0F0;
  --component-fill-tag-tag-group: #F7F7F7;
  --component-fill-territory: #999999;
  --component-fill-warning: #FFF7E8;
}
```

## Rules

- Component tokens should reference semantic tokens first.
- Keep naming stable and reflect the **variant/state axes**:
  - `type/kind/shape/size/state` (see `.design-spec/manifest.json`)
- Avoid ad-hoc tokens per screen; if it’s not reusable, it doesn’t belong here.