<template>
    <div class="editProfileAll">
        <h1>Nowe zdjęcie profilowe:</h1>
        <div class="uploadPfp">
            <FileUpload v-model="uploadedFiles" :customUpload="true" name="pfp" mode="advanced" label="Choose file" :auto="false"
            @uploader="uploadFiles" :fileLimit="1" :multiple="false" accept="image/*" url="default">
            <template #empty>
                <div class="dragAndDrop">
                    <i class="pi pi-cloud-upload"
                        style="font-size: 2em; border: 1px solid white; border-radius: 50% 50%; padding: 20px;"></i>
                    <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                </div>
            </template>
        </FileUpload>
        </div>
        <h1>Zmień imię i nazwisko:</h1>
        <div class="changeNames">
            <FloatLabel>
                <InputText id="name" v-model="nameValue" />
                <label for="name">Imie</label>
            </FloatLabel>
            <FloatLabel>
                <InputText id="lastName" v-model="lastNameValue" />
                <label for="lastName">Nazwisko</label>
            </FloatLabel>
        </div>
        <button type="button" id="diff" @click="uploadEdit">Zmień</button>
    </div>
</template>
<script>
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import FloatLabel from 'primevue/floatlabel';
import { useUserStore } from '@/stores/userEmailStore';
import { useImageStore } from '@/stores/useImageStore';
import { get, post, patch, getCookie } from '@/stores/requests';
import router from '@/router/index.js'

export default {
    components: {
        FileUpload,
        FloatLabel,
        InputText
    },
    data() {
        return {
            imagesLoaded: false,
            imagesStore: useImageStore(),
            userStore: useUserStore(),
            userPfp: null,
            uploadedFiles: null,
            nameValue: null,
            lastNameValue: null
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
                if (file) {
                    this.userPfp = file;
                }
        },
        async uploadFiles(event) {

            const formData = new FormData();
            for (let file of event.files) {
                formData.append('file', file);
            }

            formData.append('album', this.userStore.email)

            let config = {
                headers: {
                    'authorization': `Bearer ${getCookie("token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            let responseChangePhoto = await patch('http://localhost:3000/api/user/profilePicture', formData, config);

            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            router.push("/login")
        },
        async uploadEdit() {
            let config = {
                headers: {
                    'authorization': `Bearer ${getCookie("token")}`,
                    'Content-Type': 'application/json'
                }
            };

            const postData = {
                email: this.userStore.email,
                name: this.nameValue,
                lastName: this.lastNameValue
            };

            let response = await patch('http://localhost:3000/api/user/edit', postData, config);

            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            router.push("/login")
        }
    }
}
</script>
<style>
    .editProfileAll {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap:50px;
    }

    .uploadPfp .p-fileupload {
        width: 100%;
        height: 100%;
    }

    .changeNames {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    .changeNames span {
        height: 14px;
    }
    .changeNames input {
        height: 30px;
    }

    .editProfileAll button[id="diff"] {
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

    .editProfileAll button[id="diff"]:hover {
        transition: 0.3s;
        /* transform: scale(1); */
        background-color: #6235d8;
        cursor: pointer;
    }
</style>