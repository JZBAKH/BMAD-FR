const fs = require('node:fs');
const path = require('node:path');

function convertXmlToMarkdown(xmlFilePath) {
  if (!xmlFilePath.endsWith('.xml')) {
    throw new Error('Le fichier d\'entrée doit être un fichier XML');
  }

  const xmlContent = fs.readFileSync(xmlFilePath, 'utf8');

  const basename = path.basename(xmlFilePath, '.xml');
  const dirname = path.dirname(xmlFilePath);
  const mdFilePath = path.join(dirname, `${basename}.md`);

  // Extract version and name/title from root element attributes
  let title = basename;
  let version = '';

  // Match the root element and its attributes
  const rootMatch = xmlContent.match(
    /<[^>\s]+[^>]*?\sv="([^"]+)"[^>]*?(?:\sname="([^"]+)")?|<[^>\s]+[^>]*?(?:\sname="([^"]+)")?[^>]*?\sv="([^"]+)"/,
  );

  if (rootMatch) {
    // Handle both v="x" name="y" and name="y" v="x" orders
    version = rootMatch[1] || rootMatch[4] || '';
    const nameAttr = rootMatch[2] || rootMatch[3] || '';

    if (nameAttr) {
      title = nameAttr;
    } else {
      // Try to find name in a <name> element if not in attributes
      const nameElementMatch = xmlContent.match(/<name>([^<]+)<\/name>/);
      if (nameElementMatch) {
        title = nameElementMatch[1];
      }
    }
  }

  const heading = version ? `# ${title} v${version}` : `# ${title}`;

  const markdownContent = `${heading}

\`\`\`xml
${xmlContent}
\`\`\`
`;

  fs.writeFileSync(mdFilePath, markdownContent, 'utf8');

  return mdFilePath;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Utilisation : node xml-to-markdown.js <chemin-fichier-xml>');
    process.exit(1);
  }

  const xmlFilePath = path.resolve(args[0]);

  if (!fs.existsSync(xmlFilePath)) {
    console.error(`Erreur : Fichier introuvable : ${xmlFilePath}`);
    process.exit(1);
  }

  try {
    const mdFilePath = convertXmlToMarkdown(xmlFilePath);
    console.log(`Conversion réussie : ${xmlFilePath} -> ${mdFilePath}`);
  } catch (error) {
    console.error(`Erreur lors de la conversion du fichier : ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { convertXmlToMarkdown };
