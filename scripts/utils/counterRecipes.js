export function counterRecipes() {
    let recipeCount = 0;

    const updateCount = () => {
        // Sélectionne tous les éléments <article>
        const articles = document.querySelectorAll('section.zoneCartes article');
        console.log('Articles trouvés :', articles); // Vérifie les articles trouvés

        // Compte le nombre d'articles
        recipeCount = articles.length; // Stocke le nombre d'articles

        // Sélectionne l'élément span où le texte doit être mis à jour
        const textSpan = document.querySelector('span.text');

        // Vérifie si l'élément span existe avant de mettre à jour son contenu
        if (textSpan) {
            // Met à jour le texte en fonction du nombre d'articles
            if (recipeCount === 0) {
                textSpan.textContent = '0 recette';
            } else if (recipeCount === 1) {
                textSpan.textContent = '1 recette';
            } else {
                textSpan.textContent = `${recipeCount} recettes`;
            }
        } else {
            console.error('L\'élément <span> avec la classe "text" est introuvable.');
        }
        updateNoResultMessage();
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

    // fonction pour afficher un texte si pas de recettes trouvées
    function updateNoResultMessage() {
        const noResultElement = document.querySelector('.noResult');
        const searchInput = document.querySelector('#mainsearch');

        if (noResultElement && searchInput) {
            const searchValue = searchInput.value.trim(); // Assure-toi d'enlever les espaces inutiles

            if (recipeCount === 0 && searchValue) {
                noResultElement.classList.add('visible');
                noResultElement.innerHTML = `Aucune recette ne contient «${searchValue}», vous pouvez chercher «tarte aux pommes», «poisson», etc.`;
            } else {
                noResultElement.classList.remove('visible');
            }
        } else {
            console.error('L\'élément <p> avec la classe "noResult" ou l\'élément <input> avec l\'id "mainsearch" est introuvable.');
        }
    }

    // Écoute les changements dans le champ de recherche
    const searchInput = document.querySelector('#mainsearch');
    if (searchInput) {
        searchInput.addEventListener('input', updateNoResultMessage);
    } else {
        console.error('L\'élément <input> avec l\'id "mainsearch" est introuvable.');
    }
}
