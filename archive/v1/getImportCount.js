import { getAllImports } from './getAllImports.js';

/**
 * Returns the total count of import statements in the file content.
 */
export function getImportCount(fileContent) {
    return getAllImports(fileContent).length;
}
