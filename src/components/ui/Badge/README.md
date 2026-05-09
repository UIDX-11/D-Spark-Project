# Badge Component

## Introduction

The Badge component displays status, counts, or notifications following DSWebComLightV22026 design system.

**Use Cases:** Notification counts, status indicators, new item markers, unread messages.

## Usage Examples

### Standalone Badge

```tsx
import { Badge } from '@/components/ui';

<Badge>New</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Badge with Count

```tsx
import { Bell } from 'lucide-react';

<Badge count={5}>
  <Bell />
</Badge>
```

### Dot Badge

```tsx
<Badge dot>
  <Bell />
</Badge>
```

### Overflow Count

```tsx
<Badge count={100} overflowCount={99}>
  <Bell />
</Badge>
{/* Displays "99+" */}
```

### Show Zero

```tsx
<Badge count={0} showZero>
  <Bell />
</Badge>
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Badge color variant |
| `count` | `number` | - | Badge count number |
| `dot` | `boolean` | `false` | Show as dot indicator |
| `showZero` | `boolean` | `false` | Show badge when count is 0 |
| `overflowCount` | `number` | `99` | Max count before showing "+" |
| `children` | `ReactNode` | - | Wrapped element |

### TypeScript Interface

```typescript
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  dot?: boolean;
  count?: number;
  showZero?: boolean;
  overflowCount?: number;
  children?: ReactNode;
}
```

## Design Tokens

- Default: `--填充-fill/组件绑定/徽标-badge/默认`
- Success: `--成功色success/global-light/50`
- Warning: `--告警色warning/global-light/50`
- Danger: `--危险色danger/global-light/50`
- Info: `--接入中&提示commissioning&prompt/global-light/50`

## Do's and Don'ts

✅ **Do:** Use for counts and notifications  
✅ **Do:** Use dot for simple presence indicator  
❌ **Don't:** Use for non-numeric status (use Tag)  
❌ **Don't:** Use excessively large counts

---

**Component Version:** 1.0.0
