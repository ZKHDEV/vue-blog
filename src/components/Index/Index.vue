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
export default {
    components: {
        'v-header': resolve => require(['./Header.vue'], resolve),
        'v-footer': resolve => require(['./Footer.vue'], resolve),
        'v-container': resolve => require(['./components/Layout/Container.vue'], resolve)
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/scss/variables.scss';
.index-container {
    background-color: $theme-background-color;
    padding-top: 100px;
}
</style>