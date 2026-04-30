/**
 * Extracts elements that the GLOSSAIRE.md classifies as "Sanctuaire Absolu"
 * (must never be translated nor altered).
 *
 * Each extractor returns a Set so callers can compare across the original and
 * translated versions of the same file with simple set arithmetic.
 */

// Variables :
//  - {single} placeholders   (system variables like {user_name}, {project-root})
//  - {{double}} placeholders (template variables like {{module}}, {{date}})
//  - excludes pure-numeric content like {1} (which is not a system variable)
//
// Both regexes tolerate optional whitespace around the inner identifier, since
// upstream files occasionally contain Mustache-style placeholders with spaces
// (e.g. "{ { current_date } }" — Mustache treats this identically to
// "{{current_date}}"). We normalize by trimming the captured identifier so the
// set comparison ignores cosmetic whitespace differences.
//
// The double-curly pattern allows up to a few space-separated identifiers
// (Handlebars helpers like "{{#each items}}" or descriptive placeholders like
// "{{discovered domain requirements}}") but stops at any character that isn't
// part of an identifier, so long natural-language placeholders such as
// "{{list each critical issue with clear, actionable description}}" — which
// contain commas, colons or other punctuation — are NOT captured. Those are
// not variables in the framework sense ; they are textual prompts the LLM is
// expected to expand and translating them is fine.
const SINGLE_VAR_RE = /\{\s*([a-zA-Z_][a-zA-Z0-9_-]*)\s*\}/g;
// Allow at most 3 space-separated identifiers : a plain variable, a Handlebars
// helper like "{{#each items}}", or a short multi-word placeholder like
// "{{discovered domain requirements}}". Beyond 3 words it's a natural-language
// descriptive prompt (e.g. "{{list each critical issue with clear actionable
// description}}") that the LLM is expected to interpret and so we don't treat
// it as a system variable that must be preserved verbatim.
const DOUBLE_VAR_RE = /\{\s*\{\s*([#/]?[a-zA-Z_][\w-]*(?:\s+[a-zA-Z_][\w-]*){0,2})\s*\}\s*\}/g;

// XML tags. We collect the *tag name* only, not its attributes, since attribute values
// contain prose (description="...") that legitimately differs across languages.
const XML_OPEN_TAG_RE = /<([a-zA-Z][a-zA-Z0-9_-]*)\b/g;

// Single-letter trigger codes from GLOSSAIRE §1 (Codes de menu) plus a few extra
// observed in the source tree. Keeping them as a hard-coded list because they are
// part of the protected vocabulary, not derived from the file content.
const PROTECTED_TRIGGER_CODES = new Set([
  'BP', 'RS', 'CB', 'CP', 'VP', 'EP', 'CE', 'IR', 'CC', 'CA',
  'SP', 'CS', 'DS', 'CR', 'QA', 'CU', 'DP', 'WD', 'US', 'MG', 'ER',
  'BSP', 'BH', 'ID', 'SD', 'AR', 'ECH', 'DG', 'PM', 'QS', 'QD',
]);

// Agent display names from GLOSSAIRE §1 (Identifiants & Noms d'Agents).
// Note: "Amelia" was deliberately francised to "Amélie" by the project owner — both
// are accepted by tests. See language-fr/02-agent-names-intact.js.
const PROTECTED_AGENT_NAMES = new Set([
  'Mary', 'Winston', 'John', 'Bob', 'Sally', 'Paige', 'Barry',
]);
const TOLERATED_AGENT_FRANCISATIONS = new Map([
  ['Amelia', 'Amélie'],
]);

/**
 * @param {string} text
 * @returns {Set<string>} unique single-curly variable names like "{user_name}"
 *
 * Trims the captured identifier so that `{ user_name }` and `{user_name}`
 * normalize to the same set member — they are semantically equivalent.
 */
function extractSingleVariables(text) {
  const out = new Set();
  let m;
  SINGLE_VAR_RE.lastIndex = 0;
  while ((m = SINGLE_VAR_RE.exec(text)) !== null) {
    out.add(`{${m[1].trim()}}`);
  }
  return out;
}

/**
 * @param {string} text
 * @returns {Set<string>} unique double-curly placeholders like "{{module}}" or "{{#if foo}}"
 *
 * Trims the captured identifier so that `{{ current_date }}` and
 * `{{current_date}}` normalize to the same set member.
 */
function extractDoubleVariables(text) {
  const out = new Set();
  let m;
  DOUBLE_VAR_RE.lastIndex = 0;
  while ((m = DOUBLE_VAR_RE.exec(text)) !== null) {
    out.add(`{{${m[1].trim()}}}`);
  }
  return out;
}

/**
 * @param {string} text
 * @returns {Set<string>} unique XML tag names that appear as **real** opening tags.
 *   To distinguish a real tag from Markdown-style placeholders such as
 *   `[Source: docs/<file>.md#Section]`, we require the tag to also have a
 *   matching closing tag (`</name>`) somewhere in the file. BMAD tags
 *   (`<step>`, `<action>`, `<rules>`, etc.) always come paired ; placeholders
 *   like `<file>`, `<filename>` typically don't.
 */
function extractXmlTagNames(text) {
  const out = new Set();
  let m;
  XML_OPEN_TAG_RE.lastIndex = 0;
  const candidates = new Set();
  while ((m = XML_OPEN_TAG_RE.exec(text)) !== null) {
    candidates.add(m[1]);
  }
  for (const tag of candidates) {
    if (new RegExp(`</${tag}>`).test(text)) out.add(tag);
  }
  return out;
}

/**
 * @param {string} text
 * @returns {Set<string>} trigger codes from PROTECTED_TRIGGER_CODES that appear in
 *   a TRIGGER context — ie. one of these patterns :
 *     - "[CODE]"                         (description prefix, e.g. "[BP] ...")
 *     - "CODE or fuzzy match on ..."     (compound trigger spec)
 *     - "trigger: CODE"                  (YAML menu entry)
 *   Plain-text occurrences such as "QA tools" or "P&ID" do NOT count.
 *   This avoids false positives on short uppercase acronyms shared with
 *   common technical vocabulary.
 */
function extractTriggerCodesPresent(text) {
  const out = new Set();
  for (const code of PROTECTED_TRIGGER_CODES) {
    const re = new RegExp(
      `\\[${code}\\]|\\b${code}\\s+or\\s+fuzzy\\s+match\\s+on\\b|trigger:\\s*${code}\\b`,
      'g',
    );
    if (re.test(text)) out.add(code);
  }
  return out;
}

/**
 * @param {string} text
 * @returns {Object} occurrences of agent names in the text. Each entry maps name→count.
 */
function extractAgentNames(text) {
  const counts = {};
  for (const name of PROTECTED_AGENT_NAMES) {
    const re = new RegExp(`\\b${name}\\b`, 'g');
    const matches = text.match(re);
    if (matches) counts[name] = matches.length;
  }
  // Track tolerated francisations as well (we report them, callers decide what to do)
  for (const [original, francised] of TOLERATED_AGENT_FRANCISATIONS) {
    const reOriginal = new RegExp(`\\b${original}\\b`, 'g');
    const reFrancised = new RegExp(`\\b${francised}\\b`, 'g');
    const c1 = (text.match(reOriginal) || []).length;
    const c2 = (text.match(reFrancised) || []).length;
    if (c1 > 0) counts[original] = c1;
    if (c2 > 0) counts[francised] = c2;
  }
  return counts;
}

module.exports = {
  extractSingleVariables,
  extractDoubleVariables,
  extractXmlTagNames,
  extractTriggerCodesPresent,
  extractAgentNames,
  PROTECTED_TRIGGER_CODES,
  PROTECTED_AGENT_NAMES,
  TOLERATED_AGENT_FRANCISATIONS,
};
