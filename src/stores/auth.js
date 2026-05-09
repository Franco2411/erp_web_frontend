import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Variables reactivas (El estado global)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = ref(!!token.value)

  // Función para conectarse al backend
  const login = async (username, password) => {
    try {
      // ATENCIÓN: FastAPI exige que el login se envíe como "Formulario" (URLSearchParams), NO como JSON.
      const params = new URLSearchParams()
      params.append('username', username)
      params.append('password', password)

      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      })

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos')
      }

      const data = await response.json()
      
      // Guardamos el token en la memoria de Vue y en el navegador para no perderlo al recargar
      token.value = data.access_token
      isAuthenticated.value = true
      localStorage.setItem('token', data.access_token)

      return { success: true }
    } catch (error) {
      console.error("Error en login:", error)
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }

  return { token, isAuthenticated, login, logout }
})