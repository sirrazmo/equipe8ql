<template>
    <div class="has-background-color" style="min-height: 73vh;">
        <div class="container is-fluid">
            <section class="is-info">
                <br>
                <div class="columns is-mobile">
                    <div class="column">
                        <p>Last name</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.Nom" id="Nom" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-user"></i>
                            </span>
                        </p>
                        <a></a>
                        <br>

                        <p>First name</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.Prenom" id="Prenom" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-user"></i>
                            </span>
                        </p>

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
                            <input class="input" type="email" v-model="this.Email" id="Email" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-at"></i>
                            </span>
                        </p>

                        <br>

                        <p>Registration number</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" placeholder="Registration number" id="Matricule" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-id-card-clip"></i>
                            </span>
                        </p>

                        <br>

                        <p>Password</p>
                        <p class="control has-icons-left">
                            <input class="input" type="password" placeholder="Password" id="MotDePasse" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                </div>

                <div class="columns is-centered">
                    <div class="column is-narrow">
                        <button class="button is-warning is-rounded is-center" @click="Valider">
                            Submit
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
import { doc,getDoc } from 'firebase/firestore';

export default {
    async mounted() {
        const auth = getAuth();
        if (!auth.currentUser) {
            alert("Vous n'êtes pas connecté, connectez-vous pour accéder à la page.");
            router.push("/");
        }
        else {
            if (auth.currentUser.email != "admin@admin.com" || auth.currentUser.email != "admin2@admin.com") {
                alert("Vous n'êtes pas autorisé à accéder à cette page.");
                router.push("/");
            }
        }
    },
    /* eslint-disable */
    name: 'ModifAjoutUtlisateur',
    data() {
        return {
            Nom: '',
            Prenom: '',
            Matricule: '',
            MotDePasse: '',
            Email: '',
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
            
            this.Nom = utilisateur.get("Nom");
            this.Prenom = utilisateur.get("Prénom");
            this.choix = utilisateur.get("admin");
            this.Email = utilisateur.get("email");
        },
        
        Valider() {
            alert('Valider appeler')
        }
    }
};
</script>


<style scoped></style>