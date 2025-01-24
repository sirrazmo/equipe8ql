export function useVerificationMateriel(nom, version, reference, imagePath, telephone) {

    function errorMaterial(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    var listError = [];

    if (!nom || !/^[a-zA-Z- ]{1,30}$/.test(nom)) {
        listError.push(errorMaterial("Le nom doit être entre 1 et 30 caractères.", 1));
    }

    if (!version || !/^[a-zA-Z0-9-_. ]{3,15}$/.test(version)) {
        listError.push(errorMaterial("La version doit être entre 3 et 15 caractères.", 2));
    }

    if (!reference || !/^(AN|AP|XX)\d{3}$/.test(reference)) {
        listError.push(errorMaterial("La référence doit commencer par AN, AP, ou XX et est suvie par 3 chiffres.", 3));
    }

    if (!imagePath || !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|bmp))$/.test(imagePath)) {
        listError.push(errorMaterial("L'url n'est pas valide", 4));
    }

    if (!telephone || !/^[0-9]{10}$/.test(telephone)) {
        listError.push(errorMaterial("Le numéro de téléphone doit correspondre à 10 chiffres.", 5));
    }

    if (listError.length > 0) {
        throw listError;
    }

    return true;
}

export function useVerificationUtilisateur(nom, prenom, admin, email, password) {

    function errorUtilisateur(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    var listError = [];

    if (!nom || nom.length < 1 || nom.length > 30) {
        listError.push(errorUtilisateur("Le nom doit être entre 1 et 30 caractères.", 1));
    }

    if (!prenom || prenom.length < 1 || prenom.length > 30) {
        listError.push(errorUtilisateur("Le prénom doit être entre 1 et 30 caractères.", 2));
    }

    if (!admin || (admin != "Oui" && admin != "Non")) {
        listError.push(errorUtilisateur("Vous devez entrer si 'Oui' ou 'Non' l'utilisateur sera administrateur.", 3));
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/) {
        listError.push(errorUtilisateur("Veuillez entrer une adresse mail correcte.", 4));
    }

    if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@?!ù$^&+=\-*/])(?=.*[0-9]).{8,30}$/.test(password)) {
        listError.push(errorUtilisateur("Le mot de passe doit contenir une lettre minuscule, une lettre majuscule, un caractère spécial, et avoir une longueur entre 8 et 30 caractères.", 5));
    }

    if (listError.length > 0) {
        throw listError;
    }

    return true;
}