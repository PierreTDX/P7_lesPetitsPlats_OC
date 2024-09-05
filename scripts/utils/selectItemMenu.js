export function selectItem() {
    document.addEventListener('DOMContentLoaded', () => {
        // Fonction pour déplacer un élément de la zoneList vers la zoneSelecteds
        function moveToSelected(event) {
            event.stopPropagation(); // Arrêter la propagation de l'événement
            const target = event.target;

            // Vérifier si l'élément cliqué est un élément de la liste
            if (target.classList.contains('list')) {
                const selectedContainer = target.closest('.zoneMenu').querySelector('.zoneSelecteds');
                const listContainer = target.closest('.zoneMenu').querySelector('.zoneList');

                // Créer un nouvel élément pour la sélection
                const selectedElement = document.createElement('div');
                selectedElement.className = 'selected';

                const selectedText = document.createElement('span');
                selectedText.className = 'selectedWord';
                selectedText.textContent = target.textContent;

                const roundCross = document.createElement('img');
                roundCross.className = 'roundCross';
                roundCross.src = 'assets/icons/croix_rond_noir.svg';
                roundCross.alt = 'supprimer la selection';

                // Ajouter l'événement pour supprimer la sélection
                roundCross.addEventListener('click', (e) => {
                    e.stopPropagation(); // Arrêter la propagation de l'événement
                    selectedElement.remove();

                    // Réajouter l'élément dans la zoneList
                    const listItem = document.createElement('div');
                    listItem.className = 'list';
                    listItem.textContent = selectedText.textContent;

                    // Ajouter l'événement pour déplacer l'élément vers la sélection
                    listItem.addEventListener('click', moveToSelected);

                    // Ajouter l'élément à la zoneList
                    listContainer.appendChild(listItem);
                });

                selectedElement.appendChild(selectedText);
                selectedElement.appendChild(roundCross);

                // Ajouter le nouvel élément à la zoneSelecteds
                selectedContainer.appendChild(selectedElement);

                // Supprimer l'élément de la zoneList
                target.remove();
            }
        }

        // Ajouter des écouteurs d'événements à chaque élément de la zoneList
        document.querySelectorAll('.zoneList .list').forEach(item => {
            item.addEventListener('click', moveToSelected);
        });
    });
}

export function deleteSelectedItem() {
    // Ajouter un écouteur d'événements pour les croix
    document.querySelectorAll('.zoneSelecteds .roundCross').forEach(cross => {
        cross.addEventListener('click', (event) => {
            // Trouver l'élément sélectionné parent de la croix cliquée
            const selectedElement = event.target.closest('.selected');
            if (selectedElement) {
                // Trouver l'élément à réafficher dans la zoneList
                const selectedText = selectedElement.querySelector('.selectedWord').textContent;
                const listContainer = selectedElement.closest('.zoneMenu').querySelector('.zoneList');

                // Créer un nouvel élément pour la zoneList
                const listItem = document.createElement('div');
                listItem.className = 'list';
                listItem.textContent = selectedText;
                
                // Ajouter l'événement pour sélectionner l'élément
                listItem.addEventListener('click', moveToSelected);

                // Ajouter l'élément à la zoneList
                listContainer.appendChild(listItem);

                // Supprimer l'élément de la zoneSelecteds
                selectedElement.remove();
            }
        });
    });
}