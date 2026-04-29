import * as fs from 'node:fs';
import * as path from 'node:path';
import { simpleGit } from 'simple-git';
import { DBClient } from '@codeblame/db';

export function installGitHook(repoRoot: string) {
  const hooksDir = path.join(repoRoot, '.git', 'hooks');
  if (!fs.existsSync(hooksDir)) {
    console.warn('No .git/hooks directory found. Is this a git repository?');
    return;
  }

  const hookPath = path.join(hooksDir, 'post-commit');
  // Use ts-node for local dev if installed, or the compiled codeblame binary
  const hookContent = `#!/bin/sh\nnpx codeblame hook run\n`;

  fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
}

export async function processPostCommit(repoRoot: string) {
  const codeblameDir = path.join(repoRoot, '.codeblame');
  if (!fs.existsSync(codeblameDir)) {
    fs.mkdirSync(codeblameDir, { recursive: true });
  }

  const stagingPath = path.join(codeblameDir, 'staging.json');
  const dbPath = path.join(codeblameDir, 'db.sqlite');
  
  const git = simpleGit(repoRoot);
  const log = await git.log(['-1']);
  const latestCommit = log.latest;

  if (!latestCommit) {
    return;
  }

  let reasoning = 'No AI context provided.';
  let agent = 'Human';

  if (fs.existsSync(stagingPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(stagingPath, 'utf-8'));
      reasoning = data.reasoning || reasoning;
      agent = data.agent || 'AI Agent';
      
      console.log(`[Codeblame] Captured reasoning from ${agent}`);
      fs.unlinkSync(stagingPath);
    } catch (e) {
      console.error('[Codeblame] Failed to parse staging.json:', e);
    }
  } else {
    // Subtle hint for users who might expect AI context
    // console.log('[Codeblame] No staging.json found, defaulting to Human.');
  }

  const db = new DBClient(dbPath);
  await db.initSchema();
  await db.saveContext({
    hash: latestCommit.hash,
    message: latestCommit.message,
    reasoning,
    agent,
    timestamp: new Date(latestCommit.date).getTime()
  });
}
