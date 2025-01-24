import { createMemoryHistory, createRouter } from 'vue-router'

import AffichageMaterielView from './components/Materiel/AffichageMateriel.vue'
import AffichageUtilisateurView from './components/Utilisateur/AffichageUtilisateur.vue'
import ConnectionView from './components/Connexion.vue'
import CreationMateriel from './components/Materiel/CreationMateriel.vue'
import InfoUtilisateur from './components/Utilisateur/InfoUtilisateur.vue'
import LegalView from './components/About/LegalPage.vue'
import Contact from './components/About/ContactPage.vue'
import AboutPage from './components/About/AboutPage.vue'
import InfoMateriel from './components/Materiel/InfoMateriel.vue'
import CreationUtilisateur from './components/Utilisateur/CreationUtilisateur.vue'

const routes = [
  //Création de toutes les pages possibles
  { path: '/', component: AffichageMaterielView },
  { path: '/connection', component: ConnectionView },
  { path: '/utilisateur', component: AffichageUtilisateurView },
  { path: '/creation-materiel', component: CreationMateriel },
  { path: '/info-utilisateur/:id', component: InfoUtilisateur },
  { path: '/info-materiel/:id', component: InfoMateriel },
  { path: '/legalPage', component: LegalView },
  { path: '/contact', component: Contact },
  { path: '/about', component: AboutPage },
  { path: '/creation-utilisateur', component: CreationUtilisateur },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router