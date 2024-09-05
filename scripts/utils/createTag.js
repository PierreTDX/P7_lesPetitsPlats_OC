export function createTag () {
    document.addEventListener('DOMContentLoaded', function() {
        // Fonction pour ajouter un nouveau tag
        function addTag(text) {
            // Créer le nouvel élément de tag
            const tag = document.createElement('div');
            tag.classList.add('tag');

            const tagText = document.createElement('div');
            tagText.classList.add('tagText');
            tagText.textContent = text;

            const removeIcon = document.createElement('img');
            removeIcon.src = 'assets/icons/croix_gras.svg';
            removeIcon.alt = 'croix pour supprimer';

            tag.appendChild(tagText);
            tag.appendChild(removeIcon);

            document.querySelector('.zoneTag').appendChild(tag);
        }

        // Fonction pour surveiller les ajouts dans une zone donnée
        function observeMenu(menuClass) {
            const targetNode = document.querySelector(menuClass + ' .zoneSelecteds');
            const config = { childList: true };

            const callback = function(mutationsList) {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            if (node.classList && node.classList.contains('selected')) {
                                const text = node.querySelector('.selectedWord').textContent;
                                addTag(text);
                            }
                        });
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        }

        // Démarrer l'observation pour chaque menu
        observeMenu('.menuClose:nth-of-type(1)'); // Ingrédients
        observeMenu('.menuClose:nth-of-type(2)'); // Appareils
        observeMenu('.menuClose:nth-of-type(3)'); // Ustensiles
    });
}
