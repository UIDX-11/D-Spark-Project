# Tabs Component

## Introduction

The Tabs component organizes content into separate views, with only one view visible at a time. Supports line, card, and capsule variants following DSWebComLightV22026 design system.

**Use Cases:** Settings panels, product details, data views, categorized content, multi-step information.

## Usage Examples

### Basic Tabs (Line variant)

```tsx
import { Tabs } from '@/components/ui';

const items = [
  { key: 'tab1', label: 'Tab 1', children: <div>Content 1</div> },
  { key: 'tab2', label: 'Tab 2', children: <div>Content 2</div> },
  { key: 'tab3', label: 'Tab 3', children: <div>Content 3</div> },
];

<Tabs items={items} />
```

### Card Tabs

```tsx
<Tabs variant="card" items={items} />
```

### Capsule Tabs

```tsx
<Tabs variant="capsule" items={items} />
```

### Controlled Tabs

```tsx
const [activeKey, setActiveKey] = useState('tab1');
<Tabs items={items} activeKey={activeKey} onChange={setActiveKey} />
```

### With Disabled Tab

```tsx
const items = [
  { key: 'tab1', label: 'Active', children: <div>Content</div> },
  { key: 'tab2', label: 'Disabled', children: <div>Content</div>, disabled: true },
];
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | - | Tab items array |
| `activeKey` | `string` | - | Controlled active tab key |
| `defaultActiveKey` | `string` | First tab | Default active tab |
| `variant` | `'line' \| 'card' \| 'capsule'` | `'line'` | Tab style variant |
| `onChange` | `(key: string) => void` | - | Tab change callback |

### TabItem Interface

```typescript
export interface TabItem {
  key: string;
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}
```

## Design Tokens

- Active color: `--主色-primary/global-light/50-22`
- Border: `--边框-border/无组件绑定/描边_常规`
- Background (card/capsule): `--填充-fill/组件绑定/tabs-标签页/*`

## Do's and Don'ts

✅ **Do:** Keep tab labels concise  
✅ **Do:** Use 3-7 tabs maximum  
❌ **Don't:** Use too many tabs (use Menu instead)  
❌ **Don't:** Put forms in tab labels

---

**Component Version:** 1.0.0
