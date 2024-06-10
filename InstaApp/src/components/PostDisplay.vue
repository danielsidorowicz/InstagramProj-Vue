<template>
    <div class="postBlock">
        <Image :src="image.base64" alt="Image" width="500" preview />
        <div class="postTags">
            <Chip v-for="tag in image.tags" :label="tag.name"/>
        </div>
        <router-link to="/viewPost" @click="openPhoto(image)"><button type="button" id="diff">Otwórz</button></router-link>
    </div>
</template>
<script>
import Image from 'primevue/image';
import Chip from 'primevue/chip';
import { usePhotoIdStore } from '@/stores/usePhotoIdStore';


export default {
    components: {
        Image,
        Chip
    },
    data() {
        return {
            photoIdStore: usePhotoIdStore()
        };
    },
    props: ["image"],
    methods: {
        openPhoto(id) {
            this.photoIdStore.setPhotoId(id);
            // console.log(this.photoIdStore.selectedPhotoId);
        }
    }
}
</script>
<style>
    .postBlock {
        width: 550px;
        height: auto;
        padding: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        gap: 10px;
        background-color: #0A0A0A;
    }

    .postBlock span {
        display: table;
        margin: 0 auto;
    }
    
    .postTags {
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }

    .p-chip-text {
        padding: 5px
    }

    .postBlock button[id="diff"] {
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

    .postBlock button[id="diff"]:hover {
        transition: 0.3s;
        /* transform: scale(1); */
        background-color: #6235d8;
        cursor: pointer;
    }
</style>