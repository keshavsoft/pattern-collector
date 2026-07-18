import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getImportEndLine,
    version
} from '../../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');

    console.log("=== getImportEndLine Test ===");
    console.log("Exposed Version:                ", version);
    console.log("End line of './api/routes.js':  ", getImportEndLine(fileContent, './api/routes.js'));
    console.log("End line of 'non-existent':     ", getImportEndLine(fileContent, 'non-existent'));
} catch (error) {
    console.error("Error running test:", error.message);
}
