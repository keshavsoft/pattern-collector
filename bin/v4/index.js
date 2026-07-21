const startFuncLinesOnly = ({ inFileContent, inSearchString }) => {
    const matches = [];
    let match;

    while ((match = inSearchString.exec(inFileContent)) !== null) {
        matches.push(match[0]);
    };

    return matches;
};

const startFunc = ({ inFileContent, inSearchString }) => {
    const matches = [];
    let match;

    while ((match = inSearchString.exec(inFileContent)) !== null) {
        const start = inFileContent.lastIndexOf('\n', match.index) + 1;
        let end = inFileContent.indexOf('\n', match.index);

        if (end === -1) {
            end = inFileContent.length;
        }

        let line = inFileContent.substring(start, end);

        if (line.endsWith('\r')) {
            line = line.slice(0, -1);
        }

        const lineNumber = inFileContent.substring(0, start).split('\n').length;

        matches.push({
            match: match[0],
            line,
            lineNumber
        });
    }

    return matches;
};

export default startFunc;