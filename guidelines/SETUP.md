# Setup Guide

Complete installation and configuration guide for the component library.

## Prerequisites

- Node.js 18+ or 20+
- pnpm 8+ (recommended) or npm/yarn
- React 18+
- TypeScript 5+

## Installation

### 1. Install Dependencies

This project uses **pnpm** as the package manager:

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

### 2. Start Development Server

The Vite dev server is configured and ready to use:

```bash
pnpm dev
```

The application will be available at the preview URL provided by Figma Make.

### 3. Build for Production

```bash
pnpm build
```

Built files will be in the `dist/` directory.

## Project Structure

```
/
├── src/
│   ├── components/
│   │   └── ui/                 # Core UI components
│   │       ├── Button/
│   │       │   ├── index.tsx
│   │       │   ├── Button.types.ts
│   │       │   └── README.md
│   │       ├── Input/
│   │       ├── Card/
│   │       ├── Badge/
│   │       ├── Alert/
│   │       └── index.ts        # Central export
│   ├── tokens/                 # Design tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── radius.ts
│   │   ├── shadows.ts
│   │   └── index.ts
│   ├── utils/                  # Utilities
│   │   ├── cn.ts               # Classname merger
│   │   └── index.ts
│   ├── hooks/                  # React hooks (future)
│   ├── styles/
│   │   ├── index.css           # Main styles
│   │   ├── tailwind.css        # Tailwind imports
│   │   ├── fonts.css           # Font imports
│   │   └── globals.css         # Global styles
│   ├── DSMobileComponentsV22026/
│   │   └── styles.css          # Design system tokens
│   └── app/
│       ├── App.tsx             # Main app component
│       └── components/         # App-specific components
├── guidelines/                 # Documentation
│   ├── DESIGN_SYSTEM.md
│   ├── COMPONENTS.md
│   ├── SETUP.md (this file)
│   └── BEST_PRACTICES.md
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── package.json
```

## TypeScript Configuration

The project is configured with strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/tokens/*": ["./src/tokens/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

### Path Aliases

Use these import aliases in your code:

```tsx
import { Button } from '@/components/ui';
import { colors } from '@/tokens';
import { cn } from '@/utils';
```

## Importing Components

### Individual Component Import

```tsx
import { Button } from '@/components/ui/Button';
```

### Multiple Components from Index

```tsx
import { Button, Input, Card } from '@/components/ui';
```

### With Type Imports

```tsx
import { Button } from '@/components/ui';
import type { ButtonProps } from '@/components/ui';
```

## Importing Design Tokens

```tsx
import { colors, semanticColors } from '@/tokens/colors';
import { spacing } from '@/tokens/spacing';
import { typography } from '@/tokens/typography';

// Or import all at once
import { colors, spacing, typography } from '@/tokens';
```

## Using Design Tokens

### In JSX with Tailwind

```tsx
// Using CSS variables directly
<div className="bg-[var(--蓝色-blue/light/50)]">
  Content
</div>

// Using Tailwind utilities with CSS variables
<div className="bg-[var(--灰色-dust/light/10)] text-[var(--灰色-dust/light/120)]">
  Themed content
</div>
```

### In TypeScript

```tsx
import { colors } from '@/tokens';

const styles = {
  background: colors.blue.light[50],
  color: colors.gray.light[120],
};
```

## Styling Best Practices

### 1. Always Use Design Tokens

```tsx
// ✅ Good - uses design tokens
<div className="bg-[var(--蓝色-blue/light/50)] text-white" />

// ❌ Bad - hardcoded colors
<div className="bg-blue-500 text-white" />
```

### 2. Use Semantic Color Names

```tsx
import { semanticColors } from '@/tokens';

// ✅ Good - semantic
<div style={{ color: semanticColors.text.primary }} />

// ❌ Less ideal - direct token
<div style={{ color: colors.gray.light[120] }} />
```

### 3. Component Composition

```tsx
// ✅ Good - compose components
<Card>
  <Input label="Name" />
  <Button>Submit</Button>
</Card>

// ❌ Bad - recreating styles
<div className="rounded-lg border p-6">
  <input className="..." />
  <button className="...">Submit</button>
</div>
```

## Integrating with Existing Figma Make Project

If you're adding this to an existing project:

### 1. Copy Component Files

```bash
cp -r src/components/ui /your-project/src/components/
cp -r src/tokens /your-project/src/
cp -r src/utils /your-project/src/
```

### 2. Update Your tsconfig.json

Add path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./src/components/*"],
      "@/tokens/*": ["./src/tokens/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

### 3. Import Design System Styles

In your `src/styles/index.css`:

```css
@import './DSMobileComponentsV22026/styles.css';
@import './tailwind.css';
@import './fonts.css';
```

### 4. Start Using Components

```tsx
import { Button, Input, Card } from '@/components/ui';

function App() {
  return (
    <Card>
      <h1>Hello World</h1>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Vite Configuration

The project uses Vite with React and TypeScript:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## Environment Variables

Create a `.env.local` file for environment-specific config:

```bash
VITE_APP_TITLE=My App
VITE_API_URL=https://api.example.com
```

Access in code:

```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## IDE Setup (Cursor / VS Code)

### Recommended Extensions

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Tailwind autocomplete
- **TypeScript**: Built-in TS support

### Settings (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Troubleshooting

### TypeScript Path Alias Not Working

Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

And your Vite config has the matching alias:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### CSS Variables Not Working

Make sure `src/DSMobileComponentsV22026/styles.css` is imported in your main CSS file.

### Components Not Found

Check that `src/components/ui/index.ts` exports all components:

```typescript
export { Button } from './Button';
export { Input } from './Input';
// ... etc
```

## Next Steps

- Read [COMPONENTS.md](./COMPONENTS.md) for component usage
- Read [BEST_PRACTICES.md](./BEST_PRACTICES.md) for coding patterns
- Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design tokens

## Support

For issues or questions:
1. Check the component README files in `src/components/ui/`
2. Review the guidelines documentation
3. Check TypeScript types for prop documentation
