import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-dark-purple/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue'
import router from './router'
import { checkIfCookieExists } from './stores/requests';
import { useTagsStore } from './stores/useTagsStore'
import { useImageStore } from './stores/useImageStore'
import { usePhotoIdStore } from './stores/usePhotoIdStore'

const app = createApp(App)

let pinia = createPinia()

pinia.use(piniaPluginPersistedstate);
app.use(PrimeVue);
app.use(pinia)
app.use(router)

const tagsStore = useTagsStore()
tagsStore.setTags()

function setTagsAgain() {
    tagsStore.setTags()
}

const imagesStore = useImageStore()
imagesStore.setImages()


// console.log(tagsStore.tags);

router.beforeEach((to, from, next) => {
    // console.log(checkIfCookieExists("token"));
    if (!checkIfCookieExists("token") && to.path != "/default" && to.path != "/login" && to.path != "/register" && to.path != "/") {
        next('/default');
    } else {
        next();
    }
});

app.mount('#app')

export default setTagsAgain
