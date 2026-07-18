import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getAllImports,
    version
} from '../../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

try {
    const fileContent = fs.readFileSync(appPath, 'utf8');

    console.log("=== getAllImports Test ===");
    console.log("Exposed Version: ", version);
    console.log(getAllImports(fileContent));
} catch (error) {
    console.error("Error running test:", error.message);
}
