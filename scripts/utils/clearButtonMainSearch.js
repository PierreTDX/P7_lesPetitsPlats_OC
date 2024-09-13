export function clearButtonMainSearch() {
    const searchInput = document.getElementById('mainsearch');
    const crossIcon = document.querySelector('.formSearch img');

    // Fonction pour mettre à jour la visibilité de la croix
    function updateCrossVisibility() {
        if (searchInput.value.length > 0) {
            crossIcon.classList.add('visible'); // Affiche la croix
        } else {
            crossIcon.classList.remove('visible'); // Cache la croix
        }
    }

    // Initialisation - Cache la croix par défaut
    crossIcon.classList.remove('visible');

    // Ajout d'un écouteur sur le champ de recherche pour afficher/masquer la croix
    searchInput.addEventListener('input', updateCrossVisibility);

    // Ajout d'un écouteur sur la croix pour réinitialiser le champ de recherche
    crossIcon.addEventListener('click', () => {
        searchInput.value = ""; // Réinitialise le champ
        updateCrossVisibility(); // Met à jour la visibilité de la croix
        searchInput.focus(); // Remet le focus sur le champ de recherche

        // Déclenche la recherche avec le champ vide
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
    });
}