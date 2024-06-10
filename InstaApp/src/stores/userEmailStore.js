import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        email: '',
        pfpBase64: '',
        user: ''
    }),
    actions: {
        setEmail(userEmail) {
            this.email = userEmail
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { key: 'UserStore', storage: localStorage },
        ],
    },
})