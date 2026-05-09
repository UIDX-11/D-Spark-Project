# DSWebComLightV22026 Component Library - Complete Guide

## 📚 Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Component Categories](#component-categories)
4. [Design Token Usage](#design-token-usage)
5. [Best Practices](#best-practices)
6. [Examples](#examples)

## Overview

This is a production-ready component library built specifically for the DSWebComLightV22026 design system. All components:
- Use design tokens exclusively (no hardcoded values)
- Are fully typed with TypeScript
- Follow accessibility best practices
- Are optimized for PC Web (1024px+)
- Support tree-shaking for minimal bundle size

## Getting Started

### Basic Import

```tsx
import { Button, Input, Card } from '@/components/ui';
```

### With Toaster (for Message component)

```tsx
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster />
      {/* Your app content */}
    </>
  );
}
```

### Import Design System Styles

Make sure to import the design system styles in your main file:

```tsx
import '@/DSWebComLightV22026/styles.css';
```

## Component Categories

### 🎮 Form Controls
Perfect for building forms and user inputs.

**Button** - The most versatile component
- 5 variants: main, secondary, text, facial, virtual
- 2 types: default, danger
- 3 sizes: small, medium, large
- Loading and icon support

**Input** - Text input with extras
- Prefix/suffix support
- Clear button option
- Validation states (error, warning, success)
- 3 sizes

**Checkbox** - Selection control
- Regular, checked, indeterminate states
- Disabled support

**Radio** - Single selection
- Individual or group usage
- Horizontal/vertical layout

**Switch** - Toggle control
- 2 sizes: small, medium
- Label support

### 📦 Layout
Components for structuring your UI.

**Card** - Container for content
- Header, Body, Footer sections
- Hoverable option for interactive cards

**Space** - Spacing utility
- Horizontal/vertical direction
- Preset sizes (small, medium, large) or custom
- Split divider support
- Wrap option

**Divider** - Content separator
- Horizontal/vertical
- Optional text with alignment

### 🧭 Navigation
Help users navigate your application.

**Breadcrumb** - Current location
- Custom separators
- Click handlers or links

**Pagination** - Page navigation
- Page size selector
- Compact display for many pages

**Tabs** - Organize content
- 3 variants: line, card, capsule
- Disabled tabs support

### 📊 Data Display
Present information effectively.

**Avatar** - User representation
- Image with fallback
- Icon or text fallback
- Custom sizes
- Circle or square shape

**Badge** - Status indicator
- Standalone or overlay
- Count with overflow
- Dot indicator

**Tag** - Categorization
- 5 variants (default, success, warning, danger, info)
- Closable option
- Icon support

**Empty** - No data state
- Custom image and description
- Action button support

### 💬 Feedback
Communicate with users.

**Alert** - Important messages
- 4 types: success, warning, error, info
- Closable option
- Title and icon support

**Loading** - Processing indicator
- 3 sizes
- Tip text
- Fullscreen mode

**Message** - Toast notifications
- 4 types: success, warning, error, info
- Auto-dismiss
- Custom duration

**Tooltip** - Contextual hints
- 4 placements: top, bottom, left, right
- Auto-show on hover

### 🎭 Overlay
Modal and overlay components.

**Modal** - Dialog windows
- Custom width
- Header and footer support
- Centered or top-aligned
- Mask click to close

## Design Token Usage

### Primary Colors
```tsx
// Main actions, emphasis
--主色-primary/global-light/50-22
--主色-primary/global-light/40-4e (hover)
--主色-primary/global-light/30-a7 (disabled)
```

### Semantic Colors
```tsx
// Success
--成功色success/global-light/50

// Warning
--告警色warning/global-light/50

// Danger/Error
--危险色danger/global-light/50

// Info
--接入中&提示commissioning&prompt/global-light/50
```

### Text Colors
```tsx
// Primary text
--文字&图标-text&icon/无组件绑定/强调-primary

// Secondary text
--文字&图标-text&icon/无组件绑定/次要-secondary

// Tertiary/helper text
--文字&图标-text&icon/无组件绑定/辅助-territory

// Disabled text
--文字&图标-text&icon/无组件绑定/禁用-disabled
```

### Backgrounds
```tsx
// Page background
--填充-fill/无组件绑定/页面背景-page-background

// Card background
--填充-fill/无组件绑定/卡片背景_100-card-background

// Disabled background
--填充-fill/无组件绑定/禁用-disabled
```

### Borders
```tsx
// Regular border
--边框-border/无组件绑定/描边_常规

// Hover border
--边框-border/无组件绑定/描边_悬停

// Emphasis border
--边框-border/无组件绑定/描边_强调

// Disabled border
--边框-border/无组件绑定/描边_禁用
```

## Best Practices

### 1. Use Semantic Variants

```tsx
// ✅ Good - Clear intent
<Button variant="main">Save</Button>
<Button variant="main" buttonType="danger">Delete</Button>
<Button variant="secondary">Cancel</Button>

// ❌ Avoid - Unclear purpose
<Button className="bg-red-500">Delete</Button>
```

### 2. Consistent Spacing

```tsx
// ✅ Good - Use Space component
<Space size="large">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Space>

// ❌ Avoid - Hardcoded margins
<div className="flex gap-4">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</div>
```

### 3. Proper Feedback

```tsx
// ✅ Good - Show appropriate feedback
const handleSave = async () => {
  setLoading(true);
  try {
    await saveData();
    message.success('Data saved successfully');
  } catch (error) {
    message.error('Failed to save data');
  } finally {
    setLoading(false);
  }
};
```

### 4. Accessibility

```tsx
// ✅ Good - Proper labels
<Input placeholder="Email address" aria-label="Email address" />

// ✅ Good - Disabled with reason
<Tooltip title="Please complete the form first">
  <Button disabled>Submit</Button>
</Tooltip>
```

## Examples

### Login Form

```tsx
import { Card, CardHeader, CardBody, Input, Button, Space, message } from '@/components/ui';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Login logic
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card style={{ width: 400 }}>
      <CardHeader title="Login" />
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Input placeholder="Email" type="email" required />
            <Input placeholder="Password" type="password" required />
            <Button variant="main" type="submit" loading={loading} style={{ width: '100%' }}>
              Login
            </Button>
          </Space>
        </form>
      </CardBody>
    </Card>
  );
}
```

### Data Table with Pagination

```tsx
import { Card, Table, Pagination, Empty, Loading } from '@/components/ui';

function DataTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);
  
  if (loading) return <Loading tip="Loading data..." />;
  if (data.length === 0) return <Empty description="No data available" />;
  
  return (
    <Card>
      <CardBody>
        {/* Your table rendering */}
      </CardBody>
      <CardFooter>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          onChange={(page, size) => {
            setPage(page);
            setPageSize(size);
          }}
        />
      </CardFooter>
    </Card>
  );
}
```

### Settings Panel with Tabs

```tsx
import { Tabs, Card, Switch, Space, Button } from '@/components/ui';

function Settings() {
  const items = [
    {
      key: 'general',
      label: 'General',
      children: (
        <Space direction="vertical" size="large">
          <div>
            <Switch label="Enable notifications" />
          </div>
          <div>
            <Switch label="Auto-save" defaultChecked />
          </div>
        </Space>
      ),
    },
    {
      key: 'privacy',
      label: 'Privacy',
      children: <div>Privacy settings content</div>,
    },
    {
      key: 'security',
      label: 'Security',
      children: <div>Security settings content</div>,
    },
  ];
  
  return (
    <Card>
      <CardHeader title="Settings" />
      <CardBody>
        <Tabs items={items} variant="line" />
      </CardBody>
    </Card>
  );
}
```

### User Profile

```tsx
import { Card, Avatar, Badge, Tag, Space, Button, Divider } from '@/components/ui';

function UserProfile({ user }) {
  return (
    <Card>
      <CardBody>
        <Space direction="vertical" size="large" align="center">
          <Badge count={user.notifications}>
            <Avatar size={80} src={user.avatar}>
              {user.name[0]}
            </Avatar>
          </Badge>
          
          <div style={{ textAlign: 'center' }}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          
          <Space wrap>
            {user.tags.map(tag => (
              <Tag key={tag} variant="info">{tag}</Tag>
            ))}
          </Space>
          
          <Divider />
          
          <Space>
            <Button variant="main">Edit Profile</Button>
            <Button variant="secondary">Settings</Button>
          </Space>
        </Space>
      </CardBody>
    </Card>
  );
}
```

## Component Combinations

### Form with Validation

```tsx
<Space direction="vertical" size="medium" style={{ width: '100%' }}>
  <Input 
    status="error" 
    placeholder="Username"
    suffix={<span style={{ color: 'var(--危险色danger/global-light/50)' }}>Required</span>}
  />
  <Input status="success" placeholder="Email" />
  <Input status="default" placeholder="Phone (optional)" />
</Space>
```

### Alert with Actions

```tsx
<Alert
  type="warning"
  title="Storage Almost Full"
  message="You have used 90% of your storage quota."
  closable
>
  <Space size="small" style={{ marginTop: 12 }}>
    <Button size="small" variant="main">Upgrade Plan</Button>
    <Button size="small" variant="text">Manage Files</Button>
  </Space>
</Alert>
```

### Modal Confirmation

```tsx
<Modal
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title="Confirm Delete"
  footer={
    <>
      <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
        Cancel
      </Button>
      <Button variant="main" buttonType="danger" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
</Modal>
```

---

## Need Help?

Each component has its own README.md with detailed documentation:
- Component-specific examples
- Full API reference
- Design tokens used
- Accessibility notes

Check the individual component READMEs in `src/components/ui/[ComponentName]/README.md`.
