# Pagination Component

## Introduction

The Pagination component provides page navigation following DSWebComLightV22026 design system.

**Use Cases:** Table pagination, list pagination, search results, content browsing.

## Usage Examples

### Basic Pagination

```tsx
import { Pagination } from '@/components/ui';
import { useState } from 'react';

function Example() {
  const [current, setCurrent] = useState(1);
  
  return (
    <Pagination
      current={current}
      total={100}
      onChange={(page) => setCurrent(page)}
    />
  );
}
```

### With Page Size Selector

```tsx
const [current, setCurrent] = useState(1);
const [pageSize, setPageSize] = useState(10);

<Pagination
  current={current}
  total={500}
  pageSize={pageSize}
  showSizeChanger
  onChange={(page, size) => {
    setCurrent(page);
    setPageSize(size);
  }}
  onPageSizeChange={setPageSize}
/>
```

### Small Size

```tsx
<Pagination current={1} total={100} size="small" />
```

### Custom Page Size Options

```tsx
<Pagination
  current={current}
  total={500}
  showSizeChanger
  pageSizeOptions={[10, 25, 50, 100]}
  onChange={handleChange}
/>
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `number` | - | **Required.** Current page number |
| `total` | `number` | - | **Required.** Total items |
| `pageSize` | `number` | `10` | Items per page |
| `size` | `'small' \| 'medium'` | `'medium'` | Component size |
| `showSizeChanger` | `boolean` | `false` | Show page size selector |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | Page size options |
| `onChange` | `(page: number, pageSize: number) => void` | - | Page change callback |
| `onPageSizeChange` | `(pageSize: number) => void` | - | Page size change callback |

### TypeScript Interface

```typescript
export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  current: number;
  total: number;
  pageSize?: number;
  size?: 'small' | 'medium';
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  onChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}
```

## Design Tokens

- Active page: `--主色-primary/global-light/50-22`
- Border: `--边框-border/无组件绑定/描边_常规`
- Hover border: `--主色-primary/global-light/50-22`

## Do's and Don'ts

✅ **Do:** Show total count  
✅ **Do:** Allow page size changes for large datasets  
❌ **Don't:** Paginate small lists (<20 items)  
❌ **Don't:** Reset to page 1 on every filter change

---

**Component Version:** 1.0.0
