# Semantic Tokens

Semantic tokens represent **UI meaning**, not raw values.

## Where they live

- **Design-spec source of truth (normalized)**: `.design-spec/tokens/src/semantic.json`
- **Imported source (Figma export)**: `~/Downloads/2.语义颜色 Semantic color /Value.tokens.json`

## Why semantic tokens

- Enable consistent usage across components and pages.
- Make themes (light/dark, brand variants) possible without rewriting components.

## Typical semantic groups

| Group | Examples | Used by |
|---|---|---|
| Background | `bg.page`, `bg.surface` | Layout, cards, inputs |
| Text | `text.primary` | All components |
| Border | `border.default` | Inputs, dividers, tables |

## Semantic color palettes (CSS variables example)

Below is a **Global light** semantic color list rendered as CSS variables from the provided JSON export.

```css
:root {
  /* 主色 Primary / Global light */
  --semantic-primary-10: #FFFFFF;
  --semantic-primary-20: #E6E6E6;
  --semantic-primary-30: #A7A7A7;
  --semantic-primary-40: #4E4E4E;
  --semantic-primary-50: #222222;
  --semantic-primary-60: #1B1B1B;

  /* 中性色 Neutral / Global light */
  --semantic-neutral-10: #FFFFFF;
  --semantic-neutral-20: #FAFAFA;
  --semantic-neutral-30: #F7F7F7;
  --semantic-neutral-40: #E7E7E7;
  --semantic-neutral-50: #E6E6E6;
  --semantic-neutral-60: #E8E8E8;
  --semantic-neutral-70: #CCCCCC;
  --semantic-neutral-80: #BFBFBF;
  --semantic-neutral-90: #A7A7A7;
  --semantic-neutral-100: #999999;
  --semantic-neutral-110: #666666;
  --semantic-neutral-120: #4E4E4E;
  --semantic-neutral-130: #222222;
  --semantic-neutral-140: #1B1B1B;
  --semantic-neutral-150: #E0E0E0;

  /* 品牌色 Brand / Global light */
  --semantic-brand-10: #FFE6BA;
  --semantic-brand-20: #FFCD99;
  --semantic-brand-30: #FF9A33;
  --semantic-brand-40: #FF8100;
  --semantic-brand-50: #D26200;

  /* 链接色Link / Global light */
  --semantic-link-10: #A3BBDF;
  --semantic-link-20: #6985BF;
  --semantic-link-30: #506DAF;
  --semantic-link-40: #344E96;

  /* 成功色Success / Global light */
  --semantic-success-10: #E6F7EF;
  --semantic-success-20: #D6F4E3;
  --semantic-success-30: #7DDDA5;
  --semantic-success-40: #2ABB70;
  --semantic-success-50: #09AA5C;
  --semantic-success-60: #069353;

  /* 告警色Warning / Global light */
  --semantic-warning-10: #FFF7E8;
  --semantic-warning-20: #FFF5DB;
  --semantic-warning-30: #FFE493;
  --semantic-warning-40: #FFC23E;
  --semantic-warning-50: #FFAD14;
  --semantic-warning-60: #D2860C;

  /* 危险色Danger / Global light */
  --semantic-danger-10: #FEEDED;
  --semantic-danger-20: #FDE4E1;
  --semantic-danger-30: #F9AFA5;
  --semantic-danger-40: #F46C65;
  --semantic-danger-50: #F14846;
  --semantic-danger-60: #C82C2E;

  /* 接入中&提示Commissioning&Prompt / Global light */
  --semantic-commissioning-prompt-10: #ECF2FC;
  --semantic-commissioning-prompt-20: #E0ECFB;
  --semantic-commissioning-prompt-30: #A0C6F4;
  --semantic-commissioning-prompt-40: #5E93E9;
  --semantic-commissioning-prompt-50: #3F78E4;
  --semantic-commissioning-prompt-60: #2757BE;

  /* 离线色offline / Global light */
  --semantic-offline-10: #F0F0F0;
  --semantic-offline-20: #C2C2C2;
  --semantic-offline-30: #858585;
  --semantic-offline-40: #666666;
  --semantic-offline-50: #555555;

  /* 高亮星 Star / Global light */
  --semantic-star-10: #FFF7E8;
  --semantic-star-20: #FFF5DB;
  --semantic-star-30: #FFE493;
  --semantic-star-40: #FFC23E;
  --semantic-star-50: #FFAD14;
  --semantic-star-60: #D2860C;

  /* 蒙层 Mask / Global light */
  --semantic-mask-default: rgba(0, 0, 0, 0.3);
  --semantic-mask-loading: rgba(255, 255, 255, 0.6);
}
```

## Rules

- Semantic tokens may reference primitives.
- Components should prefer semantic tokens over primitives.
- Avoid leaking component semantics into this layer (keep it global).

## **Spacing Semantics**

```css
:root {
  /* Component internal spacing */
  --spacing-component-xs: var(--space-1);
  --spacing-component-sm: var(--space-2);
  --spacing-component: var(--space-3);
  --spacing-component-lg: var(--space-4);

  /* Section spacing */
  --spacing-section-sm: var(--space-8);
  --spacing-section: var(--space-12);
  --spacing-section-lg: var(--space-16);

  /* Page margins */
  --spacing-page-x: var(--space-4);
  --spacing-page-y: var(--space-6);
}
```

## **Typography Semantics**

```css
:root {
  /* Headings */
  --font-heading: var(--font-size-2xl);
  --font-heading-lg: var(--font-size-3xl);
  --font-heading-xl: var(--font-size-4xl);

  /* Body */
  --font-body: var(--font-size-base);
  --font-body-sm: var(--font-size-sm);
  --font-body-lg: var(--font-size-lg);

  /* Labels & Captions */
  --font-label: var(--font-size-sm);
  --font-caption: var(--font-size-xs);
}
```

## **Interactive States**

```css
:root {
  /* Focus ring */
  --ring-width: 2px;
  --ring-offset: 2px;
  --ring-color: var(--color-ring);

  /* Opacity for disabled */
  --opacity-disabled: 0.5;

  /* Transitions */
  --transition-colors: color, background-color, border-color;
  --transition-transform: transform;
  --transition-all: all;
}
```

## **Usage Patterns**

---

### **Applying Semantic Tokens**

```css
/* Good - uses semantic tokens */
.card {
  background: var(--color-card);
  color: var(--color-card-foreground);
  border: 1px solid var(--color-border);
}

/* Bad - uses primitive tokens directly */
.card {
  background: var(--color-gray-50);
  color: var(--color-gray-900);
}
```

### **Theme Switching**

Semantic tokens enable instant theme switching:

```css
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

## Rules

---

- Semantic tokens may reference primitives.
- Components should prefer semantic tokens over primitives.
- Avoid leaking component semantics into this layer (keep it global).

