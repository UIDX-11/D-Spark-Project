# Avatar Component

## Introduction

The Avatar component displays user profile images or fallbacks (initials/icons) following DSWebComLightV22026 design system.

**Use Cases:** User profiles, comment sections, team members, chat applications, user lists.

## Usage Examples

### With Image

```tsx
import { Avatar } from '@/components/ui';

<Avatar src="/user.jpg" alt="John Doe" />
```

### Sizes

```tsx
<Avatar size="small" src="/user.jpg" />
<Avatar size="medium" src="/user.jpg" />
<Avatar size="large" src="/user.jpg" />
<Avatar size={64} src="/user.jpg" />
```

### Shapes

```tsx
<Avatar shape="circle" src="/user.jpg" />
<Avatar shape="square" src="/user.jpg" />
```

### Text Fallback (Initials)

```tsx
<Avatar>JD</Avatar>
<Avatar size="large">AB</Avatar>
```

### Icon Fallback

```tsx
import { User } from 'lucide-react';
<Avatar icon={<User />} />
```

### Default Fallback

```tsx
<Avatar /> {/* Shows default user icon */}
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image URL |
| `alt` | `string` | `'avatar'` | Image alt text |
| `size` | `number \| 'small' \| 'medium' \| 'large'` | `'medium'` | Avatar size (24/32/40px or custom) |
| `shape` | `'circle' \| 'square'` | `'circle'` | Avatar shape |
| `icon` | `ReactNode` | - | Icon fallback (when no image) |
| `children` | `ReactNode` | - | Text fallback (initials) |

### TypeScript Interface

```typescript
export type AvatarSize = number | 'small' | 'medium' | 'large';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  icon?: ReactNode;
  children?: ReactNode;
}
```

## Design Tokens

- Background: `--中性色-neutral/global-light/50-e6`
- Text/Icon: `--文字&图标-text&icon/无组件绑定/辅助-territory`

## Do's and Don'ts

✅ **Do:** Use for user representation  
✅ **Do:** Provide alt text for images  
✅ **Do:** Use initials (1-2 chars) for text fallback  
❌ **Don't:** Use for non-user content  
❌ **Don't:** Use long text in fallback

---

**Component Version:** 1.0.0
