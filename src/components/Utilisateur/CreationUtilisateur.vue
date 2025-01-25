<template>
    <div class="has-background-color" style="min-height: 73vh;">
        <div v-if="isAdmin">
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
                        <label><input type="radio" v-model="admin" :value=true> Oui</label>
                        <br>
                        <label><input type="radio" v-model="admin" :value=false checked> Non</label>
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
                        <input class="input" type="password" v-model="password" placeholder="Mot de passe" required>
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
       

    </div>
</template>

<script>
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, firebaseConfig } from '../../firebase.js';
import router from '../../router.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useVerificationUtilisateur } from '../../verification.js'
import { ref, onMounted } from 'vue';
import { initializeApp } from "firebase/app";


export default {
    async mounted() {
        
        const auth = getAuth(); // Récupération de l'instance d'authentification Firebase
        if (!auth.currentUser) {
            // Vérification si l'utilisateur est connecté
            alert("Vous n'êtes pas connecté, connectez-vous pour accéder à la page.");
            router.push("/"); // Redirection vers la page d'accueil
        } else {
            // Vérification des droits d'accès pour un utilisateur non administrateur
            await this.fetchUtilisateurs();
        
            const currentUser = this.utilisateurs.find(
                (utilisateur) => utilisateur.email === auth.currentUser.email
            );

            if (!currentUser.admin) {
                alert("Vous n'êtes pas autorisé à accéder à cette page.");
                router.push("/"); // Redirection vers la page d'accueil
            }
        }
        this.isAdmin = true;
    },
    name: 'creationUtilisateur',
    data() {
        // Données réactives utilisées dans le composant
        return {
            file: null,
            email: "",
            admin: false,
            prenom: "",
            nom: "",
            password: "",
            matricule: "",
            nomError: "",
            prenomError: "",
            emailError: "",
            passwordError: "",
            matriculeError: "",
            isAdmin : false,
            firebaseConfigAuth : firebaseConfig,
        };
    },

    setup() {
        const utilisateurs = ref([]);

        const fetchUtilisateurs = async () => {
        const queryUtilisateursSnapshot = await getDocs(collection(db, 'utilisateurs'));
        utilisateurs.value = queryUtilisateursSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        };

        onMounted(() => {
            fetchUtilisateurs();
        });

        return {
        utilisateurs,
        fetchUtilisateurs,
        };
    },

    methods: {
        async creerUtilisateur() {
            
            let verif = false;
            try {
                // Réinitialisation des messages d'erreur avant la vérification
                this.nomError = "";
                this.prenomError = "";
                this.emailError = "";
                this.passwordError = "";
                this.matriculeError = "";
                verif = useVerificationUtilisateur(this.nom, this.prenom, this.email, this.password, this.matricule);
            } catch (e) {
                // Gestion des erreurs
                for (const error of e) {
                    if (error.code == 1) { this.nomError = error.message; }
                    if (error.code == 2) { this.prenomError = error.message; }
                    if (error.code == 4) { this.emailError = error.message; }
                    if (error.code == 5) { this.passwordError = error.message; }
                    if (error.code == 3) { this.matriculeError = error.message; }
                }
            }
            if (verif) {
                // Si les données sont valides, mise à jour dans la base de données Firestore
               console.log(this.admin);
                const docRef = await addDoc(collection(db, "utilisateurs"), {
                    Matricule: this.matricule,
                    Nom: this.nom,
                    Prénom: this.prenom,
                    admin: this.admin,
                    email: this.email.toLowerCase(),
                });

                // Initialise une nouvelle instance Firebase
                const authApp = initializeApp(this.firebaseConfigAuth,"authApp");
                //Récupère l'authentification de cette nouvelle instance
                var detachedAuth = getAuth(authApp);
                // Ajout dans l'authentification
                createUserWithEmailAndPassword(detachedAuth,this.email, this.password);
                
                console.log("Document inséré avec ID: ", docRef.id);
                document.getElementById("message").innerText = "Utilisateur " + this.prenom + '.' + this.nom + " créé.";
                router.push("/");
                setTimeout(() => { document.getElementById("message").innerText = ""; }, 3000);
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