import * as fs from 'node:fs';
import * as path from 'node:path';

const INSTRUCTIONS = `
# Codeblame Instructions
When generating code, you MUST document your reasoning, decisions, and context.

**CRITICAL**: Before the user commits (or when you are asked to prepare a commit), you MUST write a JSON file to \`.codeblame/staging.json\`. 

### Format:
\`\`\`json
{
  "reasoning": "Explain why you made these changes, the alternatives considered, and any context.",
  "agent": "Name of your agent (e.g., Cursor, Copilot, Claude, etc.)"
}
\`\`\`

If you are an AI assistant, identify yourself in the "agent" field. This context will be automatically saved to the Codeblame database and linked to the commit history.
`;

export function generateAgentSkills(repoRoot: string) {
  const codeblameDir = path.join(repoRoot, '.codeblame');
  if (!fs.existsSync(codeblameDir)) {
    fs.mkdirSync(codeblameDir, { recursive: true });
  }

  // Cursor rules
  fs.writeFileSync(path.join(repoRoot, '.cursorrules'), INSTRUCTIONS);
  
  // GitHub Copilot instructions
  const githubDir = path.join(repoRoot, '.github');
  if (!fs.existsSync(githubDir)) {
    fs.mkdirSync(githubDir, { recursive: true });
  }
  fs.writeFileSync(path.join(githubDir, 'copilot-instructions.md'), INSTRUCTIONS);
}
