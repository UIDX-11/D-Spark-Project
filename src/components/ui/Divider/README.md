# Divider Component

## Introduction

The Divider component separates content with a visual line, optionally with text, following DSWebComLightV22026 design system.

**Use Cases:** Content separation, section breaks, menu item separation.

## Usage Examples

### Horizontal Divider

```tsx
import { Divider } from '@/components/ui';

<div>
  <p>Content above</p>
  <Divider />
  <p>Content below</p>
</div>
```

### With Text

```tsx
<Divider text="OR" />
<Divider text="Section Title" textAlign="left" />
<Divider text="End" textAlign="right" />
```

### Vertical Divider

```tsx
<div className="flex h-20">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider orientation |
| `text` | `ReactNode` | - | Text to display |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Text alignment (horizontal only) |

### TypeScript Interface

```typescript
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  text?: ReactNode;
  textAlign?: 'left' | 'center' | 'right';
}
```

## Design Tokens

- Line color: `--边框-border/无组件绑定/描边_常规`
- Text color: `--文字&图标-text&icon/无组件绑定/辅助-territory`

## Do's and Don'ts

✅ **Do:** Use to separate sections  
✅ **Do:** Keep text short when using text prop  
❌ **Don't:** Overuse dividers  
❌ **Don't:** Use when whitespace suffices

---

**Component Version:** 1.0.0
