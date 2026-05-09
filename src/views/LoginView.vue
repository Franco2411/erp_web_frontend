<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('') // Para mostrar si hay error

const handleLogin = async () => {
  errorMessage.value = '' // Limpiamos errores previos
  
  // Llamamos a la función de nuestro almacén
  const result = await authStore.login(username.value, password.value)
  
  if (result.success) {
    // Si el backend nos dio luz verde, lo mandamos al panel
    router.push('/dashboard')
  } else {
    // Si falló, mostramos el error
    errorMessage.value = result.error
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Acceso al Sistema</h2>
    
    <!-- El @submit.prevent evita que la página se recargue al mandar el formulario -->
    <form @submit.prevent="handleLogin">
      
      <div class="form-group">
        <label>Usuario</label>
        <input type="text" v-model="username" required>
      </div>
      
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="password" required>
      </div>
      
      <p v-if="errorMessage" style="color: red; font-size: 0.85rem; margin-bottom: 10px;">{{ errorMessage }}</p>

      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 350px;
  /* Centrado vertical y horizontal básico */
  margin: 10vh auto; 
  padding: var(--spacing-lg);
  
  /* Usamos los colores y bordes del sistema */
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05); /* Sombrita sutil */
}

h2 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--color-primary);
}

.form-group {
  margin-bottom: var(--spacing-md);
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

input {
  /* El ancho y padding ya vienen del base.css */
  width: 100%;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: var(--spacing-sm);
  background-color: var(--color-primary);
  color: white;
  border: none;
  font-weight: bold;
}

button:hover {
  background-color: var(--color-primary-hover);
}
</style>