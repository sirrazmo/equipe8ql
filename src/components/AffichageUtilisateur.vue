<template>
    <div class="has-background-color" style="min-height: 73vh;">
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
                <td><button class="button is-primary is-rounded is-center" @click="getInfoUtilisateurs">Consulter</button></td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import router from '@/router.js';
import { getAuth } from 'firebase/auth';
export default {
  name: 'FirestoreExample',

  async mounted() {
    const auth = getAuth();
    if (!auth.currentUser) {
      alert("Vous n'êtes pas connecté, connectez-vous pour accéder à la page.");
      router.push("/");
    }
    else {
      if (auth.currentUser.email != "admin@admin.com") {
        alert("Vous n'êtes pas autorisé à accéder à cette page.");
        router.push("/");
      }
    }
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
    };
  },
  methods: {
    getInfoUtilisateurs() {
      router.push("/info-utilisateur");
    }
  }
};
</script>