# Best Practices

Enterprise-level coding patterns and conventions for the component library.

## 📋 Table of Contents

1. [Component Development](#component-development)
2. [TypeScript Patterns](#typescript-patterns)
3. [Styling Guidelines](#styling-guidelines)
4. [State Management](#state-management)
5. [Performance](#performance)
6. [Accessibility](#accessibility)
7. [Testing](#testing)
8. [File Organization](#file-organization)

---

## Component Development

### Use forwardRef for All Components

Forward refs to enable imperative API access:

```tsx
import { forwardRef } from 'react';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';
```

### Set displayName

Always set `displayName` for better debugging:

```tsx
Button.displayName = 'Button';
```

### Destructure Props Properly

```tsx
// ✅ Good - destructure with defaults
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, ...props }, ref) => {
    // ...
  }
);

// ❌ Bad - no defaults, accessing props directly
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button variant={props.variant} />;  // ❌
  }
);
```

### Composition Over Configuration

```tsx
// ✅ Good - composable
<Card>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    Content
  </CardBody>
</Card>

// ❌ Bad - too many props
<Card
  title="Title"
  content="Content"
  showHeader={true}
  headerAlign="left"
/>
```

---

## TypeScript Patterns

### Extend HTML Element Props

```tsx
import { ButtonHTMLAttributes } from 'react';

// ✅ Good - extends native props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

// ❌ Bad - reimplementing props
interface ButtonProps {
  onClick?: () => void;
  className?: string;
  // ... tedious and incomplete
}
```

### Use Type Exports

```tsx
// Component file
export type ButtonVariant = 'primary' | 'secondary';
export interface ButtonProps {
  variant?: ButtonVariant;
}

// Index file
export { Button } from './Button';
export type { ButtonProps, ButtonVariant } from './Button';
```

### Avoid `any`

```tsx
// ✅ Good - properly typed
interface SelectProps {
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

// ❌ Bad - loses type safety
interface SelectProps {
  options: any;
  onChange: any;
}
```

### Use `as const` for Constants

```tsx
// ✅ Good - literal types
export const SIZES = ['sm', 'md', 'lg'] as const;
export type Size = typeof SIZES[number];  // 'sm' | 'md' | 'lg'

// ❌ Bad - string type
export const SIZES = ['sm', 'md', 'lg'];
export type Size = string;  // Too broad
```

---

## Styling Guidelines

### Never Hardcode Values

```tsx
// ✅ Good - uses tokens
<div className="bg-[var(--蓝色-blue/light/50)] p-4 rounded-lg" />

// ❌ Bad - hardcoded
<div className="bg-blue-500 p-[16px] rounded-[8px]" />
```

### Use the `cn` Utility

```tsx
import { cn } from '@/utils/cn';

// ✅ Good - composable classes
<button
  className={cn(
    'base-styles',
    variant === 'primary' && 'primary-styles',
    disabled && 'disabled-styles',
    className  // Allow overrides
  )}
/>

// ❌ Bad - string concatenation
<button
  className={
    'base-styles' +
    (variant === 'primary' ? ' primary-styles' : '') +
    (disabled ? ' disabled-styles' : '')
  }
/>
```

### Separate Style Variants

```tsx
// ✅ Good - organized style objects
const variants = {
  primary: 'bg-blue text-white',
  secondary: 'bg-gray text-black',
};

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
};

<button className={cn(variants[variant], sizes[size])} />

// ❌ Bad - inline conditionals
<button
  className={
    variant === 'primary'
      ? 'bg-blue text-white px-4 py-2'
      : 'bg-gray text-black px-4 py-2'
  }
/>
```

### Mobile-First Responsive Design

```tsx
// ✅ Good - mobile first, progressive enhancement
<div className="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4 md:gap-6 lg:gap-8
" />

// ❌ Bad - desktop first
<div className="
  grid-cols-3
  md:grid-cols-2
  sm:grid-cols-1
" />
```

---

## State Management

### Controlled vs Uncontrolled

```tsx
// ✅ Controlled - recommended for forms
function ControlledInput() {
  const [value, setValue] = useState('');
  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
}

// ✅ Uncontrolled - good for simple cases
function UncontrolledInput() {
  return <Input defaultValue="initial" />;
}
```

### Support Both Patterns

```tsx
interface InputProps {
  value?: string;           // Controlled
  defaultValue?: string;    // Uncontrolled
  onChange?: (value: string) => void;
}

export const Input = ({ value, defaultValue, onChange }: InputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  
  const currentValue = isControlled ? value : internalValue;
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
  
  return <input value={currentValue} onChange={handleChange} />;
};
```

### Use useId for Accessibility

```tsx
import { useId } from 'react';

// ✅ Good - unique IDs
export const Input = ({ label, id: providedId }: InputProps) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
};
```

---

## Performance

### Avoid Unnecessary Re-renders

```tsx
// ✅ Good - memoized callback
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

// ❌ Bad - new function every render
const handleClick = () => {
  console.log('clicked');
};
```

### Lazy Load Heavy Components

```tsx
import { lazy, Suspense } from 'react';

// ✅ Good - code splitting
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
```

### Avoid Inline Object/Array Creation

```tsx
// ✅ Good - stable reference
const DEFAULT_OPTIONS = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
];

<Select options={DEFAULT_OPTIONS} />

// ❌ Bad - new array every render
<Select options={[
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
]} />
```

---

## Accessibility

### Use Semantic HTML

```tsx
// ✅ Good
<button onClick={handleClick}>Click</button>
<nav><a href="/home">Home</a></nav>

// ❌ Bad
<div onClick={handleClick}>Click</div>  // Not keyboard accessible
<div><span onClick={navigate}>Home</span></div>  // Not semantic
```

### ARIA Attributes

```tsx
// ✅ Good - proper ARIA
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-expanded={isOpen}
  aria-controls="menu-id"
>
  <IconX />
</button>

// Error states
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? "error-id" : undefined}
/>
{hasError && <p id="error-id">{errorMessage}</p>}
```

### Focus Management

```tsx
// ✅ Good - visible focus
<button className="focus-visible:ring-2 focus-visible:ring-blue" />

// ✅ Good - skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Color Contrast

```tsx
// ✅ Good - WCAG AA compliant
<p className="text-[var(--灰色-dust/light/120)]">  {/* #222 on white */}
  High contrast text
</p>

// ❌ Bad - poor contrast
<p className="text-[var(--灰色-dust/light/80)]">  {/* #BFBFBF on white */}
  Low contrast text
</p>
```

---

## Testing

### Component Testing Structure

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## File Organization

### Component Folder Structure

```
Button/
├── index.tsx              # Component implementation
├── Button.types.ts        # TypeScript types
├── Button.test.tsx        # Unit tests
└── README.md              # Usage documentation
```

### Naming Conventions

```
PascalCase - Components, Types, Interfaces
camelCase  - Variables, functions, props
kebab-case - File names (except components)
UPPER_CASE - Constants, enums
```

### Import Order

```tsx
// 1. External dependencies
import { forwardRef, useState } from 'react';

// 2. Internal dependencies (absolute imports)
import { cn } from '@/utils/cn';
import { colors } from '@/tokens';

// 3. Types
import type { ButtonProps } from './Button.types';

// 4. Relative imports
import './styles.css';
```

---

## Code Review Checklist

Before submitting code, verify:

- [ ] TypeScript types are properly defined
- [ ] Component uses forwardRef
- [ ] displayName is set
- [ ] Design tokens are used (no hardcoded values)
- [ ] Accessibility attributes are present
- [ ] Component is responsive
- [ ] Props are properly documented
- [ ] README is updated
- [ ] Tests are written and passing
- [ ] No console.log or debug code
- [ ] Code follows established patterns

---

## Anti-Patterns to Avoid

### ❌ Prop Drilling

```tsx
// Bad - drilling props through multiple levels
<Parent>
  <Child user={user}>
    <GrandChild user={user}>
      <GreatGrandChild user={user} />
    </GrandChild>
  </Child>
</Parent>

// ✅ Better - use context
const UserContext = createContext();
<UserContext.Provider value={user}>
  <Parent>
    <Child>
      <GreatGrandChild />  // useContext(UserContext)
    </Child>
  </Parent>
</UserContext.Provider>
```

### ❌ God Components

```tsx
// Bad - component does too much
function Dashboard() {
  // 500 lines of JSX
  // Multiple responsibilities
  // Hard to test and maintain
}

// ✅ Better - split into smaller components
function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardMetrics />
      <DashboardCharts />
      <DashboardTable />
    </>
  );
}
```

### ❌ Premature Optimization

```tsx
// Bad - over-optimizing before measuring
const MemoizedEverything = memo(
  useMemo(
    useCallback(() => {
      // Simple component
    }, [])
  )
);

// ✅ Better - optimize when needed
function SimpleComponent() {
  // Profile first, then optimize
}
```

---

## Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
