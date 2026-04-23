# Grid System

The grid system provides a flexible, responsive layout foundation for consistent page structures across all devices.

## Basic Grid

```html
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-8">Main Content</div>
  <div class="col-span-4">Sidebar</div>
</div>
```

### Grid Properties

| Property | Description | Values |
|----------|-------------|--------|
| `grid-cols-{n}` | Number of columns | 1-12 |
| `gap-{size}` | Spacing between grid items | xs, sm, md, lg, xl |
| `col-span-{n}` | Column span width | 1-12 |
| `col-start-{n}` | Starting column position | 1-13 |

## Responsive Grid

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Examples

### Two Column Layout
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div class="bg-white p-4 rounded shadow">Content Area 1</div>
  <div class="bg-white p-4 rounded shadow">Content Area 2</div>
</div>
```

### Three Column Layout with Sidebar
```html
<div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
  <div class="lg:col-span-3 bg-white p-4 rounded shadow">Main Content</div>
  <div class="bg-white p-4 rounded shadow">Sidebar</div>
</div>
```

## Accessibility

- Grid layouts maintain proper reading order for screen readers
- All grid items should have meaningful content
- Use semantic HTML elements within grid items when appropriate