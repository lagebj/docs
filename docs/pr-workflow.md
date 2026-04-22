# Local Agent PR Workflow for Trunk-Based Development

This document describes the complete workflow for local agents to create and manage pull requests in a trunk-based development environment.

## Prerequisites

- Git installed and configured
- Repository cloned locally
- Appropriate permissions to create branches and pull requests

## Workflow Steps

### 1. Create a Feature Branch

Always create a new branch from the latest `main` branch:

```bash
git checkout main
git pull origin main
git checkout -b feature/short-descriptive-name
```

Branch naming convention: `feature/description`, `bugfix/description`, or `hotfix/description`

### 2. Make Changes

Make your code changes in the feature branch:

```bash
# Edit files as needed
git add .
git commit -m "type(scope): Brief descriptive commit message"
```

Commit message guidelines follow Conventional Commits specification:
- Use present tense ("Add feature" not "Added feature")
- Start with a lowercase letter
- Be concise but descriptive
- Format: `type(scope): description`
- Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `build`, `ci`

Examples:
- `feat(auth): add user authentication`
- `fix(api): resolve timeout issues`
- `docs(readme): update contribution guidelines`
- `refactor(utils): optimize sorting algorithm`

### 3. Run Local Validation

Before pushing, validate your changes locally:

```bash
npm test      # Run tests
npm run lint  # Check code style
npm run build # Build the project
```

### 4. Push Branch and Create Pull Request

Push your branch to remote:

```bash
git push origin feature/short-descriptive-name
```

Then create a pull request on GitHub:
1. Navigate to the repository on GitHub
2. Click "Compare & pull request" button
3. Ensure base branch is `main` and compare branch is your feature branch
4. Add a descriptive title and detailed description
5. Request reviewers from your team
6. Add labels as appropriate

PR title should follow Conventional Commits:
- Format: `type(scope): brief description`
- Example: `feat(docs): implement local agent PR workflow`

### 5. Address Feedback

During the review process:
- Make requested changes in new commits on the same branch
- Push additional commits to the same branch
- Respond to comments to discuss suggestions
- Request re-review if needed after making changes

### 6. Merge Approved PR

Once approved and all checks pass:
1. Use "Squash and merge" to maintain linear history
2. Clean up feature branches after merging
3. Update local main branch:

```bash
git checkout main
git pull origin main
```

## Best Practices

1. Keep PRs small and focused on a single change
2. Write clear, descriptive commit messages following Conventional Commits
3. Include tests for new functionality
4. Update documentation when changing features
5. Follow established code style and conventions
6. Request reviews from appropriate team members
7. Be responsive to feedback during review process

## Example Workflow

Here's a complete example of implementing a small feature:

```bash
# Start from main and create new branch
git checkout main
git pull origin main
git checkout -b feature/add-user-validation

# Make changes
# ... edit files ...

# Commit changes following Conventional Commits
git add .
git commit -m "feat(validation): add user input validation"

# Run validation
npm test
npm run lint

# Push and create PR
git push origin feature/add-user-validation

# Go to GitHub to create PR with title "feat(validation): add user input validation"
# After approval, merge via GitHub UI

# Clean up locally
git checkout main
git pull origin main
git branch -d feature/add-user-validation  # delete local branch
```

This workflow ensures consistent, high-quality contributions while maintaining a stable main branch and following the Conventional Commits specification.