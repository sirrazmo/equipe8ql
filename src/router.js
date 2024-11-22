import { createMemoryHistory, createRouter } from 'vue-router'

import AffichageMaterielView from './components/AffichageMateriel.vue'
import AffichageUtilisateurView from './components/AffichageUtilisateur.vue'
import ConnectionView from './components/Connexion.vue'

const routes = [
  { path: '/', component: AffichageMaterielView },
  { path: '/connection', component: ConnectionView },
  {path: '/utilisateur', component: AffichageUtilisateurView}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router