# Repository Separation Plan

Based on the CTO recommendations in AUDIT_RECONCILIATION_REPORT_GROA-68.md, this document outlines what stays, what moves, and what gets deleted in the repository separation process.

## Current Repository Analysis

The current repository (https://github.com/lagebj/docs) contains:

### What Stays (Documentation Platform Components)
1. **Core Documentation Content**
   - `customers/` - Customer-facing marketing content
   - `practitioners/` - Internal operational guidance
   - `principles/` - Core philosophy and non-negotiables
   - `playbook/` - Field-level processes and checklists
   - `cases/` - Real-world examples
   - `reference/` - Glossary, FAQ, contribution guide

2. **Technical Components**
   - `templates/` - MDX content templates
   - `components/` - Frontend components
   - `scripts/` - Search and analytics scripts
   - Core configuration files (package.json, tailwind.config.js, etc.)

### Issues Identified That Need Addressing
1. **Template Syntax Issue** - HTML comments in MDX files need to be converted to proper MDX syntax
2. **Missing Automated Testing** - Need to implement unit tests for critical JavaScript components
3. **Performance Monitoring** - Need to add performance monitoring tools

### What Moves (Potential Separate Repositories)
Based on the repository analysis, we should consider separating:

1. **Frontend Component Library** - The `components/` directory could be moved to a separate repository for reuse across projects
2. **Documentation Templates** - The `templates/` directory could be moved to a shared template repository
3. **Scripts Library** - Common scripts in `scripts/` could be moved to a utility repository

### What Gets Deleted/Fixed
1. **Fix MDX Template Syntax** - Replace HTML-style comments with proper MDX syntax in template files
2. **Remove Unused Assets** - Clean up any deprecated or unused assets

## Implementation Plan

### Phase 1: Immediate Fixes
1. Correct MDX template syntax issues
2. Run verification to ensure builds still work

### Phase 2: Repository Restructuring
1. Create new repositories for separated components (if warranted by CTO)
2. Move appropriate content to new repositories
3. Update references and dependencies

### Phase 3: Enhancement
1. Add automated testing for JavaScript components
2. Implement performance monitoring
3. Set up proper dependency management across repositories

## Timeline
- Phase 1: 1-2 days
- Phase 2: 3-5 days (pending CTO approval for new repositories)
- Phase 3: 2-3 days