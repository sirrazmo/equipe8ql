<template>
  <header>
    <nav class="breadcrumb is-large has-bullet-separator" aria-label="breadcrumbs">
      <div class="is-flex is-justify-content-space-between is-align-items-center" style="width: 100%;">
        <ul class="is-flex">
          <li><RouterLink to="/">Equipments</RouterLink></li>
          <li><RouterLink to="/utilisateur">Users</RouterLink></li>
        </ul>
        <ul>
          <li><RouterLink to="/connection">Login</RouterLink></li>
        </ul>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
  </footer>




</template>

<style>

</style>
