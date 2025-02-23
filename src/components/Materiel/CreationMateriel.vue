<template>
  <div class="has-background-color" style="min-height: 73vh;">
    <div v-if="isAdmin">
      <div class="container">
        <p class="title" style="padding-top: 1%; padding-bottom: 1%;">
          Creation d'un matériel
        </p>
      </div>

      <div class="container">
        <div class="field">
          <label class="label">Nom</label>
          <div class="control">
            <input class="input" type="text" v-model="nom" placeholder="Nom" required>
          </div>
          <p class="help is-danger" v-if="nameError">{{ nameError }}</p>
        </div>

        <div class="field">
          <label class="label">Type</label>
          <div class="control">
            <input class="input" type="text" v-model="type" placeholder="Type" required>
          </div>
          <p class="help is-danger" v-if="typeError">{{ typeError }}</p>
        </div>

        <div class="field">
          <label class="label">Version</label>
          <div class="control">
            <input class="input" type="text" v-model="version" placeholder="Version" required>
          </div>
          <p class="help is-danger" v-if="versionError">{{ versionError }}</p>
        </div>

        <div class="field">
          <label class="label">Référence</label>
          <div class="control">
            <input class="input" type="text" v-model="reference" placeholder="Ref : AN185 / AP748 / XX784" required>
          </div>
          <p class="help is-danger" v-if="referenceError">{{ referenceError }}</p>
        </div>

        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input class="input" type="text" v-model="imagePath" placeholder="URL de l'image" required>
          </div>
          <p class="help is-danger" v-if="imageError">{{ imageError }}</p>
        </div>

        <div v-if="imagePath && !imageError">
          <img :src="imagePath" alt="Aperçu" width="200" />
        </div>

        <div class="field">
          <label class="label">Numéro de téléphone</label>
          <div class="control">
            <input class="input" type="tel" v-model="telephone" @keydown="checkDigit" placeholder="ex : 0678145936"
              required>
          </div>
          <p class="help is-danger" v-if="telephoneError">{{ telephoneError }}</p>
        </div>
        <div class="field">
          <div class="columns is-centered">
            <div class="column is-narrow">
              <p class="control">
                <button class="button is-warning is-rounded is-center" type="submit" @click="creerMateriel()">
                  Créer le matériel
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
import { collection, addDoc,getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';
import router from '../../router.js';
import { getAuth } from 'firebase/auth';
import { useVerificationMateriel } from '../../verification.js'
import { ref, onMounted } from 'vue';


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
  name: 'creationMateriel',
  data() {
    // Données réactives utilisées dans le composant
    return {

      file: null,
      telephone: "",
      type: "",
      reference: "",
      version: "",
      nom: "",
      imagePath: "",
      nameError: "",
      versionError: "",
      referenceError: "",
      telephoneError: "",
      imageError: "",
      isAdmin : false,
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
    async creerMateriel() {
      let verif = false;
      try {
        // Réinitialisation des messages d'erreur avant la vérification
        this.nameError = "";
        this.versionError = "";
        this.referenceError = "";
        this.imageError = "";
        this.telephoneError = "";
        verif = useVerificationMateriel(this.nom, this.version, this.reference, this.imagePath, this.telephone);
      } catch (e) {
        // Gestion des erreurs
        for (const error of e) {
          if (error.code == 1) { this.nameError = error.message; }
          if (error.code == 2) { this.versionError = error.message; }
          if (error.code == 3) { this.referenceError = error.message; }
          if (error.code == 4) { this.imageError = error.message; }
          if (error.code == 5) { this.telephoneError = error.message; }
        }
      }

      if (verif) {
        // Si les données sont valides, mise à jour dans la base de données Firestore
        const docRef = await addDoc(collection(db, "materiels"), {
          Nom: this.nom,
          Type: this.type,
          Version: this.version,
          Reference: this.reference,
          Photo_url: this.imagePath,
          Numero: parseInt(this.telephone),
          RéserverPar: ""
        });
        console.log("Document inséré avec ID: ", docRef.id);
        document.getElementById("message").innerText = "Matériel crée";
        router.push("/");
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