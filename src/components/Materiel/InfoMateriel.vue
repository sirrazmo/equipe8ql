<template>

    <div class="has-background-color has-text-color" style="min-height: 73vh;">
        <div class="container is-fluid">
            <div class="columns is-mobile">
                <div class="column">
                    <div class="container is-fluid">

                        <p>Nom : </p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.nom" id="Nom" :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-id-card-clip"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="nameError">{{ nameError }}</p>

                        <p>Référence :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.reference" id="Reference"
                                :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-barcode"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="referenceError">{{ referenceError }}</p>

                    </div>
                </div>

                <div class="column">
                    <div class="container is-fluid">

                        <p>Version :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.version" id="Version" :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-gears"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="versionError">{{ versionError }}</p>


                        <p>Numéro :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.numero" id="Numero" :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-list-ol"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="telephoneError">{{ telephoneError }}</p>
                    </div>

                </div>
            </div>
        </div>
        <div class="container is-fluid has-color-background">
            <div class="columns ">
                <div class="column is-offset-one-fifth">
                    <div class="container is-fluid">
                        <div class="is-center">
                            <p class="is-center">Photo : </p>
                            <p class="control has-icons-left">
                                <input class="input is-small" style="width: 50%;" type="text" v-model="this.image"
                                    id="Image" v-if="roleAdmin">
                            </p>
                            <p class="help is-danger" v-if="imageError">{{ imageError }}</p>
                            <br>
                            <figure class="image is-128x128 is-center">
                                <img :src="this.image" />
                            </figure>
                        </div>

                    </div>

                </div>

                <div v-if="this.loading" class="has-text-centered">
                </div>
                <div v-else>
                    <div class="column">
                        <p class="help is-info" id="Reservation"></p>
                        <br>
                        <button class="button is-warning is-rounded is-center" disabled="BoutonOff" @click="reserver"
                            v-if="connecte" id="BoutonReservation">
                            Reserver
                        </button>
                        <br> <br>
                        <button class="button is-warning is-rounded is-center" id="modifier" @click="modifier"
                            v-if="roleAdmin">
                            Modifier
                        </button>
                        <br> <br>
                        <button class="button is-warning is-rounded is-center" @click="supprimer" v-if="roleAdmin">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

import { db } from '../../firebase.js';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import router from '../../router.js';
import { useVerificationMateriel } from '../../verification.js'; // Importation de la fonction de vérification des données matérielles

export default {
    /* eslint-disable */
    name: 'InfoMateriel',

    data() {
        // Données réactives utilisées dans le composant
        return {
            nom: "",
            version: "",
            numero: "",
            image: "",
            reference: "",
            nameError: "",
            versionError: "",
            referenceError: "",
            telephoneError: "",
            imageError: "",
            roleAdmin: true,
            connecte: true,
            loading: true
        };
    },

    async mounted() {
        // Chargement des informations du matériel et gestion des permissions utilisateur
        const materielRef = doc(db, "materiels", this.$route.params.id);
        const materiel = await getDoc(materielRef);
        const auth = getAuth();
        if (!auth.currentUser) {
            // Si l'utilisateur n'est pas connecté
            this.roleAdmin = false;
            this.connecte = false;
        } else {
            // Vérification des droits d'accès de l'utilisateur connecté
            if (auth.currentUser.email != "admin@admin.com" && auth.currentUser.email != "admin2@admin.com") {
                this.roleAdmin = false;
            }
        }

        // Gestion de l'état de réservation du matériel
        if (materiel.get("ReserverPar") == "") {
            document.getElementById("Reservation").innerText = "Ce matériel n'est actuellement pas réservé.";
            document.getElementById("BoutonReservation").removeAttribute("disabled"); // Activation du bouton
        } else if (!auth.currentUser) {
            document.getElementById("Reservation").innerText = "Connectez-vous pour pouvoir réserver ce matériel.";
        } else if (auth.currentUser.email == materiel.get("ReserverPar")) {
            document.getElementById("Reservation").innerText = "Vous réservez actuellement ce matériel.";
            document.getElementById("BoutonReservation").removeAttribute("disabled");
            document.getElementById("BoutonReservation").innerText = "Rendre"; // Modification du texte du bouton
        } else {
            document.getElementById("Reservation").innerText = "Ce document est réservé par quelqu'un d'autre.";
            document.getElementById("BoutonReservation").setAttribute("disabled", "BoutonOff"); // Désactivation du bouton
        }
    },

    created() {
        // Appel de la méthode pour récupérer les données du matériel
        this.getMateriel();
    },

    methods: {
        async getMateriel() {
            // Récupération des informations du matériel depuis Firestore
            const materielRef = doc(db, "materiels", this.$route.params.id);
            const materiel = await getDoc(materielRef);

            // Mise à jour des données réactives avec les informations récupérées
            this.nom = materiel.get("Nom");
            this.version = materiel.get("Version");
            this.numero = materiel.get("Numero");
            this.image = materiel.get("Photo_url");
            this.reference = materiel.get("Reference");
            this.loading = false; // Fin du chargement
        },

        async reserver() {
            // Gestion de la réservation ou de la libération du matériel
            const auth = getAuth();
            const materielRef = doc(db, "materiels", this.$route.params.id);
            const materiel = await getDoc(materielRef);
            if (materiel.get("ReserverPar") == "") {
                // Réservation par l'utilisateur actuel
                await updateDoc(materielRef, {
                    ReserverPar: auth.currentUser.email,
                });
                document.getElementById("message").innerText = "Matériel réservé";
            } else if (auth.currentUser.email == materiel.get("ReserverPar")) {
                // Libération du matériel réservé par l'utilisateur actuel
                await updateDoc(materielRef, {
                    ReserverPar: "",
                });
                document.getElementById("message").innerText = "Matériel rendu";
            } else {
                // Si le matériel est déjà réservé par quelqu'un d'autre
                alert("Le matériel est déjà emprunté par quelqu'un d'autre !");
            }
            router.push("/"); // Redirection après l'action
        },

        async modifier() {
            // Modification des informations du matériel
            let verif = false;
            try {
                // Réinitialisation des messages d'erreur
                this.nameError = "";
                this.versionError = "";
                this.referenceError = "";
                this.imageError = "";
                this.telephoneError = "";

                // Vérification des données
                verif = useVerificationMateriel(this.nom, this.version, this.reference, this.image, this.numero);
            } catch (e) {
                // Gestion des erreurs lors de la vérification
                for (const error of e) {
                    if (error.code == 1) { this.nameError = error.message; }
                    if (error.code == 2) { this.versionError = error.message; }
                    if (error.code == 3) { this.referenceError = error.message; }
                    if (error.code == 4) { this.imageError = error.message; }
                    if (error.code == 5) { this.telephoneError = error.message; }
                }
            }

            if (verif) {
                // Si les données sont valides, mise à jour dans Firestore
                const materielRef = doc(db, "materiels", this.$route.params.id);
                await updateDoc(materielRef, {
                    Nom: this.nom,
                    Numero: this.numero,
                    Reference: this.reference,
                    Photo_url: this.image,
                    Version: this.version,
                });
                document.getElementById("message").innerText = "Matériel modifié";
                router.push("/"); // Redirection après la modification
            }
        },

        async supprimer() {
            // Suppression du matériel de Firestore
            await deleteDoc(doc(db, "materiels", this.$route.params.id));
            document.getElementById("message").innerText = "Matériel supprimé";
            router.push("/"); // Redirection après la suppression
        },
    }
};
</script>



<style scoped></style>