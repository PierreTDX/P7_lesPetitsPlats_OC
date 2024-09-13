export function filterItems() {
    // Fonction pour gérer la recherche
    function handleSearchInput(event) {
        const searchInput = event.target;
        const searchValue = searchInput.value.toLowerCase();
        const listZone = searchInput.closest('.zoneMenu').querySelector('.zoneList');
        const items = listZone.querySelectorAll('.list');

        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(searchValue)) {
                item.style.display = ''; // Afficher l'élément
            } else {
                item.style.display = 'none'; // Masquer l'élément
            }
        });
    }

    // Sélectionner les champs de recherche
    const searchInputs = document.querySelectorAll('.searchSelect');

    // Ajouter des écouteurs d'événements pour chaque champ de recherche
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearchInput);
    });
}
