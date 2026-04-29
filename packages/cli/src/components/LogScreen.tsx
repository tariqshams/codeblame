import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { CommitContext } from '@codeblame/db';

export const LogScreen = ({ contexts }: { contexts: CommitContext[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIndex(Math.max(0, selectedIndex - 1));
    }
    if (key.downArrow) {
      setSelectedIndex(Math.min(contexts.length - 1, selectedIndex + 1));
    }
  });

  if (contexts.length === 0) {
    return (
      <Box padding={1}>
        <Text color="yellow">No AI commit history found. Try making a commit first!</Text>
      </Box>
    );
  }

  const selected = contexts[selectedIndex];

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">Codeblame History</Text>
        <Text color="gray"> (Use ↑/↓ to navigate)</Text>
      </Box>

      <Box flexDirection="row">
        {/* Sidebar */}
        <Box flexDirection="column" width={30} borderStyle="single" borderColor="gray" paddingRight={1}>
          {contexts.map((ctx, idx) => (
            <Text key={ctx.hash} color={idx === selectedIndex ? 'cyan' : 'white'}>
              {idx === selectedIndex ? '> ' : '  '}
              {ctx.hash.substring(0, 7)} - {ctx.agent}
            </Text>
          ))}
        </Box>

        {/* Main Content */}
        <Box flexDirection="column" flexGrow={1} borderStyle="single" borderColor="cyan" paddingLeft={2}>
          <Box marginBottom={1}>
            <Text bold>Commit: </Text>
            <Text color="green">{selected.hash}</Text>
          </Box>
          <Box marginBottom={1}>
            <Text bold>Message: </Text>
            <Text>{selected.message}</Text>
          </Box>
          <Box marginBottom={1}>
            <Text bold>Agent: </Text>
            <Text color="magenta">{selected.agent}</Text>
          </Box>
          <Box flexDirection="column">
            <Text bold color="cyan">Reasoning / Trace:</Text>
            <Box marginTop={1} paddingLeft={2} borderStyle="round" borderColor="gray">
              <Text>{selected.reasoning}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
