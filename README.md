# express-check-any-for-import 🔍

> **A high-performance ESM import analyzer that parses, inspects, and extracts details about JavaScript import statements and variables.**

[![npm version](https://img.shields.io/npm/v/express-check-any-for-import.svg?style=flat-square&color=38bdf8)](https://www.npmjs.com/package/express-check-any-for-import)
[![license](https://img.shields.io/npm/l/express-check-any-for-import.svg?style=flat-square&color=34d399)](LICENSE)

---

## 📖 Overview

`express-check-any-for-import` is a lightweight library designed to analyze JavaScript files for ES Module (`import`) statements. It helps you check if imports are present, count them, get their line numbers (start/end), and extract imported variable names (with aliases and default imports correctly resolved).

It is used as a foundation layer to inspect references and track variables inside source code.

---

## ✨ Features

*   **📦 Broad Import Style Support**: Handles default imports, namespace imports (`* as name`), named imports with aliases (`{ router as apiRouter }`), mixed imports, and multi-line imports.
*   **💬 Comment Stripping**: Cleans block (`/* */`) and line (`//`) comments inside imports before parsing to ensure robust variable extraction.
*   **📊 Line Metrics**: Computes precise 1-indexed start and end lines for import statements.
*   **⚡ Zero Dependencies**: Extremely fast and lightweight.

---

## 🚀 Installation

```bash
npm install express-check-any-for-import
```

---

## 🛠️ API Reference

### `getAllImports(fileContent)`
Returns an array of all raw import statement strings found in the file.
```javascript
import { getAllImports } from 'express-check-any-for-import';
const imports = getAllImports(code);
// ['import express from "express";', ...]
```

### `getImportCount(fileContent)`
Returns the total count of import statements in the file.
```javascript
import { getImportCount } from 'express-check-any-for-import';
const count = getImportCount(code); // 6
```

### `isImportPresent(fileContent, sourceName)`
Checks whether a specific import source path (like `'express'` or `'dotenv'`) is present.
```javascript
import { isImportPresent } from 'express-check-any-for-import';
const hasExpress = isImportPresent(code, 'express'); // true
```

### `getImportStartLine(fileContent, sourceName)`
Calculates the 1-indexed start line of the import statement matching `sourceName`. Returns `-1` if not found.
```javascript
import { getImportStartLine } from 'express-check-any-for-import';
const line = getImportStartLine(code, 'dotenv'); // 2
```

### `getImportEndLine(fileContent, sourceName)`
Calculates the 1-indexed end line of the import statement matching `sourceName` (handles multi-line statements).
```javascript
import { getImportEndLine } from 'express-check-any-for-import';
const line = getImportEndLine(code, 'some-library'); // 18
```

### `getImportVariables(fileContent)`
Extracts a flat, unique list of all variables declared in the imports. Resolves default imports, aliases, and namespace imports.
```javascript
import { getImportVariables } from 'express-check-any-for-import';
const variables = getImportVariables(code);
// ['exec', 'dotenv', 'express', 'routerFromapi']
```

### `getImportVariablesDetails(fileContent)`
Returns the total lines of the file, alongside the list of variables with their precise line spans (`startLine`, `endLine`).
```javascript
import { getImportVariablesDetails } from 'express-check-any-for-import';
const details = getImportVariablesDetails(code);
/*
{
  totalLines: 23,
  variables: [
    { name: 'exec', startLine: 1, endLine: 1 },
    { name: 'routerFromapi', startLine: 7, endLine: 7 }
  ]
}
*/
```

---

## 📜 Example

Given the following code block:
```javascript
import { exec } from "child_process";
import dotenv from 'dotenv'
import express from "express";
import { router as routerFromapi } from './api/routes.js';
```

Calling `getImportVariablesDetails` yields:
```json
{
  "totalLines": 4,
  "variables": [
    { "name": "exec", "startLine": 1, "endLine": 1 },
    { "name": "dotenv", "startLine": 2, "endLine": 2 },
    { "name": "express", "startLine": 3, "endLine": 3 },
    { "name": "routerFromapi", "startLine": 4, "endLine": 4 }
  ]
}
```

---

## ⚖️ License

MIT License. Designed with ❤️ by [KeshavSoft](https://github.com/keshavsoft).
