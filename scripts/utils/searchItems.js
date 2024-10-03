import { removeAccents } from "./removeAccents.js";

export function searchItems() {
    // Filtre les éléments de la liste en fonction de la valeur saisie.
    function handleSearchInput(event) {
        const searchInput = event.target;
        const searchValue = removeAccents(searchInput.value.toLowerCase()); // Utilisation de removeAccents ici
        const listZone = searchInput.closest('.zoneMenu').querySelector('.zoneList');
        
        if (listZone) {
            const items = listZone.querySelectorAll('.list');
            items.forEach(item => {
                // Utiliser removeAccents pour comparer le texte sans accents
                const itemText = removeAccents(item.textContent.toLowerCase());
                item.style.display = itemText.includes(searchValue) ? '' : 'none';
            });

            // Appeler la fonction pour gérer l'affichage de la croix
            toggleClearButtonVisibility(searchInput);
        }
    }
    // Affiche ou cache le bouton de croix de suppression en fonction de la présence d'une valeur dans le champ de recherche.
    function toggleClearButtonVisibility(searchInput) {
        const clearButton = searchInput.closest('.zoneMenu').querySelector('.miniCross');
        if (clearButton) {
            clearButton.classList.toggle('visible', searchInput.value.length > 0);
        }
    }

    // Réinitialise les champs de recherche de tous les menus lors de la sélection d'un élément.
    function handleItemClick(event) {
        const item = event.target;
        if (item.classList.contains('list')) {
            // Sélectionner tous les champs de recherche dans les menus
            document.querySelectorAll('.searchSelect').forEach(searchInput => {
                searchInput.value = ''; // Vider les champs de recherche
                handleSearchInput({ target: searchInput }); // Réinitialiser l'affichage de la liste
            });
        }
    }

    // Vide le champ de recherche associé et réinitialise l'affichage de la liste
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

    // Empêche l'action par défaut lors de l'appui sur la touche 'Enter' dans les champs de recherche
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Empêcher le comportement par défaut
        }
    }

    // Vide les champs de recherche si le clic se produit en dehors de la zone du menu.
    function handleClickOutside(event) {
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