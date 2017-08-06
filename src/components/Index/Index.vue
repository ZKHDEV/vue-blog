<template>
    <div class="index-container">
        <v-header></v-header> 
        <v-container>
            <router-view></router-view>
        </v-container>
        <v-footer></v-footer>
    </div>
</template>
<script>
import '../../static/css/style.css'
export default {
    components: {
        'v-header': resolve => require(['./Header.vue'], resolve),
        'v-footer': resolve => require(['./Footer.vue'], resolve),
        'v-container': resolve => require(['./components/Layout/Container.vue'], resolve)
    }
}
</script>

<style lang="scss" scoped>
.index-container {
    background-color: #F0EFEE;
    padding-top: 100px;
}
</style>