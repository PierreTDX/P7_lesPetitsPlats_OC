// Fonction pour désinfecter l'entrée (supprimer les caractères dangereux)
export function clearInput(input) {
    return input.replace(/[&<>"']/g, ''); // Supprime &, <, >, ", et '
}