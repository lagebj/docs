# Component Migration Guide

This guide provides step-by-step instructions for migrating from legacy components to the new design system components.

## Migration Process Overview

1. Audit existing components
2. Prioritize migration order
3. Create migration plan
4. Execute migrations in phases
5. Test and validate
6. Remove legacy code

## Audit Existing Components

### Identify Legacy Components
Run the audit script to identify components that need migration:

```bash
npm run audit:components
```

This will generate a report at `reports/component-audit.md` listing all legacy components.

### Assessment Criteria
When auditing components, assess:

- **Usage Frequency**: How often is the component used?
- **Complexity**: How complex is the component?
- **Dependencies**: Does the component have many dependencies?
- **Business Criticality**: How critical is the component to business operations?

## Prioritization Framework

| Priority | Criteria | Timeline |
|----------|----------|----------|
| High | Business critical, frequently used | Week 1-2 |
| Medium | Moderately used, moderate complexity | Week 3-4 |
| Low | Rarely used, simple components | Week 5+ |

## Migration Strategies

### 1. Direct Replacement
For components with exact functional equivalents:

```html
<!-- Before -->
<div class="old-button primary">Click Me</div>

<!-- After -->
<button class="btn btn--primary">Click Me</button>
```

### 2. Wrapper Approach
For components that need adaptation:

```html
<!-- Wrapper component that adapts old API to new component -->
<legacy-button-adapter type="primary">Click Me</legacy-button-adapter>
```

### 3. Gradual Migration
For complex components, migrate in phases:

1. Create new component alongside old one
2. Redirect new usage to new component
3. Gradually migrate existing usage
4. Remove old component when unused

## Common Migration Patterns

### Button Migration
```scss
// Old SCSS
.old-button {
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  // ...more styles
}

// New CSS
.btn {
  background-color: var(--color-primary);
  border: var(--border-width-sm) solid var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  // ...design system styles
}
```

### Typography Migration
```html
<!-- Before -->
<div class="heading-large">Page Title</div>
<p class="body-text">Content here...</p>

<!-- After -->
<h1 class="text-h1">Page Title</h1>
<p class="text-body">Content here...</p>
```

## Testing During Migration

### Automated Testing
- Run existing unit tests against migrated components
- Add visual regression tests for critical components
- Validate accessibility compliance

### Manual Testing Checklist
- [ ] Visual appearance matches design specifications
- [ ] Component behavior is consistent with design system principles
- [ ] All interactive states work correctly
- [ ] Component is responsive across all breakpoints
- [ ] Accessibility requirements are met
- [ ] Performance is acceptable

## Handling Breaking Changes

When migrations introduce breaking changes:

1. Document the breaking change in the CHANGELOG.md
2. Provide a codemod script when possible
3. Update migration guides with specific instructions
4. Communicate changes to all stakeholders

### Example Breaking Change Notice
```markdown
## Breaking Change: Button Component API Update

**Changed in v2.0.0**

The button component API has changed to align with our design system:

### Before
```html
<button class="btn primary large">Click Me</button>
```

### After
```html
<button class="btn btn--primary btn--large">Click Me</button>
```

### Migration Script
Run the automatic migration script:
```bash
npx migrate-buttons-v2
```
```

## Rollback Procedures

If issues arise during migration:

1. Revert the specific component changes
2. Document the issue
3. Create a fix plan
4. Repackage the migration with fixes

Use feature flags to enable safe rollbacks:

```javascript
if (featureFlags.newDesignSystem) {
  return <NewButton {...props} />;
} else {
  return <LegacyButton {...props} />;
}
```

## Post-Migration Cleanup

After successful migration:

1. Remove legacy component files
2. Update documentation
3. Archive old designs
4. Communicate completion to team
5. Update component inventory