/**
 * Filtered recursive directory walker.
 * Returns a list of file paths (relative to the optional `base`).
 * Hidden directories (starting with '.') and node_modules are skipped by default.
 */

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_IGNORES = new Set(['node_modules', '.git', 'dist', 'build', '.astro', 'coverage']);

/**
 * @param {string} dir Directory to walk.
 * @param {Object} [opts]
 * @param {Set<string>|string[]} [opts.extensions] Allowed extensions (with leading dot, e.g. '.md').
 *                                                  If omitted, all files are returned.
 * @param {Set<string>} [opts.ignoreDirs] Additional directory names to ignore.
 * @param {string} [opts.base] If provided, paths are returned relative to this base instead of `dir`.
 * @param {boolean} [opts.posix] If true (default), output paths use forward slashes.
 * @returns {string[]} List of file paths.
 */
function walk(dir, opts = {}) {
  const extensions = opts.extensions ? new Set(opts.extensions) : null;
  const extraIgnores = opts.ignoreDirs || new Set();
  const base = opts.base || dir;
  const posix = opts.posix !== false;
  const out = [];

  function recurse(current) {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.') && entry.name !== '.github') continue;
      if (DEFAULT_IGNORES.has(entry.name) || extraIgnores.has(entry.name)) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        recurse(full);
      } else if (entry.isFile()) {
        if (extensions) {
          const dot = entry.name.lastIndexOf('.');
          if (dot < 0) continue;
          const ext = entry.name.slice(dot);
          if (!extensions.has(ext)) continue;
        }
        const rel = path.relative(base, full);
        out.push(posix ? rel.replaceAll('\\', '/') : rel);
      }
    }
  }

  recurse(dir);
  return out;
}

module.exports = { walk };
