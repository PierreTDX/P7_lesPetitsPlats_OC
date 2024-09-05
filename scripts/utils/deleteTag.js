export function deleteTag() {
    document.addEventListener('click', function(event) {
        if (event.target && event.target.matches('.tag img')) {
            const tag = event.target.closest('.tag'); // Trouver l'élément parent avec la classe 'tag'
            if (tag) {
                tag.remove(); // Supprimer le tag lorsqu'on clique sur l'image
            }
        }
    });
}