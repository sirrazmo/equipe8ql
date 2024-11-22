<template>
  <header>
    <nav class="navbar has-background-black-bis" role="navigation" aria-label="main navigation">
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
          <a class="navbar-item">
            <RouterLink to="/">Equipments</RouterLink>
          </a>

          <a class="navbar-item">
            <RouterLink to="/utilisateur">Users</RouterLink>
          </a>

          <a class="navbar-item">
            <RouterLink to="/creation-materiel">Create a material</RouterLink>
          </a>

          <a class="navbar-item">
              <RouterLink to=/infoMateriel>Info utilisateur</RouterLink>
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

  <footer class="footer breadcrumb is-centered" aria-label="breadcrumbs">
    <ul>
      <li><RouterLink to="/legal">Legal</RouterLink></li>
      <li><RouterLink to="/contact">Contact</RouterLink></li>
      <li><RouterLink to="/copyrigth">Copyright</RouterLink></li>
      <li><RouterLink to="/version">Version</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>

    </ul>
  </footer>



</template>

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
