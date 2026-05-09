# Enterprise Component Library Design System

> **Version:** 1.0.0  
> **Framework:** React 18 + TypeScript  
> **Styling:** Tailwind CSS v4  
> **Last Updated:** May 2026

## 📋 Table of Contents

1. [Design Principles](#design-principles)
2. [Design Tokens](#design-tokens)
3. [Component Architecture](#component-architecture)
4. [Accessibility Standards](#accessibility-standards)
5. [Responsive Design](#responsive-design)
6. [Theme System](#theme-system)

---

## 🎯 Design Principles

### 1. **Consistency First**
All components follow a unified design language. Use design tokens for colors, spacing, typography, and effects—never hardcode values.

### 2. **Accessibility by Default**
- WCAG 2.1 AA compliance minimum
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA attributes

### 3. **Performance Optimized**
- Tree-shakable component exports
- Lazy loading for heavy components
- Minimal runtime overhead
- CSS-in-Tailwind for zero runtime styles

### 4. **Developer Experience**
- Full TypeScript support
- Comprehensive prop interfaces
- IntelliSense-friendly
- Self-documenting code

### 5. **Maintainability**
- Single responsibility principle
- Composition over inheritance
- Clear file structure
- Comprehensive testing

---

## 🎨 Design Tokens

### Color System

Our color system uses semantic naming with light/dark mode support:

#### **Grayscale (灰色 Dust)**
```css
--灰色-dust/light/10: #FFF      /* Pure white */
--灰色-dust/light/120: #222     /* Near black */
--灰色-dust/dark/10: #111       /* Dark mode bg */
--灰色-dust/dark/150: #FFF      /* Dark mode text */
```

#### **Brand Colors**
- **Primary Blue**: `--蓝色-blue/light/50` (#4776FF)
- **Success Green**: `--绿色-green/light/50` (#09AA5C)
- **Warning Orange**: `--橘色-orange/light/50` (#FF8100)
- **Danger Red**: `--红色-red/light/50` (#F14846)

#### **Semantic Colors**
```typescript
// Use semantic tokens, not raw colors
background-primary   → var(--灰色-dust/light/10)
background-secondary → var(--灰色-dust/light/20)
text-primary         → var(--灰色-dust/light/120)
text-secondary       → var(--灰色-dust/light/110)
border-default       → var(--灰色-dust/light/60)
```

### Spacing System

Based on 4px grid:

```typescript
spacing-xs:  4px   (0.25rem)
spacing-sm:  8px   (0.5rem)
spacing-md:  16px  (1rem)
spacing-lg:  24px  (1.5rem)
spacing-xl:  32px  (2rem)
spacing-2xl: 48px  (3rem)
spacing-3xl: 64px  (4rem)
```

### Typography Scale

```typescript
text-xs:   12px / 1.5    (0.75rem)
text-sm:   14px / 1.5    (0.875rem)
text-base: 16px / 1.5    (1rem)
text-lg:   18px / 1.5    (1.125rem)
text-xl:   20px / 1.5    (1.25rem)
text-2xl:  24px / 1.333  (1.5rem)
text-3xl:  30px / 1.333  (1.875rem)
text-4xl:  36px / 1.2    (2.25rem)
```

### Border Radius

```typescript
radius-none: 0px
radius-sm:   2px
radius-md:   4px
radius-lg:   8px
radius-xl:   12px
radius-2xl:  16px
radius-full: 9999px
```

### Shadows

```typescript
shadow-sm:  0 1px 2px rgba(0,0,0,0.08)
shadow-md:  0 2px 8px rgba(0,0,0,0.08)
shadow-lg:  0 4px 16px rgba(0,0,0,0.10)
shadow-xl:  0 8px 24px rgba(0,0,0,0.12)
```

---

## 🏗️ Component Architecture

### File Structure

```
src/
├── components/
│   ├── ui/                      # Core UI components
│   │   ├── Button/
│   │   │   ├── index.tsx        # Component logic
│   │   │   ├── Button.types.ts  # TypeScript types
│   │   │   ├── Button.test.tsx  # Unit tests
│   │   │   └── README.md        # Usage docs
│   │   ├── Input/
│   │   ├── Card/
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── Container/
│   │   ├── Grid/
│   │   └── Stack/
│   └── feedback/                # Feedback components
│       ├── Alert/
│       ├── Toast/
│       └── Modal/
├── tokens/
│   ├── colors.ts               # Color token exports
│   ├── spacing.ts              # Spacing tokens
│   ├── typography.ts           # Typography tokens
│   └── index.ts                # Central export
├── hooks/
│   ├── useTheme.ts
│   ├── useMediaQuery.ts
│   └── index.ts
└── utils/
    ├── cn.ts                    # Class name utility
    └── index.ts
```

### Component Template

```tsx
// Button/index.tsx
import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import { cn } from '@/utils/cn';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

---

## ♿ Accessibility Standards

### Required Practices

1. **Semantic HTML**
   - Use proper heading hierarchy (h1 → h6)
   - Use `<button>` for actions, `<a>` for navigation
   - Use `<nav>`, `<main>`, `<aside>` landmarks

2. **Keyboard Navigation**
   - All interactive elements focusable
   - Logical tab order (tabindex)
   - Visible focus indicators
   - Escape key closes modals/dropdowns

3. **ARIA Attributes**
   ```tsx
   <button
     aria-label="Close dialog"
     aria-pressed={isPressed}
     aria-expanded={isExpanded}
   />
   ```

4. **Color Contrast**
   - Text: minimum 4.5:1 contrast ratio
   - Large text (18px+): minimum 3:1
   - Never rely on color alone

5. **Screen Readers**
   - Meaningful alt text for images
   - aria-live for dynamic content
   - aria-describedby for hints

---

## 📱 Responsive Design

### Breakpoints

```typescript
sm:  640px   // Mobile landscape
md:  768px   // Tablet
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
2xl: 1536px  // Wide screens
```

### Mobile-First Approach

```tsx
// Base styles = mobile
// Add complexity as screen grows
<div className="
  p-4              /* Mobile: 16px padding */
  md:p-6           /* Tablet: 24px padding */
  lg:p-8           /* Desktop: 32px padding */
  text-sm          /* Mobile: 14px text */
  md:text-base     /* Tablet: 16px text */
"/>
```

---

## 🎨 Theme System

### Light/Dark Mode

```tsx
// Automatic theme switching
<div className="
  bg-[var(--灰色-dust/light/10)]
  dark:bg-[var(--灰色-dust/dark/10)]
  text-[var(--灰色-dust/light/120)]
  dark:text-[var(--灰色-dust/dark/150)]
"/>
```

### Custom Themes

Use CSS variables for runtime theme switching:

```css
:root {
  --color-primary: var(--蓝色-blue/light/50);
  --color-success: var(--绿色-green/light/50);
}

:root[data-theme="custom"] {
  --color-primary: #8B5CF6; /* Custom purple */
}
```

---

## 📦 Installation & Setup

See [SETUP.md](./SETUP.md) for detailed installation instructions.

## 📚 Component Documentation

See [COMPONENTS.md](./COMPONENTS.md) for complete component API reference.

## 🚀 Best Practices

See [BEST_PRACTICES.md](./BEST_PRACTICES.md) for coding guidelines and patterns.
