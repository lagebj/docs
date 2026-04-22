#!/bin/bash

# Script to check for internal materials that should not be committed

# Patterns that indicate internal materials
INTERNAL_PATTERNS=(
    "COMPLETED_TASK_"
    "FINAL_SUMMARY_"
    "ENGINEERING_REVIEW_"
    "TASK_COMPLETED_"
    "LEAD_ENGINEERING_"
    "UX_STRATEGY_"
    "AGENTS.md"
    "private"
    "confidential"
    "secret"
)

# Check if any staged files contain internal patterns
STAGED_FILES=$(git diff --cached --name-only)

for file in $STAGED_FILES; do
    # Skip if file doesn't exist (deleted files)
    [ ! -f "$file" ] && continue
    
    # Check each internal pattern
    for pattern in "${INTERNAL_PATTERNS[@]}"; do
        if grep -q "$pattern" "$file" 2>/dev/null; then
            echo "ERROR: File '$file' contains internal material pattern '$pattern'"
            echo "Please remove internal materials before committing."
            exit 1
        fi
    done
done

echo "No internal materials detected in staged files."
exit 0