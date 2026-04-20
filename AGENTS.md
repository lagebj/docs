# AI workflow rules for Grounded Systems docs

## Repository purpose

This repository is a Mintlify documentation site for Grounded Systems.
It serves both:

1. a public entrypoint for potential customers and future employees
2. a knowledge base for the team itself

## Content structure

- customers/: public customer-facing entry pages
- practitioners/: public practitioner-facing entry pages
- principles/: core stance and non-negotiables
- playbook/: actionable field guidance
- cases/: examples and scenarios
- reference/: glossary, FAQ, and contribution guidance

## Non-negotiable workflow

1. No content edits before docs/ai/plan.md exists.
2. No content edits before human approval of docs/ai/plan.md.
3. One bounded content slice at a time.
4. Do not rewrite multiple top-level sections in one slice.
5. Reviewer must be a separate tool/session from the editor.
6. Verifier trusts only executed command output.
7. Changes must preserve existing navigation coherence unless the plan explicitly includes navigation edits.
8. Writing must follow CONTRIBUTING.md guidance:
   - active voice
   - direct address
   - concise sentences
   - goal-first instruction order
   - consistent terminology
   - examples where useful

## Required artifacts

- docs/ai/request.md
- docs/ai/context.md
- docs/ai/structure.md
- docs/ai/plan.md
- docs/ai/review.md
- docs/ai/verification.md
- docs/ai/pr.md

## Required verification

- npm run links
- npm run lint:md
- npm run format:check
