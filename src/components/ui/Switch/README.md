# Switch Component

## Introduction

The Switch component is a toggle control for enabling/disabling features or settings. It represents an immediate state change, following the DSWebComLightV22026 design system.

**Use Cases:**
- Feature toggles (enable/disable features)
- Settings (on/off preferences)
- Visibility controls
- Status toggles

## Usage Examples

### Basic Usage

```tsx
import { Switch } from '@/components/ui';
import { useState } from 'react';

function Example() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      label="Enable notifications"
    />
  );
}
```

### Sizes

```tsx
import { Switch } from '@/components/ui';

function SizeExample() {
  return (
    <div className="space-y-4">
      <Switch size="small" label="Small switch" />
      <Switch size="medium" label="Medium switch" />
    </div>
  );
}
```

### Settings Panel

```tsx
import { Switch, Space, Card, CardBody } from '@/components/ui';
import { useState } from 'react';

function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: true,
    autoSave: true,
  });
  
  const toggle = (key: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [key]: checked }));
  };
  
  return (
    <Card>
      <CardBody>
        <Space direction="vertical" size="large">
          <Switch
            checked={settings.notifications}
            onChange={toggle('notifications')}
            label="Push Notifications"
          />
          <Switch
            checked={settings.emailUpdates}
            onChange={toggle('emailUpdates')}
            label="Email Updates"
          />
          <Switch
            checked={settings.darkMode}
            onChange={toggle('darkMode')}
            label="Dark Mode"
          />
          <Switch
            checked={settings.autoSave}
            onChange={toggle('autoSave')}
            label="Auto Save"
          />
        </Space>
      </CardBody>
    </Card>
  );
}
```

### Disabled State

```tsx
import { Switch } from '@/components/ui';

function DisabledExample() {
  return (
    <div className="space-y-4">
      <Switch disabled label="Disabled (off)" />
      <Switch disabled checked label="Disabled (on)" />
    </div>
  );
}
```

### Uncontrolled Switch

```tsx
import { Switch } from '@/components/ui';

function UncontrolledExample() {
  return (
    <Switch
      defaultChecked={true}
      onChange={(checked) => console.log('Switched to:', checked)}
      label="Uncontrolled switch"
    />
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `checked` | `boolean` | - | No | Controlled checked state |
| `defaultChecked` | `boolean` | - | No | Uncontrolled initial state |
| `disabled` | `boolean` | `false` | No | Disable the switch |
| `size` | `'small' \| 'medium'` | `'medium'` | No | Switch size |
| `onChange` | `(checked: boolean) => void` | - | No | Callback when state changes |
| `label` | `ReactNode` | - | No | Label text or element |
| `className` | `string` | - | No | Additional CSS classes |

### TypeScript Interface

```typescript
import { InputHTMLAttributes, ReactNode } from 'react';

export type SwitchSize = 'small' | 'medium';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  className?: string;
}
```

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `(checked: boolean) => void` | Fired when switch state changes. Receives boolean value. |

## Style Customization

### Design Tokens Used

- Track color (on): `--主色-primary/global-light/50-22`
- Track color (off): `--中性色-neutral/global-light/100-99`
- Track color (disabled on): `--主色-primary/global-light/30-a7`
- Track color (disabled off): `--中性色-neutral/global-light/70-cc`
- Thumb color: White (`#FFFFFF`)

## Do's and Don'ts

### ✅ Do's

**Use for immediate state changes**
```tsx
// ✅ Good - Instant effect
<Switch label="Enable dark mode" onChange={toggleDarkMode} />
```

**Provide clear labels**
```tsx
// ✅ Good - Clear what the switch controls
<Switch label="Email notifications" />
<Switch label="Auto-save drafts" />
```

**Use for binary settings**
```tsx
// ✅ Good - Two states: on/off
<Switch label="Wi-Fi" />
<Switch label="Bluetooth" />
```

### ❌ Don'ts

**Don't use for actions that require confirmation**
```tsx
// ❌ Bad - Destructive action needs confirmation
<Switch label="Delete all data" />

// ✅ Good - Use Button with Modal
<Button onClick={showDeleteConfirmation}>Delete All Data</Button>
```

**Don't use for navigation or submission**
```tsx
// ❌ Bad - Not for page navigation
<Switch label="Go to settings" />

// ✅ Good - Use Button or Link
<Button onClick={goToSettings}>Settings</Button>
```

**Don't use when more than two options exist**
```tsx
// ❌ Bad - Three options
<Switch label="Size: Small/Medium/Large" />

// ✅ Good - Use Radio or Select
<RadioGroup>
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>
```

## Accessibility

- **Keyboard Control:** Toggle with `Space` key
- **Focus Indication:** Visible focus ring
- **Screen Readers:** Properly announces on/off state
- **ARIA Attributes:** `role="switch"`, `aria-checked` set automatically

## Related Components

- [Checkbox](../Checkbox/README.md) - For selections in lists
- [Radio](../Radio/README.md) - For single choice options
- [Button](../Button/README.md) - For actions

---

**Component Version:** 1.0.0  
**Last Updated:** 2026-05-09
