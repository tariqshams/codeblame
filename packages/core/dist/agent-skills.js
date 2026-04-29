import * as fs from 'node:fs';
import * as path from 'node:path';
const INSTRUCTIONS = `
# Codeblame Instructions
When generating code, you MUST document your reasoning, decisions, and context.
Before the user commits, you must write a JSON file to \`.codeblame/staging.json\` in this format:
{
  "reasoning": "Explain why you made these changes, the alternatives considered, and any context.",
  "agent": "Name of your agent (e.g., Copilot, Cursor, etc.)"
}
This context will be automatically saved to the Codeblame database and linked to the commit.
`;
export function generateAgentSkills(repoRoot) {
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
