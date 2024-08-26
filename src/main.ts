/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.config.errorHandler = (err) => {
  const e = new CustomEvent('mostrarMensagem', {detail: {
    mensagem: err instanceof Error ? err.message : String(err),
    tipo: 'erro',
  }});

  document.querySelector('.v-application')?.dispatchEvent(e);
}

registerPlugins(app)

app.mount('#app')
