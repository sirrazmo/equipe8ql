<!-- src/components/FirestoreExample.vue -->
<template>
  <div>
    <h1>Firestore Example</h1>
    <ul>
      <li v-for="materiels in materiels" :key="materiels.id">
        {{ materiels.ID }} <br>
        {{ materiels.type }} <br>
        {{ materiels.phone }} <br>
      </li>
    </ul>
  </div>
</template> 

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

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
};
</script>