import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './components/HelloWorld.vue'
import ConnectionView from './components/Connexion.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/connection', component: ConnectionView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router