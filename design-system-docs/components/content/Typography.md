# Typography

Our typography system provides consistent and accessible text styles across all components and pages.

## Font Family

We use a system font stack for optimal performance and readability:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```

## Font Scale

Our font scale follows a logical hierarchy with proportional relationships:

| Class | Font Size | Line Height | Weight | Use Case |
|-------|-----------|-------------|--------|----------|
| `.text-display` | 3rem | 1.2 | 700 | Hero headers |
| `.text-h1` | 2.25rem | 1.2 | 600 | Page titles |
| `.text-h2` | 1.875rem | 1.3 | 600 | Section headings |
| `.text-h3` | 1.5rem | 1.4 | 600 | Subsection headings |
| `.text-h4` | 1.25rem | 1.5 | 600 | Card titles |
| `.text-body-large` | 1.125rem | 1.6 | 400 | Lead paragraphs |
| `.text-body` | 1rem | 1.6 | 400 | Main content |
| `.text-body-small` | 0.875rem | 1.6 | 400 | Supporting text |
| `.text-caption` | 0.75rem | 1.5 | 400 | Captions, footnotes |

## Text Alignment

```css
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }
```

## Text Styling

```css
.text-bold { font-weight: 700; }
.text-italic { font-style: italic; }
.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }
.text-underline { text-decoration: underline; }
.text-line-through { text-decoration: line-through; }
```

## Responsive Typography

All text styles automatically adjust for different screen sizes:

```css
@media (min-width: 768px) {
  .text-h1 { font-size: 2.5rem; }
  .text-h2 { font-size: 2rem; }
  .text-h3 { font-size: 1.75rem; }
}
```

## Examples

### Headings with Content
```html
<h1 class="text-h1">Main Heading</h1>
<p class="text-body-large">This is a lead paragraph that introduces the main content.</p>
<p class="text-body">This is the main body content with regular paragraph styling.</p>
```

### Mixed Content Block
```html
<div class="content-block">
  <h2 class="text-h2">Section Title</h2>
  <p class="text-body">Regular content paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
  <blockquote class="text-body-small">
    This is a supporting quote or note.
  </blockquote>
</div>
```

## Accessibility

- All text meets minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Font sizes use relative units (rem) for scalability
- Proper heading hierarchy is maintained (h1 → h2 → h3)
- Text scaling is supported for users who adjust their browser's default font size
- Avoid using color alone to convey information