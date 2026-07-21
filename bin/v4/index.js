const startFuncLinesOnly = ({ inFileContent, inSearchString }) => {
    const matches = [];
    let match;

    while ((match = inSearchString.exec(inFileContent)) !== null) {
        matches.push(match[0]);
    };

    return matches;
};

const startFunc_22jul2026 = ({ inFileContent, inSearchString }) => {
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

const getLine = ({ inFileContent, inIndex }) => {
    const start = inFileContent.lastIndexOf('\n', inIndex) + 1;

    let end = inFileContent.indexOf('\n', inIndex);

    if (end === -1) {
        end = inFileContent.length;
    }

    let line = inFileContent.substring(start, end);

    if (line.endsWith('\r')) {
        line = line.slice(0, -1);
    }

    return line;
};

const getCurrentLineNumber = ({
    inFileContent,
    inCurrentLine,
    inLastPosition,
    inCurrentPosition
}) => {
    let line = inCurrentLine;

    for (let i = inLastPosition; i < inCurrentPosition; i++) {
        if (inFileContent[i] === '\n') {
            line++;
        }
    }

    return line;
};

const startFunc = ({ inFileContent, inSearchString }) => {
    const matches = [];
    let match;

    let currentLine = 1;
    let lastPosition = 0;

    while ((match = inSearchString.exec(inFileContent)) !== null) {
        currentLine = getCurrentLineNumber({
            inFileContent,
            inCurrentLine: currentLine,
            inLastPosition: lastPosition,
            inCurrentPosition: match.index
        });

        lastPosition = match.index;

        const line = getLine({
            inFileContent,
            inIndex: match.index
        });

        matches.push({
            line,
            lineNumber: currentLine
        });
    }

    return matches;
};

export default startFunc;