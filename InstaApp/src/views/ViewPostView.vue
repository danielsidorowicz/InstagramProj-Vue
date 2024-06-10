<template>
    <div class="viewAll">
        <div class="logoDivProfile" id="logoDivProfile">
            <RouterLink to="/">
                <img src="../assets/AppLogo.png" alt="AppLogo">
            </RouterLink>
        </div>
        <div class="postItself">
            <div class="postImage">
                <img :src="imageSrc" alt="Post Image">
            </div>
            <div class="postTagsInside">
                <h1>Tags:</h1>
                <Chip v-for="tag in tagsSrc" :label="tag.name"/>
            </div>
        </div>
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
    computed: {
        imageSrc() {
            // console.log(this.photoIdStore.selectedPhotoId);
            return this.photoIdStore.selectedPhotoId.base64;
        },
        tagsSrc() {
            return this.photoIdStore.selectedPhotoId.tags;
        }
    }
}
</script>
<style>
    .viewAll {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        padding: 20px;
        gap:50px;
        overflow-x: hidden
    }

    .postItself {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .postImage {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .postImage img {
        min-width:50%;
    }

    .postTagsInside {
        width: 40%;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .postTagsInside .p-chip {
        height: fit-content;
    }
</style>