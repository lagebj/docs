# File Classification Rules: GitHub vs Paperclip

This document establishes clear criteria for determining which files should be managed in GitHub versus Paperclip, ensuring appropriate separation of concerns and proper governance.

## GitHub Repository (Public Documentation Site)

Files in this category are public-facing and contribute to the main documentation site. They follow standard open-source practices and community contribution models.

### What belongs in GitHub:

1. **Public Content Pages**
   - Principles and stances (`principles/`)
   - Playbook guidance (`playbook/`)
   - Case studies and examples (`cases/`)
   - Public entrypoints (`customers/`, `practitioners/`)

2. **Documentation Infrastructure**
   - Site configuration and navigation (`config/`, `navigation.json`)
   - Template files for content types
   - Markdown/MDX content files
   - Design system documentation
   - Glossaries and FAQs

3. **Community Contribution Support**
   - `CONTRIBUTING.md` and related guidelines
   - `README.md` files
   - Issue templates
   - Pull request templates
   - Code of conduct

4. **Build and Deployment Configuration**
   - Package management (`package.json`, `package-lock.json`)
   - Build scripts and configurations
   - CI/CD workflows (`.github/workflows/`)
   - Static analysis configurations

### Characteristics of GitHub Files:
- Publicly accessible
- Community-contributed content welcome
- Follows conventional documentation structures
- Versioned with semantic versioning
- Reviewed through pull requests
- Licensed as open source

## Paperclip (Internal Knowledge Management)

Files in this category contain internal processes, team-specific information, and sensitive operational details.

### What belongs in Paperclip:

1. **Internal Team Processes**
   - Team onboarding guides
   - Internal workflows and procedures
   - Meeting notes and decision records
   - Project planning documents
   - Performance reports and analytics

2. **Sensitive Information**
   - Internal security policies
   - Access credentials or keys
   - Customer-specific information
   - Financial or strategic plans
   - Personnel-related documentation

3. **Experimental Content**
   - Draft content not ready for public consumption
   - Brainstorming documents
   - Research notes and explorations
   - Work-in-progress designs

4. **Internal Reference Materials**
   - Internal style guides
   - Team member directories
   - Internal tool documentation
   - Company-specific processes

### Characteristics of Paperclip Files:
- Internal access only
- Contains proprietary information
- Team-driven editing without public input
- May contain confidential or sensitive data
- Follows internal governance rather than open-source practices

## Decision Framework

When deciding where to place a file, ask:

1. **Is this content suitable for public consumption?**
   - Yes → GitHub
   - No → Paperclip

2. **Should this receive community contributions?**
   - Yes → GitHub
   - No → Paperclip

3. **Does this contain sensitive or proprietary information?**
   - Yes → Paperclip
   - No → GitHub

4. **Would publishing this content benefit external practitioners?**
   - Yes → GitHub
   - No → Paperclip

## Migration Guidelines

### Moving from Paperclip to GitHub:
1. Review for sensitive information
2. Ensure alignment with contribution model
3. Apply appropriate open-source license
4. Add contribution guidelines
5. Configure proper CI/CD workflows

### Moving from GitHub to Paperclip:
1. Remove from public repository
2. Update any references or links
3. Ensure continued internal accessibility
4. Apply appropriate internal access controls

## Exceptions and Special Cases

1. **Hybrid Content**: Content that has both public and internal aspects should be split appropriately, with public portions in GitHub and internal details in Paperclip.

2. **Work in Progress**: New content that is not yet ready for public consumption should start in Paperclip and migrate to GitHub when ready.

3. **Reference Implementations**: Code examples that illustrate principles should be in GitHub, while internal implementation details should remain in Paperclip.