# Tag Component

## Introduction

The Tag component displays categorization labels or removable tags following DSWebComLightV22026 design system.

**Use Cases:** Categories, labels, filters, selected items, keywords, topics.

## Usage Examples

### Basic Tags

```tsx
import { Tag } from '@/components/ui';

<Tag>Default</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="danger">Danger</Tag>
<Tag variant="info">Info</Tag>
```

### Closable Tags

```tsx
<Tag closable onClose={() => console.log('Tag removed')}>
  Removable Tag
</Tag>
```

### With Icon

```tsx
import { Star } from 'lucide-react';
<Tag icon={<Star className="w-3 h-3" />}>Featured</Tag>
```

### Tag List

```tsx
const tags = ['React', 'TypeScript', 'Tailwind', 'Vite'];

<div className="flex gap-2">
  {tags.map(tag => (
    <Tag key={tag} closable onClose={() => removeTag(tag)}>
      {tag}
    </Tag>
  ))}
</div>
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Tag color variant |
| `closable` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close callback |
| `icon` | `ReactNode` | - | Icon element |
| `children` | `ReactNode` | - | **Required.** Tag content |

### TypeScript Interface

```typescript
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  closable?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  children: ReactNode;
}
```

## Design Tokens

- Default: `--中性色-neutral/global-light/30-f7`
- Success: `--成功色success/global-light/10` (bg), `--成功色success/global-light/50` (text)
- Warning: `--告警色warning/global-light/10` (bg), `--告警色warning/global-light/50` (text)
- Danger: `--危险色danger/global-light/10` (bg), `--危险色danger/global-light/50` (text)
- Info: `--接入中&提示commissioning&prompt/global-light/10` (bg)

## Do's and Don'ts

✅ **Do:** Use for categories and labels  
✅ **Do:** Keep tag text short (1-3 words)  
✅ **Do:** Use closable for filter tags  
❌ **Don't:** Use for counts (use Badge)  
❌ **Don't:** Use long text

---

**Component Version:** 1.0.0
