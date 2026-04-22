# Repository Governance Technical Design

## Problem Statement
Internal documentation and configuration files are currently stored in a public repository, creating potential security and intellectual property risks.

## Issues Identified
1. Agent configuration files in `agents/config/` contain sensitive configuration details
2. Scripts reference internal materials patterns that shouldn't be public
3. Documentation files reference internal task IDs (GROA-68, GROA-70) and processes
4. Internal document patterns are present in the repository

## Technical Design

### Repository Separation Strategy
1. **Public Repository** (docs):
   - Customer-facing documentation (`customers/`)
   - Practitioner-facing documentation (`practitioners/`)
   - Core principles (`principles/`)
   - Public playbook entries (`playbook/`)
   - Case studies (`cases/`)
   - Reference materials (`reference/`)

2. **Private Repository** (docs-internal):
   - Agent configuration files (`agents/config/`)
   - Internal scripts (`scripts/check-internal-materials.sh`)
   - Internal documentation files:
     - AUDIT_RECONCILIATION_REPORT_GROA-68.md
     - WEBSITE_REFACTOR_ROADMAP_GROA-70.md
     - FRONTEND_COMPONENT_HARDENING_TECHNICAL_DESIGN.md
     - TAILWIND_CSS_SYSTEMATIZATION_PLAN.md
     - REPOSITORY_SEPARATION_PLAN.md
   - Configuration files with sensitive information

### Implementation Plan

#### Phase 1: Create Private Repository
1. Create new private repository `docs-internal`
2. Migrate internal files to private repository:
   - `agents/config/cmo-agent-adapter.config.json`
   - `agents/config/cmo-agent-adapter.config.json.bak`
   - `scripts/check-internal-materials.sh`
   - `AUDIT_RECONCILIATION_REPORT_GROA-68.md`
   - `WEBSITE_REFACTOR_ROADMAP_GROA-70.md`
   - `FRONTEND_COMPONENT_HARDENING_TECHNICAL_DESIGN.md`
   - `TAILWIND_CSS_SYSTEMATIZATION_PLAN.md`
   - `REPOSITORY_SEPARATION_PLAN.md`

#### Phase 2: Update Public Repository
1. Remove internal files from public repository
2. Update references to internal materials
3. Implement pre-commit hooks to prevent accidental internal material commits
4. Update documentation to reflect new repository structure

#### Phase 3: Establish Governance Process
1. Document clear guidelines on what belongs in each repository
2. Implement automated checks for internal material patterns
3. Establish review process for commits to both repositories
4. Update contribution guidelines

## Risk Mitigation

1. **Data Loss Prevention**:
   - Ensure all files are properly migrated before deletion
   - Create backup of current repository state

2. **Broken References**:
   - Identify and update all internal references between repositories
   - Test build process after migration

3. **Access Control**:
   - Ensure appropriate permissions on private repository
   - Document access rights and procedures

## Success Criteria

1. Internal configuration files are removed from public repository
2. No internal task references remain in public documentation
3. Build processes continue to work correctly
4. Pre-commit hooks prevent future leakage of internal materials
5. Clear documentation exists for repository governance