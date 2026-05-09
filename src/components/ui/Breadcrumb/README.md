# Breadcrumb Component

## Introduction

The Breadcrumb component displays navigation hierarchy following DSWebComLightV22026 design system.

**Use Cases:** Page location, navigation trail, hierarchical navigation.

## Usage Examples

### Basic Breadcrumb

```tsx
import { Breadcrumb } from '@/components/ui';

const items = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Laptop' },
];

<Breadcrumb items={items} />
```

### With Click Handlers

```tsx
const items = [
  { title: 'Home', onClick: () => navigate('/') },
  { title: 'Category', onClick: () => navigate('/category') },
  { title: 'Current Page' },
];

<Breadcrumb items={items} />
```

### Custom Separator

```tsx
<Breadcrumb items={items} separator="/" />
<Breadcrumb items={items} separator=">" />
```

### With Icons

```tsx
import { Home } from 'lucide-react';

const items = [
  { title: <Home className="w-4 h-4" />, href: '/' },
  { title: 'Category', href: '/category' },
  { title: 'Product' },
];

<Breadcrumb items={items} />
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItemType[]` | - | **Required.** Breadcrumb items |
| `separator` | `ReactNode` | `<ChevronRight />` | Item separator |

### BreadcrumbItemType

| Prop | Type | Description |
|------|------|-------------|
| `title` | `ReactNode` | Item title |
| `href` | `string` | Link URL |
| `onClick` | `() => void` | Click handler |

### TypeScript Interface

```typescript
export interface BreadcrumbItemType {
  title: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemType[];
  separator?: ReactNode;
}
```

## Design Tokens

- Active item: `--文字&图标-text&icon/无组件绑定/强调-primary`
- Inactive items: `--文字&图标-text&icon/无组件绑定/辅助-territory`

## Do's and Don'ts

✅ **Do:** Show complete navigation path  
✅ **Do:** Make items clickable (except last)  
❌ **Don't:** Show too many levels (>5)  
❌ **Don't:** Use for flat navigation

---

**Component Version:** 1.0.0
