<template>
    <div class="allMain">
        <nav>
            <div class="navLeft" id="navLeft">
                <RouterLink to="/" class="navbar-item">
                    <img src="../assets/AppLogo.png" alt="AppLogo">
                </RouterLink>
            </div>
            <div class="navMiddle" id="navMiddle"></div>
            <div class="navRight" id="navRight" >
                <Menubar :items="menuItems" v-if="loggedIn" />
                <Menubar :items="menuItemsLogin" v-else />
            </div>
        </nav>
        <div class="photosPresent" v-if="imagesLoaded">
            <PostDisplay v-for="image in imagesStore.images" :key="image.id" :image="image"/>
        </div>
        <div class="loading" v-else>
            <h1>Loading...</h1>
        </div>
    </div>
</template>

<script>
import { getCookie } from '@/stores/requests';
import { RouterLink } from 'vue-router'
import Menubar from '../components/MenuBar.vue';
import PostDisplay from '../components/PostDisplay.vue'
import { useImageStore } from '@/stores/useImageStore';

export default {
    components: {
        Menubar,
        PostDisplay
    },
    data() {
        return {
            menuItems: [
                {
                    label: 'Dodaj zdjęcie',
                    to: 'addPhoto',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Profil',
                    to: 'profile',
                    icon: 'pi pi-user'
                }
            ],
            menuItemsLogin: [
                {
                    label: 'Zaloguj się',
                    to: 'login',
                    icon: 'pi pi-sign-in'
                },
                {
                    label: 'Zarejestruj się',
                    to: 'register',
                    icon: 'pi pi-user-plus'
                },
                {
                    label: 'Default',
                    to: 'default',
                    icon: 'pi pi-paperclip'
                }
            ],
            imagesLoaded: false,
            imagesStore: useImageStore()
        };
    },
    methods: {
        checkImagesLoaded() {
            this.imagesLoaded = this.imagesStore.images.length > 0
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
};
</script>

<style>
    .allMain {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        min-width: 750px;
        overflow-x: hidden
    }

    nav {
        width: 100%;
        height: 75px;
        background-color: #0A0A0A;
        border-bottom: 2px solid black;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .navLeft {
        width: fit-content;
        height: 100%;
        padding: 10px;
    }

    .navLeft img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        
        transform: scale(0.95);
        transition: transform 0.3s ease;
    } 

    .navLeft img:hover {
        transform: scale(1);
    } 

    .navRight {
        width: fit-content;
        height: 100%;
        padding: 5px;

        display: flex;
        flex-direction: row;
        gap: 10px
        
    }

    .navbar-right-element {
        width: fit-content;
        height: 100%;
    }

    .navbar-right-element a {
        color: #C0C0C0;
        text-decoration: none;
        font-size: 2em;
        text-rendering: optimizeLegibility;
    }

    .photosPresent {
        width: 100%;
        height: auto;
        padding: 20px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        /* align-items: center; */
        flex-wrap: wrap;
        gap: 10px;
    }
</style>