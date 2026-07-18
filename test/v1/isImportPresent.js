import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    isImportPresent,
    version
} from '../../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');

    console.log("=== isImportPresent Test ===");
    console.log("Exposed Version:            ", version);
    console.log("Is 'express' present?       ", isImportPresent(fileContent, 'express'));
    console.log("Is 'non-existent' present?  ", isImportPresent(fileContent, 'non-existent'));
} catch (error) {
    console.error("Error running test:", error.message);
}
