import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { useTemplateStore } from './stores/templates'

const pinia = createPinia()

const app = createApp(App)
    .use(pinia)
    .use(router)

// Load initial templates data
const templateStore = useTemplateStore()
templateStore.loadTemplates()

app.mount('#app')
