export function openMenu () {
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner tous les éléments avec la classe 'titleSelect'
    const titleSelects = document.querySelectorAll('.titleSelect');

    // Variable pour suivre le menu actuellement ouvert
    let currentOpenMenu = null;

    titleSelects.forEach((titleSelect) => {
        const zoneMenu = titleSelect.nextElementSibling; // Sélectionne le prochain élément frère (le menu)
        const chevron = titleSelect.querySelector('.chevron');
        const menuContainer = titleSelect.closest('.menuClose');

        // Gestionnaire d'événement pour le clic
        titleSelect.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche la propagation de l'événement de clic

            const isMenuOpen = menuContainer.classList.contains('menuOpen');

            // Fermer le menu actuellement ouvert, si différent
            if (currentOpenMenu && currentOpenMenu !== menuContainer) {
                const openZoneMenu = currentOpenMenu.querySelector('.zoneMenu');
                const openChevron = currentOpenMenu.querySelector('.chevron');

                currentOpenMenu.classList.remove('menuOpen');
                currentOpenMenu.classList.add('menuClose');
                if (openChevron) {
                    openChevron.classList.remove('rotateOpen');
                    openChevron.classList.add('rotateClose');
                }
                if (openZoneMenu) {
                    openZoneMenu.style.display = 'none';
                }
            }

            // Ouvrir ou fermer le nouveau menu
            if (isMenuOpen) {
                menuContainer.classList.remove('menuOpen');
                menuContainer.classList.add('menuClose');
                chevron.classList.remove('rotateOpen');
                chevron.classList.add('rotateClose');
                zoneMenu.style.display = 'none';
                currentOpenMenu = null;
            } else {
                menuContainer.classList.remove('menuClose');
                menuContainer.classList.add('menuOpen');
                chevron.classList.remove('rotateClose');
                chevron.classList.add('rotateOpen');
                zoneMenu.style.display = 'block';
                currentOpenMenu = menuContainer;
            }
        });
    });

    // Gestionnaire d'événement pour le clic en dehors du menu
    document.addEventListener('click', (event) => {
        if (currentOpenMenu) {
            const isClickInside = currentOpenMenu.contains(event.target) || Array.from(titleSelects).some(titleSelect => titleSelect.contains(event.target));
            if (!isClickInside) {
                const openZoneMenu = currentOpenMenu.querySelector('.zoneMenu');
                const openChevron = currentOpenMenu.querySelector('.chevron');

                currentOpenMenu.classList.remove('menuOpen');
                currentOpenMenu.classList.add('menuClose');
                if (openChevron) {
                    openChevron.classList.remove('rotateOpen');
                    openChevron.classList.add('rotateClose');
                }
                if (openZoneMenu) {
                    openZoneMenu.style.display = 'none';
                }
                currentOpenMenu = null;
            }
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