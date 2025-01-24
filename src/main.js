import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import "bulma/css/bulma.css"


import { db, auth } from './firebase.js';

const app = createApp(App).use(router);

app.config.globalProperties.$db = db;
app.config.globalProperties.$auth = auth;

app.mount('#app');