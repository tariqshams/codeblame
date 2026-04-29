import { createClient, Client } from '@libsql/client';

export interface CommitContext {
  hash: string;
  message: string;
  reasoning: string;
  agent: string;
  timestamp: number;
}

export class DBClient {
  private client: Client;

  constructor(dbPath: string) {
    this.client = createClient({
      url: `file:${dbPath}`,
    });
  }

  async initSchema() {
    await this.client.execute(`
      CREATE TABLE IF NOT EXISTS commit_context (
        hash TEXT PRIMARY KEY,
        message TEXT,
        reasoning TEXT,
        agent TEXT,
        timestamp INTEGER
      );
    `);
  }

  async saveContext(context: CommitContext) {
    await this.client.execute({
      sql: 'INSERT INTO commit_context (hash, message, reasoning, agent, timestamp) VALUES (?, ?, ?, ?, ?) ON CONFLICT(hash) DO UPDATE SET reasoning=excluded.reasoning, message=excluded.message, agent=excluded.agent, timestamp=excluded.timestamp',
      args: [context.hash, context.message, context.reasoning, context.agent, context.timestamp]
    });
  }

  async getContext(hash: string): Promise<CommitContext | null> {
    const res = await this.client.execute({
      sql: 'SELECT * FROM commit_context WHERE hash = ?',
      args: [hash]
    });
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      hash: row.hash as string,
      message: row.message as string,
      reasoning: row.reasoning as string,
      agent: row.agent as string,
      timestamp: row.timestamp as number,
    };
  }

  async getAllContexts(): Promise<CommitContext[]> {
    const res = await this.client.execute('SELECT * FROM commit_context ORDER BY timestamp DESC');
    return res.rows.map(row => ({
      hash: row.hash as string,
      message: row.message as string,
      reasoning: row.reasoning as string,
      agent: row.agent as string,
      timestamp: row.timestamp as number,
    }));
  }
}
