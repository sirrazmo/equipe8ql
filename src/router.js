import { createMemoryHistory, createRouter } from 'vue-router'

import AffichageMaterielView from './components/AffichageMateriel.vue'
import AffichageUtilisateurView from './components/AffichageUtilisateur.vue'
import ConnectionView from './components/Connexion.vue'
import CreationMateriel from './components/CreationMateriel.vue'
import ModifAjoutUtilisateur from './components/ModifAjoutUtilisateur.vue'

const routes = [
  { path: '/', component: AffichageMaterielView },
  { path: '/connection', component: ConnectionView },
  {path: '/utilisateur', component: AffichageUtilisateurView},
  {path: '/creation-materiel', component: CreationMateriel},
  {path: '/ModifAjoutUtilisateur', component : ModifAjoutUtilisateur}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router