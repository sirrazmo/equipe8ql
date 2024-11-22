<template>
  <div class="has-background-black-ter" style="min-height: 95vh;">
    <div class="container is-max-tablet">
      <br>
      <div class="container has-text-centered">
        <h1 class="title is-center has-text-white">Connection</h1>
      </div>
      <br>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Registration number" id="matricule" required>
          <span class="icon is-small is-left">
            <i class="fa-solid fa-id-card-clip"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" id="password" required>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <div class="columns is-centered">
          <div class="column is-narrow">
            <p class="control">
              <button class="button is-warning is-rounded is-center" onclick="verificationFormulaire">
                Connect
              </button>
            </p>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>




export default {
  /* eslint-disable */
  name: 'connexion',
  data() {
    return {
      matricule: '',
      password: ''
    };
  },

  methods: {
    verificationFormulaire() {
      if (matricule == '') {
        alert('Veuillez indiquer votre matricule')
      }
      else if (mdp == '') {
        alert('Veuillez indiquer votre mot de passe')
      }
      else {
        alert('Connexion effectuée')
      }
      console.log('La fonction a été appelée');
    }
  }
};

</script>


<style scoped></style>