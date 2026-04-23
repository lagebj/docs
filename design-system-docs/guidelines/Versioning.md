# Versioning and Deprecation Policies

This document outlines our policies for versioning the design system and handling deprecated components.

## Versioning Scheme

We follow Semantic Versioning 2.0.0 (semver) for all design system releases:

### Version Format
`MAJOR.MINOR.PATCH` (e.g., 2.5.1)

### Increment Rules

#### MAJOR Version
Increment for incompatible API changes:
- Removing or renaming CSS classes
- Changing component APIs in backward-incompatible ways
- Removing design tokens
- Significant design changes that break existing implementations

#### MINOR Version
Increment for backward-compatible additions:
- New components
- New design tokens
- New CSS classes or variants
- Non-breaking enhancements to existing components

#### PATCH Version
Increment for backward-compatible bug fixes:
- Visual bugs
- Accessibility issues
- Performance improvements
- Documentation updates

## Release Process

### Planning
1. Gather feature requests and bug reports
2. Prioritize items for upcoming release
3. Create release milestone in project management tool
4. Schedule release date (every 2 weeks for minor releases)

### Development
1. Create feature branch for each item
2. Implement changes following contribution guidelines
3. Write/update documentation
4. Add tests for new functionality

### Review
1. Code review by at least one other team member
2. Design review for visual changes
3. Accessibility review for UI components
4. Performance impact assessment

### Publishing
1. Merge changes to main branch
2. Create Git tag with version number
3. Publish to NPM/package registry
4. Update documentation site
5. Announce release to team

## Deprecation Policy

### Deprecation Process

1. **Announcement** - Mark component as deprecated in documentation
2. **Warning Period** - Provide 6 months of overlap period
3. **Migration Assistance** - Provide clear migration path
4. **Removal** - Remove deprecated component in next MAJOR version

### Deprecation Indicators

In code:
```css
/* Deprecated: Use .btn--primary instead */
.btn-primary {
  /* styles */
}
```

In documentation:
```markdown
::: warning Deprecated
This component is deprecated and will be removed in v3.0.0.
Use [NewComponent] instead. See [migration guide](./migration.md) for details.
:::
```

### Documentation Updates

All deprecated components must have:
1. Clear deprecation notice at top of documentation
2. Reason for deprecation
3. Migration path with example code
4. Removal timeline and version

## Long-term Support (LTS)

### LTS Versions
We maintain LTS for critical components:
- Major versions receive 12 months of security updates
- Extended support available for enterprise customers

### LTS Process
1. Designate version as LTS at release
2. Track LTS versions separately
3. Apply critical security patches to LTS
4. Communicate LTS end-of-life dates

## Change Communication

### Release Notes
Every release includes detailed release notes:
```markdown
# Release v2.5.0

## New Features
- Added Avatar component
- Added dark mode support to Modal component

## Bug Fixes
- Fixed focus trap in Dialog component
- Resolved z-index issues in Toast component

## Deprecations
- Deprecated Card variant "elevated" (replaced with "raised")
```

### Breaking Changes
All breaking changes must include:
1. Clear description of the change
2. Reason for the breaking change
3. Migration guide with example code
4. Version when change will take effect

## Feature Flags

For experimental features:
1. Hide behind feature flags
2. Document as "experimental" in documentation
3. Gather feedback during experimental period
4. Promote to stable or remove based on feedback

Example feature flag usage:
```javascript
if (featureFlags.experimentalGrid) {
  return <NewGridComponent />;
} else {
  return <LegacyGridComponent />;
}
```

## Backward Compatibility

### CSS/SCSS Compatibility
- Maintain CSS class name stability
- Provide migration scripts for breaking changes
- Alias deprecated classes when possible

### JavaScript API Compatibility
- Maintain function signatures when possible
- Provide wrapper functions for deprecated APIs
- Document all API changes in changelog

### Token Compatibility
- Never remove design tokens without deprecation cycle
- Rename tokens instead of changing values unexpectedly
- Provide mapping between old and new tokens