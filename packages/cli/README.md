# codeblame

The official CLI for Codeblame. A beautiful, modern TUI for tracking AI reasoning traces alongside your Git commits.

## Installation

```bash
npm install -g codeblame
```

## Quick Start

```bash
# Initialize codeblame in your repo
codeblame init

# View the AI reasoning history
codeblame log
```

## How it works

1. `codeblame init` sets up a `post-commit` hook and creates `.cursorrules`.
2. When your AI writes code, it also writes its reasoning to a staging file.
3. On commit, the hook moves that reasoning into a local SQLite database.
4. `codeblame log` lets you browse that history in a beautiful terminal interface.
