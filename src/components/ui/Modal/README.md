# Modal Component

## Introduction

The Modal component displays content in a layer above the main application, following the DSWebComLightV22026 design system. Use for focused tasks, forms, confirmations, or detailed information.

**Use Cases:**
- Form dialogs
- Confirmations (delete, submit, etc.)
- Image/video viewing
- Multi-step processes
- Detailed information display

## Usage Examples

### Basic Modal

```tsx
import { Modal, Button } from '@/components/ui';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
      >
        <p>Modal content goes here.</p>
      </Modal>
    </>
  );
}
```

### Modal with Footer

```tsx
import { Modal, Button } from '@/components/ui';

function ModalWithFooter() {
  const [open, setOpen] = useState(false);
  
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Confirm Action"
      footer={
        <>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="main" onClick={handleConfirm}>
            Confirm
          </Button>
        </>
      }
    >
      <p>Are you sure you want to proceed with this action?</p>
    </Modal>
  );
}
```

### Confirmation Modal

```tsx
function DeleteConfirmation({ open, onClose, onConfirm, itemName }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Item"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="main" buttonType="danger" onClick={onConfirm}>
            Delete
          </Button>
        </>
      }
    >
      <p>Are you sure you want to delete "{itemName}"?</p>
      <p>This action cannot be undone.</p>
    </Modal>
  );
}
```

### Form Modal

```tsx
import { Modal, Input, Button, Space } from '@/components/ui';

function FormModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const handleSubmit = () => {
    // Submit logic
    setOpen(false);
  };
  
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Add User"
      width={600}
      footer={
        <>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="main" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <label>Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </Space>
    </Modal>
  );
}
```

### Custom Width and Positioning

```tsx
<Modal
  open={open}
  onClose={handleClose}
  title="Large Modal"
  width={800}
  centered={false} // Align to top instead of center
>
  <p>This is a wider modal aligned to the top.</p>
</Modal>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | `boolean` | - | **Yes** | Control modal visibility |
| `onClose` | `() => void` | - | No | Callback when modal should close |
| `title` | `ReactNode` | - | No | Modal title |
| `footer` | `ReactNode` | - | No | Footer content (typically buttons) |
| `width` | `number \| string` | `520` | No | Modal width (px or CSS value) |
| `centered` | `boolean` | `true` | No | Center vertically on screen |
| `maskClosable` | `boolean` | `true` | No | Close modal when clicking outside |
| `children` | `ReactNode` | - | **Yes** | Modal body content |
| `className` | `string` | - | No | Additional CSS classes |

### TypeScript Interface

```typescript
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  width?: number | string;
  centered?: boolean;
  maskClosable?: boolean;
  children: ReactNode;
  className?: string;
}
```

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onClose` | `() => void` | Fired when modal should close (via close button, mask click, or ESC key) |

## Style Customization

### Design Tokens Used

- Background: `--填充-fill/无组件绑定/卡片背景_100-card-background`
- Mask: `--蒙层-mask/10`
- Border: `--边框-border/无组件绑定/描边_常规`
- Title text: `--文字&图标-text&icon/无组件绑定/强调-primary`

## Do's and Don'ts

### ✅ Do's

```tsx
// ✅ Use for focused tasks
<Modal title="Edit Profile">...</Modal>

// ✅ Provide clear actions in footer
<Modal footer={<Button>Save</Button>}>...</Modal>

// ✅ Disable mask close for critical actions
<Modal maskClosable={false}>...</Modal>
```

### ❌ Don'ts

```tsx
// ❌ Don't nest modals
<Modal><Modal>...</Modal></Modal>

// ❌ Don't make modals too large
<Modal width={2000}>...</Modal>

// ✅ Good - Use drawer or new page
<Drawer>...</Drawer>
```

## Accessibility

- **Focus Trap:** Focus stays within modal
- **ESC Key:** Closes modal
- **ARIA Attributes:** `role="dialog"`, `aria-modal="true"`
- **Body Scroll:** Prevented when modal is open

---

**Component Version:** 1.0.0  
**Last Updated:** 2026-05-09
