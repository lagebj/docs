---
name: repo-governance
description: >
  Manages repository governance by classifying content as public, internal, or confidential
  and routing it to appropriate destinations. Prevents internal documentation and
  configuration files from being stored in public repositories.
---

# Repository Governance Skill

This skill manages repository governance by classifying content and routing it to appropriate destinations based on classification.

## Features

- Content classification (Public, Internal, Confidential)
- Automatic routing to appropriate repositories
- Integration with Paperclip doctrine content
- Access control enforcement
- Pre-commit validation

## Usage

This skill is automatically invoked when generating documentation or configuration files to ensure proper classification and routing.

## Classification Rules

- Agent configuration files → Internal
- Internal scripts → Internal
- Paperclip doctrine content → Internal
- Customer documentation → Public
- Internal task references → Internal
- All other content → Public by default

## Repository Routing

- Public content → Public repository
- Internal content → Private/internal repository
- Confidential content → Secure storage with access controls

## Access Control

Only authorized users can access internal and confidential content.