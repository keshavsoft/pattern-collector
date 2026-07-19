/**
 * Tests whether a specific import source path is present or not.
 */
export function isImportPresent(fileContent, neededImport) {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        const raw = match[0];
        const sourceMatch = raw.match(/from\s+['"]([^'"]+)['"]/) || raw.match(/import\s+['"]([^'"]+)['"]/);
        const source = sourceMatch ? sourceMatch[1] : '';
        if (source === neededImport || source.includes(neededImport)) {
            return true;
        }
    }
    return false;
}
