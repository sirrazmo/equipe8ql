<template>
    <div class="has-background-color" style="min-height: 73vh;">
        <div class="container">
            <p class="title" style="padding-top: 1%; padding-bottom: 1%;">
                Création d'un utilisateur
            </p>
        </div>

        <div class="container">
            <div class="field">
                <label class="label">Nom</label>
                <div class="control">
                    <input class="input" type="text" v-model="nom" placeholder="Nom" required>
                </div>
                <p class="help is-danger" v-if="nomError">{{ nomError }}</p>
            </div>

            <div class="field">
                <label class="label">Prénom</label>
                <div class="control">
                    <input class="input" type="text" v-model="prenom" placeholder="Prénom" required>
                </div>
                <p class="help is-danger" v-if="prenomError">{{ prenomError }}</p>
            </div>

            <div class="field">
                <label class="label">Administrateur</label>
                <div class="control">
                    <input class="input" type="text" v-model="type" placeholder="Oui/Non" required>
                </div>
                <p class="help is-danger" v-if="adminError">{{ adminError }}</p>
            </div>

            <div class="field">
                <label class="label">Adresse électronique</label>
                <div class="control">
                    <input class="input" type="text" v-model="email" placeholder="exemple@exemple.com" required>
                </div>
                <p class="help is-danger" v-if="emailError">{{ emailError }}</p>
            </div>

            <div class="field">
                <div class="columns is-centered">
                    <div class="column is-narrow">
                        <p class="control">
                            <button class="button is-warning is-rounded is-center" type="submit"
                                @click="creerUtilisateur()">
                                Créer l'utilisateur
                            </button>
                        </p>
                        <br>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import router from '../router.js';
import { getAuth } from 'firebase/auth';
import { useVerificationUtilisateur } from '../verification.js'

export default {
    async mounted() {
        const auth = getAuth();
        if (!auth.currentUser) {
            alert("Vous n'êtes pas connecté, connectez-vous pour accéder à la page.");
            router.push("/");
        }
        else {
            if (auth.currentUser.email != "admin@admin.com" && auth.currentUser.email != "admin2@admin.com") {
                alert("Vous n'êtes pas autorisé à accéder à cette page.");
                router.push("/");
            }
        }
    },
    name: 'creationUtilisateur',
    data() {
        return {
            file: null,
            email: "",
            admin: "Non",
            prenom: "",
            nom: "",
        };
    },

    setup() {

    },

    methods: {
        async creerUtilisateur() {
            let verif = false;
            try {
                this.nomError = "";
                this.prenomError = "";
                this.adminError = "";
                this.emailError = "";
                verif = useVerificationUtilisateur(this.nom, this.prenom, this.admin, this.email);
            } catch (e) {

                for (const error of e) {
                    if (error.code == 1) { this.nomError = error.message; }
                    if (error.code == 2) { this.prenomError = error.message; }
                    if (error.code == 3) { this.adminError = error.message; }
                    if (error.code == 4) { this.emailError = error.message; }
                }
            }
            if (verif) {
                const docRef = await addDoc(collection(db, "utilisateurs"), {
                    Nom: this.nom,
                    prenom: this.prenom,
                    admin: this.admin,
                    email: this.email,
                });
                console.log("Document inséré avec ID: ", docRef.id);
                document.getElementById("message").innerText = "Utilisateur crée";
                router.push("/utilisateur");
            }
        },

        checkDigit(event) {
            if (event.key.length == 1 && isNaN(Number(event.key))) {
                event.preventDefault();
            }
        }
    }
};

</script>


<style scoped></style>