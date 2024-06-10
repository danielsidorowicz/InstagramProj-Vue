import { defineStore } from "pinia";
import { get } from "./requests";
import { getCookie } from "./requests";

export const usePhotoIdStore = defineStore('photo', {
    state: () => ({
        selectedPhotoId: null
    }),
    actions: {
        setPhotoId(id) {
            this.selectedPhotoId = id;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { key: 'PhotoStore', storage: localStorage },
        ],
    },
});