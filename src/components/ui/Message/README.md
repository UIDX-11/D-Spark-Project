# Message Component

## Introduction

The Message component displays toast notifications using Sonner, following DSWebComLightV22026 design system.

**Use Cases:** Success confirmations, error notifications, warnings, information messages.

## Setup

Add the Toaster to your app root:

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

## Usage Examples

### Basic Messages

```tsx
import { message } from '@/components/ui';

message.success('Operation successful!');
message.error('Something went wrong');
message.warning('Please check your input');
message.info('New update available');
```

### Custom Duration

```tsx
message.success('Saved successfully', 5000); // 5 seconds
message.error('Error occurred', 10000); // 10 seconds
```

### In Button Click

```tsx
import { Button, message } from '@/components/ui';

function Example() {
  const handleClick = async () => {
    try {
      await saveData();
      message.success('Data saved successfully');
    } catch (error) {
      message.error('Failed to save data');
    }
  };
  
  return <Button onClick={handleClick}>Save</Button>;
}
```

### Form Submission

```tsx
const handleSubmit = async (data) => {
  try {
    await api.submit(data);
    message.success('Form submitted successfully');
    navigate('/success');
  } catch (error) {
    message.error(error.message || 'Submission failed');
  }
};
```

## API Reference

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `message.success` | `(content: string, duration?: number) => void` | Show success message |
| `message.error` | `(content: string, duration?: number) => void` | Show error message |
| `message.warning` | `(content: string, duration?: number) => void` | Show warning message |
| `message.info` | `(content: string, duration?: number) => void` | Show info message |

### Parameters

- `content`: Message text (required)
- `duration`: Display duration in milliseconds (default: 3000)

### TypeScript Interface

```typescript
export interface MessageConfig {
  type?: 'success' | 'warning' | 'error' | 'info';
  content: ReactNode;
  duration?: number;
  onClose?: () => void;
}
```

## Design Tokens

- Success: `--成功色success/global-light/50`
- Warning: `--告警色warning/global-light/50`
- Error: `--危险色danger/global-light/50`
- Info: `--接入中&提示commissioning&prompt/global-light/50`

## Do's and Don'ts

✅ **Do:** Use for transient feedback  
✅ **Do:** Keep messages concise  
✅ **Do:** Use appropriate type for context  
❌ **Don't:** Use for critical errors needing action  
❌ **Don't:** Show multiple messages simultaneously  
❌ **Don't:** Use very long messages

---

**Component Version:** 1.0.0
