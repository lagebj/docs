# Button Component

Buttons are interactive elements that trigger actions when clicked or tapped.

## Button Types

### Primary Button
```html
<button class="btn btn--primary">Primary Action</button>
```

### Secondary Button
```html
<button class="btn btn--secondary">Secondary Action</button>
```

### Tertiary Button
```html
<button class="btn btn--tertiary">Tertiary Action</button>
```

### Icon Button
```html
<button class="btn btn--icon" aria-label="Close">
  <svg><!-- icon --></svg>
</button>
```

## Button Sizes

```html
<button class="btn btn--primary btn--small">Small Button</button>
<button class="btn btn--primary">Default Button</button>
<button class="btn btn--primary btn--large">Large Button</button>
```

## Button States

### Disabled State
```html
<button class="btn btn--primary" disabled>Disabled Button</button>
```

### Loading State
```html
<button class="btn btn--primary btn--loading">
  <span class="loading-spinner"></span>
  Loading...
</button>
```

### Active State
```html
<button class="btn btn--primary is-active">Active Button</button>
```

## CSS Classes

| Class | Description |
|-------|-------------|
| `.btn` | Base button class |
| `.btn--primary` | Primary action styling |
| `.btn--secondary` | Secondary action styling |
| `.btn--tertiary` | Tertiary action styling |
| `.btn--icon` | Icon-only button |
| `.btn--small` | Small button size |
| `.btn--large` | Large button size |
| `.btn--loading` | Loading state |
| `.is-active` | Active state |

## Full Example with All Variants

```html
<div class="button-examples">
  <button class="btn btn--primary">Primary</button>
  <button class="btn btn--secondary">Secondary</button>
  <button class="btn btn--tertiary">Tertiary</button>
  <button class="btn btn--primary" disabled>Disabled</button>
  <button class="btn btn--primary btn--loading">
    <span class="loading-spinner"></span>
    Loading
  </button>
  <button class="btn btn--icon" aria-label="Settings">
    <svg><!-- gear icon --></svg>
  </button>
</div>
```

## JavaScript Integration

```javascript
// Button click handler
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    // Handle button click
    console.log('Button clicked:', event.target.textContent);
  });
});

// Loading state management
function setLoading(button, isLoading) {
  if (isLoading) {
    button.classList.add('btn--loading');
    button.disabled = true;
  } else {
    button.classList.remove('btn--loading');
    button.disabled = false;
  }
}
```

## Accessibility

- All buttons must have discernible text content
- Icon-only buttons must have `aria-label` attributes
- Buttons must be focusable and operable via keyboard
- Use `disabled` attribute rather than `aria-disabled` when appropriate
- Loading buttons should indicate their state to screen readers
- Button text should clearly describe the action that will occur