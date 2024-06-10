import { defineStore } from "pinia";
import { get } from "./requests";
import { getCookie } from "./requests";

export const useImageStore = defineStore('images', {
    state: () => ({
        images: [],
        imagesGotData: false
    }),
    actions: {
        async setImages() {
            // let config = {
            //     headers: {
            //         'authorization': `Bearer ${getCookie("token")}`,
            //     }
            // };
            let responseImages = await get(`http://localhost:3000/api/photos`)
            this.imagesGotData = true
            this.images = responseImages.data
        }
    },
    // persist: {
    //     enabled: true,
    //     strategies: [
    //         { key: 'images', storage: localStorage },
    //     ],
    // },
})