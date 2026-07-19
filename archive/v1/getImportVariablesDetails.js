/**
 * Parses all raw import statements and returns details about the imported variables,
 * including their line numbers (startLine, endLine) and the total lines of the file.
 */
export function getImportVariablesDetails(fileContent) {
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]|import\s+['"][^'"]+['"]/g;
    const variables = [];
    const totalLines = fileContent.split('\n').length;

    // Simple helper to clean up comments inside imports
    const stripComments = (str) => {
        return str
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*/g, '');
    };

    let match;
    while ((match = importRegex.exec(fileContent)) !== null) {
        const rawImport = match[0];
        
        // Calculate start and end lines of this specific match
        const startLine = fileContent.substring(0, match.index).split('\n').length;
        const endLine = fileContent.substring(0, match.index + rawImport.length).split('\n').length;

        // Strip comments and normalize whitespace
        const cleanImport = stripComments(rawImport).replace(/\s+/g, ' ').trim();
        
        // Match the part between `import` and `from`
        const fromIndex = cleanImport.indexOf(' from ');
        if (fromIndex === -1) {
            continue;
        }

        // Extract the variables declaration part
        const varPart = cleanImport.substring(7, fromIndex).trim();

        // Local helper to add a variable with its line details
        const addVar = (name) => {
            if (name && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
                variables.push({
                    name,
                    startLine,
                    endLine
                });
            }
        };

        // Parse varPart
        const braceMatch = varPart.match(/\{([\s\S]*?)\}/);
        if (braceMatch) {
            const inner = braceMatch[1];
            const namedImports = inner.split(',');
            for (let item of namedImports) {
                item = item.trim();
                if (!item) continue;
                
                if (item.includes(' as ')) {
                    const parts = item.split(' as ');
                    const alias = parts[parts.length - 1].trim();
                    addVar(alias);
                } else {
                    addVar(item);
                }
            }
            
            // Remove curly braces part to get default/namespace imports if they co-exist
            const remaining = varPart.replace(/\{[\s\S]*?\}/, '').trim();
            if (remaining) {
                const parts = remaining.split(',');
                for (let part of parts) {
                    part = part.trim();
                    if (part.includes('* as ')) {
                        const starParts = part.split('* as ');
                        const nsVar = starParts[starParts.length - 1].trim();
                        addVar(nsVar);
                    } else {
                        addVar(part);
                    }
                }
            }
        } else {
            const parts = varPart.split(',');
            for (let part of parts) {
                part = part.trim();
                if (!part) continue;

                if (part.includes('* as ')) {
                    const starParts = part.split('* as ');
                    const nsVar = starParts[starParts.length - 1].trim();
                    addVar(nsVar);
                } else {
                    addVar(part);
                }
            }
        }
    }

    // Deduplicate variables by name, keeping the first occurrence
    const seen = new Set();
    const uniqueVariables = [];
    for (const v of variables) {
        if (!seen.has(v.name)) {
            seen.add(v.name);
            uniqueVariables.push(v);
        }
    }

    return {
        totalLines,
        variables: uniqueVariables
    };
}
