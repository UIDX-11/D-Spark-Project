# Radio Component

## Introduction

The Radio component provides single-selection functionality from a set of options. Used with RadioGroup, it ensures only one option can be selected at a time, following the DSWebComLightV22026 design system.

**Use Cases:**
- Single-choice questions
- Payment method selection
- Shipping options
- Settings with mutually exclusive options
- Filter criteria

## Usage Examples

### Basic Radio Group

```tsx
import { Radio, RadioGroup } from '@/components/ui';
import { useState } from 'react';

function Example() {
  const [value, setValue] = useState('option1');
  
  return (
    <RadioGroup name="options" value={value} onChange={setValue}>
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  );
}
```

### Horizontal Layout

```tsx
import { Radio, RadioGroup } from '@/components/ui';

function HorizontalExample() {
  const [selected, setSelected] = useState('card');
  
  return (
    <RadioGroup 
      name="payment" 
      value={selected} 
      onChange={setSelected}
      direction="horizontal"
    >
      <Radio value="card" label="Credit Card" />
      <Radio value="paypal" label="PayPal" />
      <Radio value="bank" label="Bank Transfer" />
    </RadioGroup>
  );
}
```

### Vertical Layout (Default)

```tsx
import { Radio, RadioGroup } from '@/components/ui';

function VerticalExample() {
  const [shipping, setShipping] = useState('standard');
  
  return (
    <RadioGroup 
      name="shipping" 
      value={shipping} 
      onChange={setShipping}
      direction="vertical"
    >
      <Radio value="standard" label="Standard (5-7 days) - Free" />
      <Radio value="express" label="Express (2-3 days) - $10" />
      <Radio value="overnight" label="Overnight (1 day) - $25" />
    </RadioGroup>
  );
}
```

### Disabled State

```tsx
import { Radio, RadioGroup } from '@/components/ui';

function DisabledExample() {
  return (
    <div className="space-y-6">
      {/* Entire group disabled */}
      <RadioGroup name="disabled-group" disabled defaultValue="option1">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
      </RadioGroup>
      
      {/* Individual radio disabled */}
      <RadioGroup name="mixed" defaultValue="available">
        <Radio value="available" label="Available option" />
        <Radio value="unavailable" label="Unavailable option" disabled />
        <Radio value="another" label="Another option" />
      </RadioGroup>
    </div>
  );
}
```

### Uncontrolled Radio Group

```tsx
import { Radio, RadioGroup } from '@/components/ui';

function UncontrolledExample() {
  return (
    <RadioGroup
      name="uncontrolled"
      defaultValue="option2"
      onChange={(value) => console.log('Selected:', value)}
    >
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  );
}
```

### With Rich Labels

```tsx
import { Radio, RadioGroup } from '@/components/ui';

function RichLabelExample() {
  const [plan, setPlan] = useState('pro');
  
  return (
    <RadioGroup name="plan" value={plan} onChange={setPlan}>
      <Radio
        value="free"
        label={
          <div>
            <div className="font-semibold">Free Plan</div>
            <div className="text-sm text-gray-500">For individuals</div>
          </div>
        }
      />
      <Radio
        value="pro"
        label={
          <div>
            <div className="font-semibold">Pro Plan - $29/mo</div>
            <div className="text-sm text-gray-500">For professionals</div>
          </div>
        }
      />
      <Radio
        value="enterprise"
        label={
          <div>
            <div className="font-semibold">Enterprise - Custom</div>
            <div className="text-sm text-gray-500">For organizations</div>
          </div>
        }
      />
    </RadioGroup>
  );
}
```

### Standalone Radio (Without Group)

```tsx
import { Radio } from '@/components/ui';
import { useState } from 'react';

function StandaloneExample() {
  const [checked, setChecked] = useState(false);
  
  return (
    <Radio
      value="standalone"
      checked={checked}
      onChange={() => setChecked(true)}
      label="Standalone radio button"
    />
  );
}
```

## API Reference

### Radio Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | - | **Yes** | Radio button value (must be unique within group) |
| `checked` | `boolean` | - | No | Controlled checked state (when used standalone) |
| `disabled` | `boolean` | `false` | No | Disable the radio button |
| `label` | `ReactNode` | - | No | Label text or element |
| `onChange` | `(e: ChangeEvent) => void` | - | No | Change event handler (when standalone) |
| `className` | `string` | - | No | Additional CSS classes |
| `name` | `string` | - | No | HTML name attribute (automatically set by RadioGroup) |

### RadioGroup Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | `string` | - | **Yes** | HTML name attribute for the radio group |
| `value` | `string` | - | No | Controlled selected value |
| `defaultValue` | `string` | - | No | Uncontrolled default selected value |
| `onChange` | `(value: string) => void` | - | No | Callback when selection changes. Receives selected value. |
| `disabled` | `boolean` | `false` | No | Disable all radio buttons in the group |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | No | Layout direction |
| `children` | `ReactNode` | - | **Yes** | Radio components |
| `className` | `string` | - | No | Additional CSS classes |

### TypeScript Interfaces

```typescript
import { InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  checked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  className?: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}
```

## Events

### Radio Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | Fired when radio state changes |

### RadioGroup Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `(value: string) => void` | Fired when selection changes. Receives the selected value. |

## Style Customization

### Design Tokens Used

**Unchecked State:**
- Background: `--填充-fill/组件绑定/单选框-radio/未选`
- Border: `--边框-border/组件绑定/单选框-radio/未选`

**Hover State:**
- Border: `--边框-border/组件绑定/单选框-radio/悬停`

**Checked State:**
- Background: `--填充-fill/组件绑定/单选框-radio/选中`
- Border: `--边框-border/组件绑定/单选框-radio/选中`
- Inner dot: Same as border

**Disabled State:**
- Background: `--填充-fill/组件绑定/单选框-radio/禁用`
- Border: `--边框-border/组件绑定/单选框-radio/禁用`
- Checked+Disabled: `--填充-fill/组件绑定/单选框-radio/选中_禁用`

## Do's and Don'ts

### ✅ Do's

**Use for single selection**
```tsx
// ✅ Good - Mutually exclusive options
<RadioGroup name="size" value={size} onChange={setSize}>
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>
```

**Provide clear labels**
```tsx
// ✅ Good - Descriptive labels
<RadioGroup name="shipping">
  <Radio value="standard" label="Standard Shipping (5-7 days)" />
  <Radio value="express" label="Express Shipping (2-3 days)" />
</RadioGroup>
```

**Pre-select default option when appropriate**
```tsx
// ✅ Good - Sensible default
<RadioGroup name="theme" defaultValue="system">
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
  <Radio value="system" label="System" />
</RadioGroup>
```

### ❌ Don'ts

**Don't use for multiple selections**
```tsx
// ❌ Bad - Use Checkbox instead
<RadioGroup name="features">
  <Radio value="feature1" label="Feature 1" />
  <Radio value="feature2" label="Feature 2" />
</RadioGroup>

// ✅ Good - Use Checkbox for multiple selections
<div>
  <Checkbox label="Feature 1" />
  <Checkbox label="Feature 2" />
</div>
```

**Don't use too many options**
```tsx
// ❌ Bad - Too many radios (use Select instead)
<RadioGroup name="country">
  {/* 195 countries... */}
</RadioGroup>

// ✅ Good - Use Select for many options
<Select options={countries} />
```

**Don't forget the name attribute**
```tsx
// ❌ Bad - Missing name
<RadioGroup>
  <Radio value="a" />
</RadioGroup>

// ✅ Good - Include name
<RadioGroup name="options">
  <Radio value="a" />
</RadioGroup>
```

## Accessibility

- **Keyboard Navigation:** Navigate with arrow keys within group
- **Focus Management:** First/last radio with Home/End keys
- **Screen Readers:** Properly announces radio group and selected state
- **ARIA Attributes:** `role="radio"`, `aria-checked` automatically set
- **Required Fields:** Use `required` attribute on RadioGroup

```tsx
// Accessible radio group
<fieldset>
  <legend>Select your plan *</legend>
  <RadioGroup name="plan" value={plan} onChange={setPlan}>
    <Radio value="free" label="Free Plan" />
    <Radio value="pro" label="Pro Plan" />
  </RadioGroup>
</fieldset>
```

## Related Components

- [Checkbox](../Checkbox/README.md) - For multiple selections
- [Switch](../Switch/README.md) - For on/off toggles
- [Button](../Button/README.md) - For actions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

---

**Component Version:** 1.0.0  
**Last Updated:** 2026-05-09
