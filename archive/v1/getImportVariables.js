import { getAllImports } from './getAllImports.js';

/**
 * Parses all raw import statements and returns an array of the imported variable names.
 * For example:
 *   import { exec } from "child_process"; -> ['exec']
 *   import dotenv from 'dotenv'; -> ['dotenv']
 *   import express from "express"; -> ['express']
 *   import { router as routerFromapi } from './api/routes.js'; -> ['routerFromapi']
 *   import setupRoutes from "./routes.js"; -> ['setupRoutes']
 *   import startServer from "./server.js"; -> ['startServer']
 */
export function getImportVariables(fileContent) {
    const rawImports = getAllImports(fileContent);
    const variables = [];

    // Simple helper to clean up comments inside imports
    const stripComments = (str) => {
        return str
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*/g, '');
    };

    for (const rawImport of rawImports) {
        // Strip comments and normalize whitespace
        const cleanImport = stripComments(rawImport).replace(/\s+/g, ' ').trim();
        
        // Match the part between `import` and `from`
        // Note: For side-effect imports like `import 'foo'`, there is no `from`
        const fromIndex = cleanImport.indexOf(' from ');
        if (fromIndex === -1) {
            continue;
        }

        // Extract the variables declaration part: the text between `import ` and ` from `
        const varPart = cleanImport.substring(7, fromIndex).trim();

        // Parse varPart
        // Case 1: curly braces `{ ... }` are present
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
                    if (alias) {
                        variables.push(alias);
                    }
                } else {
                    variables.push(item);
                }
            }
            
            // Remove curly braces part to get default/namespace imports if they co-exist
            const remaining = varPart.replace(/\{[\s\S]*?\}/, '').trim();
            if (remaining) {
                // Remove trailing/leading commas or spaces
                const parts = remaining.split(',');
                for (let part of parts) {
                    part = part.trim();
                    if (part.includes('* as ')) {
                        const starParts = part.split('* as ');
                        const nsVar = starParts[starParts.length - 1].trim();
                        if (nsVar) {
                            variables.push(nsVar);
                        }
                    } else if (part && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(part)) {
                        variables.push(part);
                    }
                }
            }
        } else {
            // Case 2: No curly braces. Could be a default import, namespace import, or both
            const parts = varPart.split(',');
            for (let part of parts) {
                part = part.trim();
                if (!part) continue;

                if (part.includes('* as ')) {
                    const starParts = part.split('* as ');
                    const nsVar = starParts[starParts.length - 1].trim();
                    if (nsVar) {
                        variables.push(nsVar);
                    }
                } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(part)) {
                    variables.push(part);
                }
            }
        }
    }

    // Deduplicate and return
    return [...new Set(variables)];
}
