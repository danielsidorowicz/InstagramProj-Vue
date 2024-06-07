import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        email: ''
    }),
    actions: {
        setEmail(userEmail) {
            this.email = userEmail
        }
    }
})