<template>
    <div class="container">
        <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">
          Bienvenue sur votre appli
        </p>
        <p class="subtitle">
          Votre application de réservation
        </p>
      </div>
    </section>
  </div>

  <div class="container">
    <section class="hero is-info">
      <br>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Matricule">
          <span class="icon is-small is-left">
            <i class="fa-solid fa-id-card-clip"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <div class="columns is-centered">
          <div class="column is-narrow">
            <p class="control">
              <button class="button is-warning is-rounded is-center">
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>

export default {
/* eslint-disable */
  name: 'connexion',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>