# Header Component

The header component provides consistent site navigation and branding across all pages.

## Basic Header

```html
<header class="header">
  <div class="header__container">
    <a href="/" class="header__logo">
      <img src="/logo.svg" alt="Company Name" />
    </a>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
```

## Header with Mobile Menu

```html
<header class="header">
  <div class="header__container">
    <a href="/" class="header__logo">
      <img src="/logo.svg" alt="Company Name" />
    </a>
    <button class="header__menu-toggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
```

## Header with Search

```html
<header class="header">
  <div class="header__container">
    <a href="/" class="header__logo">
      <img src="/logo.svg" alt="Company Name" />
    </a>
    <div class="header__search">
      <form role="search">
        <input type="search" placeholder="Search..." aria-label="Search">
        <button type="submit" aria-label="Submit search">
          <svg><!-- search icon --></svg>
        </button>
      </form>
    </div>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
```

## CSS Classes

| Class | Description |
|-------|-------------|
| `.header` | Main header container |
| `.header__container` | Header content wrapper |
| `.header__logo` | Logo styling |
| `.header__nav` | Navigation container |
| `.header__nav-list` | Navigation list |
| `.header__menu-toggle` | Mobile menu toggle button |
| `.header__search` | Search form container |

## JavaScript Integration

```javascript
// Header mobile menu toggle
const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('header__nav--open');
  menuToggle.setAttribute('aria-expanded', 
    nav.classList.contains('header__nav--open'));
});
```

## Accessibility

- Header must be the first focusable element on the page
- Logo must have appropriate alt text
- Navigation must be properly structured with `<nav>` element
- Mobile menu toggle must have `aria-expanded` attribute
- Search form must have proper labels and roles
- All interactive elements must be keyboard accessible