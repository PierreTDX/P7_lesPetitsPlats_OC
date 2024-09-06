export function deleteTag() {
    document.addEventListener('click', function(event) {
        // Vérifie si l'élément cliqué est une image à l'intérieur d'un tag
        if (event.target && event.target.matches('.tag img')) {
            const tagElement = event.target.closest('.tag'); // Trouver l'élément parent avec la classe 'tag'
            
            if (tagElement) {
                const tagText = tagElement.querySelector('.tagText').textContent; // Récupère le texte du tag

                tagElement.remove(); // Supprime le tag de l'interface

                // Appelle la fonction pour gérer la suppression dans zoneSelecteds et ajout à zoneList
                handleTagRemoval(tagText);

                // Met à jour immédiatement la zoneSelecteds
                updateZoneSelecteds(tagText);
            }
        }
    });
}

// Fonction pour gérer la suppression dans zoneSelecteds et ajouter à zoneList
function handleTagRemoval(tagText) {
    // Trouve la section qui contient le tag supprimé
    const section = findSectionForTag(tagText);

    if (section) {
        // Supprime le tag de zoneSelecteds
        deleteFromZoneSelecteds(tagText, section);

        // Réajoute le tag dans la zoneList de la même section
        addToZoneList(tagText, section);
    }
}

// Fonction pour trouver la section correspondant au tag
function findSectionForTag(tagText) {
    // Parcourt toutes les sections pour trouver celle qui contient le tag
    const sections = document.querySelectorAll('.zoneSelectsAndText .menuClose');

    for (const section of sections) {
        const zoneSelecteds = section.querySelector('.zoneSelecteds');
        const selectedItems = zoneSelecteds.querySelectorAll('.selected');

        for (const item of selectedItems) {
            const selectedWord = item.querySelector('.selectedWord').textContent;

            if (selectedWord === tagText) {
                return section;
            }
        }
    }
    return null;
}

// Fonction pour supprimer l'élément de zoneSelecteds
function deleteFromZoneSelecteds(tagText, section) {
    const zoneSelecteds = section.querySelector('.zoneSelecteds');
    const selectedItems = zoneSelecteds.querySelectorAll('.selected');

    selectedItems.forEach(function(selectedItem) {
        const selectedWord = selectedItem.querySelector('.selectedWord').textContent;

        // Si le texte correspond, supprime l'élément
        if (selectedWord === tagText) {
            selectedItem.remove();
        }
    });
}

// Fonction pour réajouter le tag dans la zoneList de la même section
function addToZoneList(tagText, section) {
    // Trouve la zoneList dans la section donnée
    const zoneList = section.querySelector('.zoneList');

    if (zoneList) {
        // Crée un nouvel élément pour le tag
        const newTag = document.createElement('span');
        newTag.className = 'list';
        newTag.textContent = tagText;

        // Ajoute le nouvel élément à la zoneList
        zoneList.appendChild(newTag);
    }
}

// Fonction pour mettre à jour zoneSelecteds après la suppression
function updateZoneSelecteds(tagText) {
    const sections = document.querySelectorAll('.zoneSelectsAndText .menuOpen');
    sections.forEach((section) => {
        const zoneSelecteds = section.querySelector('.zoneSelecteds');
        const selectedItems = zoneSelecteds.querySelectorAll('.selected');

        selectedItems.forEach((item) => {
            const selectedWord = item.querySelector('.selectedWord').textContent;
            if (selectedWord === tagText) {
                item.remove();
                addToZoneList(tagText, section); // Ajoute l'élément supprimé à zoneList
            }
        });
    });
}
