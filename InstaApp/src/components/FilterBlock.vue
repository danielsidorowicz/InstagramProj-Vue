<template>
    <div class="FilterBlock">
        <img src="../assets/FilterDefaultImage.png" alt="Filter Preview">
        <h1>{{ filter }}</h1>
    </div>
</template>
<script>
export default {
    props: ["filter"]
}
</script>
<style>
    .FilterBlock {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>