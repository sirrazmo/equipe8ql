<template>
    <div class="has-background-color" style="min-height: 73vh;">
        <div class="container">
            <p class="title" style="padding-top: 1%; padding-bottom: 1%;">
                Création d'un utilisateur
            </p>
        </div>

        <div class="container">

            <div class="field">
                <label class="label">Matricule</label>
                <div class="control">
                    <input class="input" type="text" v-model="matricule" placeholder="Matricule" required>
                </div>
                <p class="help is-danger" v-if="matriculeError">{{ matriculeError }}</p>
            </div>

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
                    <label><input type="radio" v-model="admin" value=true> Oui</label>
                    <br>
                    <label><input type="radio" v-model="admin" value=false> Non</label>
                </div>
            </div>

            <div class="field">
                <label class="label">Adresse électronique</label>
                <div class="control">
                    <input class="input" type="text" v-model="email" placeholder="exemple@exemple.com" required>
                </div>
                <p class="help is-danger" v-if="emailError">{{ emailError }}</p>
            </div>

            <div class="field">
                <label class="label">Mot de passe</label>
                <div class="control">
                    <input class="input" type="text" v-model="password" placeholder="Mot de passe" required>
                </div>
                <p class="help is-danger" v-if="passwordError">{{ passwordError }}</p>
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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
            password: "",
            matricule: "",
            nomError: "",
            prenomError: "",
            emailError: "",
            passwordError: "",
            matriculeError: "",
        };
    },

    setup() {

    },

    methods: {
        async creerUtilisateur() {
            const auth = getAuth();
            let verif = false;
            try {
                this.nomError = "";
                this.prenomError = "";
                this.emailError = "";
                this.passwordError = "";
                this.matriculeError = "";
                verif = useVerificationUtilisateur(this.nom, this.prenom, this.email, this.password, this.matricule);
            } catch (e) {

                for (const error of e) {
                    if (error.code == 1) { this.nomError = error.message; }
                    if (error.code == 2) { this.prenomError = error.message; }
                    if (error.code == 4) { this.emailError = error.message; }
                    if (error.code == 5) { this.passwordError = error.message; }
                    if (error.code == 6) { this.matriculeError = error.message; }
                }
            }
            if (verif) {
                const docRef = await addDoc(collection(db, "utilisateurs"), {
                    Matricule: this.matricule,
                    Nom: this.nom,
                    Prénom: this.prenom,
                    admin: this.admin,
                    email: this.email,
                });
                createUserWithEmailAndPassword(auth, this.email, this.password);
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