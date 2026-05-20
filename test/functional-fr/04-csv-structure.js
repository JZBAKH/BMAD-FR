/**
 * Lot 1 - Test 04 : structure des fichiers .csv -fr.
 *
 * Pour chaque CSV, vérifie :
 *   - le fichier parse (chaque ligne a le même nombre de champs cités que l'en-tête)
 *   - le nombre de lignes correspond à l'original upstream (pas de ligne perdue/ajoutée
 *     par la traduction)
 *
 * Le test ne valide pas le contenu sémantique, juste l'intégrité structurelle.
 */

const fs = require('node:fs');
const path = require('node:path');
const runner = require('../fr-helpers/runner');
const { walk } = require('../fr-helpers/walk');
const { pairFrToOriginal } = require('../fr-helpers/pair-with-original');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FR_ROOTS = ['src/bmm-skills-fr', 'src/core-skills-fr'];

/**
 * Minimal CSV parser that handles double-quoted fields and embedded commas.
 * Returns an array of rows, each row being an array of fields.
 */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      switch (ch) {
        case '"': {
          inQuotes = true;

          break;
        }
        case ',': {
          row.push(field);
          field = '';

          break;
        }
        case '\n': {
          row.push(field);
          rows.push(row);
          row = [];
          field = '';

          break;
        }
        case '\r': {
          // ignore (CRLF handled by '\n')

          break;
        }
        default: {
          field += ch;
        }
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function run() {
  runner.section('04 — Structure des CSV -fr');

  const csvFiles = [];
  for (const root of FR_ROOTS) {
    const fullRoot = path.join(REPO_ROOT, root);
    if (!fs.existsSync(fullRoot)) continue;
    csvFiles.push(...walk(fullRoot, { extensions: ['.csv'], base: REPO_ROOT }));
  }

  if (csvFiles.length === 0) {
    runner.warn('Aucun CSV trouvé sous src/*-fr/');
    return;
  }

  for (const relPath of csvFiles) {
    const original = pairFrToOriginal(relPath);
    const enExists = original && fs.existsSync(path.join(REPO_ROOT, original));

    // Strategy : when an upstream pair exists, we compare *structure* row by
    // row instead of forcing every line to match the header column count. This
    // is because some upstream CSVs have legitimate trailing-comma quirks
    // (e.g. core/module-help.csv has 14 fields on data rows vs 13 in header).
    // Our duty is to preserve that structure, not to enforce something stricter.
    if (enExists) {
      runner.test(`${relPath} : structure de chaque ligne cohérente`, () => {
        const frRows = parseCsv(fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8'));
        const enRows = parseCsv(fs.readFileSync(path.join(REPO_ROOT, original), 'utf8'));
        runner.assert(frRows.length === enRows.length, `${frRows.length} ligne(s) côté FR vs ${enRows.length} côté original`);
        const headerCount = enRows[0].length;
        for (const [i, frRow] of frRows.entries()) {
          const frLen = frRow.length;
          const enLen = enRows[i].length;
          if (frLen === enLen) continue;

          // Tolerance : the upstream sometimes has CSV rows with more fields
          // than the header (unquoted commas in cells like "Next.js, Vite, Remix").
          // The FR translation legitimately "fixes" this by using a different
          // separator (e.g. ";"). We accept that case as long as the FR row
          // matches the header column count exactly.
          if (enLen > headerCount && frLen === headerCount) {
            runner.warn(
              `${relPath} ligne ${i + 1} : FR=${frLen} champs (= header), EN=${enLen} (>header). Le FR a corrigé une structure malformée upstream.`,
            );
            continue;
          }

          throw new Error(`ligne ${i + 1} : ${frLen} champs côté FR vs ${enLen} côté original (header attend ${headerCount})`);
        }
      });
    } else {
      // No upstream pair: fall back to the strict "all rows = header count" check.
      runner.test(`${relPath} parse correctement`, () => {
        const content = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
        const rows = parseCsv(content);
        runner.assert(rows.length > 0, 'CSV vide');

        const headerCount = rows[0].length;
        runner.assert(headerCount > 0, 'en-tête CSV vide');

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length === 1 && row[0].trim() === '' && i === rows.length - 1) continue;
          if (row.length !== headerCount) {
            throw new Error(`ligne ${i + 1} : ${row.length} champs au lieu de ${headerCount}`);
          }
        }
      });
    }
  }
}

if (require.main === module) {
  runner.header('Lot 1 / 04 — Structure CSV');
  run();
  runner.summary();
}

module.exports = { run };
