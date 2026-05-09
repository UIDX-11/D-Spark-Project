# Alert Component

## Introduction

The Alert component displays important messages with contextual styling. Supports success, warning, error, and info types following DSWebComLightV22026 design system.

**Use Cases:** System notifications, form validation feedback, important announcements, status updates.

## Usage Examples

### Basic Alerts

```tsx
import { Alert } from '@/components/ui';

<Alert type="success" message="Operation successful!" />
<Alert type="warning" message="Warning message" />
<Alert type="error" message="Error occurred" />
<Alert type="info" message="Information" />
```

### With Title

```tsx
<Alert
  type="success"
  title="Success"
  message="Your changes have been saved successfully."
/>
```

### Closable Alert

```tsx
<Alert
  type="warning"
  message="This is a warning message"
  closable
  onClose={() => console.log('Alert closed')}
/>
```

### Without Icon

```tsx
<Alert type="info" message="Message without icon" showIcon={false} />
```

### Custom Icon

```tsx
import { Zap } from 'lucide-react';
<Alert type="info" message="Custom icon" icon={<Zap />} />
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` | Alert type |
| `title` | `ReactNode` | - | Alert title |
| `message` | `ReactNode` | - | **Required.** Alert message |
| `closable` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close callback |
| `icon` | `ReactNode` | - | Custom icon |
| `showIcon` | `boolean` | `true` | Show icon |

### TypeScript Interface

```typescript
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: ReactNode;
  message: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  showIcon?: boolean;
}
```

## Design Tokens

- Success: `--成功色success/global-light/*`
- Warning: `--告警色warning/global-light/*`
- Error: `--危险色danger/global-light/*`
- Info: `--接入中&提示commissioning&prompt/global-light/*`
- Background fills: `--填充-fill/无组件绑定/*背景-*`

## Do's and Don'ts

✅ **Do:** Use appropriate type for context  
✅ **Do:** Keep messages concise and actionable  
✅ **Do:** Provide title for complex alerts  
❌ **Don't:** Use for minor feedback (use Message/Toast)  
❌ **Don't:** Stack multiple alerts

---

**Component Version:** 1.0.0
