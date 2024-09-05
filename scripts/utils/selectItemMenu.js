export function selectItem() {
    document.addEventListener('DOMContentLoaded', () => {
        function moveToSelected(event) {
            event.stopPropagation(); // Arrêter la propagation de l'événement
            const target = event.target;

            if (target.classList.contains('list')) {
                const selectedContainer = target.closest('.zoneMenu').querySelector('.zoneSelecteds');
                const listContainer = target.closest('.zoneMenu').querySelector('.zoneList');

                const selectedElement = document.createElement('div');
                selectedElement.className = 'selected';

                const selectedText = document.createElement('span');
                selectedText.className = 'selectedWord';
                selectedText.textContent = target.textContent;

                const roundCross = document.createElement('img');
                roundCross.className = 'roundCross';
                roundCross.src = 'assets/icons/croix_rond_noir.svg';
                roundCross.alt = 'supprimer la selection';

                roundCross.addEventListener('click', (e) => {
                    e.stopPropagation(); // Arrêter la propagation de l'événement
                    selectedElement.remove();

                    // Réajouter l'élément dans la zoneList
                    const listItem = document.createElement('div');
                    listItem.className = 'list';
                    listItem.textContent = selectedText.textContent;

                    listItem.addEventListener('click', moveToSelected);

                    listContainer.appendChild(listItem);

                    // Supprimer le tag correspondant de zoneTag
                    const tagToRemove = Array.from(document.querySelectorAll('.zoneTag .tag')).find(tag => tag.querySelector('.tagText').textContent === selectedText.textContent);
                    if (tagToRemove) {
                        tagToRemove.remove();
                    }
                });

                selectedElement.appendChild(selectedText);
                selectedElement.appendChild(roundCross);

                selectedContainer.appendChild(selectedElement);

                target.remove();
            }
        }

        document.querySelectorAll('.zoneList .list').forEach(item => {
            item.addEventListener('click', moveToSelected);
        });
    });
}