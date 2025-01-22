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
                <td>
                  <figure class="image is-128x128 is-center">
                    <img :src=materiel.Photo_url />
                  </figure>
                </td>
                <td><button class="button is-warning is-rounded is-center" @click="getInfoMat(materiel.id)">Consulter</button></td>
            </tr>
        
        </tbody>
    </table>
  </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import router from '../router.js';

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
    getInfoMat(idMat) {
      router.push({path:`/info-materiel/${idMat}`});
    }
  }
};
</script>
<style scoped>
.image img {
  max-width: 100%; 
  max-height: 128px; 
  object-fit: contain; 
  border: 1px solid #ddd;
  padding: 5px;
}
</style>