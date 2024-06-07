import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-dark-purple/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import { checkIfCookieExists } from './stores/requests';

const app = createApp(App)
app.use(PrimeVue);
app.use(createPinia())
app.use(router)



router.beforeEach((to, from, next) => {
    if (!checkIfCookieExists("token") && to.path !== '/default' && to.path !== '/login' && to.path !== '/register' && to.path !== '/') {
        next('/default');
    } else {
        next();
    }
});

app.mount('#app')
