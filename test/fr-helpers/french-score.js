/**
 * Heuristic to estimate how "French" a text is.
 * Combines two signals :
 *   1. Density of accented characters (é è à ç …)
 *   2. Ratio of common French words vs common English words
 *
 * Designed for files that contain real prose. Pure config files (CSV of patterns,
 * YAML of keys) will score low even when correct — those files must be excluded
 * via the test/fr-helpers/translation-exceptions.json whitelist rather than
 * forcing them through this heuristic.
 */

const FR_ACCENT_RE = /[éèêëàâäîïôöùûüçœÉÈÊËÀÂÄÎÏÔÖÙÛÜÇŒ]/g;
const FR_WORD_RE =
  /\b(le|la|les|des|du|de|un|une|et|ou|dans|pour|avec|est|sont|être|avoir|vous|nous|ce|cette|ces|qui|que|dont|si|car|mais|aussi|plus|tous|toute|votre|notre|sur|sous|chaque|cas|donc|alors|peut|doit|comme|leur|leurs|aux|au|en|par|son|sa|ses|mon|ma|mes|ton|ta|tes|ne|pas|non|oui)\b/gi;
const EN_WORD_RE =
  /\b(the|of|and|to|with|is|are|you|this|that|for|from|on|in|by|will|have|has|been|but|not|or|if|as|at|be|can|should|must|when|where|each|step|next|then|do|does|did|all|some|any|no|yes|because|so|either|while|until|after|before|during)\b/gi;

const FRENCH_THRESHOLD = 0.05; // tuned on observed translated files

/**
 * @param {string} text
 * @returns {Object} { score, accents, frWords, enWords, chars, frRatio, accentRatio, decision }
 */
function scoreFrenchness(text) {
  const chars = text.length;
  const accents = (text.match(FR_ACCENT_RE) || []).length;
  const frWords = (text.match(FR_WORD_RE) || []).length;
  const enWords = (text.match(EN_WORD_RE) || []).length;

  const total = frWords + enWords;
  const accentRatio = chars > 0 ? accents / chars : 0;
  const frRatio = total === 0 ? 0 : frWords / total;
  const score = accentRatio * 5 + frRatio * 0.5;

  const decision = score >= FRENCH_THRESHOLD ? 'french' : 'low-french';

  return {
    score: Number(score.toFixed(4)),
    accents,
    frWords,
    enWords,
    chars,
    frRatio: Number(frRatio.toFixed(3)),
    accentRatio: Number(accentRatio.toFixed(4)),
    decision,
  };
}

/**
 * @param {string} text
 * @returns {boolean} true when text has too little human prose to be reliably scored.
 */
function isTooShortToScore(text) {
  if (!text || text.length < 50) return true;
  // Strip frontmatter, code blocks, and yaml-key-only lines, then check leftover length
  let stripped = text;
  stripped = stripped.replace(/^---[\s\S]*?---/m, '');
  stripped = stripped.replaceAll(/```[\s\S]*?```/g, '');
  stripped = stripped.replaceAll(/^[a-zA-Z_][\w-]*:\s*$/gm, ''); // pure YAML keys
  return stripped.trim().length < 50;
}

module.exports = { scoreFrenchness, isTooShortToScore, FRENCH_THRESHOLD };
