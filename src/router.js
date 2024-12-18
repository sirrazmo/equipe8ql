import { createMemoryHistory, createRouter } from 'vue-router'

import AffichageMaterielView from './components/AffichageMateriel.vue'
import AffichageUtilisateurView from './components/AffichageUtilisateur.vue'
import ConnectionView from './components/Connexion.vue'
import CreationMateriel from './components/CreationMateriel.vue'
import ModifAjoutUtilisateur from './components/ModifAjoutUtilisateur.vue'
import LegalView from './components/LegalPage.vue'
import Contact from './components/ContactPage.vue'
import AboutPage from './components/AboutPage.vue'
import InfoMateriel from './components/InfoMateriel.vue'

const routes = [
  { path: '/', component: AffichageMaterielView },
  { path: '/connection', component: ConnectionView },
  {path: '/utilisateur', component: AffichageUtilisateurView},
  {path: '/creation-materiel', component: CreationMateriel},
  {path: '/info-utilisateur', component : ModifAjoutUtilisateur},
  {path: '/info-materiel', component : InfoMateriel},
  {path: '/legalPage', component: LegalView},
  {path: '/contact', component:Contact},
  {path: '/about', component:AboutPage}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router