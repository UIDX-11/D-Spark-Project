# Button Component

## Introduction

The Button component is a versatile, fully-customizable button built according to the DSWebComLightV22026 design system. It supports multiple variants, sizes, loading states, and icon integration, making it suitable for all interactive actions in your application.

**Use Cases:**
- Form submissions
- Navigation actions
- Modal confirmations
- Destructive operations (delete, remove)
- Secondary actions (cancel, back)

## Usage Examples

### Basic Usage

```tsx
import { Button } from '@/components/ui';

function Example() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  );
}
```

### Variants

```tsx
import { Button } from '@/components/ui';

function VariantExample() {
  return (
    <div className="flex gap-4">
      {/* Primary action button */}
      <Button variant="main">Main Button</Button>
      
      {/* Secondary action with border */}
      <Button variant="secondary">Secondary</Button>
      
      {/* Text-only button for low emphasis */}
      <Button variant="text">Text Button</Button>
      
      {/* Facial button with background */}
      <Button variant="facial">Facial Button</Button>
      
      {/* Virtual button with dashed border */}
      <Button variant="virtual">Virtual Button</Button>
    </div>
  );
}
```

### Danger Actions

```tsx
import { Button } from '@/components/ui';

function DangerExample() {
  return (
    <div className="flex gap-4">
      <Button variant="main" buttonType="danger">
        Delete
      </Button>
      <Button variant="secondary" buttonType="danger">
        Remove
      </Button>
      <Button variant="text" buttonType="danger">
        Discard
      </Button>
    </div>
  );
}
```

### Sizes

```tsx
import { Button } from '@/components/ui';

function SizeExample() {
  return (
    <div className="flex items-center gap-4">
      <Button size="small">Small (28px)</Button>
      <Button size="medium">Medium (32px)</Button>
      <Button size="large">Large (40px)</Button>
    </div>
  );
}
```

### With Icons

```tsx
import { Button } from '@/components/ui';
import { Download, ChevronRight, Plus } from 'lucide-react';

function IconExample() {
  return (
    <div className="flex gap-4">
      {/* Icon on the left */}
      <Button icon={<Download className="w-4 h-4" />} iconPosition="left">
        Download
      </Button>
      
      {/* Icon on the right */}
      <Button icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
        Next
      </Button>
      
      {/* Icon only (use aria-label for accessibility) */}
      <Button icon={<Plus className="w-4 h-4" />} aria-label="Add item" />
    </div>
  );
}
```

### Loading State

```tsx
import { Button } from '@/components/ui';
import { useState } from 'react';

function LoadingExample() {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    try {
      await someAsyncOperation();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button loading={loading} onClick={handleClick}>
      {loading ? 'Saving...' : 'Save'}
    </Button>
  );
}
```

### Disabled State

```tsx
import { Button } from '@/components/ui';

function DisabledExample() {
  return (
    <div className="flex gap-4">
      <Button disabled>Disabled Button</Button>
      <Button variant="main" disabled>Main Disabled</Button>
      <Button variant="secondary" disabled>Secondary Disabled</Button>
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'main' \| 'secondary' \| 'text' \| 'facial' \| 'virtual'` | `'main'` | No | Button visual variant |
| `buttonType` | `'default' \| 'danger'` | `'default'` | No | Button semantic type |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Button size (height and padding) |
| `loading` | `boolean` | `false` | No | Show loading spinner |
| `disabled` | `boolean` | `false` | No | Disable button interaction |
| `icon` | `ReactNode` | - | No | Icon element to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | No | Position of the icon |
| `children` | `ReactNode` | - | Yes | Button text/content |
| `className` | `string` | - | No | Additional CSS classes |
| `onClick` | `(e: MouseEvent) => void` | - | No | Click event handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | HTML button type |

### TypeScript Interface

```typescript
import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'main' | 'secondary' | 'text' | 'facial' | 'virtual';
export type ButtonType = 'default' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonType?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}
```

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | Fired when button is clicked |
| `onFocus` | `(event: React.FocusEvent<HTMLButtonElement>) => void` | Fired when button receives focus |
| `onBlur` | `(event: React.FocusEvent<HTMLButtonElement>) => void` | Fired when button loses focus |
| `onMouseEnter` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | Fired when mouse enters button |
| `onMouseLeave` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | Fired when mouse leaves button |

All standard HTML button events are supported.

## Style Customization

### Using className

```tsx
<Button className="w-full">
  Full Width Button
</Button>

<Button className="rounded-full px-8">
  Custom Styled Button
</Button>
```

### Design Tokens Used

The Button component uses the following DSWebComLightV22026 design tokens:

**Main Button (default):**
- Background: `--填充-fill/组件绑定/按钮-button/主按钮-main/默认`
- Hover: `--填充-fill/组件绑定/按钮-button/主按钮-main/悬停`
- Active: `--填充-fill/组件绑定/按钮-button/主按钮-main/点击`
- Disabled: `--填充-fill/组件绑定/按钮-button/主按钮-main/禁用`
- Text: `--文字&图标-text&icon/无组件绑定/反强调-primary-reverse`

**Secondary Button:**
- Border: `--边框-border/组件绑定/按钮-button/辅助按钮-secondary/常规`
- Hover: `--填充-fill/组件绑定/按钮-button/辅助按钮-secondary/悬停`
- Active: `--填充-fill/组件绑定/按钮-button/辅助按钮-secondary/激活`

**Danger Variants:**
- Main: `--危险色danger/global-light/50`, `--危险色danger/global-light/40`, etc.
- Text color: `--危险色danger/global-light/50`

### Overriding Styles

```tsx
// Custom background (not recommended - use variants instead)
<Button style={{ backgroundColor: 'var(--品牌色-brand/global-light/40)' }}>
  Custom Color
</Button>

// Custom size
<Button style={{ height: '48px', padding: '0 24px' }}>
  Custom Size
</Button>
```

## Do's and Don'ts

### ✅ Do's

**Use appropriate variants for hierarchy**
```tsx
// ✅ Good - Clear visual hierarchy
<Modal>
  <Button variant="main">Confirm</Button>
  <Button variant="secondary">Cancel</Button>
</Modal>
```

**Use buttonType="danger" for destructive actions**
```tsx
// ✅ Good - Clear warning for destructive action
<Button variant="main" buttonType="danger">
  Delete Account
</Button>
```

**Provide loading feedback for async operations**
```tsx
// ✅ Good - User knows something is happening
<Button loading={isSubmitting} onClick={handleSubmit}>
  Submit Form
</Button>
```

**Use icon buttons with aria-label**
```tsx
// ✅ Good - Accessible to screen readers
<Button icon={<X />} aria-label="Close dialog" />
```

**Disable buttons when action is not available**
```tsx
// ✅ Good - Prevents invalid actions
<Button disabled={!formIsValid}>
  Submit
</Button>
```

### ❌ Don'ts

**Don't use multiple main buttons in the same context**
```tsx
// ❌ Bad - Confusing which action is primary
<div>
  <Button variant="main">Action 1</Button>
  <Button variant="main">Action 2</Button>
  <Button variant="main">Action 3</Button>
</div>

// ✅ Good - Clear primary action
<div>
  <Button variant="main">Primary Action</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="text">Tertiary</Button>
</div>
```

**Don't use danger buttons for non-destructive actions**
```tsx
// ❌ Bad - Misleading color for safe action
<Button buttonType="danger">
  Download Report
</Button>

// ✅ Good - Danger only for destructive actions
<Button buttonType="danger">
  Delete Report
</Button>
```

**Don't use text that doesn't describe the action**
```tsx
// ❌ Bad - Vague action
<Button>Click Here</Button>
<Button>OK</Button>

// ✅ Good - Clear action
<Button>Save Changes</Button>
<Button>Confirm</Button>
```

**Don't override design tokens with arbitrary colors**
```tsx
// ❌ Bad - Breaks design system consistency
<Button style={{ backgroundColor: '#ff0000' }}>
  Delete
</Button>

// ✅ Good - Use design system variants
<Button variant="main" buttonType="danger">
  Delete
</Button>
```

**Don't create overly long button text**
```tsx
// ❌ Bad - Too long
<Button>
  Click This Button To Download The Complete Monthly Sales Report
</Button>

// ✅ Good - Concise
<Button icon={<Download />}>
  Download Report
</Button>
```

## Accessibility

- **Keyboard Navigation:** Buttons are focusable and can be activated with `Enter` or `Space`
- **Focus Indication:** Visible focus ring appears when navigating with keyboard
- **Disabled State:** Properly communicated to assistive technologies with `aria-disabled`
- **Loading State:** Button is disabled during loading to prevent duplicate submissions
- **Icon-Only Buttons:** Always provide `aria-label` for screen readers

```tsx
// Accessible icon button
<Button 
  icon={<Settings />} 
  aria-label="Open settings"
  onClick={openSettings}
/>

// Accessible loading state
<Button loading={isLoading}>
  {isLoading ? 'Saving...' : 'Save Changes'}
</Button>
```

## Related Components

- [Input](../Input/README.md) - Often used together in forms
- [Modal](../Modal/README.md) - Buttons commonly appear in modal footers
- [Space](../Space/README.md) - Use to arrange multiple buttons
- [Tooltip](../Tooltip/README.md) - Add helpful hints to buttons

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Supports all modern browsers with CSS custom properties

---

**Component Version:** 1.0.0  
**Last Updated:** 2026-05-09
