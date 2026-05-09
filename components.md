# Component Library Catalog

> **Complete index of all components, tokens, and utilities**

## 🎨 UI Components

### Button
**Location:** `src/components/ui/Button/`  
**Import:** `import { Button } from '@/components/ui'`

Versatile button component with multiple variants and states.

**Variants:** primary, secondary, outline, ghost, danger  
**Sizes:** sm, md, lg  
**Features:** Loading state, icons, full-width option

**Example:**
```tsx
<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
```

**Documentation:** [Button README](./src/components/ui/Button/README.md)

---

### Input
**Location:** `src/components/ui/Input/`  
**Import:** `import { Input } from '@/components/ui'`

Text input with labels, validation, and helper text.

**Sizes:** sm, md, lg  
**Features:** Error states, prefix/suffix, helper text, required indicator

**Example:**
```tsx
<Input
  label="Email"
  type="email"
  error={false}
  errorMessage="Invalid email"
  helperText="We'll never share your email"
/>
```

---

### Card
**Location:** `src/components/ui/Card/`  
**Import:** `import { Card } from '@/components/ui'`

Flexible container component for grouping content.

**Variants:** default, outlined, elevated  
**Padding:** none, sm, md, lg  
**Features:** Header, footer, hoverable, clickable

**Example:**
```tsx
<Card
  variant="elevated"
  header={<h3>Title</h3>}
  footer={<Button>Action</Button>}
>
  Content goes here
</Card>
```

---

### Badge
**Location:** `src/components/ui/Badge/`  
**Import:** `import { Badge } from '@/components/ui'`

Status indicators and labels.

**Variants:** default, success, warning, error, info  
**Sizes:** sm, md  
**Features:** Dot indicator

**Example:**
```tsx
<Badge variant="success" dot>Active</Badge>
```

---

### Alert
**Location:** `src/components/ui/Alert/`  
**Import:** `import { Alert } from '@/components/ui'`

Contextual feedback messages.

**Variants:** info, success, warning, error  
**Features:** Title, description, custom icon, closable

**Example:**
```tsx
<Alert
  variant="warning"
  title="Warning"
  closable
  onClose={() => {}}
>
  Please review before submitting
</Alert>
```

---

## 🎯 Design Tokens

### Colors
**Location:** `src/tokens/colors.ts`  
**Import:** `import { colors, semanticColors } from '@/tokens'`

Complete color system with light/dark mode support.

**Available Colors:**
- `colors.blue` - Primary brand color
- `colors.green` - Success states
- `colors.red` - Error/danger states
- `colors.orange` - Warning states
- `colors.cyan` - Info states
- `colors.gray` - Neutral colors
- `colors.purple`, `colors.pink`, `colors.yellow`

**Semantic Aliases:**
```tsx
semanticColors.background.primary
semanticColors.text.primary
semanticColors.border.default
semanticColors.state.success
```

**Usage:**
```tsx
<div className="bg-[var(--蓝色-blue/light/50)]" />
```

---

### Spacing
**Location:** `src/tokens/spacing.ts`  
**Import:** `import { spacing, padding, margin, gap } from '@/tokens'`

4px-based spacing scale.

**Available Values:**
- `spacing.xs` - 4px
- `spacing.sm` - 8px
- `spacing.md` - 16px
- `spacing.lg` - 24px
- `spacing.xl` - 32px
- `spacing.2xl` - 48px
- `spacing.3xl` - 64px

---

### Typography
**Location:** `src/tokens/typography.ts`  
**Import:** `import { fontSize, fontWeight, typography } from '@/tokens'`

Font sizes, weights, and preset combinations.

**Font Sizes:** xs, sm, base, lg, xl, 2xl, 3xl, 4xl  
**Font Weights:** light, normal, medium, semibold, bold

**Typography Presets:**
```tsx
typography.h1    // Heading 1
typography.body  // Body text
typography.button // Button text
typography.label  // Form labels
```

---

### Border Radius
**Location:** `src/tokens/radius.ts`  
**Import:** `import { radius } from '@/tokens'`

**Available Values:** none, sm, md, lg, xl, 2xl, 3xl, full

---

### Shadows
**Location:** `src/tokens/shadows.ts`  
**Import:** `import { shadows } from '@/tokens'`

**Available Values:** none, xs, sm, md, lg, xl, 2xl, inner

---

## 🔧 Utilities

### cn (Class Name Merger)
**Location:** `src/utils/cn.ts`  
**Import:** `import { cn } from '@/utils'`

Utility for merging Tailwind CSS classes.

**Example:**
```tsx
<div className={cn(
  'base-styles',
  isActive && 'active-styles',
  className
)} />
```

---

## 📚 Documentation Files

### Primary Guides

1. **[README.md](./README.md)** - Project overview and quick start
2. **[DESIGN_SYSTEM.md](./guidelines/DESIGN_SYSTEM.md)** - Design principles and tokens
3. **[COMPONENTS.md](./guidelines/COMPONENTS.md)** - Component API with Do/Don't
4. **[SETUP.md](./guidelines/SETUP.md)** - Installation and configuration
5. **[BEST_PRACTICES.md](./guidelines/BEST_PRACTICES.md)** - Coding patterns
6. **[CURSOR_INTEGRATION.md](./guidelines/CURSOR_INTEGRATION.md)** - AI-assisted development

### Component READMEs

- [Button README](./src/components/ui/Button/README.md)
- Additional component docs in their respective folders

---

## 📦 Import Paths

### Path Aliases

All imports use TypeScript path aliases configured in `tsconfig.json`:

```tsx
@/components/ui  → src/components/ui
@/tokens         → src/tokens
@/utils          → src/utils
@/hooks          → src/hooks
```

### Common Import Patterns

```tsx
// Components
import { Button, Input, Card } from '@/components/ui';

// Types
import type { ButtonProps, InputProps } from '@/components/ui';

// Tokens
import { colors, spacing, typography } from '@/tokens';

// Utilities
import { cn } from '@/utils';
```

---

## 🏗️ File Structure Overview

```
src/
├── components/
│   └── ui/                    # UI component library
│       ├── Button/
│       │   ├── index.tsx
│       │   ├── Button.types.ts
│       │   └── README.md
│       ├── Input/
│       ├── Card/
│       ├── Badge/
│       ├── Alert/
│       └── index.ts           # Central export
│
├── tokens/                    # Design tokens
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── radius.ts
│   ├── shadows.ts
│   └── index.ts
│
├── utils/                     # Utilities
│   ├── cn.ts
│   └── index.ts
│
├── hooks/                     # React hooks (future)
│
├── styles/
│   ├── index.css
│   ├── tailwind.css
│   └── fonts.css
│
├── DSMobileComponentsV22026/
│   └── styles.css             # Design system CSS variables
│
└── app/
    ├── App.tsx                # Demo application
    └── components/            # App-specific components

guidelines/                    # Documentation
├── DESIGN_SYSTEM.md
├── COMPONENTS.md
├── SETUP.md
├── BEST_PRACTICES.md
└── CURSOR_INTEGRATION.md
```

---

## 🎯 Quick Reference

### Creating a New Component

1. Create folder: `src/components/ui/ComponentName/`
2. Create files:
   - `index.tsx` - Component implementation
   - `ComponentName.types.ts` - TypeScript types
   - `README.md` - Documentation
3. Export from `src/components/ui/index.ts`
4. Follow patterns in [BEST_PRACTICES.md](./guidelines/BEST_PRACTICES.md)

### Using Design Tokens

```tsx
// ✅ Always use tokens
<div className="bg-[var(--蓝色-blue/light/50)]" />

// ❌ Never hardcode
<div className="bg-blue-500" />
```

### Component Template

```tsx
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface MyComponentProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary';
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-styles', className)}
        {...props}
      />
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

---

## 🚀 Next Steps

1. **New to the library?** Start with [README.md](./README.md)
2. **Setting up?** Follow [SETUP.md](./guidelines/SETUP.md)
3. **Building components?** Read [BEST_PRACTICES.md](./guidelines/BEST_PRACTICES.md)
4. **Using Cursor?** Check [CURSOR_INTEGRATION.md](./guidelines/CURSOR_INTEGRATION.md)
5. **Need examples?** See component usage in [COMPONENTS.md](./guidelines/COMPONENTS.md)

---

**Last Updated:** May 2026  
**Version:** 1.0.0
