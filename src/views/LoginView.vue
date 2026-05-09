<script setup>
import { ref } from 'vue'

// Estas variables reactivas van a atrapar lo que el usuario escriba
const username = ref('')
const password = ref('')

// Esta es la función que se dispara al apretar el botón
const handleLogin = () => {
  console.log("Intentando iniciar sesión con el usuario:", username.value)
  // Acá conectaremos los cables con FastAPI en el próximo paso
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
      
      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<style scoped>
/* Un diseño rápido para que parezca un sistema real */
.login-container {
  max-width: 350px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-family: sans-serif;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
input {
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #1a252f;
}
</style>