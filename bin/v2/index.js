/**
 * Returns all raw import statements present in the file content.
 */
const startFunc = ({ inFileContent, inSearchString }) => {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    const matches = [];
    let match;
    while ((match = inSearchString.exec(fileContent)) !== null) {
        matches.push(match[0]);
    }
    return matches;
};

export default startFunc
