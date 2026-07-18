import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getImportStartLine,
    version
} from '../../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');

    console.log("=== getImportStartLine Test ===");
    console.log("Exposed Version:                  ", version);
    console.log("Start line of './api/routes.js':  ", getImportStartLine(fileContent, './api/routes.js'));
    console.log("Start line of 'non-existent':     ", getImportStartLine(fileContent, 'non-existent'));
} catch (error) {
    console.error("Error running test:", error.message);
}
