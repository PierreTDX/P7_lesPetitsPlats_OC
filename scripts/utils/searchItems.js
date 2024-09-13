export function searchItems() {
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

    // Fonction pour gérer la sélection d'un élément
    function handleItemClick(event) {
        const item = event.target;
        if (item.classList.contains('list')) {
            const searchInput = item.closest('.zoneMenu').querySelector('.searchSelect');
            searchInput.value = ''; // Vider le champ de recherche
            handleSearchInput({ target: searchInput }); // Réinitialiser l'affichage de la liste
        }
    }

    // Fonction pour gérer le clic sur la croix
    function handleClearClick(event) {
        const clearButton = event.target;
        if (clearButton.classList.contains('miniCross')) {
            const searchInput = clearButton.closest('.zoneMenu').querySelector('.searchSelect');
            searchInput.value = ''; // Vider le champ de recherche
            handleSearchInput({ target: searchInput }); // Réinitialiser l'affichage de la liste
        }
    }

    // Fonction pour empêcher le comportement par défaut de la touche "Enter"
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Empêcher le comportement par défaut
        }
    }

    // Sélectionner les champs de recherche
    const searchInputs = document.querySelectorAll('.searchSelect');

    // Ajouter des écouteurs d'événements pour chaque champ de recherche
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearchInput);
        input.addEventListener('keydown', handleKeyDown); // Ajouter l'écouteur d'événement pour "keydown"
    });

    // Sélectionner les éléments de la liste et ajouter des écouteurs d'événements pour chaque élément
    const listZones = document.querySelectorAll('.zoneList');
    listZones.forEach(listZone => {
        listZone.addEventListener('click', handleItemClick);
    });

    // Sélectionner les boutons de croix et ajouter des écouteurs d'événements pour chaque bouton
    const clearButtons = document.querySelectorAll('.miniCross');
    clearButtons.forEach(button => {
        button.addEventListener('click', handleClearClick);
    });
}






