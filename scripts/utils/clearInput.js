// Fonction pour désinfecter l'entrée (supprimer les caractères dangereux)
export const clearInput = input => input.replace(/[&<>"']/g, ''); // Supprime &, <, >, ", et '
    