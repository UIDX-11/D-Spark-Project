# Component Usage Guidelines

> **Complete reference for all UI components with Do/Don't examples**

## 📋 Component Categories

- [Button](#button)
- [Input](#input)
- [Card](#card)
- [Select](#select)
- [Checkbox & Radio](#checkbox--radio)
- [Modal](#modal)
- [Toast](#toast)
- [Alert](#alert)
- [Badge](#badge)
- [Avatar](#avatar)

---

## Button

### API Reference

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: ReactNode;
}
```

### Basic Usage

```tsx
import { Button } from '@/components/ui/Button';

// Primary action
<Button variant="primary">Submit</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// With icon
<Button icon={<Icon />} iconPosition="left">
  Save Changes
</Button>

// Loading state
<Button loading>Processing...</Button>
```

### ✅ Do

```tsx
// Use semantic variants
<Button variant="primary">Create Account</Button>
<Button variant="danger">Delete Item</Button>

// Provide clear, action-oriented labels
<Button>Save Changes</Button>
<Button>Download Report</Button>

// Use loading states for async actions
<Button loading={isSubmitting}>Submit Form</Button>

// Use disabled for unavailable actions
<Button disabled={!isValid}>Continue</Button>

// Use icons to enhance meaning
<Button icon={<PlusIcon />}>Add Item</Button>
```

### ❌ Don't

```tsx
// Don't use vague labels
<Button>Click Here</Button>  // ❌
<Button>OK</Button>           // ❌

// Don't use buttons for navigation
<Button onClick={() => router.push('/home')}>Go Home</Button>  // ❌
// Use <Link> instead

// Don't mix colors arbitrarily
<Button className="bg-pink-500">Submit</Button>  // ❌
// Use semantic variants instead

// Don't put multiple primary buttons in same context
<div>
  <Button variant="primary">Save</Button>
  <Button variant="primary">Cancel</Button>  // ❌
</div>
// One primary, others secondary

// Don't use tiny text
<Button><span className="text-xs">Button</span></Button>  // ❌
```

### Size Guidelines

```tsx
// Small: Secondary actions, compact UIs
<Button size="sm">Edit</Button>

// Medium (default): Standard forms, dialogs
<Button size="md">Submit</Button>

// Large: Hero CTAs, mobile interfaces
<Button size="lg">Get Started</Button>
```

---

## Input

### API Reference

```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  maxLength?: number;
  placeholder?: string;
}
```

### Basic Usage

```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  required
/>

<Input
  label="Amount"
  type="number"
  prefix="$"
  suffix="USD"
/>

<Input
  label="Password"
  type="password"
  error={!!errors.password}
  errorMessage={errors.password?.message}
/>
```

### ✅ Do

```tsx
// Always provide labels for accessibility
<Input label="Full Name" id="fullName" />

// Use appropriate input types
<Input type="email" label="Email" />
<Input type="tel" label="Phone" />
<Input type="url" label="Website" />

// Provide helpful error messages
<Input
  error={true}
  errorMessage="Password must be at least 8 characters"
/>

// Use helper text for guidance
<Input
  label="Username"
  helperText="Letters, numbers, and underscores only"
/>

// Use prefix/suffix for context
<Input label="Price" type="number" prefix="$" />
<Input label="Weight" type="number" suffix="kg" />

// Show required fields
<Input label="Email" required />
```

### ❌ Don't

```tsx
// Don't omit labels
<Input placeholder="Enter name" />  // ❌

// Don't use placeholder as label
<Input placeholder="Email Address" />  // ❌
// Use proper label prop

// Don't use wrong input type
<Input type="text" label="Email" />  // ❌
// Use type="email"

// Don't use vague error messages
<Input error errorMessage="Invalid" />  // ❌
// Be specific

// Don't disable without explanation
<Input disabled />  // ❌
// Provide helperText explaining why

// Don't set unreasonable maxLength
<Input label="Name" maxLength={5} />  // ❌
```

### Form Integration

```tsx
// With React Hook Form
import { useForm } from 'react-hook-form';

const { register, formState: { errors } } = useForm();

<Input
  label="Email"
  {...register('email', { required: 'Email is required' })}
  error={!!errors.email}
  errorMessage={errors.email?.message}
/>
```

---

## Card

### API Reference

```tsx
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}
```

### Basic Usage

```tsx
import { Card } from '@/components/ui/Card';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

<Card
  variant="elevated"
  header={<h3>Product Details</h3>}
  footer={<Button>View More</Button>}
>
  <p>Main content area</p>
</Card>
```

### ✅ Do

```tsx
// Use semantic structure
<Card
  header={<h3>Article Title</h3>}
  footer={<time>May 9, 2026</time>}
>
  <p>Article content...</p>
</Card>

// Use hoverable for interactive cards
<Card hoverable clickable onClick={handleClick}>
  Click to view details
</Card>

// Group related content
<Card>
  <h3>User Settings</h3>
  <Input label="Username" />
  <Input label="Email" />
  <Button>Save</Button>
</Card>

// Use appropriate variants
<Card variant="outlined">  // Subtle, minimal
<Card variant="elevated">  // Prominent, important
```

### ❌ Don't

```tsx
// Don't nest cards unnecessarily
<Card>
  <Card>  // ❌ Avoid nesting
    Content
  </Card>
</Card>

// Don't use cards for everything
<Card><Button>Click</Button></Card>  // ❌
// Just use the button

// Don't make cards too small
<Card padding="sm" className="w-20">  // ❌
  Hi
</Card>

// Don't overuse elevated variant
<div>
  <Card variant="elevated">Card 1</Card>
  <Card variant="elevated">Card 2</Card>
  <Card variant="elevated">Card 3</Card>  // ❌ Too much
</div>
```

---

## Select

### API Reference

```tsx
interface SelectProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
}
```

### Basic Usage

```tsx
import { Select } from '@/components/ui/Select';

<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
  value={selectedCountry}
  onChange={setSelectedCountry}
/>
```

### ✅ Do

```tsx
// Provide clear labels
<Select
  label="Preferred Language"
  options={languageOptions}
/>

// Group related options
<Select
  options={[
    { value: 'header1', label: 'North America', disabled: true },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'header2', label: 'Europe', disabled: true },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>

// Use searchable for long lists
<Select
  searchable
  options={allCountries}  // 200+ options
  placeholder="Search countries..."
/>

// Provide placeholder
<Select placeholder="Choose an option..." />
```

### ❌ Don't

```tsx
// Don't use for < 3 options
<Select options={[
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]} />  // ❌ Use radio buttons instead

// Don't use vague labels
<Select
  options={[
    { value: '1', label: 'Option 1' },  // ❌
    { value: '2', label: 'Option 2' },  // ❌
  ]}
/>

// Don't omit values
<Select options={[
  { label: 'Red' },  // ❌ Missing value
]} />
```

---

## Checkbox & Radio

### API Reference

```tsx
interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

interface RadioGroupProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  orientation?: 'horizontal' | 'vertical';
}
```

### Basic Usage

```tsx
import { Checkbox, RadioGroup } from '@/components/ui';

// Checkbox
<Checkbox
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={setAgreed}
/>

// Radio Group
<RadioGroup
  name="size"
  options={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]}
  value={selectedSize}
  onChange={setSelectedSize}
/>
```

### ✅ Do

```tsx
// Use checkboxes for multiple selections
<Checkbox label="JavaScript" />
<Checkbox label="TypeScript" />
<Checkbox label="Python" />

// Use radio for single selection
<RadioGroup
  name="payment"
  options={[
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
  ]}
/>

// Provide clear, concise labels
<Checkbox label="Send me email notifications" />

// Use vertical layout for long labels
<RadioGroup
  orientation="vertical"
  options={longOptions}
/>
```

### ❌ Don't

```tsx
// Don't use radio for multi-select
<RadioGroup name="skills" />  // ❌ Use checkboxes

// Don't use checkbox for exclusive choice
<Checkbox label="Male" />
<Checkbox label="Female" />  // ❌ Use radio group

// Don't omit labels
<Checkbox />  // ❌

// Don't use > 7 radio buttons
<RadioGroup options={fiftyOptions} />  // ❌ Use Select
```

---

## Modal

### API Reference

```tsx
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}
```

### Basic Usage

```tsx
import { Modal } from '@/components/ui/Modal';

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Delete"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

### ✅ Do

```tsx
// Provide clear title
<Modal title="Add New User" />

// Use appropriate size
<Modal size="sm">  // Confirmations
<Modal size="md">  // Forms
<Modal size="lg">  // Complex content

// Provide clear actions in footer
<Modal footer={
  <>
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </>
}>

// Allow ESC key to close
<Modal closeOnEscape />

// Prevent accidental closes for important actions
<Modal closeOnOverlayClick={false}>
  Unsaved changes will be lost
</Modal>
```

### ❌ Don't

```tsx
// Don't nest modals
<Modal open>
  <Modal open>  // ❌
  </Modal>
</Modal>

// Don't use for notifications
<Modal>Item added to cart</Modal>  // ❌ Use Toast

// Don't put navigation in modals
<Modal>
  <nav>  // ❌
    <a href="/home">Home</a>
  </nav>
</Modal>

// Don't make modals auto-open
useEffect(() => {
  setModalOpen(true);  // ❌ Unexpected
}, []);
```

---

## Toast

### API Reference

```tsx
interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  duration?: number;  // ms
  action?: { label: string; onClick: () => void };
}

// Usage via hook
const toast = useToast();
toast.success('Changes saved');
```

### Basic Usage

```tsx
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const toast = useToast();

  const handleSave = () => {
    // ... save logic
    toast.success('Changes saved successfully');
  };

  const handleError = () => {
    toast.error({
      title: 'Failed to save',
      description: 'Please try again later',
    });
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

### ✅ Do

```tsx
// Use appropriate variants
toast.success('Profile updated');
toast.error('Failed to upload file');
toast.warning('Storage almost full');
toast.info('New version available');

// Provide context in errors
toast.error({
  title: 'Upload failed',
  description: 'File size exceeds 10MB limit',
});

// Add undo action when applicable
toast.success({
  title: 'Item deleted',
  action: {
    label: 'Undo',
    onClick: handleUndo,
  },
});

// Use reasonable duration
toast.success('Saved', { duration: 3000 });
toast.error('Error', { duration: 5000 });
```

### ❌ Don't

```tsx
// Don't show multiple toasts rapidly
toasts.forEach(msg => toast.info(msg));  // ❌

// Don't use for complex content
toast.info(<div>...long form content...</div>);  // ❌
// Use Modal instead

// Don't leave toasts open indefinitely
toast.info('Message', { duration: Infinity });  // ❌

// Don't use for critical errors
toast.error('Payment failed');  // ❌
// Use Modal for critical issues
```

---

## Alert

### API Reference

```tsx
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: ReactNode;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
}
```

### Basic Usage

```tsx
import { Alert } from '@/components/ui/Alert';

<Alert
  variant="warning"
  title="Maintenance Notice"
  description="System will be down for maintenance on May 10"
/>

<Alert
  variant="error"
  title="Validation Error"
  closable
  onClose={handleClose}
>
  Please correct the errors before submitting
</Alert>
```

### ✅ Do

```tsx
// Use for persistent, contextual feedback
<Alert variant="info">
  Your trial expires in 7 days
</Alert>

// Provide actionable information
<Alert variant="warning">
  Please verify your email to continue
  <Button size="sm">Resend Email</Button>
</Alert>

// Use appropriate variants
<Alert variant="success">Account created</Alert>
<Alert variant="error">Invalid credentials</Alert>
```

### ❌ Don't

```tsx
// Don't use for temporary messages
<Alert>File uploaded</Alert>  // ❌ Use Toast

// Don't stack multiple alerts
<div>
  <Alert />
  <Alert />
  <Alert />  // ❌ Overwhelming
</div>

// Don't use for loading states
<Alert>Loading...</Alert>  // ❌ Use Spinner
```

---

## Badge

### API Reference

```tsx
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: ReactNode;
}
```

### Basic Usage

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge>New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Urgent</Badge>
<Badge dot variant="warning">3 notifications</Badge>
```

### ✅ Do

```tsx
// Use for status indicators
<Badge variant="success">Published</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Rejected</Badge>

// Use for counts
<span>Messages <Badge>12</Badge></span>

// Use dot for subtle indicators
<Badge dot variant="error">Alerts</Badge>
```

### ❌ Don't

```tsx
// Don't use for CTAs
<Badge onClick={handleClick}>Click Me</Badge>  // ❌
// Use Button

// Don't use long text
<Badge>This is a very long badge text</Badge>  // ❌

// Don't overuse colors
<Badge variant="error">Info</Badge>  // ❌ Wrong semantic
```

---

## Avatar

### API Reference

```tsx
interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}
```

### Basic Usage

```tsx
import { Avatar } from '@/components/ui/Avatar';

<Avatar
  src="/user.jpg"
  alt="John Doe"
  size="md"
/>

<Avatar
  alt="John Doe"
  fallback="JD"
  status="online"
/>
```

### ✅ Do

```tsx
// Always provide alt text
<Avatar src="..." alt="User name" />

// Use fallback for missing images
<Avatar alt="Jane Smith" fallback="JS" />

// Use appropriate sizes
<Avatar size="xs" />  // Lists, compact UI
<Avatar size="lg" />  // Profile pages

// Show status when relevant
<Avatar status="online" />
```

### ❌ Don't

```tsx
// Don't omit alt text
<Avatar src="..." />  // ❌

// Don't use for icons/logos
<Avatar src="/logo.png" alt="Company" />  // ❌

// Don't use excessive sizes
<Avatar size="xl" />  // ❌ Reserved for specific uses
```

---

## General Component Guidelines

### Composition Patterns

```tsx
// ✅ Compose components together
<Card>
  <Avatar />
  <div>
    <h3>User Name</h3>
    <Badge>Pro</Badge>
  </div>
  <Button>View Profile</Button>
</Card>

// ✅ Use semantic HTML
<article>
  <header><h2>Title</h2></header>
  <main>Content</main>
  <footer>Metadata</footer>
</article>
```

### State Management

```tsx
// ✅ Controlled components
<Input value={value} onChange={setValue} />

// ✅ Uncontrolled with default
<Input defaultValue="initial" />
```

### Error Handling

```tsx
// ✅ Graceful degradation
<Avatar
  src={mayFailUrl}
  fallback="XX"  // Shows when src fails
/>

// ✅ Error boundaries for critical UI
<ErrorBoundary fallback={<ErrorMessage />}>
  <ComplexComponent />
</ErrorBoundary>
```

---

## Next Steps

- See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design tokens
- See [BEST_PRACTICES.md](./BEST_PRACTICES.md) for coding patterns
- See [SETUP.md](./SETUP.md) for installation guide
