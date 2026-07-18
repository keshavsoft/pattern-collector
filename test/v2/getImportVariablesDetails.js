import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getImportVariablesDetails,
    version
} from '../../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');

    console.log("=== getImportVariablesDetails Test ===");
    console.log("Exposed Version: ", version);
    console.log(JSON.stringify(getImportVariablesDetails(fileContent), null, 2));
} catch (error) {
    console.error("Error running test:", error.message);
}
