import { exec } from "child_process";
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import express from "express";

import { router as routerFromapi } from './api/routes.js';
import { router as routerFromapi1 } from './api1/routes.js';

import setupRoutes from "./routes.js";
import startServer from "./server.js";

const app = express()

app.use('/api', routerFromapi);
app.use('/api1', routerFromapi1);

setupRoutes(app);

const { port } = startServer(app);

if (process.env.OPEN_BROWSER === "true") {
    exec(`start http://localhost:${port}/v28/quotations/index.html`);
};
