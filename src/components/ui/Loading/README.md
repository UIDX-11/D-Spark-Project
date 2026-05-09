# Loading Component

## Introduction

The Loading component displays a spinner indicator following DSWebComLightV22026 design system.

**Use Cases:** Data fetching, page loading, async operations, content loading.

## Usage Examples

### Basic Loading

```tsx
import { Loading } from '@/components/ui';

<Loading />
```

### Sizes

```tsx
<Loading size="small" />
<Loading size="medium" />
<Loading size="large" />
```

### With Tip Text

```tsx
<Loading tip="Loading data..." />
```

### Fullscreen Loading

```tsx
<Loading fullscreen tip="Please wait..." />
```

### In Content Area

```tsx
function DataTable() {
  const { data, loading } = useData();
  
  if (loading) {
    return <Loading tip="Loading table data..." />;
  }
  
  return <Table data={data} />;
}
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Spinner size (16/32/48px) |
| `tip` | `string` | - | Loading text message |
| `fullscreen` | `boolean` | `false` | Show as fullscreen overlay |

### TypeScript Interface

```typescript
export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  tip?: string;
  fullscreen?: boolean;
}
```

## Design Tokens

- Spinner color: `--主色-primary/global-light/50-22`
- Tip text: `--文字&图标-text&icon/无组件绑定/辅助-territory`
- Fullscreen mask: `--蒙层-mask/loading-遮罩`

## Do's and Don'ts

✅ **Do:** Show during data loading  
✅ **Do:** Provide helpful tip text  
✅ **Do:** Use fullscreen for critical operations  
❌ **Don't:** Show for very fast operations (<200ms)  
❌ **Don't:** Nest multiple loading states

---

**Component Version:** 1.0.0
