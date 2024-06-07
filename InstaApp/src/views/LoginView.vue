<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import LoginBlock from '../components/LoginBlock.vue'

</script>

<template>
    <div class="defaultSite">
        <div class="logoDiv" id="logoDiv">
            <RouterLink to="/default">
                <img src="../assets/AppLogo.png" alt="AppLogo">
            </RouterLink>
        </div>
        <LoginBlock></LoginBlock>
    </div>
    
</template>

<style scoped>
    .defaultSite {
        width: 100%;
        min-width: 658px;
        height: 100%;
        min-height: 450px;
        padding: 20px;
        /* outline-offset: -20px; */
        /* outline: 2px solid white; */

        display: flex;
        flex-direction: row;

    }

    .logoDiv {
        width: 300px;
        height: 100px;
        /* height: fit-content; */
        padding: 20px;

        display: flex;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .logoDiv a {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    .logoDiv a img {
        height: 100%;
        width: 75%;
        object-fit: contain;
    }

    @media only screen and (max-width: 920px) {
        .defaultSite {
            overflow-x: hidden;
            flex-direction: column;
            align-items: center;
        }
    }
</style>

<script>
// export default {
//   setup() {
//     const status = ref(null);
//     const route = useRoute();

//     onMounted(() => {
//       // Accessing the status parameter from the URL using Vue Router
//       status.value = route.query.status;
//       console.log('Status parameter from URL:', status.value);

//       if(status.value == "invalid") {
        
//       }
//     });

//     return {
//       status
//     };
//   }
// };
</script>
