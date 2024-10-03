// Fonction pour gérer l'affichage de mes console.log
let isLoggingEnabled = false; // Changez cette valeur à true pour activer les logs

export function mylog(message, ...optionalParams) {
    if (isLoggingEnabled) {
        console.log(message, ...optionalParams);
    }
}