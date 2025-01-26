import CreateKnightView from '@/views/CreateKnightView.vue'
import EditKnight from '@/views/EditKnight.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create-knight',
    name: 'create knight',
    component: CreateKnightView,
  },
  {
    path: '/edit-knight/:id',
    name: 'edit',
    component: EditKnight,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
