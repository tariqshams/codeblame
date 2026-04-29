import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
export const LogScreen = ({ contexts }) => {
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
        return (React.createElement(Box, { padding: 1 },
            React.createElement(Text, { color: "yellow" }, "No AI commit history found. Try making a commit first!")));
    }
    const selected = contexts[selectedIndex];
    return (React.createElement(Box, { flexDirection: "column", padding: 1 },
        React.createElement(Box, { marginBottom: 1 },
            React.createElement(Text, { bold: true, color: "cyan" }, "Codeblame History"),
            React.createElement(Text, { color: "gray" }, " (Use \u2191/\u2193 to navigate)")),
        React.createElement(Box, { flexDirection: "row" },
            React.createElement(Box, { flexDirection: "column", width: 30, borderStyle: "single", borderColor: "gray", paddingRight: 1 }, contexts.map((ctx, idx) => (React.createElement(Text, { key: ctx.hash, color: idx === selectedIndex ? 'cyan' : 'white' },
                idx === selectedIndex ? '> ' : '  ',
                ctx.hash.substring(0, 7),
                " - ",
                ctx.agent)))),
            React.createElement(Box, { flexDirection: "column", flexGrow: 1, borderStyle: "single", borderColor: "cyan", paddingLeft: 2 },
                React.createElement(Box, { marginBottom: 1 },
                    React.createElement(Text, { bold: true }, "Commit: "),
                    React.createElement(Text, { color: "green" }, selected.hash)),
                React.createElement(Box, { marginBottom: 1 },
                    React.createElement(Text, { bold: true }, "Message: "),
                    React.createElement(Text, null, selected.message)),
                React.createElement(Box, { marginBottom: 1 },
                    React.createElement(Text, { bold: true }, "Agent: "),
                    React.createElement(Text, { color: "magenta" }, selected.agent)),
                React.createElement(Box, { flexDirection: "column" },
                    React.createElement(Text, { bold: true, color: "cyan" }, "Reasoning / Trace:"),
                    React.createElement(Box, { marginTop: 1, paddingLeft: 2, borderStyle: "round", borderColor: "gray" },
                        React.createElement(Text, null, selected.reasoning)))))));
};
