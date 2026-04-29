import { createClient } from '@libsql/client';
export class DBClient {
    client;
    constructor(dbPath) {
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
    async saveContext(context) {
        await this.client.execute({
            sql: 'INSERT INTO commit_context (hash, message, reasoning, agent, timestamp) VALUES (?, ?, ?, ?, ?) ON CONFLICT(hash) DO UPDATE SET reasoning=excluded.reasoning, message=excluded.message, agent=excluded.agent, timestamp=excluded.timestamp',
            args: [context.hash, context.message, context.reasoning, context.agent, context.timestamp]
        });
    }
    async getContext(hash) {
        const res = await this.client.execute({
            sql: 'SELECT * FROM commit_context WHERE hash = ?',
            args: [hash]
        });
        if (res.rows.length === 0)
            return null;
        const row = res.rows[0];
        return {
            hash: row.hash,
            message: row.message,
            reasoning: row.reasoning,
            agent: row.agent,
            timestamp: row.timestamp,
        };
    }
    async getAllContexts() {
        const res = await this.client.execute('SELECT * FROM commit_context ORDER BY timestamp DESC');
        return res.rows.map(row => ({
            hash: row.hash,
            message: row.message,
            reasoning: row.reasoning,
            agent: row.agent,
            timestamp: row.timestamp,
        }));
    }
}
