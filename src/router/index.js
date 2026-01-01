import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import HomeView from '../views/HomeView.vue'
import api from '../services/api'

const routes = [
  {
    path: '/',
    name : "Home",
    component : HomeView,
    meta: { requiresAuth : true}
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView
  },
  {

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach( async (to , from , next) =>{
  if (to.meta.requiresAuth){
    const token = localStorage.getItem('token')
    if (!token){
      next('/login')
      return
    }

    try{
      await api.post('/validate' )
      next()
    }
    catch(error){
      localStorage.removeItem('token')
      next('/login')
    }
  }

  else{
    next()
  }
})

export default router
