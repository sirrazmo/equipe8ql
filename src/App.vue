<template>
  <div id="app">
    <h1> Page principale</h1>
    <Connexion />
  </div>
</template>

<script>
import Connexion from './components/Connexion.vue';

export default {
  name: 'App',
  components: {
    Connexion,
  },
};
</script>

<style></style>