# Input Component

## Introduction

The Input component is a flexible text input field built according to the DSWebComLightV22026 design system. It supports prefix/suffix elements, clear functionality, validation states, and full keyboard accessibility.

**Use Cases:**
- Form fields (text, email, password, number, etc.)
- Search boxes
- Inline editing
- Data entry fields
- Filter inputs

## Usage Examples

### Basic Usage

```tsx
import { Input } from '@/components/ui';

function Example() {
  const [value, setValue] = useState('');
  
  return (
    <Input 
      placeholder="Enter your name..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Different Sizes

```tsx
import { Input } from '@/components/ui';

function SizeExample() {
  return (
    <div className="space-y-4">
      <Input size="small" placeholder="Small input (28px)" />
      <Input size="medium" placeholder="Medium input (32px)" />
      <Input size="large" placeholder="Large input (40px)" />
    </div>
  );
}
```

### With Prefix and Suffix

```tsx
import { Input } from '@/components/ui';
import { Search, Mail, DollarSign } from 'lucide-react';

function PrefixSuffixExample() {
  return (
    <div className="space-y-4">
      {/* Prefix icon */}
      <Input 
        prefix={<Search className="w-4 h-4" />}
        placeholder="Search..."
      />
      
      {/* Suffix text */}
      <Input 
        suffix="@company.com"
        placeholder="username"
      />
      
      {/* Both prefix and suffix */}
      <Input 
        prefix={<DollarSign className="w-4 h-4" />}
        suffix="USD"
        placeholder="0.00"
        type="number"
      />
      
      {/* Suffix icon */}
      <Input 
        suffix={<Mail className="w-4 h-4" />}
        placeholder="Email address"
        type="email"
      />
    </div>
  );
}
```

### Validation States

```tsx
import { Input } from '@/components/ui';

function ValidationExample() {
  return (
    <div className="space-y-4">
      {/* Default state */}
      <Input 
        status="default"
        placeholder="Default input"
      />
      
      {/* Error state */}
      <Input 
        status="error"
        placeholder="Invalid email"
        defaultValue="invalid-email"
      />
      
      {/* Warning state */}
      <Input 
        status="warning"
        placeholder="Weak password"
        type="password"
      />
      
      {/* Success state */}
      <Input 
        status="success"
        placeholder="Available username"
        defaultValue="john_doe"
      />
    </div>
  );
}
```

### Clearable Input

```tsx
import { Input } from '@/components/ui';
import { useState } from 'react';

function ClearableExample() {
  const [value, setValue] = useState('');
  
  return (
    <Input
      allowClear
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      placeholder="Type something and clear it..."
    />
  );
}
```

### Controlled vs Uncontrolled

```tsx
import { Input } from '@/components/ui';
import { useState } from 'react';

function ControlledExample() {
  // Controlled input
  const [controlled, setControlled] = useState('');
  
  return (
    <div className="space-y-4">
      {/* Controlled */}
      <div>
        <label>Controlled Input</label>
        <Input 
          value={controlled}
          onChange={(e) => setControlled(e.target.value)}
        />
        <p>Value: {controlled}</p>
      </div>
      
      {/* Uncontrolled */}
      <div>
        <label>Uncontrolled Input</label>
        <Input 
          defaultValue="Initial value"
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    </div>
  );
}
```

### Different Input Types

```tsx
import { Input } from '@/components/ui';

function TypeExample() {
  return (
    <div className="space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="url" placeholder="URL input" />
      <Input type="tel" placeholder="Telephone input" />
      <Input type="search" placeholder="Search input" />
    </div>
  );
}
```

### Disabled State

```tsx
import { Input } from '@/components/ui';

function DisabledExample() {
  return (
    <div className="space-y-4">
      <Input disabled placeholder="Disabled input" />
      <Input disabled value="Read-only value" />
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Input field size |
| `status` | `'default' \| 'error' \| 'warning' \| 'success'` | `'default'` | No | Validation status |
| `prefix` | `ReactNode` | - | No | Element displayed at the start |
| `suffix` | `ReactNode` | - | No | Element displayed at the end |
| `allowClear` | `boolean` | `false` | No | Show clear button when input has value |
| `onClear` | `() => void` | - | No | Callback when clear button is clicked |
| `disabled` | `boolean` | `false` | No | Disable the input |
| `value` | `string` | - | No | Controlled input value |
| `defaultValue` | `string` | - | No | Uncontrolled initial value |
| `onChange` | `(e: ChangeEvent) => void` | - | No | Change event handler |
| `placeholder` | `string` | - | No | Placeholder text |
| `type` | `string` | `'text'` | No | HTML input type |
| `className` | `string` | - | No | Additional CSS classes |
| `maxLength` | `number` | - | No | Maximum character length |
| `readOnly` | `boolean` | `false` | No | Make input read-only |
| `required` | `boolean` | `false` | No | Mark as required field |

### TypeScript Interface

```typescript
import { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'small' | 'medium' | 'large';
export type InputStatus = 'default' | 'error' | 'warning' | 'success';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  status?: InputStatus;
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: boolean;
  onClear?: () => void;
  className?: string;
}
```

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | Fired when input value changes |
| `onClear` | `() => void` | Fired when clear button is clicked |
| `onFocus` | `(event: React.FocusEvent<HTMLInputElement>) => void` | Fired when input receives focus |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | Fired when input loses focus |
| `onKeyDown` | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | Fired when key is pressed |
| `onKeyUp` | `(event: React.KeyboardEvent<HTMLInputElement>) => void` | Fired when key is released |
| `onPaste` | `(event: React.ClipboardEvent<HTMLInputElement>) => void` | Fired when content is pasted |

All standard HTML input events are supported.

## Style Customization

### Using className

```tsx
<Input className="w-full" placeholder="Full width" />
<Input className="max-w-xs" placeholder="Max width 320px" />
```

### Design Tokens Used

**Border Colors:**
- Default: `--边框-border/无组件绑定/描边_常规`
- Hover: `--边框-border/无组件绑定/描边_悬停`
- Focus: `--边框-border/无组件绑定/描边_强调`
- Disabled: `--边框-border/无组件绑定/描边_禁用`

**Validation States:**
- Error: `--危险色danger/global-light/50`
- Warning: `--告警色warning/global-light/50`
- Success: `--成功色success/global-light/50`

**Background:**
- Default: `--填充-fill/无组件绑定/卡片背景_100-card-background`
- Disabled: `--填充-fill/无组件绑定/禁用-disabled`

**Text Colors:**
- Input text: `--文字&图标-text&icon/无组件绑定/强调-primary`
- Placeholder: `--文字&图标-text&icon/无组件绑定/辅助-territory`
- Disabled: `--文字&图标-text&icon/无组件绑定/禁用-disabled`

## Do's and Don'ts

### ✅ Do's

**Use appropriate input types**
```tsx
// ✅ Good - Correct type for data
<Input type="email" placeholder="Email" />
<Input type="tel" placeholder="Phone" />
<Input type="number" placeholder="Age" />
```

**Provide clear placeholders**
```tsx
// ✅ Good - Helpful placeholder
<Input placeholder="e.g., john.doe@example.com" type="email" />
```

**Show validation states**
```tsx
// ✅ Good - Clear feedback
<div>
  <Input 
    status={emailError ? 'error' : 'success'}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  {emailError && <p className="text-error">{emailError}</p>}
</div>
```

**Use prefix/suffix meaningfully**
```tsx
// ✅ Good - Helpful context
<Input prefix="https://" placeholder="example.com" />
<Input suffix="kg" placeholder="Weight" type="number" />
```

**Implement clear button for search**
```tsx
// ✅ Good - Easy to clear search
<Input
  prefix={<Search />}
  allowClear
  placeholder="Search..."
/>
```

### ❌ Don'ts

**Don't use vague placeholders**
```tsx
// ❌ Bad - Not helpful
<Input placeholder="Enter value" />

// ✅ Good - Specific
<Input placeholder="Enter your email address" />
```

**Don't use input for large text**
```tsx
// ❌ Bad - Use textarea instead
<Input placeholder="Enter your life story..." />

// ✅ Good - Use appropriate element
<textarea placeholder="Tell us about yourself..." />
```

**Don't forget validation feedback**
```tsx
// ❌ Bad - No visual feedback
<Input value={invalidEmail} />

// ✅ Good - Show error state
<Input status="error" value={invalidEmail} />
<span className="text-error">Invalid email format</span>
```

**Don't use disabled when you mean readOnly**
```tsx
// ❌ Bad - User can't copy value
<Input disabled value="ORDER-12345" />

// ✅ Good - User can select/copy
<Input readOnly value="ORDER-12345" />
```

**Don't mix controlled and uncontrolled**
```tsx
// ❌ Bad - Mixing patterns causes issues
<Input value={value} defaultValue="initial" />

// ✅ Good - Pick one pattern
<Input value={value} onChange={handleChange} />
// OR
<Input defaultValue="initial" />
```

## Accessibility

- **Label Association:** Always pair with a `<label>` or use `aria-label`
- **Required Fields:** Use `required` prop and indicate visually
- **Error Messages:** Associate with `aria-describedby` for errors
- **Keyboard Navigation:** Full keyboard support (Tab, Shift+Tab, etc.)
- **Focus Management:** Visible focus ring when navigating with keyboard

```tsx
// Accessible form field
<div>
  <label htmlFor="email-input">Email Address *</label>
  <Input
    id="email-input"
    type="email"
    required
    status={emailError ? 'error' : 'default'}
    aria-describedby={emailError ? 'email-error' : undefined}
    aria-invalid={!!emailError}
  />
  {emailError && (
    <span id="email-error" role="alert">
      {emailError}
    </span>
  )}
</div>
```

## Common Patterns

### Search Input

```tsx
import { Input } from '@/components/ui';
import { Search } from 'lucide-react';

function SearchInput() {
  const [query, setQuery] = useState('');
  
  return (
    <Input
      prefix={<Search className="w-4 h-4" />}
      allowClear
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClear={() => setQuery('')}
    />
  );
}
```

### Password Input with Toggle

```tsx
import { Input } from '@/components/ui';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

function PasswordInput() {
  const [visible, setVisible] = useState(false);
  
  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder="Password"
      suffix={
        <button onClick={() => setVisible(!visible)}>
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}
```

### Numeric Input with Unit

```tsx
import { Input } from '@/components/ui';

function NumericInput() {
  return (
    <Input
      type="number"
      suffix="MB"
      placeholder="0"
      min="0"
      max="1000"
      step="10"
    />
  );
}
```

## Related Components

- [Button](../Button/README.md) - Often used together in forms
- [Checkbox](../Checkbox/README.md) - Alternative form input
- [Radio](../Radio/README.md) - Alternative form input
- [Space](../Space/README.md) - Arrange form fields

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Supports all modern browsers with CSS custom properties

---

**Component Version:** 1.0.0  
**Last Updated:** 2026-05-09
