<script setup>
import { post } from '@/stores/requests';


function showPasswd() {
    var input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}


</script>

<template>
    <div class="registerBlock">
        <Message v-show="err422" severity="error"
            style="background-color: transparent; border-color: #fe2d7d; color: #fe2d7d;" @click="closeErr422">{{
                errorMessage }}</Message>
        <Message v-show="formErr" severity="error"
            style="background-color: transparent; border-color: #fe2d7d; color: #fe2d7d;" @click="closeFormErr">Fill all
            fields</Message>
        <Message v-show="sentMail" severity="info" style="background-color: transparent;">Sent Email</Message>
        <Message v-if="status === 'invalid'" severity="error"
            style="background-color: transparent; border-color: #fe2d7d; color: #fe2d7d;">Token Expired</Message>
        <div class="registerDiv">
            <h1>Utwórz konto</h1>
            <div class="nameInput">
                <h2>Imie</h2>
                <input type="text" name="name" id="name" placeholder="Name">
            </div>
            <div class="lastNameInput">
                <h2>Nazwisko</h2>
                <input type="text" name="lastName" id="lastName" placeholder="Last Name">
            </div>
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
            <input type="submit" value="Wyślij" @click="sendEmail">
        </div>
    </div>
</template>

<style scoped>    .registerBlock {
        width: 100%;
        padding: 100px;
        min-height: 860px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;

    }

    .registerDiv {
        width: 75%;
        height: 75%;
        border: 2px solid white;
        background-color: #111;
        color: white;
        padding: 20px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
    }

    .registerDiv div:not(.labelAndShow) {
        display: flex;
        flex-direction: column;
        gap: 10px
    }

    .registerDiv div input {
        width: 75%;
        height: 40px;
        font-size: 1.2em;

        outline: none;
    }

    input[type="checkbox"] {
        width: fit-content !important;
        height: fit-content !important;
    }

    .registerDiv input[type="submit"] {
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

    .registerDiv input[type="submit"]:hover {
        transition: 0.3s;
        /* transform: scale(1); */
        background-color: #fe2d7d;
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
        width: 40% !important;
    }

    @media only screen and (max-width: 920px) {
        .registerBlock {
            height: 100%;
            padding-top: 0px;
        }
    }
</style>

<script>
import Message from 'primevue/message';

export default {
    data() {
        return {
            sentMail: false,
            formErr: false,
            err422: false,
            errorMessage: null,
        }
    },
    components: {
        Message
    },
    methods: {
        async sendEmail() {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let name = document.getElementById("name").value
            let lastName = document.getElementById("lastName").value
            let email = document.getElementById("email").value
            let password = document.getElementById("password").value

            if (name == "" || lastName == "" || email == "" || password == "") {
                this.formErr = true
            } else {
                let postData = {
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password
                }

                console.log(postData);

                let response = await post('http://localhost:3000/api/user/register', postData, config)

                if (response.status == 422) {
                    this.err422 = true
                    this.errorMessage = response.error;
                } else {

                    console.log(response);

                    document.getElementById("name").value = ""
                    document.getElementById("lastName").value = ""
                    document.getElementById("email").value = ""
                    document.getElementById("password").value = ""
                    this.sentMail = true;
                }
            }
        },
        closeFormErr() {
            this.formErr = false
        },
        closeErr422() {
            this.err422 = false
        }
    },
    setup() {
        const route = useRoute();

        // Accessing query parameters
        const status = route.query.status;

        console.log(status)

        return {
            status
        };
    }
};
</script>