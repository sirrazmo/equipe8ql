<template>
  <div class="has-background-color" style="min-height: 73vh;">
    <table class="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Version</th>
                <th>Numero</th>
                <th>Photo</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="materiel in materiels" :key="materiel.id">
                <td>{{ materiel.Nom }}</td>
                <td>{{ materiel.Type }}</td>
                <td>{{ materiel.Version }}</td>
                <td>{{ materiel.Numero }}</td>
                <td><img :src=materiel.photo_url /></td>
                <td><button class="button is-primary is-rounded is-center" @click="getInfoMat">Consulter</button></td>
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

export default {
  name: 'FirestoreExample',
  setup() {
    const materiels = ref([]);

    const fetchMateriels = async () => {
      const queryMaterielsSnapshot = await getDocs(collection(db, 'materiels'));
      materiels.value = queryMaterielsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    onMounted(() => {
      fetchMateriels();
    });

    return {
      materiels,
    };
  },
  methods: {
    getInfoMat() {
      router.push("/info-materiel");
    }
  }
};
</script>