export function useVerificationMateriel(nom, version, reference, imagePath, telephone) {

    function errorMaterial(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    var listError = [];

    if (!nom || nom.length < 1 || nom.length > 30) {
        listError.push(errorMaterial("Le nom doit être entre 1 et 30 caractères.",1));
    }

    if (!version || version.length < 3 || version.length > 15) {
        listError.push(errorMaterial("La version doit être entre 3 et 15 caractères.",2));
    }

    if (!reference || !/^(AN|AP|XX)\d{3}$/.test(reference)) {
        listError.push(errorMaterial("La référence doit commencer par AN, AP, ou XX et est suvie par 3 chiffres.",3));
    }

    if (!imagePath || !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|bmp))$/.test(imagePath) ) {
        listError.push(errorMaterial("L'url n'est pas valide",4));
    }

    if (!telephone || !/^\d{10}$/.test(telephone)) {
        listError.push(errorMaterial("Le numéro de téléphone doit correspondre à 10 chiffres.",5));
    }

    if (listError.length > 0) {
        throw listError;
    }

    return true;
  }