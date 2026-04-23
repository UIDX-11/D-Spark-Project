# Semantic Tokens

Semantic tokens represent **UI meaning**, not raw values.

## Where they live

- **Design-spec source of truth (normalized)**: `.design-spec/tokens/src/semantic.json`
- **Upstream dependency**: primitive tokens (see `primitive-tokens.md` and `.design-spec/tokens/src/core.json`)

## Why semantic tokens

- Enable consistent usage across components and pages.
- Make themes (light/dark, brand variants) possible without rewriting components.

## Typical semantic groups


| Group      | Examples                | Used by                  |
| ---------- | ----------------------- | ------------------------ |
| Background | `bg.page`, `bg.surface` | Layout, cards, inputs    |
| Text       | `text.primary`          | All components           |
| Border     | `border.default`        | Inputs, dividers, tables |


## Semantic roles (recommended for implementation)

Semantic roles are the stable interface consumed by component tokens. They should reference primitives only.

```css
:root {
  /* Surfaces */
  --color-page: var(--color-neutral-20);
  --color-surface: var(--color-neutral-00);
  --color-card: var(--color-neutral-00);
  --color-card-foreground: var(--color-neutral-170);

  /* Text */
  --color-text-primary: var(--color-neutral-170);
  --color-text-secondary: var(--color-neutral-140);
  --color-text-disabled: var(--color-neutral-110);

  /* Primary action */
  --color-primary: var(--color-neutral-170);
  --color-primary-hover: var(--color-neutral-160);
  --color-primary-active: var(--color-neutral-180);
  --color-primary-disabled: var(--color-neutral-110);
  --color-primary-foreground: var(--color-neutral-00);

  /* Borders */
  --color-border: var(--color-neutral-80);
  --color-border-strong: var(--color-neutral-120);

  /* Link / focus ring */
  --color-link: var(--color-deep-blue-30);
  --color-ring: var(--color-deep-blue-20);

  /* Status */
  --color-success: var(--color-green-50);
  --color-warning: var(--color-yellow-50);
  --color-danger: var(--color-red-50);
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
  background: var(--color-neutral-20);
  color: var(--color-neutral-170);
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

