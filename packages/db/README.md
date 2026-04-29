# @codeblame/db

The storage layer for Codeblame. This package provides a simple wrapper around `@libsql/client` (Turso) to manage local SQLite databases for storing AI commit context and reasoning traces.

## Installation

```bash
npm install @codeblame/db
```

## Usage

```typescript
import { DBClient } from '@codeblame/db';

const db = new DBClient('.codeblame/db.sqlite');
await db.initSchema();

await db.saveContext({
  hash: 'abc123...',
  message: 'feat: add something',
  reasoning: 'I added this because...',
  agent: 'Cursor',
  timestamp: Date.now()
});

const context = await db.getContext('abc123...');
```
