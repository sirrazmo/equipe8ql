<template>
  <header>
    <nav class="navbar has-background-color-header has-text-color-header" role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item ">
            <RouterLink to="/">Equipements</RouterLink>
          </a>

          <a class="navbar-item">
            <RouterLink to="/creation-materiel">Créer un matériel</RouterLink>
          </a>

          <a class="navbar-item">
            <RouterLink to="/utilisateur">Utilisateurs</RouterLink>
          </a>

          <a class="navbar-item">
            <RouterLink to="/creation-utilisateur">Créer un utilisateur</RouterLink>
          </a>

        </div>
        <div class="navbar-end">

          <a class="navbar-item">
            <p class="has-text-weight-light is-italic is-size-7" id="message"></p>
          </a>

          <a class="navbar-item">
            <p id="nomUser"></p>
          </a>

          <div class="navbar-item">
            <a class="button is-dark">
              <RouterLink id="CO" to="/connection">Connexion</RouterLink>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="footer breadcrumb has-bullet-separator is-centered has-background-color-header has-text-color-header"
    aria-label="breadcrumbs">
    <ul>
      <li>
        <RouterLink to="/legalPage" style="color: #fff">Legal</RouterLink>
      </li>
      <li>
        <RouterLink to="/contact" style="color: #fff">Contact</RouterLink>
      </li>
      <li>‎ ‎ ‎ © 2024 Polytech Tours ‎ ‎ ‎ </li>
      <!-- ‎  permet de créer un caractère spécial vide (pour mettre de l'espace)-->
      <li>‎ ‎ ‎ Version 1.0 ‎ ‎ ‎ </li>
      <li>
        <RouterLink to="/about" style="color: #fff">About</RouterLink>
      </li>

    </ul>
  </footer>
</template>

<script>

document.addEventListener('DOMContentLoaded', () => {

  // Avoir tout les "navbar-burger" éléments
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Ajoute un click event sur chaque élément
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

      document.body.classList.toggle('navbar-reduced');
    });
  });

});
</script>


<style scoped>
/* Couleurs par défaut (mode clair) */

.has-background-color {
  background-color: hsl(30, 56%, 90%);
}

.has-background-color-header {
  background-color: hsl(30, 56%, 50%);
}

.has-text-color-header,
a {
  color: white;
}

a:hover {
  background-color: hsl(30, 56%, 65%);
}

.has-text-color {
  color: black;
}

.navbar-reduced .navbar a {
  color: black;
}

/* Couleurs pour le mode sombre */
@media (prefers-color-scheme: dark) {

  .has-background-color {
    background-color: hsl(0, 0%, 14%);
  }

  .has-background-color-header {
    background-color: hsl(0, 0%, 7%);
  }

  .has-text-color,
  a,
  .has-text-color-header {
    color: white;
  }

  a:hover {
    background-color: hsl(0, 0%, 20%);
  }

  .navbar-reduced .navbar a {
    color: white;
  }

}
</style>
