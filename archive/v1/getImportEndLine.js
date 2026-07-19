/**
 * Calculates the end line of a specific import statement.
 */
export function getImportEndLine(fileContent, importSource) {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        const raw = match[0];
        const sourceMatch = raw.match(/from\s+['"]([^'"]+)['"]/) || raw.match(/import\s+['"]([^'"]+)['"]/);
        const source = sourceMatch ? sourceMatch[1] : '';
        if (source === importSource || source.includes(importSource)) {
            const endIndex = match.index + raw.length;
            const textBefore = fileContent.substring(0, endIndex);
            return textBefore.split('\n').length;
        }
    }
    return -1;
}
