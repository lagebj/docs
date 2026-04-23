# Design Tokens

Design tokens are the foundational elements of our design system - the core values that define our brand's visual language. These tokens ensure consistency across all platforms and applications.

## Token Categories

### Color Tokens
- Primary Colors
- Secondary Colors
- Semantic Colors (success, warning, error, info)
- Neutral Colors (grayscale)
- Accent Colors

### Typography Tokens
- Font Families
- Font Sizes
- Font Weights
- Line Heights
- Letter Spacing

### Spacing Tokens
- Base Unit System
- Padding Variants
- Margin Variants
- Gap Sizes

### Border Tokens
- Border Widths
- Border Radius
- Border Styles

### Shadow Tokens
- Elevation Levels
- Shadow Combinations

### Breakpoint Tokens
- Device Size Definitions
- Responsive Behavior Points

## Using Design Tokens

### In CSS
```css
.component {
  color: var(--color-primary);
  font-size: var(--font-size-md);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-sm);
}
```

### In JavaScript
```javascript
const styles = {
  color: 'var(--color-primary)',
  fontSize: 'var(--font-size-md)',
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--border-radius-sm)'
};
```

### In SCSS/Sass
```scss
.component {
  color: $color-primary;
  font-size: $font-size-md;
  padding: $spacing-lg;
  border-radius: $border-radius-sm;
}
```

## Token Naming Convention

Tokens follow a logical naming convention: `--{category}-{subcategory}-{variant}`

Examples:
- `--color-primary-500`
- `--font-size-heading-xl`
- `--spacing-inline-md`

## Updating Tokens

Token updates should be done cautiously as they affect the entire design system. Changes must go through the RFC process outlined in our contributing guidelines.