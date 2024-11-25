#!/usr/bin/env node
const fs = require("node:fs");
const path = require("path");

/**
 * @returns {string|null}
 */
function findProjectRoot() {
  let currentDir = process.cwd(); // Start from the current directory where the command is run

  while (currentDir !== path.parse(currentDir).root) {
    const configPath = path.join(currentDir, ".config.dev.json");
    if (fs.existsSync(configPath)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  return null;
}

/**
 *
 * @returns {null | Object}
 */
function getConfig() {
  const rootDir = findProjectRoot();

  if (!rootDir) {
    throw new Error("Project root with .config.dev.json not found.");
  }

  const configPath = path.join(rootDir, ".config.dev.json");

  if (!fs.existsSync(configPath)) {
    throw new Error(".config.dev.json file not found in the project root."); // double check lol
  }

  const configContent = fs.readFileSync(configPath, "utf8");
  return JSON.parse(configContent); // Parse and return the JSON content
}

module.exports = { getConfig };
