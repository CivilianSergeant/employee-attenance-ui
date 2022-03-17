import { createRouter, createWebHashHistory } from 'vue-router'
import ReadFile from '../views/ReadFile.vue'
import Report from '../views/Report.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ReadFile
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
