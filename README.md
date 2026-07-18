# pattern-collector 🔍

> **A high-performance pattern collector and ESM import statement analyzer for JavaScript.**

[![npm version](https://img.shields.io/npm/v/pattern-collector.svg?style=flat-square&color=38bdf8)](https://www.npmjs.com/package/pattern-collector)
[![license](https://img.shields.io/npm/l/pattern-collector.svg?style=flat-square&color=34d399)](LICENSE)

🔗 **Quick Links:**
*   📦 **NPM Registry**: [npmjs.com/package/pattern-collector](https://www.npmjs.com/package/pattern-collector)
*   💻 **GitHub Repo**: [github.com/keshavsoft/pattern-collector](https://github.com/keshavsoft/pattern-collector)
*   📄 **Interactive Docs**: [docs/index.html](file:///d:/KeshavSoftRepos/2026-07-18/ks6/pattern-collector/docs/index.html)

---

## 📖 Overview

`pattern-collector` is a zero-dependency, lightweight JavaScript library designed to scan file content and collect substrings that match a specified pattern or regular expression. 

It serves as a fast and flexible engine, enabling easy parsing, extraction, and static analysis of source files (such as locating ES Module imports, decorators, function declarations, or other syntactic patterns).

---

## ✨ Features

*   **⚡ Zero Dependencies**: Light, fast, and secure.
*   **🧩 Flexible Matching**: Collects any patterns by accepting custom global Regular Expressions.
*   **📦 ESM Native**: Built for modern ES module environments.
*   **🏷️ Versioned Under the Hood**: Uses an extensible directory-based versioned core.

---

## 🚀 Installation

```bash
npm install pattern-collector
```

---

## 🛠️ API Reference

### `default(options)`

The default export is a function that collects all occurrences of a pattern in the given text.

#### Parameters

An options object containing:

*   **`fileContent`** `(string)`: The raw text or code content to search.
*   **`searchString`** `(RegExp)`: A regular expression with the global (`g`) flag to match patterns in the content.

#### Returns

*   `(string[])`: An array of matches found. If no matches are found, it returns an empty array.

---

## 💻 Usage Example

```javascript
import patternCollector from 'pattern-collector';

const code = `
import { exec } from "child_process";
import dotenv from 'dotenv';
import express from "express";

const PORT = 3000;
`;

// Extract all import statements
const imports = patternCollector({
  fileContent: code,
  searchString: /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]/g
});

console.log(imports);
/*
Output:
[
  'import { exec } from "child_process"',
  "import dotenv from 'dotenv'",
  'import express from "express"'
]
*/
```

---

## ⚖️ License

MIT License. Designed with ❤️ by [KeshavSoft](https://github.com/keshavsoft).
