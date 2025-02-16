import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css";
import pinia from './store/createPinia'

const app = createApp(App);
app.use(router)
app.mount('#app')
app.use(pinia)