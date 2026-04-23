# Design Tokens Documentation

## Overview

Design tokens are the fundamental building blocks of our design system. They represent the smallest, indivisible units of design—such as colors, spacing, typography, and other visual properties.

These tokens provide a unified language for designers and developers to maintain consistency across all products and platforms.

## Color Tokens

### Brand Colors
- `brand-blue`: #1e40af - Primary brand color
- `brand-slate`: #334155 - Secondary brand color

### State Colors
- `success`: #059669 - Success state color
- `warning`: #d97706 - Warning state color
- `danger`: #dc2626 - Danger/error state color

### Surface Colors
- `surface-background`: White background
- `surface-card`: Light gray card background
- `surface-soft`: Gradient for soft surfaces
- `surface-band`: Gradient for band surfaces

### Text Colors
- `text-primary`: Dark gray for primary text
- `text-secondary`: Medium gray for secondary text
- `text-tertiary`: Light gray for tertiary text
- `text-disabled`: Muted gray for disabled text
- `text-inverse`: White text for dark backgrounds

### Button Colors
- `button-primary-bg`: Brand blue background
- `button-primary-hover`: Darker brand blue on hover
- `button-primary-text`: White text
- `button-secondary-bg`: Light gray background
- `button-secondary-hover`: Medium gray on hover
- `button-secondary-text`: Dark gray text
- `button-secondary-border`: Muted border color

## Spacing Tokens

Our spacing system is based on an 8px grid with additional responsive values:

- `xxs`: 4px
- `xs`: 8px
- `sm`: 16px
- `md`: 24px
- `lg`: 32px
- `xl`: 40px
- `xxl`: 48px
- `xxxl`: 64px

### Responsive Spacing
- `vertical`: clamp(2.5rem, 2rem + 1vw, 3.5rem) - Responsive vertical rhythm

## Typography Tokens

### Font Families
- `font-family-body`: System font stack for body text
- `font-family-heading`: Inherits from body font
- `font-family-mono`: Monospace font stack

### Font Sizes
- `font-size-xs`: 12px
- `font-size-sm`: 14px
- `font-size-base`: 16px
- `font-size-lg`: 18px
- `font-size-xl`: 20px
- `font-size-2xl`: 24px
- `font-size-3xl`: 30px
- `font-size-4xl`: 36px
- `font-size-5xl`: 48px
- `font-size-6xl`: 60px

## Border Tokens

### Border Radius
- `border-radius-none`: 0px
- `border-radius-sm`: 2px
- `border-radius-md`: 4px
- `border-radius-lg`: 8px
- `border-radius-xl`: 12px
- `border-radius-2xl`: 16px
- `border-radius-3xl`: 24px
- `border-radius-full`: Pill shape (9999px)

### Component-Specific Radii
- `border-radius-card`: 16px
- `border-radius-button`: 8px
- `border-radius-pill`: Pill shape

## Shadow Tokens

Our shadow system provides consistent depth and elevation:

- `shadow-none`: No shadow
- `shadow-xs`: Subtle shadow for small elements
- `shadow-sm`: Small shadow for cards
- `shadow-md`: Medium shadow for elevated elements
- `shadow-lg`: Large shadow for modals
- `shadow-xl`: Extra large shadow for overlay elements
- `shadow-2xl`: Maximum shadow for special cases

### Custom Shadows
- `shadow-gs-chrome`: Brand-specific chrome shadow
- `shadow-gs-card`: Brand-specific card shadow

## Motion Tokens

### Transition Durations
- `duration-instant`: 0ms
- `duration-fast`: 150ms
- `duration-medium`: 200ms
- `duration-slow`: 300ms
- `duration-slower`: 500ms

### Timing Functions
- `timing-function-linear`: Linear timing
- `timing-function-ease`: Ease timing
- `timing-function-ease-in`: Ease in timing
- `timing-function-ease-out`: Ease out timing
- `timing-function-ease-in-out`: Ease in out timing
- `timing-function-gs-ease`: Brand-specific timing function

## Usage Guidelines

### CSS Custom Properties
Tokens can be used as CSS custom properties:
```css
.my-component {
  background-color: var(--color-brand-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
}
```

### JavaScript Usage
Tokens are also available in JavaScript for dynamic applications:
```javascript
import { colors, spacing } from '@design-system/tokens';

const styles = {
  backgroundColor: colors['brand-primary'],
  padding: spacing['md'],
  borderRadius: '8px'
};
```

### Updates and Maintenance
When updating design tokens, ensure to:
1. Follow the semantic naming convention
2. Maintain backward compatibility where possible
3. Document breaking changes in release notes
4. Update all affected components after token changes