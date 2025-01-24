export function useVerificationMateriel(nom, version, reference, imagePath, telephone) {
    //Fonction pour vérifier les formulaires de création et modification des matériels
    function errorMaterial(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    var listError = [];

    if (!nom || !/^[a-zA-Z-çé ]{1,30}$/.test(nom)) {
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

export function useVerificationUtilisateur(nom, prenom, email, password, matricule) {
    //Fonction pour vérifier les formulaires de création et modification des utilisateurs
    function errorUtilisateur(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    var listError = [];

    if (!nom || !/^[a-zA-Z-çé ]{1,30}$/.test(nom)) {
        listError.push(errorUtilisateur("Le nom doit être entre 1 et 30 caractères.", 1));
    }

    if (!prenom || !/^[a-zA-Z-çé ]{1,30}$/.test(prenom)) {
        listError.push(errorUtilisateur("Le prénom doit être entre 1 et 30 caractères.", 2));
    }

    if (!matricule || !/([a-zA-Z])$/.test(matricule) || matricule.length != 7) {
        listError.push(errorUtilisateur("Le matricule doit faire 7 caractères alphabétique", 3));
    }

    if (!email || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$/.test(email) || email.length > 50) {
        listError.push(errorUtilisateur("Veuillez entrer une adresse mail correcte.", 4));
    }

    if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@?!ù$^&+=\-*/])(?=.*[0-9]).{8,30}$/.test(password)) {
        listError.push(errorUtilisateur("Le mot de passe doit contenir une lettre minuscule, une lettre majuscule, un caractère spécial, et avoir une longueur entre 8 et 30 caractères.",
            5));
    }

    if (listError.length > 0) {
        throw listError;
    }

    return true;
}