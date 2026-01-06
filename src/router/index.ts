import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue'
// import Records from '../views/Records.vue'
// import Models from '../views/Models.vue'
import Settings from '../views/Settings.vue'

const routes = [
  { path: '/', redirect: '/profile' },
  { path: '/profile', component: Profile },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
