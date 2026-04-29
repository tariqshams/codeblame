# Codeblame

**Codeblame** is an AI-Aware Git Context Tracker. It's a modern, beautiful terminal application (TUI) that bridges the gap between your Git workflow and the AI coding agents writing your code.

Instead of paying for hosted context trackers or searching through chat logs to understand *why* an AI wrote a certain block of code, Codeblame automatically captures AI reasoning on every commit and saves it to a local, zero-config Turso SQLite database right in your repository.

## Features
- 🚀 **Zero Config & Free**: Stores everything in a local `.codeblame/db.sqlite` file that you can commit and share with your team.
- 🎨 **Beautiful TUI**: A gorgeous interactive terminal interface built with Ink (matching the GitHub Copilot CLI style).
- 🤖 **Agent Compatibility**: Automatically creates instruction files (like `.cursorrules`) that teach Cursor, Copilot, and other agents to log their reasoning.
- 🔗 **Git Hook Integration**: Works entirely via standard `post-commit` Git hooks.

## Installation & Setup

1. Install `codeblame` globally or run it via `npx`:
   ```bash
   npm install -g codeblame
   ```

2. Inside your Git repository, initialize Codeblame:
   ```bash
   codeblame init
   ```
   This will install the necessary Git hooks and generate agent instructions (e.g., `.cursorrules`).

3. Start coding with your AI agent! Make sure your agent follows the generated instructions.

4. Once you commit your code, the AI context will be saved.

5. Run the interactive log viewer to explore AI reasoning alongside your commit history:
   ```bash
   codeblame log
   ```

## Development

Codeblame is a Turborepo monorepo consisting of:
- `codeblame` (`packages/cli`): The main Ink TUI and CLI wrapper.
- `@codeblame/core` (`packages/core`): Agent skills generators and Git hook automation.
- `@codeblame/db` (`packages/db`): Turso (`@libsql/client`) wrapper for the local database.

To get started:
```bash
pnpm install
pnpm build
```