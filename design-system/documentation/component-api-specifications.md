# Component API Specifications

## Overview

This document defines the standardized API patterns and specifications for all components in our design system. These standards ensure consistency, predictability, and maintainability across all UI components.

## Component Structure Standards

### Base Component Interface
All components should implement a consistent interface pattern:

```typescript
interface BaseComponentProps {
  // Standard attributes
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  
  // Accessibility attributes
  role?: string;
  aria-label?: string;
  aria-describedby?: string;
  
  // Event handlers
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  
  // State attributes
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}
```

### Variant System
Components should support consistent variant patterns:

```typescript
type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

## Common Component Patterns

### Button Component API

```typescript
interface ButtonProps extends BaseComponentProps {
  // Content
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  
  // Appearance
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  
  // Behavior
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  
  // Events
  onPress?: (event: React.MouseEvent) => void;
}
```

### Input Component API

```typescript
interface InputProps extends BaseComponentProps {
  // Content
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  
  // Labels
  label?: string;
  helperText?: string;
  errorMessage?: string;
  
  // Appearance
  variant?: 'outlined' | 'filled' | 'standard';
  size?: Size;
  
  // Validation
  error?: boolean;
  success?: boolean;
  
  // Behavior
  autoFocus?: boolean;
  autoComplete?: string;
  
  // Events
  onChange?: (value: string) => void;
  onClear?: () => void;
}
```

### Card Component API

```typescript
interface CardProps extends BaseComponentProps {
  // Content
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  
  // Appearance
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: Size;
  
  // Media
  media?: React.ReactNode;
  mediaPosition?: 'top' | 'bottom' | 'aside';
  
  // Actions
  actions?: React.ReactNode;
}
```

## Prop Naming Conventions

### Boolean Props
- Use positive naming: `disabled` not `enabled`
- Use present tense: `loading` not `loaded`
- Use complete words: `disabled` not `disable`

### Event Handler Props
- Prefix with `on`: `onClick`, `onChange`, `onFocus`
- Use present tense: `onChange` not `onChanged`
- Be specific: `onDismiss` not `onClose` when applicable

### Content Props
- Use `children` for primary content
- Use descriptive names for specific content: `header`, `footer`, `media`
- Use `label` for form component labels

## Component Composition Patterns

### Slot-based Composition
Components should support slot-based composition for flexibility:

```jsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Media><img src="..." alt="..." /></Card.Media>
  <Card.Content>Description</Card.Content>
  <Card.Actions>
    <Button variant="primary">Action</Button>
  </Card.Actions>
</Card>
```

### Render Props Pattern
For advanced customization, use render props:

```jsx
<DataTable
  data={data}
  renderItem={(item) => (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.value}</TableCell>
    </TableRow>
  )}
/>
```

## State Management Standards

### Controlled vs Uncontrolled
Components should support both controlled and uncontrolled patterns:

```typescript
// Controlled
<Input value={value} onChange={setValue} />

// Uncontrolled
<Input defaultValue="Default" />
```

### Internal State Hooks
Use consistent naming for internal state hooks:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [isSelected, setIsSelected] = useState(false);
const [isLoading, setIsLoading] = useState(false);
```

## Accessibility Standards

### ARIA Attributes
All components must properly implement ARIA attributes:

- `role` for non-semantic elements
- `aria-label` for icon-only buttons
- `aria-describedby` for helper text
- `aria-invalid` for validation errors

### Keyboard Navigation
Components must support keyboard navigation:

- `tabindex` for focusable elements
- Arrow key navigation for lists/menus
- Enter/space activation for buttons
- Escape key for dismissible components

## Styling Standards

### CSS Class Names
Follow BEM methodology for class names:

```css
.component {}
.component--variant-primary {}
.component__element {}
.component__element--modifier {}
```

### CSS Custom Properties
Expose styling hooks through CSS custom properties:

```css
.component {
  --background: var(--color-surface-card);
  --border-radius: var(--border-radius-md);
  --padding: var(--spacing-md);
}
```

## Error Handling

### Validation Errors
Components should handle validation gracefully:

```typescript
interface ValidationError {
  message: string;
  code?: string;
  path?: string[];
}
```

### Error Boundaries
Complex components should implement error boundaries:

```typescript
class ComponentWithErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error
  }
}
```

## Testing Standards

### Data Attributes
Components should expose data attributes for testing:

```html
<button data-component="button" data-variant="primary" data-state="loading">
  Loading...
</button>
```

### Accessibility Testing
All components must pass accessibility audits:

-axe-core testing
-WCAG 2.1 AA compliance
-Screen reader compatibility

## Versioning and Deprecation

### Breaking Changes
When introducing breaking changes:

1. Mark old API as deprecated
2. Provide migration path
3. Maintain backward compatibility for one major version
4. Document changes in release notes

### Deprecation Warnings
Use console warnings for deprecated APIs:

```javascript
if (deprecatedProp) {
  console.warn('[DesignSystem] deprecatedProp is deprecated. Use newProp instead.');
}
```

## Documentation Requirements

Each component must include:

1. **Usage Examples** - Clear examples of common use cases
2. **API Reference** - Complete prop documentation
3. **Accessibility Notes** - A11y implementation details
4. **Responsive Behavior** - How component adapts to different screens
5. **Theming Support** - How component responds to theme changes