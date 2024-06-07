<template>
    <div class="menuBar">
        <div v-for="item in items" :key="item.to">
            <router-link :to="item.to">
                <button type="button"><i :class="item.icon"></i>{{ item.label }}</button>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: ["items"]
}
</script>

<style scoped>
    .menuBar {
        width: 100%;
        /* border: 2px solid white; */
        color: white;
        padding: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    button {
        background-color: #191919;
        box-shadow: none;
        outline: none;
        border: none;
        color: white;
        font-size: 1.5em;
        padding: 10px;
        transform: scale(0.9);
        transition: 0.3s;
    }

    button:hover {
        cursor: pointer;
        transform: scale(1);
        transition: 0.3s;
    }

    i {
        margin-right: 10px;
        font-size: 0.8em;
    }
</style>