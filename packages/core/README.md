# @codeblame/core

The core logic engine for Codeblame. This package handles Git hook management and the generation of AI agent "skills" (instruction files like `.cursorrules`).

## Installation

```bash
npm install @codeblame/core
```

## Features

- **Git Hook Management**: Programmatically install and manage Git hooks that trigger on commit.
- **Agent Skill Generation**: Automatically generate instructions for AI agents (Cursor, Copilot, etc.) to ensure they log their reasoning correctly.
- **Post-Commit Processing**: Logic to parse staging files and link AI context to the resulting Git commit.

## Usage

```typescript
import { installGitHook, generateAgentSkills } from '@codeblame/core';

// Initialize a repository
const repoPath = process.cwd();
installGitHook(repoPath);
generateAgentSkills(repoPath);
```
