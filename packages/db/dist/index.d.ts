export interface CommitContext {
    hash: string;
    message: string;
    reasoning: string;
    agent: string;
    timestamp: number;
}
export declare class DBClient {
    private client;
    constructor(dbPath: string);
    initSchema(): Promise<void>;
    saveContext(context: CommitContext): Promise<void>;
    getContext(hash: string): Promise<CommitContext | null>;
    getAllContexts(): Promise<CommitContext[]>;
}
//# sourceMappingURL=index.d.ts.map