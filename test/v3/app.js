import { exec } from "child_process";
import express from "express";

import startServer from "./server.js";

const app = express();

const { port } = startServer(app);

if (process.env.OPEN_BROWSER === "true") {
    exec(`start http://localhost:${port}/v26/quotations/index.html`);
};
