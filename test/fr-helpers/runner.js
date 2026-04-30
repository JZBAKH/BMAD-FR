/**
 * Minimal test runner shared by the BMAD-FR functional and language test suites.
 * Style is intentionally aligned with the existing vanilla-Node tests in this repo
 * (test-file-refs-csv.js, etc.) — no Jest, no Mocha, just clear console output and
 * an exit code.
 *
 * Two severity levels are supported per the user-validated convention :
 *  - error   : a real violation. Counts towards the exit-1 fail count.
 *  - warning : a soft signal. Reported but does NOT fail the run.
 *
 * Usage :
 *   const runner = require('./runner');
 *   runner.section('My test group');
 *   runner.test('something', () => runner.assert(true, 'must hold'));
 *   runner.warn('something looks off but is allowed', { file: 'foo.md' });
 *   runner.summary();          // prints final report and process.exit()
 */

const colors = {
  reset: '[0m',
  bold: '[1m',
  dim: '[2m',
  red: '[31m',
  green: '[32m',
  yellow: '[33m',
  cyan: '[36m',
  magenta: '[35m',
};

let totalTests = 0;
let passedTests = 0;
const failures = [];
const warnings = [];
const sections = [];

function section(title) {
  sections.push(title);
  console.log(`\n${colors.cyan}${colors.bold}── ${title}${colors.reset}`);
}

function test(name, fn) {
  totalTests += 1;
  try {
    fn();
    passedTests += 1;
    console.log(`  ${colors.green}✓${colors.reset} ${name}`);
  } catch (err) {
    failures.push({ section: sections[sections.length - 1], name, message: err.message, stack: err.stack });
    console.log(`  ${colors.red}✗${colors.reset} ${name}`);
    console.log(`    ${colors.red}${err.message}${colors.reset}`);
  }
}

function warn(message, context = {}) {
  warnings.push({ message, context, section: sections[sections.length - 1] });
  const ctx = Object.keys(context).length > 0 ? ' ' + colors.dim + JSON.stringify(context) + colors.reset : '';
  console.log(`  ${colors.yellow}⚠${colors.reset} ${message}${ctx}`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'assertion failed');
  }
}

function info(message) {
  console.log(`  ${colors.dim}ℹ${colors.reset} ${colors.dim}${message}${colors.reset}`);
}

function header(title) {
  console.log(`\n${colors.cyan}${colors.bold}${title}${colors.reset}`);
  console.log(`${colors.cyan}${'═'.repeat(Math.min(72, Math.max(40, title.length)))}${colors.reset}`);
}

function summary() {
  const failedCount = failures.length;
  const warningCount = warnings.length;
  const okIcon = failedCount === 0 ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;

  console.log(`\n${colors.cyan}${'═'.repeat(60)}${colors.reset}`);
  console.log(`${colors.bold}Résumé${colors.reset}`);
  console.log(`  Total tests   : ${totalTests}`);
  console.log(`  ${colors.green}Passés${colors.reset}        : ${passedTests}`);
  console.log(`  ${failedCount === 0 ? colors.green : colors.red}Échecs${colors.reset}        : ${failedCount}`);
  console.log(`  ${warningCount === 0 ? colors.green : colors.yellow}Avertissements${colors.reset}: ${warningCount}`);
  console.log(`${colors.cyan}${'═'.repeat(60)}${colors.reset}`);

  if (failedCount > 0) {
    console.log(`\n${colors.red}${colors.bold}Échecs détaillés :${colors.reset}`);
    for (const f of failures) {
      console.log(`\n  ${colors.red}✗ [${f.section || 'global'}] ${f.name}${colors.reset}`);
      console.log(`    ${f.message}`);
    }
  }

  if (warningCount > 0 && process.env.VERBOSE_WARNINGS === '1') {
    console.log(`\n${colors.yellow}${colors.bold}Avertissements détaillés :${colors.reset}`);
    for (const w of warnings) {
      console.log(`  ${colors.yellow}⚠ [${w.section || 'global'}] ${w.message}${colors.reset}`);
    }
  } else if (warningCount > 0) {
    console.log(`\n  ${colors.dim}(${warningCount} avertissement(s) — relancez avec VERBOSE_WARNINGS=1 pour le détail)${colors.reset}`);
  }

  console.log(`\n${okIcon} ${failedCount === 0 ? colors.green + 'Tous les tests bloquants ont passé' : colors.red + failedCount + ' test(s) en échec'}${colors.reset}\n`);

  process.exit(failedCount === 0 ? 0 : 1);
}

module.exports = {
  colors,
  section,
  test,
  warn,
  assert,
  info,
  header,
  summary,
  // Read-only inspectors used by aggregator scripts (run-all.js)
  getStats() {
    return {
      total: totalTests,
      passed: passedTests,
      failed: failures.length,
      warned: warnings.length,
      failures: failures.slice(),
      warnings: warnings.slice(),
    };
  },
  reset() {
    totalTests = 0;
    passedTests = 0;
    failures.length = 0;
    warnings.length = 0;
    sections.length = 0;
  },
};
