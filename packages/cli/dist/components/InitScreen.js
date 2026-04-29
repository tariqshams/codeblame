import React, { useEffect } from 'react';
import { Box, Text, useApp } from 'ink';
export const InitScreen = ({ repoPath }) => {
    const { exit } = useApp();
    useEffect(() => {
        // Exit automatically after showing the screen
        const timer = setTimeout(() => {
            exit();
        }, 100);
        return () => clearTimeout(timer);
    }, [exit]);
    return (React.createElement(Box, { flexDirection: "column", padding: 1, borderStyle: "round", borderColor: "cyan" },
        React.createElement(Box, { marginBottom: 1 },
            React.createElement(Text, { color: "cyan", bold: true }, "Codeblame Initialized!")),
        React.createElement(Box, { flexDirection: "column" },
            React.createElement(Text, { color: "green" }, "\u2713 Git post-commit hook installed"),
            React.createElement(Text, { color: "green" }, "\u2713 Agent skills files generated (.cursorrules, copilot)"),
            React.createElement(Text, { color: "green" }, "\u2713 Local Turso SQLite DB configured")),
        React.createElement(Box, { marginTop: 1 },
            React.createElement(Text, { color: "gray" }, "Your AI agents will now automatically save their reasoning traces alongside your commits."))));
};
