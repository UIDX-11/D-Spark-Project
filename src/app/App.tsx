import { useState } from 'react';
import { Button, Input, Card, Badge, Alert } from '@/components/ui';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--灰色-dust/light/20)] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[var(--灰色-dust/light/120)]">
            Enterprise Component Library
          </h1>
          <p className="text-lg text-[var(--灰色-dust/light/110)]">
            Production-ready React + TypeScript + Tailwind CSS components
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Badge variant="success">TypeScript</Badge>
            <Badge variant="info">React 18</Badge>
            <Badge variant="default">Tailwind CSS</Badge>
            <Badge variant="warning">Enterprise Ready</Badge>
          </div>
        </div>

        {/* Alert Demo */}
        {showAlert && (
          <Alert
            variant="info"
            title="Welcome to the Component Library"
            closable
            onClose={() => setShowAlert(false)}
          >
            Explore our collection of accessible, production-ready components built
            with design tokens and best practices.
          </Alert>
        )}

        {/* Button Variants */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--灰色-dust/light/120)]">
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" loading>Loading</Button>
          </div>
        </Card>

        {/* Button Sizes */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--灰色-dust/light/120)]">
            Button Sizes
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm" variant="primary">Small</Button>
            <Button size="md" variant="primary">Medium</Button>
            <Button size="lg" variant="primary">Large</Button>
          </div>
        </Card>

        {/* Form Example */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--灰色-dust/light/120)]">
            Form Components
          </h2>
          <div className="space-y-4 max-w-md">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="We'll never share your email"
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Username"
              type="text"
              defaultValue="johndoe"
              helperText="This username is already taken"
              error
              errorMessage="Please choose a different username"
            />
            <Input
              label="Amount"
              type="number"
              prefix="$"
              suffix="USD"
              defaultValue="100"
            />
            <div className="flex gap-2">
              <Button variant="primary" fullWidth>
                Sign Up
              </Button>
              <Button variant="outline" fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        </Card>

        {/* Card Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <h3 className="text-xl font-semibold mb-2 text-[var(--灰色-dust/light/120)]">
              Default Card
            </h3>
            <p className="text-[var(--灰色-dust/light/110)]">
              Standard card with border and background
            </p>
          </Card>

          <Card variant="outlined">
            <h3 className="text-xl font-semibold mb-2 text-[var(--灰色-dust/light/120)]">
              Outlined Card
            </h3>
            <p className="text-[var(--灰色-dust/light/110)]">
              Transparent background with border
            </p>
          </Card>

          <Card variant="elevated" hoverable>
            <h3 className="text-xl font-semibold mb-2 text-[var(--灰色-dust/light/120)]">
              Elevated Card
            </h3>
            <p className="text-[var(--灰色-dust/light/110)]">
              Shadow with hover effect
            </p>
          </Card>
        </div>

        {/* Badges */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--灰色-dust/light/120)]">
            Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="error" dot>Offline</Badge>
            <Badge size="sm" variant="info">Small</Badge>
          </div>
        </Card>

        {/* Alerts */}
        <div className="space-y-4">
          <Alert variant="info" title="Information">
            This is an informational message with additional context.
          </Alert>
          <Alert variant="success" title="Success!">
            Your changes have been saved successfully.
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review your changes before submitting.
          </Alert>
          <Alert variant="error" title="Error" closable onClose={() => {}}>
            There was an error processing your request. Please try again.
          </Alert>
        </div>

        {/* Complex Card Example */}
        <Card
          header={
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-[var(--灰色-dust/light/120)]">
                User Profile
              </h3>
              <Badge variant="success" dot>Active</Badge>
            </div>
          }
          footer={
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Save Changes</Button>
            </div>
          }
        >
          <div className="space-y-3">
            <Input label="Full Name" defaultValue="John Doe" />
            <Input label="Job Title" defaultValue="Senior Developer" />
            <Input label="Location" defaultValue="San Francisco, CA" />
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 text-[var(--灰色-dust/light/100)]">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
          <p className="text-sm mt-2">Check the guidelines/ folder for complete documentation</p>
        </div>
      </div>
    </div>
  );
}