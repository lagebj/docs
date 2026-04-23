# Code Review Checklist

This checklist ensures consistent, thorough code reviews that maintain quality and alignment with our design system principles.

## Pre-Review Preparation

Before beginning the review, verify:

- [ ] Pull request includes a clear description of changes
- [ ] Related issue(s) are linked
- [ ] Changes have appropriate test coverage
- [ ] Documentation has been updated
- [ ] All CI checks are passing

## Functional Review

### Core Functionality
- [ ] Component behaves as described in requirements
- [ ] Edge cases are handled appropriately
- [ ] Error states are managed gracefully
- [ ] Component is usable without JavaScript (when applicable)
- [ ] No console errors or warnings introduced

### API Design
- [ ] Component API is intuitive and consistent
- [ ] Props are well-named and documented
- [ ] Default props are reasonable
- [ ] Event handling follows standard patterns
- [ ] Component is controlled/uncontrolled as appropriate

## Accessibility Review

### Semantic Markup
- [ ] Appropriate HTML elements are used
- [ ] Landmark roles are correctly applied
- [ ] ARIA attributes are used correctly
- [ ] Labels are associated with form controls
- [ ] Headings follow proper hierarchical structure

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Focus management is implemented correctly
- [ ] Visible focus indicators meet contrast requirements
- [ ] Skip links are appropriately placed
- [ ] Keyboard traps are avoided

### Screen Reader Experience
- [ ] Changes are announced appropriately
- [ ] Element roles are correctly conveyed
- [ ] Alt text is descriptive and meaningful
- [ ] Labels provide sufficient context
- [ ] Dynamic content updates are communicated

### Color and Contrast
- [ ] Text meets minimum contrast ratios (4.5:1)
- [ ] Interactive elements meet contrast requirements
- [ ] Color is not the sole means of conveying information
- [ ] Focus indicators meet visibility standards
- [ ] Meaningful color combinations are tested

## Performance Review

### Bundle Impact
- [ ] Component bundle size is reasonable
- [ ] Dependencies are necessary and justified
- [ ] Tree-shaking is possible for exported modules
- [ ] Code splitting is used appropriately
- [ ] Assets are optimized and compressed

### Runtime Performance
- [ ] Rendering performance is acceptable
- [ ] Memory leaks are avoided
- [ ] Expensive operations are optimized
- [ ] Debouncing/throttling is used when appropriate
- [ ] Component re-renders are minimized

### Loading and Rendering
- [ ] Critical path rendering is optimized
- [ ] Loading states provide user feedback
- [ ] Skeleton screens or placeholders are used appropriately
- [ ] Progressive enhancement is implemented
- [ ] Assets are loaded efficiently

## Code Quality Review

### Style and Consistency
- [ ] Code follows established style guides
- [ ] Naming conventions are consistent
- [ ] Component structure follows patterns
- [ ] Comments explain "why" not just "what"
- [ ] Configuration is centralized appropriately

### Maintainability
- [ ] Code is readable and well-organized
- [ ] Duplicated logic is abstracted
- [ ] Complexity is appropriate for functionality
- [ ] Dependencies are loosely coupled
- [ ] Future extensibility is considered

### Security
- [ ] User input is sanitized
- [ ] XSS vulnerabilities are prevented
- [ ] Authentication/authorization is handled correctly
- [ ] Secrets are not hardcoded
- [ ] Security best practices are followed

## Testing Review

### Test Coverage
- [ ] Unit tests cover core functionality
- [ ] Edge cases are tested
- [ ] Error conditions are verified
- [ ] Async operations are tested
- [ ] Accessibility behaviors are validated

### Test Quality
- [ ] Tests are clear and descriptive
- [ ] Test names follow consistent patterns
- [ ] Mocks are used appropriately
- [ ] Tests are deterministic
- [ ] Setup/teardown is efficient

### Integration and E2E
- [ ] Component integrations are validated
- [ ] Browser compatibility is verified
- [ ] Responsive behavior is tested
- [ ] Cross-component interactions work
- [ ] Real-world usage scenarios are covered

## Documentation Review

### Component Documentation
- [ ] Component props are fully documented
- [ ] Usage examples are clear and complete
- [ ] Edge cases are explained
- [ ] Related components are referenced
- [ ] Accessibility considerations are noted

### Developer Experience
- [ ] Getting started guide is accurate
- [ ] Installation instructions are clear
- [ ] Configuration options are documented
- [ ] Troubleshooting guidance is provided
- [ ] Migration paths are documented for breaking changes

## Design System Alignment

### Consistency
- [ ] Component follows established design patterns
- [ ] Visual styling aligns with design system
- [ ] Spacing and typography adhere to scales
- [ ] Color usage matches design tokens
- [ ] Interactive states are consistent

### Extensibility
- [ ] Component can be customized appropriately
- [ ] Theming capabilities are supported
- [ ] Composition with other components is possible
- [ ] Override mechanisms are provided
- [ ] Forward compatibility is maintained

## Communication and Collaboration

### Feedback Approach
When providing feedback:

1. **Be Specific**: Reference exact lines and files
2. **Be Constructive**: Offer solutions, not just problems
3. **Be Respectful**: Remember there's a person behind the code
4. **Be Timely**: Provide feedback within agreed timeframes
5. **Be Thorough**: Balance efficiency with completeness

### Approval Criteria
Approve when:

- [ ] All critical and high severity issues are resolved
- [ ] Code meets quality standards
- [ ] Tests are sufficient and passing
- [ ] Documentation is adequate
- [ ] Changes align with project goals

### Follow-up Process
After approval:

1. Author addresses all feedback
2. Reviewer verifies changes resolve concerns
3. PR can be merged once all requirements met
4. Celebrate the successful collaboration!

---

## Severity Guidelines

### Critical
Must be fixed before merging:
- Security vulnerabilities
- Breaking existing functionality
- Major accessibility violations
- Performance regressions

### High
Should be addressed before merging:
- Incorrect behavior
- Poor API design
- Missing tests for core functionality
- Significant maintainability issues

### Medium
Recommended to address:
- Inconsistencies with patterns
- Minor accessibility issues
- Code organization improvements
- Documentation gaps

### Low
Nice to have:
- Non-critical style preferences
- Minor optimizations
- Additional comments or explanations
- Opportunistic refactoring

## Reviewer Responsibilities

### Primary Reviewer
- Complete full review checklist
- Ensure all feedback is addressed
- Approve or request changes
- Merge after final validation

### Secondary Reviewers
- Focus on areas of expertise
- Provide specialized perspective
- Validate critical functionality
- Support primary reviewer decision

### Author Responsibilities
- Address all feedback thoroughly
- Ask questions when clarification needed
- Explain reasoning for design decisions
- Ensure clean, well-documented changes

Remember: The goal of code review is to improve code quality, share knowledge, and maintain consistency—not to criticize. Approach feedback with a growth mindset and collaborate constructively.