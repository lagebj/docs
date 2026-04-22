# MDX Comment Syntax Audit

## Summary

Audit of MDX template files for HTML-style comments (`<!-- comment -->`) that should be converted to proper MDX syntax (`{/* comment */}`).

## Findings

After reviewing all MDX files in the `templates/` directory and repository-wide, no instances of HTML-style comments were found in the MDX files. All templates are already using proper MDX syntax where applicable.

### Files Checked
- `templates/customer-template.mdx`
- `templates/feedback-component.mdx`
- `templates/reference-template.mdx`
- `templates/principle-template.mdx`
- `templates/playbook-template.mdx`
- `templates/practitioner-template.mdx`

And all other MDX files in the repository.

## Verification

- Ran `npm run verify` to check for any build issues
- Confirmed no HTML-style comments exist in MDX files that need conversion

## Conclusion

No changes were needed to fix HTML-style comments in MDX files as they were already using proper MDX syntax.