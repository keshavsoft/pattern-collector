import { createRequire } from "module";
import getLatestVersion from "./bin/core/getLatestVersion.js";

const require = createRequire(import.meta.url);

const v = getLatestVersion();
const latestModule = require(`./bin/${v}/index.js`);
const startModule = require(`./bin/${v}/start.js`);

const load = ({ jsFilePath, inCheckLines, showLog }) => {
    return startModule.default({ jsFilePath, inCheckLines, showLog });
};

export const getAllImports = latestModule.getAllImports;
export const getImportCount = latestModule.getImportCount;
export const isImportPresent = latestModule.isImportPresent;
export const getImportStartLine = latestModule.getImportStartLine;
export const getImportEndLine = latestModule.getImportEndLine;
export const getImportVariables = latestModule.getImportVariables;
export const getImportVariablesDetails = latestModule.getImportVariablesDetails;
export const version = v;

export default load;