/**
 * Returns all raw import statements present in the file content.
 */
export const getAllImports = (fileContent) => {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    const matches = [];
    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        matches.push(match[0]);
    }
    return matches;
};
