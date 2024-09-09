export function counterRecipes() {
    const updateCount = () => {
        // Sélectionne tous les éléments <article>
        const articles = document.querySelectorAll('section.zoneCartes article');
        console.log('Articles trouvés :', articles); // Vérifie les articles trouvés

        // Compte le nombre d'articles
        const count = articles.length;

        // Sélectionne l'élément span où le texte doit être mis à jour
        const textSpan = document.querySelector('span.text');

        // Vérifie si l'élément span existe avant de mettre à jour son contenu
        if (textSpan) {
            // Met à jour le texte en fonction du nombre d'articles
            if (count === 0) {
                textSpan.textContent = '0 recette';
            } else if (count === 1) {
                textSpan.textContent = '1 recette';
            } else {
                textSpan.textContent = `${count} recettes`;
            }
        } else {
            console.error('L\'élément <span> avec la classe "text" est introuvable.');
        }
    };

    // Met à jour le compteur immédiatement
    updateCount();

    // Utilise MutationObserver pour surveiller les changements dans la zone des articles
    const observer = new MutationObserver(updateCount);
    const targetNode = document.querySelector('section.zoneCartes');

    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    } else {
        console.error('L\'élément <section> avec la classe "zoneCartes" est introuvable.');
    }
}
