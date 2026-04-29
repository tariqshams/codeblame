#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { Command } from 'commander';
import { generateAgentSkills, installGitHook, processPostCommit } from '@codeblame/core';
import { DBClient } from '@codeblame/db';
import * as path from 'node:path';

// Components
import { InitScreen } from './components/InitScreen.js';
import { LogScreen } from './components/LogScreen.js';

const program = new Command();
program.name('codeblame').description('AI-Aware Git Context Tracker');

program
  .command('init')
  .description('Initialize codeblame in the current repository')
  .action(() => {
    const cwd = process.cwd();
    installGitHook(cwd);
    generateAgentSkills(cwd);
    render(<InitScreen repoPath={cwd} />);
  });

program
  .command('hook')
  .description('Run internal hook processing (used by git hooks)')
  .argument('<action>', 'Action to run')
  .action(async (action) => {
    if (action === 'run') {
      await processPostCommit(process.cwd());
    }
  });

program
  .command('log')
  .description('View AI commit history and reasoning')
  .action(async () => {
    const cwd = process.cwd();
    const dbPath = path.join(cwd, '.codeblame', 'db.sqlite');
    const db = new DBClient(dbPath);
    await db.initSchema();
    const contexts = await db.getAllContexts();
    render(<LogScreen contexts={contexts} />);
  });

program.parse();
