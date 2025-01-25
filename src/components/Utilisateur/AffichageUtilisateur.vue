<template>
  <div class="has-background-color" style="min-height: 73vh;">
    <div v-if="isAdmin">
      <table class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Administrateur</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="utilisateurs in utilisateurs" :key="utilisateurs.id">
            <td>{{ utilisateurs.Prénom }}</td>
            <td>{{ utilisateurs.Nom }}</td>
            <td>{{ utilisateurs.admin }}</td>
            <td>{{ utilisateurs.email }}</td>
            <td><button class="button is-primary is-rounded is-center"
                @click="getInfoUtilisateurs(utilisateurs.id)">Consulter</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';
import router from '../../router.js';
import { getAuth } from 'firebase/auth';
export default {
  name: 'FirestoreExample',

  data() {
    return {
      isAdmin : false,
    }
  },

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

  setup() {
    //Affichage des utilisateurs
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

    getInfoUtilisateurs(idUser) {
      console.log(idUser);
      router.push({ path: `/info-utilisateur/${idUser}` });
    }
  }
};
</script>

<style scoped>
.table {
  background-color: hsl(30, 56%, 90%);
  width: 100%;
}

@media (prefers-color-scheme: dark) {
  .table {
    background-color: hsl(0, 0%, 14%);
    width: 100%;
  }
}
</style>