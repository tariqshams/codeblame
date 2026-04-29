# Codeblame 🚀

**Codeblame** is an AI-Aware Git Context Tracker. It's a modern, beautiful terminal application (TUI) that bridges the gap between your Git workflow and the AI coding agents writing your code.

Instead of losing the "why" behind AI-generated changes, Codeblame automatically captures AI reasoning on every commit and saves it to a local, zero-config Turso SQLite database right in your repository.

---

## Features

- 📦 **Zero Config & Free**: Stores everything in a local `.codeblame/db.sqlite` file. Commit it to share context with your team for free.
- 🎨 **Premium TUI**: A gorgeous interactive terminal interface built with [Ink](https://github.com/vadimdemedes/ink).
- 🤖 **Agent First**: Generates instructions for Cursor, Copilot, and other agents to ensure they log their reasoning traces.
- 🔗 **Git Native**: Integrated directly into your workflow via standard Git hooks.

## Installation

```bash
# Install the CLI globally
npm install -g codeblame

# Or run once via npx
npx codeblame init
```

## Getting Started

1. **Initialize**: Run `codeblame init` in your repo.
2. **Code**: Let your AI agent (Cursor, Copilot, etc.) generate code. The generated `.cursorrules` will tell them how to log their reasoning.
3. **Commit**: `git commit` as usual. The reasoning is automatically linked to the commit.
4. **Explore**: Run `codeblame log` to see the beautiful reasoning history.

---

## Monorepo Structure

This project is a TypeScript monorepo managed with Turborepo:

| Package | Description |
| --- | --- |
| [**`codeblame`**](./packages/cli) | The main CLI & TUI application. |
| [**`@codeblame/core`**](./packages/core) | Git hook management and agent skill generation logic. |
| [**`@codeblame/db`**](./packages/db) | Turso (libSQL) local database client. |

## Development

```bash
pnpm install
pnpm build
# Run the local CLI
node packages/cli/dist/cli.js log
```

---

Built with ❤️ for the AI coding generation.