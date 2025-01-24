<template>
    <div class="has-background-color" style="min-height: 73vh;">
        <div class="container is-fluid">
            <section class="is-info">
                <br>
                <div class="columns is-mobile">
                    <div class="column">
                        <p>Nom</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.nom" id="Nom" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-user"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="nomError">{{ nomError }}</p>
                        <a></a>
                        <br>

                        <p>Prénom</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.prenom" id="Prenom" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-user"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="prenomError">{{ prenomError }}</p>

                        <br><br>

                        <input type="radio" id="administrateur" name="admin" value="true" v-model="choix">
                        <label for="administrator">Administrator</label>
                        <br>
                        <input type="radio" id="utilisateur" name="admin" value="false" v-model="choix">
                        <label for="administrator">User</label>
                    </div>



                    <div class="column">
                        <p>Email</p>
                        <p class="control has-icons-left">
                            <input class="input" type="email" v-model="this.email" id="Email" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-at"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="emailError">{{ emailError }}</p>

                        <br>

                        <p>Matricule</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.matricule" id="Matricule" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-id-card-clip"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="matriculeError">{{ matriculeError }}</p>

                        <br>

                        <p>Mot de passe</p>
                        <p class="control has-icons-left">
                            <input class="input" type="password" v-model="this.motDePasse" id="MotDePasse" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="motDePasseError">{{ motDePasseError }}</p>
                    </div>
                </div>

                <div class="columns is-centered">
                    <div class="column is-narrow">
                        <button class="button is-warning is-rounded is-center" @click="modifier">
                            Modifier
                        </button>
                    </div>
                </div>
                <br>
            </section>
        </div>


    </div>

</template>

<script>
import router from '../router.js';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.js';
import { doc,getDoc, updateDoc } from 'firebase/firestore';
import {useVerificationUtilisateur} from '../verification.js';

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
    /* eslint-disable */
    name: 'ModifAjoutUtlisateur',
    data() {
        return {
            nom: '',
            prenom: '',
            matricule: '',
            motDePasse: '',
            email: '',
            nomError: "",
            prenomError: "",
            matriculeError: "",
            motDePasseError: "",
            emailError:"",
            adminError:"",
            choix: 'utilisateur'
        };
    },

    created() {
        this.getUtilisateurs();
  },

    methods: {
        async getUtilisateurs() {
            const utlisateurRef = doc(db, "utilisateurs", this.$route.params.id)
            const utilisateur = await getDoc(utlisateurRef);
            
            this.nom = utilisateur.get("Nom");
            this.prenom = utilisateur.get("Prénom");
            this.choix = utilisateur.get("admin");
            this.email = utilisateur.get("email");
        },
        
        valider() {
            alert('Valider appeler')
        },

        async modifier() {
            let verif = false;
            try {
                this.nomError = "";
                this.prenomError= "";
                this.matriculeError= "";
                this.motDePasseError= "";
                this.emailError="";
                verif = useVerificationUtilisateur(this.nom,this.prenom, this.email,this.motDePasse, this.matricule);
            } catch (e) {
                for(const error of e) {
                    if (error.code == 1) { this.nomError = error.message; }
                    if (error.code == 2) { this.prenomError = error.message; }
                    if (error.code == 3) { this.emailError = error.message; }
                    if (error.code == 4) { this.motDePasseError = error.message; }
                    if (error.code == 5) { this.matriculeError = error.message; }
                }
            }

            if (verif) {
                console.log("Mise à jour en cours...");
                const utilisateurRef = doc(db, "utilisateurs", this.$route.params.id);
                await updateDoc(utilisateurRef, {
                    Prenom: this.prenom,
                    Nom: this.nom,
                    admin: this.choix,
                    email: this.email
                });
                console.log("Mise à jour terminée.");
            } else {
                console.log("Les données ne sont pas valides.");
            }

           
           
        },
    }
};
</script>


<style scoped></style>