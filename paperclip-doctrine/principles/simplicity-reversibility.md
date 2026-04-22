# Simplicity and Reversibility First

We prefer moves that reduce complexity, lower the cost of being wrong, and are easier to own under operational pressure. Solutions should be explainable in plain language and reversible without major damage.

## Key Implications

### Complexity Management
Every addition to a system should pay for its complexity through proportional benefits. Unnecessary sophistication is a liability.

### Risk Mitigation
Changes should be designed such that mistakes are recoverable without catastrophic consequences.

### Maintainability
Systems should remain operable by ordinary team members under stress conditions.

## Practical Applications

1. **Design Reviews**: Evaluate every proposed solution for its simplicity and reversibility impact
2. **Change Control**: Implement changes incrementally to enable easy rollback
3. **Documentation**: Ensure every system component can be explained in plain language
4. **Tool Selection**: Prefer tools with clear rollback paths and minimal ecosystem dependencies
5. **Failure Planning**: Design systems to degrade gracefully and recover predictably

## Decision Framework

When evaluating potential approaches:

1. How much complexity does this add?
2. How easy is it to undo if wrong?
3. Can an ordinary team member fix it at 2 AM?
4. Could I explain this to a non-technical stakeholder?
5. What happens when this component fails?

## Anti-Patterns to Avoid

- Over-engineering solutions beyond their problem scope
- Creating "clever" implementations that are difficult to debug
- Assuming that more sophisticated is necessarily better
- Designing irreversible changes without clear rollback plans
- Building systems that require specialists for routine maintenance
