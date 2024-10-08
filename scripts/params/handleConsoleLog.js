// Fonction pour gérer l'affichage de mes console.log
const isLoggingEnabled = false; // Changez cette valeur à true pour activer les logs

export function mylog(message, ...optionalParams) {
    if (isLoggingEnabled)
        console.log(message, ...optionalParams);
}