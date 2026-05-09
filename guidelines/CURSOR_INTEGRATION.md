# Cursor Integration Guide

Complete guide for integrating this component library with Cursor IDE for optimal AI-assisted development.

## 📋 Overview

Cursor IDE provides AI-powered code completion and generation. This guide helps you configure Cursor to work seamlessly with our component library and design system.

## 🎯 Quick Setup

### 1. Install Cursor Extensions

Install these extensions for best experience:

- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **TypeScript Error Translator** - Better TypeScript error messages
- **Path Intellisense** - Autocomplete for file paths
- **Auto Import** - Automatically import components

### 2. Configure Cursor Settings

Create `.vscode/settings.json` in your project root:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### 3. Create Cursor Rules File

Create `.cursorrules` in project root to guide Cursor's AI:

```markdown
# Component Library Rules

## Component Development
- Always use TypeScript for new components
- Use forwardRef for all UI components
- Set displayName for all components
- Extend appropriate HTML element props (ButtonHTMLAttributes, etc.)

## Styling
- NEVER hardcode colors, spacing, or other design values
- ALWAYS use design tokens from @/tokens
- Use CSS variables: var(--蓝色-blue/light/50)
- Use the cn() utility from @/utils/cn for class merging

## Imports
- Use path aliases: @/components/ui, @/tokens, @/utils
- Import types separately: import type { ButtonProps } from '@/components/ui'
- Organize imports: external → internal → types → relative

## Accessibility
- Use semantic HTML elements
- Include ARIA attributes where needed
- Ensure keyboard navigation works
- Maintain WCAG AA color contrast
- Use useId() for form element IDs

## File Structure
ComponentName/
├── index.tsx
├── ComponentName.types.ts
├── ComponentName.test.tsx
└── README.md

## Code Style
- PascalCase for components and types
- camelCase for variables and functions
- Destructure props with defaults
- Use const for everything except useState

## Examples

### Creating a New Component
```tsx
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface MyComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const MyComponent = forwardRef<HTMLButtonElement, MyComponentProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'base-styles',
          variant === 'primary' && 'primary-styles',
          className
        )}
        {...props}
      />
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

### Using Design Tokens
```tsx
// ✅ Correct
<div className="bg-[var(--蓝色-blue/light/50)] text-[var(--灰色-dust/light/10)]" />

// ❌ Wrong
<div className="bg-blue-500 text-white" />
```

### Component Usage
```tsx
import { Button, Input, Card } from '@/components/ui';
import type { ButtonProps } from '@/components/ui';

function MyForm() {
  return (
    <Card padding="lg">
      <Input label="Email" type="email" required />
      <Button variant="primary" size="md">
        Submit
      </Button>
    </Card>
  );
}
```
```

## 🤖 Using Cursor AI Effectively

### AI-Assisted Component Generation

When asking Cursor to create a component:

**Example Prompts:**

```
Create a Select component following our component library patterns.
It should:
- Use forwardRef
- Accept options as { value: string; label: string }[]
- Use design tokens from @/tokens
- Have variants: default, error
- Be fully accessible with ARIA attributes
- Support both controlled and uncontrolled modes
```

```
Add a Toast notification component with:
- Success, error, warning, info variants
- Auto-dismiss after configurable duration
- Stacking support for multiple toasts
- Close button
- Use semantic colors from tokens
```

### AI-Assisted Refactoring

```
Refactor this component to:
1. Use design tokens instead of hardcoded values
2. Add proper TypeScript types
3. Make it accessible (ARIA, keyboard nav)
4. Follow our file structure pattern
```

### AI-Assisted Documentation

```
Generate a README.md for this component following our documentation style.
Include:
- Basic usage examples
- All prop variations
- Do/Don't examples
- Accessibility notes
```

## 🔍 IntelliSense Configuration

### TypeScript Path Aliases

Cursor will autocomplete these imports:

```tsx
@/components/ui      → src/components/ui
@/tokens            → src/tokens
@/utils             → src/utils
@/hooks             → src/hooks
```

### Component Props Autocomplete

When you type `<Button `, Cursor shows all available props with documentation:

```tsx
<Button
  variant="primary"    // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size="md"           // 'sm' | 'md' | 'lg'
  loading={false}     // boolean
  icon={<Icon />}     // ReactNode
  // ... full IntelliSense
/>
```

### Design Token Autocomplete

```tsx
import { colors } from '@/tokens';

// Cursor autocompletes:
colors.blue.light[50]
colors.gray.dark[10]
semanticColors.text.primary
```

## 📝 Cursor Composer Tips

### Generate Multiple Files at Once

Use Cursor Composer to generate complete component sets:

```
Create a Modal component with these files:
1. Modal/index.tsx - Main component
2. Modal/Modal.types.ts - TypeScript types
3. Modal/README.md - Documentation
4. Modal/Modal.test.tsx - Unit tests

The Modal should:
- Support sizes: sm, md, lg, xl, full
- Have header, body, footer sections
- Close on overlay click (optional)
- Close on ESC key
- Focus trap when open
- Use design tokens
```

### Batch Component Creation

```
Create these components following our patterns:
1. Tooltip - hover trigger, multiple positions
2. Dropdown - menu with keyboard navigation
3. Tabs - accessible tab navigation
4. Accordion - collapsible sections

For each, create types file, README, and tests.
```

## 🎨 Tailwind IntelliSense Setup

### CSS Variable Support

Configure Tailwind IntelliSense to recognize CSS variables:

In `.vscode/settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["className=\"([^\"]*)\"", "([a-zA-Z0-9\\-:]+)"],
    ["className='([^']*)'", "([a-zA-Z0-9\\-:]+)"],
    ["className={`([^`]*)`}", "([a-zA-Z0-9\\-:]+)"]
  ]
}
```

### Custom Color Suggestions

Cursor will suggest CSS variables in Tailwind classes:

```tsx
<div className="
  bg-[var(--蓝色-blue/light/50)]
  text-[var(--灰色-dust/light/120)]
  border-[var(--灰色-dust/light/60)]
" />
```

## 📚 Documentation Lookup

### Quick Component Reference

1. **Hover over component** to see prop types and JSDoc
2. **Cmd/Ctrl + Click** on component to jump to definition
3. **Type `<ComponentName` + Space** to see all props

### README Access

```tsx
// Cursor can read component READMEs
// Ask: "Show me Button component usage examples"
// Cursor will reference: src/components/ui/Button/README.md
```

## 🚀 Workflow Optimization

### Daily Development Flow

1. **Start New Feature**
   ```
   Ask Cursor: "Create a user profile card component with avatar, name, badge, and action buttons"
   ```

2. **Review Generated Code**
   - Check it uses design tokens
   - Verify TypeScript types
   - Ensure accessibility

3. **Refine with AI**
   ```
   Ask: "Add loading state and skeleton loader"
   Ask: "Make this responsive for mobile"
   ```

4. **Generate Tests**
   ```
   Ask: "Create comprehensive tests for this component"
   ```

### Code Review with AI

Before committing:

```
Review this component for:
- Design token usage
- TypeScript correctness
- Accessibility issues
- Best practices compliance
```

## 🔧 Advanced Configuration

### Custom Code Snippets

Create `.vscode/react-component.code-snippets`:

```json
{
  "React Component with ForwardRef": {
    "prefix": "rfc",
    "body": [
      "import { forwardRef } from 'react';",
      "import type { ${1:Element}HTMLAttributes } from 'react';",
      "import { cn } from '@/utils/cn';",
      "",
      "interface ${2:ComponentName}Props extends ${1:Element}HTMLAttributes<HTML${1:Element}Element> {",
      "  $3",
      "}",
      "",
      "export const ${2:ComponentName} = forwardRef<HTML${1:Element}Element, ${2:ComponentName}Props>(",
      "  ({ className, ...props }, ref) => {",
      "    return (",
      "      <${1:div}",
      "        ref={ref}",
      "        className={cn($4, className)}",
      "        {...props}",
      "      />",
      "    );",
      "  }",
      ");",
      "",
      "${2:ComponentName}.displayName = '${2:ComponentName}';"
    ]
  }
}
```

### AI Context Files

Create `.cursor/context.md`:

```markdown
# Project Context

This is an enterprise React + TypeScript component library.

## Key Files
- Design tokens: src/tokens/
- Components: src/components/ui/
- Utilities: src/utils/
- Guidelines: guidelines/

## Standards
- All components use forwardRef
- Design tokens mandatory
- WCAG AA accessibility
- Comprehensive TypeScript types

## Reference
- Component patterns: guidelines/COMPONENTS.md
- Design system: guidelines/DESIGN_SYSTEM.md
- Best practices: guidelines/BEST_PRACTICES.md
```

## 🎓 Learning Resources

### Ask Cursor for Examples

```
Show me how to create a properly typed form component
Create a responsive grid layout using our tokens
Demonstrate proper error handling in Input component
```

### Generate Documentation

```
Create a visual component showcase page
Generate Storybook stories for all components
Write migration guide from old components
```

## 🐛 Troubleshooting

### Cursor Not Recognizing Imports

1. Reload TypeScript server: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
2. Check `tsconfig.json` has correct paths
3. Verify Vite config has matching aliases

### Tailwind IntelliSense Not Working

1. Install Tailwind CSS IntelliSense extension
2. Add experimental classRegex to settings
3. Reload VS Code window

### Component Props Not Showing

1. Ensure component has proper TypeScript types
2. Check `index.ts` exports types
3. Restart TypeScript server

## 📖 Additional Resources

- [Cursor Documentation](https://cursor.sh/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Pro Tip**: Save common prompts as comments in your code for quick access:

```tsx
// TODO: Ask Cursor to "Add dark mode support to this component"
// TODO: Ask Cursor to "Generate comprehensive tests"
// TODO: Ask Cursor to "Make this component more accessible"
```
