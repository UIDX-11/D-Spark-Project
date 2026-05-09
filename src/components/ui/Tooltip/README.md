# Tooltip Component

## Introduction

The Tooltip component displays contextual hints on hover following DSWebComLightV22026 design system.

**Use Cases:** Icon button labels, help text, truncated text preview, additional context.

## Usage Examples

### Basic Tooltip

```tsx
import { Tooltip, Button } from '@/components/ui';

<Tooltip title="Click to save">
  <Button>Save</Button>
</Tooltip>
```

### Placements

```tsx
<Tooltip title="Top tooltip" placement="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip title="Bottom tooltip" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip title="Left tooltip" placement="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip title="Right tooltip" placement="right">
  <Button>Right</Button>
</Tooltip>
```

### Icon Button with Tooltip

```tsx
import { Settings } from 'lucide-react';

<Tooltip title="Settings">
  <Button icon={<Settings />} aria-label="Settings" />
</Tooltip>
```

### Disabled Element Tooltip

```tsx
<Tooltip title="This action is disabled">
  <span>
    <Button disabled>Disabled Button</Button>
  </span>
</Tooltip>
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | **Required.** Tooltip content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position |
| `children` | `ReactNode` | - | **Required.** Trigger element |

### TypeScript Interface

```typescript
export interface TooltipProps {
  title: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  className?: string;
}
```

## Design Tokens

- Background: `--主色-primary/global-light/50-22`
- Text: White

## Do's and Don'ts

✅ **Do:** Keep tooltip text concise  
✅ **Do:** Use for supplementary information  
✅ **Do:** Position appropriately to avoid overflow  
❌ **Don't:** Use for critical information  
❌ **Don't:** Include interactive content  
❌ **Don't:** Use long paragraphs

---

**Component Version:** 1.0.0
