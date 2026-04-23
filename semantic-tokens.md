# Semantic Tokens

Semantic tokens represent **UI meaning**, not raw values.

## Typical semantic groups


| Group      | Examples                | Used by                  |
| ---------- | ----------------------- | ------------------------ |
| Background | `bg.page`, `bg.surface` | Layout, cards, inputs    |
| Text       | `text.primary`          | All components           |
| Border     | `border.default`        | Inputs, dividers, tables |


## **Color Semantics**

---

### **Background & Foreground**

```css
:root {
  /* Page background */
  --color-background: var(--color-neutral-20);
  --color-foreground: var(--color-neutral-00);

  /* Card/surface background */
  --color-card: white;
  --color-card-foreground: var(--color-neutral-00);

  /* Popover/dropdown */
  --color-popover: white;
  --color-popover-foreground: var(--color-neutral-00);
}
```

### **Primary**

```css
:root {
  --color-primary: var(--color-neutral-170);
  --color-primary-hover: var(--color-neutral-160);
  --color-primary-active: var(--color-neutral-180);
--color-primary-disabled: var(--color-neutral-110);
--color-primary-foreground: white;
}
```

### **Secondary**

```css
:root {
  --color-secondary: var(--color-neutral-0);
  --color-secondary-hover: var(--color-neutral-50);
  --color-secondary-foreground: var(--color-neutral-80);
--color-secondary-disabled: var(--color-neutral-0);
--color-primary-foreground: var(--color-neutral-170);
}
```

### Teritiary

```css
:root {
  --color-teritiary: var(--color-neutral-20);
  --color-teritiary-hover: var(--color-neutral-50);
  --color-teritiary-foreground: var(--color-neutral-80);
--color-teritiary-disabled: var(--color-neutral-10);
--color-teritiary-foreground: var(--color-neutral-170);
}
```

### Brand

```css
:root {  
  /* 品牌色 Brand / Global light */
  --color-brand: var(--color-orange-40);
}
```

### **Destructive**

```css
:root {
  --color-destructive: var(--color-red-50);
  --color-destructive-hover: var(--color-red-60);
  --color-destructive-foreground: white;
}
```

### **Status Colors**

```css
:root {
  /* 成功色 Success / Global light */
  --color-success: var(--color-green-50);
  --color-success-foreground: white;
  
  /* 告警 warning / Global light */
  --color-warning: var(--color-yellow-50);
  --color-warning-foreground: white;

  /* 报错 error / Global light */
  --color-error: var(--color-red-50);
  --color-error-foreground: white;

  /* 提示 infor / Global light */
  --color-info: var(--color-blue-50);
  --color-info-foreground: white;
}
```

### **Border & Ring**

```css
:root {
  --color-border: var(--color-neutral-120);
  --color-input: var(--color-neutral-170);
  --color-ring: var();
}
```

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

