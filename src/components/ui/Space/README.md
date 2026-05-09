# Space Component

## Introduction

The Space component provides consistent spacing between elements following DSWebComLightV22026 design system.

**Use Cases:** Button groups, form field spacing, list items, inline elements.

## Usage Examples

### Horizontal Spacing

```tsx
import { Space, Button } from '@/components/ui';

<Space>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</Space>
```

### Vertical Spacing

```tsx
<Space direction="vertical">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Space>
```

### Different Sizes

```tsx
<Space size="small">...</Space>
<Space size="medium">...</Space>
<Space size="large">...</Space>
<Space size={32}>...</Space>
<Space size={[16, 24]}>...</Space> {/* [row, column] */}
```

### With Wrap

```tsx
<Space wrap>
  {items.map(item => <Button key={item}>{item}</Button>)}
</Space>
```

### With Separator

```tsx
import { Divider } from '@/components/ui';

<Space split={<Divider orientation="vertical" />}>
  <span>Link 1</span>
  <span>Link 2</span>
  <span>Link 3</span>
</Space>
```

### Alignment

```tsx
<Space align="start">...</Space>
<Space align="center">...</Space>
<Space align="end">...</Space>
<Space align="baseline">...</Space>
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Spacing direction |
| `size` | `number \| 'small' \| 'medium' \| 'large' \| [SpaceSize, SpaceSize]` | `'medium'` | Gap size (8/16/24px or custom, or [row, col]) |
| `align` | `'start' \| 'end' \| 'center' \| 'baseline'` | - | Alignment |
| `wrap` | `boolean` | `false` | Allow wrapping |
| `split` | `ReactNode` | - | Separator element |
| `children` | `ReactNode` | - | **Required.** Child elements |

### TypeScript Interface

```typescript
export type SpaceSize = number | 'small' | 'medium' | 'large';

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size?: SpaceSize | [SpaceSize, SpaceSize];
  align?: 'start' | 'end' | 'center' | 'baseline';
  wrap?: boolean;
  split?: ReactNode;
  children: ReactNode;
}
```

## Do's and Don'ts

✅ **Do:** Use for consistent spacing  
✅ **Do:** Use wrap for responsive layouts  
❌ **Don't:** Nest Space excessively  
❌ **Don't:** Mix with manual margins/gaps

---

**Component Version:** 1.0.0
