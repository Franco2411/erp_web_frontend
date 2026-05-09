import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '../stores/auth' // Importamos nuestro almacén de llaves

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      // Esta meta-etiqueta indica que esta pantalla es solo para visitas (sin loguear)
      meta: { requiresGuest: true } 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      // Esta meta-etiqueta es el cartel de "Solo Personal Autorizado"
      meta: { requiresAuth: true } 
    }
  ],
})

// ==========================================
// EL GUARDIA DE SEGURIDAD (Navigation Guard)
// ==========================================
// Esto se ejecuta SIEMPRE antes de que el usuario cambie de pantalla
router.beforeEach((to, from, next) => {
  // Llamamos al guardia de Pinia ACÁ ADENTRO (muy importante para que Vue no tire error al arrancar)
  const authStore = useAuthStore() 
  const isAuthenticated = authStore.isAuthenticated

  // Escenario 1: Quiere entrar a una zona privada y NO tiene credencial
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn("Acceso denegado: Redirigiendo al Login")
    next({ name: 'login' }) // Lo mandamos a la puerta
  } 
  // Escenario 2: Ya está logueado, pero intenta ir a la pantalla de Login otra vez
  else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'dashboard' }) // Lo mandamos de vuelta al trabajo
  } 
  // Escenario 3: Todo en orden, puede pasar
  else {
    next()
  }
})

export default router