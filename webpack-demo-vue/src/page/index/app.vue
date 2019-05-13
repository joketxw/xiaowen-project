<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return{
                // text:'你好index.app.vue'
            }
        },
        created(){
            console.log(process.env.BASE_URL)
        }
    }
</script>

<style scoped>

</style>