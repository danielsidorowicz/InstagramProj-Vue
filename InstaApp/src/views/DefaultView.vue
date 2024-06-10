<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
    <div class="defaultSite">
        <div class="logoDiv" id="logoDiv">
            <router-link to="/">
                <img src="../assets/AppLogo.png" alt="AppLogo">
            </router-link>
        </div>
        <div class="welcomeDiv" id="welcomeDiv">
            <h1>Projekt InstaApp</h1>
        </div>
        <div class="loginRegisterDiv">
            <div class="loginDiv">
                <p class="loginLabel">Masz już konto?</p>
                <button class="loginButton" role="button"><RouterLink to="/login">Zaloguj się</RouterLink></button>
            </div>
            <div class="registerDiv">
                <p class="registerLabel">Nowy użytkownik?</p>
                <button class="registerButton" role="button"><RouterLink to="/register">Utwórz konto</RouterLink></button>
            </div>
        </div>

    </div>
    
</template>

<style scoped>
    .defaultSite {
        width: 100%;
        min-width: 625px;
        height: 100%;
        min-height: 450px;
        padding: 20px;
        outline-offset: -20px;
        outline: 2px solid white;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .logoDiv {
        width: 75%;
        height: fit-content;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logoDiv a img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    } 
    
    h1 {
        color: white;
        font-size: 4em;
    }

    .loginRegisterDiv {
        height: fit-content;

        display: flex;
        flex-direction: row;
        gap: 50px
    }

    .loginRegisterDiv div button {
        background-color: transparent;
        border: 2px solid white;
        border-radius: 25px;
        width: 250px;
        height: 50px;
        color: white;
        transition: 0.3s;
        transform: scale(0.95);
        font-size: 1.5em;
    }

    .loginButton:hover {
        transition: 0.3s;
        transform: scale(1);
        background-color: #6235d8;
        cursor: pointer;
    }

    .registerButton:hover {
        transition: 0.3s;
        transform: scale(1);
        background-color: #fe2d7d;
        cursor: pointer;
    }

    .loginRegisterDiv div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
        
    }

    .loginRegisterDiv div p {
        color: white;
        font-size: 2em
    }

    .loginRegisterDiv div button a {
        display:inline-block;
        width: 100%;
        /* height: 100%; */
        text-decoration: none;
        color: white;
        user-select: none;
    }

</style>
