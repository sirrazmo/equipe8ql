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
          <td><button class="button is-primary is-rounded is-center"
              @click="getInfoUtilisateurs(utilisateurs.id)">Consulter</button></td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
//import { collection, getDocs } from 'firebase/firestore';
//import { db } from '../firebase.js';
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
      const listAllUsers = (nextPageToken) => {
        // List batch of users, 1000 at a time.
        getAuth().listUsers(1000, nextPageToken)
          .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
              console.log('user', userRecord.toJSON());
            });
            if (listUsersResult.pageToken) {
              // List next batch of users.
              listAllUsers(listUsersResult.pageToken);
            }
          })
          .catch((error) => {
            console.log('Error listing users:', error);
          });
      };
      // Start listing users from the beginning, 1000 at a time.
      listAllUsers();



      /*const queryUtilisateursSnapshot = await getDocs(collection(db, 'utilisateurs'));
      utilisateurs.value = queryUtilisateursSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));*/
    };

    onMounted(() => {
      fetchUtilisateurs();
    });

    return {
      utilisateurs,
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