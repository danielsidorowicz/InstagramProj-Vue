<template>
    <nav>
        <div class="navLeft" id="navLeft">
            <RouterLink to="/" class="navbar-item">
                <img src="../assets/AppLogo.png" alt="AppLogo">
            </RouterLink>
        </div>
        <div class="navMiddle" id="navMiddle"></div>
        <div class="navRight" id="navRight">
            <!-- <Menubar2 :items="menuItems" /> -->
            <Menubar :items="menuItems" />
        </div>
    </nav>
</template>

<style scoped>
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

    
</style>

<script>
import { getCookie } from '@/stores/requests';
import { RouterLink, RouterView } from 'vue-router'
import Menubar from '../components/MenuBar.vue';

export default {
    components: {
        Menubar
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
        ]
        };
    },
    methods: {
        
    },
    setup() {
        let token = getCookie("token")
        let loggedIn = false

        if(token) loggedIn = true;

        console.log(loggedIn);
        
        return { loggedIn };
    }
};
</script>