# Empty Component

## Introduction

The Empty component displays a placeholder for empty states following DSWebComLightV22026 design system.

**Use Cases:** Empty lists, no search results, no data available, cleared filters.

## Usage Examples

### Basic Empty State

```tsx
import { Empty } from '@/components/ui';

<Empty />
```

### Custom Description

```tsx
<Empty description="No items found" />
<Empty description="No results match your search" />
```

### With Action Button

```tsx
import { Empty, Button } from '@/components/ui';

<Empty description="No products in cart">
  <Button>Start Shopping</Button>
</Empty>
```

### Custom Image

```tsx
<Empty
  image={<img src="/empty-cart.svg" alt="Empty" />}
  description="Your cart is empty"
>
  <Button>Browse Products</Button>
</Empty>
```

### No Description

```tsx
<Empty description={null} />
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `ReactNode` | Default inbox icon | Custom empty image/icon |
| `description` | `ReactNode` | `'No Data'` | Description text |
| `children` | `ReactNode` | - | Action buttons or additional content |

### TypeScript Interface

```typescript
export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  image?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}
```

## Design Tokens

- Icon background: `--填充-fill/组件绑定/空状态empty-state/中性_200`
- Icon color: `--填充-fill/组件绑定/空状态empty-state/中性_500`
- Description text: `--文字&图标-text&icon/无组件绑定/辅助-territory`

## Do's and Don'ts

✅ **Do:** Provide helpful description  
✅ **Do:** Offer action to resolve empty state  
✅ **Do:** Use context-specific images  
❌ **Don't:** Show for loading states (use Loading)  
❌ **Don't:** Use generic "No Data" without context

---

**Component Version:** 1.0.0
