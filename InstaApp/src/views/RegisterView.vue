<script setup>
import { RouterLink } from 'vue-router'
import RegisterBlock from '../components/RegisterBlock.vue'



</script>

<template>
    <div class="defaultSite">
        <div class="logoDiv" id="logoDiv">
            <RouterLink to="/default">
                <img src="../assets/AppLogo.png" alt="AppLogo">
            </RouterLink>
        </div>
        <RegisterBlock></RegisterBlock>
    </div>
    
</template>

<style scoped>
    .defaultSite {
        width: 100%;
        min-width: 658px;
        height: 100%;
        min-height: 450px;
        padding: 20px;
        /* outline-offset: -20px; */
        /* outline: 2px solid white; */

        display: flex;
        flex-direction: row;

    }

    .logoDiv {
        width: 300px;
        height: 100px;
        /* height: fit-content; */
        padding: 20px;

        display: flex;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .logoDiv a {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    .logoDiv a img {
        height: 100%;
        width: 75%;
        object-fit: contain;
    }

    @media only screen and (max-width: 920px) {
        .defaultSite {
            overflow-x: hidden;
            flex-direction: column;
            align-items: center;
        }
    }
</style>


