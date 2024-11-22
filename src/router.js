import { createMemoryHistory, createRouter } from 'vue-router'

import AffichageMaterielView from './components/AffichageMateriel.vue'
import AffichageUtilisateurView from './components/AffichageUtilisateur.vue'
import ConnectionView from './components/Connexion.vue'
import CreationMateriel from './components/CreationMateriel.vue'

const routes = [
  { path: '/', component: AffichageMaterielView },
  { path: '/connection', component: ConnectionView },
  {path: '/utilisateur', component: AffichageUtilisateurView},
  {path: '/creation-materiel', component: CreationMateriel}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router