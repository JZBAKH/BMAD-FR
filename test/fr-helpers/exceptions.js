/**
 * Loader for the test/fr-helpers/translation-exceptions.json whitelist.
 *
 * The JSON file groups exemptions by the test name that should skip the file, so a
 * file can be excluded from one test (e.g. "11-french-coverage-floor") without being
 * excluded from every other test.
 *
 * Schema :
 *   {
 *     "<test-name>": [
 *       { "path": "<repo-relative path>", "reason": "<why>" },
 *       ...
 *     ],
 *     ...
 *   }
 */

const fs = require('node:fs');
const path = require('node:path');

const EXCEPTIONS_FILE = path.join(__dirname, 'translation-exceptions.json');

let cached = null;

function loadExceptions() {
  if (cached) return cached;
  if (!fs.existsSync(EXCEPTIONS_FILE)) {
    cached = {};
    return cached;
  }
  const raw = fs.readFileSync(EXCEPTIONS_FILE, 'utf8');
  cached = JSON.parse(raw);
  return cached;
}

/**
 * Check whether a given file is exempted from a given test.
 * @param {string} testName Identifier (e.g. '11-french-coverage-floor')
 * @param {string} relPath  Repo-relative path with forward slashes
 * @returns {{excluded: boolean, reason?: string}}
 */
function isExcluded(testName, relPath) {
  const all = loadExceptions();
  const entries = all[testName] || [];
  for (const entry of entries) {
    if (matchesPath(relPath, entry.path)) {
      return { excluded: true, reason: entry.reason };
    }
  }
  return { excluded: false };
}

function matchesPath(filePath, pattern) {
  if (pattern === filePath) return true;
  // Suffix-glob support : "*-en/" or "**/*.csv"
  if (pattern.endsWith('/**')) {
    return filePath.startsWith(pattern.slice(0, -3));
  }
  if (pattern.includes('*')) {
    const escaped = pattern
      .replaceAll(/[.+^${}()|[\]\\]/g, String.raw`\$&`)
      .replaceAll('**', '__DSTAR__')
      .replaceAll('*', '[^/]*')
      .replaceAll('__DSTAR__', '.*');
    return new RegExp(`^${escaped}$`).test(filePath);
  }
  return false;
}

function listExceptions(testName) {
  const all = loadExceptions();
  return all[testName] || [];
}

module.exports = { loadExceptions, isExcluded, listExceptions, EXCEPTIONS_FILE };
