# DSWebComLightV22026 Component Library Catalog

> Complete catalog of all Web components in the DSWebComLightV22026 component library

## Component Categories

### 📦 Basic Components (7)
Fundamental UI building blocks for common interface elements.

| Component | Description | Import Path | Documentation |
|-----------|-------------|-------------|---------------|
| [Button](./src/components/ui/Button/README.md) | Versatile button with multiple variants and states | `@/components/ui/Button` | [View Docs](./src/components/ui/Button/README.md) |
| [Icon](#) | Icon component (use `lucide-react` directly) | `lucide-react` | - |
| [Typography](#) | Text styles (use design tokens directly) | - | - |
| [Avatar](./src/components/ui/Avatar/README.md) | User avatar with image/icon/text fallbacks | `@/components/ui/Avatar` | [View Docs](./src/components/ui/Avatar/README.md) |
| [Badge](./src/components/ui/Badge/README.md) | Status badges and notification indicators | `@/components/ui/Badge` | [View Docs](./src/components/ui/Badge/README.md) |
| [Tag](./src/components/ui/Tag/README.md) | Closable tags for categorization | `@/components/ui/Tag` | [View Docs](./src/components/ui/Tag/README.md) |
| [Divider](./src/components/ui/Divider/README.md) | Content separator (horizontal/vertical) | `@/components/ui/Divider` | [View Docs](./src/components/ui/Divider/README.md) |

### 📝 Form Components (5)
Components for building forms and collecting user input.

| Component | Description | Import Path | Documentation |
|-----------|-------------|-------------|---------------|
| [Input](./src/components/ui/Input/README.md) | Text input with validation states | `@/components/ui/Input` | [View Docs](./src/components/ui/Input/README.md) |
| [Checkbox](./src/components/ui/Checkbox/README.md) | Checkbox with indeterminate state | `@/components/ui/Checkbox` | [View Docs](./src/components/ui/Checkbox/README.md) |
| [Radio](./src/components/ui/Radio/README.md) | Radio button with group support | `@/components/ui/Radio` | [View Docs](./src/components/ui/Radio/README.md) |
| [Switch](./src/components/ui/Switch/README.md) | Toggle switch control | `@/components/ui/Switch` | [View Docs](./src/components/ui/Switch/README.md) |
| [Select](#) | Dropdown select (extensible) | - | Coming soon |
| [Form](#) | Form wrapper with validation (extensible) | - | Coming soon |
| [Upload](#) | File upload with drag & drop (extensible) | - | Coming soon |
| [DatePicker](#) | Date selection (extensible) | - | Coming soon |

### 📐 Layout Components (3)
Components for structuring and organizing page layouts.

| Component | Description | Import Path | Documentation |
|-----------|-------------|-------------|---------------|
| [Card](./src/components/ui/Card/README.md) | Container with header, body, footer | `@/components/ui/Card` | [View Docs](./src/components/ui/Card/README.md) |
| [Space](./src/components/ui/Space/README.md) | Spacing utility for consistent gaps | `@/components/ui/Space` | [View Docs](./src/components/ui/Space/README.md) |
| [Grid](#) | Grid layout (use Tailwind directly) | - | - |

### 💬 Feedback Components (5)
Components for providing feedback and status information to users.

| Component | Description | Import Path | Documentation |
|-----------|-------------|-------------|---------------|
| [Alert](./src/components/ui/Alert/README.md) | Alert messages with multiple types | `@/components/ui/Alert` | [View Docs](./src/components/ui/Alert/README.md) |
| [Message](./src/components/ui/Message/README.md) | Toast notifications (Sonner-based) | `@/components/ui/Message` | [View Docs](./src/components/ui/Message/README.md) |
| [Tooltip](./src/components/ui/Tooltip/README.md) | Contextual hover tooltips | `@/components/ui/Tooltip` | [View Docs](./src/components/ui/Tooltip/README.md) |
| [Loading](./src/components/ui/Loading/README.md) | Loading spinner with fullscreen mode | `@/components/ui/Loading` | [View Docs](./src/components/ui/Loading/README.md) |
| [Empty](./src/components/ui/Empty/README.md) | Empty state placeholder | `@/components/ui/Empty` | [View Docs](./src/components/ui/Empty/README.md) |

### 🧭 Navigation Components (3)
Components for application navigation and wayfinding.

| Component | Description | Import Path | Documentation |
|-----------|-------------|-------------|---------------|
| [Breadcrumb](./src/components/ui/Breadcrumb/README.md) | Breadcrumb navigation trail | `@/components/ui/Breadcrumb` | [View Docs](./src/components/ui/Breadcrumb/README.md) |
| [Pagination](./src/components/ui/Pagination/README.md) | Page navigation with size selector | `@/components/ui/Pagination` | [View Docs](./src/components/ui/Pagination/README.md) |
| [Tabs](./src/components/ui/Tabs/README.md) | Tabbed content with multiple variants | `@/components/ui/Tabs` | [View Docs](./src/components/ui/Tabs/README.md) |
| [Menu](#) | Navigation menu (extensible) | - | Coming soon |
| [Dropdown](#) | Dropdown menu (extensible) | - | Coming soon |

### 🎭 Overlay Components (2)
Modal and overlay components for focused interactions.

| Component | Description | Import Path | Documentation |
|-----------|-------------|-------------|---------------|
| [Modal](./src/components/ui/Modal/README.md) | Dialog modal with customizable footer | `@/components/ui/Modal` | [View Docs](./src/components/ui/Modal/README.md) |
| [Drawer](#) | Side drawer panel (extensible) | - | Coming soon |

### 📊 Data Display Components (1)
Components for displaying tabular or structured data.

| Component | Description | Import Path | Documentation |
|-----------|-------------|-------------|---------------|
| [Table](#) | Data table with sorting (extensible) | - | Coming soon |

## Quick Import Reference

### All Components

```tsx
// Basic Components
import { Button, Avatar, Badge, Tag, Divider } from '@/components/ui';

// Form Components
import { Input, Checkbox, Radio, RadioGroup, Switch } from '@/components/ui';

// Layout Components
import { Card, CardHeader, CardBody, CardFooter, Space } from '@/components/ui';

// Feedback Components
import { Alert, message, Tooltip, Loading, Empty } from '@/components/ui';

// Navigation Components
import { Breadcrumb, Pagination, Tabs } from '@/components/ui';

// Overlay Components
import { Modal } from '@/components/ui';
```

### Type Imports

```tsx
import type {
  // Basic
  ButtonProps, AvatarProps, BadgeProps, TagProps, DividerProps,
  // Form
  InputProps, CheckboxProps, RadioProps, RadioGroupProps, SwitchProps,
  // Layout
  CardProps, CardHeaderProps, CardBodyProps, CardFooterProps, SpaceProps,
  // Feedback
  AlertProps, MessageConfig, TooltipProps, LoadingProps, EmptyProps,
  // Navigation
  BreadcrumbProps, BreadcrumbItemType, PaginationProps, TabsProps, TabItem,
  // Overlay
  ModalProps,
} from '@/components/ui';
```

## Component Status

| Status | Count | Components |
|--------|-------|------------|
| ✅ Production Ready | 21 | All listed above with documentation links |
| 🔄 Extensible | 7 | Select, Form, Upload, DatePicker, Menu, Dropdown, Table, Drawer |
| 📦 Total | 28 | - |

## Design System Integration

All components are built with:
- **Design Tokens Only** - No hardcoded values
- **DSWebComLightV22026 Styles** - Imported from `src/DSWebComLightV22026/styles.css`
- **TypeScript** - Full type safety
- **Accessibility** - WCAG compliant
- **Responsive** - Optimized for PC Web (1024px+)

## Getting Started

1. **Import design system styles** in your app entry:
   ```tsx
   import '@/DSWebComLightV22026/styles.css';
   ```

2. **Add Toaster** for Message component:
   ```tsx
   import { Toaster } from 'sonner';
   
   function App() {
     return (
       <>
         <Toaster />
         {/* Your app */}
       </>
     );
   }
   ```

3. **Import and use components**:
   ```tsx
   import { Button, Input, Card } from '@/components/ui';
   ```

## Documentation Standards

Each component includes:
- ✅ Component introduction and use cases
- ✅ Interactive usage examples
- ✅ Complete API documentation
- ✅ Props descriptions with types
- ✅ Event handlers reference
- ✅ Style customization guide
- ✅ Do's and Don'ts best practices
- ✅ Accessibility notes
- ✅ Design token references

## Additional Resources

- [Complete Component Guide](./COMPONENT_LIBRARY_GUIDE.md)
- [Design System Styles](./src/DSWebComLightV22026/styles.css)
- [Design System Guidelines](./src/DSWebComLightV22026/guidelines/Guidelines.md)
- [Project README](./README.md)

---

**Last Updated:** 2026-05-09  
**Component Library Version:** 1.0.0  
**Design System:** DSWebComLightV22026
