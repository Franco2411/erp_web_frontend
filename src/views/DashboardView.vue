<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Conectamos el botón de salida
const handleLogout = () => {
  authStore.logout()      // Borra el token de la memoria
  router.push('/')        // El guardia de seguridad nos manda al Login
}
</script>

<template>
  <div class="app-layout">
    
    <!-- ==========================================
         BARRA LATERAL (SIDEBAR)
         ========================================== -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <!-- Acá luego pondremos el logo de tu PWA -->
        <h2>ERP Industrial</h2> 
      </div>
      
      <nav class="sidebar-nav">
        <!-- Estos botones por ahora son visuales, luego los conectaremos a las rutas -->
        <a href="#" class="nav-item active">Panel Principal</a>
        <a href="#" class="nav-item">Punto de Venta</a>
        <a href="#" class="nav-item">Catálogo</a>
        <a href="#" class="nav-item">Inventario</a>
      </nav>
      
      <div class="sidebar-footer">
        <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
      </div>
    </aside>

    <!-- ==========================================
         ÁREA PRINCIPAL DE TRABAJO
         ========================================== -->
    <main class="main-content">
      <header class="topbar">
        <h3>Panel de Control</h3>
        <div class="user-info">
          <span>Operario Activo</span>
        </div>
      </header>
      
      <!-- Acá adentro va a ir cambiando el contenido según qué botón toquemos -->
      <div class="content-area">
        <div class="card">
          <h4>Bienvenido a la línea</h4>
          <p>La estructura visual base está montada. Seleccioná una estación de trabajo en el menú lateral para comenzar a operar.</p>
        </div>
      </div>
    </main>
    
  </div>
</template>

<style scoped>
/* Contenedor maestro que ocupa toda la pantalla */
.app-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* --- ESTILOS DE LA BARRA LATERAL --- */
.sidebar {
  width: 260px;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  z-index: 10;
}

.sidebar-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-primary-hover);
  text-align: center;
}

.sidebar-header h2 {
  color: white;
  font-size: 1.5rem;
}

.sidebar-nav {
  flex: 1; /* Empuja el footer hacia abajo */
  padding: var(--spacing-md) 0;
  display: flex;
  flex-direction: column;
}

.nav-item {
  color: #bdc3c7;
  text-decoration: none;
  padding: 12px var(--spacing-lg);
  font-weight: 600;
  transition: all 0.2s;
  border-left: 4px solid transparent;
}

.nav-item:hover {
  background-color: var(--color-primary-hover);
  color: white;
}

.nav-item.active {
  background-color: var(--color-primary-hover);
  color: white;
  border-left-color: var(--color-secondary); /* Un detalle naranja para indicar dónde estamos */
}

.sidebar-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-primary-hover);
}

.logout-btn {
  background-color: transparent;
  border: 1px solid #bdc3c7;
  color: #bdc3c7;
}

.logout-btn:hover {
  background-color: #c0392b; /* Rojo alerta al pasar el mouse */
  border-color: #c0392b;
  color: white;
}

/* --- ESTILOS DEL ÁREA PRINCIPAL --- */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
}

.topbar {
  background-color: var(--color-surface);
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.topbar h3 {
  color: var(--color-text-main);
}

.user-info {
  font-weight: 600;
  color: var(--color-text-muted);
}

.content-area {
  padding: var(--spacing-lg);
  flex: 1;
  overflow-y: auto; /* Permite scrollear si hay muchas tablas */
}

/* Una tarjeta estándar para mostrar información */
.card {
  background-color: var(--color-surface);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.card h4 {
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
}
</style>