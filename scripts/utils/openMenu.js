document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner les éléments
    const titleSelect = document.querySelector('.titleSelect');
    const zoneMenu = document.querySelector('.zoneMenu');
    const chevron = document.querySelector('.chevron');
    const menuContainer = document.querySelector('.menuClose');

    // Ajouter un gestionnaire d'événement pour le clic
    titleSelect.addEventListener('click', () => {
        // Obtenir la valeur calculée de la propriété display
        const computedStyle = window.getComputedStyle(zoneMenu);
        const displayValue = computedStyle.display;

        // Vérifier si .zoneMenu est affiché
        if (displayValue === 'none') {
            // Afficher .zoneMenu
            zoneMenu.style.display = 'block';
            chevron.classList.add('rotateOpen');
            chevron.classList.remove('rotateClose');
            menuContainer.classList.add('menuOpen');
            menuContainer.classList.remove('menuClose');

        } else {
            // Masquer .zoneMenu
            zoneMenu.style.display = 'none';
            chevron.classList.add('rotateClose');
            chevron.classList.remove('rotateOpen');
            menuContainer.classList.add('menuClose');
            menuContainer.classList.remove('menuOpen');
        }
    });
});
