<template>     
    <div class="loginBlock">
        <Message  v-show="err401" severity="error" style="background-color: transparent; border-color: #6235d8; color: #6235d8;" @click="closeErr401">{{ errorMessage }}</Message>
        <Message  v-show="err404" severity="error" style="background-color: transparent; border-color: #6235d8; color: #6235d8;" @click="closeErr404">{{ errorMessage }}</Message>
        <Message  v-show="status === 'valid'" severity="success" style="background-color: transparent; border-color: #6235d8; color: #6235d8;">Account verified</Message>
        <div class="loginDiv">
            <h1>Zaloguj Się</h1>
            <div class="emailInput">
                <h2>Email</h2>
                <input type="email" name="email" id="email" placeholder="Email">
            </div>
            <div class="passwordInput">
                <div class="labelAndShow">
                    <h2>Hasło</h2>
                    <input type="checkbox" name="showPasswd" id="showPasswd" @click="showPasswd" style="margin-top: 5px;">
                    <h3 style="margin-top: 5px;">Pokaż hasło</h3>
                </div>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <input type="submit" value="Wyślij" @click="login">
        </div>
    </div>
</template>

<style scoped>    
    .loginBlock {
        width: 100%;
        padding: 100px;
        min-height: 860px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
    }

    .loginDiv {
        width: 75%;
        height: 60%;
        border: 2px solid white;
        background-color: #111;
        color: white;
        padding: 20px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
    }

    .loginDiv div:not(.labelAndShow) {
        display: flex;
        flex-direction: column;
        gap: 10px
    }

    .loginDiv div input {
        width: 75%;
        height: 40px;
        font-size: 1.2em;

        outline: none;
    }

    input[type="checkbox"] {
        width: fit-content !important;
        height: fit-content !important;
    }

    .loginDiv input[type="submit"] {
        background-color: transparent;
        border: 2px solid white;
        /* border-radius: 25px; */
        width: 250px;
        height: 50px;
        color: white;
        transition: 0.3s;
        /* transform: scale(0.95); */
        font-size: 1.5em;
        /* margin: -6px; */
    }

    .loginDiv input[type="submit"]:hover {
        transition: 0.3s;
        /* transform: scale(1); */
        background-color: #6235d8;
        cursor: pointer;
    }

    .labelAndShow {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px
        /* height: fit-content; */
    }

    .labelAndShow input {
        height: 100%;
    }

    .labelAndShow h2 {
        margin-right: 20px;
    }

    .p-message {
        width: 45% !important;
    }


    @media only screen and (max-width: 920px) {
        .loginBlock {
            height: 100%;
            padding-top: 0px;
        }
    }
</style>

<script>
import Message from 'primevue/message';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { post } from '@/stores/requests';
import router from '@/router/index.js';

import { getCookie } from '@/stores/requests';

export default {
    components: {
        Message
    },
    data() {
        return {
            err401: false,
            err404: false,
            errorMessage: null,
        };
    },
    methods: {
        async login() {
            const config = {
                headers: {
                'Content-Type': 'application/json'
                }
            };

            const postData = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            };

            let response = await post('http://localhost:3000/api/user/login', postData, config);

            //   console.log(response.response.data);
            if (response && response.response && typeof response.response.data !== 'undefined') {
                response = response.response.data;
            }

            if (response.status == 401) {
                this.err401 = true;
                this.errorMessage = response.error;
            } else if (response.status == 404) {
                this.err404 = true;
                this.errorMessage = response.error;
            } else {
                let expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 14);
                document.cookie = `token=${response.token}; expires=${expirationDate.toUTCString()}; path=/`
                router.push('/')
            }
        },
        showPasswd() {
            let x = document.getElementById("password");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        },
        closeErr401() {
            this.err401 = false
        },
        closeErr404() {
            this.err404 = false
        }
    },
    setup() {
        const route = useRoute();
        const status = ref(route.query.status);
        // console.log(status.value);
        return { status };
    }
};
</script>
