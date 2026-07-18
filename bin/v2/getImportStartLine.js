/**
 * Calculates the start line of a specific import statement.
 */
export function getImportStartLine(fileContent, importSource) {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        const raw = match[0];
        const sourceMatch = raw.match(/from\s+['"]([^'"]+)['"]/) || raw.match(/import\s+['"]([^'"]+)['"]/);
        const source = sourceMatch ? sourceMatch[1] : '';
        if (source === importSource || source.includes(importSource)) {
            const textBefore = fileContent.substring(0, match.index);
            return textBefore.split('\n').length;
        }
    }
    return -1;
}
