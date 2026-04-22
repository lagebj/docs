# Architecture Decision Framework

Framework for making consistent, principled architecture decisions.

## Decision Process

### Step 1: Read The Real System First


Before proposing solutions, understand:
- Current system constraints and capabilities
- Existing ownership boundaries and relationships
- Technical debt locations and accumulation patterns
- Performance and reliability requirements in practice
- Team skills and preferences

### Step 2: Identify The Actual Problem


Distinguish between:
- Surface symptoms (slow performance, error rates)
- Root causes (architectural bottlenecks, ownership gaps)
- Organizational friction (communication, prioritization issues)

### Step 3: Evaluate Options Against Principles


Assess each option against our core principles:

1. **Customer Ownership**: Does this increase or decrease customer control?
2. **Capability Building**: Does this teach or depend on outside expertise?
3. **Modernize In Place**: Does this work with or against existing systems?
4. **Simplicity**: Is this simpler than the obvious heavy solution?
5. **Reversibility**: What's the cost of being wrong?
6. **Context Fit**: Does this align with actual operational context?

### Step 4: Document Trade-offs


Record clearly:
- What problem is actually being addressed
- Why the chosen approach fits the context
- What trade-offs are being made
- Why the recommendation lowers friction or dependency

## Evaluation Criteria

### Primary Factors


1. **Ownership Clarity**: Who owns what parts of this solution?
2. **Operational Simplicity**: How easy is this to operate daily?
3. **Failure Impact**: What happens when components fail?
4. **Learning Requirements**: What new skills are needed?

### Secondary Factors


1. **Cost**: Implementation, operation, and maintenance costs
2. **Timeline**: How quickly can this be implemented safely?
3. **Tool Alignment**: Does this leverage existing investments?
4. **Team Fit**: Does this match team capabilities and preferences?

## When To Document Decisions

Document decisions when:
- Introducing new technologies or tools
- Changing architectural patterns significantly
- Making trade-offs that aren't obvious
- Creating dependencies between teams or systems
- Addressing recurring problems with standard approaches
