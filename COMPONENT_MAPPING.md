# Component Mapping Document: Custom CSS to Tailwind Utilities

This document maps existing custom CSS classes to equivalent Tailwind CSS utility classes to facilitate the migration to a utility-first approach.

## Typography Components

### Lead Paragraph (.gs-lead)
**Current CSS:**
```css
.gs-lead {
  font-size: clamp(1.1rem, 1rem + 0.4vw, 1.35rem);
  line-height: 1.65;
  max-width: 75ch;
  margin: 1.2rem 0 2rem 0;
  color: var(--gs-brand-slate);
  font-weight: 400;
  padding: 1.5rem 1.8rem;
  border-radius: 12px;
  background: var(--gs-surface-soft);
  border: 1px solid var(--gs-border-muted);
}
```

**Tailwind Equivalent:**
```html
<div class="text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] leading-[1.65] max-w-[75ch] my-4 py-6 px-7 rounded-xl bg-gs-surface-soft border border-gs-border-muted text-gs-brand-slate font-normal max-w-[75ch]">
  Lead content here
</div>
```

### Headings (.prose h2, h3, h4)
**Current CSS:**
```css
.prose h2 {
  color: #0f172a;
  letter-spacing: -0.02em;
  margin-top: 2.8rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.3;
}

.prose h3 {
  color: #1e293b;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.4;
}

.prose h4 {
  color: #334155;
  margin-top: 1.6rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  font-size: 1.15rem;
  line-height: 1.5;
}
```

**Tailwind Equivalent:**
```html
<!-- H2 -->
<h2 class="text-3xl font-bold text-slate-900 mt-10 mb-4 leading-[1.3] tracking-tight">
  Heading content
</h2>

<!-- H3 -->
<h3 class="text-2xl font-semibold text-slate-800 mt-8 mb-4 leading-[1.4]">
  Heading content
</h3>

<!-- H4 -->
<h4 class="text-xl font-semibold text-slate-700 mt-6 mb-3 leading-[1.5]">
  Heading content
</h4>
```

## Card Components

### Overview Band (.gs-overview-band)
**Current CSS:**
```css
.gs-overview-band {
  margin: 2rem 0 2.5rem;
  padding: clamp(1.2rem, 1rem + 0.8vw, 1.8rem);
  border: 1px solid var(--gs-border-muted);
  border-radius: 20px;
  background: var(--gs-surface-band);
  box-shadow: 0 8px 24px rgba(30, 41, 59, 0.06);
}
```

**Tailwind Equivalent:**
```html
<div class="my-8 py-[clamp(1.2rem,1rem+0.8vw,1.8rem)] border border-gs-border-muted rounded-2xl bg-gs-surface-band shadow-lg shadow-slate-800/5">
  Content here
</div>
```

### Card (.card)
**Current CSS:**
```css
.card {
  border: 1px solid var(--gs-border-muted);
  border-radius: 16px;
  background: var(--gs-surface-soft);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--gs-chrome-shadow);
  border-color: rgba(29, 78, 216, 0.4);
}

.card:focus-within {
  border-color: rgba(29, 78, 216, 0.44);
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.16);
}
```

**Tailwind Equivalent:**
```html
<div class="border border-gs-border-muted rounded-xl bg-gs-surface-soft transition-all duration-200 ease-in-out min-h-[150px] flex flex-col justify-between overflow-hidden hover:-translate-y-1 hover:shadow-gs-chrome hover:border-blue-500/40 focus-within:border-blue-500/44 focus-within:ring focus-within:ring-blue-500/16 focus-within:ring-offset-0">
  Card content
</div>
```

### Premium Card (.card.premium)
**Current CSS:**
```css
.card.premium {
  position: relative;
  background: linear-gradient(135deg, rgba(219, 234, 254, 0.5) 0%, rgba(238, 242, 255, 0.7) 100%);
  border: 1px solid rgba(99, 102, 241, 0.3);
  box-shadow: 0 10px 25px rgba(30, 64, 175, 0.1);
}

.card.premium::before {
  content: "PREMIUM";
  position: absolute;
  top: 10px;
  right: 10px;
  background: #1e40af;
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

**Tailwind Equivalent:**
```html
<div class="relative border border-indigo-400/30 shadow-lg shadow-blue-600/10 bg-gradient-to-br from-blue-100/50 to-blue-50/70">
  <span class="absolute top-2.5 right-2.5 bg-blue-800 text-white text-xs font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
    PREMIUM
  </span>
  Card content
</div>
```

## Button Components

### Primary Button (.gs-button-primary)
**Current CSS:**
```css
.gs-button-primary {
  background: var(--gs-button-primary-bg);
  color: var(--gs-button-primary-text);
}

.gs-button-primary:hover {
  background: var(--gs-button-primary-hover);
  opacity: 0.9;
}

.gs-button-primary:focus {
  outline: 2px solid var(--gs-brand-blue);
  outline-offset: 2px;
}
```

**Tailwind Equivalent:**
```html
<button class="bg-gs-button-primary-bg text-gs-button-primary-text hover:bg-gs-button-primary-hover hover:opacity-90 focus:outline focus:outline-2 focus:outline-gs-brand-blue focus:outline-offset-2">
  Button text
</button>
```

### Secondary Button (.gs-button-secondary)
**Current CSS:**
```css
.gs-button-secondary {
  background: var(--gs-button-secondary-bg);
  color: var(--gs-button-secondary-text);
  border: 1px solid var(--gs-button-secondary-border);
}

.gs-button-secondary:hover {
  background: var(--gs-button-secondary-hover);
}
```

**Tailwind Equivalent:**
```html
<button class="bg-gs-button-secondary-bg text-gs-button-secondary-text border border-gs-button-secondary-border hover:bg-gs-button-secondary-hover">
  Button text
</button>
```

## Navigation Components

### Navbar (.gs-navbar)
**Current CSS:**
```css
.gs-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--gs-border-muted);
  box-shadow: 0 7px 24px rgba(30, 41, 59, 0.08);
  background: rgba(255, 255, 255, 0.96) !important;
  padding: 0.8rem 0;
}
```

**Tailwind Equivalent:**
```html
<header class="sticky top-0 z-100 backdrop-blur-md border-b border-gs-border-muted shadow-lg shadow-slate-800/8 bg-white/96 !bg-white/96 py-3">
  Navigation content
</header>
```

## Feedback Components

### Feedback Response (.feedback-response)
**Current CSS (inline):**
```css
.feedback-response {
  margin-top: 1rem;
  display: none;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(219, 234, 254, 0.5);
}
```

**Tailwind Equivalent:**
```html
<div class="mt-4 hidden p-4 rounded-lg bg-blue-100/50">
  Response content
</div>
```

## Layout Components

### Content Area (#content-area)
**Current CSS:**
```css
#content-area {
  padding-top: var(--gs-space-vertical);
  padding-bottom: 4rem;
}
```

**Tailwind Equivalent:**
```html
<main class="pt-[var(--gs-space-vertical)] pb-16">
  Main content
</main>
```