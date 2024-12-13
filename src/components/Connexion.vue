<template>
  <div class="has-background-color" style="min-height: 73vh;">
    <div class="container is-max-tablet">
      <br>
      <div class="container has-text-centered">
        <h1 class="title is-center has-text-color">Connexion</h1>
      </div>
      <br>

        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="email" id="email" required v-model="email">
            <span class="icon is-small is-left">
              <i class="fa-solid fa-id-card-clip"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Mot de passe" id="password" required v-model="password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field columns is-centered column is-narrow">
          <p class="control">
            <button class="button is-warning is-rounded is-center" @click="connexion">
              Connexion
            </button>
          </p>
          <br>
        </div>
    </div>
  </div>
</template>


<script>

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  /* eslint-disable */
  name: 'connexion',
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async connexion() {

      const auth = getAuth();
      console.log("CONNEXION");
      console.log(this.email);
      console.log(this.password)
      signInWithEmailAndPassword(auth, this.email, this.password)   
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('SIGNED IN');
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
};


</script>


<style></style>