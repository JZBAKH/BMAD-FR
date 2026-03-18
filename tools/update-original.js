const { execSync } = require('child_process');

function runCommand(command, ignoreError = false) {
    console.log(`\n➡️ Exécution : ${command}`);
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        if (!ignoreError) {
            console.error(`\n❌ Échec lors de la commande : ${command}`);
            process.exit(1);
        } else {
            console.log(`\n⚠️ Conflit, passage au nettoyage...`);
        }
    }
}

console.log("🚀 Lancement de la mise à jour depuis le miroir (main)...");

// 1. Récupérer le travail sur le miroir
runCommand('git fetch origin');

// 2. Lancer la fusion dans la branche actuelle sans valider
runCommand('git merge origin/main --no-commit', true);

// 3. Supprimer les fichiers inutiles pour le fork
console.log("\n🧹 Nettoyage des fichiers pour la version FR...");
runCommand('git rm --ignore-unmatch README_CN.md');

runCommand('git rm --ignore-unmatch tools/validate-svg-changes.sh');

runCommand('git rm --ignore-unmatch .github/workflows/quality.yaml');
runCommand('git rm --ignore-unmatch .github/workflows/coderabbit-review.yaml');
runCommand('git rm --ignore-unmatch .github/workflows/discord.yaml');
runCommand('git rm --ignore-unmatch .github/workflows/docs.yaml');
runCommand('git rm --ignore-unmatch .github/workflows/publish.yaml');

// 4. Valider définitivement la mise à jour
runCommand('git commit -m "chore: mise à jour auto depuis le miroir et nettoyage"', true);

console.log("\n✅ Mise à jour terminée avec succès.");