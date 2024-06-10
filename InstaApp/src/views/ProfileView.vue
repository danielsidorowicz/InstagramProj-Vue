<template>
    <div class="profileAll">
        <div class="logoDivProfile" id="logoDivProfile">
            <RouterLink to="/">
                <img src="../assets/AppLogo.png" alt="AppLogo">
            </RouterLink>
        </div>
        <div class="profileInfo">
            <div class="pfpImg">
                <img :src="userStore.pfpBase64" alt="Profile Picture">
            </div>
            <div class="userInfo">
                <h1>Imie: {{ userStore.user.name }}</h1>
                <h1>Nazwisko: {{ userStore.user.lastName }}</h1>
                <h1>{{ userStore.email }}</h1>
            </div>
            <router-link to="/editProfile"><Button label="Edytuj Profil" /></router-link>
        </div>
        <h1>Posts</h1>
        <div class="profilePosts" v-if="imagesLoaded">
            <div class="yourPost"  v-for="image in imagesStore.images">
                <Image v-if="checkUserName(image)" :key="image.id" :src="image.base64" alt="Image" width="200" preview />
            </div>
        </div>
        <div v-else>
            <h1>Loading</h1>
        </div>
    </div>
</template>
<script>
import Image from 'primevue/image';
import Button from 'primevue/button';
import { useUserStore } from '@/stores/userEmailStore';
import { useImageStore } from '@/stores/useImageStore';

export default {
    components: {
        Image,
        Button
    },
    data() {
        return {
            imagesLoaded: false,
            imagesStore: useImageStore(),
            userStore: useUserStore()
        };
    },
    methods: {
        checkImagesLoaded() {
            this.imagesLoaded = this.imagesStore.images.length > 0
        },

        checkUserName(image) {
            return image.user == this.userStore.email
        }
    },
    mounted() {
        this.imagesStore.setImages()
    },
    computed: {
        loggedIn() {
            return getCookie('token');
        }
    },
    watch: {
        'imagesStore.images'(newImages) {
            if(!this.imagesStore.imagesGotData){
                this.imagesLoaded = newImages.length > 0;
            } else {
                this.imagesLoaded = true
            }
        }
    }
}
</script>
<style>
    .profileAll {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap:50px;
    }

    .profileInfo {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center
    }

    .profileInfo a {
        height: 33px;
    }

    .pfpImg {
        width: 150px;
        height: 150px;
    }

    .pfpImg img {
        width: 150px;
        height: 150px;
    }

    .logoDivProfile {
        width: 200px;
        height: 100px;
        /* height: fit-content; */
        /* padding: 20px; */

        display: flex;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .logoDivProfile img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        margin-left:auto;
        margin-right:auto;
        transform: scale(0.95);
        transition: 0.3s;
    } 

    .logoDivProfile img:hover {
        transform: scale(1);
        transition: 0.3s;
    } 

    .profilePosts {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
    }
</style>