import { defineStore } from "pinia";
import { get } from "./requests";
import { getCookie } from "./requests";

export const useTagsStore = defineStore('tags', {
    state: () => ({
        tags: []
    }),
    actions: {
        async setTags() {
            let config = {
                headers: {
                    'authorization': `Bearer ${getCookie("token")}`,
                }
            };
            let responseTags = await get(`http://localhost:3000/api/tags/raw`, config)
            this.tags = responseTags.data;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { key: 'TagsStore', storage: localStorage },
        ],
    },
})