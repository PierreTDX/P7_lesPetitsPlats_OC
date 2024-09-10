export function selectItem() {
    document.addEventListener('DOMContentLoaded', () => {
        // Ajouter l'écouteur d'événements sur le parent
        document.querySelectorAll('.zoneMenu').forEach((zoneMenu) => {
            const listContainer = zoneMenu.querySelector('.zoneList');
            const selectedContainer = zoneMenu.querySelector('.zoneSelecteds');
            // Vider le contenu de "zoneSelecteds" avant de le remplir
            selectedContainer.innerHTML = '';

            // Utilisation de la délégation d'événements pour la zoneList
            listContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('list')) {
                    const target = event.target;

                    // Créer l'élément sélectionné
                    const selectedElement = document.createElement('div');
                    selectedElement.className = 'selected';

                    const selectedText = document.createElement('span');
                    selectedText.className = 'selectedWord';
                    selectedText.textContent = target.textContent;

                    const roundCross = document.createElement('img');
                    roundCross.className = 'roundCross';
                    roundCross.src = 'assets/icons/croix_rond_noir.svg';
                    roundCross.alt = 'supprimer la selection';

                    // Ajouter un événement de suppression
                    roundCross.addEventListener('click', (e) => {
                        e.stopPropagation(); // Arrêter la propagation de l'événement
                        selectedElement.remove();

                        // Réutiliser l'élément d'origine et le réajouter à zoneList
                        listContainer.appendChild(target);

                        // Supprimer le tag correspondant de zoneTag
                        const tagToRemove = Array.from(document.querySelectorAll('.zoneTag .tag')).find(tag => tag.querySelector('.tagText').textContent === selectedText.textContent);
                        if (tagToRemove) {
                            tagToRemove.remove();
                        }
                    });

                    selectedElement.appendChild(selectedText);
                    selectedElement.appendChild(roundCross);

                    selectedContainer.appendChild(selectedElement);

                    // Cacher ou supprimer l'élément d'origine dans zoneList
                    target.remove();
                }
            });
        });
    });
}
