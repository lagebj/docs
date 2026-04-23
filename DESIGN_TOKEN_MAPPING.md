# Design Token Mapping: CSS Custom Properties to Design System Tokens

## Current CSS Custom Properties Analysis

Based on `/docs/style.css:1-23`

### Brand Colors
1. `--gs-brand-blue: #1e40af`
   - **Token Equivalent**: `colors.gs.brand.blue` (`tailwind.tokens.json:5`)
   - **Usage**: Primary brand color, used in buttons, links, headings
   - **Migration**: Direct mapping available

2. `--gs-brand-slate: #334155`
   - **Token Equivalent**: `colors.gs.brand.slate` (`tailwind.tokens.json:6`)
   - **Usage**: Secondary brand color, used in text, borders
   - **Migration**: Direct mapping available

### Surface Gradients
3. `--gs-surface-soft: linear-gradient(180deg, rgba(219, 234, 254, 0.5) 0%, rgba(248, 250, 252, 0.96) 100%)`
   - **Token Equivalent**: `colors.gs.surface.soft` (`tailwind.tokens.json:12-13`)
   - **Usage**: Soft background gradients for cards, lead paragraphs
   - **Migration**: Tailwind doesn't support gradients in config - requires custom CSS class

4. `--gs-surface-band: linear-gradient(180deg, rgba(191, 219, 254, 0.42) 0%, rgba(241, 245, 249, 0.92) 100%)`
   - **Token Equivalent**: `colors.gs.surface.band` (`tailwind.tokens.json:13-14`)
   - **Usage**: Background for overview bands and premium content
   - **Migration**: Tailwind doesn't support gradients in config - requires custom CSS class

### Borders and Shadows
5. `--gs-border-muted: rgba(51, 65, 85, charter0.2)`
   - **Token Equivalent**: `colors.gs.border.muted` (`tailwind.tokens.json:9-10`)
   - **Usage**: Border color for cards, navigation, separators
   - **Migration**: Direct mapping available via `border-gs-border-muted`

6. `--gs-chrome-shadow: 0 14px 34px rgba(30, 64, 175, 0.12)`
   - **Token Equivalent**: `boxShadow.gs-chrome` (`tailwind.tokens.json:47`)
   - **Usage**: Chrome shadow effect for cards and elevated elements
   - **Migration**: Direct mapping via `shadow-gs-chrome`

### Spacing
7. `--gs-space-vertical: clamp(2.5rem, 2rem + 1vw  d, 3.5rem)`
   - **Token Equivalent**: `spacing.vertical` (`tailwind.tokens.json:34`)
   - **Usage**: Responsive vertical spacing for content areas
   - **Migration**: Tailwind doesn't support `clamp()` in config - requires custom utility

### State Colors
8. `--gs-success: #059669`
   - **Token Equivalent**: `colors.gs.success` (`tailwind.tokens.json:15`)
   - **Usage**: Success states, validation feedback
   - **Migration**: Direct mapping available

9. `--gs-warning: #d97706`
   - **Token Equivalent**: `colors.gs.warning` (`tailwind.tokens.json:16`)
   - **Usage**: Warning states, caution indicators
   - **Migration**: Direct mapping available

10. `--gs-danger: #dc2626`
    - **Token Equivalent**: `colors.gs.danger` (`tailwind.tokens.json:17`)
    - **Usage**: Error states, critical alerts
    - **Migration**: Direct mapping available

### Button Tokens
11. `--gs-button-primary-bg: #1e40af`
    - **Token Equivalent**: `colors.gs.button.primary.bg` (`tailwind.tokens.json:20`)
    - **Usage**: Primary button background
--    **Migration**: Direct mapping available via `bg-gs-button-primary-bg`

12. `--gs-button-primary-hover: #1e3a8a`
    - **Token Equivalent**: `colors.gs.button.primary.hover` (`tailwind.tokens.json:21`)
    - **Usage**: Primary button hover state
    - **Migration**: Direct mapping available via `hover:bg-gs-button-primary-hover`

13. `--gs-button-primary-text: #ffffff`
    - **Token Equivalent**: `colors.gs.button.primary.text` (`tailwind.tokens.json:22`)
    - **Usage**: Primary button text color
    - **Migration**: Direct mapping available via `text-gs-button-primary-text`

14. `--gs-button-secondary-bg: #f8fafc`
    - **Token Equivalent**: `colors.gs.button.secondary.bg` (`tailwind.tokens.json:25`)
    - **Usage**: Secondary button background
    - **Migration**: Direct mapping available via `bg-gs-button-secondary-bg`

15. `--gs-button-secondary-hover: #e2e8f0`
    - **Token Equivalent**: `colors.gs.button.secondary.hover` (`tailwind.tokens.json:26`)
    - **Usage**: Secondary button hover state
    - **Migration**: Direct mapping available via `hover:bg-gs-button-secondary-hover`

16. `--gs-button-secondary-text: #334155`
    - **Token Equivalent**: `colors.gs.button.secondary.text` (`tailwind.tokens.json:27`)
    - **Usage**: Secondary button text color
    - **Migration**: Direct mapping available via `text-gs-button-secondary-text`

17. `--gs-button-secondary-border: var(--gs-border-muted)`
    - **Token Equivalent**: `colors.gs.button.secondary.border` (`tailwind.tokens.json:28`)
    - **Usage**: Secondary button border color
    - **Migration**: Direct mapping available via `border-gs-button-secondary-border`

### Font Family
18. `--gs-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`
    - **Token Equivalent**: `fontFamily.gs-body` (`tailwind.config.js:50`)
    - **Usage**: Default font family for the site
    - **Migration**: Direct mapping available via `font-gs-body`

## Missing from Current Token Architecture

### Identified Gaps:
1. **Typography Tokens**
   - Font sizes (based on `.prose` heading sizes)
   - Line heights (1.3, 1.4, 1.5, 1.65, 1.7 values in use)
   - Letter spacing (`-0.02em` for headings)

2. **Border Radius Values**
   - 12px (`.gs-lead`)
   - 16px (`.card`)
   - 20px (`.gs-overview-band`)
   - 999px (nav tabs, chips)
   - Different from current `borderRadius.gs-card: 16px` only

3. **Box Shadow Variations**
   - `0 7px 24px rgba(30, 41, 59, 0.08)` (navbar)
   - `0 8px 24px rgba(30, 41, 59, 0.06)` (overview band)
   - `0 6px 16px rgba(30, 41, 59, 0.08)` (signal card hover)
   - Different from current `boxShadow.gs-chrome/card: 0 14px 34px rgba(30, 64, 175, 0.12)`

4. **Transition Timing**
   - `150ms ease` (nav tabs, buttons)
   - `160ms ease` (signal cards)
   - `200ms ease` (cards)
   - Missing `transitionTimingFunction.ease` value

## Migration Path Recommendations

### Category A: Direct Tailwind Equivalents
```css
/* CSS Custom Property */
color: var(--gs-brand-blue);

/* Tailwind Equivalent */
text-gs-brand-blue
```

**Properties with direct mappings:**
- Brand colors (`--gs-brand-blue`, `--gs-brand-slate`)
- State colors (`--gs-success`, `--gs-warning`, `--gs-danger`)
- Button colors (all 7 button tokens)
- Border color (`--gs-border-muted`)
- Box shadow (`--gs-chrome-shadow`)
- Font family (`--gs-font-family`)

### Category B: Custom Tailwind Plugins Needed
```css
/* CSS Custom Property */
padding-top: var(--gs-space-vertical);

/* Tailwind Plugin Needed */
pt-gs-space-vertical (requires clamp() support)
```

**Properties requiring plugins:**
- Responsive spacing (`--gs-space-vertical` with `clamp()`)
-Mult stop gradients (`--gs-surface-soft`, `--gs-surface-band`)

### Category C: CSS/SASS Integration Required
```css
/* CSS Custom Property */
border-radius: 999px;

/* Tailwind + CSS Integration */
rounded-[999px] or custom CSS class
```

**Properties requiring CSS integration:**
- Complex border radius values (999px)
- Gradient backgrounds (linear-gradient)
- Complex shadows with specific rgba values

## Implementation Priority

### High Priority (Week 1)
1. **Add missing typography tokens** to `tailwind.tokens.json`
2. **Expand border radius tokens** to match actual usage
3. **Add box shadow variations** for different component types
4. **Define transition timing tokens** for consistency

### Medium Priority (Week 2)
1. **Create gradient utility classes** for surface backgrounds
2. **Implement responsive spacing plugin** for `clamp()` support
3. **Validate token usage** across all components

### Low Priority (Week 3+)
1. **Token distribution system** for CSS/JS consistency
2. **Theming capability** for brand variations
3. **Token versioning and deprecation**

## Token Usage Validation Checklist

### Colors (✅ Complete)
-sm[ ] All CSS color custom properties mapped to tokens
- [ ] Token names follow semantic convention
W`_[ ] Token values match design specifications

### Spacing (⚠️ Partial)
- [ ] Fixed spacing values (xs, sm, md, lg, xl) defined
- [ ] Responsive spacing (`clamp()`) migration path defined
-[ ] Spacing tokens used consistently across components

### Typography (⚠️ Partial)
- [x] Font family tokens defined
- [ ] Font size scale established
- [ ] Line height tokens defined
- [ ] Letter spacing tokens added

### Borders & Radius (⚠️ Partial)
- [ ] Border radius values standardized
- [ ] Border width tokens defined  
- [ ] Border color tokens comprehensive

### Shadows (⚠️ Partial)
- [ ] Shadow variations for different elevations
- [ ] Shadow tokens match component requirements
- [ ] Focus state shadows defined separately

### Motion (⚠️ Partial)
- [ ] Transition duration tokens defined
- [ ] Transition timing functions specified
- [ ] Animation keyframes tokenized

## Next Steps

1. **Update `tailwind.tokens.json`** with missing tokens
2. **Create migration guide** for each CSS custom property
3. **Test token usage** in sample components
4. **Document token architecture** with usage examples
5. **Implement token validation** to ensure consistency

---

*Token mapping completed: Phase 3 Task 1*
*Mapper: LeadEng 2*
*Date: April 23, 2026*