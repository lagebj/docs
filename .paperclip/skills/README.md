# Agent Skills Integration

This directory contains the imported agent skills from the [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) repository.

## Integrated Skills

The following skills have been integrated for use with OpenCode:

1. **spec-driven-development** - For defining requirements and acceptance criteria before implementation
2. **planning-and-task-breakdown** - For decomposing features into small, verifiable tasks
3. **incremental-implementation** - For building features in thin vertical slices
4. **documentation-and-adrs** - For documenting decisions and creating technical documentation
5. **code-review-and-quality** - For reviewing code quality and catching issues

## Usage

These skills are automatically used by OpenCode when the task context matches the skill's purpose. The agent will invoke the appropriate skill using the `skill` tool following the OpenCode skill-driven execution model.

## Skill Descriptions

Each skill directory contains a `SKILL.md` file that describes:
- When to use the skill
- The step-by-step workflow
- Any scripts or automation associated with the skill
- Verification criteria
- Troubleshooting tips

## References

- Original repository: https://github.com/addyosmani/agent-skills
- OpenCode integration guide: See `AGENTS.md` in the agent-skills repository