# Card Component

## Introduction

The Card component is a container for grouping related content and actions. It provides a consistent visual structure with optional header, body, and footer sections, following the DSWebComLightV22026 design system.

**Use Cases:**
- Content grouping
- Dashboard widgets
- Product displays
- User profiles
- Information panels

## Usage Examples

### Basic Card

```tsx
import { Card, CardBody } from '@/components/ui';

function Example() {
  return (
    <Card>
      <CardBody>
        <p>This is a simple card with just content.</p>
      </CardBody>
    </Card>
  );
}
```

### Card with Header and Footer

```tsx
import { Card, CardHeader, CardBody, CardFooter, Button } from '@/components/ui';

function CompleteCard() {
  return (
    <Card>
      <CardHeader title="Card Title" />
      <CardBody>
        <p>Main content goes here. This is the body of the card.</p>
      </CardBody>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button variant="main">Save</Button>
      </CardFooter>
    </Card>
  );
}
```

### Card with Extra Header Content

```tsx
import { Card, CardHeader, CardBody, Button } from '@/components/ui';
import { Settings } from 'lucide-react';

function CardWithExtra() {
  return (
    <Card>
      <CardHeader
        title="Settings"
        extra={
          <Button variant="text" icon={<Settings className="w-4 h-4" />}>
            Edit
          </Button>
        }
      />
      <CardBody>
        <p>Card content with action in header</p>
      </CardBody>
    </Card>
  );
}
```

### Hoverable Card

```tsx
import { Card, CardBody } from '@/components/ui';

function HoverableCard() {
  return (
    <Card hoverable onClick={() => console.log('Card clicked')}>
      <CardBody>
        <h3>Interactive Card</h3>
        <p>Hover over me to see the shadow effect.</p>
      </CardBody>
    </Card>
  );
}
```

### Dashboard Widgets

```tsx
import { Card, CardHeader, CardBody, Space } from '@/components/ui';

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader title="Total Users" />
        <CardBody>
          <div className="text-3xl font-bold">12,345</div>
          <div className="text-sm text-gray-500">+12% from last month</div>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader title="Revenue" />
        <CardBody>
          <div className="text-3xl font-bold">$45,678</div>
          <div className="text-sm text-gray-500">+8% from last month</div>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader title="Active Sessions" />
        <CardBody>
          <div className="text-3xl font-bold">1,234</div>
          <div className="text-sm text-gray-500">-3% from last hour</div>
        </CardBody>
      </Card>
    </div>
  );
}
```

### Product Card

```tsx
import { Card, CardBody, CardFooter, Button, Badge } from '@/components/ui';

function ProductCard() {
  return (
    <Card hoverable style={{ width: 300 }}>
      <img src="/product.jpg" alt="Product" className="w-full h-48 object-cover" />
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">Product Name</h3>
          <Badge variant="success">New</Badge>
        </div>
        <p className="text-gray-600 mb-4">Product description goes here.</p>
        <div className="text-2xl font-bold">$99.99</div>
      </CardBody>
      <CardFooter>
        <Button variant="main" style={{ width: '100%' }}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## API Reference

### Card Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | **Yes** | Card content (typically CardHeader, CardBody, CardFooter) |
| `hoverable` | `boolean` | `false` | No | Add shadow on hover |
| `className` | `string` | - | No | Additional CSS classes |
| `onClick` | `() => void` | - | No | Click handler (makes card interactive) |

### CardHeader Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `ReactNode` | - | No | Header title text or element |
| `extra` | `ReactNode` | - | No | Extra content (displayed on the right side) |
| `children` | `ReactNode` | - | No | Custom header content (alternative to title) |
| `className` | `string` | - | No | Additional CSS classes |

### CardBody Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | **Yes** | Main card content |
| `className` | `string` | - | No | Additional CSS classes |

### CardFooter Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | **Yes** | Footer content (typically buttons) |
| `className` | `string` | - | No | Additional CSS classes |

### TypeScript Interfaces

```typescript
import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}
```

## Style Customization

### Custom Width

```tsx
<Card style={{ width: 400 }}>
  <CardBody>Custom width card</CardBody>
</Card>
```

### Design Tokens Used

- Background: `--填充-fill/无组件绑定/卡片背景_100-card-background`
- Border: `--边框-border/无组件绑定/描边_常规`
- Header text: `--文字&图标-text&icon/无组件绑定/强调-primary`

## Do's and Don'ts

### ✅ Do's

**Group related content**
```tsx
// ✅ Good - Related information grouped
<Card>
  <CardHeader title="User Profile" />
  <CardBody>
    <div>Name: John Doe</div>
    <div>Email: john@example.com</div>
  </CardBody>
</Card>
```

**Use CardFooter for actions**
```tsx
// ✅ Good - Actions in footer
<Card>
  <CardHeader title="Confirm Action" />
  <CardBody>Are you sure?</CardBody>
  <CardFooter>
    <Button variant="secondary">Cancel</Button>
    <Button variant="main">Confirm</Button>
  </CardFooter>
</Card>
```

### ❌ Don'ts

**Don't nest cards excessively**
```tsx
// ❌ Bad - Too many nested cards
<Card>
  <CardBody>
    <Card>
      <CardBody>
        <Card>...</Card>
      </CardBody>
    </Card>
  </CardBody>
</Card>
```

**Don't overcrowd cards**
```tsx
// ❌ Bad - Too much content
<Card>
  <CardBody>
    {/* Hundreds of lines of content */}
  </CardBody>
</Card>

// ✅ Good - Use pagination or separate cards
<Space direction="vertical">
  <Card>...</Card>
  <Card>...</Card>
</Space>
```

## Accessibility

- **Semantic HTML:** Uses appropriate HTML elements
- **Interactive Cards:** Use button semantics when clickable
- **Focus Management:** Proper focus indication

## Related Components

- [Space](../Space/README.md) - Arrange multiple cards
- [Button](../Button/README.md) - Use in card footers
- [Badge](../Badge/README.md) - Add status indicators

---

**Component Version:** 1.0.0  
**Last Updated:** 2026-05-09
