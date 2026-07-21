/**
 * Returns all raw import statements present in the file content.
 */
const startFunc = ({ inFileContent, inSearchString }) => {
    const matches = [];
    let match;
    const isAppUse = inSearchString.source.includes('app\\.use');
    while ((match = inSearchString.exec(inFileContent)) !== null) {
        if (isAppUse) {
            const startIndex = match.index;
            const endIndex = startIndex + match[0].length;
            const start = inFileContent.lastIndexOf('\n', startIndex) + 1;
            let end = inFileContent.indexOf('\n', endIndex);
            if (end === -1) {
                end = inFileContent.length;
            }
            let line = inFileContent.substring(start, end);
            if (line.endsWith('\r')) {
                line = line.slice(0, -1);
            }
            matches.push(line);
        } else {
            matches.push(match[0]);
        }
    }
    return matches;
};

export default startFunc
