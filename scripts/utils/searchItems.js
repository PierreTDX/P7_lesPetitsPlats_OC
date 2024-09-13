export function searchItems() {
    function handleSearchInput(event) {
        const searchInput = event.target;
        const searchValue = searchInput.value.toLowerCase();
        const listZone = searchInput.closest('.zoneMenu').querySelector('.zoneList');
        
        if (listZone) {
            const items = listZone.querySelectorAll('.list');
            items.forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(searchValue) ? '' : 'none';
            });

            // Appeler la fonction pour gérer l'affichage de la croix
            toggleClearButtonVisibility(searchInput);
        }
    }

    function toggleClearButtonVisibility(searchInput) {
        const clearButton = searchInput.closest('.zoneMenu').querySelector('.miniCross');
        if (clearButton) {
            clearButton.classList.toggle('visible', searchInput.value.length > 0);
        }
    }

    function handleItemClick(event) {
        const item = event.target;
        if (item.classList.contains('list')) {
            // Sélectionner tous les champs de recherche dans les menus
            document.querySelectorAll('.searchSelect').forEach(searchInput => {
                searchInput.value = ''; // Vider le champ de recherche
                handleSearchInput({ target: searchInput }); // Réinitialiser l'affichage de la liste
            });
        }
    }

    function handleClearClick(event) {
        const clearButton = event.target;
        if (clearButton.classList.contains('miniCross')) {
            const searchInput = clearButton.closest('.zoneMenu').querySelector('.searchSelect');
            if (searchInput) {
                searchInput.value = ''; // Vider le champ de recherche
                handleSearchInput({ target: searchInput }); // Réinitialiser l'affichage de la liste
            }
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Empêcher le comportement par défaut
        }
    }

    function handleClickOutside(event) {
        // Si le clic est en dehors de la zoneMenu et de l'input de recherche, vider l'input
        const searchInputs = document.querySelectorAll('.searchSelect');
        searchInputs.forEach(input => {
            const zoneMenu = input.closest('.zoneMenu');
            if (!zoneMenu.contains(event.target) && input.value.trim() !== '') {
                input.value = ''; // Vider le champ de recherche
                handleSearchInput({ target: input }); // Réinitialiser l'affichage de la liste
            }
        });
    }

    // Ajouter un écouteur global pour les clics en dehors des menus
    document.addEventListener('click', handleClickOutside);

    // Sélectionner les champs de recherche et ajouter des écouteurs d'événements
    document.querySelectorAll('.searchSelect').forEach(input => {
        input.addEventListener('input', handleSearchInput);
        input.addEventListener('keydown', handleKeyDown);
    });

    // Sélectionner les éléments de la liste et ajouter des écouteurs d'événements
    document.querySelectorAll('.zoneList').forEach(listZone => {
        listZone.addEventListener('click', handleItemClick);
    });

    // Sélectionner les boutons de croix et ajouter des écouteurs d'événements
    document.querySelectorAll('.miniCross').forEach(button => {
        button.addEventListener('click', handleClearClick);
    });
}

// nouvelle ligne pour recharger le fichier