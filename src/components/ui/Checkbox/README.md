# Checkbox Component

## Introduction

The Checkbox component is a selection control that allows users to select one or more options from a set. Built according to the DSWebComLightV22026 design system, it supports checked, unchecked, indeterminate, and disabled states.

**Use Cases:**
- Multi-select lists
- Terms and conditions acceptance
- Feature toggles in settings
- Table row selection
- Filter options

## Usage Examples

### Basic Usage

```tsx
import { Checkbox } from '@/components/ui';

function Example() {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox 
      checked={checked}
      onChange={setChecked}
      label="I agree to the terms"
    />
  );
}
```

### Multiple Checkboxes

```tsx
import { Checkbox } from '@/components/ui';
import { useState } from 'react';

function MultipleExample() {
  const [selections, setSelections] = useState({
    option1: false,
    option2: true,
    option3: false,
  });
  
  const handleChange = (key: string) => (checked: boolean) => {
    setSelections(prev => ({ ...prev, [key]: checked }));
  };
  
  return (
    <div className="space-y-2">
      <Checkbox 
        checked={selections.option1}
        onChange={handleChange('option1')}
        label="Option 1"
      />
      <Checkbox 
        checked={selections.option2}
        onChange={handleChange('option2')}
        label="Option 2"
      />
      <Checkbox 
        checked={selections.option3}
        onChange={handleChange('option3')}
        label="Option 3"
      />
    </div>
  );
}
```

### Indeterminate State (Select All)

```tsx
import { Checkbox } from '@/components/ui';
import { useState } from 'react';

function IndeterminateExample() {
  const [checkedList, setCheckedList] = useState<string[]>(['Item 2']);
  const allItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  
  const allChecked = checkedList.length === allItems.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < allItems.length;
  
  const handleSelectAll = (checked: boolean) => {
    setCheckedList(checked ? allItems : []);
  };
  
  const handleItemChange = (item: string) => (checked: boolean) => {
    setCheckedList(prev =>
      checked
        ? [...prev, item]
        : prev.filter(i => i !== item)
    );
  };
  
  return (
    <div className="space-y-3">
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={handleSelectAll}
        label="Select All"
      />
      <div className="ml-6 space-y-2">
        {allItems.map(item => (
          <Checkbox
            key={item}
            checked={checkedList.includes(item)}
            onChange={handleItemChange(item)}
            label={item}
          />
        ))}
      </div>
    </div>
  );
}
```

### Disabled State

```tsx
import { Checkbox } from '@/components/ui';

function DisabledExample() {
  return (
    <div className="space-y-2">
      <Checkbox disabled label="Disabled unchecked" />
      <Checkbox disabled checked label="Disabled checked" />
      <Checkbox disabled indeterminate label="Disabled indeterminate" />
    </div>
  );
}
```

### Without Label

```tsx
import { Checkbox } from '@/components/ui';

function NoLabelExample() {
  return (
    <table>
      <thead>
        <tr>
          <th><Checkbox /></th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Checkbox /></td>
          <td>John Doe</td>
          <td>john@example.com</td>
        </tr>
      </tbody>
    </table>
  );
}
```

### Uncontrolled Checkbox

```tsx
import { Checkbox } from '@/components/ui';

function UncontrolledExample() {
  return (
    <Checkbox
      defaultChecked={true}
      onChange={(checked) => console.log('Checked:', checked)}
      label="Uncontrolled checkbox"
    />
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `checked` | `boolean` | - | No | Controlled checked state |
| `defaultChecked` | `boolean` | - | No | Uncontrolled initial checked state |
| `indeterminate` | `boolean` | `false` | No | Show indeterminate state (partially selected) |
| `disabled` | `boolean` | `false` | No | Disable checkbox interaction |
| `onChange` | `(checked: boolean) => void` | - | No | Callback when checked state changes |
| `label` | `ReactNode` | - | No | Label text or element |
| `className` | `string` | - | No | Additional CSS classes |
| `id` | `string` | - | No | HTML id attribute |
| `name` | `string` | - | No | HTML name attribute for forms |
| `value` | `string` | - | No | HTML value attribute |

### TypeScript Interface

```typescript
import { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  className?: string;
}
```

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `(checked: boolean) => void` | Fired when checkbox state changes. Receives boolean value. |
| `onFocus` | `(event: React.FocusEvent<HTMLInputElement>) => void` | Fired when checkbox receives focus |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | Fired when checkbox loses focus |

## Style Customization

### Using className

```tsx
<Checkbox className="my-4" label="Custom spacing" />
```

### Design Tokens Used

**Unchecked State:**
- Background: `--填充-fill/组件绑定/复选框-checkbox/未选`
- Border: `--边框-border/组件绑定/复选框-checkbox/未选`

**Hover State:**
- Background: `--填充-fill/组件绑定/复选框-checkbox/悬停`
- Border: `--边框-border/组件绑定/复选框-checkbox/悬停`

**Checked State:**
- Background: `--填充-fill/组件绑定/复选框-checkbox/选中`
- Border: Same as background
- Checkmark: White

**Disabled State:**
- Background: `--填充-fill/组件绑定/复选框-checkbox/禁用`
- Border: `--边框-border/组件绑定/复选框-checkbox/禁用`
- Checked+Disabled: `--填充-fill/组件绑定/复选框-checkbox/选中_禁用`

**Indeterminate State:**
- Background: `--填充-fill/组件绑定/复选框-checkbox/半选`
- Border: `--边框-border/组件绑定/复选框-checkbox/半选`

## Do's and Don'ts

### ✅ Do's

**Use for multiple selections**
```tsx
// ✅ Good - Multiple selections allowed
<div>
  <Checkbox label="Email notifications" />
  <Checkbox label="SMS notifications" />
  <Checkbox label="Push notifications" />
</div>
```

**Use indeterminate for "select all" scenarios**
```tsx
// ✅ Good - Shows partial selection
<Checkbox
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  label="Select All"
/>
```

**Provide clear labels**
```tsx
// ✅ Good - Clear, actionable label
<Checkbox label="I agree to the Terms of Service" />
```

**Group related checkboxes**
```tsx
// ✅ Good - Clear grouping
<fieldset>
  <legend>Notification Preferences</legend>
  <Checkbox label="Email" />
  <Checkbox label="SMS" />
  <Checkbox label="Push" />
</fieldset>
```

### ❌ Don'ts

**Don't use for single selection (use Radio)**
```tsx
// ❌ Bad - Only one option should be selected
<div>
  <Checkbox label="Option A" />
  <Checkbox label="Option B" />
</div>

// ✅ Good - Use Radio for single selection
<RadioGroup>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>
```

**Don't use vague labels**
```tsx
// ❌ Bad - Unclear what this does
<Checkbox label="Enable feature" />

// ✅ Good - Specific label
<Checkbox label="Enable dark mode" />
```

**Don't make required checkboxes unclear**
```tsx
// ❌ Bad - User doesn't know it's required
<Checkbox label="Accept terms" />

// ✅ Good - Clear that it's required
<Checkbox label="I agree to the Terms of Service *" required />
```

## Accessibility

- **Keyboard Navigation:** Can be toggled with `Space` key when focused
- **Focus Indication:** Visible focus ring appears when navigating with keyboard
- **Screen Readers:** Label is properly associated with checkbox
- **ARIA States:** `aria-checked` reflects checked/indeterminate state
- **Disabled Communication:** `aria-disabled` properly set

```tsx
// Accessible checkbox
<Checkbox
  label="Subscribe to newsletter"
  aria-describedby="newsletter-description"
/>
<p id="newsletter-description">
  Receive weekly updates about new features
</p>
```

## Common Patterns

### Terms Acceptance

```tsx
function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);
  
  return (
    <div>
      <Checkbox
        checked={accepted}
        onChange={setAccepted}
        label={
          <span>
            I agree to the{' '}
            <a href="/terms" className="underline">Terms of Service</a>
          </span>
        }
      />
      <Button disabled={!accepted}>Continue</Button>
    </div>
  );
}
```

### Table Row Selection

```tsx
function TableSelection() {
  const [selected, setSelected] = useState<number[]>([]);
  const items = [1, 2, 3, 4, 5];
  
  const allSelected = selected.length === items.length;
  const someSelected = selected.length > 0 && !allSelected;
  
  return (
    <table>
      <thead>
        <tr>
          <th>
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={(checked) =>
                setSelected(checked ? items : [])
              }
            />
          </th>
          <th>Item</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item}>
            <td>
              <Checkbox
                checked={selected.includes(item)}
                onChange={(checked) =>
                  setSelected(prev =>
                    checked
                      ? [...prev, item]
                      : prev.filter(i => i !== item)
                  )
                }
              />
            </td>
            <td>Item {item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Related Components

- [Radio](../Radio/README.md) - For single selection
- [Switch](../Switch/README.md) - For on/off toggles
- [Button](../Button/README.md) - For actions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

---

**Component Version:** 1.0.0  
**Last Updated:** 2026-05-09
