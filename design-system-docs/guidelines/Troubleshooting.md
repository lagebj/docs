# Troubleshooting Guide

This guide helps diagnose and resolve common issues when implementing the design system.

## Common Issues and Solutions

### 1. Styles Not Applying
**Problem**: Components don't look as expected or styles appear missing.

**Diagnosis**:
1. Check that CSS files are properly imported
2. Verify class names match documentation exactly
3. Confirm design system CSS loads after any conflicting stylesheets

**Solution**:
```scss
// Correct import order
@import '~design-system/dist/tokens.css';
@import '~design-system/dist/components.css';
// Then your overrides
```

**Prevention**:
- Use linting rules to catch incorrect class names
- Create component preview pages for visual verification

### 2. Responsive Issues
**Problem**: Components don't behave responsively as documented.

**Diagnosis**:
1. Check viewport meta tag in HTML
2. Verify breakpoints match design system values
3. Confirm CSS grid/flexbox properties aren't overridden

**Solution**:
```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```

**Prevention**:
- Always test components across all supported breakpoints
- Document responsive behavior in component stories

### 3. Accessibility Violations
**Problem**: Accessibility audit tools report violations.

**Diagnosis**:
1. Run automated accessibility tools (axe-core, pa11y)
2. Manually test keyboard navigation
3. Validate color contrast ratios

**Solution**:
```html
<!-- Ensure proper semantics -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>
  <!-- menu items -->
</ul>
```

**Prevention**:
- Integrate accessibility testing in CI pipeline
- Include accessibility criteria in code reviews

### 4. Performance Problems
**Problem**: Pages load slowly or components cause jank.

**Diagnosis**:
1. Profile with browser dev tools
2. Check for excessive DOM nodes
3. Verify unnecessary re-renders aren't occurring

**Solution**:
```css
/* Avoid expensive properties in animations */
.optimized-component {
  will-change: transform;
  contain: layout style paint;
}
```

**Prevention**:
- Monitor bundle sizes regularly
- Audit component performance during development

## FAQ

### How do I customize design system components?
Customize components using CSS custom properties or utility classes:

```css
/* Customize design tokens locally */
.my-page {
  --color-primary: #ff6b35;
  --font-size-h1: 2.5rem;
}

/* Override component styles */
.custom-card {
  background-color: var(--color-background-alt);
  border: 2px solid var(--color-primary);
}
```

### Why aren't my design tokens working?
Verify these common issues:
1. Tokens are declared in correct scope
2. Variable names match exactly (case-sensitive)
3. Fallback values are provided
4. CSS file importing tokens is loaded

```css
.component {
  color: var(--color-primary, #007bff); /* with fallback */
}
```

### How do I handle design system updates?
Follow these steps for design system updates:

1. **Review Changelog**
   ```bash
   npm view @company/design-system changelog
   ```

2. **Test in Isolation**
   Create a test branch to evaluate changes

3. **Update Gradually**
   Use feature flags or progressive rollout techniques

4. **Communicate Changes**
   Notify team members of visual or behavioral differences

### My component looks different in different browsers
This typically indicates CSS normalization issues:

1. Include a CSS reset or normalize stylesheet
2. Test all supported browsers during development
3. Use vendor prefixes for experimental properties
4. Document browser-specific workarounds

```css
/* CSS reset example */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

## Debugging Tools

### Developer Tools
Most browser developer tools include features for debugging design system issues:

1. **Elements Panel**: Inspect computed styles and inheritance
2. **Console**: Check for CSS loading errors
3. **Network Tab**: Verify CSS files load correctly
4. **Accessibility Inspector**: Check ARIA attributes and semantics

### Design System Dev Tools
```bash
# Run storybook for component isolation
npm run storybook

# Run accessibility audit
npm run test:a11y

# Run visual regression tests
npm run test:visual
```

## Support Resources

### Internal Resources
- **Design System Team**: Slack channel #design-system
- **Component Documentation**: [design-system.company.com](https://design-system.company.com)
- **Figma Libraries**: Company Design System workspace

### External Resources
- MDN Web Docs for CSS and accessibility
- WAI-ARIA Authoring Practices
- CSS-Tricks for advanced CSS techniques

## Reporting Issues

### When to Report
Report issues when:
- You've confirmed it's a design system bug (not implementation error)
- Issue affects multiple projects or users
- No workaround exists

### How to Report
Create an issue in the design system repository with:

1. **Clear Description**: What's happening vs. what should happen
2. **Reproduction Steps**: Minimal steps to reproduce
3. **Environment Info**: Browser, OS, design system version
4. **Screenshots**: Visual evidence when appropriate
5. **Code Example**: Minimal reproduction case

Template:
```markdown
## Bug Report

**Description**
Buttons have incorrect focus styling in Firefox.

**Steps to Reproduce**
1. Open Firefox
2. Navigate to any page with buttons
3. Tab to button element
4. Observe outline style

**Expected Behavior**
Focus ring should match design specification.

**Actual Behavior**
Focus ring is clipped on left and right edges.

**Environment**
- Firefox 95.0.1
- macOS 12.1
- Design System v2.3.1

**Additional Context**
Issue does not occur in Chrome or Safari.
```

## Emergency Procedures

### Critical Bug Response
For critical issues affecting production:

1. **Immediate Triage**
   - Assess impact scope
   - Determine workaround availability
   - Decide on patch release necessity

2. **Hotfix Process**
   - Create hotfix branch from latest release tag
   - Implement minimal fix
   - Expedite review process
   - Deploy to production

3. **Communication Plan**
   - Alert stakeholders immediately
   - Provide regular status updates
   - Share workaround instructions

### Rollback Procedures
If a release causes widespread issues:

1. Identify problematic release version
2. Revert to previous stable version
3. Communicate rollback to all teams
4. Investigate root cause before re-release