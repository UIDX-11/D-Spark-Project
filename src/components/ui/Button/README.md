# Button Component

A versatile button component with multiple variants, sizes, and states.

## Import

```tsx
import { Button } from '@/components/ui/Button';
```

## Usage

### Basic

```tsx
<Button>Click me</Button>
```

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### With Icon

```tsx
<Button icon={<PlusIcon />} iconPosition="left">
  Add Item
</Button>

<Button icon={<ArrowIcon />} iconPosition="right">
  Next
</Button>
```

### States

```tsx
<Button loading>Processing...</Button>
<Button disabled>Disabled</Button>
```

### Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

## Props

See `Button.types.ts` for complete prop documentation.

## Accessibility

- Uses semantic `<button>` element
- Keyboard accessible (Enter, Space)
- Focus visible ring for keyboard navigation
- Disabled state properly communicated
- Loading state shows spinner with aria-busy

## Best Practices

✅ **Do:**
- Use clear, action-oriented labels
- Use appropriate variants for semantic meaning
- Provide loading state for async actions
- Use icons to enhance understanding

❌ **Don't:**
- Use vague labels like "Click here"
- Use buttons for navigation (use links instead)
- Have multiple primary buttons in same context
- Override colors arbitrarily
