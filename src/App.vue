<template>
  <header>
    <nav class="navbar has-background-color-header has-text-color-header" role="navigation" aria-label="main navigation">
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
            <RouterLink to="/">Equipments</RouterLink>
          </a>

          <a class="navbar-item">
            <RouterLink to="/utilisateur">Users</RouterLink>
          </a>

          <a class="navbar-item">
            <RouterLink to="/creation-materiel">Create a material</RouterLink>
          </a>

          <a class="navbar-item">
              <RouterLink to=/info-utilisateur>Info utilisateur</RouterLink>
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="button is-dark">
              <RouterLink to="/connection">Login</RouterLink>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="footer breadcrumb has-bullet-separator is-centered has-background-color-header has-text-color-header" aria-label="breadcrumbs">
    <ul>
      <li><RouterLink to="/legalPage" style="color: #fff">Legal</RouterLink></li>
      <li><RouterLink to="/contact" style="color: #fff">Contact</RouterLink></li>
      <li>‎ ‎ ‎  © 2024 Polytech Tours ‎ ‎ ‎ </li> <!-- ‎  permet de créer un caractère spécial vide (pour mettre de l'espace)-->
      <li>‎ ‎ ‎ Version 1.0 ‎ ‎ ‎ </li>
      <li><RouterLink to="/about" style="color: #fff">About</RouterLink></li>

    </ul>
  </footer>



</template>


<style scoped>
/* Couleurs par défaut (mode clair) */
.has-background-color {
  background-color: hsl(30, 56%, 90%);
}

.has-background-color-header {
  background-color: hsl(30, 56%, 50%);
}

.has-text-color-header, a {
  color : white;
}

a:hover{
  background-color: hsl(30, 56%, 65%);
}

.has-text-color {
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

.has-text-color, a, .has-text-color-header{
  color: white;
}

a:hover{
  background-color: hsl(0, 0%, 20%);
}

}
</style>


<!-- Ici le code pour que le menu burger marche-->
<script>
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});
</script>
