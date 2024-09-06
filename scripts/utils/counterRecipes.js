export function counterRecipes() {
    document.addEventListener('DOMContentLoaded', () => {
        // Sélectionne tous les éléments <article>
        const articles = document.querySelectorAll('section.zoneCartes article');

        // Compte le nombre d'articles
        const count = articles.length;

        // Sélectionne l'élément span où le texte doit être mis à jour
        const textSpan = document.querySelector('span.text');

        // Met à jour le texte en fonction du nombre d'articles
        if (count === 0) {
            textSpan.textContent = '0 recette';
        } else if (count === 1) {
            textSpan.textContent = '1 recette';
        } else {
            textSpan.textContent = `${count} recettes`;
        }
    });
}