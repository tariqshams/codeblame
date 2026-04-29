import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';

export const InitScreen = ({ repoPath }: { repoPath: string }) => {
  const { exit } = useApp();

  useEffect(() => {
    // Exit automatically after showing the screen
    const timer = setTimeout(() => {
      exit();
    }, 100);
    return () => clearTimeout(timer);
  }, [exit]);

  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor="cyan">
      <Box marginBottom={1}>
        <Text color="cyan" bold>Codeblame Initialized!</Text>
      </Box>
      <Box flexDirection="column">
        <Text color="green">✓ Git post-commit hook installed</Text>
        <Text color="green">✓ Agent skills files generated (.cursorrules, copilot)</Text>
        <Text color="green">✓ Local Turso SQLite DB configured</Text>
      </Box>
      <Box marginTop={1}>
        <Text color="gray">Your AI agents will now automatically save their reasoning traces alongside your commits.</Text>
      </Box>
    </Box>
  );
};
