export function openMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        // Sélectionner tous les éléments avec la classe 'titleSelect'
        const titleSelects = document.querySelectorAll('.titleSelect');
        let currentOpenMenu = null; // Variable pour suivre le menu actuellement ouvert
        let isSelectingItem = false; // Flag pour indiquer si une sélection est en cours

        function closeMenu(menuContainer) {
            if (!menuContainer) return;

            const zoneMenu = menuContainer.querySelector('.zoneMenu');
            const chevron = menuContainer.querySelector('.chevron');

            // Fermer le menu en enlevant les classes CSS
            menuContainer.classList.remove('menuOpen');
            menuContainer.classList.add('menuClose');

            if (chevron) {
                chevron.classList.remove('rotateOpen');
                chevron.classList.add('rotateClose');
            }

            if (zoneMenu) {
                zoneMenu.style.display = 'none';
            }
        }

        titleSelects.forEach((titleSelect) => {
            const zoneMenu = titleSelect.nextElementSibling; // Menu associé à l'élément titleSelect
            const chevron = titleSelect.querySelector('.chevron');
            const menuContainer = titleSelect.closest('.menuClose'); // Conteneur du menu

            // Gestionnaire d'événement pour le clic sur titleSelect
            titleSelect.addEventListener('click', (event) => {
                event.stopPropagation(); // Empêcher la propagation de l'événement de clic

                const isMenuOpen = menuContainer.classList.contains('menuOpen');

                // Fermer le menu actuellement ouvert, si différent
                if (currentOpenMenu && currentOpenMenu !== menuContainer) {
                    closeMenu(currentOpenMenu);
                }

                // Ouvrir ou fermer le menu cliqué
                if (isMenuOpen) {
                    closeMenu(menuContainer);
                    currentOpenMenu = null;
                } else {
                    menuContainer.classList.remove('menuClose');
                    menuContainer.classList.add('menuOpen');

                    if (chevron) {
                        chevron.classList.remove('rotateClose');
                        chevron.classList.add('rotateOpen');
                    }

                    if (zoneMenu) {
                        zoneMenu.style.display = 'block';
                    }

                    currentOpenMenu = menuContainer;
                }
            });

            // Flag pour indiquer qu'une sélection est en cours
            zoneMenu.addEventListener('click', (event) => {
                event.stopPropagation(); // Empêcher la propagation de l'événement de clic
                isSelectingItem = true;
            });
        });

        // Gestionnaire d'événement pour le clic en dehors du menu
        document.addEventListener('click', (event) => {
            if (currentOpenMenu) {
                const isClickInside = currentOpenMenu.contains(event.target) || Array.from(titleSelects).some(titleSelect => titleSelect.contains(event.target));
                if (!isClickInside) {
                    closeMenu(currentOpenMenu);
                    currentOpenMenu = null;
                }
            }
        });

        // Réinitialiser le flag immédiatement après la gestion du clic
        document.addEventListener('click', () => {
            if (isSelectingItem) {
                isSelectingItem = false;
            }
        });
    });
}




/* version d'orignie : peut ouvrir les 3 menus et les refermer individuellement seulement
(ne se ferme pas si je clique en dehors du menu)

document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner tous les éléments avec la classe 'titleSelect'
    const titleSelects = document.querySelectorAll('.titleSelect');

    titleSelects.forEach((titleSelect) => {
        const zoneMenu = titleSelect.nextElementSibling; // Sélectionne le prochain élément frère (le menu)
        const chevron = titleSelect.querySelector('.chevron');
        const menuContainer = titleSelect.closest('.menuClose');

        // Gestionnaire d'événement pour le clic
        titleSelect.addEventListener('click', () => {
            const isMenuOpen = zoneMenu.style.display === 'block';

            // Utiliser toggle pour changer les classes
            chevron.classList.toggle('rotateOpen', !isMenuOpen);
            chevron.classList.toggle('rotateClose', isMenuOpen);
            menuContainer.classList.toggle('menuOpen', !isMenuOpen);
            menuContainer.classList.toggle('menuClose', isMenuOpen);

            // Utiliser toggle pour afficher ou masquer le menu
            zoneMenu.style.display = isMenuOpen ? 'none' : 'block';
        });
    });
});

*/