import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import debunce from "./directives/debounce.js"
const app = createApp(App);
app.directive('debunce', debunce);
app.use(router).mount('#app')
