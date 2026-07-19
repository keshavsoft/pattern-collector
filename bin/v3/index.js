/**
 * Returns all raw import statements present in the file content.
 */
const startFunc = ({ inFileContent, inSearchString }) => {
    const matches = [];
    let match;
    while ((match = inSearchString.exec(inFileContent)) !== null) {
        matches.push(match[0]);
    }
    return matches;
};

export default startFunc
